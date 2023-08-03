import { ADD_NEW_CLIENT_ACTION } from '../actions';
import {CLIENTS_ADD_FORM_NAME_SUCCESS, CLIENTS_ADD_FORM_NAME_FAILURE} from '../constants';

const defaultState = {
    client: {},
    loading: false
};

const clientAddReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case CLIENTS_ADD_FORM_NAME_SUCCESS:
            return {
                ...state,
                client: action.payload.data || action.payload.data.data,
                loading: false
            };
        case ADD_NEW_CLIENT_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };
        case CLIENTS_ADD_FORM_NAME_FAILURE:
            return {
                ...defaultState,
                errors: action.payload.error,
                loading: false
            };
        default:
            return state;
    }
};

export default clientAddReducer;