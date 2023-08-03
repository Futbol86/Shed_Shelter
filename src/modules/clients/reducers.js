import {combineReducers} from 'redux';
import clientListReducer from "./reducers/clientList";
import clientDetailReducer from './reducers/clientDetail';
import clientAddReducer from './reducers/clientAdd';


let clientsReducer = {
    clientList:     clientListReducer,
    clientDetail:   clientDetailReducer,
    clientAdd:      clientAddReducer,
};

export default combineReducers(clientsReducer);