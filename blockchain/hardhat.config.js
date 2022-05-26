require("@nomiclabs/hardhat-waffle");
require("dotenv").config()

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./artifacts",
  },
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
