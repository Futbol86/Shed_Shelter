import {combineReducers} from 'redux';
import clientListReducer from './reducers/clientList';
import quoteListReducer from './reducers/quoteList';

/**
 *
 *  TODO (if needed): try to use scoped reducer
 *
 * @type {{clientList: function(*=, *=), quoteList: function(*=, *=)}}
 */
let dashboardReducer = {
    clientList: clientListReducer,
    quoteList:  quoteListReducer
};

export default combineReducers(dashboardReducer);