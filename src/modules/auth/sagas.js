import { call, put, takeLatest } from 'redux-saga/effects';
import {LOGIN_ACTION, LOGOUT_ACTION, FORGOT_REQUEST_ACTION, PASSWORD_RESET_ACTION} from './actions';
import {
    LOGIN_FORM_NAME_SUCCESS, LOGIN_FORM_NAME_FAILURE, LOGIN_FORM_NAME_SUBMIT,
    FORGOT_PASSWORD_FORM_NAME_SUBMIT, FORGOT_PASSWORD_FORM_NAME_SUCCESS, FORGOT_PASSWORD_FORM_NAME_FAILURE,
    PASSWORD_RESET_FORM_NAME_SUCCESS, PASSWORD_RESET_FORM_NAME_FAILURE, PASSWORD_RESET_FORM_NAME_SUBMIT
} from './constants';
import * as api from './apis';
import {utils} from '../../services';

export function* doLogin({ payload }) {
    try {
        yield put({ type: LOGIN_ACTION.LOADING });
        const data = yield call(api.apiDoLogin, payload);
        yield put({ type: LOGIN_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        //const errors = Object.assign({}, error.errors, { _error: error.message || '' });
        const errors = Object.assign({}, error.errors, { _error: 'Cannot Login! Please check your credentials.' });
        //-- The following dispatch will also call SubmissionError
        yield put({ type: LOGIN_FORM_NAME_FAILURE, payload: errors });
    }
}

export function* doJWTLogin({ payload }) {
    try {
        yield put({ type: LOGIN_ACTION.LOADING });
        const data = yield call(api.apiDoJWTLogin);
        yield put({ type: LOGIN_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOGIN_ACTION.FAILURE, payload: error });
    }
}

export function* doLogout({ payload }) {
    try {
        yield put({ type: LOGOUT_ACTION.LOADING });
        const { data } = yield call(api.apiDoLogout, payload);
        yield put({ type: LOGOUT_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOGOUT_ACTION.SUCCESS, payload: { error: error.message } });
    }
}

export function* doForgotRequest({ payload }) {
    try {
        yield put({ type: FORGOT_REQUEST_ACTION.LOADING });
        const resetAbsLink = utils.getModuleAbsLink('auth') + 'password-reset';
        const { data } = yield call(api.apiDoForgotRequest, { ...payload, resetAbsLink });
        yield put({ type: FORGOT_PASSWORD_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        const errorMsg = error.response && error.response.data && error.response.data.message;
        yield put({ type: FORGOT_PASSWORD_FORM_NAME_FAILURE, payload: { _error: errorMsg } });
    }
}

export function* doCreateNewPassword({ payload }) {
    try {
        yield put({ type: PASSWORD_RESET_ACTION.LOADING });
        const { data } = yield call(api.apiDoCreateNewPassword, payload);
        yield put({ type: PASSWORD_RESET_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        const errorMsg = error.response && error.response.data && error.response.data.message;
        yield put({ type: PASSWORD_RESET_FORM_NAME_FAILURE, payload: { _error: errorMsg } });
    }
}

export default [
    takeLatest(LOGIN_FORM_NAME_SUBMIT,              doLogin),   //-- listen to redux-form-submit-saga
    takeLatest(LOGIN_ACTION.ACTION,                 doJWTLogin),   //-- listen to normal login action
    takeLatest(LOGOUT_ACTION.ACTION,                doLogout),
    takeLatest(FORGOT_PASSWORD_FORM_NAME_SUBMIT,    doForgotRequest),
    takeLatest(PASSWORD_RESET_FORM_NAME_SUBMIT,     doCreateNewPassword)
];