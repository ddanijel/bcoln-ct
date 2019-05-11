import {CREATE_LOTTERY_ACTION, SET_ACTIVE_LOTTERY_ACTION, SET_LOTTERY_ACTION} from '../actions/actionTypes';

const initialState = {
    deployedLotteries: [],
    activeLottery: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_LOTTERY_ACTION:
            return {
                ...state
            };
        case SET_LOTTERY_ACTION:
            return {
                ...state,
                deployedLotteries: [...state.deployedLotteries, action.lottery]
            };
        case SET_ACTIVE_LOTTERY_ACTION:
            return {
                ...state,
                activeLottery: action.lottery
            };
        default:
            return state;
    }
};

export default reducer;