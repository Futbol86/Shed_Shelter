import {createSelector} from 'reselect';
import {MODULE_ID, SCHEMA_CLIENTS} from "./constants";
import {utils} from "../../services";
import {PREDEFINED_AUSTRALIAN_CITIES} from '../../constants';

const getClientsListFunc = (state) => {
    const currentSelectedState = state[MODULE_ID].clientList.clients;
    return utils.getItemListInStateTree(currentSelectedState, SCHEMA_CLIENTS);
};

const getPredefinedCitiesForACFieldFunc = () => (
    PREDEFINED_AUSTRALIAN_CITIES.map(
        city => ({
            value: city,
            label: city
        })
    )
);

export const getPredefinedCitiesForACField = createSelector(
    getPredefinedCitiesForACFieldFunc,
    (cities) => cities
);

export const getClientsList = createSelector(
    getClientsListFunc,
    (clients) => clients
);

export const getPaginationInfo  = (state) => state[MODULE_ID].clientList.pagination;
export const getFilterInfo      = (state) => state[MODULE_ID].clientList.filter;

export const getClientInfo      = (state) => state[MODULE_ID].clientDetail.client;