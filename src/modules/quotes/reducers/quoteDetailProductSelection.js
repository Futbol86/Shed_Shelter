import {LOAD_ALL_PRODUCTS_ACTION, LOAD_ALL_CATEGORIES_ACTION, LOAD_QUOTE_INFO_ACTION, QD_PS_CHANGE_PRODUCT_CATEGORY} from '../actions';
import {QUOTES_PRODUCT_SELECTION_FORM_NAME_SUCCESS} from "../constants";

const defaultState = {
    products: {},
    productId: null,
    loading: false,
    categories: {},
    categoryId: null,
    errors: {}
};

const productSelectionReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_ALL_CATEGORIES_ACTION.SUCCESS:
            const res = action.payload.data && action.payload.data.data;
            let categories = {};
            if (Array.isArray(res) && res.length > 0){
                categories = res;
            }

            return {
                ...state,
                categories,
                loading: false
            };

        case LOAD_ALL_PRODUCTS_ACTION.SUCCESS:
            const result = action.payload.data;
            let products = {};
            if (Array.isArray(result) && result.length > 0){
                result.forEach(item => {
                    if (item.params)
                        item.params = JSON.parse(item.params);
                    if (item.category){
                        if (!products[item.category])
                            products[item.category] = [];
                        products[item.category].push(item);
                    }

                });
            }

            return {
                ...state,
                products,
                loading: false
            };

        case LOAD_ALL_CATEGORIES_ACTION.LOADING:
        case LOAD_ALL_PRODUCTS_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };
        case LOAD_ALL_CATEGORIES_ACTION.FAILURE:
        case LOAD_ALL_PRODUCTS_ACTION.FAILURE:
            return {
                ...defaultState,
                errors: action.payload.error,
                loading: false
            };


        case QUOTES_PRODUCT_SELECTION_FORM_NAME_SUCCESS:
        case LOAD_QUOTE_INFO_ACTION.SUCCESS:
            const rs = action.payload.data;
            let newState = state;

            if (rs && rs.buildingDetail) {
                newState = {
                    ...newState,
                    productId: rs.buildingDetail.productId
                }
            }
            if (rs && rs.products) {
                const products = rs.products.map(prod => ({
                    ...prod,
                    params: JSON.parse(prod.params)
                }));

                newState = {
                    ...newState,
                    products
                }
            }
            
            return newState;


        case QD_PS_CHANGE_PRODUCT_CATEGORY: 
            let nState = state;
            if (action.payload.categoryId)
                nState = {
                    ...nState,
                    categoryId: action.payload.categoryId
                };
            if (action.payload.products)
                nState = {
                    ...nState,
                    products: action.payload.products.map(prod => ({
                        ...prod,
                        params: JSON.parse(prod.params)
                    }))
                };
            return nState;

        default:
            return state;
    }
};

export default productSelectionReducer;