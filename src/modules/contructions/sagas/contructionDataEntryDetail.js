import { call, put, takeLatest } from 'redux-saga/effects';
import utils from '../../../services/utils';
import {
    LOAD_A_CONTRUCTION_DATA_ENTRY_INFO_ACTION,
    OR_SDE_LOAD_USER_LIST_ACTION,
    CONTRUCTION_DATA_ENTRY_DETAIL_ACTION,
    UPLOAD_INSURANCE_POLICY_FILE_ACTION,
    DELETE_AN_INSURANCE_POLICY_FILE_ACTION,
    CLEAR_INSURANCE_POLICY_FILE_ACTION
} from '../actions';
import {
    CONTRUCTION_DATA_ENTRY_DETAIL_FORM_NAME_SUBMIT,
    CONTRUCTION_DATA_ENTRY_DETAIL_FORM_NAME_SUCCESS,
    CONTRUCTION_DATA_ENTRY_DETAIL_FORM_NAME_FAILURE
} from '../constants'
import * as api from '../apis';

export function* doLoadAContructionDataEntry ({ payload }) {
    try {
        yield put({ type: LOAD_A_CONTRUCTION_DATA_ENTRY_INFO_ACTION.LOADING });
        const data = yield call(api.apiLoadAContructionDataEntry, payload);
        yield put({ type: LOAD_A_CONTRUCTION_DATA_ENTRY_INFO_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_CONTRUCTION_DATA_ENTRY_INFO_ACTION.FAILURE, payload: {errors: error} });
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

export function* doSubmitContructionDataEntryDetail({ payload }) {
    try {
        yield put({ type: CONTRUCTION_DATA_ENTRY_DETAIL_ACTION.LOADING });
        let data = payload.id ?
            yield call(api.apiUpdateAContructionDataEntry, payload) :
            yield call(api.apiCreateAContructionDataEntry, payload);
        if(data.data.status === 1)
            yield put({ type: CONTRUCTION_DATA_ENTRY_DETAIL_FORM_NAME_SUCCESS, payload: data });
        else
            yield put({ type: CONTRUCTION_DATA_ENTRY_DETAIL_FORM_NAME_FAILURE, payload: { _error: data.data.msg } });
    }
    catch (error) {
        yield put({ type: CONTRUCTION_DATA_ENTRY_DETAIL_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* douploadInsurancePolicyFile({ payload }) {
    try {
        yield put({ type: UPLOAD_INSURANCE_POLICY_FILE_ACTION.LOADING });
        const data = yield call(utils.uploadFile, payload, 'contructions');
        yield put({ type: UPLOAD_INSURANCE_POLICY_FILE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: UPLOAD_INSURANCE_POLICY_FILE_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAnInsurancePolicyFile({ payload }) {
    try {
        yield put({ type: DELETE_AN_INSURANCE_POLICY_FILE_ACTION.LOADING });
        const data = yield call(utils.deleteFile, {...payload, subPath: 'contructions'});
        yield put({ type: DELETE_AN_INSURANCE_POLICY_FILE_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_AN_INSURANCE_POLICY_FILE_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doClearInsurancePolicyFile() {
    try {
        yield put({ type: CLEAR_INSURANCE_POLICY_FILE_ACTION.SUCCESS, payload: null});
    }
    catch (error) {
        yield put({ type: CLEAR_INSURANCE_POLICY_FILE_ACTION.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_A_CONTRUCTION_DATA_ENTRY_INFO_ACTION.ACTION, doLoadAContructionDataEntry),
    takeLatest(OR_SDE_LOAD_USER_LIST_ACTION.ACTION,              doOrSedLoadUserList),
    takeLatest(CONTRUCTION_DATA_ENTRY_DETAIL_FORM_NAME_SUBMIT,   doSubmitContructionDataEntryDetail),
    takeLatest(UPLOAD_INSURANCE_POLICY_FILE_ACTION.ACTION,       douploadInsurancePolicyFile),
    takeLatest(DELETE_AN_INSURANCE_POLICY_FILE_ACTION.ACTION,    doDeleteAnInsurancePolicyFile),
    takeLatest(CLEAR_INSURANCE_POLICY_FILE_ACTION.ACTION,        doClearInsurancePolicyFile)
];