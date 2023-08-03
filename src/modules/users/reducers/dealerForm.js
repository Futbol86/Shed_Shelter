import {UPLOAD_DEALER_LOGO} from "../actions";

const defaultState = {
    logoFile: null,
};

const dealerFormReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case UPLOAD_DEALER_LOGO.SUCCESS:
            return {
                ...state,
                logoFile: action.payload.data.id
            };
        default:
            return state;
    }
};

export default dealerFormReducer;