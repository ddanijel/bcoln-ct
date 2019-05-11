import {CREATE_LOTTERY_ACTION, SET_DEPLOYED_LOTTERIES_ACTION} from '../actions/actionTypes';

const initialState = {
    deployedLotteries: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_LOTTERY_ACTION:
            return {
                ...state
            };
        case SET_DEPLOYED_LOTTERIES_ACTION:
            return {
                ...state,
                deployedLotteries: action.lotteries
            };
        default:
            return state;
    }
};

export default reducer;