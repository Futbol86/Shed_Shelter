import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, getFormValues, change} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {
    WALL_SETTINGS_FORM_NAME, PINE_STUD_FRAME, STEEL_STUD_FRAME, 
    CUSTOM_WALL, UNDERSIDE_OF_RAFTER_WALL, UNDERSIDE_OF_EAVE_PURLIN_WALL, 
    PINE_STUD_90_35_SIZE, STEEL_STUD_92_36_SIZE,
    WALL_STUD_450mm_DISTANCE, WALL_CLADDING_BOTH_SIDE, WALL_CLADDING_ONE_SIDE, WALL_CLADDING_NONE, 
    WALL_CLADDING_GYPROCK_CSR_2400_1200_10, EXTERN_WALL_CLADDING_NONE, 
    HUME_INTERNAL_DOOR
} from "../../../../../constants";
import { saveFurnitureSettings, clearAFurnitureSettings } from "../../../../../actions";
import { getAFurnitureSettings } from "../../../../../selectors";
import WallSettingComponent from "../../../../../components/Toolbar/Drawing3DToolbar/FurnitureDesign/Wall/WallSetting";

class WallSetting extends Component {
    componentDidMount() {
        this.props.initialize({
            "quoteId": 2738,
            "wallSettings": {
                "wallType": PINE_STUD_FRAME,
                "wallHeightType": CUSTOM_WALL,
                "wallHeight": 4,
                "wallCladdingType": WALL_CLADDING_NONE,
                "wallCladdingMaterial": WALL_CLADDING_GYPROCK_CSR_2400_1200_10,
                "externWallCladding": EXTERN_WALL_CLADDING_NONE,
                "studSize": PINE_STUD_90_35_SIZE,
                "studDistance": WALL_STUD_450mm_DISTANCE,
                "doorType": HUME_INTERNAL_DOOR,
                "doorLeft": 1,
            }
        });
    }

    componentDidUpdate(prevProps) {
        const { furnitureSettings } = this.props;

        if(furnitureSettings.quoteId !== prevProps.furnitureSettings.quoteId) {
            const { 
                wallType, wallHeightType, wallHeight, wallCladdingType, wallCladdingMaterial, externWallCladding, 
                studSize, studDistance, doorType
            } = furnitureSettings && furnitureSettings.wallSettings || {};

            this.props.initialize({
                "quoteId": 2738,
                "wallSettings": {
                    "wallType": wallType || PINE_STUD_FRAME,
                    "wallHeightType": wallHeightType || CUSTOM_WALL,
                    "wallHeight": wallHeight || 4,
                    "wallCladdingType": wallCladdingType || WALL_CLADDING_NONE,
                    "wallCladdingMaterial": wallCladdingMaterial || WALL_CLADDING_GYPROCK_CSR_2400_1200_10,
                    "externWallCladding": externWallCladding || EXTERN_WALL_CLADDING_NONE,
                    "studSize": studSize || PINE_STUD_90_35_SIZE,
                    "studDistance": studDistance || WALL_STUD_450mm_DISTANCE,
                    "doorType": doorType || HUME_INTERNAL_DOOR,
                    "doorLeft": 1,
                }
            });
        }

        const { wallTypeFormData } = this.props;

        if(wallTypeFormData && prevProps.wallTypeFormData && (wallTypeFormData !== prevProps.wallTypeFormData)) {
            if(wallTypeFormData === PINE_STUD_FRAME) {
                this.props.changeFieldValue('wallSettings.studSize', PINE_STUD_90_35_SIZE);
            }
            else if(wallTypeFormData === STEEL_STUD_FRAME) {
                this.props.changeFieldValue('wallSettings.studSize', STEEL_STUD_92_36_SIZE);
            }
        }
    }
    
    render() {
        return (
            <WallSettingComponent {...this.props} />
        )
    }
}

const formSelector = formValueSelector(WALL_SETTINGS_FORM_NAME);

const mapStateToProps = (state) => ({
    furnitureSettings:              getAFurnitureSettings(state),

    wallTypeFormData:               formSelector(state, "wallSettings.wallType"),
    wallHeightTypeFormData:         formSelector(state, "wallSettings.wallHeightType"),
    wallHeightFormData:             formSelector(state, "wallSettings.wallHeight"),
    studSizeFormData:               formSelector(state, "wallSettings.studSize"),
    studDistanceFormData:           formSelector(state, "wallSettings.studDistance"),
    wallCladdingTypeFormData:       formSelector(state, "wallSettings.wallCladdingType"),
    wallCladdingMaterialFormData:   formSelector(state, "wallSettings.wallCladdingMaterial"),
    externWallCladdingFormData:     formSelector(state, "wallSettings.externWallCladding")
});

const mapDispatchToProps = (dispatch) => ({ 
    saveFurnitureSettings:         payload => dispatch(saveFurnitureSettings(payload)),
    clearAFurnitureSettings:       payload => dispatch(clearAFurnitureSettings(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(WALL_SETTINGS_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: WALL_SETTINGS_FORM_NAME,
        onSubmit: onSubmitActions(WALL_SETTINGS_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(WallSetting)
);
