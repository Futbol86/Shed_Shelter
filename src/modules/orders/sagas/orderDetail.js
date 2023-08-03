import { call, put, takeLatest } from 'redux-saga/effects';
import utils from '../../../services/utils';

import {
    LOAD_AN_ORDER_INFO_ACTION,
    DELETE_AN_ORDER_ACTION,
    ACCEPT_AN_ORDER_ACTION,
    REJECT_AN_ORDER_ACTION,
    ORDER_DETAIL_ACTION,
    UPDATE_AN_ORDER_STATUS_ACTION,
    SHARED_ORDER_ROLL_FORM_ACTION,
    UPLOAD_ORDER_ATTACH_FILES_ACTION,
    DELETE_AN_ORDER_ATTACH_FILE_ACTION
} from '../actions';
import {
    ORDER_DETAIL_FORM_NAME_SUBMIT,
    ORDER_DETAIL_FORM_NAME_SUCCESS,
    ORDER_DETAIL_FORM_NAME_FAILURE,
    SHARED_ORDER_ROLL_FORM_FORM_NAME_SUBMIT,
    SHARED_ORDER_ROLL_FORM_FORM_NAME_SUCCESS,
    SHARED_ORDER_ROLL_FORM_FORM_NAME_FAILURE
} from '../constants'
import * as api from '../apis';
import { resetLoading } from 'react-redux-loading-bar';

export function* doLoadAnOrderDetail ({ payload }) {
    try {
        yield put({ type: LOAD_AN_ORDER_INFO_ACTION.LOADING });
        const data = yield call(api.apiLoadAnOrder, payload);
        yield put({ type: LOAD_AN_ORDER_INFO_ACTION.SUCCESS, payload: data });
        yield put(resetLoading());
    }
    catch (error) {
        yield put({ type: LOAD_AN_ORDER_INFO_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doSubmitOrderDetail({ payload }) {
    try {
        yield put({ type: ORDER_DETAIL_ACTION.LOADING });
        let data = yield call(api.apiUpdateAnOrder, payload);
        yield put({ type: ORDER_DETAIL_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: ORDER_DETAIL_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doSubmitSharedOrderDetail({ payload }) {
    try {
        yield put({ type: SHARED_ORDER_ROLL_FORM_ACTION.LOADING });
        let data = yield call(api.apiUpdateAnOrder, payload);
        yield put({ type: SHARED_ORDER_ROLL_FORM_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: SHARED_ORDER_ROLL_FORM_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAnOrder({ payload }) {
    try {
        yield put({ type: DELETE_AN_ORDER_ACTION.LOADING });
        let data = yield call(api.apiDeleteAnOrder, payload);
        yield put({ type: DELETE_AN_ORDER_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_AN_ORDER_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doAcceptAnOrder({ payload }) {
    try {
        yield put({ type: ACCEPT_AN_ORDER_ACTION.LOADING });
        let data = yield call(api.apiUpdateAnOrder, payload);
        yield put({ type: ACCEPT_AN_ORDER_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: ACCEPT_AN_ORDER_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doRejectAnOrder({ payload }) {
    try {
        yield put({ type: REJECT_AN_ORDER_ACTION.LOADING });
        let data = yield call(api.apiUpdateAnOrder, payload);
        yield put({ type: REJECT_AN_ORDER_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: REJECT_AN_ORDER_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doUpdateAnOrderStatus({ payload }) {
    try {
        yield put({ type: UPDATE_AN_ORDER_STATUS_ACTION.LOADING });
        let data = yield call(api.apiUpdateAnOrder, payload);
        yield put({ type: UPDATE_AN_ORDER_STATUS_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: UPDATE_AN_ORDER_STATUS_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doUploadOrderAttachFiles({ payload }) {
    try {
        yield put({ type: UPLOAD_ORDER_ATTACH_FILES_ACTION.LOADING });
        const data = yield call(utils.uploadFile, payload, 'orders');
        yield put({ type: UPLOAD_ORDER_ATTACH_FILES_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: UPLOAD_ORDER_ATTACH_FILES_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAnOrderAttachFile({ payload }) {
    try {
        yield put({ type: DELETE_AN_ORDER_ATTACH_FILE_ACTION.LOADING });
        const data = yield call(utils.deleteFile, payload);
        yield put({ type: DELETE_AN_ORDER_ATTACH_FILE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_AN_ORDER_ATTACH_FILE_ACTION.FAILURE, payload: {errors: error} });
    }
}


export default
[
    takeLatest(LOAD_AN_ORDER_INFO_ACTION.ACTION,        doLoadAnOrderDetail),
    takeLatest(DELETE_AN_ORDER_ACTION.ACTION,           doDeleteAnOrder),
    takeLatest(ACCEPT_AN_ORDER_ACTION.ACTION,           doAcceptAnOrder),
    takeLatest(REJECT_AN_ORDER_ACTION.ACTION,           doRejectAnOrder),
    takeLatest(ORDER_DETAIL_FORM_NAME_SUBMIT,           doSubmitOrderDetail),
    takeLatest(UPDATE_AN_ORDER_STATUS_ACTION.ACTION,    doUpdateAnOrderStatus),
    takeLatest(SHARED_ORDER_ROLL_FORM_FORM_NAME_SUBMIT, doSubmitSharedOrderDetail),
    takeLatest(UPLOAD_ORDER_ATTACH_FILES_ACTION.ACTION, doUploadOrderAttachFiles),
    takeLatest(DELETE_AN_ORDER_ATTACH_FILE_ACTION.ACTION,  doDeleteAnOrderAttachFile)
];