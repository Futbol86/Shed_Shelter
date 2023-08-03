import { call, put, takeLatest } from 'redux-saga/effects';
import {LOAD_LIST_USERS_ACTION} from '../actions';
import * as api from '../apis';

export function* doLoadUserList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_USERS_ACTION.LOADING });
        const data = yield call(api.apiLoadUserList, payload);
        yield put({ type: LOAD_LIST_USERS_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_USERS_ACTION.FAILURE, payload: {errors: error} });
    }
}


export default
[
    takeLatest(LOAD_LIST_USERS_ACTION.ACTION,       doLoadUserList),
];