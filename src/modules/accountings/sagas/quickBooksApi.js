import { call, put, takeLatest } from 'redux-saga/effects';
import {
    QUICKBOOKS_AUTHORIZE_URI_ACTION,
    QUICKBOOKS_GET_COMPANY_INFO_ACTION,

    QUICKBOOKS_GET_ACCOUNTS_ACTION,
    QUICKBOOKS_GET_AN_ACCOUNT_ACTION,
    QUICKBOOKS_CREATE_NEW_ACCOUNT_ACTION,
    
    QUICKBOOKS_GET_CUSTOMERS_ACTION,
    QUICKBOOKS_GET_A_CUSTOMER_ACTION,
    QUICKBOOKS_CREATE_NEW_CUSTOMER_ACTION,

    QUICKBOOKS_GET_ITEMS_ACTION,
    QUICKBOOKS_GET_A_ITEM_ACTION,
    QUICKBOOKS_CREATE_NEW_ITEM_ACTION,

    QUICKBOOKS_GET_INVOICES_ACTION,
    QUICKBOOKS_GET_A_INVOICE_ACTION,
    QUICKBOOKS_CREATE_NEW_INVOICE_ACTION,
} from '../actions';
import {
    QUICKBOOKS_ACCOUNT_APIS_FORM_NAME_SUBMIT,
    QUICKBOOKS_ACCOUNT_APIS_FORM_NAME_SUCCESS,
    QUICKBOOKS_ACCOUNT_APIS_FORM_NAME_FAILURE,

    QUICKBOOKS_CUSTOMER_APIS_FORM_NAME_SUBMIT,
    QUICKBOOKS_CUSTOMER_APIS_FORM_NAME_SUCCESS,
    QUICKBOOKS_CUSTOMER_APIS_FORM_NAME_FAILURE,

    QUICKBOOKS_ITEM_APIS_FORM_NAME_SUBMIT,
    QUICKBOOKS_ITEM_APIS_FORM_NAME_SUCCESS,
    QUICKBOOKS_ITEM_APIS_FORM_NAME_FAILURE,

    QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM_NAME_SUBMIT,
    QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM_NAME_SUCCESS,
    QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM_NAME_FAILURE,

    QUICKBOOKS_INVOICE_APIS_FORM_NAME_SUBMIT,
    QUICKBOOKS_INVOICE_APIS_FORM_NAME_SUCCESS,
    QUICKBOOKS_INVOICE_APIS_FORM_NAME_FAILURE,
} from '../constants';
import * as api from '../apis';

export function* doQuickBooksAuthorizeUri() {
    try {
        yield put({ type: QUICKBOOKS_AUTHORIZE_URI_ACTION.LOADING });
        const data = yield call(api.apiQuickBooksAuthorizeUri);
        yield put({ type: QUICKBOOKS_AUTHORIZE_URI_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QUICKBOOKS_AUTHORIZE_URI_ACTION.FAILURE, payload: {errors: error} });
    }
}

