import {createSelector} from 'reselect';
import {MODULE_ID, MODULE_SUB_ID_USERS, SCHEMA_USERS} from "../constants";
import {utils} from "../../../services";

const getUsersListFunc = (state) => {
    const currentSelectedState = state[MODULE_ID][MODULE_SUB_ID_USERS].userList.users;
    return utils.getItemListInStateTree(currentSelectedState, SCHEMA_USERS);
};

export const getUsersList = createSelector(
    getUsersListFunc,
    (users) => users
);


export const getUploadedDealerLogo = (state)    => state[MODULE_ID][MODULE_SUB_ID_USERS].userAdd.logoFile;
export const getEditingUserDetail = (state)    => state[MODULE_ID][MODULE_SUB_ID_USERS].userEdit.userDetail;