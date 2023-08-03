import isEmpty from "lodash/isEmpty";

import {httpClient, utils, auth} from '../../../services';
import {API_SUB_URL_USERS} from '../constants';

export const apiLoadUserList = (payload = {}) => {
    let newPayload;
    let {sortBy, filter} = payload;
    if (!sortBy)
        sortBy = 'updatedAt';
    newPayload = { ...payload, sortBy };
    if (isEmpty(filter)) {
        const userData = auth.getUserFromStorage();
        if (userData && userData.id)
        newPayload = {
            ...newPayload,
            filter: `&dealerId=${userData.id}`
        };
    }
    //console.log("newPayload: ", newPayload);
    return utils.callAPIListFor(API_SUB_URL_USERS)(newPayload);
};

export const apiLoadAUser = ({id}) => {
    return httpClient.get(`${API_SUB_URL_USERS}/${id}`);
};

export const apiDeleteAUser = ({id}) => {
    return httpClient.delete(`${API_SUB_URL_USERS}/${id}`);
};

export const apiCreateAUser = (payload = {}) => {
    return httpClient.post(`${API_SUB_URL_USERS}`, payload);
};

export const apiUpdateAUser = (payload = {}) => {
    if (payload.createdAt) delete payload.createdAt;
    if (payload.updatedAt) delete payload.updatedAt;
    return httpClient.patch(`${API_SUB_URL_USERS}/${payload.id}`, payload);
};
