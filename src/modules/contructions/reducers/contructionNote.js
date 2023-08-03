import { normalize } from 'normalizr';
import {
    LOAD_LIST_CONTRUCTION_NOTE_ACTION,
    DELETE_AN_CONTRUCTION_NOTE_ACTION,
    UPLOAD_CONTRUCTION_NOTE_FILES_ACTION,
    DELETE_AN_CONTRUCTION_NOTE_FILE_ACTION,
    CLEAR_CONTRUCTION_NOTE_DETAIL_ACTION,
    LOAD_EDITING_CONTRUCTION_NOTE_ACTION,
    DOC_EXPORT_CONTRUCTION_NOTES_TO_PDF
} from '../actions';
import {
    CONTRUCTION_NOTE_DETAIL_FORM_NAME_SUCCESS,
    CONTRUCTION_NOTE_DETAIL_FORM_NAME_FAILURE
} from '../constants';
import {contructionNotesSchema} from '../schema';

const defaultState = {
    notes: [],
    noteDetails: {},
    noteFiles: [],
    removedFiles: [],
    editingNote: null,
    remotePDF: null,
    pagination: {},
    errors: {}
};

const contructionReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_CONTRUCTION_NOTE_ACTION.SUCCESS:
            const apiRes = action.payload.data;
            const { total, limit, skip } = apiRes;
            return {
                ...state,
                notes: normalize(apiRes.data, contructionNotesSchema),
                pagination: { total, limit, skip },
                loading: false
            };

        case LOAD_EDITING_CONTRUCTION_NOTE_ACTION:
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

        case CONTRUCTION_NOTE_DETAIL_FORM_NAME_SUCCESS:
            const apiItem = action.payload.data.data || action.payload.data;
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

        case DELETE_AN_CONTRUCTION_NOTE_ACTION.SUCCESS:
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

        case UPLOAD_CONTRUCTION_NOTE_FILES_ACTION.SUCCESS:
            return {
                ...state,
                noteFiles: [
                    ...state.noteFiles,
                    action.payload.data.data.id || action.payload.data.id
                ]
            };

        case DELETE_AN_CONTRUCTION_NOTE_FILE_ACTION.ACTION:
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

        case CLEAR_CONTRUCTION_NOTE_DETAIL_ACTION:
            return {
                ...state,
                noteFiles: [],
                removedFiles: [],
                editingNote: null
            };

        case LOAD_LIST_CONTRUCTION_NOTE_ACTION.LOADING:
        case UPLOAD_CONTRUCTION_NOTE_FILES_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };

        case LOAD_LIST_CONTRUCTION_NOTE_ACTION.FAILURE:
        case CONTRUCTION_NOTE_DETAIL_FORM_NAME_FAILURE:
        case UPLOAD_CONTRUCTION_NOTE_FILES_ACTION.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };

        case DOC_EXPORT_CONTRUCTION_NOTES_TO_PDF.SUCCESS:
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

        default:
            return state;
    }
};

export default contructionReducer;