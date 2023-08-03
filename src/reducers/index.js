import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
// import { routerReducer } from 'react-router-redux';
import { connectRouter } from 'connected-react-router';
import { loadingBarReducer } from 'react-redux-loading-bar';

import modalsReducer from './modals';
import {enabledModules} from '../config';

let reducers = {
    form: formReducer,
    // router: routerReducer,
    loadingBar: loadingBarReducer,
    modals: modalsReducer,
};

enabledModules.forEach(modName => {
    var modReducer = require(`../modules/${modName}/reducers`).default;
    reducers[modName] = modReducer;
});

const getRootReducer = (history) => (
    combineReducers({
        ...reducers,
        router: connectRouter(history),
    })
);

export default getRootReducer;