const ENV = process.env;
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const s3 = require('s3');
const nodemailer = require('nodemailer');
const jimp = require('jimp');
const { videoResize } = require('node-video-resize');
const getMediaDimensions = require('get-media-dimensions');
const { promisify } = require('util');
const { Duplex } = require('stream');
const gifResize = require('@gumlet/gif-resize');
const hbjs = require('handbrake-js');

const auth = require('../../services/authorization-service');
const templates = require('../../emails/templates');

const Applicant = require('mongoose').model('Applicant');
const Organizer = require('mongoose').model('Organizer');
const Program = require('mongoose').model('Program');
const ProgramApplicant = require('mongoose').model('ProgramApplicant');
const User = require('mongoose').model('User');

const spaces = s3.createClient({
  s3Options: {
    accessKeyId: ENV.SPACES_KEY,
    secretAccessKey: ENV.SPACES_SECRET,
    region: 'US',
    endpoint: 'nyc3.digitaloceanspaces.com'
  }
});


const transporter = nodemailer.createTransport({
  host: 'email-smtp.us-east-1.amazonaws.com',
  port: 465,
  secure: true,
  auth: {
    user: ENV.SES_USER,
    pass: ENV.SES_PASS
  }
});


exports.getPrograms = async (req, res) => {
  return Program.find({ active: true }, (err, data) => {
    return err ?
        res.status(500).json(err) :
        res.json(data);
  }).select('organizers name url')
  .populate('organizers');
};

exports.getProgram = async (req, res) => {
  return Program.findOne({ url: req.body.url }, (err, data) => {
    return err ?
        res.status(500).json(err) :
        res.json(data);
  })
  .populate('organizers');
};

exports.getMyOrgs = async (req, res) => {
  const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
  const user = await User.findById(jwt.id);
  if (!user) return res.json({ error: 'Authentication error' });

  const org = await Organizer.findOne({ admins: jwt.id });
  if (!org) return res.json(null);

  return res.json(org);
};

exports.getOrg = async (req, res) => {
  return Organizer.findOne({ url: req.body.url }, (err, data) => {
    return err ?
        res.status(500).json(err) :
        res.json(data);
  }).populate('organizers');
};


function doDashes(str) {
  var re = /[^a-z0-9]+/gi; // global and case insensitive matching of non-char/non-numeric
  var re2 = /^-*|-*$/g;     // get rid of any leading/trailing dashes
  str = str.replace(re, '-');  // perform the 1st regexp
  return str.replace(re2, '').toLowerCase(); // ..aaand the second + return lowercased result
}

exports.createProgram = async (req, res) => {
  const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
  const user = await User.findById(jwt.id);
  if (!user) return res.json({ error: 'Authentication error' });

  let org;
  if (req.body.existing) {
    org = await Organizer.findById(req.body.existing);
    if (!org) return res.json({ error: 'That org does not seem to exist' });
  } else {
    org = new Organizer({
      admins:       [jwt.id],
      name:         req.body.orgName,
      url:          doDashes(req.body.orgName),
      about:        req.body.about,
      email:        req.body.email,
      website:      req.body.website,
      twitter:      req.body.twitter,
      instagram:    req.body.instagram,
    })

    org.save();
  }

  const newProgram = new Program({
    organizers:   [org._id],
    name:         req.body.name,
    url:          doDashes(req.body.url),
    description:  req.body.description,
    logistics:    req.body.logistics,
    criteria:     req.body.criteria,
    curators:     [jwt.id],
    active:       false,
  });

  return newProgram.save((err, data) => {
    if (err) return res.status(500).json(err);
    else {
      return res.json(true);
    }
  });
};

exports.updateOrg = async (req, res) => {
  const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
  const org = await Organizer.findOne({ _id: req.body._id, admins: jwt.id });
  if (!org) return res.json({ error: 'Authentication error' });

  org.name = req.body.name;
  org.url = doDashes(req.body.name);
  if (req.body.logo) org.logo = req.body.logo;
  org.about = req.body.about;
  org.email = req.body.email,
  org.website = req.body.website;
  org.twitter = req.body.twitter;
  org.instagram = req.body.instagram;

  await Object.keys(req.body).forEach(async (item) => {
    if (item === 'logo') {
      let ext, image;
      ext = req.body[item].split(';')[0].match(/jpeg|jpg|png|gif/)[0];
      image = req.body[item].replace(/^data:image\/\w+;base64,/, '');
      image = image.replace(/^data:video\/mp4;base64,/, '');
      const buf = new Buffer.from(image, 'base64');
      const name = crypto.randomBytes(20).toString('hex');

      org.logo = `${ name }.${ ext }`;

      await fs.writeFileSync(path.join(__dirname, `../../images/${ org.logo }`), buf);
      const uploader = await spaces.uploadFile({
        localFile: path.join(__dirname, `../../images/${ org.logo }`),
        s3Params: {
          Bucket: 'grants',
          Key: `${ org.logo }`,
          ACL: 'public-read'
        }
      });

      uploader.on('end', () => {
        fs.unlink(path.join(__dirname, `../../images/${ org.logo }`), (err2) => {
          if (err2 !== null) {
            console.log(err2);
          }
          return null;
        });
      });
    }
  });

  org.save();
  return res.json({ success: 'Program updated' })
};

