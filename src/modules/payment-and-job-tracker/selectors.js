
import {MODULE_ID} from "./constants";

export const getJTCheckList = (state) => {
    return state[MODULE_ID].trackingDetail.checkList;
};

export const getJTQuoteDetails = (state) => {
    return state[MODULE_ID].trackingDetail.quoteDetails;
};

export const getJTClient = (state) => {
    return state[MODULE_ID].trackingDetail.clientDetail;
};

export const getJTTrackingJobId = (state) => {
    return state[MODULE_ID].trackingDetail.id;
};

export const getShedInformationDetail = (state) => {
    return state[MODULE_ID].trackingDetail.shedInformationDetail;
};