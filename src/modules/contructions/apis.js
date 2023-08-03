import {httpClient, httpClient2, utils} from '../../services';
import {
    API_SUB_URL,
    API_SUB_URL_USERS,
    API_SUB_URL_CONTRUCTION_NOTES,
    API_SUB_URL_CONTRUCTION_DATA_ENTRY,
    API_SUB_URL_CONTRUCTION_PLANNER,
    PAGINATION_ITEMS_PER_PAGE
} from './constants';
import {isString} from 'lodash';

/**
 * CONTRUCTIONS
 */
export const apiLoadUserList = (payload) => {
    // let newPayload = {
    //     ...payload,
    //     filter: `&orderMode=1`
    // };

    return utils.callAPIListFor2(API_SUB_URL_USERS)(payload);
};

export const apiLoadContructionList = (payload) => {
    let newPayload, newFilter = "";
    let {sortBy, filter} = payload;

    if(isString(filter)) {
        newFilter = filter;
    } else {
        if(filter.isSharedContruction){
            newFilter += "&isSharedContruction=" + filter.isSharedContruction;
        }
        if(filter.status){
            newFilter += "&status=" + filter.status;
        }
        if(filter.userId) {
            newFilter += "&userId=" + filter.userId;
        }
        if(filter.search) {
            newFilter += "&search=" + filter.search;
        }
    }
    payload.filter = newFilter;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = {...payload, sortBy};
    return utils.callAPIListFor2(API_SUB_URL)(newPayload);
};

export const apiLoadAnContruction = ({quoteId, isSharedContruction}) => {
    if (isSharedContruction) 
        return httpClient2.get(`${API_SUB_URL}?quoteId=${quoteId}&isSharedContruction=1`);
    return httpClient2.get(`${API_SUB_URL}?quoteId=${quoteId}`);
};

export const apiUpdateAnContructionStatus = ({id, status}) => {
    return httpClient2.patch(`${API_SUB_URL}/${id}`, {status});
};

export const apiUpdateAnContruction = (payload = {}) => {
    delete payload.createdAt;
    delete payload.updatedAt;
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL}/${payload.id}`, payload);
    else 
        return httpClient2.post(API_SUB_URL, payload);
};

export const apiDeleteAnContruction = ({id}) => {
    return httpClient2.delete(`${API_SUB_URL}/${id}`);
};

/** 
 * CONTRUCTION NOTES
 */
export const apiLoadContructionNoteList = (payload = {}) => {
    let newPayload = { 
        ...payload,
        limit: PAGINATION_ITEMS_PER_PAGE,
        sortBy: 'updatedAt', 
        sortDir: -1 
    };
    return utils.callAPIListFor2(API_SUB_URL_CONTRUCTION_NOTES)(newPayload);
};

export const apiLoadAnContructionNote = ({id}) => {
    return httpClient.get(`${API_SUB_URL_CONTRUCTION_NOTES}/${id}`);
};

export const apiCreateAnContructionNote = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_CONTRUCTION_NOTES}`, payload);
};

export const apiUpdateAnContructionNote = (payload = {}) => {
    delete payload.createdAt;
    delete payload.updatedAt;
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_CONTRUCTION_NOTES}/${payload.id}`, payload);
};

export const apiDeleteAnContructionNote = ({id}) => {
    return httpClient2.delete(`${API_SUB_URL_CONTRUCTION_NOTES}/${id}`);
};

/**
 * CONTRUCTIOM DATA ENTRIES
 */
export const apiLoadContructionDataEntryList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    if (filter) {
        let newFilter = '';
        newPayload = { ...newPayload, filter: newFilter };
    }
    return utils.callAPIListFor2(API_SUB_URL_CONTRUCTION_DATA_ENTRY)(newPayload);
};

export const apiLoadAContructionDataEntry = ({id}) => {
    var apiUrl = `${API_SUB_URL_CONTRUCTION_DATA_ENTRY}/${id}`
    return httpClient2.get(apiUrl);
};

export const apiCreateAContructionDataEntry = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_CONTRUCTION_DATA_ENTRY}`, payload);
};

export const apiUpdateAContructionDataEntry = (payload = {}) => {
    delete payload.createdAt;
    delete payload.updatedAt;
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_CONTRUCTION_DATA_ENTRY}/${payload.id}`, payload);
};

export const apideleteAContructionDataEntry = (id) => {
    return httpClient2.delete(`${API_SUB_URL_CONTRUCTION_DATA_ENTRY}/${id}`);
};

/**
 * CONTRUCTION PLANNER
 */

export const apiLoadContructionPlannerList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    return utils.callAPIListFor2(API_SUB_URL_CONTRUCTION_PLANNER)(newPayload);
};

export const apiCreateAnContructionPlanner = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_CONTRUCTION_PLANNER}`, payload);
};

export const apiUpdateAnContructionPlanner = (payload = {}) => {
    delete payload.createdAt;
    delete payload.updatedAt;
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_CONTRUCTION_PLANNER}/${payload.id}`, payload);
};

export const apiDeleteAnContructionPlanner = (id) => {
    return httpClient2.delete(`${API_SUB_URL_CONTRUCTION_PLANNER}/${id}`);
};

export const apiExportContructioNotesToPDF = (payload) => {
    if (payload)
        return httpClient2.post(`${API_SUB_URL_CONTRUCTION_NOTES}/pdf`, payload, {responseType: 'blob'});
    else
        return null;
};