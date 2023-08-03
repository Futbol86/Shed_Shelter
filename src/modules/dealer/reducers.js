import {combineReducers} from 'redux';
import usersReducers from "./users/reducers";


let adminReducer = {
    users: usersReducers,
};

export default combineReducers(adminReducer);