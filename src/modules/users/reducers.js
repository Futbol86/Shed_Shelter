import {combineReducers} from 'redux';
import profileFormReducer from "./reducers/profileForm";
import passwordFormReducer from "./reducers/passwordForm";
import dealerFormReducer from './reducers/dealerForm';
import detailReducer from './reducers/detail';


let usersReducer = {
    profileForm: profileFormReducer,
    passwordForm: passwordFormReducer,
    dealerForm: dealerFormReducer,
    detail: detailReducer,
};

export default combineReducers(usersReducer);