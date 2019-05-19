import {
    CLOSE_CLOSED_LOTTERY_DIALOG_ACTION,
    CLOSE_SNACKBAR_ACTION,
    OPEN_CLOSED_LOTTERY_DIALOG_ACTION,
    OPEN_SNACKBAR_ACTION,
    UI_START_LOADING_ACTION,
    UI_STOP_LOADING_ACTION
} from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    isClosedLotteryDialogOpen: false,
    snackbar: {
        isOpen: false,
        message: '',
        button: {
            text: '',
            link: ''
        }
    }
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
        case OPEN_CLOSED_LOTTERY_DIALOG_ACTION:
            return {
                ...state,
                isClosedLotteryDialogOpen: true
            };
        case CLOSE_CLOSED_LOTTERY_DIALOG_ACTION:
            return {
                ...state,
                isClosedLotteryDialogOpen: false
            };
        case OPEN_SNACKBAR_ACTION:
            return {
                ...state,
                snackbar: action.snackbar
            };
        case CLOSE_SNACKBAR_ACTION:
            return {
                ...state,
                snackbar: {
                    isOpen: false,
                    message: '',
                    button: {
                        text: '',
                        link: ''
                    }
                }
            };
        default:
            return state;
    }
};

export default reducer;