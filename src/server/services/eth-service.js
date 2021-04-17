require('dotenv').config()
 
const Web3 = require('web3')
const axios = require('axios')
const fs = require('fs');
const log = require('ololog').configure({ time: true })
const Arweave = require('arweave');
const fetch = require('node-fetch');

const auth = require('./authorization-service');
const MintbaseABI = require('./MintbaseFactory.json');

const User = require('mongoose').model('User');
const Organizer = require('mongoose').model('Organizer');
const Program = require('mongoose').model('Program');
const ProgramApplicant = require('mongoose').model('ProgramApplicant');

const arweave = Arweave.init({
  host: 'arweave.net',// Hostname or IP address for a Arweave host
  port: 443,          // Port
  protocol: 'https',  // Network protocol http or https
  timeout: 20000,     // Network request timeouts in milliseconds
  logging: false,     // Enable network request logging
});

const mainnet = `https://mainnet.infura.io/v3/${process.env.INFURA}`
const web3 = new Web3( new Web3.providers.HttpProvider(mainnet) )

web3.eth.defaultAccount = process.env.WALLET

const getCurrentGasPrices = async () => {
  let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10,
    super: response.data.fastest / 10
  }
 
  console.log("\r\n")
  log (`Current ETH Gas Prices (in GWEI):`.cyan)
  console.log("\r\n")
  log(`Low: ${prices.low} (transaction completes in < 30 minutes)`.green)
  log(`Standard: ${prices.medium} (transaction completes in < 5 minutes)`.yellow)
  log(`Fast: ${prices.high} (transaction completes in < 2 minutes)`.red)
  log(`Fastest: ${prices.super} (transaction completes in < 1 minutes)`.red)
  console.log("\r\n")
 
  return prices
}


