import { call, put, takeLatest } from 'redux-saga/effects';
import utils from '../../../services/utils';

import {
    LOAD_LIST_CONTRUCTION_NOTE_ACTION,
    CONTRUCTION_NOTE_DETAIL_ACTION,
    ADD_AN_CONTRUCTION_NOTE_ACTION,
    UPDATE_AN_CONTRUCTION_NOTE_ACTION,
    DELETE_AN_CONTRUCTION_NOTE_ACTION,
    UPLOAD_CONTRUCTION_NOTE_FILES_ACTION,
    DELETE_AN_CONTRUCTION_NOTE_FILE_ACTION,
    DOC_EXPORT_CONTRUCTION_NOTES_TO_PDF
} from '../actions';

import {
    CONTRUCTION_NOTE_DETAIL_FORM_NAME_SUBMIT,
    CONTRUCTION_NOTE_DETAIL_FORM_NAME_SUCCESS,
    CONTRUCTION_NOTE_DETAIL_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';

export function* doLoadContructionNoteList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_CONTRUCTION_NOTE_ACTION.LOADING });
        const data = yield call(api.apiLoadContructionNoteList, payload);
        yield put({ type: LOAD_LIST_CONTRUCTION_NOTE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_CONTRUCTION_NOTE_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doAddAnContructionNote({ payload }) {
    try {
        yield put({ type: ADD_AN_CONTRUCTION_NOTE_ACTION.LOADING });
        const data = yield call(api.apiCreateAnContructionNote, payload);
        yield put({ type: ADD_AN_CONTRUCTION_NOTE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: ADD_AN_CONTRUCTION_NOTE_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doUpdateAnContructionNote({ payload }) {
    try {
        yield put({ type: UPDATE_AN_CONTRUCTION_NOTE_ACTION.LOADING });
        const data = yield call(api.apiUpdateAnContructionNote, payload);
        yield put({ type: UPDATE_AN_CONTRUCTION_NOTE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: UPDATE_AN_CONTRUCTION_NOTE_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitContructionNoteDetail({ payload }) {
    try {
        yield put({ type: CONTRUCTION_NOTE_DETAIL_ACTION.LOADING });
        let data = payload.id ?
            yield call(api.apiUpdateAnContructionNote, payload) :
            yield call(api.apiCreateAnContructionNote, payload);
        yield put({ type: CONTRUCTION_NOTE_DETAIL_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: CONTRUCTION_NOTE_DETAIL_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export function* doDeleteAnContructionNote({ payload }) {
    try {
        yield put({ type: DELETE_AN_CONTRUCTION_NOTE_ACTION.LOADING });
        const data = yield call(api.apiDeleteAnContructionNote, payload);
        yield put({ type: DELETE_AN_CONTRUCTION_NOTE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_AN_CONTRUCTION_NOTE_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* douploadContructionNoteFiles({ payload }) {
    try {
        yield put({ type: UPLOAD_CONTRUCTION_NOTE_FILES_ACTION.LOADING });
        const data = yield call(utils.uploadFile, payload, 'contructions');
        yield put({ type: UPLOAD_CONTRUCTION_NOTE_FILES_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: UPLOAD_CONTRUCTION_NOTE_FILES_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAnContructionNoteFile({ payload }) {
    try {
        yield put({ type: DELETE_AN_CONTRUCTION_NOTE_FILE_ACTION.LOADING });
        const data = yield call(utils.deleteFile, {...payload, subPath: 'contructions'});
        yield put({ type: DELETE_AN_CONTRUCTION_NOTE_FILE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_AN_CONTRUCTION_NOTE_FILE_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doExportContructionNotesToPDF({ payload }) {
    try {
        yield put({ type: DOC_EXPORT_CONTRUCTION_NOTES_TO_PDF.LOADING });
        const data = yield call(api.apiExportContructioNotesToPDF, payload);
        yield put({ type: DOC_EXPORT_CONTRUCTION_NOTES_TO_PDF.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_EXPORT_CONTRUCTION_NOTES_TO_PDF.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_CONTRUCTION_NOTE_ACTION.ACTION,      doLoadContructionNoteList),
    takeLatest(ADD_AN_CONTRUCTION_NOTE_ACTION.ACTION,         doAddAnContructionNote),
    takeLatest(UPDATE_AN_CONTRUCTION_NOTE_ACTION.ACTION,      doUpdateAnContructionNote),
    takeLatest(CONTRUCTION_NOTE_DETAIL_FORM_NAME_SUBMIT,      doSubmitContructionNoteDetail),
    takeLatest(DELETE_AN_CONTRUCTION_NOTE_ACTION.ACTION,      doDeleteAnContructionNote),
    takeLatest(UPLOAD_CONTRUCTION_NOTE_FILES_ACTION.ACTION,   douploadContructionNoteFiles),
    takeLatest(DELETE_AN_CONTRUCTION_NOTE_FILE_ACTION.ACTION, doDeleteAnContructionNoteFile),
    takeLatest(DOC_EXPORT_CONTRUCTION_NOTES_TO_PDF.ACTION,    doExportContructionNotesToPDF),
];