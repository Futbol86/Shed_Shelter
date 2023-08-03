import {
    QD_AD_SEND_TEXT_MESSAGE,
    QD_AD_SEND_TEXT_MESSAGE_CLIENTS,
    QD_AD_CLEAR_TEXT_MESSAGE_CLIENT_RESULTS,
    QD_ADMINISTRATION_CHANGE_MODAL,
    QD_ADMINISTRATION_SET_ACTIVE_COMPONENT,
    QD_AD_LOAD_LIST_TEXT_MESSAGES,
    QD_AD_LOAD_LIST_NOTES,
    QD_AD_ADD_A_NOTE,
    QD_AD_UPDATE_A_NOTE,
    QD_AD_DELETE_A_NOTE,
    QD_AD_SET_CHECKED_QUOTES
} from '../actions';

const defaultState = {
    currentModalId: 0,
    activeComponent: null,
    notes: [],
    displayedTextMessages: [],
    textMessagesPagination: {},
    notesPagination: {},
    lastTextMessage: {},
    findUs: {},
    checkedQuotes: [],
    textMessageClientResults: [],
    loading: false,
    errors: {}
}

const quoteDetailAdministration = (state = defaultState, action = {}) => {
    let apiRes;

    switch (action.type) {
        case QD_AD_SEND_TEXT_MESSAGE.SUCCESS:
            const textMessage = action.payload.data || action.payload.data.data;
            return {
                ...state,
                lastTextMessage: textMessage,
                loading: false
            };

        case QD_AD_SEND_TEXT_MESSAGE_CLIENTS.SUCCESS:
            const tmcResults = action.payload.data.data || action.payload.data;
            return {
                ...state,
                textMessageClientResults: tmcResults,
                loading: false
            };

        case QD_AD_CLEAR_TEXT_MESSAGE_CLIENT_RESULTS:
            return {
                ...state,
                textMessageClientResults: []
            }

        case QD_ADMINISTRATION_CHANGE_MODAL:
            return {
                ...state,
                currentModalId: action.payload.componentId
            };

        case QD_ADMINISTRATION_SET_ACTIVE_COMPONENT:
            return {
                ...state,
                activeComponent: action.payload.component
            };
        
        case QD_AD_LOAD_LIST_NOTES.SUCCESS:
            apiRes = action.payload.data;
            if (apiRes) {
                const { total, limit, skip } = apiRes;
                return {
                    ...state,
                    notes: apiRes.data,
                    notesPagination: { total, limit, skip },
                    loading: false
                };
            } else {
                return {
                    ...state,
                    loading: true
                };
            }

        case QD_AD_ADD_A_NOTE.SUCCESS:
            const note = action.payload.data || action.payload.data.data;
            return {
                ...state,
                notes: [
                    note,
                    ...state.notes
                ],
                notesPagination: {
                    ...state.notesPagination,
                    total: state.notesPagination.total ? state.notesPagination.total + 1 : 1
                },
                loading: false
            };

        case QD_AD_UPDATE_A_NOTE.SUCCESS:
            const updatedNote = action.payload.data.data || action.payload.data;
            let updatedNotes = [...state.notes];
            const noteIdx = updatedNotes.findIndex(note => note.id === updatedNote.id);
            if (noteIdx > -1) {
                updatedNotes[noteIdx] = updatedNote;
                return {
                    ...state,
                    notes: updatedNotes,
                    loading: false
                };
            } else {
                return {
                    ...state,
                    loading: true
                };
            }

        case QD_AD_DELETE_A_NOTE.SUCCESS:
            const {id: oldId} = action.payload.data.data || action.payload.data;
            return {
                ...state,
                notes: state.notes.filter(note  => note.id !== oldId),
                notesPagination: {
                    ...state.notesPagination,
                    total: state.notesPagination.total ? state.notesPagination.total - 1 : 0
                },
                loading: false
            };

        case QD_AD_LOAD_LIST_TEXT_MESSAGES.SUCCESS:
            apiRes = action.payload.data;
            if (apiRes) {
                const textMessages = apiRes.data;
                const { total, limit, skip } = apiRes;
                return {
                    ...state,
                    displayedTextMessages: textMessages.map((textMessage, idx) => {
                        return {
                            index: total - (skip + idx),
                            ...textMessage
                        }
                    }),
                    textMessagesPagination: { total, limit, skip },
                    loading: false
                };
            } else {
                return {
                    ...state,
                    loading: true
                };
            }

        case QD_AD_SEND_TEXT_MESSAGE.LOADING:
        case QD_AD_LOAD_LIST_TEXT_MESSAGES.LOADING:
        case QD_AD_ADD_A_NOTE.LOADING:
        case QD_AD_UPDATE_A_NOTE.LOADING:
        case QD_AD_DELETE_A_NOTE.LOADING:
            return {
                ...state,
                loading: true
            };

        case QD_AD_SEND_TEXT_MESSAGE.FAILURE:
        case QD_AD_LOAD_LIST_TEXT_MESSAGES.FAILURE:
        case QD_AD_LOAD_LIST_NOTES.FAILURE:
        case QD_AD_ADD_A_NOTE.FAILURE:
        case QD_AD_UPDATE_A_NOTE.FAILURE:
        case QD_AD_DELETE_A_NOTE.FAILURE:
            return {
                ...defaultState,
                errors: action.payload.error,
                loading: false
            };

        case QD_AD_SET_CHECKED_QUOTES:
            return {
                ...state,
                checkedQuotes: action.payload
            }

        default: 
            return state;
    }
}

export default quoteDetailAdministration;