const { ethers } = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // Deploy the ERC20 Token Contract
  const MyERC20Token = await ethers.getContractFactory("ERC20Token"); // Use getContractFactory
  const myERC20Token = await MyERC20Token.deploy(150); // Deploy the contract
  await myERC20Token.deployed();
  console.log("MyERC20Token deployed to:", myERC20Token.address);

  // Sleep for 30 seconds to let Etherscan catch up with the deployment
  await sleep(30 * 1000);

  // Verify the ERC20 Token Contract
  await hre.run("verify:verify", {
    address: myERC20Token.address,
    constructorArguments: [150], // Update with your actual constructor arguments
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
