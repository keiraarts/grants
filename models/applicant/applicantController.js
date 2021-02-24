const Applicant = require('mongoose').model('Applicant');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const auth = require('../../services/authorization-service');
const errorMessages = require('../../services/error-messages');

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
  return Applicant.find({}, (err, data) => {
      return err ?
          res.status(500).json(err) :
          res.json(data);
  })
};
