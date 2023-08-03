import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_CONTRUCTION_DATA_ENTRY_ACTION, DELETE_A_CONTRUCTION_DATA_ENTRY_ACTION } from '../actions';
import * as api from '../apis';

export function* doLoadContructionDataEntryList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_CONTRUCTION_DATA_ENTRY_ACTION.LOADING });
        const data = yield call(api.apiLoadContructionDataEntryList, payload);
        yield put({ type: LOAD_LIST_CONTRUCTION_DATA_ENTRY_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_CONTRUCTION_DATA_ENTRY_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAContructionDataEntr({ payload }) {
    try {
        yield put({ type: DELETE_A_CONTRUCTION_DATA_ENTRY_ACTION.LOADING });
        let data = yield call(api.apideleteAContructionDataEntry, payload);
        yield put({ type: DELETE_A_CONTRUCTION_DATA_ENTRY_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_CONTRUCTION_DATA_ENTRY_ACTION.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_CONTRUCTION_DATA_ENTRY_ACTION.ACTION,   doLoadContructionDataEntryList),
    takeLatest(DELETE_A_CONTRUCTION_DATA_ENTRY_ACTION.ACTION,    doDeleteAContructionDataEntr)
];