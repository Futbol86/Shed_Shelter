export const MODULE_ID          = 'orders';
export const API_SUB_URL        = '/orders';

export const API_SUB_URL_USERS  = 'users';
export const API_SUB_URL_ORDER_NOTES = 'order-notes';

export const API_SUB_URL_SUPPLY_DATA_ENTRY   = '/supply-data-entries';

export const SCHEMA_ORDERS          = 'orders';
export const SCHEMA_ORDER_NOTES     = 'notes';
export const SCHEMA_SUPPLY_DATA_ENTRIES = 'supplyDataEntries';
export const SCHEMA_SUPPLY_DATA_ENTRY_STAFFS    = 'staffs';

export {PAGINATION_ITEMS_PER_PAGE, ORDER_NOTE_PAGINATION_ITEMS_PER_PAGE} from '../../constants';

export const ORDER_LIST_FILTER_FORM_NAME          = 'ORDER_LIST_FILTER_FORM';
export const ORDER_LIST_FILTER_FORM_NAME_SUBMIT   = ORDER_LIST_FILTER_FORM_NAME + '_SUBMIT';
export const ORDER_LIST_FILTER_FORM_NAME_SUCCESS  = ORDER_LIST_FILTER_FORM_NAME + '_SUCCESS';
export const ORDER_LIST_FILTER_FORM_NAME_FAILURE  = ORDER_LIST_FILTER_FORM_NAME + '_FAILURE';

export const ORDER_DETAIL_FORM_NAME             = 'ORDER_DETAIL_FORM';
export const ORDER_DETAIL_FORM_NAME_SUBMIT      = ORDER_DETAIL_FORM_NAME + '_SUBMIT';
export const ORDER_DETAIL_FORM_NAME_SUCCESS     = ORDER_DETAIL_FORM_NAME + '_SUCCESS';
export const ORDER_DETAIL_FORM_NAME_FAILURE     = ORDER_DETAIL_FORM_NAME + '_FAILURE';

export const SHARED_ORDER_ROLL_FORM_FORM_NAME           = 'SHARED_ORDER_ROLL_FORM_FORM_NAME';
export const SHARED_ORDER_ROLL_FORM_FORM_NAME_SUBMIT    = SHARED_ORDER_ROLL_FORM_FORM_NAME + '_SUBMIT';
export const SHARED_ORDER_ROLL_FORM_FORM_NAME_SUCCESS   = SHARED_ORDER_ROLL_FORM_FORM_NAME + '_SUCCESS';
export const SHARED_ORDER_ROLL_FORM_FORM_NAME_FAILURE   = SHARED_ORDER_ROLL_FORM_FORM_NAME + '_FAILURE';

export const ORDER_NOTE_DETAIL_FORM_NAME             = 'ORDER_NOTE_DETAIL_FORM';
export const ORDER_NOTE_DETAIL_FORM_NAME_SUBMIT      = ORDER_NOTE_DETAIL_FORM_NAME + '_SUBMIT';
export const ORDER_NOTE_DETAIL_FORM_NAME_SUCCESS     = ORDER_NOTE_DETAIL_FORM_NAME + '_SUCCESS';
export const ORDER_NOTE_DETAIL_FORM_NAME_FAILURE     = ORDER_NOTE_DETAIL_FORM_NAME + '_FAILURE';

export const SHARED_ORDER_EDIT_FORM_NAME          = 'SHARED_ORDER_EDIT_FORM';
export const SHARED_ORDER_EDIT_FORM_NAME_SUBMIT   = SHARED_ORDER_EDIT_FORM_NAME + '_SUBMIT';
export const SHARED_ORDER_EDIT_FORM_NAME_SUCCESS  = SHARED_ORDER_EDIT_FORM_NAME + '_SUCCESS';
export const SHARED_ORDER_EDIT_FORM_NAME_FAILURE  = SHARED_ORDER_EDIT_FORM_NAME + '_FAILURE';

export const SHARED_ORDER_LIST_FILTER_FORM_NAME          = 'SHARED_ORDER_LIST_FILTER_FORM';
export const SHARED_ORDER_LIST_FILTER_FORM_NAME_SUBMIT   = SHARED_ORDER_LIST_FILTER_FORM_NAME + '_SUBMIT';
export const SHARED_ORDER_LIST_FILTER_FORM_NAME_SUCCESS  = SHARED_ORDER_LIST_FILTER_FORM_NAME + '_SUCCESS';
export const SHARED_ORDER_LIST_FILTER_FORM_NAME_FAILURE  = SHARED_ORDER_LIST_FILTER_FORM_NAME + '_FAILURE';

export const SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME          = 'SUPPLY_DATA_ENTRY_ADD_FORM';
export const SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME_SUBMIT   = SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME + '_SUBMIT';
export const SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME_SUCCESS  = SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME + '_SUCCESS';
export const SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME_FAILURE  = SUPPLY_DATA_ENTRY_DETAIL_FORM_NAME + '_FAILURE';

export const SUPPLY_DATA_ENTRY_ADD_STAFF_FORM_NAME      = 'SUPPLY_DATA_ENTRY_ADD_STAFF_FORM_NAME';

export const PREDIFINED_SUPPLY_TYPES = [
    {id: "1", value: "1", name: "Roll Form"},
    {id: "2", value: "2", name: "Supplier Form"}
];

export const PREDEFINED_SUPPLY_TYPE_IDS = {
    ROLL_FORM: 1,
    SUPPLIER: 2
}