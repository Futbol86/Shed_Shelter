import { call, put, takeLatest } from 'redux-saga/effects';
import {
    JT_JOB_TRACKING_FORM_NAME_SUBMIT,
    JT_JOB_TRACKING_FORM_NAME_SUCCESS,
    JT_JOB_TRACKING_FORM_NAME_FAILURE
} from "../constants";
import { JT_LOAD_A_CHECK_LIST, JT_UPDATE_A_TRACKING_ITEM, JT_LOAD_A_SHED_INFORMATION, JT_UPDATE_A_SHED_INFORMATION } from '../actions';
import * as api from '../apis';

export function* doLoadACheckList({ payload }) {
    try {
        yield put({ type: JT_LOAD_A_CHECK_LIST.LOADING });
        const data = yield call(api.apiLoadACheckList, payload);      
        yield put({ type: JT_LOAD_A_CHECK_LIST.SUCCESS, payload: data.data.data });
    }
    catch (error) {
        yield put({ type: JT_LOAD_A_CHECK_LIST.FAILURE, payload: {errors: error} });
    }
}

function* doSubmitATrackingList({payload}) {
    try {
        // console.log("doSubmitATrackingList", payload);
        const data = yield call(api.apiUpdateAnTrackingItem, payload);
        yield put({ type:JT_JOB_TRACKING_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: JT_JOB_TRACKING_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export function* doLoadJobTrackingLog({ payload }) {
    try {
        yield put({ type: JT_UPDATE_A_TRACKING_ITEM.LOADING });
        const data = yield call(api.apiUpdateAnTrackingItem, payload);      
        yield put({ type: JT_UPDATE_A_TRACKING_ITEM.SUCCESS, payload: data.data.data });
    }
    catch (error) {
        yield put({ type: JT_UPDATE_A_TRACKING_ITEM.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadAShedInformation({ payload }) {
    try {
        yield put({ type: JT_LOAD_A_SHED_INFORMATION.LOADING });
        const data = yield call(api.apiLoadAShedInformation, payload);      
        yield put({ type: JT_LOAD_A_SHED_INFORMATION.SUCCESS, payload: data.data.data });
    }
    catch (error) {
        yield put({ type: JT_LOAD_A_SHED_INFORMATION.FAILURE, payload: {errors: error} });
    }
}

function* doUpdateAShedInformation({payload}) {
    try {;
        yield put({ type: JT_UPDATE_A_SHED_INFORMATION.LOADING });
        const data = yield call(api.apiUpdateAShedInformation, payload);
        yield put({ type: JT_UPDATE_A_SHED_INFORMATION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: JT_UPDATE_A_SHED_INFORMATION.FAILURE, payload: {errors: error} });
    }
}


export default [
    takeLatest(JT_LOAD_A_CHECK_LIST.ACTION,         doLoadACheckList),
    takeLatest(JT_UPDATE_A_TRACKING_ITEM.ACTION,    doLoadJobTrackingLog),
    takeLatest(JT_JOB_TRACKING_FORM_NAME_SUBMIT,    doSubmitATrackingList),
    takeLatest(JT_LOAD_A_SHED_INFORMATION.ACTION,   doLoadAShedInformation),
    takeLatest(JT_UPDATE_A_SHED_INFORMATION.ACTION, doUpdateAShedInformation),
];