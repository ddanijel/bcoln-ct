import web3 from './web3';
import Lottery from './build/Lottery';

export default address => new web3.eth.Contract(
    JSON.parse(Lottery.interface),
    address
);