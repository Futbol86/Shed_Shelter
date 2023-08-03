import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_ORDER_ACTION, LOAD_LIST_SHARED_ORDER_ACTION, } from '../actions';
import { 
    ORDER_LIST_FILTER_FORM_NAME_SUBMIT,
    ORDER_LIST_FILTER_FORM_NAME_SUCCESS,
    ORDER_LIST_FILTER_FORM_NAME_FAILURE,
    SHARED_ORDER_LIST_FILTER_FORM_NAME_SUBMIT,
    SHARED_ORDER_LIST_FILTER_FORM_NAME_SUCCESS,
    SHARED_ORDER_LIST_FILTER_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';

export function* doLoadOrderList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_ORDER_ACTION.LOADING });
        const data = yield call(api.apiLoadOrderList, payload);
        yield put({ type: LOAD_LIST_ORDER_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_ORDER_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadOrderListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_ORDER_ACTION.LOADING });
        const data = yield call(api.apiLoadOrderList, {filter: payload});
        yield put({ type: LOAD_LIST_ORDER_ACTION.SUCCESS, payload: data });
        yield put({ type: ORDER_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: ORDER_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_ORDER_ACTION.ACTION,               doLoadOrderList),
    takeLatest(ORDER_LIST_FILTER_FORM_NAME_SUBMIT,          doLoadOrderListFilter)
];