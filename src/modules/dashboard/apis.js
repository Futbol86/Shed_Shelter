import {apiLoadClientList} from '../clients/apis';
import {apiLoadQuoteList, apiDeleteAQuote} from '../quotes/apis';

export const apiDashboardClients = (payload = {}) => {
    const newPayload = {...payload, limit: 5, sortBy: "updatedAt", sortDir: -1};
    return apiLoadClientList(newPayload);
};

export const apiDashboardQuotes = (payload = {}) => {
    const newPayload = {...payload, limit: 5, sortBy: "updatedDate", sortDir: -1};
    return apiLoadQuoteList(newPayload);
};

export const apiDashboardDeleteAQuote = (payload = {}) => {
    return apiDeleteAQuote(payload);
};
