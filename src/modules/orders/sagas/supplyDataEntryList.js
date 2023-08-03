import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_SUPPLY_DATA_ENTRY_ACTION, DELETE_A_SUPPLY_DATA_ENTRY_ACTION } from '../actions';
import * as api from '../apis';

export function* doLoadSupplyDataEntryList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_SUPPLY_DATA_ENTRY_ACTION.LOADING });
        const data = yield call(api.apiLoadSupplyDataEntryList, payload);
        yield put({ type: LOAD_LIST_SUPPLY_DATA_ENTRY_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_SUPPLY_DATA_ENTRY_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doDeleteASupplyDataEntr({ payload }) {
    try {
        yield put({ type: DELETE_A_SUPPLY_DATA_ENTRY_ACTION.LOADING });
        let data = yield call(api.apideleteASupplyDataEntry, payload);
        yield put({ type: DELETE_A_SUPPLY_DATA_ENTRY_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_A_SUPPLY_DATA_ENTRY_ACTION.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_SUPPLY_DATA_ENTRY_ACTION.ACTION,   doLoadSupplyDataEntryList),
    takeLatest(DELETE_A_SUPPLY_DATA_ENTRY_ACTION.ACTION,    doDeleteASupplyDataEntr)
];