const ENV = process.env;
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const s3 = require('s3');
const auth = require('../../services/authorization-service');
const nodemailer = require('nodemailer');
const templates = require('../../emails/templates');

const Applicant = require('mongoose').model('Applicant');
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

exports.submitApplication = async (req, res) => {
  // return res.json(true);
  const applicant = {
    name:        req.body.name,
    email:       req.body.email,
    country:     req.body.country,
    countryCode: req.body.countryCode,
    city:        req.body.city,
    website:     req.body.website,
    twitter:     req.body.twitter,
    instagram:   req.body.instagram,
    statement:   req.body.statement,
    additional:  req.body.additional,
  };

  await Object.keys(req.body).forEach(async (item) => {
    if (item === 'art' || item === 'thumbnail') {
      let ext, image;
      if (item === 'art') ext = req.body[item].split(';')[0].match(/jpeg|png|gif|webp|mp4/)[0];
      if (item === 'thumbnail') ext = req.body[item].split(';')[0].match(/jpeg|png|gif|webp/)[0];
      image = req.body[item].replace(/^data:image\/\w+;base64,/, '');
      image = image.replace(/^data:video\/mp4;base64,/, '');
      const buf = new Buffer.from(image, 'base64');
      const name = crypto.randomBytes(20).toString('hex');

      if (item === 'art') applicant.art = `${ name }.${ ext }`
      else if (item === 'thumbnail') applicant.thumbnail = `${ name }.${ ext }`

      await fs.writeFileSync(path.join(__dirname, `../../images/${ name }.${ ext }`), buf);
      const uploader = await spaces.uploadFile({
        localFile: path.join(__dirname, `../../images/${ name }.${ ext }`),
        s3Params: {
          Bucket: 'grants',
          Key: `${ name }.${ ext }`,
          ACL: 'public-read'
        }
      });

      uploader.on('end', () => {
        fs.unlink(path.join(__dirname, `../../images/${ name }.${ ext }`), (err2) => {
          if (err2 !== null) {
            console.log(err2);
          }
          return null;
        });
      });
    }
  });

  const newApplicant = new Applicant(applicant);
  newApplicant.save((err, data) => {
    if (err) return res.status(500).json(err);
    else {
      transporter.sendMail(templates.applicationConfirmation(applicant.email));
      return res.json(true);
    }
  });
};

// exports.updateApplication = async (req, res) => {
//   auth(req.headers.authorization, res, (jwt) => {
//     User.findById(jwt.id, (err, user) => {
//       if (!user) return res.status(401).json({ err: 'Authentication error' });
//       return Applicant.findOne({ user: user._id }, async (err, applicant) => {
//         user.artistName = req.body.name;
//         user.birthYear = req.body.birthYear;

//         await Object.keys(req.body).forEach(async (item) => {
//           if (item === 'newArt' || item === 'newThumbnail') {
//             let ext, image;
//             if (item === 'newArt') ext = req.body[item].split(';')[0].match(/jpeg|png|gif|webp|mp4/)[0];
//             if (item === 'newThumbnail') ext = req.body[item].split(';')[0].match(/jpeg|png|gif|webp/)[0];
//             image = req.body[item].replace(/^data:image\/\w+;base64,/, '');
//             image = image.replace(/^data:video\/mp4;base64,/, '');
//             const buf = new Buffer.from(image, 'base64');
//             const name = crypto.randomBytes(20).toString('hex');
      
//             if (item === 'newArt') applicant.newArt = `${ name }.${ ext }`
//             else if (item === 'newThumbnail') applicant.newThumbnail = `${ name }.${ ext }`
      
//             await fs.writeFileSync(path.join(__dirname, `../../images/${ name }.${ ext }`), buf);
//             const uploader = await spaces.uploadFile({
//               localFile: path.join(__dirname, `../../images/${ name }.${ ext }`),
//               s3Params: {
//                 Bucket: 'grants',
//                 Key: `${ name }.${ ext }`,
//                 ACL: 'public-read'
//               }
//             });
      
