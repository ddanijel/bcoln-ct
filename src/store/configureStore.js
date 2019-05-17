import thunk from "redux-thunk";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";

import factoryReducer from './reducers/factoryReducer';
import lotteryReducer from './reducers/lotteryReducer';
import uiReducer from './reducers/uiReducer';


const rootReducer = combineReducers({
    factory: factoryReducer,
    lottery: lotteryReducer,
    ui: uiReducer

});

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const addLoggingToDispatch = store => {
    const rawDispatch = store.dispatch;

    if (!console.group) {
        return rawDispatch;
    }

    return action => {
        // console.group("Return action from configure store: ", action.type);
        // console.log("%c prev state", "color: gray", store.getState());
        // console.log("%c action", "color: blue", action);
        const returnValue = rawDispatch(action);
        // console.log("%c next state", "color: green", store.getState());
        console.groupEnd(action.type);

        return returnValue;
    };
};

export default function configureStore() {
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
    store.dispatch = addLoggingToDispatch(store);
    return store;
}