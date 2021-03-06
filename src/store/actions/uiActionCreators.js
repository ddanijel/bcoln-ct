import {
    CLOSE_CLOSED_LOTTERY_DIALOG_ACTION,
    CLOSE_SNACKBAR_ACTION,
    OPEN_CLOSED_LOTTERY_DIALOG_ACTION,
    OPEN_SNACKBAR_ACTION,
    UI_START_LOADING_ACTION,
    UI_STOP_LOADING_ACTION
} from './actionTypes';


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


export const uiOpenPlayedLotteryDialog = () => {
    return {
        type: OPEN_CLOSED_LOTTERY_DIALOG_ACTION
    };
};

export const uiCloseClosedLotteryDialog = () => {
    return {
        type: CLOSE_CLOSED_LOTTERY_DIALOG_ACTION
    };
};

export const uiOpenSnackbar = snackbar => {
    return {
        type: OPEN_SNACKBAR_ACTION,
        snackbar
    }
};

export const uiCloseSnackbar = () => {
    return {
        type: CLOSE_SNACKBAR_ACTION
    }
};