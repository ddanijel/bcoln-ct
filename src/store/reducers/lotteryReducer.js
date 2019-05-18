import {SET_ACTIVE_LOTTERY_ACTION, SET_CLOSED_LOTTERY_ACTION} from '../actions/actionTypes';

const initialState = {
    activeLottery: null,
    closedLottery: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_LOTTERY_ACTION:
            return {
                ...state,
                activeLottery: action.lottery
            };
        case SET_CLOSED_LOTTERY_ACTION:
            return {
                ...state,
                closedLottery: action.lottery
            };
        default:
            return state;
    }
};

export default reducer;