import {
    JT_LOAD_A_CHECK_LIST,
    JT_UPDATE_A_TRACKING_ITEM,
    JT_UPDATE_A_CHECK_LIST,
    JT_CLEAR_A_CHECK_LIST,
    JT_LOAD_A_SHED_INFORMATION
} from '../actions';

const defaultState = {
    id: 0,
    checkList: {},
    quoteDetails: {},
    clientDetail: {},
    shedInformationDetail: {},
    errors: {}
};

const trackingDetailReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case JT_LOAD_A_CHECK_LIST.SUCCESS:
            const apiRes = action.payload && action.payload.length ? action.payload[0] : {};
            return {
                ...state,
                id: apiRes.id ? apiRes.id : -1,
                checkList: apiRes.data ? apiRes.data : {},
                quoteDetails: apiRes.quoteDetails ? apiRes.quoteDetails : {},
                clientDetail: apiRes.quoteDetails ? apiRes.quoteDetails.client : {},
                loading: true
            };
        
        case JT_LOAD_A_CHECK_LIST.LOADING:
        case JT_UPDATE_A_TRACKING_ITEM.LOADING:
            return {
                ...state,
                loading: true
            };

        case JT_LOAD_A_CHECK_LIST.FAILURE:
        case JT_UPDATE_A_TRACKING_ITEM.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: true
            };
        
        case JT_UPDATE_A_TRACKING_ITEM.SUCCESS:
        case JT_UPDATE_A_CHECK_LIST:
            let data = {};
            if (action.payload) {
                let list = action.payload;
                if (typeof list === 'string' || list instanceof String) {
                    list = JSON.parse(list);
                }
                for (let key in list) {
                    data[key] = {
                        ...(state.checkList[key] ? state.checkList[key] : {}),
                        ...list[key]
                    }
                }
            }
            
            return {
                ...state,
                checkList: {
                    ...state.checkList,
                    ...data
                }
            }

        case JT_CLEAR_A_CHECK_LIST:
            return {
                ...state,
                checkList: null
            }

        case JT_LOAD_A_SHED_INFORMATION.SUCCESS:
            return {
                ...state,
                shedInformationDetail: action.payload,
            }

        default:
            return state;
    }
};

export default trackingDetailReducer;