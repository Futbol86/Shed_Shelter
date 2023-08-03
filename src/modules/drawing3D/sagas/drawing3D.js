import { call, put, takeLatest } from 'redux-saga/effects';
import {
    LOAD_A_FURNITURE_COMPONENTS_ACTION,
    SAVE_FURNITURE_COMPONENTS_ACTION,
    LOAD_A_FURNITURE_SETTINGS_ACTION,
    DOC_EXPORT_SIMPLIFIED_SHED_TO_PDF_ACTION,
    DOC_EXPORT_BOM_TO_PDF_ACTION
} from '../actions';
import {
    WALL_SETTINGS_FORM_NAME_SUBMIT,
    WALL_SETTINGS_FORM_NAME_SUCCESS,
    WALL_SETTINGS_FORM_NAME_FAILURE,
    ITEM_SETTINGS_FORM_NAME_SUBMIT,
    ITEM_SETTINGS_FORM_NAME_SUCCESS,
    ITEM_SETTINGS_FORM_NAME_FAILURE,
    TILE_SETTINGS_FORM_NAME_SUBMIT,
    TILE_SETTINGS_FORM_NAME_SUCCESS,
    TILE_SETTINGS_FORM_NAME_FAILURE,
    GLASS_MIRROR_SETTINGS_FORM_NAME_SUBMIT,
    GLASS_MIRROR_SETTINGS_FORM_NAME_SUCCESS,
    GLASS_MIRROR_SETTINGS_FORM_NAME_FAILURE,
    BRACKET_VIEW_FILTER_FORM_NAME_SUBMIT,
    BRACKET_VIEW_FILTER_FORM_NAME_SUCCESS,
    BRACKET_VIEW_FILTER_FORM_NAME_FAILURE,
    FURNITURE_DESIGN_FORM_NAME_SUBMIT,
    FURNITURE_DESIGN_FORM_NAME_SUCCESS,
    FURNITURE_DESIGN_FORM_NAME_FAILURE
} from '../constants';
import * as api from '../apis';

export function* doExportSimplifiedShedPDF({ payload }) {
    try {
        yield put({ type: DOC_EXPORT_SIMPLIFIED_SHED_TO_PDF_ACTION.LOADING });
        const data = yield call(api.apiExportSimplifiedShedPDF, payload);
        yield put({ type: DOC_EXPORT_SIMPLIFIED_SHED_TO_PDF_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_EXPORT_SIMPLIFIED_SHED_TO_PDF_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadAFurnitureComponent ({ payload }) {
    try {
        yield put({ type: LOAD_A_FURNITURE_COMPONENTS_ACTION.LOADING });
        const data = yield call(api.apiLoadAFurnitureComponents, payload);
        yield put({ type: LOAD_A_FURNITURE_COMPONENTS_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_FURNITURE_COMPONENTS_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doSaveFurnitureComponents({ payload }) {
    try {
        yield put({ type: SAVE_FURNITURE_COMPONENTS_ACTION.LOADING });
        const data = yield call(api.apiSaveFurnitureComponents, payload);
        yield put({ type: SAVE_FURNITURE_COMPONENTS_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: SAVE_FURNITURE_COMPONENTS_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doLoadAFurnitureSetting({ payload }) {
    try {
        yield put({ type: LOAD_A_FURNITURE_SETTINGS_ACTION.LOADING });
        const data = yield call(api.apiLoadAFurnitureSettings, payload);
        yield put({ type: LOAD_A_FURNITURE_SETTINGS_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: LOAD_A_FURNITURE_SETTINGS_ACTION.FAILURE, payload: {errors: error} });
    }
}

function* doSubmitWallSettings({ payload }) {
    try {
        yield put({ type: LOAD_A_FURNITURE_SETTINGS_ACTION.LOADING });
        let data = yield call(api.apiSaveFurnitureSettings, payload);
        yield put({ type: WALL_SETTINGS_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: WALL_SETTINGS_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doSubmitItemSettings({ payload }) {
    try {
        yield put({ type: LOAD_A_FURNITURE_SETTINGS_ACTION.LOADING });
        let data = yield call(api.apiSaveFurnitureSettings, payload);
        yield put({ type: ITEM_SETTINGS_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: ITEM_SETTINGS_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doSubmitTileSettings({ payload }) {
    try {
        yield put({ type: LOAD_A_FURNITURE_SETTINGS_ACTION.LOADING });
        let data = yield call(api.apiSaveFurnitureSettings, payload);
        yield put({ type: TILE_SETTINGS_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: TILE_SETTINGS_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doSubmitGlassMirrorSettings({ payload }) {
    try {
        yield put({ type: LOAD_A_FURNITURE_SETTINGS_ACTION.LOADING });
        let data = yield call(api.apiSaveFurnitureSettings, payload);
        yield put({ type: GLASS_MIRROR_SETTINGS_FORM_NAME_SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: GLASS_MIRROR_SETTINGS_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

function* doSetBracketViewFilter({ payload }) {
    const { searchBracket } = payload;
    
    try {
        yield put({ type: BRACKET_VIEW_FILTER_FORM_NAME_SUCCESS, payload: searchBracket });
    }
    catch (error) {
        yield put({ type: BRACKET_VIEW_FILTER_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}

export function* doExportBOMPDF({ payload }) {
    try {
        yield put({ type: DOC_EXPORT_BOM_TO_PDF_ACTION.LOADING });
        const data = yield call(api.apiExportBOMPDF, payload);
        yield put({ type: DOC_EXPORT_BOM_TO_PDF_ACTION.SUCCESS, payload: data });
    }
    catch (error) {
        yield put({ type: DOC_EXPORT_BOM_TO_PDF_ACTION.FAILURE, payload: {errors: error} });
    }
}

export function* doSubmitFurnitureDesign({ payload }) {
    try {
        yield put({ type: FURNITURE_DESIGN_FORM_NAME_SUCCESS, payload: {data: 'OK'} });
    }
    catch (error) {
        yield put({ type: FURNITURE_DESIGN_FORM_NAME_FAILURE, payload: {errors: error} });
    }
}


export default
[
    takeLatest(FURNITURE_DESIGN_FORM_NAME_SUBMIT,                   doSubmitFurnitureDesign),
    takeLatest(DOC_EXPORT_SIMPLIFIED_SHED_TO_PDF_ACTION.ACTION,     doExportSimplifiedShedPDF),
    takeLatest(LOAD_A_FURNITURE_COMPONENTS_ACTION.ACTION,           doLoadAFurnitureComponent),
    takeLatest(SAVE_FURNITURE_COMPONENTS_ACTION.ACTION,             doSaveFurnitureComponents),
    takeLatest(LOAD_A_FURNITURE_SETTINGS_ACTION.ACTION,             doLoadAFurnitureSetting),
    takeLatest(DOC_EXPORT_BOM_TO_PDF_ACTION.ACTION,                 doExportBOMPDF),
    takeLatest(WALL_SETTINGS_FORM_NAME_SUBMIT,                      doSubmitWallSettings),
    takeLatest(ITEM_SETTINGS_FORM_NAME_SUBMIT,                      doSubmitItemSettings),
    takeLatest(TILE_SETTINGS_FORM_NAME_SUBMIT,                      doSubmitTileSettings),
    takeLatest(GLASS_MIRROR_SETTINGS_FORM_NAME_SUBMIT,              doSubmitGlassMirrorSettings),
    takeLatest(BRACKET_VIEW_FILTER_FORM_NAME_SUBMIT,                doSetBracketViewFilter),
];