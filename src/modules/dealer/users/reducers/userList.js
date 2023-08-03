import { normalize } from 'normalizr';

import {LOAD_LIST_USERS_ACTION} from '../actions';
import { usersSchema } from '../schema';

const defaultState = {
    users: [],
    loading: false,
    pagination: {},
    filter: {search: '', state: ''},
    errors: {}
};

const userListReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_USERS_ACTION.SUCCESS:
            const apiRes = action.payload.data;
            const { total, limit, skip } = apiRes;
            return {
                ...state,
                users: normalize(apiRes.data, usersSchema),
                pagination: { total, limit, skip },
                loading: false
            };
        case LOAD_LIST_USERS_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };
        case LOAD_LIST_USERS_ACTION.FAILURE:
            return {
                ...defaultState,
                errors: action.payload.error,
                loading: false
            };

        default:
            return state;
    }
};

export default userListReducer;