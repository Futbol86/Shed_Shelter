import {LOAD_QUOTE_INFO_ACTION} from '../actions';
import {
    QUOTES_BUILDING_DETAIL_FORM_NAME_FAILURE,
    QUOTES_BUILDING_DETAIL_FORM_NAME_SUCCESS,
    QUOTES_PRODUCT_SELECTION_FORM_NAME_FAILURE,
    QUOTES_PRODUCT_SELECTION_FORM_NAME_SUCCESS
} from '../constants';

const defaultState = {
};

const buildingDetailReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_QUOTE_INFO_ACTION.LOADING:
            return defaultState;

        case QUOTES_PRODUCT_SELECTION_FORM_NAME_SUCCESS:
        case LOAD_QUOTE_INFO_ACTION.SUCCESS:
            const result = action.payload.data;
            let buildingDetail;
            if (result && result.buildingDetail)
                buildingDetail = {
                    ...result.buildingDetail,
                    kitValue: result.value
                }
            else
                buildingDetail = defaultState;
            return buildingDetail;

        case QUOTES_PRODUCT_SELECTION_FORM_NAME_FAILURE:
            return defaultState;

        case QUOTES_BUILDING_DETAIL_FORM_NAME_SUCCESS:
            return action.payload.data;

        case QUOTES_BUILDING_DETAIL_FORM_NAME_FAILURE:
            return defaultState;

        default:
            return state;
    }
};

export default buildingDetailReducer;