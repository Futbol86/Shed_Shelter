import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, getFormValues} from "redux-form";
import {onSubmitActions} from "redux-form-submit-saga";
import { ITEM_SETTINGS_FORM_NAME, HAMILTON_MATT_TILE } from "../../../../constants";
import {
    doSetSelectedFurnitureItem, loadAFurnitureSettings, saveFurnitureSettings, clearAFurnitureSettings
} from "../../../../actions";
import {getAFurnitureSettings, getSelectedFurnitureItem, getViewDetailStatus} from "../../../../selectors";
import FurnitureItemComponent from "../../../../components/Toolbar/Drawing3DToolbar/FurnitureDesign/FurnitureItem";

class FurnitureItem extends Component {
    componentDidMount() {
        this.props.initialize({
            "quoteId": 2738,
            "itemSettings": {
                "furnitureItemGroupType": "entertaiment_units"
            }
        });
    }

    componentDidUpdate(prevProps) {
        const { furnitureSettings } = this.props;

        if(furnitureSettings.quoteId !== prevProps.furnitureSettings.quoteId) {
            const { furnitureItemGroupType } = furnitureSettings && furnitureSettings.itemSettings || {};

            this.props.initialize({
                "quoteId": 2738,
                "itemSettings": {
                    "furnitureItemGroupType": furnitureItemGroupType || "entertaiment_units"
                }
            });
        }
    }

    componentWillUnmount() {
        this.props.clearAFurnitureSettings();
    }

    render() {
        return (
            <FurnitureItemComponent {...this.props} />
        )
    }
}

const formSelector = formValueSelector(ITEM_SETTINGS_FORM_NAME);

const mapStateToProps = (state) => ({
    furnitureSettings:       getAFurnitureSettings(state),
    selectedFurnitureItem:   getSelectedFurnitureItem(state),
    isViewDetail:            getViewDetailStatus(state),

    furnitureItemGroupType:  formSelector(state, "itemSettings.furnitureItemGroupType"),
});

export default connect(mapStateToProps, {
        doSetSelectedFurnitureItem, loadAFurnitureSettings, saveFurnitureSettings, clearAFurnitureSettings
    })(
    reduxForm({
        form: ITEM_SETTINGS_FORM_NAME,
        onSubmit: onSubmitActions(ITEM_SETTINGS_FORM_NAME),
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    })(FurnitureItem)
);
