import { call, put, takeLatest } from 'redux-saga/effects';
import {
    LOAD_A_SUPPLY_DATA_ENTRY_INFO_ACTION,
    OR_SDE_LOAD_USER_LIST_ACTION,
    SUPPLY_DATA_ENTRY_DETAIL_ACTION
} from '../actions';
import {
    SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME_SUBMIT,
    SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME_SUCCESS,
    SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME_FAILURE
} from '../constants'
import * as api from '../apis';

export function* doLoadASupplyDataEntry ({ payload }) {
    try {
        yield put({ type: LOAD_A_SUPPLY_DATA_ENTRY_INFO_ACTION.LOADING });
        const data = yield call(api.apiLoadASupplyDataEntry, payload);
        yield put({ type: LOAD_A_SUPPLY_DATA_ENTRY_INFO_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_SUPPLY_DATA_ENTRY_INFO_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doOrSedLoadUserList ({ payload }) {
    try {
        yield put({ type: OR_SDE_LOAD_USER_LIST_ACTION.LOADING });
        const data = yield call(api.apiLoadUserList, payload);
        yield put({ type: OR_SDE_LOAD_USER_LIST_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: OR_SDE_LOAD_USER_LIST_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitSupplyDataEntryDetail({ payload }) {
    try {
        yield put({ type: SUPPLY_DATA_ENTRY_DETAIL_ACTION.LOADING });
        let data = payload.id ?
            yield call(api.apiUpdateASupplyDataEntry, payload) :
            yield call(api.apiCreateASupplyDataEntry, payload);
        yield put({ type: SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_A_SUPPLY_DATA_ENTRY_INFO_ACTION.ACTION, doLoadASupplyDataEntry),
    takeLatest(OR_SDE_LOAD_USER_LIST_ACTION.ACTION,         doOrSedLoadUserList),
    takeLatest(SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME_SUBMIT,   doSubmitSupplyDataEntryDetail),
];