import {combineReducers} from 'redux';
import userListReducer from "./reducers/userList";


let usersReducer = {
    userList:   userListReducer,
};

export default combineReducers(usersReducer);