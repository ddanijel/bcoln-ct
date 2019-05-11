import lotteryFactory from "../ethereum/loteryFactory";

const loadedLotteryFactory = async () => {
    try {
        return await lotteryFactory.methods.getDeployedLotteries().call();
    } catch (e) {
        console.log(e);
    }
};

export default loadedLotteryFactory;