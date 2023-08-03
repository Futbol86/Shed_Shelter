import {auth} from '../../../services';
import {PROFILE_FORM_NAME_FAILURE, PROFILE_FORM_NAME_SUCCESS} from '../constants';

const defaultState = {
    user: {},
    loading: false,
    errors: {}
};

const passwordFormReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case PROFILE_FORM_NAME_SUCCESS:
            const userData = action.payload.data.data || action.payload.data; //-- incase pagination is disabled;
            auth.setUser(userData);
            return {
                ...state,
                user: userData
            };
        case PROFILE_FORM_NAME_FAILURE:
            return {
                ...defaultState,
                errors: action.payload.error
            };
        default:
            return state;
    }
};

export default passwordFormReducer;