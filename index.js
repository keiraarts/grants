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
const mongoose = require('mongoose');

const ABI = require('./abi.json');

const { ethers, BigNumber } = require('ethers');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
app.use(express.json({ limit: '200mb' }));

const ENV = process.env;

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


require('./src/server/models/user/userRoutes.js')(app);
require('./src/server/models/applicant/applicantRoutes.js')(app);
mongoose.connect(ENV.MONGO);


app.use(express.static('dist'));
app.use((req, res) => {
  const route = req.originalUrl.split('/')[1];
  const allowedRoutes = [
    'nft', 'ethos', 'apply', 'committee', 'program', 'curation', 'register',
    'donate', 'tutorial', , 'testimony', 'rarible', 'opensea', 'resources'
    ];
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
