import {MODULE_ID} from "./constants";
import {utils} from "../../services";
import {SCHEMA_CONTRUCTION_NOTES} from "./constants";

export const getFilterInfo  = (state) => state[MODULE_ID].contructionList.filter;
export const getPaginationInfo  = (state) => state[MODULE_ID].contructionList.pagination;
export const getContructionList = (state) => state[MODULE_ID].contructionList.contructionList;
export const getContructionPaginationInfo = (state) => state[MODULE_ID].contructionList.pagination;
export const getContructionInfo = (state) => state[MODULE_ID].contructionDetail.contructionDetails;
export const getContructionDealerInfo = (state) => state[MODULE_ID].contructionDetail.contructionDetails.dealerDetail;
export const getContructionUserInfo = (state) => state[MODULE_ID].contructionDetail.contructionDetails.contructionMemberDetails;
export const getContructionAttachFiles = (state) => state[MODULE_ID].contructionDetail.attachFiles;
export const getIsContructionAccepted = (state) => state[MODULE_ID].contructionDetail.isContructionAccepted;
export const getIsContructionRejected = (state) => state[MODULE_ID].contructionDetail.isContructionRejected;
export const getContructionNoteList = (state) => {
    const currentSelectedState = state[MODULE_ID].contructionNote.notes;
    return utils.getItemListInStateTree(currentSelectedState, SCHEMA_CONTRUCTION_NOTES);
};
export const getContructionNotePaginationInfo = (state) => state[MODULE_ID].contructionNote.pagination;
export const getContructionEditingNote = (state)  => state[MODULE_ID].contructionNote.editingNote;
export const getContructionNoteFiles = (state) => state[MODULE_ID].contructionNote.noteFiles;
export const getContructionNoteRemovedFiles = (state) => state[MODULE_ID].contructionNote.removedFiles;
export const getContructionDataEntryList = (state) => state[MODULE_ID].contructionDataEntryList.contructionDataEntryList;
export const getContructionDataEntryPaginationInfo = (state) => state[MODULE_ID].contructionDataEntryList.pagination;
export const getContructionDataEntryInfo= (state) => state[MODULE_ID].contructionDataEntryDetail.contructionDataEntryDetail;
export const getInsurancePolicyFile= (state) => state[MODULE_ID].contructionDataEntryDetail.insurancePolicyFileRelPaths;
export const getOrSdeUserList = (state) => state[MODULE_ID].contructionDataEntryDetail.userList;
export const getOrSdeActiveStaff  = (state) => state[MODULE_ID].contructionDataEntryDetail.activeStaff;
export const getContructionPlannerList = (state) => state[MODULE_ID].contructionPlanner.contructionPlanners;
export const getContructionPlannerInfo = (state) => state[MODULE_ID].contructionPlanner.contructionPlannerDetail;

export const getRemotePDF              = (state) => state[MODULE_ID].contructionNote.remotePDF;