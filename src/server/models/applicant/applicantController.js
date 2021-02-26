const ENV = process.env;
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const s3 = require('s3');
const auth = require('../../services/authorization-service');
const errorMessages = require('../../services/error-messages');

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

exports.submitApplication = async (req, res) => {
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
    else return res.json(true);
  });
};

exports.viewAllApplications = (req, res) => {
  auth(req.headers.authorization, res, (jwt) => {
    User.findById(jwt.id, (err, user) => {
      if (err) return res.json(err);
      if (!user || !user.committee) return res.status(401).json({ err: 'Authentication error' });
      else {
        return Applicant.find({ removed: { $ne: true } }, (err, data) => {
          const unapproved = [], approved = [];
          data.forEach(e => {
            if (e.approved.find(g => g._id.equals(jwt.id))) approved.push(e);
            else unapproved.push(e);
          })

          return err ?
              res.status(500).json(err) :
              res.json({ unapproved, approved });
        })
      }
    }).sort('-created_at');
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