//             uploader.on('end', () => {
//               fs.unlink(path.join(__dirname, `../../images/${ name }.${ ext }`), (err2) => {
//                 if (err2 !== null) {
//                   console.log(err2);
//                 }
//                 return null;
//               });
//             });
//           }
//         });

//         applicant.minted = req.body.minted;
//         applicant.description = req.body.description;
//         applicant.name = req.body.name;
//         applicant.save();

//         user.save();
//         return res.json('Application updated');
//       })
//     });
//   });
// };

exports.updateApplication = async (req, res) => {
  auth(req.headers.authorization, res, (jwt) => {
    User.findById(jwt.id, (err, user) => {
      if (!user) return res.status(401).json({ err: 'Authentication error' });
      return Applicant.findOne({ user: user._id }, (err, applicant) => {
        applicant.minted = req.body.minted;
        applicant.description = req.body.description;
        applicant.name = req.body.name;
        applicant.save();
        user.artistName = req.body.name;
        user.birthYear = req.body.birthYear;
        user.save();
        return res.json('Application updated');
      })
    });
  });
};

exports.viewAllApplications = (req, res) => {
  auth(req.headers.authorization, res, (jwt) => {
    User.findById(jwt.id, (err, user) => {
      if (err) return res.json(err);
      if (!user || !user.committee) return res.status(401).json({ err: 'Authentication error' });
      else {
        return Applicant.find({ removed: { $ne: true } }, (err, data) => {
          const unapproved = [], approved = [], rejected = [];
          data.forEach(e => {
            if (e.approved.find(g => g._id.equals(jwt.id))) approved.push(e);
            else if (e.rejected.find(g => g._id.equals(jwt.id))) rejected.push(e);
            else unapproved.push(e);
          })

          return err ?
              res.status(500).json(err) :
              res.json({ unapproved, approved, rejected });
        })
      }
    }).sort('-created_at');
  });
};

exports.viewTopApplications = (req, res) => {
  auth(req.headers.authorization, res, (jwt) => {
    User.findById(jwt.id, (err, user) => {
      if (err) return res.json(err);
      if (!user || !user.committee) return res.status(401).json({ err: 'Authentication error' });
      else {
        return Applicant.find({ removed: { $ne: true } }, (err, data) => {
          return err ?
              res.status(500).json(err) :
              res.json(data);
        }).sort('-approvalCount')
      }
    });
  });
};

exports.approveApplicant = (req, res) => {
  auth(req.headers.authorization, res, (jwt) => {
    User.findById(jwt.id, (err, user) => {
      if (err) return res.json(err);
      if (!user || !user.committee) return res.status(401).json({ err: 'Authentication error' }); 
      else {
        return Applicant.findById(req.body.id, (err2, data) => {
          if (err2) return res.status(500).json(err);
          else {
            const approvedIndex = data.approved.findIndex(e => e.equals(jwt.id));
            if (req.body.type === 'approve') {
              if (approvedIndex < 0) {
                data.approved.push(jwt.id);
                data.approvalCount++;
                data.save();
              }
            } else if (req.body.type === 'unapprove') {
              if (approvedIndex >= 0) {
                data.approved.splice(approvedIndex, 1);
                data.approvalCount--;
                data.save();
              }
            }

            return res.json(true);
          }
        })
      }
    });
  });
};

exports.rejectApplicant = (req, res) => {
  auth(req.headers.authorization, res, (jwt) => {
    User.findById(jwt.id, (err, user) => {
      if (err) return res.json(err);
      if (!user || !user.committee) return res.status(401).json({ err: 'Authentication error' }); 
      else {
        return Applicant.findById(req.body.id, (err2, data) => {
          if (err2) return res.status(500).json(err);
          else {
            const rejected = data.rejected.findIndex(e => e.equals(jwt.id));
            if (req.body.type === 'reject') {
              if (rejected < 0) {
                data.rejected.push(jwt.id);
                data.rejectCount++;
                data.save();
              }
            } else if (req.body.type === 'unreject') {
              if (rejected >= 0) {
                data.rejected.splice(rejected, 1);
                data.rejectCount--;
                data.save();
              }
            }

            return res.json(true);
          }
        })
      }
    });
  });
};