exports.updateProgram = async (req, res) => {
  const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
  const organizer = await Organizer.findOne({ _id: req.body.org, admins: jwt.id });
  if (!organizer) return res.json({ error: 'Authentication error' });
  const program = await Program.findById(req.body.id);
  if (!program) return res.json({ error: 'Authentication error' });

  program.name = req.body.name;
  program.url = req.body.url;
  program.passcode = req.body.passcode;
  program.isProtected = req.body.passcode ? true : false;
  program.description = req.body.description;
  program.logistics = req.body.logistics;
  program.criteria = req.body.criteria;
  program.open = req.body.open;
  program.close = req.body.close;
  program.save();
  return res.json({ success: 'Program updated' })
};

exports.updateCurationCriteria = async (req, res) => {
  const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
  const organizer = await Organizer.findOne({ _id: req.body.org, admins: jwt.id });
  if (!organizer) return res.json({ error: 'Authentication error' });
  const program = await Program.findById(req.body.id);
  if (!program) return res.json({ error: 'Authentication error' });

  program.passByVotes = req.body.passByVotes;
  program.blindVoting = req.body.blindVoting;
  program.topThreshold = req.body.topThreshold;
  program.voteThreshold = req.body.voteThreshold;
  program.save();
  return res.json({ success: true });
};

exports.getProgramAdmin = async (req, res) => {
  const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
  const organizer = await Organizer.findOne({ admins: jwt.id });
  if (!organizer) return res.json({ error: 'Authentication error' });

  return Program.findById(req.body.program, (err, data) => {
    if (!data.organizers.find(e => e.equals(organizer._id))) return res.json({ error: 'Authentication error' });
    return err ?
        res.status(500).json(err) :
        res.json(data);
  }).populate('curators', 'first last username');
};


// MINT TO TYPE, NOT ACTUAL MINTING
exports.mintToArtist = async (req, res) => {
  const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
  const organizer = await Organizer.findOne({ admins: jwt.id });
  if (!organizer) return res.json({ error: 'Authentication error' });

  return Program.findById(req.body.program, (err, program) => {
    if (!program.organizers.find(e => e.equals(organizer._id))) return res.json({ error: 'Authentication error' });

    program.mintToArtist = req.body.mintToArtist;
    program.save();
    return err ?
        res.status(500).json(err) :
        res.json({ success: 'Updated' });
  });
};


exports.addRemoveCurator = async (req, res) => {
  const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
  const organizer = await Organizer.findOne({ admins: jwt.id });
  if (!organizer) return res.json({ error: 'Authentication error' });

  if (jwt.id === req.body.curator) return res.json({ error: 'You cannot add or remove yourself' });

  return Program.findById(req.body.program, (err, data) => {
    if (!data.organizers.find(e => e.equals(organizer._id))) return res.json({ error: 'Authentication error' });

    const index = data.curators.findIndex(e => e.equals(req.body.curator));
    if (req.body.type === 'remove') {
      if (index >= 0) {
        data.curators.splice(index, 1);
        data.save();
        return res.json({ success: 'Curator removed' });
      }
    } else if (req.body.type === 'add') {
      if (index < 0) {
        data.curators.push(req.body.curator);
        data.save();
        return res.json({ success: 'Curator added' });
      }
    }

    return res.json({ error: 'Could not find curator' });
  });
};

// exports.addAdmin = async (req, res) => {
//   const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
//   if (jwt.id !== '6035e7415f0a684942f4e17c') return res.json({ error: 'Authentication error' });
//   const user = await User.findById(jwt.id);
//   if (!user) return res.json({ error: 'Authentication error' });

//   const program = await Program.findById(req.body.program);
//   if (!program) return res.json({ error: 'Authentication error' });

//   program.admins.push(req.body.admin);
//   program.save();
//   return res.json({ success: 'Admin added' });
// }

