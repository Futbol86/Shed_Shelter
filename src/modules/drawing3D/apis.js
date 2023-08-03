import {httpClient, httpClient2, utils} from '../../services';
import {
    API_SUB_URL,
    API_SUB_URL_SIMPLIFIED_SHED_URL,
    API_SUB_URL_FURNITURE_COMPONENT_URL,
    API_SUB_URL_FURNITURE_SETTING_URL,
    API_SUB_BOM_URL
} from './constants';

export const apiExportSimplifiedShedPDF = (payload) => {
    if (payload) {
        let data = new FormData();
        data.append("image", payload.pageData);
        return httpClient2.post(`${API_SUB_URL}${API_SUB_URL_SIMPLIFIED_SHED_URL}/pdf`, data, {responseType: 'blob'});
    }
    else
        return null;
};

export const apiLoadAFurnitureComponents = ({quoteId}) => {
    var apiUrl = `${API_SUB_URL}${API_SUB_URL_FURNITURE_COMPONENT_URL}/${quoteId}`;
    return httpClient2.get(apiUrl);
};

export const apiSaveFurnitureComponents = (payload) => {
    return httpClient2.post(`${API_SUB_URL}${API_SUB_URL_FURNITURE_COMPONENT_URL}`, payload);
};

export const apiLoadAFurnitureSettings = ({quoteId}) => {
    var apiUrl = `${API_SUB_URL_FURNITURE_SETTING_URL}/${quoteId}`;
    return httpClient2.get(apiUrl);
};

export const apiSaveFurnitureSettings = (payload) => {
    return httpClient2.post(`${API_SUB_URL_FURNITURE_SETTING_URL}`, payload);
};

export const apiExportBOMPDF = (payload) => {
    if (payload)
        return httpClient2.post(`${API_SUB_URL}${API_SUB_BOM_URL}/pdf`, payload, {responseType: 'blob'});
    else
        return null;
};