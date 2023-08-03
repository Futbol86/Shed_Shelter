import {QD_BUILDING_COLOUR_CHANGE_WALL_COLOR_OPTIONS, QD_BUILDING_COLOUR_CHANGE_ROOF_COLOR_OPTIONS} from '../actions';
import {PREDEFINED_BUILDING_COLORS} from "../../../constants";


const defaultState = {
    wallColorOptions: PREDEFINED_BUILDING_COLORS,
    roofColorOptions: PREDEFINED_BUILDING_COLORS
};

const buildingColourReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case QD_BUILDING_COLOUR_CHANGE_WALL_COLOR_OPTIONS:
            return {
                ...state,
                wallColorOptions: action.payload.options
            };

        case QD_BUILDING_COLOUR_CHANGE_ROOF_COLOR_OPTIONS:
            return {
                ...state,
                roofColorOptions: action.payload.options
            };

        default:
            return state;
    }
};

export default buildingColourReducer;