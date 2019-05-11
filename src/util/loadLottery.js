import lottery from "../ethereum/lottery";

const loadedLotteryFactory = async address => {
    try {
        return await lottery.methods.getDeployedLotteries().call();
    } catch (e) {
        console.log(e);
    }
};

export default loadedLotteryFactory;