const compressor = async (file, fileWeb) => {
  return new Promise(resolve => {
    const input = path.join(__dirname, `../../images/${ file }`);
    const output = path.join(__dirname, `../../images/${ fileWeb }`);
    const write = fs.createWriteStream(output);

    const fileType = file.split('.')[1];
    if (fileType === 'gif') {
      console.log('DOING FILE', file);
      const buf = fs.readFileSync(input);
      gifResize({
        width: 600,
        optimizationLevel: 3
      })(buf).then(async data => {
        const stream = new Duplex();
        stream.push(data);
        stream.push(null);
        console.log("'WROTE GIF'");
        await stream.pipe(write);
        resolve();
      });

    } else if (fileType === 'mp4') {
      getMediaDimensions(input, 'video').then(dimensions => {
        const width = 600;
        const height = Math.round((width / dimensions.width) * dimensions.height);
        console.log(width, height);
        videoResize({
          inputPath: input,
          outputPath: output,
          format: 'mp4',
          size: `${ width }x${ height }`
        }).then(() => {
          resolve();
        })
      });
    } else {
      console.log('ELSING');
      const read = promisify(fs.readFile);

      read(input)
      .then((result) => {
          return jimp.read(result);
      })
      .then((img) => {
          const r = img.resize(600, jimp.AUTO);
          const b = promisify(r.getBuffer.bind(r));
          return b(jimp.AUTO);
      })
      .then((buff) => {
          const stream = new Duplex();
          stream.push(buff);
          stream.push(null);
          return stream;
      })
      .then((stream) => {
          return stream.pipe(write);
      })
      .then((data) => {
        resolve();
      })
      .catch((err) => {
          console.log('error', err);
      });
    }
  });
}

exports.submitApplication = async (req, res) => {
  const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
  const user = await User.findById(jwt.id);
  if (!user || !jwt) return res.json({ error: 'Authentication error' });
  if (!user.artistName || !user.city || !user.country || !user.twitter || !user.instagram || !user.website || !user.emailVerified || !user.wallet) return res.json({ error: 'User profile incomplete' });
  if (!req.body.program || !req.body.statement || !req.body.title || !req.body.description || !req.body.art) return res.json({ error: 'Application incomplete' });

  const program = await Program.findById(req.body.program);
  if (!program) return res.json({ error: 'Program does not exist' });
  if (program.isProtected && req.body.passcode !== program.passcode) return res.json({ error: 'The secret phrase was incorrect' });
  if (new Date() < program.open || new Date() > program.close) return res.json({ error: 'Submissions are closed' });

  const applicant = {
    user:        jwt.id,
    program:     req.body.program,
    statement:   req.body.statement,
    additional:  req.body.additional,
    title:       req.body.title,
    canvas:      req.body.canvas,
    description: req.body.description,
  };

  await Object.keys(req.body).forEach(async (item) => {
    if (item === 'art') {
      let ext, image;
      ext = req.body[item].split(';')[0].match(/jpeg|png|gif|webp|mp4/)[0];
      image = req.body[item].replace(/^data:image\/\w+;base64,/, '');
      image = image.replace(/^data:video\/mp4;base64,/, '');
      let buf = new Buffer.from(image, 'base64');

      const name = crypto.randomBytes(20).toString('hex');

      applicant.art = `${ name }.${ ext }`;
      applicant.artWeb = `${ name }-web.${ ext }`;

      const saveImage = promisify(fs.writeFile);
      await saveImage(path.join(__dirname, `../../images/${ applicant.art }`), buf)
      await compressor(applicant.art, applicant.artWeb);
      if (ext === 'mp4') {
        await hbjs.run({
          input: path.join(__dirname, `../../images/${ applicant.art }`),
          output: path.join(__dirname, `../../images/video-${ applicant.art }`),
          preset: 'Vimeo YouTube HQ 2160p60 4K',
        })
      }

      const uploader = await spaces.uploadFile({
        localFile: path.join(__dirname, `../../images/${ ext === 'mp4' ? `video-${ applicant.art }` : applicant.art }`),
        s3Params: {
          Bucket: 'grants',
          Key: `${ applicant.art }`,
          ACL: 'public-read'
        }
      });

      console.log('uploading');
      const uploader2 = await spaces.uploadFile({
        localFile: path.join(__dirname, `../../images/${ applicant.artWeb }`),
        s3Params: {
          Bucket: 'grants',
          Key: `${ applicant.artWeb }`,
          ACL: 'public-read'
        }
      });

      uploader.on('end', () => {
        fs.unlink(path.join(__dirname, `../../images/${applicant.art }`), (err2) => {
          if (err2 !== null) {
            console.log(err2);
          }
          return null;
        });

        if (ext === 'mp4') {
          fs.unlink(path.join(__dirname, `../../images/video-${applicant.art }`), (err2) => {
            if (err2 !== null) {
              console.log(err2);
            }
            return null;
          });
        }
      });

      uploader2.on('end', () => {
        fs.unlink(path.join(__dirname, `../../images/${applicant.artWeb }`), (err2) => {
          if (err2 !== null) {
            console.log(err2);
          }
          return null;
        });
      });
    }
  });

  const newApplicant = new ProgramApplicant(applicant);
  newApplicant.save((err, data) => {
    if (err) return res.status(500).json(err);
    else {
      transporter.sendMail(templates.applicationConfirmation(user.email, program.name));
      return res.json(true);
    }
  });
};

