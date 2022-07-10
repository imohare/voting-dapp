
const hre = require("hardhat");

async function main() {
  
  // We get the contract to deploy
  const WimbledonSentiment = await hre.ethers.getContractFactory("WimbledonSentiment");  
  const wimbledonsentiment = await WimbledonSentiment.deploy();

  await wimbledonsentiment.deployed();

  console.log("WimbledonSentiment deployed to:", wimbledonsentiment.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
