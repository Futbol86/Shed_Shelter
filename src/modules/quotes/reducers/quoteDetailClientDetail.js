import {LOAD_QUOTE_INFO_ACTION} from '../actions';
import {
    QUOTES_BUILDING_DETAIL_FORM_NAME_FAILURE,
    QUOTES_BUILDING_DETAIL_FORM_NAME_SUCCESS,
    QUOTES_PRODUCT_SELECTION_FORM_NAME_FAILURE,
    QUOTES_PRODUCT_SELECTION_FORM_NAME_SUCCESS
} from '../constants';

const defaultState = {
};

const clientDetailReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case QUOTES_PRODUCT_SELECTION_FORM_NAME_SUCCESS:
        case LOAD_QUOTE_INFO_ACTION.SUCCESS:
            const result = action.payload.data;
            let clientDetail;
            if (result && result.clientDetail)
                clientDetail = result.clientDetail;
            else
                clientDetail = defaultState;

            return clientDetail;

        default:
            return state;
    }
};

export default clientDetailReducer;