exports.flagApplicant = (req, res) => {
  auth(req.headers.authorization, res, (jwt) => {
    User.findById(jwt.id, (err, user) => {
      if (err) return res.json(err);
      if (!user || !user.committee) return res.status(401).json({ err: 'Authentication error' }); 
      else {
        return Applicant.findById(req.body.id, (err2, data) => {
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
        return Applicant.findById(req.body.id, (err2, data) => {
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


exports.asdf = (req, res) => {

};

// setTimeout(() => {
//   return Applicant.find({}, (err, data) => {
//     if (err) console.log('error');
//     else {
//       data.forEach(e => {
//         let fixedTwitter = e.twitter.toLowerCase();
//         fixedTwitter = fixedTwitter.replace(`www.twitter.com`, '');
//         fixedTwitter = fixedTwitter.replace(`twitter.com`, '');
//         fixedTwitter = fixedTwitter.replace(`https://twitter.com/`, '');
//         fixedTwitter = fixedTwitter.replace(`https://`, '');
//         fixedTwitter = fixedTwitter.replace(`http://`, '');
//         fixedTwitter = fixedTwitter.replace(`/`, '');
//         fixedTwitter = fixedTwitter.replace('@', '');
//         if (fixedTwitter === 'na') fixedTwitter = '';
//         if (fixedTwitter === 'n.a.') fixedTwitter = '';
//         if (fixedTwitter === '-') fixedTwitter = '';
//         if (fixedTwitter === '*') fixedTwitter = '';
//         if (fixedTwitter === '.') fixedTwitter = '';

//         if (e.instagram) {
//           let fixedInstagram = e.instagram.toLowerCase();
//           fixedInstagram = fixedInstagram.replace(`www.instagram.com`, '');
//           fixedInstagram = fixedInstagram.replace(`instagram.com`, '');
//           fixedInstagram = fixedInstagram.replace(`https://instagram.com/`, '');
//           fixedInstagram = fixedInstagram.replace(`https://`, '');
//           fixedInstagram = fixedInstagram.replace(`http://`, '');
//           fixedInstagram = fixedInstagram.replace('\/', '');
//           fixedInstagram = fixedInstagram.replace('@', '');
//           if (fixedInstagram === 'na') fixedInstagram = '';
//           if (fixedInstagram === 'n.a.') fixedInstagram = '';
//           if (fixedInstagram === '-') fixedInstagram = '';
//           if (fixedInstagram === '*') fixedInstagram = '';
//           if (fixedInstagram === '.') fixedInstagram = '';

//           console.log(fixedInstagram);
//         }
//       })
//     }
//   });
// })

// setTimeout(() => {
//   return Applicant.find({ emailed: false }, (err2, data) => {
//     if (err2) return res.status(500).json(err);
//     console.log(data.length);
//     data.forEach(async e => {
//       console.log(e.email);
//       // if (!e.emailed) {
//       //   await transporter.sendMail(templates.applicationProcess(e.email), (err, info) => {
//       //     if (err) {
//       //       console.log('GOT ERR', err);
//       //     } else {
//       //       e.emailed = true;
//       //       e.save();
//       //     }
//       //   });
//       // }
//     })
//   });
// })


// SET STATUS
// setTimeout(() => {
//   console.log('WTF');
//   return Applicant.find({ removed: false }, async (err2, data) => {
//     if (err2) return res.status(500).json(err);
//     const found = [];
//     let count = 0;
//     data.forEach(async e => {
//       if (e.approvalCount) count++;
//       // if (e.approvalCount >= 3) count++;
//       // const test = e.flagged.find(g => g.type === 'Already Minted');
//       // if (test) {
//       //   e.removed = true;
//       //   e.save();
//       // }
//     })

//     console.log('YO', count);
//   }).sort('-approvalCount');
// });
