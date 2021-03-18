require('dotenv').config()
 
const Web3 = require('web3')
const axios = require('axios')
const fs = require('fs');
const log = require('ololog').configure({ time: true })
const Arweave = require('arweave');
const fetch = require('node-fetch');

const Applicant = require('mongoose').model('Applicant');
const User = require('mongoose').model('User');

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
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS_NOMINEE;

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


const main = async () => {
  let myBalanceWei = await web3.eth.getBalance(web3.eth.defaultAccount).then(balance => balance)
  let myBalance = await web3.utils.fromWei(myBalanceWei, 'ether');
  const block = await web3.eth.getBlock('latest');

  log(`Your wallet balance is currently ${myBalance} ETH`.green)
  const abiData = await fetch(`https://us-central1-thing-1d2be.cloudfunctions.net/getAbi?version=v1.0.0`)
  const { abi } = await abiData.json();
  const address = CONTRACT_ADDRESS;
  const Contract = new web3.eth.Contract(abi, address);
  const sevensMintAddress = '0xEbfDF56E9c9A643c8abc13A4fbD679ed02F9ceb4';
  const rawdata = await fs.readFileSync('./arweave.json');
  const wallet = JSON.parse(rawdata);

  Applicant.find({ accepted: false, order: { $exists: true }, published: { $ne: true } }, async (err, applicants) => {
    console.log(applicants);
    for (const applicant of applicants) {
      if (applicant.user) {
        const user = await User.findById(applicant.user, user => user);
        if (user) {
          let file = await fetch(`https://cdn.grants.art/${ applicant.art }`)
            .then(res => res.buffer())
            .catch(function() {
              console.log('FETCH ERROR'); // Write logic to retry
              process.exit(1);
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

          let thumbnail, transaction2;
          if (applicant.thumbnail) {
            file = await fetch(`https://cdn.grants.art/${ applicant.thumbnail }`)
              .then(res => res.buffer())
              .catch(function() {
                console.log('FETCH ERROR'); // Write logic to retry
                process.exit(1);
              });

            transaction2 = await arweave.createTransaction({ data: file }, wallet);
            const ext = applicant.thumbnail.substr(applicant.thumbnail.length - 3).toLowerCase();
            let responsetype;
            if (ext === 'jpg' || ext === 'jpeg') responsetype = 'image/jpeg';
            if (ext === 'png') responsetype = 'image/png';
            if (ext === 'gif') responsetype = 'image/gif';
            if (ext === 'ebp') responsetype = 'image/webp';
            if (ext === 'mp4') responsetype = 'video/mp4';
            transaction2.addTag('Content-Type', responsetype);
            await arweave.transactions.sign(transaction2, wallet);
            let uploader = await arweave.transactions.getUploader(transaction2);

            while (!uploader.isComplete) {
              await uploader.uploadChunk();
              console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
            }
          }

          const metadata = {
            minter: "0x47BCD42B8545c23031E9918c3D823Be4100D4e87",
            mintedOn: "2021-03-14T00:00:00.777Z",
            contractAddress: CONTRACT_ADDRESS,
            minted: `Minted by Sevens Foundation on behalf of ${ user.artistName }`,
            fiatPrice: "$PRICELESS",
            name: `${ applicant.title }`,
            description: `${ applicant.description }`,
            youtube_url: "",
            price: 0,
            ethPrice: "0",
            amountToMint: 1,
            visibility: "safe",
            forSale: false,
            image: `https://arweave.net/${ transaction2 ? transaction2.id : transaction.id }`,
            media: transaction2 ? { uri: `https://arweave.net/${ transaction.id }` } : undefined,
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
            external_url: `https://grants.art/gallery/${ applicant.order }`,
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

          console.log(metadataTx.id);

          const batchMint = Contract.methods.batchMint('0x47BCD42B8545c23031E9918c3D823Be4100D4e87', Number(1), metadataTx.id, Number(0), false)
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
                    process.exit();
                    reject();
                  });
              });
          });
        }
      }
    }
  }).sort('order')
}
 
main()