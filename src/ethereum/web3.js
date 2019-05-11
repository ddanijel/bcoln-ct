import Web3 from 'web3';

// console.log('REACT_APP_ETH_ACCOUNT_SEED_WORDS: ', process.env.REACT_APP_ETH_ACCOUNT_SEED_WORDS);
// console.log('REACT_APP_ETH_REMOTE_NODE_URL: ', process.env.REACT_APP_ETH_REMOTE_NODE_URL);

const HDWalletProvider = require('truffle-hdwallet-provider');

const provider = new HDWalletProvider(
    process.env.REACT_APP_ETH_ACCOUNT_SEED_WORDS,
    process.env.REACT_APP_ETH_REMOTE_NODE_URL
);

export default new Web3(provider);