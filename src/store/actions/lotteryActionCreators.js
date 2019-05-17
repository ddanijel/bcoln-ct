import {SET_ACTIVE_LOTTERY_ACTION, SET_CLOSED_LOTTERY_ACTION, SET_LOTTERY_ACTION} from './actionTypes';
import {uiStartLoading, uiStopLoading} from "./uiActionCreators";
import LotteryFactory from "../../ethereum/lotteryFactory";
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



export const fetchDeployedLotteries = () => {
    return async dispatch => {
        try {
            const deployedLotteriesAddresses = await LotteryFactory.methods.getDeployedLotteries().call();
            dispatch(loadLotteries(deployedLotteriesAddresses));
        } catch (e) {
            console.error('Error while fetching deployed lotteries: ', e);
        }
    }
};

export const loadLotteries = addresses => {
    return async dispatch => {
        addresses.forEach(async address => {
            try {
                const lottery = await getLotteryDetails(address);
                const lotteryData = {
                    address: address,
                    playersCount: web3.utils.hexToNumber(lottery[0]),
                    ticketPrice: web3.utils.fromWei(String(lottery[1]), 'ether'),
                    owner: lottery[2]
                };
                dispatch(setLotteryData(lotteryData));
            } catch (e) {
                console.error('Error while fetching the lottery data from the address: ', address, e);
            }
        });
    }
};

const getLotteryDetails = async (address) => {
    const lotteryInstance = await getLotteryInstance(address);
    return await lotteryInstance.methods.describeLottery().call();
};

const getLotteryInstance = async (address) => {
    return await Lottery(address);
};

export const setLotteryData = lottery => {
    return {
        type: SET_LOTTERY_ACTION,
        lottery
    }
};

export const setActiveLottery = lottery => {
    return {
        type: SET_ACTIVE_LOTTERY_ACTION,
        lottery
    }
};