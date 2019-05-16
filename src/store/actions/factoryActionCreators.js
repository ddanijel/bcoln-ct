import {SET_FACTORY_ACTION} from './actionTypes';
import {uiStartLoading, uiStopLoading} from "./uiActionCreators";
import LotteryFactory from "../../ethereum/lotteryFactory";
import web3 from "../../ethereum/web3";


export const loadFactory = () => {
    return async dispatch => {
        dispatch(uiStartLoading());
        try {
            const factoryDetails = await LotteryFactory.methods.describeFactory().call();
            dispatch(setFactory(factoryDetails));
        } catch (e) {
            dispatch(uiStopLoading());
            console.error('Error while fetching deployed lotteries: ', e);
        }
        dispatch(uiStopLoading());
    }
};

export const setFactory = factoryDetails => {
    const factory = {
        manager: factoryDetails[0],
        ticketPrice: web3.utils.hexToNumber(factoryDetails[1]),
        maxGuessNumber: web3.utils.hexToNumber(factoryDetails[2]),
        currentLottery: factoryDetails[3],
        allLotteries: factoryDetails[4],
        randomNumberGenerator: factoryDetails[5]
    };
    return {
        type: SET_FACTORY_ACTION,
        factory
    }
};


export const playLottery = (ticketPrice, guessNumber) => {
    return async dispatch => {
        dispatch(uiStartLoading());
        try {
            console.log("price: ", ticketPrice, "num: ", guessNumber);

            const accounts = await web3.eth.getAccounts();
            await LotteryFactory.methods.play(guessNumber).send(
                {
                    from: accounts[0],
                    value: web3.utils.toWei(String(ticketPrice), 'wei')
                }
            );
        } catch (e) {
            dispatch(uiStopLoading());
            console.error("Error while playing the lottery: ", e);
        }
    }
};