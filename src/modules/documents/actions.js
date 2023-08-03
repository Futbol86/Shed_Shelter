import { defineAction } from 'redux-define';
import {createAction} from 'redux-actions';
import {LOADING, FAILURE, SUCCESS} from '../../constants';

export const DOC_CHANGE_ACTIVE_MODAL    = 'DOC_CHANGE_ACTIVE_MODAL';
export const DOC_CHANGE_TYPE_MODAL      = 'DOC_CHANGE_TYPE_MODAL';
export const DOC_LOAD_A_DOCUMENT        = defineAction('DOC_LOAD_A_DOCUMENT',  [LOADING, FAILURE, SUCCESS], 'documents');
export const DOC_CONVERT_HTML_TO_PDF    = defineAction('DOC_CONVERT_HTML_TO_PDF',  [LOADING, FAILURE, SUCCESS], 'documents');
export const DOC_QP_UPLOAD_LOGO_FILE    = defineAction('DOC_QP_UPLOAD_LOGO_FILE',  [LOADING, FAILURE, SUCCESS], 'documents');
export const DOC_CHANGE_TAB_ACTION      = 'DOC_CHANGE_TAB_ACTION';

export const DOC_REQUEST_ZIP_CONTENT    = defineAction('DOC_REQUEST_ZIP_CONTENT',  [LOADING, FAILURE, SUCCESS], 'documents');

export const DOC_LOAD_AN_ACCOUNTING_ACTION      = defineAction('DOC_LOAD_AN_ACCOUNTING_ACTION',  [LOADING, FAILURE, SUCCESS], 'documents');
export const DOC_CLEAR_AN_ACCOUNTING_ACTION     = 'DOC_CLEAR_AN_ACCOUNTING_ACTION';
export const DOC_LOAD_LIST_ACCOUNTING_LOG_ACTION   = defineAction('DOC_LOAD_LIST_ACCOUNTING_LOG_ACTION',  [LOADING, FAILURE, SUCCESS], 'documents');

export const DOC_LOAD_A_QUOTE_INFO_ACTION       = defineAction('DOC_LOAD_A_QUOTE_INFO_ACTION',  [LOADING, FAILURE, SUCCESS], 'documents');

export const DOC_EXPORT_ACCOUNTING_LOG_TO_PDF   = defineAction('DOC_EXPORT_ACCOUNTING_LOG_TO_PDF',  [LOADING, FAILURE, SUCCESS], 'hopDongs');
export const DOC_CLEAR_ACCOUNTING_LOG_ACTION    = 'DOC_CLEAR_ACCOUNTING_LOG_ACTION';

export const DOC_LOAD_AN_OFFICE_FORM_ACTION     = defineAction('DOC_LOAD_AN_OFFICE_FORM_ACTION',  [LOADING, FAILURE, SUCCESS], 'documents');
export const DOC_CLEAR_AN_OFFICE_FORM_ACTION    = 'DOC_CLEAR_AN_OFFICE_FORM_ACTION';

export const DOC_LOAD_A_SAFETY_FORM_ACTION      = defineAction('DOC_LOAD_A_SAFETY_FORM_ACTION',  [LOADING, FAILURE, SUCCESS], 'documents');
export const DOC_CLEAR_A_SAFETY_FORM_ACTION     = 'DOC_CLEAR_A_SAFETY_FORM_ACTION';

export const DOC_LOAD_A_SWMS_GENERIC_FORM_ACTION     = defineAction('DOC_LOAD_A_SWMS_GENERIC_FORM_ACTION',  [LOADING, FAILURE, SUCCESS], 'documents');
export const DOC_CLEAR_A_SWMS_GENERIC_FORM_ACTION    = 'DOC_CLEAR_A_SWMS_GENERIC_FORM_ACTION';

