import {createSelector} from 'reselect';
import {MODULE_ID, SCHEMA_QUOTES, SCHEMA_CLIENTS} from "./constants";
import {utils} from '../../services';

const getClientsListFunc    = (state) => {
    const currentSelectedState = state[MODULE_ID].clientList.clients;
    return utils.getItemListInStateTree(currentSelectedState, SCHEMA_CLIENTS);
};

const getQuotesListFunc     = (state) => {
    const currentSelectedState = state[MODULE_ID].quoteList.quotes;
    return utils.getItemListInStateTree(currentSelectedState, SCHEMA_QUOTES);
};

export const getClientsList = createSelector(
    getClientsListFunc,
    (clients) => clients
);

export const getQuotesList = createSelector(
    getQuotesListFunc,
    (clients) => clients
);