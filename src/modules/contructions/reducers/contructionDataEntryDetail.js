import { 
    OR_SDE_LOAD_USER_LIST_ACTION,
    LOAD_A_CONTRUCTION_DATA_ENTRY_INFO_ACTION,
    OR_SDE_SET_ACTIVE_STAFF_ACTION,
    UPLOAD_INSURANCE_POLICY_FILE_ACTION,
    DELETE_AN_INSURANCE_POLICY_FILE_ACTION,
    CLEAR_INSURANCE_POLICY_FILE_ACTION,
    CLEAR_A_CONTRUCTION_DATA_ENTRY_INFO_ACTION,
} from '../actions';

import {
    CONTRUCTION_DATA_ENTRY_DETAIL_FORM_NAME_FAILURE,
    CONTRUCTION_DATA_ENTRY_DETAIL_FORM_NAME_SUCCESS
} from '../constants'

const defaultState = {
    userList: [],
    activeStaff: null,
    contructionDataEntryDetail: {},
    insurancePolicyFileRelPaths: null,
    errors: {}
};

const contructionDataEntryReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_A_CONTRUCTION_DATA_ENTRY_INFO_ACTION.SUCCESS:
            return {
                ...state,
                contructionDataEntryDetail: action.payload.data.data,
                insurancePolicyFileRelPaths: action.payload.data.data.insurancePolicyFileRelPaths,
                loading: false
            };

        case CONTRUCTION_DATA_ENTRY_DETAIL_FORM_NAME_SUCCESS:
            return {
                ...state,
                contructionDataEntryDetail: action.payload.data.data,
                loading: false
            };

        case OR_SDE_LOAD_USER_LIST_ACTION.SUCCESS:
            return {
                ...state,
                userList: action.payload.data.data,
                loading: true
            };

        case LOAD_A_CONTRUCTION_DATA_ENTRY_INFO_ACTION.LOADING:
        case OR_SDE_LOAD_USER_LIST_ACTION.LOADING:
        case UPLOAD_INSURANCE_POLICY_FILE_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };

        case LOAD_A_CONTRUCTION_DATA_ENTRY_INFO_ACTION.FAILURE:
        case OR_SDE_LOAD_USER_LIST_ACTION.FAILURE:
        case CONTRUCTION_DATA_ENTRY_DETAIL_FORM_NAME_FAILURE:
        case UPLOAD_INSURANCE_POLICY_FILE_ACTION.FAILURE:
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

        case UPLOAD_INSURANCE_POLICY_FILE_ACTION.SUCCESS:
            return {
                ...state,
                insurancePolicyFileRelPaths: action.payload.data.data.id || action.payload.data.id,
                loading: false
            };

        case DELETE_AN_INSURANCE_POLICY_FILE_ACTION.SUCCESS:
        case CLEAR_INSURANCE_POLICY_FILE_ACTION.SUCCESS:
            return {
                ...state,
                insurancePolicyFileRelPaths: null,
            };

        case CLEAR_A_CONTRUCTION_DATA_ENTRY_INFO_ACTION:
            return {
                ...state,
                contructionDataEntryDetail: {},
            };
        
        default:
            return state;
    }
};

export default contructionDataEntryReducer;