import { call, put, takeLatest } from 'redux-saga/effects';
import { 
    DOC_LOAD_AN_ACCOUNTING_ACTION,
    DOC_LOAD_LIST_ACCOUNTING_LOG_ACTION,
    DOC_LOAD_A_QUOTE_INFO_ACTION,
    DOC_EXPORT_ACCOUNTING_LOG_TO_PDF,
} from '../actions';
import {
    DOCS_ACCOUNTING_FORM_NAME_SUBMIT,
    DOCS_ACCOUNTING_FORM_NAME_SUCCESS,
    DOCS_ACCOUNTING_FORM_NAME_FAILURE,
} from '../constants';
import * as api from '../apis';

export function* doLoadAnAccounting ({ payload }) {
    try {
        yield put({ type: DOC_LOAD_AN_ACCOUNTING_ACTION.LOADING });
        const data = yield call(api.apiLoadAnAccounting, payload);
        yield put({ type: DOC_LOAD_AN_ACCOUNTING_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_LOAD_AN_ACCOUNTING_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadAQuoteInfo ({ payload }) {
    try {
        yield put({ type: DOC_LOAD_A_QUOTE_INFO_ACTION.LOADING });
        const data = yield call(api.apiLoadAQuoteInfo, payload);
        yield put({ type: DOC_LOAD_A_QUOTE_INFO_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_LOAD_A_QUOTE_INFO_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitAnAccounting({ payload }) {
    try {
        yield put({ type: DOC_LOAD_AN_ACCOUNTING_ACTION.LOADING });
        let accountingTotalJSON = " - Supplier Detail Totals: \n" + JSON.stringify(payload.supplierDetailsTotal) 
                                + "\n - Trade Detail Totals: \n" + JSON.stringify(payload.tradeDetailsTotal);
        const data = payload.id ? yield call(api.apiUpdateAnAccounting, payload) 
                                : yield call(api.apiCreateAnAccounting, payload);

        yield call(api.apiCreateAnAccountingLog, {
            quoteId: payload.quoteId, userId: payload.userId, 
            content: accountingTotalJSON
        });
        yield put({ type: DOCS_ACCOUNTING_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOCS_ACCOUNTING_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export function* doLoadListAccountingLog({ payload }) {
    try {
        yield put({ type: DOC_LOAD_LIST_ACCOUNTING_LOG_ACTION.LOADING });
        const data = yield call(api.apiLoadAccountingLogList, payload);
        yield put({ type: DOC_LOAD_LIST_ACCOUNTING_LOG_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_LOAD_LIST_ACCOUNTING_LOG_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doExportAccountingLogToPDF({ payload }) {
    try {
        yield put({ type: DOC_EXPORT_ACCOUNTING_LOG_TO_PDF.LOADING });
        const data = yield call(api.apiExportAccountingLogToPDF, payload);
        yield put({ type: DOC_EXPORT_ACCOUNTING_LOG_TO_PDF.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_EXPORT_ACCOUNTING_LOG_TO_PDF.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(DOC_LOAD_AN_ACCOUNTING_ACTION.ACTION,            doLoadAnAccounting),
    takeLatest(DOCS_ACCOUNTING_FORM_NAME_SUBMIT,                doSubmitAnAccounting),
    takeLatest(DOC_LOAD_LIST_ACCOUNTING_LOG_ACTION.ACTION,      doLoadListAccountingLog),
    takeLatest(DOC_EXPORT_ACCOUNTING_LOG_TO_PDF.ACTION,         doExportAccountingLogToPDF),
    takeLatest(DOC_LOAD_A_QUOTE_INFO_ACTION.ACTION,             doLoadAQuoteInfo),
];