const { ethers } = require('hardhat');

async function main() {
  const SevensFactory = await ethers.getContractFactory("SevensFactory");
  const factory = await SevensFactory.deploy();
  // const SevensFactory = await ethers.getContractFactory("Sevens");
  // const factory = await SevensFactory.deploy('Polygon x Sevens', '777', 'https://arweave.net/', '0xEbfDF56E9c9A643c8abc13A4fbD679ed02F9ceb4', '0xEbfDF56E9c9A643c8abc13A4fbD679ed02F9ceb4');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });