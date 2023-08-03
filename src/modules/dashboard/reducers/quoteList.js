import { LIST_QUOTES_ACTION, DELETE_A_QUOTE_ACTION } from '../actions';
import {normalize} from 'normalizr';
import {quotesSchema} from "../../quotes/schema";
import {LOCK_A_QUOTE_ACTION} from "../../quotes/actions";

const defaultState = {
    quotes: {},
    loading: false,
    errors: {}
};

const quoteListReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LIST_QUOTES_ACTION.SUCCESS:
            const apiRes = action.payload.data;
            return {
                ...state,
                quotes: normalize(apiRes.data, quotesSchema),
                loading: false
            };
        case LIST_QUOTES_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };
        case LIST_QUOTES_ACTION.FAILURE:
            return {
                ...defaultState,
                errors: action.payload.error,
                loading: false
            };

        case LOCK_A_QUOTE_ACTION.SUCCESS:
            const {id, status} = action.payload.data.data || action.payload.data;
            const oldQuoteList = state.quotes && state.quotes.entities && state.quotes.entities.quotes;
            if (oldQuoteList) {
                const newQuoteList = {
                    ...oldQuoteList,
                    [id]: {
                        ...oldQuoteList[id],
                        status
                    }
                };
                return {
                    ...state,
                    quotes: {
                        ...state.quotes,
                        entities: {
                            quotes: newQuoteList
                        }
                    }
                };
            }
            return state;

        case DELETE_A_QUOTE_ACTION.SUCCESS:
            const {id: oldId} = action.payload.data.data || action.payload.data;
            const {entities: oldEntities, result: oldResult} = state.quotes;
            return {
                ...state,
                quotes: {
                    entities: oldEntities,  //-- Trick: who cares if the deleted object is cached?
                    result: oldResult.filter(idx  => idx !== oldId)
                },
                loading: false
            };
        case DELETE_A_QUOTE_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };
        case DELETE_A_QUOTE_ACTION.FAILURE:
            return {
                ...state,
                errors: action.payload.error
            };

        default:
            return state;
    }
};

export default quoteListReducer;