require("hardhat-deploy");
require("hardhat-deploy-ethers");

const { ethers } = require("ethers");

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log("Deployer Ethereum Address:", deployer);

  try {
    await deployPolyverseToken(deploy, deployer);
    await deployPolyverse(deploy, deployer);
    await deploySubscriptionContract(deploy, deployer);
    await deployDealClient(deploy, deployer);

    console.log("Contracts deployed successfully!");
  } catch (error) {
    console.error("Error deploying contracts:", error);
  }
};

async function deployPolyverseToken(deploy, deployer) {
  const PolyverseToken = await deploy("PolyverseToken", {
    from: deployer,
    args: [],
    log: true,
  });

  console.log("PolyverseToken Event NFT:", PolyverseToken.address);
}

async function deployPolyverse(deploy, deployer) {
  const PolyverseToken = await deployments.get("PolyverseToken");
  
  const Polyverse = await deploy("Polyverse", {
    from: deployer,
    args: [PolyverseToken.address],
    log: true,
  });

  console.log("Polyverse:", Polyverse.address);
}



async function deploySubscriptionContract(deploy, deployer) {
  const PolyverseToken = await deployments.get("PolyverseToken");
  await deploy("SubscriptionContract", {
    from: deployer,
    args: [PolyverseToken.address],
    log: true,
  });
}

async function deployDealClient(deploy, deployer) {
  await deploy("DealClient", {
    from: deployer,
    args: [],
    log: true,
  });
}