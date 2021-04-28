require('dotenv').config()
 
const Web3 = require('web3')
const axios = require('axios')
const path = require('path');
const fs = require('fs');
const log = require('ololog').configure({ time: true })
const Arweave = require('arweave');
const fetch = require('node-fetch');
const verify = require('verify-on-etherscan');
// const hre = require('@nomiclabs/hardhat-etherscan');

const auth = require('./authorization-service');
const Sevens = require('./Sevens.json');
const SevensFactory = require('./SevensFactory.json');
const ERC721 = require('./ERC721.json');

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
const mainnetWS = `wss://mainnet.infura.io/ws/v3/${process.env.INFURA}`
const web3 = new Web3( new Web3.providers.HttpProvider(mainnet) )
const web3WS = new Web3( new Web3.providers.WebsocketProvider(mainnetWS) )

const MINT_WALLET = process.env.WALLET;
web3.eth.defaultAccount = MINT_WALLET;

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

    log(`Your wallet balance is currently ${myBalance} ETH`.green)
    const address = program.contractAddress;
    const Contract = new web3.eth.Contract(Sevens.abi, address);
    const rawdata = await fs.readFileSync('./arweave.json');
    const wallet = JSON.parse(rawdata);
    let total;

    for (const applicant of applicants) {
      if (applicant.user) {
        const block = await web3.eth.getBlock('latest');
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
          const batchMint = Contract.methods.batchMint(mintTo, Number(1), metadataTx.id, Number(0), [mintTo], [1000])
          const encoded = batchMint.encodeABI();

          let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);

          let gasPrices = await getCurrentGasPrices()
          let estimatedGas = await web3.eth.estimateGas({
            to: address,
            data: encoded
          });


          var tx = {
            nonce,
            to: address,
            from: MINT_WALLET,
            gas: new web3.utils.BN(estimatedGas * 1.5),
            gasLimit: block.gasLimit * 1.5,
            gasPrice: gasPrices.super * 1000000000,
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
                    program.total = applicant.order;
                    total = program.total;
                    program.save();
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
    if (total) program.total = total;
    program.save();
  } catch (err) {
    console.log('ERROR MINTING', err)
    program.mintInProgress = false;
    program.save();
  }
}


const addMinterAndTransfer = async (wallet, address, program) => {
  try {
    let myBalanceWei = await web3.eth.getBalance(web3.eth.defaultAccount).then(balance => balance)
    let myBalance = await web3.utils.fromWei(myBalanceWei, 'ether');
    const block = await web3.eth.getBlock('latest');

    log(`Your wallet balance is currently ${myBalance} ETH`.green)
    const Contract = new web3.eth.Contract(ERC721, address);
    const ContractWS = new web3WS.eth.Contract(ERC721, address);
    const encoded = Contract.methods.addMinter(wallet).encodeABI();

    let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);
    let gasPrices = await getCurrentGasPrices()

    let estimatedGas = await web3.eth.estimateGas({
      to: address,
      data: encoded
    });

    let tx = {
      nonce,
      to: address,
      from: MINT_WALLET,
      gas: new web3.utils.BN(estimatedGas * 1.5),
      gasLimit: block.gasLimit * 1.5,
      gasPrice: gasPrices.high * 1000000000,
      data: encoded
    }

    console.log(tx);

    await new Promise((resolve, reject) => {
      web3.eth.accounts.signTransaction(tx, process.env.WALLET_PRIVATE_KEY)
        .then(signed => {
          const addMinter = ContractWS.events.MinterAdded();
          addMinter.on('data', (event) => {
            console.log('MINTER ADDED', event);
            addMinter.off('data');
            resolve();
          })

          web3.eth.sendSignedTransaction(signed.rawTransaction);
      });
    });

    const transferEncoded = Contract.methods.transferOwnership(wallet).encodeABI();

    nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);
    gasPrices = await getCurrentGasPrices()

    estimatedGas = await web3.eth.estimateGas({
      to: address,
      data: transferEncoded
    });

    tx = {
      nonce,
      to: address,
      from: MINT_WALLET,
      gas: new web3.utils.BN(estimatedGas * 1.5),
      gasLimit: block.gasLimit * 1.5,
      gasPrice: gasPrices.high * 1000000000,
      data: transferEncoded
    }

    await new Promise((resolve, reject) => {
      web3.eth.accounts.signTransaction(tx, process.env.WALLET_PRIVATE_KEY)
        .then(signed => {
          const transferred = ContractWS.events.OwnershipTransferred();
          transferred.on('data', (event) => {
            console.log('OWNERSHIP TRANSFERRED', event);
            program.ownershipTransferred = true;
            program.save();
            transferred.off('data');
            resolve();
          });

          web3.eth.sendSignedTransaction(signed.rawTransaction);
      });
    });

  } catch (err) {
    console.log('ERROR MINTING', err)
  }
}

