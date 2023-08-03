import {
    QD_OA_CHANGE_SKYLIGHT_COLOR_LIST
} from '../actions';


const defaultState = {
    skylightColors: []
};

const otherAccessoriesReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case QD_OA_CHANGE_SKYLIGHT_COLOR_LIST:
            return {
                ...state,
                skylightColors: action.payload.skylightColors
            };

        default:
            return state;
    }
};

export default otherAccessoriesReducer;