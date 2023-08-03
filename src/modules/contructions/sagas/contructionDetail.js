import { call, put, takeLatest } from 'redux-saga/effects';
import utils from '../../../services/utils';

import {
    LOAD_AN_CONTRUCTION_INFO_ACTION,
    DELETE_AN_CONTRUCTION_ACTION,
    ACCEPT_AN_CONTRUCTION_ACTION,
    REJECT_AN_CONTRUCTION_ACTION,
    CONTRUCTION_DETAIL_ACTION,
    UPDATE_AN_CONTRUCTION_STATUS_ACTION,
    UPLOAD_CONTRUCTION_ATTACH_FILES_ACTION,
    DELETE_AN_CONTRUCTION_ATTACH_FILE_ACTION
} from '../actions';
import {
    CONTRUCTION_DETAIL_FORM_NAME_SUBMIT,
    CONTRUCTION_DETAIL_FORM_NAME_SUCCESS,
    CONTRUCTION_DETAIL_FORM_NAME_FAILURE,
} from '../constants'
import * as api from '../apis';
import { resetLoading } from 'react-redux-loading-bar';

export function* doLoadAnContructionDetail ({ payload }) {
    try {
        yield put({ type: LOAD_AN_CONTRUCTION_INFO_ACTION.LOADING });
        const data = yield call(api.apiLoadAnContruction, payload);
        yield put({ type: LOAD_AN_CONTRUCTION_INFO_ACTION.SUCCESS, payload: data });
        yield put(resetLoading());
    }
    catch (error) {
        yield put({ type: LOAD_AN_CONTRUCTION_INFO_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doSubmitContructionDetail({ payload }) {
    try {
        yield put({ type: CONTRUCTION_DETAIL_ACTION.LOADING });
        let data = yield call(api.apiUpdateAnContruction, payload);
        if(data.data.status === 1)
            yield put({ type: CONTRUCTION_DETAIL_FORM_NAME_SUCCESS, payload: data.data });
        else
            yield put({ type: CONTRUCTION_DETAIL_FORM_NAME_FAILURE, payload: { _error: data.data.msg } });
    }
    catch (error) {
        yield put({ type: CONTRUCTION_DETAIL_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAnContruction({ payload }) {
    try {
        yield put({ type: DELETE_AN_CONTRUCTION_ACTION.LOADING });
        let data = yield call(api.apiDeleteAnContruction, payload);
        yield put({ type: DELETE_AN_CONTRUCTION_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_AN_CONTRUCTION_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doAcceptAnContruction({ payload }) {
    try {
        yield put({ type: ACCEPT_AN_CONTRUCTION_ACTION.LOADING });
        let data = yield call(api.apiUpdateAnContruction, payload);
        yield put({ type: ACCEPT_AN_CONTRUCTION_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: ACCEPT_AN_CONTRUCTION_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doRejectAnContruction({ payload }) {
    try {
        yield put({ type: REJECT_AN_CONTRUCTION_ACTION.LOADING });
        let data = yield call(api.apiUpdateAnContruction, payload);
        yield put({ type: REJECT_AN_CONTRUCTION_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: REJECT_AN_CONTRUCTION_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doUpdateAnContructionStatus({ payload }) {
    try {
        yield put({ type: UPDATE_AN_CONTRUCTION_STATUS_ACTION.LOADING });
        let data = yield call(api.apiUpdateAnContruction, payload);
        yield put({ type: UPDATE_AN_CONTRUCTION_STATUS_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: UPDATE_AN_CONTRUCTION_STATUS_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doUploadContructionAttachFiles({ payload }) {
    try {
        yield put({ type: UPLOAD_CONTRUCTION_ATTACH_FILES_ACTION.LOADING });
        const data = yield call(utils.uploadFile, payload, 'contructions');
        yield put({ type: UPLOAD_CONTRUCTION_ATTACH_FILES_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: UPLOAD_CONTRUCTION_ATTACH_FILES_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAnContructionAttachFile({ payload }) {
    try {
        yield put({ type: DELETE_AN_CONTRUCTION_ATTACH_FILE_ACTION.LOADING });
        const data = yield call(utils.deleteFile, {...payload, subPath: 'contructions'});
        yield put({ type: DELETE_AN_CONTRUCTION_ATTACH_FILE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_AN_CONTRUCTION_ATTACH_FILE_ACTION.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_AN_CONTRUCTION_INFO_ACTION.ACTION,        doLoadAnContructionDetail),
    takeLatest(DELETE_AN_CONTRUCTION_ACTION.ACTION,           doDeleteAnContruction),
    takeLatest(ACCEPT_AN_CONTRUCTION_ACTION.ACTION,           doAcceptAnContruction),
    takeLatest(REJECT_AN_CONTRUCTION_ACTION.ACTION,           doRejectAnContruction),
    takeLatest(CONTRUCTION_DETAIL_FORM_NAME_SUBMIT,           doSubmitContructionDetail),
    takeLatest(UPDATE_AN_CONTRUCTION_STATUS_ACTION.ACTION,    doUpdateAnContructionStatus),
    takeLatest(UPLOAD_CONTRUCTION_ATTACH_FILES_ACTION.ACTION, doUploadContructionAttachFiles),
    takeLatest(DELETE_AN_CONTRUCTION_ATTACH_FILE_ACTION.ACTION,  doDeleteAnContructionAttachFile)
];