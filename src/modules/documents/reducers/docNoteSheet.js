import { 
    DOC_LOAD_A_SWMS_GENERIC_FORM_ACTION,
    DOC_CLEAR_A_SWMS_GENERIC_FORM_ACTION,
    DOC_EXPORT_SWMS_GENERIC_FORM_TO_PDF_ACTION,
    DOC_CLEAR_NOTE_SHEET_PDF_ACTION
} from '../actions';

import { DOCS_SWMS_GENERIC_FORM_NAME_SUCCESS } from '../constants';

const defaultState = {
    sWMSGenericFormDetail: {},
    remotePDF: null,
    pagination: {},
    errors: {}
};

const docNoteSheetReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case DOC_LOAD_A_SWMS_GENERIC_FORM_ACTION.SUCCESS:
            return {
                ...state,
                sWMSGenericFormDetail: action.payload.data.data || action.payload.data,
                loading: false
            };

        case DOCS_SWMS_GENERIC_FORM_NAME_SUCCESS:
            return {
                ...state,
                sWMSGenericFormDetail: action.payload.data.data || action.payload.data,
                loading: false,
            }

        case DOC_EXPORT_SWMS_GENERIC_FORM_TO_PDF_ACTION.SUCCESS:
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

        case DOC_CLEAR_A_SWMS_GENERIC_FORM_ACTION:
            return {
                ...state,
                sWMSGenericFormDetail: {},
            }

        case DOC_CLEAR_NOTE_SHEET_PDF_ACTION:
            return {
                ...state,
                remotePDF: null,
            }

        default:
            return state;
    }
};

export default docNoteSheetReducer;