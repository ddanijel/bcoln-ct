import {ON_PLAYED_LOTTERY_ACTION, SET_FACTORY_ACTION} from './actionTypes';
import {uiOpenPlayedLotteryDialog, uiStartLoading, uiStopLoading} from "./uiActionCreators";
import LotteryFactory from "../../ethereum/lotteryFactory";
import web3 from "../../ethereum/web3";
import {loadPlayedLottery} from "./lotteryActionCreators";


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
        ticketPrice: web3.utils.fromWei(String(factoryDetails[1]), 'ether'),
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
    return dispatch => {
        dispatch(uiStartLoading());
        let confirmed = false;
        web3.eth.getAccounts().then(accounts => {
            LotteryFactory.methods.play(guessNumber).send(
                {
                    from: accounts[0],
                    value: web3.utils.toWei(String(ticketPrice), 'ether')
                }
            )
                .on('error', (error) => {
                    dispatch(uiStopLoading());
                    console.log('Error while playing the lottery: ', error)
                })
                .on('confirmation', confirmationNumber => {
                    // no idea why this is called several times so had to put a flag to call onSuccess only once...
                    console.log('confirmationNumber: ', confirmationNumber);
                    if (!confirmed) {
                        confirmed = true;
                        dispatch(onPlayedLottery(confirmationNumber));
                        dispatch(uiStopLoading());
                    }
                });
        });

    }
};

export const onPlayedLottery = confirmationNumber => {
    return {
        type: ON_PLAYED_LOTTERY_ACTION,
        confirmationNumber
    }
};

export const pickWinner = lotteryAddress => {
    return dispatch => {
        dispatch(uiStartLoading());
        let confirmed = false;
        web3.eth.getAccounts().then(accounts => {
            LotteryFactory.methods.pickWinner().send(
                {
                    from: accounts[0]
                }
            )
                .on('error', (error) => {
                    dispatch(uiStopLoading());
                    console.log('Error while picking the winner: ', error)
                })
                .on('confirmation', () => {
                    if (!confirmed) {
                        confirmed = true;
                        dispatch(onPickedWinnerSuccess(lotteryAddress));
                        dispatch(uiStopLoading());
                    }
                });
        });
    }
};

export const onPickedWinnerSuccess = lotteryAddress => {
    return dispatch => {
        dispatch(loadPlayedLottery(lotteryAddress));
        dispatch(uiOpenPlayedLotteryDialog())
    }
};