import { normalize } from 'normalizr';
import {
    LOAD_LIST_ORDER_NOTE_ACTION,
    DELETE_AN_ORDER_NOTE_ACTION,
    UPLOAD_ORDER_NOTE_FILES_ACTION,
    DELETE_AN_ORDER_NOTE_FILE_ACTION,
    CLEAR_ORDER_NOTE_DETAIL_ACTION,
    LOAD_EDITING_ORDER_NOTE_ACTION
} from '../actions';
import {
    ORDER_NOTE_DETAIL_FORM_NAME_SUCCESS,
    ORDER_NOTE_DETAIL_FORM_NAME_FAILURE
} from '../constants';
import {orderNotesSchema} from '../schema';

const defaultState = {
    notes: [],
    noteDetails: {},
    noteFiles: [],
    removedFiles: [],
    editingNote: null,
    pagination: {},
    errors: {}
};

const orderReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_ORDER_NOTE_ACTION.SUCCESS:
            const apiRes = action.payload.data;
            const { total, limit, skip } = apiRes;
            return {
                ...state,
                notes: normalize(apiRes.data, orderNotesSchema),
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_EDITING_ORDER_NOTE_ACTION:
            if (action.payload.note) {
                const currentNoteFiles = action.payload.note && action.payload.note.fileRelPaths;
                return {
                    ...state,
                    editingNote: action.payload.note,
                    noteFiles: currentNoteFiles,
                    removedFiles: []
                }
            }
            else
                return state;

        case ORDER_NOTE_DETAIL_FORM_NAME_SUCCESS:
            const apiItem = action.payload.data;
            if (apiItem && apiItem.id) {
                const {entities: oldEntities, result: oldResult} = state.notes;
                return {
                    ...state,
                    notes: {
                        entities: {
                            notes: {
                                ...oldEntities.notes,
                                [apiItem.id]: apiItem
                            }
                        },
                        result: [
                            apiItem.id,
                            ...(oldResult && oldResult.filter(itemIdx => itemIdx !== apiItem.id))
                        ]
                    },
                    pagination: {
                        ...state.pagination,
                        total: state.pagination.total + 1
                    },
                    loading: false,
                    noteFiles: [],
                    removedFiles: [],
                    editingNote: null
                };
            }
            else 
                return state;

        case DELETE_AN_ORDER_NOTE_ACTION.SUCCESS:
            const {id: oldId} = action.payload.data.data || action.payload.data;
            const {entities: oldEntities, result: oldResult} = state.notes;
            return {
                ...state,
                notes: {
                    entities: oldEntities,
                    result: oldResult.filter(idx  => idx !== oldId)
                },
                loading: false,
                editingNote: null
            };

        case UPLOAD_ORDER_NOTE_FILES_ACTION.SUCCESS:
            return {
                ...state,
                noteFiles: [
                    ...state.noteFiles,
                    action.payload.data.id
                ]
            };

        case DELETE_AN_ORDER_NOTE_FILE_ACTION.ACTION:
            const fileToRemove = state.noteFiles && state.noteFiles.find(item => item === action.payload.id);
            if (fileToRemove) {
                return {
                    ...state,
                    noteFiles: state.noteFiles.filter(item => item !== fileToRemove),
                    removedFiles: [
                        ...state.removedFiles,
                        fileToRemove
                    ]
                };
            }
            else
                return state;

        case CLEAR_ORDER_NOTE_DETAIL_ACTION:
            return {
                ...state,
                noteFiles: [],
                removedFiles: [],
                editingNote: null
            };

        case LOAD_LIST_ORDER_NOTE_ACTION.LOADING:
        case UPLOAD_ORDER_NOTE_FILES_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };

        case LOAD_LIST_ORDER_NOTE_ACTION.FAILURE:
        case ORDER_NOTE_DETAIL_FORM_NAME_FAILURE:
        case UPLOAD_ORDER_NOTE_FILES_ACTION.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };
        default:
            return state;
    }
};

export default orderReducer;