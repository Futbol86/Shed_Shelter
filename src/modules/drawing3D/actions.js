import { defineAction } from 'redux-define';
import {createAction} from 'redux-actions';
import {LOADING, FAILURE, SUCCESS} from '../../constants';

export const SET_SHED_MESHES_ACTION               = 'SET_SHED_MESHES_ACTION';
export const CLEAR_SHED_MESHES_ACTION             = 'CLEAR_SHED_MESHES_ACTION';

export const SHOW_SHEETING_SHED_ACTION            = 'SHOW_SHEETING_SHED_ACTION';
export const HIDE_SHEETING_SHED_ACTION            = 'HIDE_SHEETING_SHED_ACTION';

export const ADD_BAY_ACTION                       = 'ADD_BAY_ACTION';
export const REMOVE_BAY_ACTION                    = 'REMOVE_BAY_ACTION';

export const SET_DRAGGING_OBJECT_ACTION           = 'SET_DRAGGING_OBJECT_ACTION';
export const CLEAR_DRAGGING_OBJECT_ACTION         = 'CLEAR_DRAGGING_OBJECT_ACTION';
export const SET_DRAGGING_COORDINATE_ACTION       = 'SET_DRAGGING_COORDINATE_ACTION';

export const SET_BRACKET_DRAWING_ACTION           = 'SET_BRACKET_DRAWING_ACTION';
export const SET_FLASHING_DRAWING_ACTION          = 'SET_FLASHING_DRAWING_ACTION';
export const SET_BASE_PLATE_DRAWING_ACTION        = 'SET_BASE_PLATE_DRAWING_ACTION';
export const SET_BRIGING_APEX_PLATE_DRAWING_ACTION = 'SET_BRIGING_APEX_PLATE_DRAWING_ACTION';
export const SET_AWNING_DRAWING_ACTION            = 'SET_AWNING_DRAWING_ACTION';

export const SET_SHED_COMPONENT_NODES_ACTION          = 'SET_SHED_COMPONENT_NODES_ACTION';
export const SET_CHECKED_SHED_COMPONENT_NODES_ACTION  = 'SET_CHECKED_SHED_COMPONENT_NODES_ACTION';
export const SET_EXPANDED_SHED_COMPONENT_NODES_ACTION = 'SET_EXPANDED_SHED_COMPONENT_NODES_ACTION';
export const SET_CLICKED_SHED_COMPONENT_NODE_ACTION   = 'SET_CLICKED_SHED_COMPONENT_NODE_ACTION';

export const SET_SEARCH_BRACKET_SAMPLE_ACTION         = 'SET_SEARCH_BRACKET_SAMPLE_ACTION';

export const DOC_EXPORT_BOM_TO_PDF_ACTION             = defineAction('DOC_EXPORT_BOM_TO_PDF_ACTION',  [LOADING, FAILURE, SUCCESS], 'drawing3D');
export const DOC_EXPORT_SIMPLIFIED_SHED_TO_PDF_ACTION = defineAction('DOC_EXPORT_SIMPLIFIED_SHED_TO_PDF_ACTION',  [LOADING, FAILURE, SUCCESS], 'drawing3D');
export const DOC_CLEAR_SIMPLIFIED_SHED_PDF_ACTION     = 'DOC_CLEAR_SIMPLIFIED_SHED_PDF_ACTION';

export const SET_FURNITURE_DRAWING_TYPE_ACTION    = 'SET_FURNITURE_DRAWING_TYPE_ACTION';
export const SET_SELECTED_FURNITURE_WALL_ACTION   = 'SET_SELECTED_FURNITURE_WALL_ACTION';
export const SET_SELECTED_FURNITURE_ITEM_ACTION   = 'SET_SELECTED_FURNITURE_ITEM_ACTION';
export const SET_SELECTED_TILE_ITEM_ACTION        = 'SET_SELECTED_TILE_ITEM_ACTION';
export const SET_SELECTED_GLASS_ITEM_ACTION       = 'SET_SELECTED_GLASS_ITEM_ACTION';
export const SET_SELECTED_MIRROR_ITEM_ACTION      = 'SET_SELECTED_MIRROR_ITEM_ACTION';
export const SET_ENABLE_UNDO_BUTTON_ACTION        = 'SET_ENABLE_UNDO_BUTTON_ACTION';
export const SET_VIEW_DETAIL_ACTION               = 'SET_VIEW_DETAIL_ACTION';
export const CLEAR_VIEW_DETAIL_ACTION             = 'CLEAR_VIEW_DETAIL_ACTION';

export const LOAD_A_FURNITURE_COMPONENTS_ACTION   = defineAction('LOAD_A_FURNITURE_COMPONENTS_ACTION',  [LOADING, FAILURE, SUCCESS], 'drawing3D');
export const SAVE_FURNITURE_COMPONENTS_ACTION     = defineAction('SAVE_FURNITURE_COMPONENTS_ACTION',  [LOADING, FAILURE, SUCCESS], 'drawing3D');
export const CLEAR_A_FURNITURE_COMPONENTS_ACTION  = 'CLEAR_A_FURNITURE_COMPONENTS_ACTION';

