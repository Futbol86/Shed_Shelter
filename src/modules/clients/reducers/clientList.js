import { normalize } from 'normalizr';

import { LOAD_LIST_CLIENTS_ACTION } from '../actions';
import { clientsSchema } from '../schema';
import {CLIENTS_LIST_FILTER_FORM_NAME_SUBMIT} from "../constants";

const defaultState = {
    clients: [],
    loading: false,
    pagination: {},
    filter: {search: '', state: ''},
    errors: {}
};

const clientListReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_CLIENTS_ACTION.SUCCESS:
            const apiRes = action.payload.data;
            const { total, limit, skip } = apiRes;
            return {
                ...state,
                clients: normalize(apiRes.data, clientsSchema),
                pagination: { total, limit, skip },
                loading: false
            };
        case LOAD_LIST_CLIENTS_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };
        case LOAD_LIST_CLIENTS_ACTION.FAILURE:
            return {
                ...defaultState,
                errors: action.payload.error,
                loading: false
            };
        case CLIENTS_LIST_FILTER_FORM_NAME_SUBMIT:
            //-- Set filter and reset pagination before submitting API call
            return {
                ...state,
                filter: action.payload
            };
        default:
            return state;
    }
};

export default clientListReducer;