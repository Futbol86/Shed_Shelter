import { call, put, takeLatest } from 'redux-saga/effects';
import { RP_LOAD_REPORT } from '../actions';
import * as api from '../apis';

export function* doLoadReport({ payload }) {
    try {
        yield put({ type: RP_LOAD_REPORT.LOADING });
        const data = yield call(api.apiLoadReport, payload);
        yield put({ type: RP_LOAD_REPORT.SUCCESS, payload: data.data.data });
    }
    catch (error) {
        yield put({ type: RP_LOAD_REPORT.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(RP_LOAD_REPORT.ACTION,   doLoadReport),
];