import { 
    SET_SHED_MESHES_ACTION,
    CLEAR_SHED_MESHES_ACTION,
    SHOW_SHEETING_SHED_ACTION,
    HIDE_SHEETING_SHED_ACTION,
    ADD_BAY_ACTION,
    REMOVE_BAY_ACTION,
    SET_DRAGGING_OBJECT_ACTION,
    CLEAR_DRAGGING_OBJECT_ACTION,
    SET_DRAGGING_COORDINATE_ACTION,
    SET_BRACKET_DRAWING_ACTION,
    SET_FLASHING_DRAWING_ACTION,
    SET_BASE_PLATE_DRAWING_ACTION,
    SET_BRIGING_APEX_PLATE_DRAWING_ACTION,
    SET_AWNING_DRAWING_ACTION,
    SET_SHED_COMPONENT_NODES_ACTION,
    SET_CHECKED_SHED_COMPONENT_NODES_ACTION,
    SET_EXPANDED_SHED_COMPONENT_NODES_ACTION,
    SET_CLICKED_SHED_COMPONENT_NODE_ACTION,
    SET_SEARCH_BRACKET_SAMPLE_ACTION,
    DOC_EXPORT_SIMPLIFIED_SHED_TO_PDF_ACTION,
    DOC_EXPORT_BOM_TO_PDF_ACTION,
    DOC_CLEAR_SIMPLIFIED_SHED_PDF_ACTION,
    LOAD_A_FURNITURE_COMPONENTS_ACTION,
    LOAD_A_FURNITURE_SETTINGS_ACTION,
    SET_FURNITURE_DRAWING_TYPE_ACTION,
    SET_SELECTED_FURNITURE_WALL_ACTION,
    SET_SELECTED_FURNITURE_ITEM_ACTION,
    SET_SELECTED_TILE_ITEM_ACTION,
    SET_SELECTED_GLASS_ITEM_ACTION,
    SET_SELECTED_MIRROR_ITEM_ACTION,
    SET_ENABLE_UNDO_BUTTON_ACTION,
    SET_VIEW_DETAIL_ACTION,
    CLEAR_VIEW_DETAIL_ACTION,
    SAVE_FURNITURE_COMPONENTS_ACTION,
    CLEAR_A_FURNITURE_COMPONENTS_ACTION,
    CLEAR_A_FURNITURE_SETTINGS_ACTION,
    CHANGE_FURNITURE_TAB_ACTION,
} from '../actions';

import { FURNITURE_NORMAL_OPTION, BRACKET_VIEW_FILTER_FORM_NAME_SUCCESS } from '../constants';

const defaultState = {
    isShowSheetingShed: true,
    meshes: [],
    bays: 4,
    draggingObject: null,
    draggingCoordinate: {},
    bracketDrawing: {},
    flashingDrawing: {},
    basePlateDrawing: {},
    brigingApexPlateDrawing: {},
    awningDrawing: {},
    searchBracket: "",
    searchBracketSample: "",
    searchBracketResult: null,
    shedComponentNodes: [],
    checkedShedComponentNodes: [],
    expandedShedComponentNodes: [],
    clickedShedComponentNode: {},
    furnitureComponents: null,
    furnitureSettings: {},
    furnitureDrawingType: FURNITURE_NORMAL_OPTION,
    selectedWall: null,
    selectedFurnitureItem: null,
    selectedTileItem: null,
    selectedGlassItem: null,
    selectedMirrorItem: null,
    isEnableUndoButton: false,
    isViewDetail: true,
    remotePDF: null,
    tabIndex: "tab-walls",
    filter: {search: ''},
    pagination: {},
    errors: {}
};