const mint = async (applicants, program, organizer) => {
  try {
    let myBalanceWei = await web3.eth.getBalance(web3.eth.defaultAccount).then(balance => balance)
    let myBalance = await web3.utils.fromWei(myBalanceWei, 'ether');
    const block = await web3.eth.getBlock('latest');

    log(`Your wallet balance is currently ${myBalance} ETH`.green)
    const abiData = await fetch(`https://us-central1-thing-1d2be.cloudfunctions.net/getAbi?version=v1.0.0`)
    const { abi } = await abiData.json();
    const address = program.contractAddress;
    const Contract = new web3.eth.Contract(abi, address);
    const sevensMintAddress = '0xEbfDF56E9c9A643c8abc13A4fbD679ed02F9ceb4';
    const rawdata = await fs.readFileSync('./arweave.json');
    const wallet = JSON.parse(rawdata);

    for (const applicant of applicants) {
      if (applicant.user) {
        const user = await User.findById(applicant.user, user => user);
        if (user) {
          let file = await fetch(`https://cdn.grants.art/${ applicant.art }`)
            .then(res => res.buffer())
            .catch(function() {
              throw new Error('FETCH ERROR');
            });

          let transaction = await arweave.createTransaction({ data: file }, wallet);
          const ext = applicant.art.substr(applicant.art.length - 3).toLowerCase();
          let responsetype;
          if (ext === 'jpg' || ext === 'jpeg') responsetype = 'image/jpeg';
          if (ext === 'png') responsetype = 'image/png';
          if (ext === 'gif') responsetype = 'image/gif';
          if (ext === 'ebp') responsetype = 'image/webp';
          if (ext === 'mp4') responsetype = 'video/mp4';
          transaction.addTag('Content-Type', responsetype);
          await arweave.transactions.sign(transaction, wallet);
          let uploader = await arweave.transactions.getUploader(transaction);

          while (!uploader.isComplete) {
            await uploader.uploadChunk();
            console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
          }

          const metadata = {
            minter: "0x47BCD42B8545c23031E9918c3D823Be4100D4e87",
            mintedOn: "2021-03-14T00:00:00.777Z",
            contractAddress: address,
            minted: `Minted by ${ organizer.name } on behalf of ${ user.artistName }`,
            note: 'Minted with love by Sevens Foundation',
            exhibition: `${ program.name }`,
            fiatPrice: "$PRICELESS",
            name: `${ applicant.title }`,
            description: `${ applicant.description }`,
            youtube_url: "",
            price: 0,
            ethPrice: "0",
            amountToMint: 1,
            visibility: "safe",
            forSale: false,
            image: `https://arweave.net/${ transaction.id }`,
            attributes: [
              {
                trait_type: 'Artist',
                value: user.artistName || ''
              },
              {
                trait_type: 'Birth Year',
                value: user.birthYear || ''
              },
              {
                trait_type: 'Country of Representation',
                value: user.country || ''
              },
              {
                trait_type: 'Country Code',
                value: user.countryCode || ''
              },
              {
                trait_type: 'City',
                value: user.city || ''
              },
              {
                trait_type: 'Website',
                value: user.website || ''
              },
              {
                trait_type: 'Twitter',
                value: user.twitter || ''
              },
              {
                trait_type: 'Instagram',
                value: user.instagram || ''
              },
              {
                trait_type: 'Address',
                value: user.wallet || ''
              },
              {
                trait_type: 'Artwork',
                value: `https://arweave.net/${ transaction.id }`
              },
            ],
            category: "alJuInV4dezvHTNU8Dp1",
            external_url: `https://grants.art/${ program.url }/${ applicant.order }`,
            type: "ERC721"
          };

          let metadataTx = await arweave.createTransaction({ data: Buffer.from(JSON.stringify(metadata)) }, wallet);
          metadataTx.addTag('Content-Type', 'application/json');

          await arweave.transactions.sign(metadataTx, wallet);

          let metadataUploader = await arweave.transactions.getUploader(metadataTx);

          while (!metadataUploader.isComplete) {
            await metadataUploader.uploadChunk();
            console.log(`${metadataUploader.pctComplete}% complete, ${metadataUploader.uploadedChunks}/${metadataUploader.totalChunks}`);
          }

          applicant.arweave = transaction.id;
          console.log(metadataTx.id);

          const mintTo = program.mintToArtist ? user.wallet : organizer.wallet;
          const batchMint = Contract.methods.batchMint(mintTo, Number(1), metadataTx.id, Number(0), false)
          const encoded = batchMint.encodeABI();

          let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);

          let gasPrices = await getCurrentGasPrices()

          let details = {
            "to": process.env.DESTINATION_WALLET_ADDRESS,
            "gas": 26520,
            "gasPrice": gasPrices.super * 1000000000, // converts the gwei price to wei
            "chainId": 4 // EIP 155 chainId - mainnet: 1, rinkeby: 4
          }
          log(`The outgoing transaction count for your wallet address is: ${nonce}`.magenta)

          var tx = {
            nonce,
            to: address,
            from: sevensMintAddress,
            gas: 500000,
            gasLimit: block.gasLimit,
            gasPrice: details.gasPrice,
            data: encoded
          }

          console.log(applicant);

          await new Promise((resolve, reject) => {
            web3.eth.accounts.signTransaction(tx, process.env.WALLET_PRIVATE_KEY)
              .then(signed => {
                console.log('signed', signed);
                var tran = web3.eth.sendSignedTransaction(signed.rawTransaction);

                  tran.on('confirmation', (confirmationNumber, receipt) => {
                    if (confirmationNumber > 1) {
                      tran.off('error');
                      tran.off('receipt');
                      tran.off('transactionHash');
                      tran.off('confirmation');
                      resolve();
                    }
                    console.log('confirmation: ' + confirmationNumber);
                  });

                  tran.on('transactionHash', hash => {
                    applicant.published = true;
                    applicant.finalized = true;
                    applicant.accepted = true;
                    applicant.save();
                    console.log('hash');
                    console.log(hash);
                  });

                  tran.on('receipt', receipt => {
                    console.log('reciept');
                    console.log(receipt);
                  });

                  tran.on('error', error => {
                    console.log(error.toString());
                    throw new Error(error.toString());
                  });
              });
          });
        }
      }
    }

    program.mintInProgress = false;
    program.save();
  } catch (err) {
    console.log('ERROR MINTING', err)
    program.mintInProgress = false;
    program.save();
  }
}

// main()

