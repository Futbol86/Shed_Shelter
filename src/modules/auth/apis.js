import {httpClient, httpClient2} from '../../services';
import {API_SUB_URL, API_SUB_AUTHENTICATION_JWT_URL} from './constants';
import {AUTH_MANAGEMENT_API_SUB_URL} from "../../constants";

export const apiDoLogin = ({email, password}) => {
    return httpClient2.post(API_SUB_URL, {"strategy": "local", email, password});
};
export const apiDoJWTLogin = () => {
    return httpClient2.post(API_SUB_AUTHENTICATION_JWT_URL);
};
export const apiDoLogout = (id) => {
    //return httpClient.delete(`${API_SUB_URL}`);
    return httpClient2.delete(`${API_SUB_URL}`);
};

export const apiDoForgotRequest = ({email, resetAbsLink}) => {
    const notifierOptions = {frontendLink: resetAbsLink};
    return httpClient.post(`${AUTH_MANAGEMENT_API_SUB_URL}`, {
        action: 'sendResetPwd',
        value: {email}, // {email}, {token: verifyToken}
        notifierOptions, // options passed to options.notifier, e.g. {preferredComm: 'email'}
    });
};

export const apiDoCreateNewPassword = ({token, password}) => {
    return httpClient.post(`${AUTH_MANAGEMENT_API_SUB_URL}`, {
        action: 'resetPwdLong',
        value: {token, password}
    });
};