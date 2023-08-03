import { RP_LOAD_REPORT, RP_CLEAR_REPORT_DETAIL } from '../actions';

const defaultState = {
    reportingDetail: {},
    errors: {}
};

const reportingReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case RP_LOAD_REPORT.SUCCESS:
            const result = action.payload && (action.payload.data || action.payload.data.data);
            return {
                ...state,
                reportingDetail: result && result.reportDetail,
                loading: true
            };
        case RP_LOAD_REPORT.LOADING:
            return {
                ...state,
                loading: true
            };
        case RP_LOAD_REPORT.FAILURE:
            return {
                ...state,
                errors: action.payload.error,
                loading: true
            };
        case RP_CLEAR_REPORT_DETAIL:
            return {
                ...state,
                reportingDetail: {}
            };

        default:
            return state;
    }
};

export default reportingReducer;