import web3 from './web3';
import LotteryFactory from './build/LotteryFactory';

const instance = new web3.eth.Contract(
    JSON.parse(LotteryFactory.interface),
    '0x22aC395C525F02D3Add9194B907F3c5DE7978DEF' // address obtained when the sc is deployed
);

export default instance;