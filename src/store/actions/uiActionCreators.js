import {
    CLOSE_CREATE_LOTTERY_DIALOG_ACTION,
    CLOSE_PLAY_LOTTERY_DIALOG_ACTION,
    OPEN_CREATE_LOTTERY_DIALOG_ACTION,
    OPEN_PLAY_LOTTERY_DIALOG_ACTION,
    UI_START_LOADING_ACTION,
    UI_STOP_LOADING_ACTION
} from './actionTypes';
import {setActiveLottery} from "./lotteryActionCreators";


export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING_ACTION
    };
};


export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING_ACTION
    };
};


export const uiOpenCreateLotteryDialog = () => {
    return {
        type: OPEN_CREATE_LOTTERY_DIALOG_ACTION
    };
};

export const uiCloseCreateLotteryDialog = () => {
    return {
        type: CLOSE_CREATE_LOTTERY_DIALOG_ACTION
    };
};

export const onUiOpenPlayLotteryDialog = lottery => {
    return dispatch => {
        dispatch(setActiveLottery(lottery));
        dispatch(uiOpenPlayLotteryDialog())
    }
};

export const uiOpenPlayLotteryDialog = () => {
    return {
        type: OPEN_PLAY_LOTTERY_DIALOG_ACTION
    };
};

export const uiClosePlayLotteryDialog = () => {
    return {
        type: CLOSE_PLAY_LOTTERY_DIALOG_ACTION
    };
};