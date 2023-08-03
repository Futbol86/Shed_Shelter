import {LOAD_PROFILE_ACTION} from '../actions';
import {LOGIN_ACTION} from "../../auth/actions";
import {LOGIN_FORM_NAME_SUCCESS} from "../../auth/constants";
const defaultState = {
};

const detailReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_PROFILE_ACTION.SUCCESS:
            return action.payload && action.payload.data;
        case LOAD_PROFILE_ACTION.FAILURE:
            return {
                ...defaultState,
                errors: action.payload.error
            };

        case LOGIN_FORM_NAME_SUCCESS:
        case (LOGIN_ACTION.SUCCESS):
            return action.payload && action.payload.data && action.payload.data.user;
        
        default:
            return state;
    }
};

export default detailReducer;