export const DOC_EXPORT_OFFICE_FORM_TO_PDF_ACTION    = defineAction('DOC_EXPORT_OFFICE_FORM_TO_PDF_ACTION',  [LOADING, FAILURE, SUCCESS], 'documents');
export const DOC_EXPORT_SAFETY_FORM_TO_PDF_ACTION    = defineAction('DOC_EXPORT_SAFETY_FORM_TO_PDF_ACTION',  [LOADING, FAILURE, SUCCESS], 'documents');
export const DOC_EXPORT_SWMS_GENERIC_FORM_TO_PDF_ACTION     = defineAction('DOC_EXPORT_SWMS_GENERIC_FORM_TO_PDF_ACTION',  [LOADING, FAILURE, SUCCESS], 'documents');
export const DOC_CLEAR_FORM_SHEET_PDF_ACTION         = 'DOC_CLEAR_FORM_SHEET_PDF_ACTION';
export const DOC_CLEAR_NOTE_SHEET_PDF_ACTION         = 'DOC_CLEAR_NOTE_SHEET_PDF_ACTION';

export const DOC_changeActiveModal          = createAction(DOC_CHANGE_ACTIVE_MODAL);
export const DOC_changeTypeModal            = createAction(DOC_CHANGE_TYPE_MODAL);

export const DOC_loadADocument              = createAction(DOC_LOAD_A_DOCUMENT.ACTION);
export const DOC_convertHTMLToPDF           = createAction(DOC_CONVERT_HTML_TO_PDF.ACTION);
export const DOC_requestZipContent          = createAction(DOC_REQUEST_ZIP_CONTENT.ACTION);
export const doChangeTab                    = createAction(DOC_CHANGE_TAB_ACTION);

export const DOC_loadAnAccounting           = createAction(DOC_LOAD_AN_ACCOUNTING_ACTION.ACTION);
export const DOC_clearAnAccounting          = createAction(DOC_CLEAR_AN_ACCOUNTING_ACTION);
export const DOC_loadListAccountingLog      = createAction(DOC_LOAD_LIST_ACCOUNTING_LOG_ACTION.ACTION);

export const DOC_loadAQuoteInfo             = createAction(DOC_LOAD_A_QUOTE_INFO_ACTION.ACTION);

export const DOC_exportAccountingLogToPDF   = createAction(DOC_EXPORT_ACCOUNTING_LOG_TO_PDF.ACTION);
export const DOC_clearAccountingLogPDF      = createAction(DOC_CLEAR_ACCOUNTING_LOG_ACTION);

export const DOC_loadAnOfficeForm           = createAction(DOC_LOAD_AN_OFFICE_FORM_ACTION.ACTION);
export const DOC_clearAnOfficeForm          = createAction(DOC_CLEAR_AN_OFFICE_FORM_ACTION);

export const DOC_loadAnSafetyForm           = createAction(DOC_LOAD_A_SAFETY_FORM_ACTION.ACTION);
export const DOC_clearASafetyForm           = createAction(DOC_CLEAR_A_SAFETY_FORM_ACTION);

export const DOC_loadASWMSGenericForm       = createAction(DOC_LOAD_A_SWMS_GENERIC_FORM_ACTION.ACTION);
export const DOC_clearASWMSGenericForm      = createAction(DOC_CLEAR_A_SWMS_GENERIC_FORM_ACTION);

export const DOC_exportOfficeFormPDF        = createAction(DOC_EXPORT_OFFICE_FORM_TO_PDF_ACTION.ACTION);
export const DOC_exportSafetyFormPDF        = createAction(DOC_EXPORT_SAFETY_FORM_TO_PDF_ACTION.ACTION);
export const DOC_exportSWMSGenericFormPDF   = createAction(DOC_EXPORT_SWMS_GENERIC_FORM_TO_PDF_ACTION.ACTION);

export const DOC_clearRemoteFormSheetPDF    = createAction(DOC_CLEAR_FORM_SHEET_PDF_ACTION);
export const DOC_clearRemoteNoteSheetPDF    = createAction(DOC_CLEAR_NOTE_SHEET_PDF_ACTION);
