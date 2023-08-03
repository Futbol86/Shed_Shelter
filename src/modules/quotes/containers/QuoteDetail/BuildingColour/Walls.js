import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import WallsComponent from "../../../components/QuoteDetail/BuildingColour/Walls";
import {formValueSelector} from "redux-form";
import {QUOTES_BUILDING_DETAIL_FORM_NAME, WALL_LEFT_INDEX, WALL_RIGHT_INDEX, WALL_TOP_INDEX, WALL_BOTTOM_INDEX} from "../../../constants";
import {
    PREDEFINED_BUILDING_PROFILES_IDS,
    PREDEFINED_BUILDING_COLORS_ZA,
    PREDEFINED_BUILDING_COLORS_GAL,
    PREDEFINED_BUILDING_COLORS_ULTRA,
    PREDEFINED_BUILDING_COLORS,
    PREDEFINED_BUILDING_COLORS_CB,
    PREDEFINED_BUILDING_COLORS_STANDARD
} from "../../../../../constants";
import {QD_BC_changeWallColorOptions} from '../../../actions';
import {getQDBCWallColorOptions} from "../../../selectors";
import ProductConvert from "../Calculation/ProductConvert";

class Walls extends Component {

    /**
     * Handle color restriction based on selected Color Profile.
     * Here, we assume that there is only 1 Profile for all walls
     */
    componentDidMount() {
        const { QD_BC_changeWallColorOptions, wallProfiles0 } = this.props;
        if (PREDEFINED_BUILDING_PROFILES_IDS.ZA.includes(wallProfiles0)) {
            QD_BC_changeWallColorOptions({options: PREDEFINED_BUILDING_COLORS_ZA});
        }
        else if (PREDEFINED_BUILDING_PROFILES_IDS.Ultra.includes(wallProfiles0)) {
            QD_BC_changeWallColorOptions({options: PREDEFINED_BUILDING_COLORS_ULTRA});
        }
        else if (PREDEFINED_BUILDING_PROFILES_IDS.Galvanised.includes(wallProfiles0)) {
            QD_BC_changeWallColorOptions({options: PREDEFINED_BUILDING_COLORS_GAL});
        }
        else if (PREDEFINED_BUILDING_PROFILES_IDS.XRW.includes(wallProfiles0)) {
            QD_BC_changeWallColorOptions({options: PREDEFINED_BUILDING_COLORS_STANDARD});
        }
    }

