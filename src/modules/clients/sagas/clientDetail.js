import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_A_CLIENTS_INFO } from '../actions';
import * as api from '../apis';
import * as quotesApi from '../../quotes/apis';

export function* doGetClientDetail({ payload }) {
    try {
        yield put({ type: GET_A_CLIENTS_INFO.LOADING });
        const clientData = yield call(api.apiLoadAClient, payload);
        const clientId = parseInt(clientData && clientData.data && clientData.data.id, 10);
        if (clientId) {
            const quotesData = yield call(quotesApi.apiLoadQuoteList, {filter: `&clientId=${clientId}`});
            if (quotesData && quotesData.data && quotesData.data.total) {
                clientData.data.latestQuotes = quotesData.data.data;
            }
        }
        yield put({ type: GET_A_CLIENTS_INFO.SUCCESS, payload: clientData });
    }
    catch (error) {
        yield put({ type: GET_A_CLIENTS_INFO.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(GET_A_CLIENTS_INFO.ACTION,    doGetClientDetail)
];