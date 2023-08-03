import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, change, getFormValues} from "redux-form";

import {DOC_changeActiveModal, DOC_changeTypeModal} from "../../documents/actions";
import {getDocCurrentModalId} from "../../documents/selectors";

import {openModalAction} from "../../../actions";
import {
    doSetShedMeshes, doClearShedMeshes, doShowSheetingShed, doHideSheetingShed, 
    doSetShedComponentNodes, doSetCheckedShedComponentNodes, doSetFurnitureDrawingType, 
    doSetSelectedFurnitureWall, doSetSelectedFurnitureItem, doSetSelectedTileItem, 
    doSetSelectedGlassItem, doSetSelectedMirrorItem,
    doSetEnableUndoButton, doClearViewDetail, doChangeFurnitureTab,
    loadAFurnitureComponents, saveFurnitureComponents, 
    DOC_exportSimplifiedShedPDF, DOC_clearRemoteSimplifiedShedPDF
} from "../actions";
import {
    getShedMeshes, getIsShowSheetingShed, getSearchBracket, 
    getCheckedShedComponentNodes, getClickedShedComponentNode,
    getAFurnitureComponents, getFurnitureDrawingType, 
    getSelectedFurnitureWall, getSelectedFurnitureItem, getSelectedTileItem, 
    getSelectedGlassItem, getSelectedMirrorItem, getBaySheds, getRemotePDF
} from "../selectors";
import {
    DRAWING_3D_FORM_NAME, DRAWING_3D_TOOLBAR_FORM_NAME, 
    WALL_SETTINGS_FORM_NAME, TILE_SETTINGS_FORM_NAME, GLASS_MIRROR_SETTINGS_FORM_NAME,
    WALL_ADD_DOORS_FORM_NAME
} from "../constants";
import Drawing3DComponent from "../components/Drawing3D";

class Drawing3D extends Component {
    componentDidMount() {
        this.props.loadAFurnitureComponents({quoteId: 2738});
    }

    componentDidUpdate(prevProps) {
        // Print Simplified Shed
        const {remotePDF} = this.props;

        let blobPDF, pdfFileURL;
        if (remotePDF){
            blobPDF = new Blob([remotePDF], {type: 'application/pdf'});
            //Build a URL from the file
            pdfFileURL = window.URL.createObjectURL(blobPDF);
            //Open the URL on new Window
            window.open(pdfFileURL, '_blank');

            this.props.DOC_clearRemoteSimplifiedShedPDF();
        }
    }

    render() {
        return (
            <div>
                <Drawing3DComponent {...this.props}
                                    handleSetShedMeshes={(payload) => this.props.doSetShedMeshes(payload)}
                                    handleClearShedMeshses={(payload) => this.props.doClearShedMeshes(payload)}
                                    handleShowSheetingShed={() => this.props.doShowSheetingShed({})}
                                    handleHideSheetingShed={() => this.props.doHideSheetingShed({})}
                />
            </div>
        )
    }
}

const formSelector = formValueSelector(DRAWING_3D_TOOLBAR_FORM_NAME);
const wallSettingsFormSelector = formValueSelector(WALL_SETTINGS_FORM_NAME);
const tileSettingsFormSelector = formValueSelector(TILE_SETTINGS_FORM_NAME);
const glassMirrorSettingsFormSelector = formValueSelector(GLASS_MIRROR_SETTINGS_FORM_NAME);
const wallAddDoorsFormSelector = formValueSelector(WALL_ADD_DOORS_FORM_NAME);

