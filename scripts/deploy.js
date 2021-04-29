const { ethers } = require('hardhat');

async function main() {
  const SevensFactory = await ethers.getContractFactory("SevensFactory");
  const factory = await SevensFactory.deploy();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });