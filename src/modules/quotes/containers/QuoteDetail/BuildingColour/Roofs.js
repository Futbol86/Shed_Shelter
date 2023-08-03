import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import RoofsComponent from "../../../components/QuoteDetail/BuildingColour/Roofs";
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME} from "../../../constants";
import {getQDBCRoofColorOptions} from "../../../selectors";
import {QD_BC_changeRoofColorOptions} from '../../../actions';
import {
    PREDEFINED_BUILDING_COLORS, PREDEFINED_BUILDING_COLORS_CB,
    PREDEFINED_BUILDING_COLORS_GAL, PREDEFINED_BUILDING_COLORS_STANDARD,
    PREDEFINED_BUILDING_COLORS_ULTRA, PREDEFINED_BUILDING_COLORS_ZA,
    PREDEFINED_BUILDING_PROFILES_IDS
} from "../../../../../constants";
import ProductConvert from "../Calculation/ProductConvert";

class Roofs extends Component {

    /**
     * Handle color restriction based on selected Color Profile.
     * Here, we assume that there is only 1 Profile for all roofs
     */
    componentDidMount() {
        const { QD_BC_changeRoofColorOptions, roofProfiles0 } = this.props;
        if (PREDEFINED_BUILDING_PROFILES_IDS.ZA.includes(roofProfiles0)) {
            QD_BC_changeRoofColorOptions({options: PREDEFINED_BUILDING_COLORS_ZA});
        }
        else if (PREDEFINED_BUILDING_PROFILES_IDS.Ultra.includes(roofProfiles0)) {
            QD_BC_changeRoofColorOptions({options: PREDEFINED_BUILDING_COLORS_ULTRA});
        }
        else if (PREDEFINED_BUILDING_PROFILES_IDS.Galvanised.includes(roofProfiles0)) {
            QD_BC_changeRoofColorOptions({options: PREDEFINED_BUILDING_COLORS_GAL});
        }
        else if (PREDEFINED_BUILDING_PROFILES_IDS.XRW.includes(roofProfiles0)) {
            QD_BC_changeRoofColorOptions({options: PREDEFINED_BUILDING_COLORS_STANDARD});
        }
    }

