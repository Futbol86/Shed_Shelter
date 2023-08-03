import {combineReducers} from 'redux';
import quickBooksApiReducer from './reducers/quickBooksApi';

let allAccountingReducer = {
    quickBooksApi:              quickBooksApiReducer,
};

export default combineReducers(allAccountingReducer);