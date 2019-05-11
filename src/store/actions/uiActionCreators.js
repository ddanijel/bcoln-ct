import {CLOSE_CREATE_LOTTERY_DIALOG_ACTION, OPEN_CREATE_LOTTERY_DIALOG_ACTION} from './actionTypes';

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