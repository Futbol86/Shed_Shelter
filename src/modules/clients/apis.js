import {httpClient, utils} from '../../services';
import {API_SUB_URL} from './constants';

export const apiLoadClientList = (payload = {}) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    if (filter) {
        let newFilter = '';
        if (filter.search)
            newFilter += `&$or[0][agentName][$like]=%${filter.search}%&$or[1][businessNumber][$like]=%${filter.search}%`;
        if (filter.state)
            newFilter += `&addressState=${filter.state}`;
        newPayload = { ...newPayload, filter: newFilter };
    }
    return utils.callAPIListFor(API_SUB_URL)(newPayload);
};

export const apiLoadAClient = ({id}) => {
    return httpClient.get(`${API_SUB_URL}/${id}`);
};

export const apiCreateAClient = (payload = {}) => {
    return httpClient.post(`${API_SUB_URL}`, payload);
};

export const apiUpdateAClient = (payload = {}) => {
    delete payload.createdAt;
    delete payload.updatedAt;
    return httpClient.patch(`${API_SUB_URL}/${payload.id}`, payload);
};
