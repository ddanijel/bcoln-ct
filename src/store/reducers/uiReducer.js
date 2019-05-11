import {
    CLOSE_CREATE_LOTTERY_DIALOG_ACTION,
    CLOSE_PLAY_LOTTERY_DIALOG_ACTION,
    OPEN_CREATE_LOTTERY_DIALOG_ACTION,
    OPEN_PLAY_LOTTERY_DIALOG_ACTION,
    UI_START_LOADING_ACTION,
    UI_STOP_LOADING_ACTION
} from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    isCreateLotteryDialogOpen: false,
    isPlayLotteryDialogOpen: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UI_START_LOADING_ACTION:
            return {
                ...state,
                isLoading: true
            };
        case UI_STOP_LOADING_ACTION:
            return {
                ...state,
                isLoading: false
            };
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
        case OPEN_PLAY_LOTTERY_DIALOG_ACTION:
            return {
                ...state,
                isPlayLotteryDialogOpen: true
            };
        case CLOSE_PLAY_LOTTERY_DIALOG_ACTION:
            return {
                ...state,
                isPlayLotteryDialogOpen: false
            };
        default:
            return state;
    }
};

export default reducer;