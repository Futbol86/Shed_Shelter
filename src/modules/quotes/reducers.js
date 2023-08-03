import {combineReducers} from 'redux';
import quoteListReducer from "./reducers/quoteList";
import quoteDetailReducer from './reducers/quoteDetail';

const quotesReducer = {
    quoteList: quoteListReducer,
    quoteDetail: quoteDetailReducer,
};

export default combineReducers(quotesReducer);