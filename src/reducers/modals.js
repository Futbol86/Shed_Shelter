import {APP_OPEN_MODAL_ACTION, APP_CLOSE_MODAL_ACTION} from '../constants';
const initialState = { modals: [] };

const modalsReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_OPEN_MODAL_ACTION:
            return {
                ...state,
                modals: state.modals.concat(action.obj)
            };
        case APP_CLOSE_MODAL_ACTION:
            return {
                ...state,
                modals: state.modals.filter(item => item.id !== action.obj.id),
            };
        default:
            return state;
    }
};
export default modalsReducer;