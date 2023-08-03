import { 
    LOAD_LIST_CONTRUCTION_PLANNER,
    ADD_AN_CONTRUCTION_PLANNER_ACTION,
    UPDATE_AN_CONTRUCTION_PLANNER_ACTION,
    DELETE_AN_CONTRUCTION_PLANNER_ACTION
} from '../actions';

import {
    SHARED_CONTRUCTION_ESTIMATED_CONTRUCTION_DATE_FORM_NAME_SUCCESS,
    SHARED_CONTRUCTION_ESTIMATED_CONTRUCTION_DATE_FORM_NAME_FAILURE,
} from '../constants';

const defaultState = {
    contructionPlanners: [],
    errors: {}
};

const contructionPlannerReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_CONTRUCTION_PLANNER.SUCCESS:
            return {
                ...state,
                contructionPlanners: action.payload.data.data,
                loading: false
            };

        case ADD_AN_CONTRUCTION_PLANNER_ACTION.SUCCESS:
            return {
                ...state,
                contructionPlanners: [action.payload.data.data, ...state.contructionPlanners],
                loading: false
            };
        
        case SHARED_CONTRUCTION_ESTIMATED_CONTRUCTION_DATE_FORM_NAME_SUCCESS:
            return {
                ...state,
                contructionPlanners: state.contructionPlanners.map(item => item.id !== action.payload.data.data.id ? item : action.payload.data.data),
                loading: false
            };
        case SHARED_CONTRUCTION_ESTIMATED_CONTRUCTION_DATE_FORM_NAME_FAILURE:

        case DELETE_AN_CONTRUCTION_PLANNER_ACTION.SUCCESS:

        default:
            return state;
    }
};

export default contructionPlannerReducer;