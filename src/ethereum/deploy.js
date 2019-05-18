const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledLottery = require('./build/LotteryFactory');

const provider = new HDWalletProvider(
    process.env.REACT_APP_ETH_ACCOUNT_SEED_WORDS,
    process.env.REACT_APP_ETH_REMOTE_NODE_URL
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account: ', accounts[0]);
    const result = await new web3
        .eth
        .Contract(JSON.parse(compiledLottery.interface))
        .deploy({data: '0x' + compiledLottery.bytecode})
        .send({gas: 1000000, from: accounts[0]});

    console.log('LotteryFactory contract deployed to: ', result.options.address);
//    0x22aC395C525F02D3Add9194B907F3c5DE7978DEF
};

deploy().catch(error => {
    console.error(error)
});


// to deploy run the following command: REACT_APP_ETH_ACCOUNT_SEED_WORDS='<ENTER_SEED_WORDS>' REACT_APP_ETH_REMOTE_NODE_URL='<ENTER_NODE_URL>' node ./src/ethereum/deploy.js