const mapStateToProps = (state) => ({
    currentModalId:            getDocCurrentModalId(state),

    meshes:                    getShedMeshes(state),
    baySheds:                  getBaySheds(state),
    
    checkedShedComponentNodes: getCheckedShedComponentNodes(state),
    clickedShedComponentNode:  getClickedShedComponentNode(state),
    searchBracket:             getSearchBracket(state),
    
    isShowSheetingShed:        getIsShowSheetingShed(state),

    furnitureComponent:        getAFurnitureComponents(state),

    selectedWall:              getSelectedFurnitureWall(state),
    selectedFurnitureItem:     getSelectedFurnitureItem(state),
    selectedTileItem:          getSelectedTileItem(state),
    selectedGlassItem:         getSelectedGlassItem(state),
    selectedMirrorItem:        getSelectedMirrorItem(state),

    furnitureDrawingType:      getFurnitureDrawingType(state),
    remotePDF:                 getRemotePDF(state),

    colourFormData:            formSelector(state, "colours"),

    wallType:                  wallSettingsFormSelector(state, "wallSettings.wallType"),
    wallThickness:             wallSettingsFormSelector(state, "wallSettings.wallThickness"),
    wallHeightType:            wallSettingsFormSelector(state, "wallSettings.wallHeightType"),
    wallHeight:                wallSettingsFormSelector(state, "wallSettings.wallHeight"),
    studSize:                  wallSettingsFormSelector(state, "wallSettings.studSize"),
    studDistance:              wallSettingsFormSelector(state, "wallSettings.studDistance"),
    wallCladdingType:          wallSettingsFormSelector(state, "wallSettings.wallCladdingType"),
    wallCladdingMaterial:      wallSettingsFormSelector(state, "wallSettings.wallCladdingMaterial"),
    externWallCladding:        wallSettingsFormSelector(state, "wallSettings.externWallCladding"),
    addDoors:                  wallAddDoorsFormSelector(state, "addDoors"),
    
    tileType:                  tileSettingsFormSelector(state, "tileSettings.tileType"),
    tileItem:                  tileSettingsFormSelector(state, "tileSettings.tileItem"),
    tileWidth:                 tileSettingsFormSelector(state, "tileSettings.tileWidth"),
    tileLength:                tileSettingsFormSelector(state, "tileSettings.tileLength"),
    tileOrientation:           tileSettingsFormSelector(state, "tileSettings.tileOrientation"),
    tileColor:                 tileSettingsFormSelector(state, "tileSettings.tileColor"),
    tileTexture:               tileSettingsFormSelector(state, "tileSettings.tileTexture"),

    glassWidth:                glassMirrorSettingsFormSelector(state, "glassMirrorSettings.glassWidth"),
    glassHeight:               glassMirrorSettingsFormSelector(state, "glassMirrorSettings.glassHeight"),
    glassDepth:                glassMirrorSettingsFormSelector(state, "glassMirrorSettings.glassDepth"),

    mirrorWidth:               glassMirrorSettingsFormSelector(state, "glassMirrorSettings.mirrorWidth"),
    mirrorHeight:              glassMirrorSettingsFormSelector(state, "glassMirrorSettings.mirrorHeight"),
    mirrorDepth:               glassMirrorSettingsFormSelector(state, "glassMirrorSettings.mirrorDepth"),

    selectedBracketViewOptions: formSelector(state, "bracketView"),
});

const mapDispatchToProps = (dispatch) => ({
    doSetShedMeshes:            payload => dispatch(doSetShedMeshes(payload)),  
    doClearShedMeshes:          payload => dispatch(doClearShedMeshes(payload)), 
    doShowSheetingShed:         payload => dispatch(doShowSheetingShed(payload)),
    doHideSheetingShed:         payload => dispatch(doHideSheetingShed(payload)),

    doSetShedComponentNodes:    payload => dispatch(doSetShedComponentNodes(payload)),
    doSetCheckedShedComponentNodes: payload => dispatch(doSetCheckedShedComponentNodes(payload)),

    doSetFurnitureDrawingType:  payload => dispatch(doSetFurnitureDrawingType(payload)),
    doSetSelectedFurnitureWall: payload => dispatch(doSetSelectedFurnitureWall(payload)),
    doSetSelectedFurnitureItem: payload => dispatch(doSetSelectedFurnitureItem(payload)),
    doSetSelectedTileItem:      payload => dispatch(doSetSelectedTileItem(payload)),
    doSetSelectedGlassItem:     payload => dispatch(doSetSelectedGlassItem(payload)),
    doSetSelectedMirrorItem:    payload => dispatch(doSetSelectedMirrorItem(payload)),

    doSetEnableUndoButton:      payload => dispatch(doSetEnableUndoButton(payload)),
    doClearViewDetail:          payload => dispatch(doClearViewDetail(payload)),

    doChangeFurnitureTab:       payload => dispatch(doChangeFurnitureTab(payload)),

    loadAFurnitureComponents:   payload => dispatch(loadAFurnitureComponents(payload)),
    saveFurnitureComponents:    payload => dispatch(saveFurnitureComponents(payload)),

    DOC_exportSimplifiedShedPDF:        payload => dispatch(DOC_exportSimplifiedShedPDF(payload)), 
    DOC_clearRemoteSimplifiedShedPDF:   payload => dispatch(DOC_clearRemoteSimplifiedShedPDF(payload)),

    openModalAction:            payload => dispatch(openModalAction(payload)),  

    changeFieldValue: function (field, value) {
        dispatch(change(DRAWING_3D_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: DRAWING_3D_FORM_NAME,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(Drawing3D)
);
