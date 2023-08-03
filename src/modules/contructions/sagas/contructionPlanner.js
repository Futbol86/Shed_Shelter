import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LIST_CONTRUCTION_PLANNER,
         UPDATE_AN_CONTRUCTION_PLANNER_ACTION,
         DELETE_AN_CONTRUCTION_PLANNER_ACTION,
         ESTIMATED_CONTRUCTION_DATE_ACTION
         } from '../actions';
import { 
    SHARED_CONTRUCTION_ESTIMATED_CONTRUCTION_DATE_FORM_NAME_SUBMIT,
    SHARED_CONTRUCTION_ESTIMATED_CONTRUCTION_DATE_FORM_NAME_SUCCESS,
    SHARED_CONTRUCTION_ESTIMATED_CONTRUCTION_DATE_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';

export function* doLoadContructionPlannerList({ payload }) {
    try {
        yield put({ type: LOAD_LIST_CONTRUCTION_PLANNER.LOADING });
        const data = yield call(api.apiLoadContructionPlannerList, payload);
        yield put({ type: LOAD_LIST_CONTRUCTION_PLANNER.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_LIST_CONTRUCTION_PLANNER.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitContructionPlanner({ payload }) {
    try {
        yield put({ type: ESTIMATED_CONTRUCTION_DATE_ACTION.LOADING });
        let data = payload.id ?
                   yield call(api.apiUpdateAnContructionPlanner, payload) :
                   yield call(api.apiCreateAnContructionPlanner, payload);
        yield put({ type: SHARED_CONTRUCTION_ESTIMATED_CONTRUCTION_DATE_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: SHARED_CONTRUCTION_ESTIMATED_CONTRUCTION_DATE_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doDeleteAnContructionPlanner({ payload }) {
    try {
        yield put({ type: DELETE_AN_CONTRUCTION_PLANNER_ACTION.LOADING });
        let data = yield call(api.apiDeleteAnContructionPlanner, payload);
        yield put({ type: DELETE_AN_CONTRUCTION_PLANNER_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DELETE_AN_CONTRUCTION_PLANNER_ACTION.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(LOAD_LIST_CONTRUCTION_PLANNER.ACTION,            doLoadContructionPlannerList),
    takeLatest(SHARED_CONTRUCTION_ESTIMATED_CONTRUCTION_DATE_FORM_NAME_SUBMIT,  doSubmitContructionPlanner),
    takeLatest(DELETE_AN_CONTRUCTION_PLANNER_ACTION.ACTION,     doDeleteAnContructionPlanner),
];