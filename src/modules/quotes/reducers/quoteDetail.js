import {combineReducers} from "redux";

import productSelectionReducer from './quoteDetailProductSelection';
import buildingDetailInfoReducer from "./quoteDetailBuildingDetailInfo";
import buildingDetailReducer from "./quoteDetailBuildingDetail";
import buildingColourReducer from "./quoteDetailBuildingColour";
import quoteInfoReducer from "./quoteDetailQuoteInfo";
import clientDetailReducer from "./quoteDetailClientDetail";
import deliverySummaryReducer from './quoteDetailDeliverySummary';
import drawingModeReducer from './quoteDetailDrawingMode';
import otherAccessoriesReducer from './quoteDetailOtherAccessories';
import userDetailReducer from "./quoteDetailUserDetail";
import administrationReducer from './quoteDetailAdministration';

import {
    LOAD_QUOTE_INFO_ACTION,
    QD_BUILDING_DETAIL_FIELD_FOCUS,
    QD_CHANGE_A_WAITING_TASK, QD_SEND_ORDER_ACTION,
    QUOTE_DETAIL_CHANGE_TAB_ACTION
} from "../actions";
import {QUOTES_PRODUCT_SELECTION_FORM_NAME_SUCCESS} from "../constants";

/**
 * Return selected tab in Building Detail. By default, Building Detail tab is selected when editing.
 *
 * @param state
 * @param action
 * @returns {*}
 */
const selectedTabReducer = (state = 1, action = {}) => {
    switch (action.type) {
        case QUOTE_DETAIL_CHANGE_TAB_ACTION:
            return action.payload.tabIndex;
        case LOAD_QUOTE_INFO_ACTION.ACTION:
        case QUOTES_PRODUCT_SELECTION_FORM_NAME_SUCCESS:
            return 1;
        default:
            return state;
    }
};

const savedValueReducer = (state = {}, action = {}) => {
    switch (action.type) {
        case QD_BUILDING_DETAIL_FIELD_FOCUS:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            };
        default:
            return state;
    }
};

const waitingTasksReducer = (state = [], action = {}) => {
    switch (action.type) {
        case QD_CHANGE_A_WAITING_TASK:
            const {type, taskId} = action.payload;
            if (type === "+")
                return [
                    ...state,
                    taskId
                ];
            else if (type === "-")
                return state && state.filter(item => item !== taskId);

        default:
            return state;
    }
};

const sendingOrdersReducer = (state = [], action = {}) => {
    switch (action.type) {
        case QD_SEND_ORDER_ACTION.LOADING:
            if (action.payload && action.payload.quoteId)
                return [
                    ...state,
                    (action.payload && action.payload.quoteId)
                ];
            else
                return state;
        case QD_SEND_ORDER_ACTION.SUCCESS:
        case QD_SEND_ORDER_ACTION.FAILURE:
            if (action.payload && action.payload.quoteId)
                return state.filter(item => item !== (action.payload && action.payload.quoteId));
            else
                return state;

        default:
            return state;
    }
};

const quoteDetailReducer = {
    productSelection:   productSelectionReducer,
    buildingDetailInfo: buildingDetailInfoReducer,
    buildingDetail:     buildingDetailReducer,
    clientDetail:       clientDetailReducer,
    buildingColour:     buildingColourReducer,
    quoteInfo:          quoteInfoReducer,
    selectedTab:        selectedTabReducer,
    savedValue:         savedValueReducer,
    deliverySummary:    deliverySummaryReducer,
    drawingMode:        drawingModeReducer,
    otherAccessories:   otherAccessoriesReducer,
    waitingTasks:       waitingTasksReducer,
    sendingOrders:      sendingOrdersReducer,
    userDetail:         userDetailReducer,
    administration:     administrationReducer
};

export default combineReducers(quoteDetailReducer);