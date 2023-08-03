import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_CONTRUCTION_ACTION } from '../actions';
import { 
    CONTRUCTION_LIST_FILTER_FORM_NAME_SUBMIT,
    CONTRUCTION_LIST_FILTER_FORM_NAME_SUCCESS,
    CONTRUCTION_LIST_FILTER_FORM_NAME_FAILURE,
    SHARED_CONTRUCTION_LIST_FILTER_FORM_NAME_SUBMIT,
    SHARED_CONTRUCTION_LIST_FILTER_FORM_NAME_SUCCESS,
    SHARED_CONTRUCTION_LIST_FILTER_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';

export function* doLoadContructionList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_CONTRUCTION_ACTION.LOADING });
        const data = yield call(api.apiLoadContructionList, payload);
        yield put({ type: LOAD_LIST_CONTRUCTION_ACTION.SUCCESS, payload: {...data} });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_CONTRUCTION_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadContructionListFilter({ payload }) {
    try {
        yield put({ type: LOAD_LIST_CONTRUCTION_ACTION.LOADING });
        const data = yield call(api.apiLoadContructionList, {filter: payload});
        yield put({ type: LOAD_LIST_CONTRUCTION_ACTION.SUCCESS, payload: data });
        yield put({ type: CONTRUCTION_LIST_FILTER_FORM_NAME_SUCCESS, payload });
        yield put({ type: SHARED_CONTRUCTION_LIST_FILTER_FORM_NAME_SUCCESS, payload });
    }
    catch (error) {
        yield put({ type: CONTRUCTION_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
        yield put({ type: SHARED_CONTRUCTION_LIST_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_CONTRUCTION_ACTION.ACTION,               doLoadContructionList),
    takeLatest(CONTRUCTION_LIST_FILTER_FORM_NAME_SUBMIT,          doLoadContructionListFilter),
    takeLatest(SHARED_CONTRUCTION_LIST_FILTER_FORM_NAME_SUBMIT,   doLoadContructionListFilter)
];