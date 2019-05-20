import web3 from './web3';
import LotteryFactory from './build/LotteryFactory';

const instance = new web3.eth.Contract(
    JSON.parse(LotteryFactory.interface),
    // '0x22aC395C525F02D3Add9194B907F3c5DE7978DEF' // address obtained when the sc is deployed
    // '0x7d0d91ba579e14a19145e3cce8f03d29076b9d82'
    // '0xd151ee4f8cc9c2c4f89e63e31393f484742877e0'
    // '0xc6822849fab35a0c17321a8b6196c711ebbaabbd'
    // '0x8f2a82701a732d745103e3237d4444fdcefbdbb1'
    '0x70cffa921f0eac4d968534861e1a2e34afbed1a3'
);

export default instance;