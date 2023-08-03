import { call, put, takeLatest } from 'redux-saga/effects';
import {
    LOAD_LIST_QUOTES_ACTION, LOAD_LIST_QUOTES_ATTACHED_NOTE_AND_TEXT_ACTION,
    DELETE_A_QUOTE_ACTION, LOCK_A_QUOTE_ACTION, DOC_EXPORT_QUOTES_TO_PDF_ACTION
} from '../actions';
import {QUOTES_LIST_FILTER_FORM_NAME_SUBMIT, QUOTES_LIST_FILTER_FORM_NAME_SUCCESS, QUOTES_LIST_FILTER_FORM_NAME_FAILURE} from '../constants';
import * as api from '../apis';
import {LOAD_LIST_CLIENTS_ACTION} from "../../clients/actions";
import {CLIENTS_LIST_FILTER_FORM_NAME_FAILURE, CLIENTS_LIST_FILTER_FORM_NAME_SUCCESS} from "../../clients/constants";

export function* doLoadQuoteList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_QUOTES_ACTION.LOADING });
        const data = yield call(api.apiLoadQuoteList, payload);
        yield put({ type: LOAD_LIST_QUOTES_ACTION.SUCCESS, payload: data });
        yield put({ type: QUOTES_LIST_FILTER_FORM_NAME_SUCCESS, payload: payload.filter });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_QUOTES_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadQuoteAttachedNoteAndTextList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_QUOTES_ATTACHED_NOTE_AND_TEXT_ACTION.LOADING });
        const data = yield call(api.apiLoadQuoteAttachedNoteAndTextList, payload);
        yield put({ type: LOAD_LIST_QUOTES_ATTACHED_NOTE_AND_TEXT_ACTION.SUCCESS, payload: data });
        yield put({ type: QUOTES_LIST_FILTER_FORM_NAME_SUCCESS, payload: payload.filter });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_QUOTES_ATTACHED_NOTE_AND_TEXT_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doDeleteAQuote({ payload }) {
    try {
        yield put({ type: DELETE_A_QUOTE_ACTION.LOADING });
        const data = yield call(api.apiDeleteAQuote, payload);
        yield put({ type: DELETE_A_QUOTE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_QUOTE_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doLockAQuote({ payload }) {
    try {
        yield put({ type: LOCK_A_QUOTE_ACTION.LOADING });
        const data = yield call(api.apiUpdateQuoteStatus, payload);
        yield put({ type: LOCK_A_QUOTE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOCK_A_QUOTE_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadQuotesFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_QUOTES_ACTION.LOADING });
        const data = yield call(api.apiLoadQuoteList, {filter: payload});
        yield put({ type: LOAD_LIST_QUOTES_ACTION.SUCCESS, payload: data });
        yield put({ type: QUOTES_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_QUOTES_ACTION.FAILURE, payload: {errors: error} });
        yield put({ type: QUOTES_LIST_FILTER_FORM_NAME_FAILURE });
    }
}

export function* doExportQuotesPDF({ payload }) {
    try {
        yield put({ type: DOC_EXPORT_QUOTES_TO_PDF_ACTION.LOADING });
        const data = yield call(api.apiExportQuotesPDF, payload);
        yield put({ type: DOC_EXPORT_QUOTES_TO_PDF_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_EXPORT_QUOTES_TO_PDF_ACTION.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_QUOTES_ACTION.ACTION,          doLoadQuoteList),
    takeLatest(LOAD_LIST_QUOTES_ATTACHED_NOTE_AND_TEXT_ACTION.ACTION,          doLoadQuoteAttachedNoteAndTextList),
    takeLatest(DELETE_A_QUOTE_ACTION.ACTION,            doDeleteAQuote),
    takeLatest(LOCK_A_QUOTE_ACTION.ACTION,              doLockAQuote),
    takeLatest(QUOTES_LIST_FILTER_FORM_NAME_SUBMIT,     doLoadQuotesFilter),
    takeLatest(DOC_EXPORT_QUOTES_TO_PDF_ACTION.ACTION,  doExportQuotesPDF),
];