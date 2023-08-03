import { GET_A_CLIENTS_INFO } from '../actions';
import {LOCK_A_QUOTE_ACTION} from "../../quotes/actions";
import {DELETE_A_QUOTE_ACTION} from "../../dashboard/actions";

const defaultState = {
    client: {},
    loading: false
};

const clientDetailReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case GET_A_CLIENTS_INFO.SUCCESS:
            return {
                ...state,
                client: action.payload.data || action.payload.data.data,
                loading: false
            };
        case GET_A_CLIENTS_INFO.LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_A_CLIENTS_INFO.FAILURE:
            return {
                ...defaultState,
                errors: action.payload.error,
                loading: false
            };

        case LOCK_A_QUOTE_ACTION.SUCCESS:
            const {id, status} = action.payload.data.data || action.payload.data;
            const oldQuoteList = state.client && state.client.latestQuotes;
            if (oldQuoteList) {
                const newQuoteList = oldQuoteList.map( item => (item.id === id) ? {...item, status} : item );
                return {
                    ...state,
                    client: {
                        ...state.client,
                        latestQuotes: newQuoteList
                    }
                };
            }
            return state;

        case DELETE_A_QUOTE_ACTION.SUCCESS:
            const {id: oldId} = action.payload.data.data || action.payload.data;
            const oldQuotes = state.client && state.client.latestQuotes;
            return {
                ...state,
                client: {
                    ...state.client,
                    latestQuotes: oldQuotes.filter(idx  => idx.id !== oldId)
                }
            };

        case GET_A_CLIENTS_INFO.ACTION:
            return defaultState;

        default:
            return state;
    }
};

export default clientDetailReducer;