module.exports = (app) => {
  app.post('/api/program/mint', async (req, res) => {
    const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
    const organizer = await Organizer.findOne({ _id: req.body.org, admins: jwt.id });
    if (!organizer) return res.json({ error: 'Authentication error' });
    const program = await Program.findById(req.body.id);
    if (!program) return res.json({ error: 'Authentication error' });
    if (!program.contractAddress) return res.json({ error: 'The collection contract does not exist' });
    if (program.mintInProgress) return res.json({ error: 'Minting is already in progress' });
    if (!program.mintToArtist && !organizer.wallet) return res.json({ error: 'Curator must verify wallet' });

    const exists = await ProgramApplicant.find({ published: true, program: req.body.id });
    if (program.passByVotes) {
      ProgramApplicant.find({ program: req.body.id, published: { $ne: true }, approvalCount: { $gte: program.voteThreshold } }, (err, applicants) => {
        let order = exists.length + 1;
        applicants.forEach(applicant => {
          applicant.order = order;
          applicant.save();
          order++;
        })

        program.mintInProgress = true;
        program.exhibiting = true;
        program.save();

        mint(applicants, program, organizer);
      })
    } else {
      ProgramApplicant.find({ })
    }
  });
};



const createExhibition = async (wallet, name, symbol, program) => {
  console.log('CREATING', wallet, name, symbol);

  try {
    let myBalanceWei = await web3.eth.getBalance(web3.eth.defaultAccount).then(balance => balance)
    let myBalance = await web3.utils.fromWei(myBalanceWei, 'ether');
    const block = await web3.eth.getBlock('latest');

    log(`Your wallet balance is currently ${myBalance} ETH`.green)
    const mintbaseFactoryAddress = '0x0e6541374e9D7DEe2C53C15a1a00fbe41C7b7198';
    const Contract = new web3.eth.Contract(MintbaseABI, mintbaseFactoryAddress);
    const sevensMintAddress = '0xEbfDF56E9c9A643c8abc13A4fbD679ed02F9ceb4';

    const launch = Contract.methods.launchStore(name, symbol, 'https://arweave.net/')
    const encoded = launch.encodeABI();

    let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);
    let gasPrices = await getCurrentGasPrices()

    let details = {
      "to": process.env.DESTINATION_WALLET_ADDRESS,
      "gas": 26520,
      "gasPrice": gasPrices.medium * 1000000000, // converts the gwei price to wei
      "chainId": 4 // EIP 155 chainId - mainnet: 1, rinkeby: 4
    }
    log(`The outgoing transaction count for your wallet address is: ${nonce}`.magenta)

    var tx = {
      nonce,
      to: mintbaseFactoryAddress,
      from: sevensMintAddress,
      gas: 500000,
      gasLimit: block.gasLimit,
      gasPrice: details.gasPrice,
      data: encoded
    }

    console.log(tx);

    await new Promise((resolve, reject) => {
      web3.eth.accounts.signTransaction(tx, process.env.WALLET_PRIVATE_KEY)
        .then(signed => {
          console.log('signed', signed);
        //   var tran = web3.eth.sendSignedTransaction(signed.rawTransaction);

        //     tran.on('confirmation', (confirmationNumber, receipt) => {
        //       if (confirmationNumber > 1) {
        //         tran.off('error');
        //         tran.off('receipt');
        //         tran.off('transactionHash');
        //         tran.off('confirmation');
        //         resolve();
        //       }
        //       console.log('confirmation: ' + confirmationNumber);
        //     });

        //     tran.on('transactionHash', hash => {
        //       applicant.published = true;
        //       applicant.finalized = true;
        //       applicant.accepted = true;
        //       applicant.save();
        //       console.log('hash');
        //       console.log(hash);
        //     });

        //     tran.on('receipt', receipt => {
        //       console.log('reciept');
        //       console.log(receipt);
        //     });

        //     tran.on('error', error => {
        //       console.log(error.toString());
        //       throw new Error(error.toString());
        //     });
        });
    });

    program.creationInProgress = false;
    program.save();
  } catch (err) {
    console.log('ERROR MINTING', err)
    program.creationInProgress = false;
    program.save();
  }
};

module.exports = (app) => {
  app.post('/api/program/createExhibition', async (req, res) => {
    const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
    const organizer = await Organizer.findOne({ _id: req.body.org, admins: jwt.id });
    if (!organizer) return res.json({ error: 'Authentication error' });
    const program = await Program.findById(req.body.program);
    if (!program) return res.json({ error: 'Authentication error' });
    if (program.creationInProgress) return res.json({ error: 'Contract creation is already in progress' });
    if (!req.body.wallet) return res.json({ error: 'No wallet provided' });
    if (!req.body.name || !req.body.symbol) return res.json({ error: 'Missing contract info' });
    organizer.wallet = req.body.wallet;
    organizer.save();

    program.creationInProgress = true;
    program.save();

    createExhibition(req.body.wallet, req.body.name, req.body.symbol, program);
  });
}