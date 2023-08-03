import { call, put, takeLatest } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {UPDATE_PROFILE_ACTION, UPDATE_PF_PASSWORD_ACTION, LOAD_PROFILE_ACTION, UPLOAD_DEALER_LOGO} from './actions';
import {
    PROFILE_FORM_NAME_SUBMIT,
    PROFILE_FORM_NAME_SUCCESS,
    PROFILE_FORM_NAME_FAILURE,
    PROFILE_PASSWORD_FORM_NAME_SUBMIT,
    PROFILE_PASSWORD_FORM_NAME_FAILURE,
    PROFILE_PASSWORD_FORM_NAME_SUCCESS,
    MODULE_ID,
    DEALER_INFO_FORM_NAME_SUBMIT, DEALER_INFO_FORM_NAME_SUCCESS, DEALER_INFO_FORM_NAME_FAILURE
} from './constants';
import * as api from './apis';
import utils from "../../services/utils";

export function* doUpdateProfile({ payload }) {
    try {
        yield put({ type: UPDATE_PROFILE_ACTION.LOADING });
        yield put(showLoading());
        const data = yield call(api.apiUpdateProfile, payload);
        yield put({ type: PROFILE_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        //const errors = Object.assign({}, error.errors, { _error: error.message || '' });
        const errors = Object.assign({}, error.errors, { _error: 'Cannot Login! Please check your credentials.' });
        yield put({ type: PROFILE_FORM_NAME_FAILURE, payload: errors });
    }
    finally {
        yield put(hideLoading())
    }
}

export function* doUpdatePassword({ payload }) {
    try {
        yield put({ type: UPDATE_PF_PASSWORD_ACTION.LOADING });
        yield put(showLoading());
        const data = yield call(api.apiUpdatePassword, payload);
        yield put({ type: PROFILE_PASSWORD_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        const errors = Object.assign({}, error.errors, { _error: 'Cannot Change your Password. Please check your information!' });
        yield put({ type: PROFILE_PASSWORD_FORM_NAME_FAILURE, payload: errors });
    }
    finally {
        yield put(hideLoading())
    }
}

function* doLoadProfile({ payload }) {
    try {
        yield put({ type: LOAD_PROFILE_ACTION.LOADING });
        const data = yield call(api.apiLoadProfile, payload);
        yield put({ type: LOAD_PROFILE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_PROFILE_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doUploadDealerLogo({ payload }) {
    try {
        yield put({ type: UPLOAD_DEALER_LOGO.LOADING });
        const data = yield call(utils.uploadFile, payload, MODULE_ID);
        yield put({ type: UPLOAD_DEALER_LOGO.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: UPLOAD_DEALER_LOGO.FAILURE, payload: {errors: error} });
    }
}

export function* doUpdateDealerInfo({ payload }) {
    try {
        const data = yield call(api.apiUpdateProfile, payload);
        yield put({ type: DEALER_INFO_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        const errors = Object.assign({}, error.errors, { _error: 'Cannot Change your Password. Please check your information!' });
        yield put({ type: DEALER_INFO_FORM_NAME_FAILURE, payload: errors });
    }
    finally {
        yield put(hideLoading())
    }
}

export default
[
    takeLatest(LOAD_PROFILE_ACTION.ACTION,              doLoadProfile),
    takeLatest(PROFILE_FORM_NAME_SUBMIT,                doUpdateProfile),
    takeLatest(PROFILE_PASSWORD_FORM_NAME_SUBMIT,       doUpdatePassword),
    takeLatest(UPLOAD_DEALER_LOGO.ACTION,               doUploadDealerLogo),
    takeLatest(DEALER_INFO_FORM_NAME_SUBMIT,            doUpdateDealerInfo)
];