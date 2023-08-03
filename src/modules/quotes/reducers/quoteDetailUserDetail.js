import {LOAD_QUOTE_INFO_ACTION} from '../actions';
import {
    QUOTES_PRODUCT_SELECTION_FORM_NAME_SUCCESS
} from '../constants';

const defaultState = {
};

const userDetailReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case QUOTES_PRODUCT_SELECTION_FORM_NAME_SUCCESS:
        case LOAD_QUOTE_INFO_ACTION.SUCCESS:
            const result = action.payload.data;
            let userDetail;
            if (result && result.userDetail)
                userDetail = result.userDetail;
            else
                userDetail = defaultState;

            return userDetail;

        default:
            return state;
    }
};

export default userDetailReducer;