import {combineReducers} from 'redux';
import orderListReducer from './reducers/orderList';
import orderDetailReducer from './reducers/orderDetail';
import orderNoteReducer from './reducers/orderNote';
import supplyDataEntryListReducer from './reducers/supplyDataEntryList';
import supplyDataEntryDetailReducer from './reducers/supplyDataEntryDetail';

let allOrderReducer = {
    orderList:              orderListReducer,
    orderDetail:            orderDetailReducer,
    orderNote:              orderNoteReducer,
    supplyDataEntryList:    supplyDataEntryListReducer,
    supplyDataEntryDetail:  supplyDataEntryDetailReducer,
};

export default combineReducers(allOrderReducer);