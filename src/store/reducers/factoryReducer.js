import {SET_FACTORY_ACTION} from '../actions/actionTypes';

const initialState = {
    manager: null,
    ticketPrice: 0,
    maxGuessNumber: null,
    currentLottery: null,
    allLotteries: [],
    randomNumberGenerator: null
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
        default:
            return state;
    }
};

export default reducer;