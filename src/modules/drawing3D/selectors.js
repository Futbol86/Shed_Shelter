import {MODULE_ID} from "./constants";
import {utils} from "../../services";

export const getShedMeshes              = (state) => state[MODULE_ID].drawing3D.meshes;
export const getIsShowSheetingShed      = (state) => state[MODULE_ID].drawing3D.isShowSheetingShed;
export const getBaySheds                = (state) => state[MODULE_ID].drawing3D.bays;
export const getDraggingObject          = (state) => state[MODULE_ID].drawing3D.draggingObject;
export const getDraggingCoordinate      = (state) => state[MODULE_ID].drawing3D.draggingCoordinate;
export const getBracketDrawing          = (state) => state[MODULE_ID].drawing3D.bracketDrawing;
export const getFlashingDrawing         = (state) => state[MODULE_ID].drawing3D.flashingDrawing;
export const getBasePlateDrawing        = (state) => state[MODULE_ID].drawing3D.basePlateDrawing;
export const getBrigingApexPlateDrawing = (state) => state[MODULE_ID].drawing3D.brigingApexPlateDrawing;
export const getAwningDrawing           = (state) => state[MODULE_ID].drawing3D.awningDrawing;
export const getShedComponentNodes      = (state) => state[MODULE_ID].drawing3D.shedComponentNodes;
export const getCheckedShedComponentNodes  = (state) => state[MODULE_ID].drawing3D.checkedShedComponentNodes;
export const getExpandedShedComponentNodes = (state) => state[MODULE_ID].drawing3D.expandedShedComponentNodes;
export const getClickedShedComponentNode   = (state) => state[MODULE_ID].drawing3D.clickedShedComponentNode;

export const getSearchBracket           = (state) => state[MODULE_ID].drawing3D.searchBracket;
export const getSearchBracketSampleMesh = (state) => state[MODULE_ID].drawing3D.searchBracketSample;
export const getRemotePDF               = (state) => state[MODULE_ID].drawing3D.remotePDF;
export const getFurnitureDrawingType    = (state) => state[MODULE_ID].drawing3D.furnitureDrawingType;
export const getSelectedFurnitureWall   = (state) => state[MODULE_ID].drawing3D.selectedWall;
export const getSelectedFurnitureItem   = (state) => state[MODULE_ID].drawing3D.selectedFurnitureItem;
export const getSelectedTileItem        = (state) => state[MODULE_ID].drawing3D.selectedTileItem;
export const getSelectedGlassItem       = (state) => state[MODULE_ID].drawing3D.selectedGlassItem;
export const getSelectedMirrorItem      = (state) => state[MODULE_ID].drawing3D.selectedMirrorItem;
export const getEnableUndoButton        = (state) => state[MODULE_ID].drawing3D.isEnableUndoButton;
export const getViewDetailStatus        = (state) => state[MODULE_ID].drawing3D.isViewDetail;
export const getAFurnitureComponents    = (state) => state[MODULE_ID].drawing3D.furnitureComponents;
export const getAFurnitureSettings      = (state) => state[MODULE_ID].drawing3D.furnitureSettings;
export const getFurnitureTabIndex       = (state) => state[MODULE_ID].drawing3D.tabIndex;