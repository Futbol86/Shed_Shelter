import { call, put, takeLatest } from 'redux-saga/effects';
import { RP_EXPORT_METRIX_REPORT_EXCEL, } from '../actions';
import * as api from '../apis';

export function* doExportMetrixReportEXCEL({ payload }) {
    try {
        yield put({ type: RP_EXPORT_METRIX_REPORT_EXCEL.LOADING });
        const data = yield call(api.apiExportMetrixReportEXCEL, payload);
        yield put({ type: RP_EXPORT_METRIX_REPORT_EXCEL.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: RP_EXPORT_METRIX_REPORT_EXCEL.FAILURE, payload: {errors: error} });
    }
}

export default
[
    takeLatest(RP_EXPORT_METRIX_REPORT_EXCEL.ACTION, doExportMetrixReportEXCEL),
];