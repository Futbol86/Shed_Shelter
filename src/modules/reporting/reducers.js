import {combineReducers} from 'redux';
import reportingDetailReducer from './reducers/reportingDetail';
import metrixReportingReducer from './reducers/metrixReporting';

const reportingReducer = {
    reportingDetail:    reportingDetailReducer,
    metrixReporting:    metrixReportingReducer
};

export default combineReducers(reportingReducer);