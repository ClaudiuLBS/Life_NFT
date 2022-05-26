# Life NFT

## How it works

- Merkle Three whitelist
- Auto generated NTFs with python 
- Metadata and images are hosted on ipfs
- Whitelisted addresses stored on firebase
- [Testnet Official Life NFT](https://testnets.opensea.io/collection/life-nft-official)

## Tech

- [React](https://reactjs.org/) - frontend
- [Firebase](https://firebase.google.com/) - database
- [Hardhad](https://hardhat.org/) - blockchain

## Installation
- ***Install frontend npm packages***
```
cd frontend/
npm i
npm run start
```
- ***Go to http://localhost:3000/***
##### ONLY IF YOU WANT TO DEPLOY ANOTHER CONTRACT:
- ***Install blockchain npm packages***
```
$ cd blockchain/
$ npm i
$ touch .env
```
- ***Configure the .env file***
```
PRIVATE_KEY=<wallet key>
INFURA_API_KEY=<infura api key>
```
- ***Deploy contract***
```
$ npx hardhat run --network rinkeby scripts/deploy.js
```
