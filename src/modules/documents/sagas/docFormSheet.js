import { call, put, takeLatest } from 'redux-saga/effects';
import utils from '../../../services/utils';
import { 
    DOC_LOAD_AN_OFFICE_FORM_ACTION,
    DOC_LOAD_A_SAFETY_FORM_ACTION,
    DOC_EXPORT_OFFICE_FORM_TO_PDF_ACTION,
    DOC_EXPORT_SAFETY_FORM_TO_PDF_ACTION,
} from '../actions';
import {
    DOCS_OFFICE_FORM_NAME_SUBMIT,
    DOCS_OFFICE_FORM_NAME_SUCCESS,
    DOCS_OFFICE_FORM_NAME_FAILURE,
    DOCS_SAFETY_FORM_NAME_SUBMIT,
    DOCS_SAFETY_FORM_NAME_SUCCESS,
    DOCS_SAFETY_FORM_NAME_FAILURE,
} from '../constants';
import * as api from '../apis';

export function* doLoadAnOfficeForm ({ payload }) {
    try {
        yield put({ type: DOC_LOAD_AN_OFFICE_FORM_ACTION.LOADING });
        const data = yield call(api.apiLoadAnOfficeForm, payload);
        yield put({ type: DOC_LOAD_AN_OFFICE_FORM_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_LOAD_AN_OFFICE_FORM_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadASafetyForm ({ payload }) {
    try {
        yield put({ type: DOC_LOAD_A_SAFETY_FORM_ACTION.LOADING });
        const data = yield call(api.apiLoadASafetyForm, payload);
        yield put({ type: DOC_LOAD_A_SAFETY_FORM_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_LOAD_A_SAFETY_FORM_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitAnOfficeForm({ payload }) {
    try {
        yield put({ type: DOC_LOAD_AN_OFFICE_FORM_ACTION.LOADING });
        const data = payload.id ? yield call(api.apiUpdateAnOfficeForm, payload)
                                : yield call(api.apiCreateAnOfficeForm, payload);
        yield put({ type: DOCS_OFFICE_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOCS_OFFICE_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitAnSafetyForm({ payload }) {
    try {
        yield put({ type: DOC_LOAD_A_SAFETY_FORM_ACTION.LOADING });
        const data = payload.id ? yield call(api.apiUpdateASafetyForm, payload) 
                                : yield call(api.apiCreateASafetyForm, payload);
        yield put({ type: DOCS_SAFETY_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOCS_SAFETY_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export function* doExportOfficeFormPDF({ payload }) {
    try {
        yield put({ type: DOC_EXPORT_OFFICE_FORM_TO_PDF_ACTION.LOADING });
        const data = yield call(api.apiExportOfficeFormPDF, payload);
        yield put({ type: DOC_EXPORT_OFFICE_FORM_TO_PDF_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_EXPORT_OFFICE_FORM_TO_PDF_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doExportSafetyFormPDF({ payload }) {
    try {
        yield put({ type: DOC_EXPORT_SAFETY_FORM_TO_PDF_ACTION.LOADING });
        const data = yield call(api.apiExportSafetyFormPDF, payload);
        yield put({ type: DOC_EXPORT_SAFETY_FORM_TO_PDF_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_EXPORT_SAFETY_FORM_TO_PDF_ACTION.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(DOC_LOAD_AN_OFFICE_FORM_ACTION.ACTION,           doLoadAnOfficeForm),
    takeLatest(DOC_LOAD_A_SAFETY_FORM_ACTION.ACTION,            doLoadASafetyForm),
    takeLatest(DOCS_OFFICE_FORM_NAME_SUBMIT,                    doSubmitAnOfficeForm),
    takeLatest(DOCS_SAFETY_FORM_NAME_SUBMIT,                    doSubmitAnSafetyForm),
    takeLatest(DOC_EXPORT_OFFICE_FORM_TO_PDF_ACTION.ACTION,     doExportOfficeFormPDF),
    takeLatest(DOC_EXPORT_SAFETY_FORM_TO_PDF_ACTION.ACTION,     doExportSafetyFormPDF),
];