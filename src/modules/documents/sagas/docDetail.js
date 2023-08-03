import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
    DOC_LOAD_A_DOCUMENT,
    DOC_CONVERT_HTML_TO_PDF,
    DOC_QP_UPLOAD_LOGO_FILE,
    DOC_REQUEST_ZIP_CONTENT
} from '../actions';
import * as api from '../apis';
import { resetLoading } from 'react-redux-loading-bar';
import {
    DOCS_GENERAL_FORM_NAME_SUBMIT,
    DOCS_GENERAL_FORM_NAME_FAILURE,
    DOCS_GENERAL_FORM_NAME_SUCCESS,
    DOCS_TRADES_SHEET_FORM_NAME_SUBMIT,
    DOCS_TRADES_SHEET_FORM_NAME_SUCCESS,
    DOCS_TRADES_SHEET_FORM_NAME_FAILURE,
    DOCS_COLOURS_SHEET_FORM_NAME_SUBMIT,
    DOCS_COLOURS_SHEET_FORM_NAME_SUCCESS,
    DOCS_COLOURS_SHEET_FORM_NAME_FAILURE,
    DOCS_SCHEDULE_SHEET_FORM_NAME_SUBMIT,
    DOCS_SCHEDULE_SHEET_FORM_NAME_SUCCESS,
    DOCS_SCHEDULE_SHEET_FORM_NAME_FAILURE,
    DOCS_SCHEDULE_EXT_SHEET_FORM_NAME_SUBMIT,
    DOCS_SCHEDULE_EXT_SHEET_FORM_NAME_SUCCESS,
    DOCS_SCHEDULE_EXT_SHEET_FORM_NAME_FAILURE,
    DOCS_VARIATION_DOC_SHEET_FORM_NAME_SUBMIT,
    DOCS_VARIATION_DOC_SHEET_FORM_NAME_SUCCESS,
    DOCS_VARIATION_DOC_SHEET_FORM_NAME_FAILURE,
    DOCS_DELIVERY_SHEET_FORM_NAME_SUBMIT,
    DOCS_DELIVERY_SHEET_FORM_NAME_SUCCESS,
    DOCS_DELIVERY_SHEET_FORM_NAME_FAILURE
} from "../constants";
import utils from "../../../services/utils";

export function* doLoadADocument({ payload }) {
    try {
        yield put({ type: DOC_LOAD_A_DOCUMENT.LOADING });
        const {pageId} = payload;
        const data = yield call(api.apiFindADocument, payload);
        yield put({ type: DOC_LOAD_A_DOCUMENT.SUCCESS, payload: data, pageId });
        yield put(resetLoading());
    }
    catch (error) {
        yield put({ type: DOC_LOAD_A_DOCUMENT.FAILURE, payload: {errors: error} });
    }
}

/**
 * Submit a document to save at the remote server
 *
 * @param originalType
 * @param payload
 * @returns {IterableIterator<*>}
 */
