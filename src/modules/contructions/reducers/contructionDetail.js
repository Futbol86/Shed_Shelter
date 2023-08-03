import { 
    LOAD_AN_CONTRUCTION_INFO_ACTION,
    ACCEPT_AN_CONTRUCTION_ACTION,
    REJECT_AN_CONTRUCTION_ACTION,
    CLEAR_CONTRUCTION_DETAIL_ACTION,
    UPLOAD_CONTRUCTION_ATTACH_FILES_ACTION,
    DELETE_AN_CONTRUCTION_ATTACH_FILE_ACTION
} from '../actions';

const defaultState = {
    contructionDetails: null,
    attachFiles: [],
    removedFiles: [],
    isContructionAccepted: false,
    isContructionRejected: false,
    errors: {}
};

const contructionReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case ACCEPT_AN_CONTRUCTION_ACTION.SUCCESS:
            return {
                ...state,
                isContructionAccepted: true,
                isContructionRejected: false,
                loading: false
            }

        case REJECT_AN_CONTRUCTION_ACTION.SUCCESS:
            return {
                ...state,
                isContructionAccepted: false,
                isContructionRejected: true,
                loading: false
            }

        case LOAD_AN_CONTRUCTION_INFO_ACTION.SUCCESS:
            const apiRes = action.payload.data.data && action.payload.data.data.length ? action.payload.data.data[0] : {};
            return {
                ...state,
                contructionDetails: apiRes,
                isContructionAccepted: false,
                isContructionRejected: false,
                loading: false
            };

        case UPLOAD_CONTRUCTION_ATTACH_FILES_ACTION.SUCCESS:
            return {
                ...state,
                attachFiles: [
                    ...state.attachFiles,
                    action.payload.data.data.id || action.payload.data.id
                ]
            };

        case DELETE_AN_CONTRUCTION_ATTACH_FILE_ACTION.ACTION:
            const fileToRemove = state.attachFiles && state.attachFiles.find(item => item === action.payload.id);
            if (fileToRemove) {
                return {
                    ...state,
                    attachFiles: state.attachFiles.filter(item => item !== fileToRemove),
                    removedFiles: [
                        ...state.removedFiles,
                        fileToRemove
                    ]
                };
            }
            else
                return state;

        case CLEAR_CONTRUCTION_DETAIL_ACTION:
            return defaultState;

        case ACCEPT_AN_CONTRUCTION_ACTION.LOADING:
        case REJECT_AN_CONTRUCTION_ACTION.LOADING:    
        case LOAD_AN_CONTRUCTION_INFO_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };

        case ACCEPT_AN_CONTRUCTION_ACTION.FAILURE:
        case REJECT_AN_CONTRUCTION_ACTION.FAILURE:
        case LOAD_AN_CONTRUCTION_INFO_ACTION.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };
        default:
            return state;
    }
};

export default contructionReducer;