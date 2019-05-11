import {CREATE_LOTTERY_ACTION} from '../actions/actionTypes';

const initialState = {
    activeLotteries: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_LOTTERY_ACTION:
            return {
                ...state
            };
        default:
            return state;
    }
};

export default reducer;