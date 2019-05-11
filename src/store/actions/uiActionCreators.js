import {
    CLOSE_CREATE_LOTTERY_DIALOG_ACTION,
    OPEN_CREATE_LOTTERY_DIALOG_ACTION,
    UI_START_LOADING_ACTION,
    UI_STOP_LOADING_ACTION
} from './actionTypes';


export const uiStartLoading = () => {
    console.log('start loading called');
    return {
        type: UI_START_LOADING_ACTION
    };
};


export const uiStopLoading = () => {
    console.log('stop loading called');
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