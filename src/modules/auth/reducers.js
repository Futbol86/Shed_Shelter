import {auth} from '../../services';
import { LOGIN_ACTION, LOGOUT_ACTION } from './actions';
import {
    LOGIN_FORM_NAME_SUCCESS, LOGIN_FORM_NAME_FAILURE, FORGOT_PASSWORD_FORM_NAME_FAILURE,
    FORGOT_PASSWORD_FORM_NAME_SUCCESS
} from './constants';

const defaultState = {
    isSignedIn: false,
    user: {},
    loading: false,
    errors: {}
};

const authReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOGIN_FORM_NAME_SUCCESS:
        case (LOGIN_ACTION.SUCCESS):
            if (action.payload.data.accessToken){
                // storage.set('auth-token', action.payload.data.accessToken);
                auth.setLogin(action.payload.data.accessToken, action.payload.data.user);
            }
            return {
                ...state,
                isSignedIn: true,
                loading: false,
                user: action.payload.data.data || action.payload.data //-- incase pagination is disabled
            };
        case LOGIN_ACTION.LOADING:
        case LOGOUT_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };
        case (LOGOUT_ACTION.SUCCESS):
        case (LOGOUT_ACTION.FAILURE):
            auth.setLogout();
            return defaultState;
        case LOGIN_FORM_NAME_FAILURE:
        case (LOGIN_ACTION.FAILURE):
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };

        case (FORGOT_PASSWORD_FORM_NAME_SUCCESS):
            return {
                ...state,
                errors: {},
                loading: false
            };
        case (FORGOT_PASSWORD_FORM_NAME_FAILURE):
            return {
                ...state,
                errors: {forgotPasswordForm: action.payload._error}, //-- trick, since I am too lazy to separate reducers
                loading: false
            };

        default:
            return state;
    }
};

export default authReducer;