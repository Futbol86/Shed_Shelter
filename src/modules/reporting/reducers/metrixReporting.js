import { 
    RP_EXPORT_METRIX_REPORT_EXCEL,
    RP_CLEAR_REMOTE_METRIX_REPORT_EXCEL,
    RP_CHANGE_REPORT_TAB_ACTION,
} from '../actions';

const defaultState = {
    remoteExcel: null,
    tabIndex: 0,
    errors: {}
};

const metrixReportingReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case RP_EXPORT_METRIX_REPORT_EXCEL.SUCCESS:
            return {
                ...state,
                remoteExcel: action.payload.data.data || action.payload.data,
            };

        case RP_CLEAR_REMOTE_METRIX_REPORT_EXCEL:
            return {
                ...state,
                remoteExcel: null,
            }

        case RP_CHANGE_REPORT_TAB_ACTION:
            return {
                ...state,
                tabIndex: action.payload,
            }

        default:
            return state;
    }
};

export default metrixReportingReducer;