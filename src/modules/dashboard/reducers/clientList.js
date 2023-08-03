import { normalize } from 'normalizr';

import { LIST_CLIENTS_ACTION } from '../actions';
import { clientsSchema } from '../../clients/schema';

const defaultState = {
    clients: {},
    loading: false,
    errors: {}
};

const clientListReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LIST_CLIENTS_ACTION.SUCCESS:
            const apiRes = action.payload.data;
            return {
                ...state,
                clients: normalize(apiRes.data, clientsSchema),
                loading: false
            };
        case LIST_CLIENTS_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };
        case LIST_CLIENTS_ACTION.FAILURE:
            return {
                ...defaultState,
                errors: action.payload.error,
                loading: false
            };
        default:
            return state;
    }
};

export default clientListReducer;