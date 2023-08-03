import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {addFormSubmitSagaTo} from 'redux-form-submit-saga';
import createHistory from 'history/createBrowserHistory'
// import { routerMiddleware } from 'react-router-redux';
import { routerMiddleware } from 'connected-react-router';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import getRootReducer from './reducers/index';
import rootSaga from './sagas';
import {LOADING, FAILURE, SUCCESS} from './constants';

// Build the middleware for intercepting and dispatching navigation actions
export const history = createHistory();
const routerReduxMiddleware = routerMiddleware(history);
//-- Saga middleware
const sagaMiddleware = createSagaMiddleware();
//-- Loadingbar middleware
const loadingBarMdw = loadingBarMiddleware({
    promiseTypeSuffixes: [LOADING, SUCCESS, FAILURE],
});
const middleware = composeWithDevTools(applyMiddleware(sagaMiddleware, routerReduxMiddleware, loadingBarMdw));

const store = createStore(getRootReducer(history), middleware);

sagaMiddleware.run(addFormSubmitSagaTo(rootSaga));

export default store;