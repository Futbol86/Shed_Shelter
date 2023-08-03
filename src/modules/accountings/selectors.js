import {MODULE_ID} from "./constants";
import {utils} from "../../services";

export const getQuickBooksUri              = (state) => state[MODULE_ID].quickBooksApi.quickBooksUri;
export const getQuickBooksCompanyInfo      = (state) => state[MODULE_ID].quickBooksApi.quickBooksCompanyInfo;

export const getQuickBooksAccounts         = (state) => state[MODULE_ID].quickBooksApi.quickBooksAccounts;
export const getQuickBooksAccount          = (state) => state[MODULE_ID].quickBooksApi.quickBooksAccount;
export const getQuickBooksNewAccount       = (state) => state[MODULE_ID].quickBooksApi.quickBooksNewAccount;

export const getQuickBooksCustomers        = (state) => state[MODULE_ID].quickBooksApi.quickBooksCustomers;
export const getQuickBooksCustomer         = (state) => state[MODULE_ID].quickBooksApi.quickBooksCustomer;

export const getQuickBooksItems            = (state) => state[MODULE_ID].quickBooksApi.quickBooksItems;
export const getQuickBooksItem             = (state) => state[MODULE_ID].quickBooksApi.quickBooksItem;

export const getQuickBooksInvoices         = (state) => state[MODULE_ID].quickBooksApi.quickBooksInvoices;
export const getQuickBooksInvoice          = (state) => state[MODULE_ID].quickBooksApi.quickBooksInvoice;

export const getQuickBooksAccountError     = (state) => state[MODULE_ID].quickBooksApi.quickBooksAccountError;
export const getQuickBooksCustomerError    = (state) => state[MODULE_ID].quickBooksApi.quickBooksCustomerError;
export const getQuickBooksItemError        = (state) => state[MODULE_ID].quickBooksApi.quickBooksItemError;
export const getQuickBooksInvoiceError     = (state) => state[MODULE_ID].quickBooksApi.quickBooksInvoiceError;