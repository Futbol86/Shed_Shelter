import {httpClient, httpClient2, utils} from '../../services';
import {
    API_SUB_URL,
    API_SUB_URL_USERS,
    API_SUB_URL_ORDER_NOTES,
    API_SUB_URL_SUPPLY_DATA_ENTRY,
    ORDER_NOTE_PAGINATION_ITEMS_PER_PAGE
} from './constants';


/**
 * ORDERS
 */
export const apiLoadUserList = (payload) => {
    // let newPayload = {
    //     ...payload,
    //     filter.orderMode: '1'
    // };

    return utils.callAPIListFor2(API_SUB_URL_USERS)(payload);
};

export const apiLoadOrderList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };

    return utils.callAPIListFor(API_SUB_URL)(newPayload);
};

export const apiLoadAnOrder = ({quoteId, isSharedOrder}) => {
    if (isSharedOrder) 
        return httpClient.get(`${API_SUB_URL}?quoteId=${quoteId}&isSharedOrder=1`);

    return httpClient.get(`${API_SUB_URL}?quoteId=${quoteId}`);
};

export const apiUpdateAnOrderStatus = ({id, status}) => {
    return httpClient.patch(`${API_SUB_URL}/${id}`, {status});
};

export const apiUpdateAnOrder = (payload = {}) => {
    delete payload.createdAt;
    delete payload.updatedAt;
    if (payload.id)
        return httpClient.patch(`${API_SUB_URL}/${payload.id}`, payload);
    else 
        return httpClient.post(API_SUB_URL, payload);
};

export const apiDeleteAnOrder = ({id}) => {
    return httpClient.delete(`${API_SUB_URL}/${id}`);
};

/** 
 * ORDER NOTES
 */
export const apiLoadOrderNoteList = (payload = {}) => {
    let newPayload = { 
        ...payload,
        limit: ORDER_NOTE_PAGINATION_ITEMS_PER_PAGE,
        sortBy: 'updatedAt', 
        sortDir: -1 
    };
    return utils.callAPIListFor(API_SUB_URL_ORDER_NOTES)(newPayload);
};

export const apiLoadAnOrderNote = ({id}) => {
    return httpClient.get(`${API_SUB_URL_ORDER_NOTES}/${id}`);
};

export const apiCreateAnOrderNote = (payload = {}) => {
    return httpClient.post(`${API_SUB_URL_ORDER_NOTES}`, payload);
};

export const apiUpdateAnOrderNote = (payload = {}) => {
    delete payload.createdAt;
    delete payload.updatedAt;
    if (payload.id)
        return httpClient.patch(`${API_SUB_URL_ORDER_NOTES}/${payload.id}`, payload);
};

export const apiDeleteAnOrderNote = ({id}) => {
    return httpClient.delete(`${API_SUB_URL_ORDER_NOTES}/${id}`);
};

/**
 * SHARED ORDERS
 */

/**
 * SUPPLY DATA ENTRIES
 */
export const apiLoadSupplyDataEntryList = (payload) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    if (filter) {
        let newFilter = '';
        newPayload = { ...newPayload, filter: newFilter };
    }
    return utils.callAPIListFor2(API_SUB_URL_SUPPLY_DATA_ENTRY)(newPayload);
};

export const apiLoadASupplyDataEntry = ({id}) => {
    return httpClient2.get(`${API_SUB_URL_SUPPLY_DATA_ENTRY}/${id}`);
};

export const apiCreateASupplyDataEntry = (payload = {}) => {
    return httpClient2.post(`${API_SUB_URL_SUPPLY_DATA_ENTRY}`, payload);
};

export const apiUpdateASupplyDataEntry = (payload = {}) => {
    delete payload.createdAt;
    delete payload.updatedAt;
    if (payload.id)
        return httpClient2.patch(`${API_SUB_URL_SUPPLY_DATA_ENTRY}/${payload.id}`, payload);
};

export const apideleteASupplyDataEntry = (id) => {
    return httpClient2.delete(`${API_SUB_URL_SUPPLY_DATA_ENTRY}/${id}`);
};