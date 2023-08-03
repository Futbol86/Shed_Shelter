import { call, put, takeLatest } from 'redux-saga/effects';
import utils from '../../../services/utils';

import {
    LOAD_LIST_ORDER_NOTE_ACTION,
    ORDER_NOTE_DETAIL_ACTION,
    ADD_AN_ORDER_NOTE_ACTION,
    UPDATE_AN_ORDER_NOTE_ACTION,
    DELETE_AN_ORDER_NOTE_ACTION,
    UPLOAD_ORDER_NOTE_FILES_ACTION,
    DELETE_AN_ORDER_NOTE_FILE_ACTION
} from '../actions';

import {
    ORDER_NOTE_DETAIL_FORM_NAME_SUBMIT,
    ORDER_NOTE_DETAIL_FORM_NAME_SUCCESS,
    ORDER_NOTE_DETAIL_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';

export function* doLoadOrderNoteList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_ORDER_NOTE_ACTION.LOADING });
        const data = yield call(api.apiLoadOrderNoteList, payload);
        yield put({ type: LOAD_LIST_ORDER_NOTE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_ORDER_NOTE_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doAddAnOrderNote({ payload }) {
    try {
        yield put({ type: ADD_AN_ORDER_NOTE_ACTION.LOADING });
        const data = yield call(api.apiCreateAnOrderNote, payload);
        yield put({ type: ADD_AN_ORDER_NOTE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: ADD_AN_ORDER_NOTE_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doUpdateAnOrderNote({ payload }) {
    try {
        yield put({ type: UPDATE_AN_ORDER_NOTE_ACTION.LOADING });
        const data = yield call(api.apiUpdateAnOrderNote, payload);
        yield put({ type: UPDATE_AN_ORDER_NOTE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: UPDATE_AN_ORDER_NOTE_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitOrderNoteDetail({ payload }) {
    try {
        yield put({ type: ORDER_NOTE_DETAIL_ACTION.LOADING });
        let data = payload.id ?
            yield call(api.apiUpdateAnOrderNote, payload) :
            yield call(api.apiCreateAnOrderNote, payload);
        yield put({ type: ORDER_NOTE_DETAIL_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: ORDER_NOTE_DETAIL_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export function* doDeleteAnOrderNote({ payload }) {
    try {
        yield put({ type: DELETE_AN_ORDER_NOTE_ACTION.LOADING });
        const data = yield call(api.apiDeleteAnOrderNote, payload);
        yield put({ type: DELETE_AN_ORDER_NOTE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_AN_ORDER_NOTE_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* douploadOrderNoteFiles({ payload }) {
    try {
        yield put({ type: UPLOAD_ORDER_NOTE_FILES_ACTION.LOADING });
        // console.log('Payload: ', payload);
        const data = yield call(utils.uploadFile, payload, 'orders');
        yield put({ type: UPLOAD_ORDER_NOTE_FILES_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: UPLOAD_ORDER_NOTE_FILES_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAnOrderNoteFile({ payload }) {
    try {
        yield put({ type: DELETE_AN_ORDER_NOTE_FILE_ACTION.LOADING });
        const data = yield call(utils.deleteFile, payload);
        yield put({ type: DELETE_AN_ORDER_NOTE_FILE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_AN_ORDER_NOTE_FILE_ACTION.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_ORDER_NOTE_ACTION.ACTION,      doLoadOrderNoteList),
    takeLatest(ADD_AN_ORDER_NOTE_ACTION.ACTION,         doAddAnOrderNote),
    takeLatest(UPDATE_AN_ORDER_NOTE_ACTION.ACTION,      doUpdateAnOrderNote),
    takeLatest(ORDER_NOTE_DETAIL_FORM_NAME_SUBMIT,      doSubmitOrderNoteDetail),
    takeLatest(DELETE_AN_ORDER_NOTE_ACTION.ACTION,      doDeleteAnOrderNote),
    takeLatest(UPLOAD_ORDER_NOTE_FILES_ACTION.ACTION,   douploadOrderNoteFiles),
    takeLatest(DELETE_AN_ORDER_NOTE_FILE_ACTION.ACTION, doDeleteAnOrderNoteFile)
];