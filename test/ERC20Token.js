const { expect } = require("chai");

describe("ERC20Token", function () {
  let ERC20Token;
  let token;

  beforeEach(async function () {
    ERC20Token = await ethers.getContractFactory("ERC20Token");
    token = await ERC20Token.deploy("TestToken", "TST", 1000000, ethers.provider.getSigner(0).getAddress());
    await token.deployed();
  });

  it("Should deploy with the correct initial parameters", async function () {
    expect(await token.name()).to.equal("TestToken");
    expect(await token.symbol()).to.equal("TST");
    expect(await token.totalSupply()).to.equal(1000000);
    expect(await token.balanceOf(await ethers.provider.getSigner(0).getAddress())).to.equal(1000000);
  });

  it("Should allow minting new tokens by the owner", async function () {
    await token.connect(ethers.provider.getSigner(0)).mintWithReward(ethers.provider.getSigner(1).getAddress(), 1000);
    expect(await token.balanceOf(ethers.provider.getSigner(1).getAddress())).to.equal(1000);
  });

  it("Should not allow minting by non-owners", async function () {
    await expect(token.connect(ethers.provider.getSigner(1)).mintWithReward(ethers.provider.getSigner(1).getAddress(), 1000)).to.be.revertedWith("Ownable: caller is not the owner");
  });

});
