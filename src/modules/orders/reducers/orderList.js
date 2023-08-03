import { 
    LOAD_LIST_ORDER_ACTION,
    DELETE_AN_ORDER_ACTION,
    UPDATE_AN_ORDER_STATUS_ACTION
} from '../actions';
import {
    ORDER_LIST_FILTER_FORM_NAME_SUCCESS,
    SHARED_ORDER_EDIT_FORM_NAME_SUCCESS
} from "../constants";

const defaultState = {
    orderList: [],
    pagination: {},
    errors: {}
};

const orderReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_ORDER_ACTION.SUCCESS:
            const apiRes = action.payload.data;
            const { total, limit, skip } = apiRes;
            return {
                ...state,
                orderList: apiRes.data,
                pagination: { total, limit, skip },
                loading: false
            };

        case DELETE_AN_ORDER_ACTION.SUCCESS:
            const deletedId = action.payload.data && action.payload.data.id;      
            return {
                ...state,
                orderList: state.orderList.filter(p => p.id !== deletedId),
                loading: false
            };

        case UPDATE_AN_ORDER_STATUS_ACTION.SUCCESS:
            const { id, status } = action.payload.data;
            let updatedOrderList = [...state.orderList];
            let updatedOrder = updatedOrderList.find(order => order.id === id);
            updatedOrder.status = status;
            return {
                ...state,
                orderList: updatedOrderList,
                loading: false
            };

        case ORDER_LIST_FILTER_FORM_NAME_SUCCESS:
            return {
                ...state,
                filter: action.payload
            };
        case SHARED_ORDER_EDIT_FORM_NAME_SUCCESS:
            return {
                ...state,
                filter: action.payload
            };

        case LOAD_LIST_ORDER_ACTION.LOADING:
        case DELETE_AN_ORDER_ACTION.LOADING:
        case UPDATE_AN_ORDER_STATUS_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };

        case LOAD_LIST_ORDER_ACTION.FAILURE:
        case DELETE_AN_ORDER_ACTION.FAILURE:
        case UPDATE_AN_ORDER_STATUS_ACTION.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };
        default:
            return state;
    }
};

export default orderReducer;