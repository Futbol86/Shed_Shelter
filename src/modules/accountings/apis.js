import {httpClient, httpClient2, utils} from '../../services';
import {
    API_SUB_URL_QUICKBOOKS_AUTHORIZE_URI,
    API_SUB_URL_QUICKBOOKS_GET_COMPANY_INFO,

    API_SUB_URL_QUICKBOOKS_CREATE_NEW_DATA,
    API_SUB_URL_QUICKBOOKS_GET_DATAS_BY_QUERY_SQL,
    API_SUB_URL_QUICKBOOKS_GET_DATA_BY_ID
} from './constants';

export const apiQuickBooksAuthorizeUri = () => {
    var apiUrl = `${API_SUB_URL_QUICKBOOKS_AUTHORIZE_URI}`;
    return httpClient2.get(apiUrl);
};

// ** Company Info
export const apiQuickBooksGetCompanyInfo = ({CompanyId}) => {
    var apiUrl = `${API_SUB_URL_QUICKBOOKS_GET_COMPANY_INFO}?companyId=${CompanyId}`;
    return httpClient2.get(apiUrl);
};

export const apiQuickBooksCreateNewData = (payload) => {
    return httpClient2.post(`${API_SUB_URL_QUICKBOOKS_CREATE_NEW_DATA}`, payload);
};

export const apiQuickBooksGetDatasByQuerySQL = ({querySQL, MinorVersion}) => {
    var apiUrl = MinorVersion ? 
                    `${API_SUB_URL_QUICKBOOKS_GET_DATAS_BY_QUERY_SQL}?querySQL=${querySQL}&&MinorVersion=${MinorVersion}` :
                    `${API_SUB_URL_QUICKBOOKS_GET_DATAS_BY_QUERY_SQL}?querySQL=${querySQL}`;
    return httpClient2.get(apiUrl);
};

export const apiQuickBooksGetDataById = ({DataType, DataId, MinorVersion}) => {
    var apiUrl = MinorVersion ? 
                    `${API_SUB_URL_QUICKBOOKS_GET_DATA_BY_ID}?DataType=${DataType}&&DataId=${DataId}&&MinorVersion=${MinorVersion}` :
                    `${API_SUB_URL_QUICKBOOKS_GET_DATA_BY_ID}?DataType=${DataType}&&DataId=${DataId}`;
    return httpClient2.get(apiUrl);
};