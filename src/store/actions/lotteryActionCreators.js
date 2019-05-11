import {SET_ACTIVE_LOTTERY_ACTION, SET_LOTTERY_ACTION, SET_NEW_LOTTERY_ADDRESS_ADDRESS} from './actionTypes';
import {uiCloseCreateLotteryDialog, uiClosePlayLotteryDialog, uiStartLoading, uiStopLoading} from "./uiActionCreators";
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

export const createLottery = ticketPrice => {

    return async dispatch => {
        dispatch(uiStartLoading());
        dispatch(uiCloseCreateLotteryDialog());

        const accounts = await web3.eth.getAccounts();

        console.log('accounts: ', accounts);

        try {
            // todo this creates a contract but the callback is not handled properly
            console.log('Creating a new Lottery from the account: ', accounts[0]);
            const result = await LotteryFactory.methods.createLottery(web3.utils.toWei('0.01', 'ether')).send({
                from: accounts[0]
            });
            console.log('Lottery created: ', result);
        } catch (e) {
            console.error('Error while creating a Lottery: ', e);
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

export const playLottery = (lotteryData, guess) => {

    console.log('playing: ', lotteryData, 'guess: ', guess);

    return async dispatch => {
        dispatch(uiStartLoading());
        dispatch(uiClosePlayLotteryDialog());

        const accounts = await web3.eth.getAccounts();
        console.log('accounts: ', accounts);

        try {
            const lottery = await getLotteryInstance(lotteryData.address);
            console.log('lot: ', lottery);
            const result = await lottery.methods.play(guess).send({
                from: accounts[0],
                value: web3.utils.toWei(String(Number(lotteryData.ticketPrice) + 0.0001), 'ether')
            });
            console.log('Lottery played: ', result);
        } catch (e) {
            console.error('Error while playing the Lottery: ', e);
        }

        dispatch(uiStopLoading());
    };
};

export const setActiveLottery = lottery => {
    return {
        type: SET_ACTIVE_LOTTERY_ACTION,
        lottery
    }
};