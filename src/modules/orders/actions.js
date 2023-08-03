import { defineAction } from 'redux-define';
import {createAction} from 'redux-actions';
import {LOADING, FAILURE, SUCCESS} from '../../constants';

export const OR_SDE_LOAD_USER_LIST_ACTION           = defineAction('OR_SDE_LOAD_USER_LIST_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');

export const LOAD_LIST_ORDER_ACTION                 = defineAction('LOAD_LIST_ORDER_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');
export const DELETE_AN_ORDER_ACTION                 = defineAction('DELETE_AN_ORDER_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');
export const ACCEPT_AN_ORDER_ACTION                 = defineAction('ACCEPT_AN_ORDER_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');
export const REJECT_AN_ORDER_ACTION                 = defineAction('REJECT_AN_ORDER_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');
export const UPDATE_AN_ORDER_STATUS_ACTION          = defineAction('UPDATE_AN_ORDER_STATUS_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');

export const LOAD_AN_ORDER_INFO_ACTION              = defineAction('LOAD_AN_ORDER_INFO_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');
export const SHARED_ORDER_ROLL_FORM_ACTION             = defineAction('SHARED_ORDER_ROLL_FORM_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');
export const CLEAR_ORDER_DETAIL_ACTION              = 'CLEAR_ORDER_DETAIL';

export const ORDER_DETAIL_ACTION                    = defineAction('ORDER_DETAIL_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');

export const LOAD_LIST_ORDER_NOTE_ACTION            = defineAction('LOAD_LIST_ORDER_NOTE_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');
export const ORDER_NOTE_DETAIL_ACTION               = defineAction('ORDER_NOTE_DETAIL_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');
export const ADD_AN_ORDER_NOTE_ACTION               = defineAction('ADD_AN_ORDER_NOTE_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');
export const UPDATE_AN_ORDER_NOTE_ACTION            = defineAction('UPDATE_AN_ORDER_NOTE_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');
export const DELETE_AN_ORDER_NOTE_ACTION            = defineAction('DELETE_AN_ORDER_NOTE_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');
export const LOAD_EDITING_ORDER_NOTE_ACTION         = 'LOAD_EDITING_ORDER_NOTE';
export const CLEAR_ORDER_NOTE_DETAIL_ACTION         = 'CLEAR_ORDER_NOTE_DETAIL';

export const UPLOAD_ORDER_ATTACH_FILES_ACTION       = defineAction('UPLOAD_ORDER_ATTACH_FILES_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');
export const DELETE_AN_ORDER_ATTACH_FILE_ACTION     = defineAction('DELETE_AN_ORDER_ATTACH_FILE_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');

export const UPLOAD_ORDER_NOTE_FILES_ACTION         = defineAction('UPLOAD_ORDER_NOTE_FILES_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');
export const DELETE_AN_ORDER_NOTE_FILE_ACTION       = defineAction('DELETE_AN_ORDER_NOTE_FILE_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');

export const LOAD_LIST_SHARED_ORDER_ACTION          = defineAction('LOAD_LIST_SHARED_ORDER_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');

export const LOAD_LIST_SUPPLY_DATA_ENTRY_ACTION     = defineAction('LOAD_LIST_SUPPLY_DATA_ENTRY_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');

export const LOAD_A_SUPPLY_DATA_ENTRY_INFO_ACTION   = defineAction('LOAD_A_SUPPLY_DATA_ENTRY_INFO_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');
export const SUPPLY_DATA_ENTRY_DETAIL_ACTION        = defineAction('SUPPLY_DATA_ENTRY_DETAIL_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');
export const DELETE_A_SUPPLY_DATA_ENTRY_ACTION      = defineAction('DELETE_A_SUPPLY_DATA_ENTRY_ACTION',  [LOADING, FAILURE, SUCCESS], 'orders');
export const CLEAR_A_SUPPLY_DATA_ENTRY_INFO_ACTION  = 'CLEAR_A_SUPPLY_DATA_ENTRY_INFO_ACTION';

export const OR_SDE_SET_ACTIVE_STAFF_ACTION         = 'OR_SDE_SET_ACTIVE_STAFF';

export const OR_SDE_loadUserList                = createAction(OR_SDE_LOAD_USER_LIST_ACTION.ACTION);

export const loadListOrder                      = createAction(LOAD_LIST_ORDER_ACTION.ACTION);
export const deleteAnOrder                      = createAction(DELETE_AN_ORDER_ACTION.ACTION);
export const acceptAnOrder                      = createAction(ACCEPT_AN_ORDER_ACTION.ACTION);
export const rejectAnOrder                      = createAction(REJECT_AN_ORDER_ACTION.ACTION);
export const updateAnOrderStatus                = createAction(UPDATE_AN_ORDER_STATUS_ACTION.ACTION);

export const loadAnOrderInfo                    = createAction(LOAD_AN_ORDER_INFO_ACTION.ACTION);
export const clearOrderDetail                   = createAction(CLEAR_ORDER_DETAIL_ACTION);

export const loadListOrderNote                  = createAction(LOAD_LIST_ORDER_NOTE_ACTION.ACTION);
export const addAnOrderNote                     = createAction(ADD_AN_ORDER_NOTE_ACTION.ACTION);
export const updateAnOrderNote                  = createAction(UPDATE_AN_ORDER_NOTE_ACTION.ACTION);
export const deleteAnOrderNote                  = createAction(DELETE_AN_ORDER_NOTE_ACTION.ACTION);
export const loadEditingNoteAction              = createAction(LOAD_EDITING_ORDER_NOTE_ACTION);
export const clearOrderNoteDetail               = createAction(CLEAR_ORDER_NOTE_DETAIL_ACTION);

export const uploadOrderAttachFiles             = createAction(UPLOAD_ORDER_ATTACH_FILES_ACTION.ACTION);
export const deleteAnOrderAttachFile            = createAction(DELETE_AN_ORDER_ATTACH_FILE_ACTION.ACTION);

export const uploadOrderNoteFiles               = createAction(UPLOAD_ORDER_NOTE_FILES_ACTION.ACTION);
export const deleteAnOrderNoteFile              = createAction(DELETE_AN_ORDER_NOTE_FILE_ACTION.ACTION);

export const loadListSupplyDataEntry            = createAction(LOAD_LIST_SUPPLY_DATA_ENTRY_ACTION.ACTION);
export const deleteASupplyDataEntry             = createAction(DELETE_A_SUPPLY_DATA_ENTRY_ACTION.ACTION);
export const loadASupplyDataEntryInfo           = createAction(LOAD_A_SUPPLY_DATA_ENTRY_INFO_ACTION.ACTION);
export const clearASupplyDataEntryInfo          = createAction(CLEAR_A_SUPPLY_DATA_ENTRY_INFO_ACTION);

export const OR_SDE_setActiveStaff              = createAction(OR_SDE_SET_ACTIVE_STAFF_ACTION);