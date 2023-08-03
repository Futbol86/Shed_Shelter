import { LC_KEY_AUTH_TOKEN, LC_KEY_AUTH_USER_DATA } from '../constants';
import storage from './local-storage';
import httpClient from './http-client';

let auth = {
    setLogin (token = "", userData = {}) {
        storage.set(LC_KEY_AUTH_TOKEN,              token);
        storage.set(LC_KEY_AUTH_USER_DATA,          userData);
        httpClient.defaults.headers.common['Authorization'] = storage.get('auth-token');
    },

    /**
     * Logs the current user out
     */
    setLogout () {
        storage.remove(LC_KEY_AUTH_TOKEN);
        storage.remove(LC_KEY_AUTH_USER_DATA);
    },

    /**
     * Checks if a user is logged in.
     */
    loggedIn () {
        const token = storage.get(LC_KEY_AUTH_TOKEN);
        return (typeof token !== 'undefined' && token !== null);
    },

    getToken() {
        if (auth.loggedIn())
            return storage.get(LC_KEY_AUTH_TOKEN);
        else
            return null;
    },

    setToken (token = "") {
        if (token)
            storage.set(LC_KEY_AUTH_TOKEN,       token);
    },

    getUserFromStorage() {
        const userData = storage.get(LC_KEY_AUTH_USER_DATA);
        if (typeof userData !== 'undefined' && userData !== null)
            return userData;
        else
            return {};
    },

    setUser (userData = {}) {
        if (userData)
            storage.set(LC_KEY_AUTH_USER_DATA,       userData);
    },

    checkIsAdmin(userData = {}) {
        if (userData && userData.roles){
            const {roles} = userData;
            return roles.includes('admin');
        }
    },

    checkUserManagementAccess() {
        const userData = storage.get(LC_KEY_AUTH_USER_DATA);
        if (userData && userData.accessModules){
            const modules = userData.accessModules.split(',');
            for (let i = 0; i < modules.length; i++) {
                if (modules[i] === 'user' || modules[i] === 'all') {
                    return true;
                }
            }

            return false;
        }
    },

    isADealer() {
        const userData = storage.get(LC_KEY_AUTH_USER_DATA);
        if (userData && userData.roles && userData.roles.includes('dealer')){
            return true;
        }
        return false;
    },

    isAnAdmin() {
        const userData = storage.get(LC_KEY_AUTH_USER_DATA);
        if (userData && userData.roles && userData.roles.includes('admin')){
            return true;
        }
        return false;
    },

    isAnAccounting() {
        const userData = storage.get(LC_KEY_AUTH_USER_DATA);
        if (userData && userData.roles && userData.roles.includes('accounting')){
            return true;
        }
        return false;
    },

    getDealerLogo() {
        const userData = storage.get(LC_KEY_AUTH_USER_DATA);
        if (userData && userData.dealer && userData.dealer.companyLogo && userData.dealer.companyLogo.length > 0){
            return userData.dealer.companyLogo;
        }
        return null;
    }
};

export default auth;