    /**
     * Handle business rules in Walls
     *
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        const {
            isSingleRoof, selectedRoof, roofProfiles0, roofProfiles1, roofProfiles2,
            roofColors0, roofColors1, roofColors2
        } = nextProps;
        const {
            changeFieldValue, isSingleRoof: ciSingleRoof, isSingleRoofDisabled,
            roofProfiles0: crProfile0, roofProfiles1: crProfile1, roofProfiles2: crProfile2,
            roofColors0: crColors0
        } = this.props;

        //-- All roofs
        if (isSingleRoof === 0) {
            if (roofColors0 !== crColors0) {
                changeFieldValue("roofs[1].color", roofColors0);
                changeFieldValue("roofs[2].color", roofColors0);
                if (isSingleRoofDisabled)
                    changeFieldValue("isSingleRoofDisabled", 0);
            }
        }

        //-- Change from Single Roof --> All Roofs
        if ((!isSingleRoof) && (ciSingleRoof)) {
            if (selectedRoof === 0) {
                changeFieldValue("roofs[1].color", roofColors0);
                changeFieldValue("roofs[2].color", roofColors0);
            }
            if (selectedRoof === 1) {
                changeFieldValue("roofs[0].color", roofColors1);
                changeFieldValue("roofs[2].color", roofColors1);
            }
            if (selectedRoof === 2) {
                changeFieldValue("roofs[0].color", roofColors2);
                changeFieldValue("roofs[1].color", roofColors2);
            }
            //-- Disable change to Single Roof
            changeFieldValue("isSingleRoofDisabled", 1);
        }

        //-- Change Profile
        if (roofProfiles0 !== crProfile0) {
            // changeFieldValue("roofs[1].profileId", roofProfiles0);
            changeFieldValue("roofs[2].profileId", roofProfiles0);
            this.handleProfileColourChange(roofProfiles0, crProfile0);
        }
        // if (roofProfiles1 !== crProfile1) {
        //     changeFieldValue("roofs[0].profileId", roofProfiles1);
        //     changeFieldValue("roofs[2].profileId", roofProfiles1);
        // }
        if (roofProfiles2 !== crProfile2) {
            changeFieldValue("roofs[0].profileId", roofProfiles2);
            // changeFieldValue("roofs[1].profileId", roofProfiles2);
            this.handleProfileColourChange(roofProfiles2, crProfile2);
        }
    }

    handleProfileColourChange(nextProfileId, currentProfileId) {
        const changeAllDefaultColors = (color) => {
            changeFieldValue("roofs[0].color", color);
            changeFieldValue("roofs[1].color", color);
            changeFieldValue("roofs[2].color", color);
        };
        const { changeFieldValue, QD_BC_changeRoofColorOptions } = this.props;
        if (PREDEFINED_BUILDING_PROFILES_IDS.ZA.includes(nextProfileId)) {
            if (!PREDEFINED_BUILDING_PROFILES_IDS.ZA.includes(currentProfileId)){
                QD_BC_changeRoofColorOptions({options: PREDEFINED_BUILDING_COLORS_ZA});
                changeAllDefaultColors(PREDEFINED_BUILDING_COLORS_ZA[0].color);
            }
        }
        else if (PREDEFINED_BUILDING_PROFILES_IDS.Ultra.includes(nextProfileId)) {
            if (!PREDEFINED_BUILDING_PROFILES_IDS.Ultra.includes(currentProfileId)){
                QD_BC_changeRoofColorOptions({options: PREDEFINED_BUILDING_COLORS_ULTRA});
                changeAllDefaultColors(PREDEFINED_BUILDING_COLORS_ULTRA[0].color);
            }
        }
        else if (PREDEFINED_BUILDING_PROFILES_IDS.Galvanised.includes(nextProfileId)) {
            if (!PREDEFINED_BUILDING_PROFILES_IDS.Galvanised.includes(currentProfileId)){
                QD_BC_changeRoofColorOptions({options: PREDEFINED_BUILDING_COLORS_GAL});
                changeAllDefaultColors(PREDEFINED_BUILDING_COLORS_GAL[0].color);
            }
        }
        else if (PREDEFINED_BUILDING_PROFILES_IDS.CB.includes(nextProfileId)) {
            if (!PREDEFINED_BUILDING_PROFILES_IDS.CB.includes(currentProfileId)){
                QD_BC_changeRoofColorOptions({options: PREDEFINED_BUILDING_COLORS_CB});
                changeAllDefaultColors(PREDEFINED_BUILDING_COLORS_CB[0].color);
            }
        }
        else if (PREDEFINED_BUILDING_PROFILES_IDS.XRW.includes(nextProfileId)) {
            if (!PREDEFINED_BUILDING_PROFILES_IDS.XRW.includes(currentProfileId)){
                QD_BC_changeRoofColorOptions({options: PREDEFINED_BUILDING_COLORS_STANDARD});
                changeAllDefaultColors(PREDEFINED_BUILDING_COLORS_STANDARD[0].color);
            }
        }
        else {
            if ( PREDEFINED_BUILDING_PROFILES_IDS.ZA.includes(currentProfileId)
                || PREDEFINED_BUILDING_PROFILES_IDS.Ultra.includes(currentProfileId)
                || PREDEFINED_BUILDING_PROFILES_IDS.Galvanised.includes(currentProfileId) ) {
                QD_BC_changeRoofColorOptions({options: PREDEFINED_BUILDING_COLORS});
            }
        }

    }

    handleRoofPreviewClick = (roofIndex) => {
        if (this.props.isSingleRoofDisabled)
            return ;
        if (roofIndex >= 0 && roofIndex <= 3) {
            const {changeFieldValue} = this.props;
            changeFieldValue('isSingleRoof', '1');
            changeFieldValue('selectedRoof', roofIndex);
        }
    };

    render() {
        return (
            <RoofsComponent {...this.props}
                            handleRoofPreviewClick={this.handleRoofPreviewClick}
                            buildingProfiles={ProductConvert.predefinedBuildingProfiles(this.props.rollFormSupply)} />
        );
    }
}

Roofs.propTypes = {
    changeFieldValue: PropTypes.func
};

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    isSingleRoof:   Number(formSelector(state, "isSingleRoof")),
    isSingleRoofDisabled:   Number(formSelector(state, "isSingleRoofDisabled")),
    selectedRoof:   Number(formSelector(state, "selectedRoof")),
    roofProfiles0:  formSelector(state, "roofs[0].profileId"),
    roofProfiles1:  formSelector(state, "roofs[1].profileId"),
    roofProfiles2:  formSelector(state, "roofs[2].profileId"),
    roofColors0:    formSelector(state, "roofs[0].color"),
    roofColors1:    formSelector(state, "roofs[1].color"),
    roofColors2:    formSelector(state, "roofs[2].color"),
    roofColorOptions: getQDBCRoofColorOptions(state),
    buildingSlope:      Number(formSelector(state, "buildingSlope")),
    rollFormSupply: formSelector(state, "rollFormSupply"),
});

export default connect(mapStateToProps, {QD_BC_changeRoofColorOptions})(Roofs);