function* doSubmitADocument({type: originalType, payload}) {
    try {
        //console.log("doSubmitADocument", payload);
        const data = yield call(api.apiUpdateADocument, payload);
        let type = null;
        switch (originalType){
            case DOCS_TRADES_SHEET_FORM_NAME_SUBMIT:
                type = DOCS_TRADES_SHEET_FORM_NAME_SUCCESS;
                break;
            case DOCS_COLOURS_SHEET_FORM_NAME_SUBMIT:
                type = DOCS_COLOURS_SHEET_FORM_NAME_SUCCESS;
                break;
            case DOCS_SCHEDULE_SHEET_FORM_NAME_SUBMIT:
                type = DOCS_SCHEDULE_SHEET_FORM_NAME_SUCCESS;
                break;
            case DOCS_SCHEDULE_EXT_SHEET_FORM_NAME_SUBMIT:
                type = DOCS_SCHEDULE_EXT_SHEET_FORM_NAME_SUCCESS;
                break;
            case DOCS_VARIATION_DOC_SHEET_FORM_NAME_SUBMIT:
                type = DOCS_VARIATION_DOC_SHEET_FORM_NAME_SUCCESS;
                break;
            case DOCS_DELIVERY_SHEET_FORM_NAME_SUBMIT:
                type = DOCS_DELIVERY_SHEET_FORM_NAME_SUCCESS;
                break;
            default:
                type = DOCS_GENERAL_FORM_NAME_SUCCESS;
        }
        yield put({ type, payload: data });
    }
    catch (error) {
        let type = null;
        switch (originalType){
            case DOCS_TRADES_SHEET_FORM_NAME_SUBMIT:
                type = DOCS_TRADES_SHEET_FORM_NAME_FAILURE;
                break;
            case DOCS_COLOURS_SHEET_FORM_NAME_SUBMIT:
                type = DOCS_COLOURS_SHEET_FORM_NAME_FAILURE;
                break;
            case DOCS_SCHEDULE_SHEET_FORM_NAME_SUBMIT:
                type = DOCS_SCHEDULE_SHEET_FORM_NAME_FAILURE;
                break;
            case DOCS_SCHEDULE_EXT_SHEET_FORM_NAME_SUBMIT:
                type = DOCS_SCHEDULE_EXT_SHEET_FORM_NAME_FAILURE;
                break;
            case DOCS_VARIATION_DOC_SHEET_FORM_NAME_SUBMIT:
                type = DOCS_VARIATION_DOC_SHEET_FORM_NAME_FAILURE;
                break;
            case DOCS_DELIVERY_SHEET_FORM_NAME_SUBMIT:
                type = DOCS_DELIVERY_SHEET_FORM_NAME_FAILURE;
                break;
            default:
                type = DOCS_GENERAL_FORM_NAME_FAILURE;
        }
        yield put({ type, payload: {errors: error} });
    }
}

export function* doConvertHTMLToPDF({ payload }) {
    try {
        yield put({ type: DOC_CONVERT_HTML_TO_PDF.LOADING });
        const data = yield call(api.apiConvertHTMLToPDF, payload);
        yield put({ type: DOC_CONVERT_HTML_TO_PDF.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_CONVERT_HTML_TO_PDF.FAILURE, payload: {errors: error} });
    }
}

export function* doRequestZipContent({ payload }) {
    try {
        yield put({ type: DOC_REQUEST_ZIP_CONTENT.LOADING });
        const data = yield call(api.apiRequestZipContent, payload);
        yield put({ type: DOC_REQUEST_ZIP_CONTENT.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_REQUEST_ZIP_CONTENT.FAILURE, payload: {errors: error} });
    }
}

function* doUploadLogoFile({ payload }) {
    try {
        yield put({ type: DOC_QP_UPLOAD_LOGO_FILE.LOADING });
        //console.log('Payload: ', payload);
        const data = yield call(utils.uploadFile, payload);
        yield put({ type: DOC_QP_UPLOAD_LOGO_FILE.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_QP_UPLOAD_LOGO_FILE.FAILURE, payload: {errors: error} });
    }
}


export default
[
    takeEvery(DOC_LOAD_A_DOCUMENT.ACTION,              doLoadADocument),
    takeLatest(DOCS_GENERAL_FORM_NAME_SUBMIT,           doSubmitADocument),
    takeLatest(DOCS_TRADES_SHEET_FORM_NAME_SUBMIT,      doSubmitADocument),
    takeLatest(DOCS_COLOURS_SHEET_FORM_NAME_SUBMIT,     doSubmitADocument),
    takeLatest(DOCS_SCHEDULE_SHEET_FORM_NAME_SUBMIT,    doSubmitADocument),
    takeLatest(DOCS_SCHEDULE_EXT_SHEET_FORM_NAME_SUBMIT,    doSubmitADocument),
    takeLatest(DOCS_VARIATION_DOC_SHEET_FORM_NAME_SUBMIT,    doSubmitADocument),
    takeLatest(DOCS_DELIVERY_SHEET_FORM_NAME_SUBMIT,    doSubmitADocument),
    takeLatest(DOC_CONVERT_HTML_TO_PDF.ACTION,     doConvertHTMLToPDF),
    takeLatest(DOC_REQUEST_ZIP_CONTENT.ACTION,     doRequestZipContent),
    takeLatest(DOC_QP_UPLOAD_LOGO_FILE.ACTION,     doUploadLogoFile),
];
