require('dotenv').config();
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const request = require('request');
const winston = require('winston');
const express = require('express');
const http = require('http');
const https = require('https');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const s3 = require('s3');
const mongoose = require('mongoose');

const models = require('./mongoModels.js');
const ABI = require('./abi.json');

const { ethers, BigNumber } = require('ethers');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '150mb' }));
app.use(bodyParser.urlencoded({ limit: '150mb', extended: true }));
app.use(express.json({ limit: '150mb' }));

const ENV = process.env;

mongoose.connect(ENV.MONGO);
const Applicant = mongoose.model('Applicant');

const spaces = s3.createClient({
  s3Options: {
    accessKeyId: ENV.SPACES_KEY,
    secretAccessKey: ENV.SPACES_SECRET,
    region: 'US',
    endpoint: 'nyc3.digitaloceanspaces.com'
  }
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

logger.add(new winston.transports.Console({
  format: winston.format.simple()
}));

const PROVIDER = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${ ENV.INFURA }`,'mainnet');
const contract = new ethers.Contract(ENV.CONTRACT_ADDRESS, ABI, PROVIDER);

let galleryData = [];
function pollGalleryData() {
  contract.totalSupply().then((result) => {
    const allData = [];
    let totalCount = result.toNumber();
    console.log(totalCount);
    for (let i = 0; i < result.toNumber(); i++) {
      allData.push(new Promise((resolve, reject) => {
        const id = i;
        return contract.tokenByIndex(BigNumber.from(i)).then((result2) => {
          return contract.tokenURI(BigNumber.from(result2)).then((result3) => {
            return request({
              url: `https://ipfs.io/ipfs/${ result3.split('/')[3] }`,
              method: 'GET',
            }, (err, response, body) => {
              let error = false;
              let json;
              try {
                json = JSON.parse(body);
              } catch (e) {
                error = true;
              }
              
              if (json && !error) {
                json.id = id;
                if (json.animation_url) json.animation_url = json.animation_url.replace('ipfs://ipfs', 'https://ipfs.io/ipfs');
                if (json.image) json.image = json.image.replace('ipfs://ipfs', 'https://ipfs.io/ipfs');
                if (json.attributes) {
                  json.attributes.forEach((item) => {
                    json[item.key.toLowerCase()] = item.value;
                  })
                }
                json.attributes = undefined;
                return resolve(json);
              } else {
                return reject();
              }
            });
          })
        });
      }).catch((err) => console.log('wtf', err)));
    }

    Promise.all(allData).then(results => {
      let complete = true;
      for (let i = 0; i < results.length; i++) {
        if (!results[i]) complete = false;
      }
      if (complete) galleryData = results;
      else console.log('Issue pulling all data');
    });
  });
}

pollGalleryData();
setInterval(() => {
  pollGalleryData();
}, 6000000)

app.get('/galleryData', (req, res) => {
  res.json(galleryData);
});

app.post('/submitApplication', async (req, res) => {
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

      await fs.writeFileSync(path.join(__dirname, `./images/${ name }.${ ext }`), buf);
      const uploader = await spaces.uploadFile({
          localFile: path.join(__dirname, `./images/${ name }.${ ext }`),
          s3Params: {
              Bucket: 'grants',
              Key: `${ name }.${ ext }`,
              ACL: 'public-read'
          }
      });

      uploader.on('end', () => {
          fs.unlink(path.join(__dirname, `./images/${ name }.${ ext }`), (err2) => {
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
});

app.use(express.static('dist'));
app.use((req, res) => {
  const route = req.originalUrl.split('/')[1];
  const allowedRoutes = ['nft', 'ethos', 'apply', 'committee', 'program', 'curation', 'donate', 'tutorial', , 'testimony', 'rarible', 'opensea', 'resources'];
  if (allowedRoutes.indexOf(route) > -1) {
    res.sendFile(`${ __dirname }${ path.join('/dist/index.html') }`);
  } else if (route === 'social.png') {
    res.sendFile(`${ __dirname }${ path.join('/public/social.png') }`);
  }
})



let server;
if (ENV.ENV === 'DEV') {
    server = http.createServer(app);
} else {
  const options = {
      key:  fs.readFileSync(`${ ENV.SSL_PATH }/privkey.pem`, 'utf8'),
      cert: fs.readFileSync(`${ ENV.SSL_PATH }/fullchain.pem`, 'utf8')
  };
  server = https.createServer(options, app);
}

server.listen(7777);
