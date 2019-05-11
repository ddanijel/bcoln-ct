import {CLOSE_CREATE_LOTTERY_DIALOG_ACTION, OPEN_CREATE_LOTTERY_DIALOG_ACTION} from '../actions/actionTypes';

const initialState = {
    isCreateLotteryDialogOpen: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_CREATE_LOTTERY_DIALOG_ACTION:
            return {
                ...state,
                isCreateLotteryDialogOpen: true
            };
        case CLOSE_CREATE_LOTTERY_DIALOG_ACTION:
            return {
                ...state,
                isCreateLotteryDialogOpen: false
            };
        default:
            return state;
    }
};

export default reducer;