// const verifyEtherScan = async (address, encoded) => {
//   const sevensFactory = '0xec74d232fC2968Bfc873995ee89bba521396e943';
//   const Contract = new web3.eth.Contract(SevensFactory.abi, sevensFactory);
//   encoded = Contract.methods.launchStore('Sevens Specialis', 'ART', 'https://arweave.net/').encodeABI();
//   address = '0xbc9Bf05D180403d0Dcc30e061bb9c0d67EEe66a1';
//   console.log('WTF', process.env.ETHERSCAN);

//   encoded = web3.eth.abi.encodeParameters(['string','string', 'string'], ['Sevens Specialis', 'ART', 'https://arweave.net/'])

//   console.log('wtf', encoded);

//   const result = await verify({
//     cwd: __dirname,
//     artifacts: ['./Sevens.json'],
//     apiKey: process.env.ETHERSCAN,
//     web3,
//     // optimizer,
//     // output,
//     // delay,
//     // logger,
//     verbose: true
//   })

//   console.log(result);
  
  // await fetch(`https://api.etherscan.io/address/${ address }#code`, {
  // await fetch(`https://api.etherscan.io/api`, {
  //     method: 'POST',
  //     body: new URLSearchParams({
  //       apiKey: process.env.ETHERSCAN,
  //       module: 'contract',                             //Do not change
  //       action: 'verifysourcecode',                     //Do not change
  //       contractaddress: address,   //Contract Address starts with 0x...     
  //       sourceCode: Sevens.source,             //Contract Source Code (Flattened if necessary)
  //       codeformat: 'solidity-single-file',             //solidity-single-file (default) or solidity-standard-json-input (for std-input-json-format support
  //       contractname: 'Sevens.sol:Sevens',         //ContractName (if codeformat=solidity-standard-json-input, then enter contractname as ex: erc20.sol:erc20)
  //       compilerversion: 'v0.5.16+commit.9c3226ce',   // see https://etherscan.io/solcversions for list of support versions
  //       optimizationUsed: '1', //0 = No Optimization, 1 = Optimization used (applicable when codeformat=solidity-single-file)
  //       runs: 200,                                      //set to 200 as default unless otherwise  (applicable when codeformat=solidity-single-file)        
  //       constructorArguements: encoded.substring(2),   //if applicable
  //       evmversion: 'istanbul',             //leave blank for compiler default, homestead, tangerineWhistle, spuriousDragon, byzantium, constantinople, petersburg, istanbul (applicable when codeformat=solidity-single-file)
  //       licenseType: 1,           //Valid codes 1-12 where 1=No License .. 12=Apache 2.0, see https://etherscan.io/contract-license-types
  //     }),
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
  // })
  // .then(res => res.json())
  // .then(json => {
  //   if (json && json.status === '1') {
  //     setTimeout(() => {
  //       fetch(`https://api.etherscan.io/api`, {
  //         method: 'POST',
  //         body: new URLSearchParams({
  //           apiKey: process.env.ETHERSCAN,
  //           guid: json.result,                             //Do not change
  //           module: 'contract',                     //Do not change
  //           action: 'checkverifystatus',   //Contract Address starts with 0x...     
  //         }),
  //         headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
  //       }).then(res => res.json())
  //       .then(json => {
  //         console.log('WTF RESULT', json);
  //         });
  //     }, 60000)
  //   }
  //   console.log('VERIIFED', json);
  // })
  // .catch(e => {
  //   console.log('GOT ERR', e);
  // })
// }

// const verifyEtherScan = async () => {
//   const verify = await hre.run("verify:verify", {
//     address: '0xbc9Bf05D180403d0Dcc30e061bb9c0d67EEe66a1',
//     constructorArguments: [
//       'Sevens Specialis',
//       'ART',
//       'https://arweave.net/'
//     ],
//   })

//   console.log(verify);
// }

