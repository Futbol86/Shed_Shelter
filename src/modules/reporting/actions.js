import { defineAction } from 'redux-define';
import {createAction} from 'redux-actions';
import {LOADING, FAILURE, SUCCESS} from '../../constants';

export const RP_LOAD_REPORT             = defineAction('RP_LOAD_REPORT',  [LOADING, FAILURE, SUCCESS], 'reporting');
export const RP_CLEAR_REPORT_DETAIL     = 'RP_CLEAR_REPORT_DETAIL';

export const RP_EXPORT_METRIX_REPORT_EXCEL       = defineAction('RP_EXPORT_METRIX_REPORT_EXCEL',  [LOADING, FAILURE, SUCCESS], 'reporting');
export const RP_CLEAR_REMOTE_METRIX_REPORT_EXCEL = 'RP_CLEAR_REMOTE_METRIX_REPORT_EXCEL';

export const RP_CHANGE_REPORT_TAB_ACTION         = 'RP_CHANGE_REPORT_TAB_ACTION';

export const RP_loadReport	                 = createAction(RP_LOAD_REPORT.ACTION);
export const RP_clearReportDetail	         = createAction(RP_CLEAR_REPORT_DETAIL);

export const RP_exportMetrixReportEXCEL      = createAction(RP_EXPORT_METRIX_REPORT_EXCEL.ACTION);
export const RP_clearRemoteMetrixReportEXCEL = createAction(RP_CLEAR_REMOTE_METRIX_REPORT_EXCEL);

export const RP_changeReportTab              = createAction(RP_CHANGE_REPORT_TAB_ACTION);