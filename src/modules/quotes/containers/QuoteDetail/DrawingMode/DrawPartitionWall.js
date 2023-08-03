import React from 'react';
import {connect} from 'react-redux';
import {
    QUOTES_BUILDING_DETAIL_FORM_NAME,
    DRAW_LEFT_PADDING,
    DRAW_TOP_PADDING,
    QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS,
    WALL_BRACE_LOCATION_IDS,
    QUOTES_DOOR_TYPE_IDS,
    WINDOW_DISTANCE_TO_GROUND,
    WALL_LEFT_INDEX,
    ANNEXE_WALL_LEFT_INDEX,
    WALL_STATUS_HAS_WALL,
    ANNEXE_LEFT_ID,
    ANNEXE_RIGHT_ID,
    ANNEXE_WALL_RIGHT_INDEX,
    WALL_RIGHT_INDEX,
    KNEE_BRACE_ANGLE 
} from "../../../constants";

import DrawPartitionWallComponent from "../../../components/QuoteDetail/DrawingMode/DrawPartitionWall";

import {formValueSelector} from "redux-form";
import FrameSelection from "../TutorialSelection/FrameSelection";
import CalculationUtils from "../Calculation/CalculationUtils";
import isEmpty from 'lodash/isEmpty';
import BaseBuildingCalculation from '../Calculation/BaseBuildingCalculation';
import {getKneeBraceAndCollarTieOptionsFromProduct} from '../../../selectors';

class DrawPartitionWall extends React.Component {
    handleDragEnd = (attr) => {

    };

    initialAll = (scale, leftX,  topY,baseY, hasLeftAnnexe, hasRightAnnexe, frameSelection) => {
        return {
            dashLines: [],
            verticleArrows: [],
            horizontalArrows: [],
            boldLines: [],
            normalLines: [],
            slopes: [],
            allDoors: [],
            allBraces: [],
            allMullions: [],
            title: [],
        }
    };

    allDoorsAtWallBay = (bays, bayIndex, wallIndex) => {
        let doors = [];
        let awningWallIndex = (wallIndex === WALL_LEFT_INDEX) ? ANNEXE_WALL_LEFT_INDEX : ANNEXE_WALL_RIGHT_INDEX;
        let bay = bays && bayIndex >= 0 && bayIndex < bays.length ? bays[bayIndex] : null;
        if (bay && bay.doors) {
            //Main shed doors
            for (let doorIndex = 0; doorIndex < bay.doors.length; doorIndex++) {
                let door = bay.doors[doorIndex];
                if (!door.annexeIndex && door.wallIndex === wallIndex) {
                    doors.push(door);
                }
            }

            //Awning doors
            doors = [
                ...doors,
                ...this.awningDoorsAtWallBay(bays, bayIndex, ANNEXE_LEFT_ID, awningWallIndex),
                ...this.awningDoorsAtWallBay(bays, bayIndex, ANNEXE_RIGHT_ID, awningWallIndex)
            ];
        }

        return doors;
    };

    allBracesAtWallBay = (bays, bayIndex, wallIndex) => {
        let braces = [];
        let awningWallIndex = (wallIndex === WALL_LEFT_INDEX) ? ANNEXE_WALL_LEFT_INDEX : ANNEXE_WALL_RIGHT_INDEX;
        let bay = bays && bayIndex >= 0 && bayIndex < bays.length ? bays[bayIndex] : null;
        if (bay && bay.braces) {
            //Main shed braces
            for (let braceIndex = 0; braceIndex < bay.braces.length; braceIndex++) {
                let brace = bay.braces[braceIndex];
                if (!brace.annexeIndex && brace.wallIndex === wallIndex) {
                    braces.push(brace);
                }
            }

            //Awning braces
            braces = [
                ...braces,
                ...this.awningBracesAtWallBay(bays, bayIndex, ANNEXE_LEFT_ID, awningWallIndex),
                ...this.awningBracesAtWallBay(bays, bayIndex, ANNEXE_RIGHT_ID, awningWallIndex)
            ];
        }

        return braces;
    };

    render() {
        const bigPadding = DRAW_LEFT_PADDING;
        const topPadding = DRAW_TOP_PADDING;
        const {buildingSpan, buildingHeight, isAnnexeLeft, isAnnexeRight, annexeLeft, annexeRight, bayIndex, wallIndex,
            buildingSlope, scale, stageHeight, stageWidth, buildingDetails, isHidden, setStageRef
        } = this.props;
        let hasLeftAnnexe = isAnnexeLeft && annexeLeft && annexeLeft.height && annexeLeft.span;
        let hasRightAnnexe = isAnnexeRight && annexeRight && annexeRight.height && annexeRight.span;

        let tempSlope = buildingSlope;
        if(!tempSlope || tempSlope===0){
            tempSlope = 10;
        }
        let roofRadian = (Math.PI * tempSlope) / 180;
        let buildingRoofHeight = Math.abs((Math.tan(roofRadian) * (buildingSpan / 2)));

        let  leftX = bigPadding + (hasLeftAnnexe ?  annexeLeft.span*scale : 0);
        let  baseY = topPadding +  (buildingHeight + buildingRoofHeight)*scale;

        let frameSelection = FrameSelection.selectFrame(buildingDetails);
        const  {dashLines, verticleArrows, horizontalArrows, boldLines, normalLines, slopes, allDoors, allBraces, allMullions, title} =
            this.initialAll(scale, leftX,  topPadding,baseY, hasLeftAnnexe, hasRightAnnexe, frameSelection);
        const gridIndex = bayIndex + (wallIndex === WALL_LEFT_INDEX ? 1 : 2);

        return (
            <DrawPartitionWallComponent stageHeight={stageHeight} stageWidth={stageWidth}
                                   dashLines={dashLines}
                                   verticleArrows={verticleArrows}
                                   horizontalArrows={horizontalArrows}
                                   boldLines={boldLines}
                                   normalLines={normalLines}
                                   slopes={slopes}
                                   allDoors={allDoors}
                                   allBraces={allBraces}
                                   allMullions={allMullions}
                                   scale={scale}
                                   handleDragEnd={this.handleDragEnd}
                                   isHidden={isHidden}
                                   isQuotePrint = {this.props.isQuotePrint}
                                   setStageRef = {setStageRef}
                                   title = {title}
                                   grid = {gridIndex}
            />
        );
    }
};
/*
DrawPartitionWall.propTypes = {
    currentButtonId: PropTypes.number
};*/
const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    mezzanineFloor:       (formSelector(state, "mezzanineFloor")),
    roofColors0:    formSelector(state, "roofs[0].color"),
    roofColors1:    formSelector(state, "roofs[1].color"),
    roofColors2:    formSelector(state, "roofs[2].color"),
    wallColors0:    formSelector(state, "walls[0].color")
});

export default connect(mapStateToProps, {})(DrawPartitionWall);