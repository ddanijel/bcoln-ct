import {ON_PLAYED_LOTTERY_ACTION, SET_FACTORY_ACTION} from '../actions/actionTypes';

const initialState = {
    manager: null,
    ticketPrice: 0,
    maxGuessNumber: null,
    currentLottery: null,
    allLotteries: [],
    randomNumberGenerator: null,
    confirmationNumber: Math.random()
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FACTORY_ACTION:
            const {
                manager,
                ticketPrice,
                maxGuessNumber,
                currentLottery,
                allLotteries,
                randomNumberGenerator
            } = action.factory;
            return {
                ...state,
                manager,
                ticketPrice,
                maxGuessNumber,
                currentLottery,
                allLotteries,
                randomNumberGenerator
            };
        case ON_PLAYED_LOTTERY_ACTION:
            return {
                ...state,
                confirmationNumber: action.confirmationNumber
            };
        default:
            return state;
    }
};

export default reducer;