exports.updateApplication = async (req, res) => {
  auth(req.headers.authorization, res, (jwt) => {
    User.findById(jwt.id, (err, user) => {
      if (!user) return res.status(401).json({ err: 'Authentication error' });
      return ProgramApplicant.findOne({ user: user._id }, (err, applicant) => {
        applicant.minted = req.body.minted;
        applicant.description = req.body.description;
        applicant.name = req.body.name;
        applicant.title = req.body.title;
        applicant.save();
        user.artistName = req.body.name;
        user.birthYear = req.body.birthYear;
        user.save();
        return res.json('Application updated');
      })
    });
  });
};

exports.getGallery = async (req, res) => {
  const program = await Program.findOne({ url: req.body.program }).populate('organizers');
  return ProgramApplicant.find({ program: program._id, published: true }, (err, gallery) => {
    gallery.forEach(e => {
      e.tokenId = e.order
    });
    return err ?
    res.status(500).json(err) :
    res.json({ gallery, contract: program.contractAddress, name: program.name, organizer: program.organizers[0].name, organizerUrl: program.organizers[0].url });
  }).select('-approved -rejected -program -statement -additional -ineligible -flagged -approvalCount -rejectCount -emailed -accepted')
  .populate('user', 'artistName birthYear country city website twitter instagram')
  .sort('order');
};

exports.getCurationPrograms = async (req, res) => {
  const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
  const programs = await Program.find({ curators: jwt.id }).select('organizer name url perpetual passByVotes topThreshold voteThreshold blindVoting mintToArtist mintInProgress').populate('organizers');
  if (!programs.length) return res.status(401).json({ error: 'Authentication error' });

  return res.json({ success: programs });
};

exports.viewAllApplications = async (req, res) => {
  const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
  const user = await User.findById(jwt.id);
  if (!user) return res.json({ error: 'Authentication error' });

  const isCurator = await Program.find({ curators: user._id });
  if (!isCurator) return res.json({ error: 'Authentication error' });

  return ProgramApplicant.find({ program: req.body.program, ineligible: { $ne: true }, finalized: { $ne: true } }, (err, data) => {
    const unapproved = [], approved = [], rejected = [];
    data.forEach(e => {
      if (e.approved.find(g => g._id.equals(jwt.id))) approved.push(e);
      else if (e.rejected.find(g => g._id.equals(jwt.id))) rejected.push(e);
      else unapproved.push(e);
    })

    return err ?
        res.status(500).json(err) :
        res.json({ unapproved, approved, rejected });
  }).populate('user', 'artistName birthYear country city website twitter instagram')
};

exports.viewResults = async (req, res) => {
  const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
  const user = await User.findById(jwt.id);
  if (!user) return res.json({ error: 'Authentication error' });

  return ProgramApplicant.find({ program: req.body.program }, (err, data) => {
    return err ?
        res.status(500).json(err) :
        res.json(data);
  }).populate('user', 'artistName birthYear country city website twitter instagram')
  .sort('-approvalCount')
  .select('-approved -rejected')
};

exports.approveOrReject = async (req, res) => {
  const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
  const user = await User.findById(jwt.id);
  if (!user) return res.json({ error: 'Authentication error' });

  const isCurator = await Program.find({ curators: user._id });
  if (!isCurator) return res.json({ error: 'Authentication error' });

  return ProgramApplicant.findById(req.body.id, (err2, data) => {
    if (err2) return res.status(500).json(err);
    else {
      if (req.body.type === 'approve') {
        const index = data.approved.findIndex(e => e.equals(jwt.id));
        if (index < 0) {
          data.approved.push(jwt.id);
          data.approvalCount++;
          data.save();
        }
      } else if (req.body.type === 'reject') {
        const index = data.rejected.findIndex(e => e.equals(jwt.id));
        if (index < 0) {
          data.rejected.push(jwt.id);
          data.rejectCount++;
          data.save();
        }
      }

      return res.json(true);
    }
  })
};

