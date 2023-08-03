import {auth} from '../../../services';
import {PROFILE_FORM_NAME_FAILURE, PROFILE_FORM_NAME_SUCCESS} from '../constants';
import {LOAD_PROFILE_ACTION} from '../actions';

//-- TODO: Do we need to load profile information from remote? For this app: NO NEED!
let initUser = auth.getUserFromStorage();
if (!initUser)
    initUser = {};
const defaultState = {
    user: initUser,
    loading: false,
    errors: {}
};

const profileFormReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case PROFILE_FORM_NAME_SUCCESS:
            const userData = action.payload.data.data || action.payload.data;
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
        case LOAD_PROFILE_ACTION.ACTION:
            let curUser = auth.getUserFromStorage();
            if (curUser)
                return {
                    ...defaultState,
                    user: curUser
                };
            else
                return state;
        default:
            return state;
    }
};

export default profileFormReducer;