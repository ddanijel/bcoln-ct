import Web3 from 'web3';

const HDWalletProvider = require('truffle-hdwallet-provider');

const provider = new HDWalletProvider(
    process.env.ETH_ACCOUNT_SEED_WORDS,
    process.env.ETH_REMOTE_NODE_URL
);

export default new Web3(provider);