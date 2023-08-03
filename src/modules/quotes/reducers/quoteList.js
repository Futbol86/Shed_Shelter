import {
    LOAD_LIST_QUOTES_ACTION, LOAD_LIST_QUOTES_ATTACHED_NOTE_AND_TEXT_ACTION, 
    DELETE_A_QUOTE_ACTION, LOCK_A_QUOTE_ACTION, QD_AD_DELETE_A_NOTE_OF_QUOTES_ATTACHED,
    DOC_EXPORT_QUOTES_TO_PDF_ACTION, DOC_CLEAR_QUOTES_PDF_ACTION
} from '../actions';
import {normalize} from 'normalizr';
import {quotesSchema} from "../schema";
import {QUOTES_LIST_FILTER_FORM_NAME_SUBMIT, QUOTES_LIST_FILTER_FORM_NAME_SUCCESS} from "../constants";

const defaultState = {
    quotes: [],
    remotePDF: null,
    loading: false,
    pagination: {},
    errors: {}
};

const quoteListReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_QUOTES_ACTION.SUCCESS:
            const apiRes = action.payload.data;
            const { total, limit, skip } = apiRes;
            return {
                ...state,
                quotes: normalize(apiRes.data, quotesSchema),
                pagination: { total, limit, skip },
                loading: false
            };
        case LOAD_LIST_QUOTES_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };
        case LOAD_LIST_QUOTES_ACTION.FAILURE:
            return {
                ...defaultState,
                errors: action.payload.error,
                loading: false
            };

        case LOAD_LIST_QUOTES_ATTACHED_NOTE_AND_TEXT_ACTION.SUCCESS:
            const apiQANATRes = action.payload.data;
            return {
                ...state,
                quotes: normalize(apiQANATRes.data, quotesSchema),
                pagination: { total: apiQANATRes.total, limit: apiQANATRes.limit, skip: apiQANATRes.skip },
                loading: false
            };
        case LOAD_LIST_QUOTES_ATTACHED_NOTE_AND_TEXT_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };
        case LOAD_LIST_QUOTES_ATTACHED_NOTE_AND_TEXT_ACTION.FAILURE:
            return {
                ...defaultState,
                errors: action.payload.error,
                loading: false
            };

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

        case DELETE_A_QUOTE_ACTION.LOADING:
        case LOCK_A_QUOTE_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };
        case DELETE_A_QUOTE_ACTION.FAILURE:
        case LOCK_A_QUOTE_ACTION.FAILURE:
            return {
                ...state,
                errors: action.payload.error
            };

        case QUOTES_LIST_FILTER_FORM_NAME_SUBMIT:
            //-- Set filter and reset pagination before submitting API call
            return {
                ...state,
                filter: action.payload
            };

        case QUOTES_LIST_FILTER_FORM_NAME_SUCCESS:
            return {
                ...state,
                filter: action.payload
            };

        case QD_AD_DELETE_A_NOTE_OF_QUOTES_ATTACHED.SUCCESS:
            let quoteValues = Object.values(state.quotes.entities.quotes);
            for(let i = 0; i < quoteValues.length; i++) {
                let notes = quoteValues[i].notes;
                let findDeletedNoteIdx = notes.findIndex(note => note.id === action.payload.data.id);

                if(findDeletedNoteIdx !== -1) {
                    quoteValues[i].notes.splice(findDeletedNoteIdx, 1);
                }
            }

            return {
                ...state,
                loading: false
            };

        case DOC_EXPORT_QUOTES_TO_PDF_ACTION.SUCCESS:
            const rs = action.payload.data;
            let pdfBuffer;
            if (rs && rs.data) {
                pdfBuffer = rs.data;
            }
            else
                pdfBuffer = rs;

            return {
                ...state,
                remotePDF: pdfBuffer,
            };

        case DOC_CLEAR_QUOTES_PDF_ACTION:
            return {
                ...state,
                remotePDF: null,
            }
        default:
            return state;
    }
};

export default quoteListReducer;