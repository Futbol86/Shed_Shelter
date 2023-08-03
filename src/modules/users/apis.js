import {httpClient} from '../../services';
import {API_SUB_URL} from './constants';
import {AUTH_MANAGEMENT_API_SUB_URL} from '../../constants';

export const apiLoadProfile = ({id}) => {
    return httpClient.get(`${API_SUB_URL}/${id}`);
};

export const apiUpdateProfile = ({id, email, isVerified, createdAt, updatedAt, wholesaleMargin, productMargin, ...remainingInfo}) => {
    return httpClient.patch(`${API_SUB_URL}/${id}`, remainingInfo);
};

/**
 * It is assumed that the oldPassword and newPassword are already validated
 *
 * @param id
 * @param oldPassword
 * @param newPassword
 * @returns {AxiosPromise<any>}
 */
export const apiUpdatePassword = ({id, currentPassword, password}) => {
    return httpClient.post(
        AUTH_MANAGEMENT_API_SUB_URL,
        {
            action: "passwordChange",
            value: {
                user: {id: `${id}`},    //-- Trick: since we allow id as user identifier, must provide a string
                oldPassword: currentPassword,
                password
            }
        }
    );
};