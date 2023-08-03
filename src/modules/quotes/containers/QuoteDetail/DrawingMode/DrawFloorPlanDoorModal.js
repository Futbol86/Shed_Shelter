import React, {Component} from 'react';
import {connect} from 'react-redux';
import {change, formValueSelector, reduxForm} from "redux-form";
import DrawFloorPlanDoorModalComponent from "../../../components/QuoteDetail/DrawingMode/DrawFloorPlanDoorModal";
import {
    QUOTES_BUILDING_DETAIL_FORM_NAME,
    QUOTES_DM_DOOR_ADD_FORM_NAME,
    QUOTES_DOOR_TYPES_IN_DETAILS,
    QUOTES_DOOR_KITS,
    QUOTES_DOOR_TYPES_SUB_OPTIONS,
    STRAMIT_QUOTES_DOOR_TYPES_SUB_OPTIONS,
    QUOTES_DOOR_TYPE_IDS,
    QUOTES_WALL_TYPES_NAME,
    WALL_LEFT_INDEX,
    WALL_RIGHT_INDEX,
    WALL_TOP_INDEX,
    WALL_BOTTOM_INDEX,
    ROLLER_DOOR_PORTAL_FRAME_IDS,
    ADD_ROLLER_DOOR_OPTIONS,
    QUOTES_DOOR_RD_SERIES_IDS,
    QUOTES_DOOR_RD_STEEL_IDS,
    ANNEXE_LEFT_ID,
    ANNEXE_RIGHT_ID,
    ANNEXE_WALL_LEFT_INDEX,
    ANNEXE_WALL_RIGHT_INDEX,
    WINDOW_DISTANCE_TO_GROUND,
    BASE_PLATE_TYPE
} from "../../../constants";
import {
    PRODUCT_TYPES,
    PRODUCT_CATEGORY_SKILLION_SHEDS
} from "../../../../../constants";
import {
    getQDDMSelectedBayWall,
    getRollerFrameType
} from "../../../selectors";
import {QD_DM_changeBayWall} from "../../../actions";
import {
    validateRequired,
    validateBetweenValue
} from "../../../../../components/common/Form/FieldLevelValidation";
import {
    STRAMIT,
    PREDEFINED_BUILDING_COLORS,
    PREDEFINED_BUILDING_COLORS_CB,
    PREDEFINED_BUILDING_COLORS_ZA,
    PREDEFINED_BUILDING_COLORS_MATT,
    PREDEFINED_BUILDING_COLORS_STANDARD,
    PREDEFINED_BUILDING_COLORS_ULTRA
} from "../../../../../constants";
import CalculationUtils from "../Calculation/CalculationUtils";
import BaseBuildingCalculation from "../Calculation/BaseBuildingCalculation";
import BaseTutorialSelection from "../TutorialSelection/BaseTutorialSelection";
import AwningFrameSelection from "../TutorialSelection/AwningFrameSelection";
import EndMullionCalculation from "../Calculation/EndMullionCalculation";

class DrawFloorPlanDoorModal extends Component {
    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    handleBayWallChange = (event) =>  {

    }

    handleBayDoorTypeChange = (event) =>  {

    }

    handleBayDoorSubTypeChange = (event) =>  {

    }

    handlePortalFrameChange = (event) =>  {

    }

    handleDoorWidthChange = (event) =>  {

    }

    handleDoorHeightChange = (event) => {

    }

    handleBayDoorKitChange = (event) =>  {

    }

    handleBayDoorSteelChange = (event) =>  {

    }

    handleBayDoorColourChange = (event) =>  {

    }

    handleIsCentreRollerDoorChange = (event) => {
        
    }

    handleIsSmallMullionChange = (event) =>  {

    }

    handleNoOfDoorChange = (event) =>  {

    }

