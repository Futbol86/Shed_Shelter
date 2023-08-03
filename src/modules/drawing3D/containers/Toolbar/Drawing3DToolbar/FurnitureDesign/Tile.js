import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, getFormValues, change} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import {
    TILE_SETTINGS_FORM_NAME, HAMILTON_MATT_TILE, FURNITURE_TILES,
} from "../../../../constants";
import {
    doChangeFurnitureTab, doSetSelectedTileItem, loadAFurnitureSettings, 
    saveFurnitureSettings, clearAFurnitureSettings
} from "../../../../actions";
import {getAFurnitureSettings, getSelectedTileItem, getViewDetailStatus} from "../../../../selectors";
import TileComponent from "../../../../components/Toolbar/Drawing3DToolbar/FurnitureDesign/Tile";

class Tile extends Component {
    componentDidMount() {
        this.props.initialize({
            "quoteId": 2738,
            "tileSettings": {
                "tileType": HAMILTON_MATT_TILE, 
                "tileItem": 'hamilton_matt_tile_600x600',
                "tileWidth": 3,
                "tileLength": 3,
                "tileOrientation": "horizontal",
                "tileColor": "#FFFFFF",
                "tileTexture": "slabwhite"
            }
        });
    }

    componentDidUpdate(prevProps) {
        const { furnitureSettings } = this.props;

        if(furnitureSettings.quoteId !== prevProps.furnitureSettings.quoteId) {
            const { 
                tileType, tileItem, tileWidth, tileLength, tileOrientation, tileColor, tileTexture 
            } = furnitureSettings && furnitureSettings.tileSettings || {};

            this.props.initialize({
                "quoteId": 2738,
                "tileSettings": {
                    "tileType": tileType || HAMILTON_MATT_TILE, 
                    "tileItem": tileItem || 'hamilton_matt_tile_600x600',
                    "tileWidth": tileWidth || 3,
                    "tileLength": tileLength || 3,
                    "tileOrientation": tileOrientation || "horizontal",
                    "tileColor": tileColor || "#FFFFFF",
                    "tileTexture": tileTexture || "slabwhite"
                }
            });
        }

        const { tileTypeFormData } = this.props;
        if(tileTypeFormData !== prevProps.tileTypeFormData) {
            this.props.changeFieldValue("tileSettings.tileItem", null);
            this.props.changeFieldValue("tileSettings.tileColor", null);
        }
    }

    componentWillUnmount() {
        this.props.clearAFurnitureSettings();
    }

    render() {
        return (
            <TileComponent {...this.props} />
        )
    }
}

const formSelector = formValueSelector(TILE_SETTINGS_FORM_NAME);

const mapStateToProps = (state) => ({
    furnitureSettings:         getAFurnitureSettings(state),
    selectedTileItem:          getSelectedTileItem(state),
    isViewDetail:              getViewDetailStatus(state),

    tileTypeFormData:          formSelector(state, "tileSettings.tileType"),
    tileItemFormData:          formSelector(state, "tileSettings.tileItem"),
    tileOrientationFormData:   formSelector(state, "tileSettings.tileOrientation"),
    tileColorFormData:         formSelector(state, "tileSettings.tileColor"),
    tileTextureFormData:       formSelector(state, "tileSettings.tileTexture"),
});

const mapDispatchToProps = (dispatch) => ({
    doChangeFurnitureTab:               payload => dispatch(doChangeFurnitureTab(payload)), 
    loadAFurnitureSettings:             payload => dispatch(loadAFurnitureSettings(payload)),  
    saveFurnitureSettings:              payload => dispatch(saveFurnitureSettings(payload)),
    clearAFurnitureSettings:            payload => dispatch(clearAFurnitureSettings(payload)),
    doSetSelectedTileItem:              payload => dispatch(doSetSelectedTileItem(payload)),

    changeFieldValue: function (field, value) {
        dispatch(change(TILE_SETTINGS_FORM_NAME, field, value))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: TILE_SETTINGS_FORM_NAME,
        onSubmit: onSubmitActions(TILE_SETTINGS_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(Tile)
);
