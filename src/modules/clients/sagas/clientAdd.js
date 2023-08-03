import { call, put, takeLatest } from 'redux-saga/effects';
import { ADD_NEW_CLIENT_ACTION } from '../actions';
import * as api from '../apis';
import {
    CLIENTS_ADD_FORM_NAME_SUBMIT, CLIENTS_ADD_FORM_NAME_FAILURE, CLIENTS_ADD_FORM_NAME_SUCCESS,
    CLIENTS_EDIT_FORM_NAME_SUBMIT, CLIENTS_EDIT_FORM_NAME_SUCCESS, CLIENTS_EDIT_FORM_NAME_FAILURE
} from "../constants";

export function* doClientAddSubmit({ payload }) {
    try {
        yield put({ type: ADD_NEW_CLIENT_ACTION.LOADING });
        // console.log("Payload: ", payload);
        let data = yield call(api.apiCreateAClient, payload);
        yield put({ type: CLIENTS_ADD_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: CLIENTS_ADD_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doClientEditSubmit({ payload }) {
    try {
        yield put({ type: ADD_NEW_CLIENT_ACTION.LOADING });
        // console.log("Payload: ", payload);
        let data = yield call(api.apiUpdateAClient, payload);
        yield put({ type: CLIENTS_EDIT_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: CLIENTS_EDIT_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}


export default
[
    takeLatest(CLIENTS_ADD_FORM_NAME_SUBMIT,    doClientAddSubmit),
    takeLatest(CLIENTS_EDIT_FORM_NAME_SUBMIT,   doClientEditSubmit)
];