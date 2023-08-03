import { call, put, takeLatest } from 'redux-saga/effects';
import { LIST_QUOTES_ACTION, DELETE_A_QUOTE_ACTION } from '../actions';
import * as api from '../apis';

export function* doLoadQuoteList({ payload }) {
    try {
        yield put({ type: LIST_QUOTES_ACTION.LOADING });
        const data = yield call(api.apiDashboardQuotes, payload);
        yield put({ type: LIST_QUOTES_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LIST_QUOTES_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doDeleteAQuote({ payload }) {
    try {
        yield put({ type: DELETE_A_QUOTE_ACTION.LOADING });
        const data = yield call(api.apiDashboardDeleteAQuote, payload);
        yield put({ type: DELETE_A_QUOTE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_QUOTE_ACTION.FAILURE, payload: {errors: error} });
    }
}


export default
[
    takeLatest(LIST_QUOTES_ACTION.ACTION,           doLoadQuoteList),
    takeLatest(DELETE_A_QUOTE_ACTION.ACTION,        doDeleteAQuote),
];