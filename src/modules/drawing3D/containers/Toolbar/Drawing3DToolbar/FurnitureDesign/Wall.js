import React, {Component} from 'react';
import {connect} from 'react-redux';
import { formValueSelector, getFormValues, change } from "redux-form";
import { WALL_SETTINGS_FORM_NAME } from "../../../../constants";
import { doSetFurnitureDrawingType } from "../../../../actions";
import {
    getFurnitureDrawingType, getSelectedFurnitureWall, 
    getEnableUndoButton, getViewDetailStatus
} from "../../../../selectors";
import WallComponent from "../../../../components/Toolbar/Drawing3DToolbar/FurnitureDesign/Wall";

class Wall extends Component {
    render() {
        return (
            <WallComponent {...this.props} />
        )
    }
}

const formSelector = formValueSelector(WALL_SETTINGS_FORM_NAME);

const mapStateToProps = (state) => ({
    furnitureDrawingType:           getFurnitureDrawingType(state),
    selectedWall:                   getSelectedFurnitureWall(state),

    isEnableUndoButton:             getEnableUndoButton(state),
    isViewDetail:                   getViewDetailStatus(state),

    wallTypeFormData:               formSelector(state, "wallSettings.wallType"),
    wallHeightTypeFormData:         formSelector(state, "wallSettings.wallHeightType"),
    wallHeightFormData:             formSelector(state, "wallSettings.wallHeight"),
    studSizeFormData:               formSelector(state, "wallSettings.studSize"),
    studDistanceFormData:           formSelector(state, "wallSettings.studDistance"),
    wallCladdingTypeFormData:       formSelector(state, "wallSettings.wallCladdingType"),
    wallCladdingMaterialFormData:   formSelector(state, "wallSettings.wallCladdingMaterial"),
    externWallCladdingFormData:     formSelector(state, "wallSettings.externWallCladding"),
});

const mapDispatchToProps = (dispatch) => ({
    doSetFurnitureDrawingType:     payload => dispatch(doSetFurnitureDrawingType(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(WALL_SETTINGS_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Wall);