    /**
     * Handle business rules in Walls
     *
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        const {
            isSingleWall, selectedWall, wallProfiles0, wallProfiles1, wallProfiles2, wallProfiles3,
            wallColors0, wallColors1, wallColors2, wallColors3
        } = nextProps;
        const {
            changeFieldValue, isSingleWall: ciSingleWall, isSingleWallDisabled,
            wallProfiles0: cwProfiles0, wallProfiles1: cwProfiles1, wallProfiles2: cwProfiles2, wallProfiles3: cwProfiles3,
            wallColors0: cwColors0, wallColors1: cwColors1, wallColors2: cwColors2, wallColors3: cwColors3
        } = this.props;

        //-- All walls
        if (isSingleWall === 0) {
            if (wallColors0 !== cwColors0) {
                changeFieldValue("walls[1].color", wallColors0);
                changeFieldValue("walls[2].color", wallColors0);
                changeFieldValue("walls[3].color", wallColors0);
                if (isSingleWallDisabled)
                    changeFieldValue("isSingleWallDisabled", 0);
            }
        }

        //-- Change from Single Wall --> All Walls
        if ((!isSingleWall) && (ciSingleWall)) {
            if (selectedWall === 0) {
                changeFieldValue("walls[1].color", wallColors0);
                changeFieldValue("walls[2].color", wallColors0);
                changeFieldValue("walls[3].color", wallColors0);
            }
            if (selectedWall === 1) {
                changeFieldValue("walls[0].color", wallColors1);
                changeFieldValue("walls[2].color", wallColors1);
                changeFieldValue("walls[3].color", wallColors1);
            }
            if (selectedWall === 2) {
                changeFieldValue("walls[0].color", wallColors2);
                changeFieldValue("walls[1].color", wallColors2);
                changeFieldValue("walls[3].color", wallColors2);
            }
            if (selectedWall === 3) {
                changeFieldValue("walls[0].color", wallColors3);
                changeFieldValue("walls[1].color", wallColors3);
                changeFieldValue("walls[2].color", wallColors3);
            }
            //-- Disable change to Single Wall
            changeFieldValue("isSingleWallDisabled", 1);
        }

        //-- Change Profile
        if (wallProfiles0 !== cwProfiles0) {
            changeFieldValue("walls[1].profileId", wallProfiles0);
            changeFieldValue("walls[2].profileId", wallProfiles0);
            changeFieldValue("walls[3].profileId", wallProfiles0);
            this.handleProfileColourChange(wallProfiles0, cwProfiles0);
        }
        if (wallProfiles1 !== cwProfiles1) {
            changeFieldValue("walls[0].profileId", wallProfiles1);
            changeFieldValue("walls[2].profileId", wallProfiles1);
            changeFieldValue("walls[3].profileId", wallProfiles1);
            this.handleProfileColourChange(wallProfiles1, cwProfiles1);
        }
        if (wallProfiles2 !== cwProfiles2) {
            changeFieldValue("walls[0].profileId", wallProfiles2);
            changeFieldValue("walls[1].profileId", wallProfiles2);
            changeFieldValue("walls[3].profileId", wallProfiles2);
            this.handleProfileColourChange(wallProfiles2, cwProfiles2);
        }
        if (wallProfiles3 !== cwProfiles3) {
            changeFieldValue("walls[0].profileId", wallProfiles3);
            changeFieldValue("walls[1].profileId", wallProfiles3);
            changeFieldValue("walls[2].profileId", wallProfiles3);
            this.handleProfileColourChange(wallProfiles3, cwProfiles3);
        }

        //-- Change door colors
        if (wallColors0 !== cwColors0) {
            this.changeDoorColours(wallColors0, WALL_LEFT_INDEX);
        }
        if (wallColors1 !== cwColors1) {
            this.changeDoorColours(wallColors1, WALL_RIGHT_INDEX);
        }
        if (wallColors2 !== cwColors2) {
            this.changeDoorColours(wallColors2, WALL_TOP_INDEX);
        }
        if (wallColors3 !== cwColors3) {
            this.changeDoorColours(wallColors3, WALL_BOTTOM_INDEX);
        }
    }

    handleProfileColourChange(nextProfileId, currentProfileId) {
        const changeAllDefaultColors = (color) => {
            changeFieldValue("walls[0].color", color);
            changeFieldValue("walls[1].color", color);
            changeFieldValue("walls[2].color", color);
            changeFieldValue("walls[3].color", color);
        };
        const { changeFieldValue, QD_BC_changeWallColorOptions } = this.props;
        if (PREDEFINED_BUILDING_PROFILES_IDS.ZA.includes(nextProfileId)) {
            if (!PREDEFINED_BUILDING_PROFILES_IDS.ZA.includes(currentProfileId)){
                QD_BC_changeWallColorOptions({options: PREDEFINED_BUILDING_COLORS_ZA});
                changeAllDefaultColors(PREDEFINED_BUILDING_COLORS_ZA[0].color);
            }
        }
        else if (PREDEFINED_BUILDING_PROFILES_IDS.Ultra.includes(nextProfileId)) {
            if (!PREDEFINED_BUILDING_PROFILES_IDS.Ultra.includes(currentProfileId)){
                QD_BC_changeWallColorOptions({options: PREDEFINED_BUILDING_COLORS_ULTRA});
                changeAllDefaultColors(PREDEFINED_BUILDING_COLORS_ULTRA[0].color);
            }
        }
        else if (PREDEFINED_BUILDING_PROFILES_IDS.Galvanised.includes(nextProfileId)) {
            if (!PREDEFINED_BUILDING_PROFILES_IDS.Galvanised.includes(currentProfileId)){
                QD_BC_changeWallColorOptions({options: PREDEFINED_BUILDING_COLORS_GAL});
                changeAllDefaultColors(PREDEFINED_BUILDING_COLORS_GAL[0].color);
            }
        }
        else if (PREDEFINED_BUILDING_PROFILES_IDS.CB.includes(nextProfileId)) {
            if (!PREDEFINED_BUILDING_PROFILES_IDS.CB.includes(currentProfileId)){
                QD_BC_changeWallColorOptions({options: PREDEFINED_BUILDING_COLORS_CB});
                changeAllDefaultColors(PREDEFINED_BUILDING_COLORS_CB[0].color);
            }
        }
        else if (PREDEFINED_BUILDING_PROFILES_IDS.XRW.includes(nextProfileId)) {
            if (!PREDEFINED_BUILDING_PROFILES_IDS.XRW.includes(currentProfileId)){
                QD_BC_changeWallColorOptions({options: PREDEFINED_BUILDING_COLORS_STANDARD});
                changeAllDefaultColors(PREDEFINED_BUILDING_COLORS_STANDARD[0].color);
            }
        }
        else {
            if ( PREDEFINED_BUILDING_PROFILES_IDS.ZA.includes(currentProfileId)
                || PREDEFINED_BUILDING_PROFILES_IDS.Ultra.includes(currentProfileId)
                || PREDEFINED_BUILDING_PROFILES_IDS.Galvanised.includes(currentProfileId) ) {
                QD_BC_changeWallColorOptions({options: PREDEFINED_BUILDING_COLORS});
            }
        }

    }

    handleWallPreviewClick = (wallIndex) => {
        if (this.props.isSingleWallDisabled)
            return ;
        if (wallIndex >= 0 && wallIndex <= 3) {
            const {changeFieldValue} = this.props;
            changeFieldValue('isSingleWall', '1');
            changeFieldValue('selectedWall', wallIndex);
        }
    };

    changeDoorColours(wallColor, wallIndex) {
        const {bays, changeFieldValue} = this.props;
        if (bays) {
            for (let bayIndex = 0; bayIndex < bays.length; bayIndex++) {
                const bay = bays[bayIndex];
                if (bay.doors) {
                    for (let doorIndex = 0; doorIndex < bay.doors.length; doorIndex++) {
                        const door = bay.doors[doorIndex];
                        if (door.colourIsWallCopied && door.wallIndex === wallIndex) {
                            changeFieldValue(`bays[${bayIndex}].doors[${doorIndex}].colour`, wallColor);
                        }
                    }
                }
            }
        }
    }

    render() {
        return (
            <WallsComponent {...this.props}
                            handleWallPreviewClick={this.handleWallPreviewClick}
                            buildingProfiles={ProductConvert.predefinedBuildingProfiles(this.props.rollFormSupply)} />
        );
    }
}

Walls.propTypes = {
    changeFieldValue: PropTypes.func
};

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    isSingleWall:   Number(formSelector(state, "isSingleWall")),
    isSingleWallDisabled:   Number(formSelector(state, "isSingleWallDisabled")),
    selectedWall:   Number(formSelector(state, "selectedWall")),
    wallProfiles0:  formSelector(state, "walls[0].profileId"),
    wallProfiles1:  formSelector(state, "walls[1].profileId"),
    wallProfiles2:  formSelector(state, "walls[2].profileId"),
    wallProfiles3:  formSelector(state, "walls[3].profileId"),
    wallColors0:    formSelector(state, "walls[0].color"),
    wallColors1:    formSelector(state, "walls[1].color"),
    wallColors2:    formSelector(state, "walls[2].color"),
    wallColors3:    formSelector(state, "walls[3].color"),
    wallColorOptions: getQDBCWallColorOptions(state),
    rollFormSupply:  formSelector(state, "rollFormSupply"),
    bays:           formSelector(state, "bays")
});

export default connect(mapStateToProps, {QD_BC_changeWallColorOptions})(Walls);