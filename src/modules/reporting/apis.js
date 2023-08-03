import {httpClient, httpClient2, utils} from '../../services';
import { API_SUB_URL, API_SUB_URL_EXPORT_METRIX_RP_EXCEL } from './constants';

export const apiLoadReport = (payload = {}) => {
    //return httpClient.post(`${API_SUB_URL}`, payload);
    return httpClient2.post(`${API_SUB_URL}`, payload);
};

export const apiExportMetrixReportEXCEL = (payload) => {
    if (payload)
        return httpClient2.post(`${API_SUB_URL_EXPORT_METRIX_RP_EXCEL}`, payload, {responseType: 'blob'});
    else
        return null;
};
