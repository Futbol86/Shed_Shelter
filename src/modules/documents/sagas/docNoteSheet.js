import { call, put, takeLatest } from 'redux-saga/effects';
import utils from '../../../services/utils';
import { 
    DOC_LOAD_A_SWMS_GENERIC_FORM_ACTION, DOC_EXPORT_SWMS_GENERIC_FORM_TO_PDF_ACTION
} from '../actions';
import {
    DOCS_SWMS_GENERIC_FORM_NAME_SUBMIT,
    DOCS_SWMS_GENERIC_FORM_NAME_SUCCESS,
    DOCS_SWMS_GENERIC_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';

export function* doLoadASWMSGenericForm ({ payload }) {
    try {
        yield put({ type: DOC_LOAD_A_SWMS_GENERIC_FORM_ACTION.LOADING });
        const data = yield call(api.apiLoadASWMSGenericForm, payload);
        yield put({ type: DOC_LOAD_A_SWMS_GENERIC_FORM_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_LOAD_A_SWMS_GENERIC_FORM_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitSWMSGenericForm({ payload }) {
    try {
        yield put({ type: DOC_LOAD_A_SWMS_GENERIC_FORM_ACTION.LOADING });
        const data = payload.id ? yield call(api.apiUpdateASWMSGenericForm, payload)
                                : yield call(api.apiCreateASWMSGenericForm, payload);
        yield put({ type: DOCS_SWMS_GENERIC_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOCS_SWMS_GENERIC_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export function* doExportSWMSGenericFormPDF({ payload }) {
    try {
        yield put({ type: DOC_EXPORT_SWMS_GENERIC_FORM_TO_PDF_ACTION.LOADING });
        const data = yield call(api.apiExportSWMSGenericFormPDF, payload);
        yield put({ type: DOC_EXPORT_SWMS_GENERIC_FORM_TO_PDF_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_EXPORT_SWMS_GENERIC_FORM_TO_PDF_ACTION.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(DOC_LOAD_A_SWMS_GENERIC_FORM_ACTION.ACTION,         doLoadASWMSGenericForm),
    takeLatest(DOCS_SWMS_GENERIC_FORM_NAME_SUBMIT,                 doSubmitSWMSGenericForm),
    takeLatest(DOC_EXPORT_SWMS_GENERIC_FORM_TO_PDF_ACTION.ACTION,  doExportSWMSGenericFormPDF),
];