export const LOAD_A_FURNITURE_SETTINGS_ACTION     = defineAction('LOAD_A_FURNITURE_SETTINGS_ACTION',  [LOADING, FAILURE, SUCCESS], 'drawing3D');
export const SAVE_FURNITURE_SETTINGS_ACTION       = defineAction('SAVE_FURNITURE_SETTINGS_ACTION',  [LOADING, FAILURE, SUCCESS], 'drawing3D');
export const CLEAR_A_FURNITURE_SETTINGS_ACTION    = 'CLEAR_A_FURNITURE_SETTINGS_ACTION';

export const CHANGE_FURNITURE_TAB_ACTION          = 'CHANGE_FURNITURE_TAB_ACTION';

export const doSetShedMeshes                      = createAction(SET_SHED_MESHES_ACTION);
export const doClearShedMeshes                    = createAction(CLEAR_SHED_MESHES_ACTION);

export const doShowSheetingShed                   = createAction(SHOW_SHEETING_SHED_ACTION);
export const doHideSheetingShed                   = createAction(HIDE_SHEETING_SHED_ACTION);

export const doAddBay                             = createAction(ADD_BAY_ACTION);
export const doRemoveBay                          = createAction(REMOVE_BAY_ACTION);

export const doSetDraggingObject                  = createAction(SET_DRAGGING_OBJECT_ACTION);
export const doClearDraggingObject                = createAction(CLEAR_DRAGGING_OBJECT_ACTION);
export const doSetDraggingCoordinate              = createAction(SET_DRAGGING_COORDINATE_ACTION);

export const doSetBracketDrawing                  = createAction(SET_BRACKET_DRAWING_ACTION);
export const doSetFlashingDrawing                 = createAction(SET_FLASHING_DRAWING_ACTION);
export const doSetBasePlateDrawing                = createAction(SET_BASE_PLATE_DRAWING_ACTION);
export const doSetBrigingApexPlateDrawing         = createAction(SET_BRIGING_APEX_PLATE_DRAWING_ACTION);
export const doSetAwningDrawing                   = createAction(SET_AWNING_DRAWING_ACTION);

export const doSetShedComponentNodes              = createAction(SET_SHED_COMPONENT_NODES_ACTION);
export const doSetCheckedShedComponentNodes       = createAction(SET_CHECKED_SHED_COMPONENT_NODES_ACTION);
export const doSetExpandedShedComponentNodes      = createAction(SET_EXPANDED_SHED_COMPONENT_NODES_ACTION);
export const doSetClickedShedComponentNode        = createAction(SET_CLICKED_SHED_COMPONENT_NODE_ACTION);

export const doSetSearchBracketSample             = createAction(SET_SEARCH_BRACKET_SAMPLE_ACTION);

export const DOC_exportBOMPDF                     = createAction(DOC_EXPORT_BOM_TO_PDF_ACTION.ACTION);
export const DOC_exportSimplifiedShedPDF          = createAction(DOC_EXPORT_SIMPLIFIED_SHED_TO_PDF_ACTION.ACTION);
export const DOC_clearRemoteSimplifiedShedPDF     = createAction(DOC_CLEAR_SIMPLIFIED_SHED_PDF_ACTION);

export const doSetFurnitureDrawingType            = createAction(SET_FURNITURE_DRAWING_TYPE_ACTION);
export const doSetSelectedFurnitureWall           = createAction(SET_SELECTED_FURNITURE_WALL_ACTION);
export const doSetSelectedFurnitureItem           = createAction(SET_SELECTED_FURNITURE_ITEM_ACTION);
export const doSetSelectedTileItem                = createAction(SET_SELECTED_TILE_ITEM_ACTION);
export const doSetSelectedGlassItem               = createAction(SET_SELECTED_GLASS_ITEM_ACTION);
export const doSetSelectedMirrorItem              = createAction(SET_SELECTED_MIRROR_ITEM_ACTION);
export const doSetEnableUndoButton                = createAction(SET_ENABLE_UNDO_BUTTON_ACTION);
export const doSetViewDetail                      = createAction(SET_VIEW_DETAIL_ACTION);
export const doClearViewDetail                    = createAction(CLEAR_VIEW_DETAIL_ACTION);

export const loadAFurnitureComponents             = createAction(LOAD_A_FURNITURE_COMPONENTS_ACTION.ACTION);
export const saveFurnitureComponents              = createAction(SAVE_FURNITURE_COMPONENTS_ACTION.ACTION);
export const clearAFurnitureComponents            = createAction(CLEAR_A_FURNITURE_COMPONENTS_ACTION);

export const loadAFurnitureSettings               = createAction(LOAD_A_FURNITURE_SETTINGS_ACTION.ACTION);
export const saveFurnitureSettings                = createAction(SAVE_FURNITURE_SETTINGS_ACTION.ACTION);
export const clearAFurnitureSettings              = createAction(CLEAR_A_FURNITURE_SETTINGS_ACTION);

export const doChangeFurnitureTab                 = createAction(CHANGE_FURNITURE_TAB_ACTION);