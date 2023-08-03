import { 
    OR_SDE_LOAD_USER_LIST_ACTION,
    LOAD_A_SUPPLY_DATA_ENTRY_INFO_ACTION,
    OR_SDE_SET_ACTIVE_STAFF_ACTION,
    CLEAR_A_SUPPLY_DATA_ENTRY_INFO_ACTION,
} from '../actions';

import {
    SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME_FAILURE,
    SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME_SUCCESS
} from '../constants'

const defaultState = {
    userList: [],
    activeStaff: null,
    supplyDataEntryDetail: {},
    errors: {}
};

const supplyDataEntryReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_A_SUPPLY_DATA_ENTRY_INFO_ACTION.SUCCESS:
            return {
                ...state,
                supplyDataEntryDetail: action.payload.data.data || action.payload.data,
                loading: false
            };

        case SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME_SUCCESS:
            return {
                ...state,
                supplyDataEntryDetail: action.payload.data.data,
                loading: false
            };

        case OR_SDE_LOAD_USER_LIST_ACTION.SUCCESS:
            return {
                ...state,
                userList: action.payload.data.data,
                loading: true
            };

        case LOAD_A_SUPPLY_DATA_ENTRY_INFO_ACTION.LOADING:
        case OR_SDE_LOAD_USER_LIST_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };

        case LOAD_A_SUPPLY_DATA_ENTRY_INFO_ACTION.FAILURE:
        case OR_SDE_LOAD_USER_LIST_ACTION.FAILURE:
        case SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME_FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };

        case OR_SDE_SET_ACTIVE_STAFF_ACTION:
            return {
                ...state,
                activeStaff: action.payload.staff
            };

        case CLEAR_A_SUPPLY_DATA_ENTRY_INFO_ACTION:
            return {
                ...state,
                supplyDataEntryDetail: {},
            }

        default:
            return state;
    }
};

export default supplyDataEntryReducer;