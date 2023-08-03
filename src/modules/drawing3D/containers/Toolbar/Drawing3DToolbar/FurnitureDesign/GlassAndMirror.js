import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, getFormValues, change} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {floor} from "lodash";
import { GLASS_MIRROR_SETTINGS_FORM_NAME, SIMULATE_3D_SCALE } from "../../../../constants";
import { 
    doSetSelectedMirrorItem, doSetSelectedGlassItem,
    loadAFurnitureSettings, saveFurnitureSettings, clearAFurnitureSettings
} from "../../../../actions";
import { getAFurnitureSettings, getSelectedGlassItem, getSelectedMirrorItem, getViewDetailStatus } from "../../../../selectors";
import GlassAndMirrorComponent from "../../../../components/Toolbar/Drawing3DToolbar/FurnitureDesign/GlassAndMirror";

class GlassAndMirror extends Component {
    componentDidMount() {
        this.props.initialize({
            "quoteId": 2738,
            "glassMirrorSettings": {
                "glassOrMirrorOption": "mirror",
                "glassWidth": 3,
                "glassHeight": 3,
                "glassDepth": 0.02,
                "mirrorWidth": 1,
                "mirrorHeight": 2,
                "mirrorDepth": 0.02,
            }
        });
    }

    componentDidUpdate(prevProps) {
        const { furnitureSettings } = this.props;

        if(furnitureSettings.quoteId !== prevProps.furnitureSettings.quoteId) {
            const { 
                glassOrMirrorOption, glassWidth, glassHeight, glassDepth, 
                mirrorWidth, mirrorHeight, mirrorDepth
            } = furnitureSettings && furnitureSettings.glassMirrorSettings || {};

            this.props.initialize({
                "quoteId": 2738,
                "glassMirrorSettings": {
                    "glassOrMirrorOption": glassOrMirrorOption || "mirror",
                    "glassWidth":   glassWidth || 3,
                    "glassHeight":  glassHeight || 3,
                    "glassDepth":   glassDepth || 0.02,
                    "mirrorWidth":  mirrorWidth || 1,
                    "mirrorHeight": mirrorHeight || 2,
                    "mirrorDepth":  mirrorDepth || 0.02,
                }
            });
        }

        const { selectedGlassItem, selectedMirrorItem } = this.props;
        if(selectedGlassItem) {
            this.props.changeFieldValue("glassSettings.aboveGround", floor(selectedGlassItem.position.z/SIMULATE_3D_SCALE, 2));
        }

        if(selectedMirrorItem) {
            this.props.changeFieldValue("mirrorSettings.aboveGround", floor(selectedMirrorItem.position.z/SIMULATE_3D_SCALE, 2));
        }
    }

    componentWillUnmount() {
        this.props.clearAFurnitureSettings();
    }

    render() {
        return (
            <GlassAndMirrorComponent {...this.props}/>
        )
    }
}

const formSelector = formValueSelector(GLASS_MIRROR_SETTINGS_FORM_NAME);

const mapStateToProps = (state) => ({
    furnitureSettings:         getAFurnitureSettings(state),
    selectedGlassItem:         getSelectedGlassItem(state),
    selectedMirrorItem:        getSelectedMirrorItem(state),
    isViewDetail:              getViewDetailStatus(state),

    glassOrMirrorOption:       formSelector(state, "glassMirrorSettings.glassOrMirrorOption"),
});

const mapDispatchToProps = (dispatch) => ({
    loadAFurnitureSettings:    payload => dispatch(loadAFurnitureSettings(payload)),  
    saveFurnitureSettings:     payload => dispatch(saveFurnitureSettings(payload)),
    clearAFurnitureSettings:   payload => dispatch(clearAFurnitureSettings(payload)),
    doSetSelectedMirrorItem:   payload => dispatch(doSetSelectedMirrorItem(payload)),
    doSetSelectedGlassItem:    payload => dispatch(doSetSelectedGlassItem(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(GLASS_MIRROR_SETTINGS_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: GLASS_MIRROR_SETTINGS_FORM_NAME,
        onSubmit: onSubmitActions(GLASS_MIRROR_SETTINGS_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(GlassAndMirror)
);