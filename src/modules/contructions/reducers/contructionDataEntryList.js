import { 
    LOAD_LIST_CONTRUCTION_DATA_ENTRY_ACTION,
    DELETE_A_CONTRUCTION_DATA_ENTRY_ACTION,
} from '../actions';


const defaultState = {
    contructionDataEntryList: [],
    filter: {search: ''},
    pagination: {},
    errors: {}
};

const contructionDataEntryReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case LOAD_LIST_CONTRUCTION_DATA_ENTRY_ACTION.SUCCESS:
            const apiRes = action.payload.data;
            const { total, limit, skip } = apiRes;
            return {
                ...state,
                contructionDataEntryList: apiRes.data,
                pagination: { total, limit, skip },
                loading: true
            };

        case DELETE_A_CONTRUCTION_DATA_ENTRY_ACTION.SUCCESS:
            const deletedId = action.payload.data && action.payload.data.id;
            return {
                ...state,
                contructionDataEntryList: state.contructionDataEntryList.filter(p => p.id !== deletedId),
                loading: false
            };

        case LOAD_LIST_CONTRUCTION_DATA_ENTRY_ACTION.LOADING:
        case DELETE_A_CONTRUCTION_DATA_ENTRY_ACTION.LOADING:
            return {
                ...state,
                loading: true
            };

        case LOAD_LIST_CONTRUCTION_DATA_ENTRY_ACTION.FAILURE:
        case DELETE_A_CONTRUCTION_DATA_ENTRY_ACTION.FAILURE:
        
            return {
                ...state,
                errors: action.payload.error,
                loading: false
            };

        default:
            return state;
    }
};

export default contructionDataEntryReducer;