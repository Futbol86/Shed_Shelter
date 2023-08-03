import {combineReducers} from 'redux';
import drawing3DReducer from './reducers/drawing3D';

let allDrawing3DReducer = {
    drawing3D:              drawing3DReducer
};

export default combineReducers(allDrawing3DReducer);