// ** ACCOUNTS
export function* doQuickBooksGetAccounts({ payload }) {
    try {
        yield put({ type: QUICKBOOKS_GET_ACCOUNTS_ACTION.LOADING });
        const data = yield call(api.apiQuickBooksGetDatasByQuerySQL, payload);
        if(data.data.status === 0) {
            yield put({ type: QUICKBOOKS_GET_ACCOUNTS_ACTION.FAILURE, payload: {errors:  data.data.msg.authResponse.body} });
            return;
        }
        yield put({ type: QUICKBOOKS_GET_ACCOUNTS_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QUICKBOOKS_GET_ACCOUNTS_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doQuickBooksGetAnAccount({ payload }) {
    try {
        yield put({ type: QUICKBOOKS_GET_AN_ACCOUNT_ACTION.LOADING });
        const data = yield call(api.apiQuickBooksGetDataById, payload);
        if(data.data.status === 0) {
            yield put({ type: QUICKBOOKS_GET_AN_ACCOUNT_ACTION.FAILURE, payload: {errors:  data.data.msg.authResponse.body} });
            return;
        }
        yield put({ type: QUICKBOOKS_GET_AN_ACCOUNT_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QUICKBOOKS_GET_AN_ACCOUNT_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doQuickBooksCreateNewAccount({ payload }) {
    try {
        yield put({ type: QUICKBOOKS_CREATE_NEW_ACCOUNT_ACTION.LOADING });
        const data = yield call(api.apiQuickBooksCreateNewData, payload);
        if(data.data.status === 0) {
            yield put({ type: QUICKBOOKS_ACCOUNT_APIS_FORM_NAME_FAILURE, payload: {_error:  data.data.msg.authResponse.body} });
            return;
        }
        yield put({ type: QUICKBOOKS_ACCOUNT_APIS_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QUICKBOOKS_ACCOUNT_APIS_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

// ** COMPANY INFO
export function* doQuickBooksGetCompanyInfo({ payload }) {
    try {
        yield put({ type: QUICKBOOKS_GET_COMPANY_INFO_ACTION.LOADING });
        const data = yield call(api.apiQuickBooksGetCompanyInfo, payload);
        if(data.data.status === 0) {
            yield put({ type: QUICKBOOKS_GET_COMPANY_INFO_ACTION.FAILURE, payload: {errors:  data.data.msg.authResponse.body} });
            return;
        }
        yield put({ type: QUICKBOOKS_GET_COMPANY_INFO_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QUICKBOOKS_GET_COMPANY_INFO_ACTION.FAILURE, payload: {errors: error} });
    }
}

// ** CUSTOMERS
export function* doQuickBooksGetCustomers({ payload }) {
    try {
        yield put({ type: QUICKBOOKS_GET_CUSTOMERS_ACTION.LOADING });
        const data = yield call(api.apiQuickBooksGetDatasByQuerySQL, payload);
        if(data.data.status === 0) {
            yield put({ type: QUICKBOOKS_GET_CUSTOMERS_ACTION.FAILURE, payload: {errors:  data.data.msg.authResponse.body} });
            return;
        }
        yield put({ type: QUICKBOOKS_GET_CUSTOMERS_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QUICKBOOKS_GET_CUSTOMERS_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doQuickBooksGetACustomer({ payload }) {
    try {
        yield put({ type: QUICKBOOKS_GET_A_CUSTOMER_ACTION.LOADING });
        const data = yield call(api.apiQuickBooksGetDataById, payload);
        if(data.data.status === 0) {
            yield put({ type: QUICKBOOKS_GET_A_CUSTOMER_ACTION.FAILURE, payload: {errors:  data.data.msg.authResponse.body} });
            return;
        }
        yield put({ type: QUICKBOOKS_GET_A_CUSTOMER_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QUICKBOOKS_GET_A_CUSTOMER_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doQuickBooksCreateNewCustomer({ payload }) {
    try {
        yield put({ type: QUICKBOOKS_CREATE_NEW_CUSTOMER_ACTION.LOADING });
        const data = yield call(api.apiQuickBooksCreateNewData, payload);
        if(data.data.status === 0) {
            yield put({ type: QUICKBOOKS_CUSTOMER_APIS_FORM_NAME_FAILURE, payload: {_error:  data.data.msg.authResponse.body} });
            return;
        }
        yield put({ type: QUICKBOOKS_CUSTOMER_APIS_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QUICKBOOKS_CUSTOMER_APIS_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

// ** ITEMS
export function* doQuickBooksGetItems({ payload }) {
    try {
        yield put({ type: QUICKBOOKS_GET_ITEMS_ACTION.LOADING });
        const data = yield call(api.apiQuickBooksGetDatasByQuerySQL, payload);
        yield put({ type: QUICKBOOKS_GET_ITEMS_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QUICKBOOKS_GET_ITEMS_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doQuickBooksGetAItem({ payload }) {
    try {
        yield put({ type: QUICKBOOKS_GET_A_ITEM_ACTION.LOADING });
        const data = yield call(api.apiQuickBooksGetDataById, payload);
        if(data.data.status === 0) {
            yield put({ type: QUICKBOOKS_GET_A_ITEM_ACTION.FAILURE, payload: {errors:  data.data.msg.authResponse.body} });
            return;
        }
        yield put({ type: QUICKBOOKS_GET_A_ITEM_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QUICKBOOKS_GET_A_ITEM_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doQuickBooksCreateNewItem({ payload }) {
    try {
        yield put({ type: QUICKBOOKS_CREATE_NEW_ITEM_ACTION.LOADING });
        const data = yield call(api.apiQuickBooksCreateNewData, payload);
        if(data.data.status === 0) {
            yield put({ type: QUICKBOOKS_ITEM_APIS_FORM_NAME_FAILURE, payload: {_error:  data.data.msg.authResponse.body} });
            return;
        }
        yield put({ type: QUICKBOOKS_ITEM_APIS_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QUICKBOOKS_ITEM_APIS_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export function* doQuickBooksCreateNewCategory({ payload }) {
    try {
        yield put({ type: QUICKBOOKS_CREATE_NEW_ITEM_ACTION.LOADING });
        const data = yield call(api.apiQuickBooksCreateNewData, payload);
        if(data.data.status === 0) {
            yield put({ type: QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM_NAME_FAILURE, payload: {_error:  data.data.msg.authResponse.body} });
            return;
        }
        yield put({ type: QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export function* doQuickBooksGetInvoices({ payload }) {
    try {
        yield put({ type: QUICKBOOKS_GET_INVOICES_ACTION.LOADING });
        const data = yield call(api.apiQuickBooksGetDatasByQuerySQL, payload);
        yield put({ type: QUICKBOOKS_GET_INVOICES_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QUICKBOOKS_GET_INVOICES_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doQuickBooksGetAInvoice({ payload }) {
    try {
        yield put({ type: QUICKBOOKS_GET_A_INVOICE_ACTION.LOADING });
        const data = yield call(api.apiQuickBooksGetDataById, payload);
        if(data.data.status === 0) {
            yield put({ type: QUICKBOOKS_GET_A_INVOICE_ACTION.FAILURE, payload: {errors:  data.data.msg.authResponse.body} });
            return;
        }
        yield put({ type: QUICKBOOKS_GET_A_INVOICE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QUICKBOOKS_GET_A_INVOICE_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doQuickBooksCreateNewInvoice({ payload }) {
    try {
        yield put({ type: QUICKBOOKS_CREATE_NEW_INVOICE_ACTION.LOADING });
        const data = yield call(api.apiQuickBooksCreateNewData, payload);
        if(data.data.status === 0) {
            yield put({ type: QUICKBOOKS_INVOICE_APIS_FORM_NAME_FAILURE, payload: {_error:  data.data.msg.authResponse.body} });
            return;
        }
        yield put({ type: QUICKBOOKS_INVOICE_APIS_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: QUICKBOOKS_INVOICE_APIS_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(QUICKBOOKS_AUTHORIZE_URI_ACTION.ACTION,             doQuickBooksAuthorizeUri),
    takeLatest(QUICKBOOKS_GET_COMPANY_INFO_ACTION.ACTION,          doQuickBooksGetCompanyInfo),

    takeLatest(QUICKBOOKS_GET_ACCOUNTS_ACTION.ACTION,              doQuickBooksGetAccounts),
    takeLatest(QUICKBOOKS_GET_AN_ACCOUNT_ACTION.ACTION,            doQuickBooksGetAnAccount),
    takeLatest(QUICKBOOKS_ACCOUNT_APIS_FORM_NAME_SUBMIT,           doQuickBooksCreateNewAccount),

    takeLatest(QUICKBOOKS_GET_CUSTOMERS_ACTION.ACTION,             doQuickBooksGetCustomers),
    takeLatest(QUICKBOOKS_GET_A_CUSTOMER_ACTION.ACTION,            doQuickBooksGetACustomer),
    takeLatest(QUICKBOOKS_CUSTOMER_APIS_FORM_NAME_SUBMIT,          doQuickBooksCreateNewCustomer),

    takeLatest(QUICKBOOKS_GET_ITEMS_ACTION.ACTION,                 doQuickBooksGetItems),
    takeLatest(QUICKBOOKS_GET_A_ITEM_ACTION.ACTION,                doQuickBooksGetAItem),
    takeLatest(QUICKBOOKS_ITEM_APIS_FORM_NAME_SUBMIT,              doQuickBooksCreateNewItem),
    takeLatest(QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM_NAME_SUBMIT, doQuickBooksCreateNewCategory),

    takeLatest(QUICKBOOKS_GET_INVOICES_ACTION.ACTION,              doQuickBooksGetInvoices),
    takeLatest(QUICKBOOKS_GET_A_INVOICE_ACTION.ACTION,             doQuickBooksGetAInvoice),
    takeLatest(QUICKBOOKS_INVOICE_APIS_FORM_NAME_SUBMIT,           doQuickBooksCreateNewInvoice),
];