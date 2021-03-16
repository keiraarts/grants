

const ENV = process.env;
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const got = require('got');
const request = require('request');
const FileType = require('file-type');
const compress = require('compress-images');
const s3 = require('s3');
const { ethers, BigNumber } = require('ethers');
const ABI = require('./abi.json');

const Applicant = require('mongoose').model('Applicant');

const PROVIDER = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${ ENV.INFURA }`,'mainnet');
const contract = new ethers.Contract(ENV.CONTRACT_ADDRESS, ABI, PROVIDER);

let galleryData = [];

// const spaces = s3.createClient({
//   s3Options: {
//     accessKeyId: ENV.SPACES_KEY,
//     secretAccessKey: ENV.SPACES_SECRET,
//     region: 'US',
//     endpoint: 'nyc3.digitaloceanspaces.com'
//   }
// });

// function runCompression(data) {
//   data.forEach(async artist => {
//     const name = crypto.randomBytes(20).toString('hex');
//     if (artist.imageType === 'jpeg' || artist.imageType === 'jpg' || artist.imageType === 'png') {
//       request(artist.image).pipe(fs.createWriteStream(path.join(__dirname, `../images/${ name }.${ artist.imageType }`))).on('close', () => {
//         console.log('got image');
//         console.log(artist.tokenId);
//         Applicant.findOne({ accepted: true, order: artist.tokenId }, (err, applicant) => {
//           applicant.artWeb = `${ name }.${ artist.imageType }`;
//           applicant.save();
//           console.log('SAVED', applicant);
//         })
//       });
//     }
//   });
// }

// fs.readdir(path.join(__dirname, `../compressed`), (err, files) => {
//   files.forEach(async file => {
//     const uploader = await spaces.uploadFile({
//       localFile: path.join(__dirname, `../compressed/${ file }`),
//       s3Params: {
//         Bucket: 'grants',
//         Key: file,
//         ACL: 'public-read'
//       }
//     })
//   });
// });

// compress(
//   path.join(__dirname, `../images/*.{jpg,JPG,jpeg,JPEG,png}`),
//   path.join(__dirname, `../compressed/`),
//   { compress_force: false, statistic: true, autoupdate: true },
//   false,
//   { jpg: { engine: "mozjpeg", command: ["-quality", "30"] } },
//   { png: { engine: "pngquant", command: ["--quality=30-40", "-o"] } },
//   { svg: { engine: false, command: false } },
//   { gif: { engine: false, command: false }},
//   (err, completed) => {
//     if (completed) console.log('YO');
//   }
// )

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function pollGalleryData() {
  contract.totalSupply().then(async (result) => {
    console.log('getting total supply', result);
    const allData = [];
    let totalCount = result.toNumber();
    for (let i = 0; i < result.toNumber(); i++) {
      allData.push(new Promise((resolve, reject) => {
        return contract.tokenByIndex(BigNumber.from(i)).then((result2) => {
          return contract.tokenURI(BigNumber.from(result2)).then(async (result3) => {
            const fetched = await got(result3).catch((err) => reject());

            let error = false;
            let json;
            try {
              json = JSON.parse(fetched.body);
            } catch (e) {
              error = true;
            }

            const respond = {};
            if (json && !error) {
              respond.tokenId = result2.toNumber();
              if (json.media) {
                respond.image = json.media.uri;
                respond.thumbnail = json.image;

                const stream = got.stream(respond.thumbnail);
                const type = await FileType.fromStream(stream);
                respond.thumbnailType = type.ext.toLowerCase();
              } else if (json.image) respond.image = json.image;

              const stream = got.stream(respond.image);
              const type = await FileType.fromStream(stream);
              respond.imageType = type.ext.toLowerCase();

              const applicant = await Applicant.findOne({ order: result2.toNumber() });
              if (applicant && applicant.artWeb) respond.imageWeb = applicant.artWeb;

              if (json.attributes) {
                json.attributes.forEach((trait) => {
                  if (trait.trait_type === 'Artist') respond.artist = trait.value;
                  if (trait.trait_type === 'Birth Year') respond.year = trait.value;
                  if (trait.trait_type === 'Country of Representation') respond.country = trait.value;
                  if (trait.trait_type === 'Country Code') respond.countryCode = trait.value;
                  if (trait.trait_type === 'City') respond.city = trait.value;
                  if (trait.trait_type === 'Website') respond.website = trait.value;
                  if (trait.trait_type === 'Twitter') respond.twitter = trait.value;
                  if (trait.trait_type === 'Instagram') respond.instagram = trait.value;
                })
              }

              respond.name = json.name;
              respond.description = json.description;

              return resolve(respond);
            } else {
              return reject();
            }
          }).catch(err => console.log('wtf 1', err));
        }).catch(err => console.log('wtf 2', err)); // try again
      }).catch((err) => console.log('wtf 3', err)));
    }

    Promise.all(allData).then(results => {
      let complete = true;
      for (let i = 0; i < results.length; i++) {
        if (!results[i]) complete = false;
      }

      console.log('GOT RESULTS', results);
      if (complete) {
        galleryData = results;
        // runCompression(galleryData);
        let data = JSON.stringify(galleryData);
        fs.writeFileSync(path.join(__dirname, `./cachedGallery.json`), data);
      } else console.log('Issue pulling all data');
    });
  });
}

pollGalleryData();
setInterval(() => {
  pollGalleryData();
}, 60000 * 30)

let cachedGalleryData;
try {
  const rawdata = fs.readFileSync(path.join(__dirname, `./cachedGallery.json`));
  cachedGalleryData = rawdata ? JSON.parse(rawdata) : null;
  // console.log('YO', cachedGalleryData);
} catch(err) {
  console.log('Gallery data uninitialized');
}

module.exports = (app) => {
  app.get('/api/galleryData', (req, res) => {
    if (cachedGalleryData) res.json(cachedGalleryData);
    else res.json([]);
  });
};
