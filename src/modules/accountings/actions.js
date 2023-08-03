import { defineAction } from 'redux-define';
import {createAction} from 'redux-actions';
import {LOADING, FAILURE, SUCCESS} from '../../constants';

export const QUICKBOOKS_AUTHORIZE_URI_ACTION      = defineAction('QUICKBOOKS_AUTHORIZE_URI_ACTION',  [LOADING, FAILURE, SUCCESS], 'accountings');
export const CLEAR_QUICKBOOKS_REDIRECT_URI_ACTION = 'CLEAR_QUICKBOOKS_REDIRECT_URI_ACTION';

export const QUICKBOOKS_GET_COMPANY_INFO_ACTION   = defineAction('QUICKBOOKS_GET_COMPANY_INFO_ACTION',  [LOADING, FAILURE, SUCCESS], 'accountings');

export const QUICKBOOKS_GET_ACCOUNTS_ACTION       = defineAction('QUICKBOOKS_GET_ACCOUNTS_ACTION',  [LOADING, FAILURE, SUCCESS], 'accountings');
export const QUICKBOOKS_GET_AN_ACCOUNT_ACTION     = defineAction('QUICKBOOKS_GET_AN_ACCOUNT_ACTION',  [LOADING, FAILURE, SUCCESS], 'accountings');
export const QUICKBOOKS_CREATE_NEW_ACCOUNT_ACTION = defineAction('QUICKBOOKS_CREATE_NEW_ACCOUNT_ACTION',  [LOADING, FAILURE, SUCCESS], 'accountings');

export const QUICKBOOKS_GET_CUSTOMERS_ACTION       = defineAction('QUICKBOOKS_GET_CUSTOMERS_ACTION',  [LOADING, FAILURE, SUCCESS], 'accountings');
export const QUICKBOOKS_GET_A_CUSTOMER_ACTION      = defineAction('QUICKBOOKS_GET_A_CUSTOMER_ACTION',  [LOADING, FAILURE, SUCCESS], 'accountings');
export const QUICKBOOKS_CREATE_NEW_CUSTOMER_ACTION = defineAction('QUICKBOOKS_CREATE_NEW_CUSTOMER_ACTION', [LOADING, FAILURE, SUCCESS], 'accountings');

export const QUICKBOOKS_GET_ITEMS_ACTION           = defineAction('QUICKBOOKS_GET_ITEMS_ACTION',  [LOADING, FAILURE, SUCCESS], 'accountings');
export const QUICKBOOKS_GET_A_ITEM_ACTION          = defineAction('QUICKBOOKS_GET_A_ITEM_ACTION',  [LOADING, FAILURE, SUCCESS], 'accountings');
export const QUICKBOOKS_CREATE_NEW_ITEM_ACTION     = defineAction('QUICKBOOKS_CREATE_NEW_ITEM_ACTION', [LOADING, FAILURE, SUCCESS], 'accountings');

export const QUICKBOOKS_GET_CATEGORIES_ACTION      = defineAction('QUICKBOOKS_GET_CATEGORIES_ACTION',  [LOADING, FAILURE, SUCCESS], 'accountings');
export const QUICKBOOKS_GET_A_CATEGORY_ACTION      = defineAction('QUICKBOOKS_GET_A_CATEGORY_ACTION',  [LOADING, FAILURE, SUCCESS], 'accountings');

export const QUICKBOOKS_GET_INVOICES_ACTION        = defineAction('QUICKBOOKS_GET_INVOICES_ACTION',  [LOADING, FAILURE, SUCCESS], 'accountings');
export const QUICKBOOKS_GET_A_INVOICE_ACTION       = defineAction('QUICKBOOKS_GET_A_INVOICE_ACTION',  [LOADING, FAILURE, SUCCESS], 'accountings');
export const QUICKBOOKS_CREATE_NEW_INVOICE_ACTION  = defineAction('QUICKBOOKS_CREATE_NEW_INVOICE_ACTION', [LOADING, FAILURE, SUCCESS], 'accountings');

export const doQuickBooksAuthorizeUri              = createAction(QUICKBOOKS_AUTHORIZE_URI_ACTION.ACTION);
export const clearQuickBooksRedirectUri            = createAction(CLEAR_QUICKBOOKS_REDIRECT_URI_ACTION);

export const doQuickBooksGetCompanyInfo            = createAction(QUICKBOOKS_GET_COMPANY_INFO_ACTION.ACTION);

export const doQuickBooksGetAccounts               = createAction(QUICKBOOKS_GET_ACCOUNTS_ACTION.ACTION);
export const doQuickBooksGetAnAccount              = createAction(QUICKBOOKS_GET_AN_ACCOUNT_ACTION.ACTION);

export const doQuickBooksGetCustomers              = createAction(QUICKBOOKS_GET_CUSTOMERS_ACTION.ACTION);
export const doQuickBooksGetACustomer              = createAction(QUICKBOOKS_GET_A_CUSTOMER_ACTION.ACTION);

export const doQuickBooksGetItems                  = createAction(QUICKBOOKS_GET_ITEMS_ACTION.ACTION);
export const doQuickBooksGetAItem                  = createAction(QUICKBOOKS_GET_A_ITEM_ACTION.ACTION);

export const doQuickBooksGetCategories             = createAction(QUICKBOOKS_GET_CATEGORIES_ACTION.ACTION);
export const doQuickBooksGetACategory              = createAction(QUICKBOOKS_GET_A_CATEGORY_ACTION.ACTION);

export const doQuickBooksGetInvoices               = createAction(QUICKBOOKS_GET_INVOICES_ACTION.ACTION);
export const doQuickBooksGetAInvoice               = createAction(QUICKBOOKS_GET_A_INVOICE_ACTION.ACTION);

