import { 
    QUICKBOOKS_AUTHORIZE_URI_ACTION,
    CLEAR_QUICKBOOKS_REDIRECT_URI_ACTION,

    QUICKBOOKS_GET_COMPANY_INFO_ACTION,

    QUICKBOOKS_GET_ACCOUNTS_ACTION,
    QUICKBOOKS_GET_AN_ACCOUNT_ACTION,
     
    QUICKBOOKS_GET_CUSTOMERS_ACTION,
    QUICKBOOKS_GET_A_CUSTOMER_ACTION,

    QUICKBOOKS_GET_ITEMS_ACTION,
    QUICKBOOKS_GET_A_ITEM_ACTION,

    QUICKBOOKS_GET_INVOICES_ACTION,
    QUICKBOOKS_GET_A_INVOICE_ACTION,
} from '../actions';

import { 
    QUICKBOOKS_ACCOUNT_APIS_FORM_NAME_SUCCESS,
    QUICKBOOKS_ACCOUNT_APIS_FORM_NAME_FAILURE,

    QUICKBOOKS_CUSTOMER_APIS_FORM_NAME_SUCCESS,
    QUICKBOOKS_CUSTOMER_APIS_FORM_NAME_FAILURE,

    QUICKBOOKS_ITEM_APIS_FORM_NAME_SUCCESS,
    QUICKBOOKS_ITEM_APIS_FORM_NAME_FAILURE,

    QUICKBOOKS_INVOICE_APIS_FORM_NAME_SUCCESS,
    QUICKBOOKS_INVOICE_APIS_FORM_NAME_FAILURE,
} from '../constants';

const defaultState = {
    quickBooksUri: '',

    quickBooksAccounts: [],
    quickBooksAccount: {},
    quickBooksNewAccount: {},
    quickBooksCompanyInfo: {},

    quickBooksCustomers: [],
    quickBooksCustomer: {},

    quickBooksItems: [],
    quickBooksItem: {},

    quickBooksInvoices: [],
    quickBooksInvoice: {},

    quickBooksAccountError: "",
    quickBooksCustomerError: "",
    quickBooksItemError: "",
    quickBooksInvoiceError: "",
};

const quickBooksApiReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case QUICKBOOKS_AUTHORIZE_URI_ACTION.SUCCESS:
            return {
                ...state,
                quickBooksUri: action.payload.data.data || action.payload.data,
                loading: false
            };

        case CLEAR_QUICKBOOKS_REDIRECT_URI_ACTION:
            return {
                ...state,
                quickBooksUri: ''
            }

        // ACCOUNTS
        case QUICKBOOKS_GET_ACCOUNTS_ACTION.SUCCESS:
            return {
                ...state,
                quickBooksAccounts: action.payload.data.data || action.payload.data,
                loading: false
            };

        case QUICKBOOKS_GET_ACCOUNTS_ACTION.FAILURE:
            return {
                ...state,
                quickBooksAccountError: action.payload.errors,
                loading: false
            };

        case QUICKBOOKS_GET_AN_ACCOUNT_ACTION.SUCCESS:
            return {
                ...state,
                quickBooksAccount: action.payload.data.data || action.payload.data,
                loading: false
            };

        case QUICKBOOKS_GET_AN_ACCOUNT_ACTION.FAILURE:
            return {
                ...state,
                quickBooksAccountError: action.payload.errors,
                loading: false
            };

        case QUICKBOOKS_ACCOUNT_APIS_FORM_NAME_SUCCESS:
            return {
                ...state,
                quickBooksNewAccount: action.payload.data.data || action.payload.data,
                loading: false
            };

        case QUICKBOOKS_GET_COMPANY_INFO_ACTION.SUCCESS:
            return {
                ...state,
                quickBooksCompanyInfo: action.payload.data.data || action.payload.data,
                loading: false
            };

        // CUSTOMER
        case QUICKBOOKS_GET_CUSTOMERS_ACTION.SUCCESS:
            return {
                ...state,
                quickBooksCustomers: action.payload.data.data || action.payload.data,
                loading: false
            };

        case QUICKBOOKS_GET_CUSTOMERS_ACTION.FAILURE:
            return {
                ...state,
                quickBooksCustomerError: action.payload.errors,
                loading: false
            };

        case QUICKBOOKS_GET_A_CUSTOMER_ACTION.SUCCESS:
            return {
                ...state,
                quickBooksCustomer: action.payload.data.data || action.payload.data,
                loading: false
            };

        case QUICKBOOKS_GET_A_CUSTOMER_ACTION.FAILURE:
            return {
                ...state,
                quickBooksCustomerError: action.payload.errors,
                loading: false
            };

        case QUICKBOOKS_CUSTOMER_APIS_FORM_NAME_SUCCESS:
            return {
                ...state,
                quickBooksCustomer: action.payload.data.data || action.payload.data,
                loading: false
            };

        // ITEMS
        case QUICKBOOKS_GET_ITEMS_ACTION.SUCCESS:
            return {
                ...state,
                quickBooksItems: action.payload.data.data || action.payload.data,
                loading: false
            };

        case QUICKBOOKS_GET_ITEMS_ACTION.FAILURE:
            return {
                ...state,
                quickBooksItemError: action.payload.errors,
                loading: false
            };

        case QUICKBOOKS_GET_A_ITEM_ACTION.SUCCESS:
            return {
                ...state,
                quickBooksItem: action.payload.data.data || action.payload.data,
                loading: false
            };

        case QUICKBOOKS_GET_A_ITEM_ACTION.FAILURE:
            return {
                ...state,
                quickBooksItemError: action.payload.errors,
                loading: false
            };
        
        // INVOICE
        case QUICKBOOKS_GET_INVOICES_ACTION.SUCCESS:
            return {
                ...state,
                quickBooksInvoices: action.payload.data.data || action.payload.data,
                loading: false
            };

        case QUICKBOOKS_GET_INVOICES_ACTION.FAILURE:
            return {
                ...state,
                quickBooksInvoiceError: action.payload.errors,
                loading: false
            };

        case QUICKBOOKS_GET_A_INVOICE_ACTION.SUCCESS:
            return {
                ...state,
                quickBooksInvoice: action.payload.data.data || action.payload.data,
                loading: false
            };

        case QUICKBOOKS_GET_A_INVOICE_ACTION.FAILURE:
            return {
                ...state,
                quickBooksInvoiceError: action.payload.errors,
                loading: false
            };

        case QUICKBOOKS_INVOICE_APIS_FORM_NAME_SUCCESS:
            return {
                ...state,
                quickBooksInvoice: action.payload.data.data || action.payload.data,
                loading: false
            };
    

        default:
            return state;
    }
};

export default quickBooksApiReducer;