const drawing3DReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case SET_SHED_MESHES_ACTION:
            return {
                ...state,
                meshes: action.payload.meshes,
                loading: false
            };

        case CLEAR_SHED_MESHES_ACTION:
            return {
                ...state,
                meshes: [],
                loading: false
            };

        case SHOW_SHEETING_SHED_ACTION:
            return {
                ...state,
                isShowSheetingShed: true,
            };

        case HIDE_SHEETING_SHED_ACTION:
            return {
                ...state,
                isShowSheetingShed: false,
            };

        case ADD_BAY_ACTION:
            return {
                ...state,
                bays: state.bays + 1,
            };

        case REMOVE_BAY_ACTION:
            return {
                ...state,
                bays: state.bays - 1,
            };

        case SET_DRAGGING_OBJECT_ACTION:
            return {
                ...state,
                draggingObject: action.payload,
            }

        case CLEAR_DRAGGING_OBJECT_ACTION:
            return {
                ...state,
                draggingObject: null
            }

        case SET_DRAGGING_COORDINATE_ACTION:
            return {
                ...state,
                draggingCoordinate: action.payload,
            }

        case SET_BRACKET_DRAWING_ACTION:
            return {
                ...state,
                bracketDrawing: action.payload,
            }

        case SET_FLASHING_DRAWING_ACTION:
            return {
                ...state,
                flashingDrawing: action.payload,
            }  

        case SET_BASE_PLATE_DRAWING_ACTION:
            return {
                ...state,
                basePlateDrawing: action.payload,
            }  

        case SET_BRIGING_APEX_PLATE_DRAWING_ACTION:
            return {
                ...state,
                brigingApexPlateDrawing: action.payload,
            } 

        case SET_AWNING_DRAWING_ACTION:
            return {
                ...state,
                awningDrawing: action.payload,
            }

        case SET_SHED_COMPONENT_NODES_ACTION:
            return {
                ...state,
                shedComponentNodes: action.payload,
            }

        case SET_CHECKED_SHED_COMPONENT_NODES_ACTION:
            return {
                ...state,
                checkedShedComponentNodes: action.payload,
            }

        case SET_EXPANDED_SHED_COMPONENT_NODES_ACTION:
            return {
                ...state,
                expandedShedComponentNodes: action.payload,
            }    

        case SET_CLICKED_SHED_COMPONENT_NODE_ACTION:
            return {
                ...state,
                clickedShedComponentNode: action.payload,
            }

        case BRACKET_VIEW_FILTER_FORM_NAME_SUCCESS:
            return {
                ...state,
                searchBracket: action.payload
            }

        case SET_SEARCH_BRACKET_SAMPLE_ACTION:
            return {
                ...state,
                searchBracketSample: action.payload
            }
    
        case DOC_EXPORT_SIMPLIFIED_SHED_TO_PDF_ACTION.SUCCESS:
            const rs = action.payload.data;
            let pdfBuffer;
            if (rs && rs.data) {
                pdfBuffer = rs.data;
            }
            else
                pdfBuffer = rs;

            return {
                ...state,
                remotePDF: pdfBuffer,
            };

        case DOC_EXPORT_BOM_TO_PDF_ACTION.SUCCESS:
            const bomrs = action.payload.data;
            let bomPdfBuffer;
            if (bomrs && bomrs.data) {
                bomPdfBuffer = bomrs.data;
            }
            else
                bomPdfBuffer = bomrs;

            return {
                ...state,
                remotePDF: bomPdfBuffer,
            };
        
        case DOC_CLEAR_SIMPLIFIED_SHED_PDF_ACTION:
            return {
                ...state,
                remotePDF: null,
            }

        case LOAD_A_FURNITURE_COMPONENTS_ACTION.SUCCESS:
            return {
                ...state,
                furnitureComponents: action.payload.data.data,
                loading: false
            };

        case LOAD_A_FURNITURE_SETTINGS_ACTION.SUCCESS:
            return {
                ...state,
                furnitureSettings: action.payload.data.data,
                loading: false
            };    

        case SET_FURNITURE_DRAWING_TYPE_ACTION:
            return {
                ...state,
                furnitureDrawingType: action.payload,
            };

        case SET_SELECTED_FURNITURE_WALL_ACTION:
            return {
                ...state,
                selectedWall: action.payload,
            };

        case SET_SELECTED_FURNITURE_ITEM_ACTION:
            return {
                ...state,
                selectedFurnitureItem: action.payload,
            };

        case SET_SELECTED_TILE_ITEM_ACTION:
            return {
                ...state,
                selectedTileItem: action.payload,
            };

        case SET_SELECTED_GLASS_ITEM_ACTION:
            return {
                ...state,
                selectedGlassItem: action.payload,
            };

        case SET_SELECTED_MIRROR_ITEM_ACTION:
            return {
                ...state,
                selectedMirrorItem: action.payload,
            };

        case SET_ENABLE_UNDO_BUTTON_ACTION:
            return {
                ...state,
                isEnableUndoButton: action.payload,
            };

        case SET_VIEW_DETAIL_ACTION:
            return {
                ...state,
                isViewDetail: true
            }

        case CLEAR_VIEW_DETAIL_ACTION:
            return {
                ...state,
                isViewDetail: false
            }

        case SAVE_FURNITURE_COMPONENTS_ACTION.SUCCESS:
            return {
                ...state,
                furnitureComponents: action.payload.data.data
            }

        case CLEAR_A_FURNITURE_COMPONENTS_ACTION:
            return {
                ...state,
                furnitureComponents: {}
            }

        case CLEAR_A_FURNITURE_SETTINGS_ACTION:
            return {
                ...state,
                furnitureSettings: {}
            }

        case CHANGE_FURNITURE_TAB_ACTION:
            return {
                ...state,
                tabIndex: action.payload.tabIndex,
            }

        default:
            return state;
    }
};

export default drawing3DReducer;
