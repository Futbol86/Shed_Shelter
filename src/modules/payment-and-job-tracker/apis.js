import { httpClient, httpClient2 } from '../../services';
import { API_SUB_URL, API_SUB_URL_SHED_INFORMATION } from './constants';

export const apiLoadACheckList = ({quoteId, communicationKey}) => {
    if (communicationKey) {
        return httpClient2.get(`${API_SUB_URL}?quoteId=${quoteId}&communicationKey=${communicationKey}`);
    } else {
        return httpClient2.get(`${API_SUB_URL}?quoteId=${quoteId}`);
    }
};

export const apiUpdateAnTrackingItem = (payload = {}) => {
    const {id} = payload;
    if (id) {
        return httpClient2.patch(`${API_SUB_URL}/${id}`, payload);
    } else {
        return httpClient2.post(`${API_SUB_URL}`, payload);
    }
};

export const apiLoadAShedInformation = ({quoteId}) => {
    var apiUrl = `${API_SUB_URL_SHED_INFORMATION}/${quoteId}`;
    return httpClient2.get(apiUrl);
};

export const apiUpdateAShedInformation = (payload = {}) => {
    const {quoteId} = payload;
    if (quoteId) {
        return httpClient2.patch(`${API_SUB_URL_SHED_INFORMATION}/${quoteId}`, payload);
    }
};