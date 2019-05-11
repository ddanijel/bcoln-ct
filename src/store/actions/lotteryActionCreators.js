import {SET_DEPLOYED_LOTTERIES_ACTION, SET_NEW_LOTTERY_ADDRESS_ADDRESS} from './actionTypes';
import {uiCloseCreateLotteryDialog, uiStartLoading, uiStopLoading} from "./uiActionCreators";
import LotteryFactory from "../../ethereum/lotteryFactory";
import Lottery from "../../ethereum/lottery";
import web3 from '../../ethereum/web3';


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
    const lotteries = [];
    return async dispatch => {
        dispatch(uiStartLoading());
        addresses.forEach((address, index) => {
            const lottery = getLotteryDetails(address);
            const lotterySummary = {
                index,
                address,
                playersCount: web3.utils.hexToNumber(lottery[0]),
                ticketPrice: web3.utils.hexToNumber(lottery[1]),
                owner: lottery[2]
            };
            lotteries.push(lotterySummary);
        });
        dispatch(setLoadedLotteries(lotteries));
        dispatch(uiStopLoading());
    }
};

const getLotteryDetails = async (address) => {
    const lotteryInstance = await getLotteryInstance(address);

    return await lotteryInstance.methods.describeLottery().call();
};

const getLotteryInstance = async (address) => {
    return await Lottery(address);
};


export const setLoadedLotteries = lotteries => {
    return {
        type: SET_DEPLOYED_LOTTERIES_ACTION,
        lotteries
    }
};

export const createLottery = ticketPrice => {

    return async dispatch => {
        dispatch(uiStartLoading());
        dispatch(uiCloseCreateLotteryDialog());

        let accounts;
        setTimeout(
            accounts = await web3.eth.getAccounts()
            , 10000);

        console.log('accounts: ', accounts);

        try {
            // todo this creates a contract but the callback is not handled properly
            console.log('Creating a new Lottery from the account: ', accounts[0]);
            const result = await LotteryFactory.methods.createLottery(ticketPrice).send({
                from: accounts[0]
            });
            console.log('Lottery created: ', result);
        } catch (e) {
            console.error('Errow while creating a Lottery: ', e);
        }

        dispatch(uiStopLoading());
    };
};


export const setNewLotteryAddress = address => {
    return {
        type: SET_NEW_LOTTERY_ADDRESS_ADDRESS,
        address
    }
};