    /**
     * Handle Door Deletion
     */
    handleBayDoorDelete = ({bayIndex, doorIndex}) => {
        if (window.confirm('Are you sure to delete this Door?')) {
            let {bays} = this.props;
            if (bayIndex >= 0 && doorIndex >= 0 && bays && bays[bayIndex] && bays[bayIndex].doors && bays[bayIndex].doors[doorIndex]) {
                const deletingDoor = bays[bayIndex].doors[doorIndex];
                const remainingBayDoors = bays[bayIndex].doors.filter(door => door !== deletingDoor);
                this.props.changeFieldValue(`bays[${bayIndex}].doors`, remainingBayDoors);
            }
            this.props.handleModalClose();
        }
    };

    /**
     * Handle bay door submit: We will need to do it by ourselves, cannot use the default submission since it cause
     * the parent form (buildingDetail) to be submitted too.
     *
     * @param event
     */
    handleBayDoorSubmit = (event) =>  {

    }

    initialOptions =  {

    }
    
    render() {
        const {rollFormSupply, bayList, ...remainProps } = this.props;
        const {buildingDetails, currentDoorData, currentDoorModalId, bays, wallProfiles0, activeBayDoor, frameSelection} = this.props;
        const {doorTypes, doorKits, doorSubTypes, doorColours, mullionOptionDisabled, isOpeningOnly, disabledColourIsWallCopied} = 
            this.initialOptions(buildingDetails, currentDoorData, currentDoorModalId, bays, wallProfiles0, activeBayDoor, rollFormSupply, frameSelection);

        return (
            <DrawFloorPlanDoorModalComponent {...remainProps}
                                             doorTypes = {doorTypes}
                                             doorKits = {doorKits}
                                             doorSubTypes= {doorSubTypes}
                                             bayDoorColourIsWallCopied = {this.props.bayDoorColourIsWallCopied}
                                             doorColours = {doorColours}
                                             mullionOptionDisabled={mullionOptionDisabled}
                                             isOpeningOnly={isOpeningOnly}
                                             disabledColourIsWallCopied={disabledColourIsWallCopied}
                                             handleBayWallChange={this.handleBayWallChange}
                                             handleBayDoorDelete={this.handleBayDoorDelete}
                                             handleBayDoorSubmit={this.handleBayDoorSubmit}
                                             handleBayDoorTypeChange={this.handleBayDoorTypeChange}
                                             handleBayDoorSubTypeChange={this.handleBayDoorSubTypeChange}
                                             handleBayDoorKitChange={this.handleBayDoorKitChange}
                                             handlePortalFrameChange={this.handlePortalFrameChange}
                                             handleDoorWidthChange={this.handleDoorWidthChange}
                                             handleDoorHeightChange={this.handleDoorHeightChange}
                                             handleIsCentreRollerDoorChange={this.handleIsCentreRollerDoorChange}
                                             handleBayDoorSteelChange={this.handleBayDoorSteelChange}
                                             handleBayDoorColourChange={this.handleBayDoorColourChange}
                                             handleIsSmallMullionChange={this.handleIsSmallMullionChange}
                                             handleNoOfDoorChange={this.handleNoOfDoorChange}
            />
        );
    }
}

/**
 * Check for clashing. Note that "value" is the current offset
 *
 * @param doorList
 * @param height
 * @param width
 * @returns {Function}
 */
const validateClashing = (doorList, buildingDetails, selectedBayWall, doorData, index) => value => {

}

/**
 * Form validation
 *
 * @param values
 * @param selectedBayWall
 */
const validate = (values, {bayList, selectedBayWall, currentDoorData, activeBayDoor, buildingSlope,
    frameSelection, bays,buildingSpan, buildingHeight, buildingDetails, basePlateType}) => {

    return {};
};

const countMaxWidth = (values, limitOffset, {bayList, selectedBayWall, currentDoorData, activeBayDoor, buildingSlope,
    frameSelection, bays,buildingSpan, buildingHeight, buildingDetails}) => {

    }

/*
3) Head Height maximum
We need to allow a “head Height” for all roller doors
A series and AA series doors will need 400mm head height.
B series doors will need 600mm head height.
Maximum height will be eave height minus required head height.
So eave of 3m, minus 400mm for A series door – will only allow 2.6m high door.
if(door.height <= 3000 && door.width <= 3000) => A seri
if (door.height <= 3000 && door.width <= 5000) => "AA" seri
if (door.height > 3000)  => "B" seri

Update: head Height for Access Door: 150mm
*/
const countTheMaxHeight = (values, {bayList, selectedBayWall, currentDoorData, activeBayDoor, buildingSlope,
    frameSelection, bays,buildingSpan, buildingHeight}, purlinAndGirtType, rollFormSupply, productId) => {

    }

