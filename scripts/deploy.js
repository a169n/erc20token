const hre = require("hardhat");

async function main() {
  const capValue = 100000000;
  const rewardValue = 100;

  const MyERC20Token = await hre.ethers.deployContract("MyERC20Token", [
    capValue,
    rewardValue,
  ]);

  await MyERC20Token.waitForDeployment();

  console.log(`MyERC20Token deployed to ${MyERC20Token.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
