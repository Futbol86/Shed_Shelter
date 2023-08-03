import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { resetLoading } from 'react-redux-loading-bar';
import {
    LOAD_ALL_PRODUCTS_ACTION,
    LOAD_ALL_CATEGORIES_ACTION,
    BUILDING_SELECT_PRODUCT_ACTION,
    LOAD_QUOTE_INFO_ACTION,
    BUILDING_DETAIL_ACTION,
    QD_UPDATE_BUILDING_DETAIL,
    QD_DS_LOAD_GEOCODE_LATLNG_ACTION,
    QD_DS_UPLOAD_CERT_FILE,
    QD_DS_LOAD_ALT_GEOCODE_LATLNG,
    QD_SEND_ORDER_ACTION,
    QD_AD_SEND_TEXT_MESSAGE,
    QD_AD_SEND_TEXT_MESSAGE_CLIENTS,
    QD_AD_LOAD_LIST_TEXT_MESSAGES,
    QD_AD_ADD_A_NOTE,
    QD_AD_UPDATE_A_NOTE,
    QD_AD_DELETE_A_NOTE,
    QD_AD_DELETE_A_NOTE_OF_QUOTES_ATTACHED,
    QD_AD_LOAD_LIST_NOTES
} from '../actions';
import {
    QUOTES_PRODUCT_SELECTION_FORM_NAME_SUBMIT,
    QUOTES_PRODUCT_SELECTION_FORM_NAME_SUCCESS,
    QUOTES_PRODUCT_SELECTION_FORM_NAME_FAILURE,
    QUOTES_BUILDING_DETAIL_FORM_NAME_SUBMIT,
    QUOTES_BUILDING_DETAIL_FORM_NAME_SUCCESS,
    QUOTES_BUILDING_DETAIL_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';
import {utils} from '../../../services';

function* doLoadProducts({ payload }) {
    try {
        yield put({ type: LOAD_ALL_PRODUCTS_ACTION.LOADING });
        const data = yield call(api.apiLoadProducts, payload);
        yield put({ type: LOAD_ALL_PRODUCTS_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_ALL_PRODUCTS_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doLoadCategories({ payload }) {
    try {
        yield put({ type: LOAD_ALL_CATEGORIES_ACTION.LOADING });
        const data = yield call(api.apiLoadCategories, payload);
        yield put({ type: LOAD_ALL_CATEGORIES_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_ALL_CATEGORIES_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doSubmitProductSelection({ payload }) {
    try {
        yield put({ type: BUILDING_SELECT_PRODUCT_ACTION.LOADING });
        //-- Convert submitted productId to integer
        if (payload.productId)
            payload = {...payload, productId: parseInt(payload.productId, 10)};
        const data = yield call(api.apiSelectBuildingProduct, payload);
        yield put({ type: QUOTES_PRODUCT_SELECTION_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QUOTES_PRODUCT_SELECTION_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

/**
 * Load Quote Information
 *
 * @param payload
 * @returns {IterableIterator<*>}
 */
function* doLoadQuoteInfo({ payload }) {
    try {
        yield put({ type: LOAD_QUOTE_INFO_ACTION.LOADING });

        const data = yield call(api.apiLoadQuoteInfo, payload);
        yield put({ type: LOAD_QUOTE_INFO_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_QUOTE_INFO_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doLoadGeoCode({ payload }) {
    try {
        yield put({ type: QD_DS_LOAD_GEOCODE_LATLNG_ACTION.LOADING });

        const data = yield call(api.apiLoadGeoCodeFromAddress, payload);
        yield put({ type: QD_DS_LOAD_GEOCODE_LATLNG_ACTION.SUCCESS, payload: data });
        yield put(resetLoading());
    }
    catch (error) {
        yield put({ type: QD_DS_LOAD_GEOCODE_LATLNG_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doLoadAltGeoCode({ payload }) {
    try {
        yield put({ type: QD_DS_LOAD_ALT_GEOCODE_LATLNG.LOADING });

        const data = yield call(api.apiLoadGeoCodeFromAddress, payload);
        yield put({ type: QD_DS_LOAD_ALT_GEOCODE_LATLNG.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QD_DS_LOAD_ALT_GEOCODE_LATLNG.FAILURE, payload: {errors: error} });
    }
}


/**
 * Submit building detail data
 *
 * @param payload
 * @returns {IterableIterator<*>}
 */
function* doSubmitBuildingDetail({ payload }) {
    try {
        yield put({ type: BUILDING_DETAIL_ACTION.LOADING });
        const data = yield call(api.apiSubmitBuildingDetail, payload);
        yield put({ type: QUOTES_BUILDING_DETAIL_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QUOTES_BUILDING_DETAIL_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doUploadCertFile({ payload }) {
    try {
        yield put({ type: QD_DS_UPLOAD_CERT_FILE.LOADING });
        // console.log('Payload: ', payload);
        const data = yield call(utils.uploadFile, payload);
        yield put({ type: QD_DS_UPLOAD_CERT_FILE.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QD_DS_UPLOAD_CERT_FILE.FAILURE, payload: {errors: error} });
    }
}


export function* doSendingOrder({ payload }) {
    const quoteId = payload && payload.pdfContent  && payload.pdfContent.quoteId;
    try {
        // console.log("Sending Quote: ", quoteId);
        yield put({ type: QD_SEND_ORDER_ACTION.LOADING, payload: {quoteId} });
        const data = yield call(api.apiDoSendingOrder, payload);
        yield put({ type: QD_SEND_ORDER_ACTION.SUCCESS, payload: {...data, quoteId} });
    }
    catch (error) {
        yield put({ type: QD_SEND_ORDER_ACTION.FAILURE, payload: {errors: error, quoteId} });
    }
}

export function* doAddANote({ payload }) {
    try {
        yield put({ type: QD_AD_ADD_A_NOTE.LOADING });
        const data = yield call(api.apiAddANote, payload);
        yield put({ type: QD_AD_ADD_A_NOTE.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QD_AD_ADD_A_NOTE.FAILURE, payload: {errors: error} });
    }
}

export function* doUpdateANote({ payload }) {
    try {
        yield put({ type: QD_AD_UPDATE_A_NOTE.LOADING });
        const data = yield call(api.apiUpdateANote, payload);
        yield put({ type: QD_AD_UPDATE_A_NOTE.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QD_AD_UPDATE_A_NOTE.FAILURE, payload: {errors: error} });
    }
}

export function* doDeleteANote({ payload }) {
    try {
        yield put({ type: QD_AD_DELETE_A_NOTE.LOADING });
        const data = yield call(api.apiDeleteANote, payload);
        yield put({ type: QD_AD_DELETE_A_NOTE.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QD_AD_DELETE_A_NOTE.FAILURE, payload: {errors: error} });
    }
}

export function* doDeleteANoteOfQuotesAttached({ payload }) {
    try {
        yield put({ type: QD_AD_DELETE_A_NOTE_OF_QUOTES_ATTACHED.LOADING });
        const data = yield call(api.apiDeleteANote, payload);
        yield put({ type: QD_AD_DELETE_A_NOTE_OF_QUOTES_ATTACHED.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QD_AD_DELETE_A_NOTE_OF_QUOTES_ATTACHED.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadNotesList({ payload }) {
    try {
        yield put({ type: QD_AD_LOAD_LIST_NOTES.LOADING });
        const data = yield call(api.apiLoadNotesList, payload);
        yield put({ type: QD_AD_LOAD_LIST_NOTES.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QD_AD_LOAD_LIST_NOTES.FAILURE, payload: {errors: error} });
    }
}

export function* doSendTextMessage({ payload }) {
    try {
        yield put({ type: QD_AD_SEND_TEXT_MESSAGE.LOADING });
        const data = yield call(api.apiSendTextMessage, payload);
        yield put({ type: QD_AD_SEND_TEXT_MESSAGE.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QD_AD_SEND_TEXT_MESSAGE.FAILURE, payload: {errors: error} });
    }
}

export function* doSendTextMessageClients({ payload }) {
    try {
        yield put({ type: QD_AD_SEND_TEXT_MESSAGE_CLIENTS.LOADING });
        const data = yield call(api.apiSendTextMessageClients, payload);
        yield put({ type: QD_AD_SEND_TEXT_MESSAGE_CLIENTS.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QD_AD_SEND_TEXT_MESSAGE_CLIENTS.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadTextMessagesList({ payload }) {
    try {
        yield put({ type: QD_AD_LOAD_LIST_TEXT_MESSAGES.LOADING });
        const data = yield call(api.apiLoadTextMessagesList, payload);
        yield put({ type: QD_AD_LOAD_LIST_TEXT_MESSAGES.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QD_AD_LOAD_LIST_TEXT_MESSAGES.FAILURE, payload: {errors: error} });
    }
}

function* doUpdateBuildingDetail({ payload }) {
    try {
        yield put({ type: QD_UPDATE_BUILDING_DETAIL.LOADING });
        const data = yield call(api.apiChangeBuildingDetail, payload);
        yield put({ type: QD_UPDATE_BUILDING_DETAIL.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QD_UPDATE_BUILDING_DETAIL.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_ALL_CATEGORIES_ACTION.ACTION,           doLoadCategories),
    takeLatest(LOAD_ALL_PRODUCTS_ACTION.ACTION,             doLoadProducts),
    takeLatest(QUOTES_PRODUCT_SELECTION_FORM_NAME_SUBMIT,   doSubmitProductSelection),
    takeLatest(LOAD_QUOTE_INFO_ACTION.ACTION,               doLoadQuoteInfo),
    takeLatest(QUOTES_BUILDING_DETAIL_FORM_NAME_SUBMIT,     doSubmitBuildingDetail),
    takeLatest(QD_UPDATE_BUILDING_DETAIL.ACTION,            doUpdateBuildingDetail),
    takeLatest(QD_DS_LOAD_GEOCODE_LATLNG_ACTION.ACTION,     doLoadGeoCode),
    takeLatest(QD_DS_LOAD_ALT_GEOCODE_LATLNG.ACTION,        doLoadAltGeoCode),
    takeEvery(QD_DS_UPLOAD_CERT_FILE.ACTION,                doUploadCertFile),
    takeLatest(QD_SEND_ORDER_ACTION.ACTION,                 doSendingOrder),
    takeLatest(QD_AD_SEND_TEXT_MESSAGE.ACTION,              doSendTextMessage),
    takeLatest(QD_AD_SEND_TEXT_MESSAGE_CLIENTS.ACTION,      doSendTextMessageClients),
    takeLatest(QD_AD_LOAD_LIST_TEXT_MESSAGES.ACTION,        doLoadTextMessagesList),
    takeLatest(QD_AD_ADD_A_NOTE.ACTION,                     doAddANote),
    takeLatest(QD_AD_UPDATE_A_NOTE.ACTION,                  doUpdateANote),
    takeLatest(QD_AD_DELETE_A_NOTE.ACTION,                  doDeleteANote),
    takeLatest(QD_AD_DELETE_A_NOTE_OF_QUOTES_ATTACHED.ACTION, doDeleteANoteOfQuotesAttached),
    takeLatest(QD_AD_LOAD_LIST_NOTES.ACTION,                doLoadNotesList)
];