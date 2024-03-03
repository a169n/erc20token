const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyERC20Token", function () {
  let MyERC20Token;
  let myERC20Token;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    MyERC20Token = await ethers.getContractFactory("MyERC20Token");
    [owner, addr1, addr2] = await ethers.getSigners();

    const capValue = ethers.parseEther("100000000"); // 100 million tokens
    const rewardValue = ethers.parseEther("100"); // 100 tokens

    myERC20Token = await MyERC20Token.deploy(capValue, rewardValue);
    await myERC20Token.waitForDeployment();
  });

  it("Should return the correct name and symbol", async function () {
    expect(await myERC20Token.name()).to.equal("AibynToken");
    expect(await myERC20Token.symbol()).to.equal("ABN");
  });

  it("Should mint initial supply to owner", async function () {
    const initialSupply = await myERC20Token.totalSupply();
    expect(initialSupply).to.equal(ethers.parseEther("50000000")); // 50 million tokens
    expect(await myERC20Token.balanceOf(owner.address)).to.equal(initialSupply);
  });

  it("Should transfer tokens between accounts", async function () {
    const amount = ethers.parseEther("1000");
    await myERC20Token.transfer(addr1.address, amount);
    expect(await myERC20Token.balanceOf(addr1.address)).to.equal(amount);
  });

  it("Should approve and transferFrom tokens between accounts", async function () {
    const amount = ethers.parseEther("1000");
    await myERC20Token.approve(addr1.address, amount);
    await myERC20Token
      .connect(addr1)
      .transferFrom(owner.address, addr2.address, amount);
    expect(await myERC20Token.balanceOf(addr2.address)).to.equal(amount);
  });

  it("Should allow burning tokens by the owner", async function () {
    const amount = ethers.parseEther("1000");
    await myERC20Token.burn(amount);
    expect(await myERC20Token.balanceOf(owner.address)).to.equal(
      ethers.parseEther("49999000")
    );
  });

  it("Should not allow non-owner to set block reward", async function () {
    const newReward = ethers.parseEther("200");
    await expect(
      myERC20Token.connect(addr1).setBlockReward(newReward)
    ).to.be.revertedWith("Only the owner can call this function");
  });
});
