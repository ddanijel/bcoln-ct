import {SET_NEW_LOTTERY_ADDRESS_ADDRESS} from './actionTypes';
import {uiCloseCreateLotteryDialog, uiStartLoading, uiStopLoading} from "./uiActionCreators";
import lotteryFactory from "../../ethereum/loteryFactory";
import web3 from '../../ethereum/web3';

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
            const result = await lotteryFactory.methods.createLottery(ticketPrice).send({
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