import {
    QD_DRAWING_MODE_CHANGE_DRAW_BUTTON,
    QD_DRAWING_MODE_CHANGE_MODAL,
    QD_DRAWING_MODE_CHANGE_BAY_WALL,
    QD_DRAWING_MODE_SET_ACTIVE_BAY_COMPONENT,
    QD_DRAWING_MODE_CHANGE_BAY_DOOR_TYPE, QD_DRAWING_MODE_SET_MOUNTED
} from '../actions';


const defaultState = {
    currentButtonId: 1,     //-- Drawing button: Floor Plan, End Wall 1, End Wall (the last wall) 3,
                            //   Partition Wall ((bayIndex + 1)*10 + wallIndex).
    currentModalId: 0,      //-- Type of component (door / brace) to be added
    selectedBayWall: null,  //-- Selected bay wall, including constraints of height, width
    activeBayComponent: null,        //-- The door / brace being edited
    isMounted: false
};

const drawingModeReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case QD_DRAWING_MODE_CHANGE_DRAW_BUTTON:
            return {
                ...state,
                currentButtonId: action.payload.buttonId
            };

        case QD_DRAWING_MODE_CHANGE_MODAL:
            return {
                ...state,
                currentModalId: action.payload.componentId
            };

        case QD_DRAWING_MODE_CHANGE_BAY_WALL:
            return {
                ...state,
                selectedBayWall: action.payload.wall
            };

        case QD_DRAWING_MODE_SET_ACTIVE_BAY_COMPONENT:
            return {
                ...state,
                activeBayComponent: action.payload.bayComponentIndex
            };

        case QD_DRAWING_MODE_SET_MOUNTED:
            return {
                ...state,
                isMounted: action.payload.isMounted
            };

        default:
            return state;
    }
};

export default drawingModeReducer;