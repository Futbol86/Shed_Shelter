import {combineReducers} from "redux";

import {DOC_CHANGE_TAB_ACTION, DOC_REQUEST_ZIP_CONTENT} from "../actions";

/**
 * Return selected tab in Quote Printer.
 *
 * @param state
 * @param action
 * @returns {*}
 */
const selectedTabReducer = (state = 0, action = {}) => {
    switch (action.type) {
        case DOC_CHANGE_TAB_ACTION:
            return action.payload.tabIndex;
        default:
            return state;
    }
};


const quoteDetailReducer = {
    selectedTab:        selectedTabReducer
};

export default combineReducers(quoteDetailReducer);