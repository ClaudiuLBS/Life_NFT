const hre = require("hardhat");
const path = require("path");
const fse = require("fs-extra");

async function main() {
  const root = "0xede2af50216ca16547d7ed4b7cae19dffa880c009a75f5fb69dbf1bf337f036b";
  const LifeNFT = await hre.ethers.getContractFactory("LifeNFT");
  const lifeNFT = await LifeNFT.deploy(root);
  await lifeNFT.deployed();

  const srcDir = path.resolve(__dirname, "../artifacts");
  const destDir = path.resolve(__dirname, "../../frontend/src/artifacts");

  //copy artifacts to frontend/src
  fse.copySync(srcDir, destDir, { overwrite: true }, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("success!");
    }
  });

  //copy the address to the address.js file from frontend/src
  const addressDir = path.resolve(__dirname, "../../frontend/src/address.js");
  fse.writeFileSync(addressDir, `export const address = '${lifeNFT.address}'`, (err) => console.log(err));

  console.log("LifeNFT deployed to:", lifeNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
