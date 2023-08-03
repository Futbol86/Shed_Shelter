import {httpClient, httpClient2, utils} from '../../services';
import {
    API_SUB_URL, API_SUB_URL_ACCOUNTING, API_SUB_URL_ACCOUNTING_LOG, 
    API_SUB_URL_QUOTE, API_SUB_URL_OFFICE_FORM, API_SUB_URL_SAFETY_FORM, API_SUB_URL_SWMS_GENERIC_FORM
} from "./constants";

export const apiFindADocument = ({type, subKey}) => {
    if (type && subKey)
        return httpClient.get(`${API_SUB_URL}?type=${type}&subKey=${subKey}`);
    else
        return null;
};

export const apiUpdateADocument = (payload) => {
    if (payload){
        if (payload.id)
            return httpClient.patch(`${API_SUB_URL}/${payload.id}`, payload);
        else
            return httpClient.post(`${API_SUB_URL}`, payload);
    }
    else
        return null;
};

export const apiConvertHTMLToPDF = (payload) => {
    if (payload)
        return httpClient.post(`/pdf`, payload, {responseType: 'blob'});
    else
        return null;
};

/**
 * Request zip content, but in blob format. The content should not exceed 500Mb in most browsers.
 *
 * @param payload
 * @returns {*}
 */
export const apiRequestZipContent = (payload) => {
    if (payload)
        return httpClient.post(`/zip`, payload, {responseType: 'blob'});
    else
        return null;
};

/** Accounting */
export const apiLoadAnAccounting = ({quoteId}) => {
    var apiUrl = `${API_SUB_URL_ACCOUNTING}/${quoteId}`;
    return httpClient2.get(apiUrl);
};

export const apiCreateAnAccounting = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_ACCOUNTING}`, payload);
};

export const apiUpdateAnAccounting = (payload = {}) => {
    delete payload.createdAt;
    delete payload.updatedAt;
    if (payload.id)
       return httpClient2.patch(`${API_SUB_URL_ACCOUNTING}/${payload.id}`, payload);
};

export const apiDeleteAnAccounting = (id) => {
    return httpClient2.delete(`${API_SUB_URL_ACCOUNTING}/${id}`);
};

//*** Accounting Logs
export const apiCreateAnAccountingLog = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_ACCOUNTING_LOG}`, payload);
};

export const apiLoadAccountingLogList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_ACCOUNTING_LOG)(newPayload);
};

export const apiExportAccountingLogToPDF = (payload) => {
    if (payload)
        return httpClient2.post(`${API_SUB_URL_ACCOUNTING_LOG}/pdf`, payload, {responseType: 'blob'});
    else
        return null;
};

// *** Quote
export const apiLoadAQuoteInfo = ({id}) => {
    var apiUrl = `${API_SUB_URL_QUOTE}/${id}`;
    return httpClient2.get(apiUrl);
};

// *** Office Form
export const apiLoadAnOfficeForm = ({quoteId}) => {
    var apiUrl = `${API_SUB_URL_OFFICE_FORM}/${quoteId}`;
    return httpClient2.get(apiUrl);
};

export const apiCreateAnOfficeForm = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_OFFICE_FORM}`, payload);
};

export const apiUpdateAnOfficeForm = (payload = {}) => {
    delete payload.createdAt;
    delete payload.updatedAt;
    if (payload.id)
       return httpClient2.patch(`${API_SUB_URL_OFFICE_FORM}/${payload.id}`, payload);
};


//*** Safety Form
export const apiLoadASafetyForm = ({quoteId}) => {
    var apiUrl = `${API_SUB_URL_SAFETY_FORM}/${quoteId}`;
    return httpClient2.get(apiUrl);
};

export const apiCreateASafetyForm = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_SAFETY_FORM}`, payload);
};

export const apiUpdateASafetyForm = (payload = {}) => {
    delete payload.createdAt;
    delete payload.updatedAt;
    if (payload.id)
       return httpClient2.patch(`${API_SUB_URL_SAFETY_FORM}/${payload.id}`, payload);
};

export const apiExportOfficeFormPDF = (payload) => {
    if (payload)
        return httpClient2.post(`${API_SUB_URL_OFFICE_FORM}/pdf`, payload, {responseType: 'blob'});
    else
        return null;
};

export const apiExportSafetyFormPDF = (payload) => {
    if (payload)
        return httpClient2.post(`${API_SUB_URL_SAFETY_FORM}/pdf`, payload, {responseType: 'blob'});
    else
        return null;
};

//*** SWMS Generic Form
export const apiLoadASWMSGenericForm = ({quoteId}) => {
    var apiUrl = `${API_SUB_URL_SWMS_GENERIC_FORM}/${quoteId}`;
    return httpClient2.get(apiUrl);
};

export const apiCreateASWMSGenericForm = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_SWMS_GENERIC_FORM}`, payload);
};

export const apiUpdateASWMSGenericForm = (payload = {}) => {
    delete payload.createdAt;
    delete payload.updatedAt;
    if (payload.id)
       return httpClient2.patch(`${API_SUB_URL_SWMS_GENERIC_FORM}/${payload.id}`, payload);
};

export const apiExportSWMSGenericFormPDF = (payload) => {
    if (payload)
        return httpClient2.post(`${API_SUB_URL_SWMS_GENERIC_FORM}/pdf`, payload, {responseType: 'blob'});
    else
        return null;
};