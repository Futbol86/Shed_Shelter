import {MODULE_ID} from "./constants";
import {utils} from "../../services";
import {SCHEMA_ORDER_NOTES} from "./constants";

export const getFilterInfo  = (state) => state[MODULE_ID].orderList.filter;
export const getPaginationInfo  = (state) => state[MODULE_ID].orderList.pagination;
export const getOrderList = (state) => state[MODULE_ID].orderList.orderList;
export const getOrderPaginationInfo = (state) => state[MODULE_ID].orderList.pagination;
export const getOrderInfo = (state) => state[MODULE_ID].orderDetail.orderDetails;
export const getOrderUserInfo = (state) => state[MODULE_ID].orderDetail.orderDetails.userDetails;
export const getOrderAttachFiles = (state) => state[MODULE_ID].orderDetail.attachFiles;
export const getIsOrderAccepted = (state) => state[MODULE_ID].orderDetail.isOrderAccepted;
export const getIsOrderRejected = (state) => state[MODULE_ID].orderDetail.isOrderRejected;
export const getOrderNoteList = (state) => {
    const currentSelectedState = state[MODULE_ID].orderNote.notes;
    return utils.getItemListInStateTree(currentSelectedState, SCHEMA_ORDER_NOTES);
};
export const getOrderNotePaginationInfo = (state) => state[MODULE_ID].orderNote.pagination;
export const getOrderEditingNote = (state)  => state[MODULE_ID].orderNote.editingNote;
export const getOrderNoteFiles = (state) => state[MODULE_ID].orderNote.noteFiles;
export const getOrderNoteRemovedFiles = (state) => state[MODULE_ID].orderNote.removedFiles;
export const getSupplyDataEntryList = (state) => state[MODULE_ID].supplyDataEntryList.supplyDataEntryList;
export const getSupplyDataEntryPaginationInfo = (state) => state[MODULE_ID].supplyDataEntryList.pagination;
export const getSupplyDataEntryInfo= (state) => state[MODULE_ID].supplyDataEntryDetail.supplyDataEntryDetail;
export const getOrSdeUserList = (state) => state[MODULE_ID].supplyDataEntryDetail.userList;
export const getOrSdeActiveStaff  = (state) => state[MODULE_ID].supplyDataEntryDetail.activeStaff;
export const getOrderInvitedSupplyDataEntries = (supplyDataEntries, rollForms, suppliers) => {
    let invitedSupplyDataEntries = [];

    if (supplyDataEntries && supplyDataEntries.length) {
        if (rollForms && rollForms.length) {
            for (let i = 0; i < rollForms.length; i++) {
                const id = rollForms[i];
                const entry = supplyDataEntries.find(e => e.id + '' === id + '');
                if (entry) {
                    invitedSupplyDataEntries.push(entry);
                }
            }
        }

        if (suppliers && suppliers.length) {
            for (let i = 0; i < suppliers.length; i++) {
                const id = suppliers[i];
                const entry = supplyDataEntries.find(e => e.id + '' === id + '');
                if (entry) {
                    invitedSupplyDataEntries.push(entry);
                }
            }
        }
    }

    return invitedSupplyDataEntries;
};