import {
    BUILDING_SELECT_PRODUCT_ACTION,
    LOAD_QUOTE_INFO_ACTION,
    LOCK_A_QUOTE_ACTION,
    QD_SEND_ORDER_ACTION
} from '../actions';
import {QUOTE_STATUS_LIST, QUOTES_PRODUCT_SELECTION_FORM_NAME_SUCCESS} from '../constants';

const defaultState = {
};

const quoteInfoReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case QUOTES_PRODUCT_SELECTION_FORM_NAME_SUCCESS:
        case LOAD_QUOTE_INFO_ACTION.SUCCESS:
            const result = action.payload.data;
            let restInfo = null, buildingDetail = null;
            if (result) {
                ({buildingDetail, ...restInfo} = result);
            }
            else
                restInfo = defaultState;

            return restInfo;

        case QD_SEND_ORDER_ACTION.SUCCESS:
            return {
                ...state,
                status: QUOTE_STATUS_LIST.SENT
            };


        case BUILDING_SELECT_PRODUCT_ACTION.FAILURE:
            return defaultState;

        default:
            return state;
    }
};

export default quoteInfoReducer;