// verifyEtherScan();

const createExhibition = async (wallet, name, symbol, program) => {
  console.log('CREATING', wallet, name, symbol);

  try {
    let myBalanceWei = await web3.eth.getBalance(web3.eth.defaultAccount).then(balance => balance)
    let myBalance = await web3.utils.fromWei(myBalanceWei, 'ether');
    const block = await web3.eth.getBlock('latest');

    log(`Your wallet balance is currently ${myBalance} ETH`.green)
    const sevensFactory = '0xec74d232fC2968Bfc873995ee89bba521396e943';
    const Contract = new web3.eth.Contract(SevensFactory.abi, sevensFactory);
    const ContractWS = new web3WS.eth.Contract(SevensFactory.abi, sevensFactory);
    const encoded = Contract.methods.launchStore(name, symbol, 'https://arweave.net/').encodeABI();

    let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);
    let gasPrices = await getCurrentGasPrices()

    let estimatedGas = await web3.eth.estimateGas({
      to: sevensFactory,
      data: encoded
    });

    let tx = {
      nonce,
      to: sevensFactory,
      from: MINT_WALLET,
      gas: new web3.utils.BN(estimatedGas * 1.5),
      gasLimit: block.gasLimit * 1.5,
      gasPrice: gasPrices.high * 1000000000,
      data: encoded
    }

    console.log(tx);

    await new Promise((resolve, reject) => {
      web3.eth.accounts.signTransaction(tx, process.env.WALLET_PRIVATE_KEY)
        .then(signed => {
          const launch = ContractWS.events.StoreLaunch();
          launch.on('data', (event) => {
            console.log('GOT EVENT', event);
            if (event && event.returnValues) {
              if (event.returnValues['1'] === name && event.returnValues['2'] === symbol) {
                const address = event.returnValues['0'];
                program.contractAddress = address;
                program.creationInProgress = false;
                program.save();

                launch.off('data');

                addMinterAndTransfer(wallet, address, program);
                // verifyEtherScan(address, encoded);
                resolve(program);
              }
            }
          })

          web3.eth.sendSignedTransaction(signed.rawTransaction);
      });
    });
  } catch (err) {
    console.log('ERROR MINTING', err)
    program.creationInProgress = false;
    program.save();
  }
};

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

    if (program.passByVotes) {
      ProgramApplicant.find({ program: req.body.id, order: { $exists: true }, published: false }, (err, applicants) => {
        program.mintInProgress = true;
        program.exhibiting = true;
        program.save();

        mint(applicants, program, organizer);
      })
    } else {
      ProgramApplicant.find({ })
    }
  });

  app.post('/api/program/createExhibition', async (req, res) => {
    const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
    const organizer = await Organizer.findOne({ _id: req.body.org, admins: jwt.id });
    if (!organizer) return res.json({ error: 'Authentication error' });
    const program = await Program.findById(req.body.program);
    if (!program) return res.json({ error: 'Authentication error' });
    if (program.creationInProgress) return res.json({ error: 'Contract creation is already in progress' });
    if (program.contractAddress) return res.json({ error: 'Contract already created' });
    if (!req.body.wallet) return res.json({ error: 'No wallet provided' });
    if (!req.body.name || !req.body.symbol) return res.json({ error: 'Missing contract name or symbol' });
    organizer.wallet = req.body.wallet;
    organizer.save();

    program.creationInProgress = true;
    program.save();

    createExhibition(req.body.wallet, req.body.name, req.body.symbol, program);
    return res.json({ success: 'Creation started' });
  });
}


// module.exports = (app) => {
//   app.post('/api/program/addMinterAndTransfer', async (req, res) => {
//     const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
//     const organizer = await Organizer.findOne({ _id: req.body.org, admins: jwt.id });
//     if (!organizer) return res.json({ error: 'Authentication error' });
//     const program = await Program.findById(req.body.program);
//     if (!program) return res.json({ error: 'Authentication error' });
//     if (program.creationInProgress) return res.json({ error: 'Contract creation is already in progress' });
//     if (!req.body.wallet) return res.json({ error: 'No wallet provided' });
//     if (!req.body.name || !req.body.symbol) return res.json({ error: 'Missing contract info' });

//     addMinterAndTransfer(req.body.wallet, program.contractAddress, program);
//     return res.json({ success: 'Creation started' });
//   });
// }