const countHeightAboveSlabLimit = (values, selectedBayWall, buildingDetails, doorList, index) => {

}

const bdFormSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const bayFormSelector = formValueSelector(QUOTES_DM_DOOR_ADD_FORM_NAME);
const mapStateToProps = (state, ownProps) => ({
    selectedBayWall: getQDDMSelectedBayWall(state),
    wallTypesArr: CalculationUtils.calculateWallTypesArr(ownProps.buildingDetails, false),
    currentDoorData: {
        height:         +bayFormSelector(state, "bayDoorHeight"),
        width:          +bayFormSelector(state, "bayDoorWidth"),
        offset:         +bayFormSelector(state, "bayDoorOffset"),
        heightAboveSlab:+bayFormSelector(state, "bayDoorHeightAboveSlab"),
        kit:            +bayFormSelector(state, "bayDoorKit"),
        doorType:       +bayFormSelector(state, "bayDoorDoorType"),
        doorSubType:    +bayFormSelector(state, "bayDoorDoorSubType"),
        steel:          +bayFormSelector(state, "bayDoorSteel"),
        isChainRequired:    bayFormSelector(state, "bayDoorChainRequired"),
        series:         +bayFormSelector(state, "bayDoorSeries"),
        colourIsWallCopied: bayFormSelector(state, "bayDoorColourIsWallCopied"),
        colour:         bayFormSelector(state, "bayDoorColour"),
        bomRef:         bayFormSelector(state, "bayDoorBomRef"),
        portalFrame:    Number(bayFormSelector(state, "portalFrame")),
        isSmallMullion: Number(bayFormSelector(state, "isDoorSmallMullion")),
        frameType:      getRollerFrameType(state, ownProps.frameSelection),
        addRollerDoorOptions:   +(bayFormSelector(state, "addRollerDoorOptions")),
        noOfIdenticalDoors:     +(bayFormSelector(state, "noOfIdenticalDoors")),
        isCentreRollerDoor: bayFormSelector(state, "isCentreRollerDoor"),
        isOpeningOnly:      bayFormSelector(state, "isOpeningOnly")
    },

    bayList:            bdFormSelector(state, `bays`),
    wallProfiles0:      +bdFormSelector(state, "walls[0].profileId"),
    purlinAndGirtType:  bdFormSelector(state, "purlinAndGirtType"),
    rollFormSupply:     bdFormSelector(state, "rollFormSupply"),
    wallColors0:        bdFormSelector(state, "walls[0].color"),
    wallColors1:        bdFormSelector(state, "walls[1].color"),
    wallColors2:        bdFormSelector(state, "walls[2].color"),
    wallColors3:        bdFormSelector(state, "walls[3].color"),
    bayDoorColourIsWallCopied:  bayFormSelector(state, "bayDoorColourIsWallCopied")
});

const mapDispatchToProps = (dispatch) => (
    {
        changeFieldValue: function (field, value) {
            dispatch(change(QUOTES_BUILDING_DETAIL_FORM_NAME, field, value))
        },
        changeCurrentFormFieldValue: function (field, value) {
            dispatch(change(QUOTES_DM_DOOR_ADD_FORM_NAME, field, value))
        },
        QD_DM_changeBayWall: payload => dispatch(QD_DM_changeBayWall(payload))
    }
);

const mergeProps = (stateProps, dispatchProps, ownProps) => (
    {
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        currentDoorData: {
            ...stateProps.currentDoorData,
            wallIndex:  stateProps.selectedBayWall && stateProps.selectedBayWall.wallIndex,
            annexeIndex:  stateProps.selectedBayWall && stateProps.selectedBayWall.annexeIndex
        }
    }
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
    reduxForm({
        form: QUOTES_DM_DOOR_ADD_FORM_NAME,
        validate
    })(DrawFloorPlanDoorModal)
);