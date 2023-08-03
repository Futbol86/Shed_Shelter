import {MODULE_ID} from "./constants";

export const getRPReportingDetail       = (state) => state[MODULE_ID].reportingDetail.reportingDetail;
export const getRPCurrentModalId        = (state) => state[MODULE_ID].reportingDetail.modalId;

export const getRemoteMetrixReportEXCEL = (state) => state[MODULE_ID].metrixReporting.remoteExcel;
export const getReportTabIndex          = (state) => state[MODULE_ID].metrixReporting.tabIndex;