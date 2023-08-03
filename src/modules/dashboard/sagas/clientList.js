import { call, put, takeLatest } from 'redux-saga/effects';
import { LIST_CLIENTS_ACTION } from '../actions';
import * as api from '../apis';

export function* doLoadClientList({ payload }) {
    try {
        yield put({ type: LIST_CLIENTS_ACTION.LOADING });
        const data = yield call(api.apiDashboardClients, payload);
        yield put({ type: LIST_CLIENTS_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LIST_CLIENTS_ACTION.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LIST_CLIENTS_ACTION.ACTION,         doLoadClientList),
];