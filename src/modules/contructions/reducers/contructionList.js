import { 
    LOAD_LIST_CONTRUCTION_ACTION,
    DELETE_AN_CONTRUCTION_ACTION,
    UPDATE_AN_CONTRUCTION_STATUS_ACTION
} from '../actions';
import {
    CONTRUCTION_LIST_FILTER_FORM_NAME_SUCCESS,
    SHARED_CONTRUCTION_LIST_FILTER_FORM_NAME_SUCCESS
} from "../constants";

const defaultState = {
    contructionList: [],
    filter: {},
    pagination: {},
    errors: {}
};

const contructionReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_CONTRUCTION_ACTION.SUCCESS:
            const apiRes = action.payload.data;
            const {total, limit, skip} = apiRes;
            return {
                ...state,
                contructionList: apiRes.data,
                filter: {search: null},
                pagination: { total, limit, skip },
                loading: false
            }; 

        case DELETE_AN_CONTRUCTION_ACTION.SUCCESS:
            const deletedId = action.payload.data && action.payload.data.id;
            return {
                ...state,
                contructionList: state.contructionList.filter(p => p.id !== deletedId),
                loading: false
            };

        case UPDATE_AN_CONTRUCTION_STATUS_ACTION.SUCCESS:
            const { id, status } = action.payload.data.data || action.payload.data;
            return {
                ...state,
                contructionList: state.contructionList.map(item => item.id === id ? 
                    {...item, status}: item
                ),
                loading: false
            };

        case CONTRUCTION_LIST_FILTER_FORM_NAME_SUCCESS:
            return {
                ...state,
                filter: action.payload
            };

        case SHARED_CONTRUCTION_LIST_FILTER_FORM_NAME_SUCCESS:
            return {
                ...state,
                filter: action.payload
            };

        case LOAD_LIST_CONTRUCTION_ACTION.LOADING:
        case DELETE_AN_CONTRUCTION_ACTION.LOADING:
        case UPDATE_AN_CONTRUCTION_STATUS_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };

        case LOAD_LIST_CONTRUCTION_ACTION.FAILURE:
        case DELETE_AN_CONTRUCTION_ACTION.FAILURE:
        case UPDATE_AN_CONTRUCTION_STATUS_ACTION.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };
        default:
            return state;
    }
};

export default contructionReducer;