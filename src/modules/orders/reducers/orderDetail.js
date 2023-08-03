import { 
    LOAD_AN_ORDER_INFO_ACTION,
    ACCEPT_AN_ORDER_ACTION,
    REJECT_AN_ORDER_ACTION,
    CLEAR_ORDER_DETAIL_ACTION,
    UPLOAD_ORDER_ATTACH_FILES_ACTION,
    DELETE_AN_ORDER_ATTACH_FILE_ACTION
} from '../actions';

const defaultState = {
    orderDetails: null,
    attachFiles: [],
    removedFiles: [],
    isOrderAccepted: false,
    isOrderRejected: false,
    errors: {}
};

const orderReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case ACCEPT_AN_ORDER_ACTION.SUCCESS:
            return {
                ...state,
                isOrderAccepted: true,
                isOrderRejected: false,
                loading: false
            }

        case REJECT_AN_ORDER_ACTION.SUCCESS:
            return {
                ...state,
                isOrderAccepted: false,
                isOrderRejected: true,
                loading: false
            }

        case LOAD_AN_ORDER_INFO_ACTION.SUCCESS:
            const apiRes = action.payload.data.data && action.payload.data.data.length ? action.payload.data.data[0] : {};
            return {
                ...state,
                orderDetails: apiRes,
                attachFiles: apiRes.fileRelPaths ? apiRes.fileRelPaths : [],
                removedFiles: [],
                isOrderAccepted: false,
                isOrderRejected: false,
                loading: false
            };

        case UPLOAD_ORDER_ATTACH_FILES_ACTION.SUCCESS:
            return {
                ...state,
                attachFiles: [
                    ...state.attachFiles,
                    action.payload.data.id
                ]
            };

        case DELETE_AN_ORDER_ATTACH_FILE_ACTION.ACTION:
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

        case CLEAR_ORDER_DETAIL_ACTION:
            return defaultState;

        case ACCEPT_AN_ORDER_ACTION.LOADING:
        case REJECT_AN_ORDER_ACTION.LOADING:    
        case LOAD_AN_ORDER_INFO_ACTION.LOADING:
        case UPLOAD_ORDER_ATTACH_FILES_ACTION.LOADING:
        case DELETE_AN_ORDER_ATTACH_FILE_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };

        case ACCEPT_AN_ORDER_ACTION.FAILURE:
        case REJECT_AN_ORDER_ACTION.FAILURE:
        case LOAD_AN_ORDER_INFO_ACTION.FAILURE:
        case UPLOAD_ORDER_ATTACH_FILES_ACTION.FAILURE:
        case DELETE_AN_ORDER_ATTACH_FILE_ACTION.FAILURE:
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