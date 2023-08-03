export const MODULE_ID                                    = 'accountings';
export const API_SUB_URL_QUICKBOOKS_AUTHORIZE_URI         = '/quickbooks-authorize-api';
export const API_SUB_URL_QUICKBOOKS_GET_ACCOUNTS          = '/quickbooks-get-accounts';
export const API_SUB_URL_QUICKBOOKS_GET_ACCOUNT           = '/quickbooks-get-account';
export const API_SUB_URL_QUICKBOOKS_CREATE_NEW_ACCOUNT    = '/quickbooks-create-new-account';

export const API_SUB_URL_QUICKBOOKS_GET_COMPANY_INFO      = '/quickbooks-get-company-info';

export const API_SUB_URL_QUICKBOOKS_GET_CUSTOMERS         = '/quickbooks-get-customers';
export const API_SUB_URL_QUICKBOOKS_GET_CUSTOMER          = '/quickbooks-get-customer';
export const API_SUB_URL_QUICKBOOKS_CREATE_NEW_CUSTOMER   = '/quickbooks-create-new-customer';

export const API_SUB_URL_QUICKBOOKS_GET_ITEMS             = '/quickbooks-get-items';
export const API_SUB_URL_QUICKBOOKS_GET_ITEM              = '/quickbooks-get-item';
export const API_SUB_URL_QUICKBOOKS_CREATE_NEW_ITEM       = '/quickbooks-create-new-item';

export const API_SUB_URL_QUICKBOOKS_CREATE_NEW_DATA       = '/quickbooks-create-new-data';
export const API_SUB_URL_QUICKBOOKS_GET_DATAS_BY_QUERY_SQL = '/quickbooks-get-datas-by-querySQL';
export const API_SUB_URL_QUICKBOOKS_GET_DATA_BY_ID        = '/quickbooks-get-data-by-Id';

export const QUICK_BOOKS_APIS_FORM_NAME                   = 'QUICK_BOOKS_APIS_FORM_NAME';

export const QUICKBOOKS_ACCOUNT_APIS_FORM_NAME            = 'QUICKBOOKS_ACCOUNT_APIS_FORM';
export const QUICKBOOKS_ACCOUNT_APIS_FORM_NAME_SUBMIT     = QUICKBOOKS_ACCOUNT_APIS_FORM_NAME + '_SUBMIT';
export const QUICKBOOKS_ACCOUNT_APIS_FORM_NAME_SUCCESS    = QUICKBOOKS_ACCOUNT_APIS_FORM_NAME + '_SUCCESS';
export const QUICKBOOKS_ACCOUNT_APIS_FORM_NAME_FAILURE    = QUICKBOOKS_ACCOUNT_APIS_FORM_NAME + '_FAILURE';

export const QUICKBOOKS_CUSTOMER_APIS_FORM_NAME           = 'QUICKBOOKS_CUSTOMER_APIS_FORM';
export const QUICKBOOKS_CUSTOMER_APIS_FORM_NAME_SUBMIT    = QUICKBOOKS_CUSTOMER_APIS_FORM_NAME + '_SUBMIT';
export const QUICKBOOKS_CUSTOMER_APIS_FORM_NAME_SUCCESS   = QUICKBOOKS_CUSTOMER_APIS_FORM_NAME + '_SUCCESS';
export const QUICKBOOKS_CUSTOMER_APIS_FORM_NAME_FAILURE   = QUICKBOOKS_CUSTOMER_APIS_FORM_NAME + '_FAILURE';

export const QUICKBOOKS_ITEM_APIS_FORM_NAME               = 'QUICKBOOKS_ITEM_APIS_FORM';
export const QUICKBOOKS_ITEM_APIS_FORM_NAME_SUBMIT        = QUICKBOOKS_ITEM_APIS_FORM_NAME + '_SUBMIT';
export const QUICKBOOKS_ITEM_APIS_FORM_NAME_SUCCESS       = QUICKBOOKS_ITEM_APIS_FORM_NAME + '_SUCCESS';
export const QUICKBOOKS_ITEM_APIS_FORM_NAME_FAILURE       = QUICKBOOKS_ITEM_APIS_FORM_NAME + '_FAILURE';

export const QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM_NAME               = 'QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM';
export const QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM_NAME_SUBMIT        = QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM_NAME + '_SUBMIT';
export const QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM_NAME_SUCCESS       = QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM_NAME + '_SUCCESS';
export const QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM_NAME_FAILURE       = QUICKBOOKS_ITEM_APIS_CREATE_NEW_CATEGORY_FORM_NAME + '_FAILURE';

export const QUICKBOOKS_INVOICE_APIS_FORM_NAME            = 'QUICKBOOKS_INVOICE_APIS_FORM';
export const QUICKBOOKS_INVOICE_APIS_FORM_NAME_SUBMIT     = QUICKBOOKS_INVOICE_APIS_FORM_NAME + '_SUBMIT';
export const QUICKBOOKS_INVOICE_APIS_FORM_NAME_SUCCESS    = QUICKBOOKS_INVOICE_APIS_FORM_NAME + '_SUCCESS';
export const QUICKBOOKS_INVOICE_APIS_FORM_NAME_FAILURE    = QUICKBOOKS_INVOICE_APIS_FORM_NAME + '_FAILURE';

export const ACCOUNT_TYPE = [
    {id: 1, code: "Bank", name: "ASSET - Bank"},
    {id: 2, code: "Other Current Asset", name: "ASSET - Other Current Asset"},
    {id: 3, code: "Fixed Asset", name: "ASSET - Fixed Asset"},
    {id: 4, code: "Other Asset", name: "ASSET - Other Asset"},
    {id: 5, code: "Accounts Receivable", name: "ASSET - Accounts Receivable"}, // Default
    {id: 6, code: "Equity", name: "EQUITY - Equity"},
    {id: 7, code: "Expense", name: "EXPENSE - Expense"},
    {id: 8, code: "Other Expense", name: "EXPENSE - Other Expense"},
    {id: 9, code: "Cost of Goods Sold", name: "EXPENSE - Cost of Goods Sold"},
    {id: 10, code: "Accounts Payable", name: "LIABILITY - Accounts Payable"},
    {id: 11, code: "Credit Card", name: "LIABILITY - Credit Card"},
    {id: 12, code: "Long Term Liability", name: "LIABILITY - Long Term Liability"},
    {id: 13, code: "Other Current Liability", name: "LIABILITY - Other Current Liability"},
    {id: 14, code: "Income", name: "REVENUE - Income"},
    {id: 15, code: "Other Income", name: "REVENUE - Other Income"},
];

export const ITEM_TYPE = [
    {code: "Inventory", name: "Inventory"},
    {code: "Group", name: "Group"},
    {code: "Service", name: "Service"},
    {code: "NonInventory", name: "Non Inventory"},
    {code: "Category", name: "Category"},
];

export const INVOICE_LINE_DETAIL_TYPE = [
    {code: "SalesItemLineDetail", name: "Sales Item Line Detail"}
];

export const MYOB_APIS_FORM_NAME                   = 'MYOB_APIS_FORM_NAME';