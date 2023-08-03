import {httpClient, httpClient2, utils} from '../../services';
import Geocode from "react-geocode";
import {
    API_SUB_URL,
    API_SUB_PRODUCTS_URL,
    API_SUB_CATEGORIES_URL,
    API_SUB_BUILDING_DETAIL_URL,
    API_SUB_QUOTE_COPY_URL,
    API_SUB_SEND_TEXT_MESSAGE_URL,
    API_SUB_SEND_TEXT_MESSAGE_CLIENTS_URL,
    API_SUB_NOTES_URL,
    API_SUB_TEXT_MESSAGE_URL,
    API_SUB_URL_ATTACHED_NOTE_AND_TEXT,
    API_SUB_URL_QUOTES_PDF,
    QD_AD_PAGINATION_ITEMS_PER_PAGE
} from './constants';

export const apiLoadQuoteList = (payload = {}) => {
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedDate';
    let newPayload = { ...payload, sortBy };
    if (filter) {
        let newFilter;
        if (filter.search && filter.searchBy){
            const searchOp = (filter.searchOp) ? filter.searchOp : '=';
            newFilter += `&${filter.searchBy}${searchOp}${filter.search}`;
        }
        else
            newFilter = filter;
        newPayload = { ...newPayload, filter: newFilter };
    }
    return utils.callAPIListFor2(API_SUB_URL)(newPayload);
};

export const apiLoadQuoteAttachedNoteAndTextList = (payload = {}) => {
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedDate';
    let newPayload = { ...payload, sortBy };
    if (filter) {
        let newFilter;
        if (filter.search && filter.searchBy){
            const searchOp = (filter.searchOp) ? filter.searchOp : '=';
            newFilter += `&${filter.searchBy}${searchOp}${filter.search}`;
        }
        else
            newFilter = filter;
        newPayload = { ...newPayload, filter: newFilter };
    }
    return utils.callAPIListFor2(API_SUB_URL_ATTACHED_NOTE_AND_TEXT)(newPayload);
};

export const apiLoadAQuote = ({id}) => {
    return httpClient.get(`${API_SUB_URL}/${id}`);
};

export const apiDeleteAQuote = ({id}) => {
    return httpClient.delete(`${API_SUB_URL}/${id}`);
};

export const apiUpdateQuoteStatus = ({id, status}) => {
    return httpClient.patch(`${API_SUB_URL}/${id}`, {status});
};

export const apiLoadProducts = ({category}) => {
    const linkToProducts = category ? `${API_SUB_PRODUCTS_URL}?category=${category}` : API_SUB_PRODUCTS_URL;
    return httpClient.get(linkToProducts);
};

export const apiLoadCategories = () => {
    return httpClient.get(API_SUB_CATEGORIES_URL);
};

export const apiSelectBuildingProduct = (payload) => {
    const {quoteId} = payload;
    if (!quoteId)
        return httpClient.post(`${API_SUB_URL}`, payload);
    else
        return httpClient.patch(`${API_SUB_URL}/${quoteId}`, payload);
};

export const apiLoadQuoteInfo = ({id, adminMode, communicationKey}) => {
    const url = communicationKey ? 
        `${API_SUB_URL}/${id}?adminMode=${adminMode}&communicationKey=${communicationKey}` :
        `${API_SUB_URL}/${id}?adminMode=${adminMode}`;
    //return httpClient.get(url);
    return httpClient2.get(url);
};

export const apiSubmitBuildingDetail = (payload) => {
    const {id} = payload;
    if (id)
        return httpClient.patch(`${API_SUB_BUILDING_DETAIL_URL}/${id}`, payload);
};

export const apiChangeBuildingDetail = (payload) => {
    const {id} = payload;
    if (id)
        return httpClient.patch(`${API_SUB_BUILDING_DETAIL_URL}/${id}`, payload);
};

export const apiLoadGeoCodeFromAddress = ({addressNumber, addressStreet, addressCity, addressState, addressPostcode}) => {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API);
    return Geocode.fromAddress(`${addressNumber} ${addressStreet} ${addressCity} ${addressState} ${addressPostcode}`);
};

export const apiSendTextMessage = (payload = {}) => {
    return httpClient.post(API_SUB_SEND_TEXT_MESSAGE_URL, payload);
};

export const apiSendTextMessageClients = (payload = {}) => {
    return httpClient2.post(API_SUB_SEND_TEXT_MESSAGE_CLIENTS_URL, payload);
};

export const apiAddANote = (payload = {}) => {
    return httpClient.post(API_SUB_NOTES_URL, payload);
};

export const apiUpdateANote = (payload = {}) => {
    const {id} = payload;
    if (id)
        //return httpClient.patch(`${API_SUB_NOTES_URL}/${id}`, payload);
        return httpClient2.patch(`${API_SUB_NOTES_URL}/${id}`, payload);
};

export const apiDeleteANote = ({id}) => {
    //return httpClient.delete(`${API_SUB_NOTES_URL}/${id}`);
    return httpClient2.delete(`${API_SUB_NOTES_URL}/${id}`);
};

/**
 * Request zip content, but in blob format. The content should not exceed 500Mb in most browsers.
 *
 * @param payload
 * @returns {*}
 */
export const apiDoSendingOrder = (payload) => {
    if (payload)
        return httpClient.post(`/quote-process`, payload);
    else
        return null;
};

/**
 * Copy a quote
 * 
 * @param {*} param0 
 */
export const apiCopyAQuote = (payload) => {
    return httpClient.post(`${API_SUB_QUOTE_COPY_URL}`, payload);
};

export const apiLoadTextMessagesList = (payload = {}) => {
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'createdAt';
    let newPayload = { ...payload, sortBy };
    if (filter) {
        let newFilter;
        if (filter.search && filter.searchBy){
            const searchOp = (filter.searchOp) ? filter.searchOp : '=';
            newFilter += `&${filter.searchBy}${searchOp}${filter.search}`;
        }
        else
            newFilter = filter;
        newPayload = { ...newPayload, filter: newFilter };
    }

    newPayload = { ...newPayload, limit: QD_AD_PAGINATION_ITEMS_PER_PAGE };
    //return utils.callAPIListFor(API_SUB_TEXT_MESSAGE_URL)(newPayload);
    return utils.callAPIListFor2(API_SUB_TEXT_MESSAGE_URL)(newPayload);
};

export const apiLoadNotesList = (payload = {}) => {
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    let newPayload = { ...payload, sortBy };
    if (filter) {
        let newFilter;
        if (filter.search && filter.searchBy){
            const searchOp = (filter.searchOp) ? filter.searchOp : '=';
            newFilter += `&${filter.searchBy}${searchOp}${filter.search}`;
        }
        else
            newFilter = filter;
        newPayload = { ...newPayload, filter: newFilter };
    }

    newPayload = { ...newPayload, limit: QD_AD_PAGINATION_ITEMS_PER_PAGE };
    //return utils.callAPIListFor(API_SUB_NOTES_URL)(newPayload);
    return utils.callAPIListFor2(API_SUB_NOTES_URL)(newPayload);
};

// PDF
export const apiExportQuotesPDF = (payload) => {
    if (payload)
        return httpClient2.post(`${API_SUB_URL}${API_SUB_URL_QUOTES_PDF}`, payload, {responseType: 'blob'});
    else
        return null;
};