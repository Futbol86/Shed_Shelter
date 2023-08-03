import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_CLIENTS_ACTION } from '../actions';
import * as api from '../apis';
import {
    CLIENTS_LIST_FILTER_FORM_NAME_FAILURE, CLIENTS_LIST_FILTER_FORM_NAME_SUBMIT,
    CLIENTS_LIST_FILTER_FORM_NAME_SUCCESS
} from "../constants";

export function* doLoadClientList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_CLIENTS_ACTION.LOADING });
        const data = yield call(api.apiLoadClientList, payload);
        yield put({ type: LOAD_LIST_CLIENTS_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_CLIENTS_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadClientFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_CLIENTS_ACTION.LOADING });
        const data = yield call(api.apiLoadClientList, {filter: payload});
        yield put({ type: LOAD_LIST_CLIENTS_ACTION.SUCCESS, payload: data });
        yield put({ type: CLIENTS_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_CLIENTS_ACTION.FAILURE, payload: {errors: error} });
        yield put({ type: CLIENTS_LIST_FILTER_FORM_NAME_FAILURE });
    }
}


export default
[
    takeLatest(LOAD_LIST_CLIENTS_ACTION.ACTION,         doLoadClientList),
    takeLatest(CLIENTS_LIST_FILTER_FORM_NAME_SUBMIT,    doLoadClientFilter)
];