exports.undoApplicant = async (req, res) => {
  const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
  const user = await User.findById(jwt.id);
  if (!user) return res.json({ error: 'Authentication error' });

  const isCurator = await Program.find({ curators: user._id });
  if (!isCurator) return res.json({ error: 'Authentication error' });

  return ProgramApplicant.findById(req.body.id, (err2, data) => {
    if (err2) return res.status(500).json(err);
    else {
      if (req.body.type === 'approve') {
        const index = data.approved.findIndex(e => e.equals(jwt.id));
        if (index >= 0) {
          data.approved.splice(index, 1);
          data.approvalCount--;
          data.save();
        }
      } else if (req.body.type === 'reject') {
        const index = data.rejected.findIndex(e => e.equals(jwt.id));
        if (index >= 0) {
          data.rejected.splice(index, 1);
          data.rejectCount--;
          data.save();
        }
      }

      return res.json(true);
    }
  })
};

exports.finalizeDeferred = async (req, res) => {
  const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
  const organizer = await Organizer.findOne({ _id: req.body.org, admins: jwt.id });
  if (!organizer) return res.json({ error: 'Authentication error' });
  const program = await Program.findById(req.body.program);
  if (!program) return res.json({ error: 'Authentication error' });

  if (!req.body.applicants) return res.json({ error: 'Missing data' });

  req.body.applicants.forEach(applicant => {
    ProgramApplicant.findById(applicant.id).then(data => {
      data.finalized = true;
      data.save();
    })
  })

  return res.json({ success: 'Deferrment finalized' })
}


exports.flagApplicant = (req, res) => {
  auth(req.headers.authorization, res, (jwt) => {
    User.findById(jwt.id, (err, user) => {
      if (err) return res.json(err);
      if (!user || !user.committee) return res.status(401).json({ err: 'Authentication error' }); 
      else {
        return ProgramApplicant.findById(req.body.id, (err2, data) => {
          if (err2) return res.status(500).json(err);
          else if (data) {
            data.flagged.push({
              user: jwt.id,
              message: req.body.message,
              type: req.body.type
            });

            data.save();
          }

          return res.json(true);
        })
      }
    });
  });
};


exports.removeFlag = (req, res) => {
  auth(req.headers.authorization, res, (jwt) => {
    User.findById(jwt.id, (err, user) => {
      if (err) return res.json(err);
      if (!user || !user.committee) return res.status(401).json({ err: 'Authentication error' }); 
      else {
        return ProgramApplicant.findById(req.body.id, (err2, data) => {
          if (err2) return res.status(500).json(err);
          else {
            const flaggedIndex = data.flagged.findIndex(e => e.equals(req.body.flagId));
            data.flagged.splice(flaggedIndex, 1);

            data.save();
          }

          return res.json(true);
        })
      }
    });
  });
};

// setTimeout(() => {
//   Applicant.find({ published: { $ne: true }, order: { $exists: false } }, (err, applicants) => {
//     applicants.forEach(applicant => {
//       const transfer = {
//         user:           applicant.user,
//         program:        '605fef70830ed668addb44ab',
//         url:            applicant.website,
//         statement:      applicant.statement,
//         additional:     applicant.additional,
//         title:          applicant.title,
//         description:    applicant.description,
//         art:            applicant.art,
//         artWeb:         applicant.artWeb,
//         ineligible:     applicant.ineligible,
//         flagged:        applicant.flagged,
//         approvalCount:  applicant.approvalCount,
//         rejectCount:    applicant.rejectCount,
//         approved:       applicant.approved,
//         rejected:       applicant.rejected,
//         emailed:        applicant.emailed,
//         accepted:       applicant.accepted,
//         published:      applicant.published,
//         order:          applicant.order,
//       };

//       // console.log('WTF', transfer);
//       // const newApplicant = new ProgramApplicant(transfer);
//       // newApplicant.save((err, data) => {
//       //   if (err) console.log('WTF', err);
//       // });
//       // console.log(applicant.email);
//     })

//     console.log(applicants.length);
//   })
// })


// setTimeout(() => {
//   return ProgramApplicant.find({ order: { $exists: true } }, (err2, data) => {
//     let count = 0;
//     data.forEach(e => {
//       e.finalized = true;
//       e.save();
//       count++;
//     })

//     console.log('COUNT', count);
//   })
// })
