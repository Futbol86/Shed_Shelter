import { 
    DOC_LOAD_AN_ACCOUNTING_ACTION,
    DOC_LOAD_LIST_ACCOUNTING_LOG_ACTION,
    DOC_LOAD_A_QUOTE_INFO_ACTION,
    DOC_CLEAR_AN_ACCOUNTING_ACTION,
    DOC_EXPORT_ACCOUNTING_LOG_TO_PDF,
    DOC_CLEAR_ACCOUNTING_LOG_ACTION
} from '../actions';

import { DOCS_ACCOUNTING_FORM_NAME_SUCCESS } from '../constants';

const defaultState = {
    accountingDetail: {},
    accountingLogs: [],
    quoteInfo: {},
    remotePDF: null,
    pagination: {},
    errors: {}
};

const docAccountingReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case DOC_LOAD_AN_ACCOUNTING_ACTION.SUCCESS:
            return {
                ...state,
                accountingDetail: action.payload.data.data,
                loading: false
            };

        case DOC_LOAD_A_QUOTE_INFO_ACTION.SUCCESS:
            return {
                ...state,
                quoteInfo: action.payload.data.data,
                loading: false
            };

        case DOCS_ACCOUNTING_FORM_NAME_SUCCESS:
            return {
                ...state,
                accountingDetail: action.payload.data.data || action.payload.data,
                loading: false,
            }

        case DOC_CLEAR_AN_ACCOUNTING_ACTION:
            return {
                ...state,
                accountingDetail: {},
                loading: false
            };

        case DOC_LOAD_LIST_ACCOUNTING_LOG_ACTION.SUCCESS:
            return {
                ...state,
                accountingLogs: action.payload.data.data,
                loading: false
            };

        case DOC_EXPORT_ACCOUNTING_LOG_TO_PDF.SUCCESS:
            const rs = action.payload.data;
            let pdfBuffer;
            if (rs && rs.data) {
                pdfBuffer = rs.data;
            }
            else
                pdfBuffer = rs;

            return {
                ...state,
                remotePDF: pdfBuffer,
            };

        case DOC_CLEAR_ACCOUNTING_LOG_ACTION:
            return {
                ...state,
                remotePDF: null,
            }

        default:
            return state;
    }
};

export default docAccountingReducer;