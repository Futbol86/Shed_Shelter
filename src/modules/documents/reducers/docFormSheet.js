import { 
    DOC_LOAD_AN_OFFICE_FORM_ACTION,
    DOC_LOAD_A_SAFETY_FORM_ACTION,
    DOC_CLEAR_AN_OFFICE_FORM_ACTION,
    DOC_CLEAR_A_SAFETY_FORM_ACTION,
    DOC_EXPORT_OFFICE_FORM_TO_PDF_ACTION,
    DOC_EXPORT_SAFETY_FORM_TO_PDF_ACTION,
    DOC_CLEAR_FORM_SHEET_PDF_ACTION,
} from '../actions';

import { DOCS_OFFICE_FORM_NAME_SUCCESS, DOCS_SAFETY_FORM_NAME_SUCCESS } from '../constants';

const defaultState = {
    officeFormDetail: {},
    safetyFormDetail: {},
    remotePDF: null,
    pagination: {},
    errors: {}
};

const docFormSheetReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case DOC_LOAD_AN_OFFICE_FORM_ACTION.SUCCESS:
            return {
                ...state,
                officeFormDetail: action.payload.data.data || action.payload.data,
                loading: false
            };

        case DOC_LOAD_A_SAFETY_FORM_ACTION.SUCCESS:
            return {
                ...state,
                safetyFormDetail: action.payload.data.data || action.payload.data,
                loading: false
            };

        case DOCS_OFFICE_FORM_NAME_SUCCESS:
            return {
                ...state,
                officeFormDetail: action.payload.data.data || action.payload.data,
                loading: false,
            }

        case DOCS_SAFETY_FORM_NAME_SUCCESS:
            return {
                ...state,
                safetyFormDetail: action.payload.data.data || action.payload.data,
                loading: false,
            }
         
        case DOC_EXPORT_OFFICE_FORM_TO_PDF_ACTION.SUCCESS:
            const rsOF = action.payload.data;
            let pdfBufferOF;
            if (rsOF && rsOF.data) {
                pdfBufferOF = rsOF.data;
            }
            else
                pdfBufferOF = rsOF;

            return {
                ...state,
                remotePDF: pdfBufferOF,
            };

        case DOC_EXPORT_SAFETY_FORM_TO_PDF_ACTION.SUCCESS:
            const rsSF = action.payload.data;
            let pdfBufferSF;
            if (rsSF && rsSF.data) {
                pdfBufferSF = rsSF.data;
            }
            else
                pdfBufferSF = rsSF;

            return {
                ...state,
                remotePDF: pdfBufferSF,
            };

        case DOC_CLEAR_FORM_SHEET_PDF_ACTION:
            return {
                ...state,
                remotePDF: null,
            }

        case DOC_CLEAR_AN_OFFICE_FORM_ACTION:
            return {
                ...state,
                officeFormDetail: {},
            }

        case DOC_CLEAR_A_SAFETY_FORM_ACTION:
            return {
                ...state,
                safetyFormDetail: {},
            }

        default:
            return state;
    }
};

export default docFormSheetReducer;