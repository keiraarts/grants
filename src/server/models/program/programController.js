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

const auth = require('../../services/authorization-service');
const templates = require('../../emails/templates');

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
  }).select('organizer name url');
};

exports.getProgram = async (req, res) => {
  return Program.findOne({ url: req.body.url }, (err, data) => {
    return err ?
        res.status(500).json(err) :
        res.json(data);
  });
};

exports.createProgram = async (req, res) => {
  const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
  const user = await User.findById(jwt.id);
  if (!user) return res.json({ error: 'Authentication error' });

  const newProgram = new Program({
    organizer:    req.body.organizer,
    name:         req.body.name,
    url:          req.body.url,
    description:  req.body.description,
    logistics:    req.body.logistics,
    criteria:     req.body.criteria,
    email:        req.body.email,
    website:      req.body.website,
    twitter:      req.body.twitter,
    instagram:    req.body.instagram,
    curators:     [jwt.id],
    admins:       [jwt.id],
    active:       false,
  });

  return newProgram.save((err, data) => {
    if (err) return res.status(500).json(err);
    else {
      return res.json(true);
    }
  });
};

exports.updateProgram = async (req, res) => {
  const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
  const program = await Program.findOne({ _id: req.body._id, admins: jwt.id });
  if (!program) return res.json({ error: 'Authentication error' });

  program.organizer = req.body.organizer;
  program.name = req.body.name;
  program.url = req.body.url;
  program.description = req.body.description;
  program.logistics = req.body.logistics;
  program.criteria = req.body.criteria;
  program.email = req.body.email,
  program.website = req.body.website;
  program.twitter = req.body.twitter;
  program.instagram = req.body.instagram;
  program.save();
  return res.json({ success: 'Program updated' })
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

  const applicant = {
    user:        jwt.id,
    url:         req.body.url,
    program:     req.body.program,
    statement:   req.body.statement,
    additional:  req.body.additional,
    title:       req.body.title,
    description: req.body.description,
  };

  await Object.keys(req.body).forEach(async (item) => {
    if (item === 'art') {
      let ext, image;
      ext = req.body[item].split(';')[0].match(/jpeg|png|gif|webp|mp4/)[0];
      image = req.body[item].replace(/^data:image\/\w+;base64,/, '');
      image = image.replace(/^data:video\/mp4;base64,/, '');
      const buf = new Buffer.from(image, 'base64');
      const name = crypto.randomBytes(20).toString('hex');

      applicant.art = `${ name }.${ ext }`;
      applicant.artWeb = `${ name }-web.${ ext }`;

      const saveImage = promisify(fs.writeFile);
      await saveImage(path.join(__dirname, `../../images/${ applicant.art }`), buf)
      await compressor(applicant.art, applicant.artWeb);

      const uploader = await spaces.uploadFile({
        localFile: path.join(__dirname, `../../images/${ applicant.art }`),
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

exports.getCurationPrograms = async (req, res) => {
  const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
  const programs = await Program.find({ curators: jwt.id }).select('organizer name url');
  if (!programs.length) return res.status(401).json({ error: 'Authentication error' });

  return res.json({ success: programs });
};

exports.viewAllApplications = async (req, res) => {
  const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
  const user = await User.findById(jwt.id);
  if (!user) return res.json({ error: 'Authentication error' });

  const isCurator = await Program.find({ curators: user._id });
  if (!isCurator) return res.json({ error: 'Authentication error' });

  return ProgramApplicant.find({ program: req.body.program, ineligible: { $ne: true } }, (err, data) => {
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

exports.viewTopApplications = (req, res) => {
  auth(req.headers.authorization, res, (jwt) => {
    User.findById(jwt.id, (err, user) => {
      if (err) return res.json(err);
      if (!user || !user.committee) return res.status(401).json({ err: 'Authentication error' });
      else {
        return ProgramApplicant.find({ ineligible: { $ne: true }, userAccepted: true, accepted: false, minted: { $ne: true } }, (err, data) => {
          return err ?
              res.status(500).json(err) :
              res.json(data);
        }).sort('-approvalCount')
      }
    });
  });
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
//   return Applicant.find({ ineligible: { $ne: true }, userAccepted: { $ne: true }, accepted: true, minted: { $ne: true } }, (err2, data) => {
//     if (err2) return res.status(500).json(err);
//     let count = 0;
//     data.forEach(e => {
//       count++;
//       if (e.user) { 
//         console.log(e.title, e.email, e.user.wallet);
//       }
//     })

//     console.log('COUNT', count);
//   }).populate('user');
// })

// setTimeout(() => {
//   return Applicant.find({ walletScreened: { $ne: true }, title: { $exists: true }, accepted: true, userAccepted: true, ineligible: { $ne: true } }, (err2, data) => {
//     if (err2) return res.status(500).json(err);
//     let count = 0;
//     data.forEach(e => {
//       count++;
//       // e.walletScreened = true;
//       // e.save();
//       // if (e.user) { 
//         console.log(e.user.wallet);
//       // }
//     })

//     console.log('COUNT', count);
//   }).populate('user');
// })

// setTimeout(() => {
//   return Applicant.find({ ineligible: { $ne: true }, userAccepted: true, order: { $exists: true } }, (err2, data) => {
//     if (err2) return res.status(500).json(err);
//     let count = 1;
//     data.forEach(e => {
//       count++;
//       console.log(e);
//       // if (e.user && e.user.wallet && e.order >= 72) {
//       //   // e.order = e.order + 1;
//       //   // e.walletScreened = true;
//       //   // e.save();
//       // }
//     })

//     console.log('COUNTA', count);
//   }).sort('-approvalCount')
//     // .distinct('country')
//     .populate('user');
// })

// setTimeout(() => {
//   return User.find({}, (err2, data) => {
//     if (err2) return res.status(500).json(err);
//     data.forEach(e => {
//       if (e.instagram) {
//         let fixedTwitter = e.instagram.toLowerCase();
//         fixedTwitter = fixedTwitter.replace(`www.instagram.com`, '');
//         fixedTwitter = fixedTwitter.replace(`instagram.com`, '');
//         fixedTwitter = fixedTwitter.replace(`https://instagram.com/`, '');
//         fixedTwitter = fixedTwitter.replace(`https://`, '');
//         fixedTwitter = fixedTwitter.replace(`http://`, '');
//         fixedTwitter = fixedTwitter.replace(`/`, '');
//         fixedTwitter = fixedTwitter.replace(`/`, '');
//         fixedTwitter = fixedTwitter.replace(`/`, '');
//         fixedTwitter = fixedTwitter.replace('@', '');
//         fixedTwitter = fixedTwitter.replace('\@', '');
//         fixedTwitter = fixedTwitter.replace(' ', '.');
//         if (fixedTwitter === 'na') fixedTwitter = '';
//         if (fixedTwitter === 'none') fixedTwitter = '';
//         if (fixedTwitter === 'n.a.') fixedTwitter = '';
//         if (fixedTwitter === '-') fixedTwitter = '';
//         if (fixedTwitter === '*') fixedTwitter = '';
//         // if (fixedTwitter === '.') fixedTwitter = '';
//         console.log(e.instagram);
//         // console.log(`${ e.instagram }                      `, e.email);
//         e.instagram = fixedTwitter;
//         e.save();
//       }
//     })
//   });
// })


// TO DO:
// Fix instagram spaces to auto populate with period (parsing error)
