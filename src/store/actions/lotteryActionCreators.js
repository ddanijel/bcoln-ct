import {SET_ACTIVE_LOTTERY_ACTION, SET_CLOSED_LOTTERY_ACTION} from './actionTypes';
import {uiStartLoading, uiStopLoading} from "./uiActionCreators";
import Lottery from "../../ethereum/lottery";
import web3 from '../../ethereum/web3';


export const loadActiveLottery = address => {
    return async dispatch => {
        dispatch(uiStartLoading());
        const lottery = await getLotteryDetails(address);
        const lotteryData = {
            address: address,
            closed: lottery[0],
            playersCount: web3.utils.hexToNumber(lottery[1]),
            ticketPrice: web3.utils.fromWei(String(lottery[2]), 'ether'),
            owner: lottery[3]
        };
        dispatch(setActiveLottery(lotteryData));
        dispatch(uiStopLoading());
    }
};


export const loadPlayedLottery = address => {
    return async dispatch => {
        dispatch(uiStartLoading());
        const lottery = await getLotteryDetails(address);
        const playedLottery = {
            address: address,
            closed: lottery[0],
            playersCount: web3.utils.hexToNumber(lottery[1]),
            ticketPrice: web3.utils.fromWei(String(lottery[2]), 'ether'),
            owner: lottery[3],
            winNumber: web3.utils.hexToNumber(lottery[4]),
            winners: lottery[5]
        };
        dispatch(setPlayedLottery(playedLottery));
        dispatch(uiStopLoading());
    }
};


export const setPlayedLottery = lottery => {
    return {
        type: SET_CLOSED_LOTTERY_ACTION,
        lottery
    }
};

const getLotteryDetails = async (address) => {
    const lotteryInstance = await getLotteryInstance(address);
    return await lotteryInstance.methods.describeLottery().call();
};

const getLotteryInstance = async (address) => {
    return await Lottery(address);
};

export const setActiveLottery = lottery => {
    return {
        type: SET_ACTIVE_LOTTERY_ACTION,
        lottery
    }
};