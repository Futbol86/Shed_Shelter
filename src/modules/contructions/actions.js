import { defineAction } from 'redux-define';
import {createAction} from 'redux-actions';
import {LOADING, FAILURE, SUCCESS} from '../../constants';

export const OR_SDE_LOAD_USER_LIST_ACTION                 = defineAction('OR_SDE_LOAD_USER_LIST_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');

export const LOAD_LIST_CONTRUCTION_ACTION                 = defineAction('LOAD_LIST_CONTRUCTION_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const DELETE_AN_CONTRUCTION_ACTION                 = defineAction('DELETE_AN_CONTRUCTION_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const ACCEPT_AN_CONTRUCTION_ACTION                 = defineAction('ACCEPT_AN_CONTRUCTION_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const REJECT_AN_CONTRUCTION_ACTION                 = defineAction('REJECT_AN_CONTRUCTION_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const UPDATE_AN_CONTRUCTION_STATUS_ACTION          = defineAction('UPDATE_AN_CONTRUCTION_STATUS_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');

export const LOAD_AN_CONTRUCTION_INFO_ACTION              = defineAction('LOAD_AN_CONTRUCTION_INFO_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const SHARED_CONTRUCTION_ROLL_FORM_ACTION          = defineAction('SHARED_CONTRUCTION_ROLL_FORM_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const CLEAR_CONTRUCTION_DETAIL_ACTION              = 'CLEAR_CONTRUCTION_DETAIL';

export const CONTRUCTION_DETAIL_ACTION                    = defineAction('CONTRUCTION_DETAIL_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');

export const LOAD_LIST_CONTRUCTION_NOTE_ACTION            = defineAction('LOAD_LIST_CONTRUCTION_NOTE_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const CONTRUCTION_NOTE_DETAIL_ACTION               = defineAction('CONTRUCTION_NOTE_DETAIL_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const ADD_AN_CONTRUCTION_NOTE_ACTION               = defineAction('ADD_AN_CONTRUCTION_NOTE_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const UPDATE_AN_CONTRUCTION_NOTE_ACTION            = defineAction('UPDATE_AN_CONTRUCTION_NOTE_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const DELETE_AN_CONTRUCTION_NOTE_ACTION            = defineAction('DELETE_AN_CONTRUCTION_NOTE_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const LOAD_EDITING_CONTRUCTION_NOTE_ACTION         = 'LOAD_EDITING_CONTRUCTION_NOTE';
export const CLEAR_CONTRUCTION_NOTE_DETAIL_ACTION         = 'CLEAR_CONTRUCTION_NOTE_DETAIL';

export const UPLOAD_CONTRUCTION_ATTACH_FILES_ACTION       = defineAction('UPLOAD_CONTRUCTION_ATTACH_FILES_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const DELETE_AN_CONTRUCTION_ATTACH_FILE_ACTION     = defineAction('DELETE_AN_CONTRUCTION_ATTACH_FILE_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');

export const UPLOAD_CONTRUCTION_NOTE_FILES_ACTION         = defineAction('UPLOAD_CONTRUCTION_NOTE_FILES_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const DELETE_AN_CONTRUCTION_NOTE_FILE_ACTION       = defineAction('DELETE_AN_CONTRUCTION_NOTE_FILE_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');

export const LOAD_LIST_SHARED_CONTRUCTION_ACTION          = defineAction('LOAD_LIST_SHARED_CONTRUCTION_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');

export const LOAD_LIST_CONTRUCTION_DATA_ENTRY_ACTION     = defineAction('LOAD_LIST_CONTRUCTION_DATA_ENTRY_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');

export const LOAD_A_CONTRUCTION_DATA_ENTRY_INFO_ACTION   = defineAction('LOAD_A_CONTRUCTION_DATA_ENTRY_INFO_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const CONTRUCTION_DATA_ENTRY_DETAIL_ACTION        = defineAction('CONTRUCTION_DATA_ENTRY_DETAIL_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const DELETE_A_CONTRUCTION_DATA_ENTRY_ACTION      = defineAction('DELETE_A_CONTRUCTION_DATA_ENTRY_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const UPLOAD_INSURANCE_POLICY_FILE_ACTION         = defineAction('UPLOAD_INSURANCE_POLICY_FILE_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const DELETE_AN_INSURANCE_POLICY_FILE_ACTION      = defineAction('DELETE_AN_INSURANCE_POLICY_FILE_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const CLEAR_INSURANCE_POLICY_FILE_ACTION          = defineAction('CLEAR_INSURANCE_POLICY_FILE_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const CLEAR_A_CONTRUCTION_DATA_ENTRY_INFO_ACTION  = 'CLEAR_A_CONTRUCTION_DATA_ENTRY_INFO_ACTION';

export const LOAD_LIST_CONTRUCTION_PLANNER               = defineAction('LOAD_LIST_CONTRUCTION_PLANNER',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const LOAD_AN_CONTRUCTION_PLANNER_INFO            = defineAction('LOAD_AN_CONTRUCTION_PLANNER_INFO',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const ADD_AN_CONTRUCTION_PLANNER_ACTION           = defineAction('ADD_AN_CONTRUCTION_PLANNER_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const UPDATE_AN_CONTRUCTION_PLANNER_ACTION        = defineAction('UPDATE_AN_CONTRUCTION_PLANNER_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');
export const DELETE_AN_CONTRUCTION_PLANNER_ACTION        = defineAction('DELETE_AN_CONTRUCTION_PLANNER_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');

export const ESTIMATED_CONTRUCTION_DATE_ACTION           = defineAction('ESTIMATED_CONTRUCTION_DATE_ACTION',  [LOADING, FAILURE, SUCCESS], 'contructions');

export const OR_SDE_SET_ACTIVE_STAFF_ACTION           = 'OR_SDE_SET_ACTIVE_STAFF';

export const OR_SDE_loadUserList                      = createAction(OR_SDE_LOAD_USER_LIST_ACTION.ACTION);

export const DOC_EXPORT_CONTRUCTION_NOTES_TO_PDF      = defineAction('DOC_EXPORT_CONTRUCTION_NOTES_TO_PDF',  [LOADING, FAILURE, SUCCESS], 'contructions');

export const loadListContruction                      = createAction(LOAD_LIST_CONTRUCTION_ACTION.ACTION);
export const deleteAnContruction                      = createAction(DELETE_AN_CONTRUCTION_ACTION.ACTION);
export const acceptAnContruction                      = createAction(ACCEPT_AN_CONTRUCTION_ACTION.ACTION);
export const rejectAnContruction                      = createAction(REJECT_AN_CONTRUCTION_ACTION.ACTION);
export const updateAnContructionStatus                = createAction(UPDATE_AN_CONTRUCTION_STATUS_ACTION.ACTION);

export const loadAnContructionInfo                    = createAction(LOAD_AN_CONTRUCTION_INFO_ACTION.ACTION);
export const clearContructionDetail                   = createAction(CLEAR_CONTRUCTION_DETAIL_ACTION);

export const loadListContructionNote                  = createAction(LOAD_LIST_CONTRUCTION_NOTE_ACTION.ACTION);
export const addAnContructionNote                     = createAction(ADD_AN_CONTRUCTION_NOTE_ACTION.ACTION);
export const updateAnContructionNote                  = createAction(UPDATE_AN_CONTRUCTION_NOTE_ACTION.ACTION);
export const deleteAnContructionNote                  = createAction(DELETE_AN_CONTRUCTION_NOTE_ACTION.ACTION);
export const loadEditingNoteAction                    = createAction(LOAD_EDITING_CONTRUCTION_NOTE_ACTION);
export const clearContructionNoteDetail               = createAction(CLEAR_CONTRUCTION_NOTE_DETAIL_ACTION);

export const uploadContructionAttachFiles             = createAction(UPLOAD_CONTRUCTION_ATTACH_FILES_ACTION.ACTION);
export const deleteAnContructionAttachFile            = createAction(DELETE_AN_CONTRUCTION_ATTACH_FILE_ACTION.ACTION);

export const uploadContructionNoteFiles               = createAction(UPLOAD_CONTRUCTION_NOTE_FILES_ACTION.ACTION);
export const deleteAnContructionNoteFile              = createAction(DELETE_AN_CONTRUCTION_NOTE_FILE_ACTION.ACTION);

export const loadListContructionDataEntry            = createAction(LOAD_LIST_CONTRUCTION_DATA_ENTRY_ACTION.ACTION);
export const deleteAContructionDataEntry             = createAction(DELETE_A_CONTRUCTION_DATA_ENTRY_ACTION.ACTION);
export const clearAContructionDataEntryInfo          = createAction(CLEAR_A_CONTRUCTION_DATA_ENTRY_INFO_ACTION);
export const loadAContructionDataEntryInfo           = createAction(LOAD_A_CONTRUCTION_DATA_ENTRY_INFO_ACTION.ACTION);
export const douploadInsurancePolicyFile             = createAction(UPLOAD_INSURANCE_POLICY_FILE_ACTION.ACTION);
export const doDeleteAnInsurancePolicyFile           = createAction(DELETE_AN_INSURANCE_POLICY_FILE_ACTION.ACTION);
export const doClearInsurancePolicyFile              = createAction(CLEAR_INSURANCE_POLICY_FILE_ACTION.ACTION);

export const loadListContructionPlanner              = createAction(LOAD_LIST_CONTRUCTION_PLANNER.ACTION);
export const loadAnContructionPlannerInfo            = createAction(LOAD_AN_CONTRUCTION_PLANNER_INFO.ACTION);
export const addAnContructionPlanner                 = createAction(ADD_AN_CONTRUCTION_PLANNER_ACTION.ACTION);
export const updateAnContructionPlanner              = createAction(UPDATE_AN_CONTRUCTION_PLANNER_ACTION.ACTION);
export const deleteAnContructionPlanner              = createAction(DELETE_AN_CONTRUCTION_PLANNER_ACTION.ACTION);

export const OR_SDE_setActiveStaff                   = createAction(OR_SDE_SET_ACTIVE_STAFF_ACTION);

export const DOC_exportContructionNotesToPDF         = createAction(DOC_EXPORT_CONTRUCTION_NOTES_TO_PDF.ACTION);