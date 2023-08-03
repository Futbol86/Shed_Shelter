import {combineReducers} from 'redux';
import trackingDetailReducer from './reducers/trackingDetail';

export default combineReducers({
    trackingDetail:   trackingDetailReducer
});