# Decentralized Lottery game

## Prerequisites

In order to be able to play the lottery, you have to have Metamask installed and an account on Rinkeby Testnet. 

## Website

The lottery is available at: https://ddanijel.github.io/bcoln-ct/

## Compile contracts
`node ./src/ethereum/compile.js`

## Deploy
`REACT_APP_ETH_ACCOUNT_SEED_WORDS='<ENTER_SEED_WORDS>' REACT_APP_ETH_REMOTE_NODE_URL='<ENTER_NODE_URL>' node ./src/ethereum/deploy.js`
Also, you can deploy the contracts with Remix `https://remix.ethereum.org`

The address of the factory contract should be provided in the  `./src/ethereum/lotteryFactory.js` file.

The current Lottery Factory address is: `0x0753cc92df084e0d2ed748d277137ec28c2e9fbe`

## Run
```
$ npm start

If you want to be able to connect to the smart contract without the Metamask extension, you can provide your mnemonic code, and the remote client url in the `.env` file.
To do so, copy the `.env.example` to `.env` and enter your parameters in `.env` file. After that you can run `npm start`
```

## Documentation
Available at `./report/main.pdf`

## Authors 
```
Danijel Dordevic
Ratanak Hy
Claude Muller
Lucas Thorbecke
```
