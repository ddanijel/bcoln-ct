import Web3 from 'web3';


let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
} else {
    const HDWalletProvider = require('truffle-hdwallet-provider');

    const provider = new HDWalletProvider(
        process.env.REACT_APP_ETH_ACCOUNT_SEED_WORDS,
        process.env.REACT_APP_ETH_REMOTE_NODE_URL
    );

    web3 = new Web3(provider);
}

if (web3 === undefined) {
    alert('Please enable Metamask to continue');
}

export default web3;