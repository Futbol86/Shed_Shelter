import {APP_OPEN_MODAL_ACTION, APP_CLOSE_MODAL_ACTION} from './constants';

export const openModalAction = (obj) => {
    return {
        type: APP_OPEN_MODAL_ACTION,
        obj
    }
};

export const closeModalAction = (obj) => {
    return {
        type: APP_CLOSE_MODAL_ACTION,
        obj
    }
};