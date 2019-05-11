import lotteryFactory from "../ethereum/loteryFactory";

const createLottery = async ticketPrice => {
    try {
        return await lotteryFactory.methods.createLottery(ticketPrice).call();
    } catch (e) {
        console.log(e);
    }
};

export default createLottery;