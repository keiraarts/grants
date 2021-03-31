

const ENV = process.env;
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const got = require('got');
const request = require('request');
const FileType = require('file-type');
const jimp = require('jimp');
const s3 = require('s3');
const { videoResize } = require('node-video-resize');
const getMediaDimensions = require('get-media-dimensions');
const { ethers, BigNumber } = require('ethers');
const ABI = require('./abi.json');
const { promisify } = require('util');
const { Duplex } = require('stream');
const gifResize = require('@gumlet/gif-resize');

const ProgramApplicant = require('mongoose').model('ProgramApplicant');

const PROVIDER = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${ ENV.INFURA }`,'mainnet');
const contract = new ethers.Contract(ENV.CONTRACT_ADDRESS, ABI, PROVIDER);
const contractNominee = new ethers.Contract(ENV.CONTRACT_ADDRESS_NOMINEE, ABI, PROVIDER);

let galleryData = [];

const spaces = s3.createClient({
  s3Options: {
    accessKeyId: ENV.SPACES_KEY,
    secretAccessKey: ENV.SPACES_SECRET,
    region: 'US',
    endpoint: 'nyc3.digitaloceanspaces.com'
  }
});

function uploadCompressed() {
  fs.readdir(path.join(__dirname, `../compressed`), (err, files) => {
    files.forEach(async file => {
      await spaces.uploadFile({
        localFile: path.join(__dirname, `../compressed/${ file }`),
        s3Params: {
          Bucket: 'grants',
          Key: file,
          ACL: 'public-read'
        }
      })
      console.log('done uploading', crypto.randomBytes(20).toString('hex'))
    });
  });
}

async function downloadImages(type, applicants) {
  for (const artist of applicants) {
    // if (artist.thumbnail) artist.image = artist.thumbnail
    const name = artist.image.replace('https://arweave.net/', '');
    // if (artist.imageType === 'jpeg' || artist.imageType === 'jpg' || artist.imageType === 'png' || artist.imageType === 'gif') {
    // request(artist.image).pipe(fs.createWriteStream(path.join(__dirname, `../images/${ name }.${ artist.thumbnail ? artist.thumbnailType : artist.imageType }`))).on('close', () => {
    await request(artist.image).pipe(fs.createWriteStream(path.join(__dirname, `../images/${ name }.${ artist.imageType }`))).on('close', async () => {
      console.log('got image');
      console.log(artist.tokenId);
      await ProgramApplicant.findOne({ program: type === 'grantee' ? '605f948be26eb64b749bbc09' : '605fef70830ed668addb44ab', order: artist.tokenId }, (err, applicant) => {
        // applicant.artWeb = `${ name }.${ artist.thumbnail ? artist.thumbnailType : artist.imageType }`;
        applicant.artWeb = `${ name }.${ artist.imageType }`;
        applicant.save();
        console.log('SAVED', applicant.order);
      })
    });
  }
}


async function compressor() {
  const files = fs.readdirSync(path.join(__dirname, `../images`));
  let index = 0, file;
  console.log(files.length);
  while (index < files.length) {
    file = files[index];

    const input = path.join(__dirname, `../images/${ file }`);
    const output = path.join(__dirname, `../compressed/${ file }`);
    if (!fs.existsSync(output)) {
      const write = fs.createWriteStream(output);

      const fileType = file.split('.')[1];
      if (fileType === 'gif') {
        console.log('DOING FILE', file);
        const buf = fs.readFileSync(input);
        await gifResize({
          width: 600,
          optimizationLevel: 3
        })(buf).then(data => {
          const stream = new Duplex();
          stream.push(data);
          stream.push(null);
          console.log("'WROTE GIF'");
          return stream.pipe(write);
        });
      } else if (fileType === 'mp4') {
        console.log('trying', input);
        const dimensions = await getMediaDimensions(input, 'video');
        const width = 600;
        const height = Math.round((width / dimensions.width) * dimensions.height);
        console.log(width, height);
        await videoResize({
          inputPath: input,
          outputPath: output,
          format: 'mp4',
          size: `${ width }x${ height }`
        })
      } else {
        const read = promisify(fs.readFile);

        await read(input)
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
            // console.log(data);
        })
        .catch((err) => {
            console.log('error', err);
        });
      }
    }

    index++;
  }
}

let cachedGalleryData, cachedNomineeData;
async function pollGalleryData(type) {
  let useContract;
  if (type === 'grantee') useContract = contract;
  else if (type === 'nominee') useContract = contractNominee;
  const result = await useContract.totalSupply();
  console.log('getting total supply', result);
  const allData = [];
  let totalCount = result.toNumber();
  for (let i = 0; i < result.toNumber(); i++) {
    allData.push(new Promise((resolve, reject) => {
      return useContract.tokenByIndex(BigNumber.from(i)).then((result2) => {
        return useContract.tokenURI(BigNumber.from(result2)).then(async (result3) => {
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
              const fileType = await FileType.fromStream(stream);
              respond.thumbnailType = fileType.ext.toLowerCase();
            } else if (json.image) respond.image = json.image;

            const stream = got.stream(respond.image);
            const fileType = await FileType.fromStream(stream);
            respond.imageType = fileType.ext.toLowerCase();

            const applicant = await ProgramApplicant.findOne({ program: type === 'grantee' ? '605f948be26eb64b749bbc09' : '605fef70830ed668addb44ab', order: result2.toNumber() });
            if (applicant && applicant.artWeb) respond.imageWeb = applicant.artWeb;
            applicant.arweave = respond.image.split('/')[3];
            applicant.save();

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
        }).catch(err => { console.log('wtf 1', err); reject(); });
      }).catch(err => { console.log('wtf 1', err); reject(); }); // try again
    }).catch((err) => console.log('wtf 3', err)));
  }

  Promise.all(allData).then(results => {
    let complete = true;
    for (let i = 0; i < results.length; i++) {
      if (!results[i]) complete = false;
    }

    if (complete) {
      galleryData = results;
      let data = JSON.stringify(galleryData);
      if (type === 'grantee') {
        console.log('SAVING GRANTEE');
        fs.writeFileSync(path.join(__dirname, `./cachedGallery.json`), data);
        cachedGalleryData = galleryData;
      } else if (type === 'nominee') {
        console.log('SAVING NOMINEE');
        fs.writeFileSync(path.join(__dirname, `./cachedNomineeData.json`), data);
        cachedNomineeData = galleryData;
      }
    } else console.log('Issue pulling all data');
  });
}

// SITE CRASHED
// pollGalleryData('grantee');
// pollGalleryData('nominee');
// setInterval(() => {
//   pollGalleryData('grantee');
//   pollGalleryData('nominee');
// }, 60000 * 30)

try {
  const rawdata = fs.readFileSync(path.join(__dirname, `./cachedGallery.json`));
  cachedGalleryData = rawdata ? JSON.parse(rawdata) : null;

  const rawdata2 = fs.readFileSync(path.join(__dirname, `./cachedNomineeData.json`));
  cachedNomineeData = rawdata2 ? JSON.parse(rawdata2) : null;
} catch(err) {
  console.log('Gallery data uninitialized');
}

// compressor();
// uploadCompressed();
// downloadImages('grantee', cachedGalleryData);
// downloadImages('nominee', cachedNomineeData);


module.exports = (app) => {
  app.get('/api/galleryData', (req, res) => {
    if (cachedGalleryData) res.json(cachedGalleryData);
    else res.json([]);
  });

  app.get('/api/nomineeData', (req, res) => {
    if (cachedNomineeData) res.json(cachedNomineeData);
    else res.json([]);
  });
};
