import {combineReducers} from 'redux';
import contructionListReducer from './reducers/contructionList';
import contructionDetailReducer from './reducers/contructionDetail';
import contructionNoteReducer from './reducers/contructionNote';
import contructionDataEntryListReducer from './reducers/contructionDataEntryList';
import contructionDataEntryDetailReducer from './reducers/contructionDataEntryDetail';
import contructionPlannerReducer from './reducers/contructionPlanner';

let allContructionReducer = {
    contructionList:             contructionListReducer,
    contructionDetail:           contructionDetailReducer,
    contructionNote:             contructionNoteReducer,
    contructionDataEntryList:    contructionDataEntryListReducer,
    contructionDataEntryDetail:  contructionDataEntryDetailReducer,
    contructionPlanner:          contructionPlannerReducer
};

export default combineReducers(allContructionReducer);