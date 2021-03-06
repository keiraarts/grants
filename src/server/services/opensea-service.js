const Web3 = require('web3');
const { OpenSeaPort, Network } = require('opensea-js');

// This example provider won't let you make transactions, only read-only calls:
const provider = new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${ process.env.INFURA }`)

const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main
})

async function test() {
  const OpenSeaAsset = await seaport.api.getAsset({
    tokenAddress: '0xeaa4c58427c184413b04db47889b28b5c98ebb7b',
    tokenId: '1',
  });  
  console.log(OpenSeaAsset);
}

// test();