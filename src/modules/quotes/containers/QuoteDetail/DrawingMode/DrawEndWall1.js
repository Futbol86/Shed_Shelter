import React from 'react';
import {connect} from 'react-redux';
import {
    QUOTES_BUILDING_DETAIL_FORM_NAME,
    DRAW_LEFT_PADDING,
    DRAW_TOP_PADDING,
    WALL_STATUS_HAS_WALL,
    WALL_LEFT_INDEX,
    ANNEXE_WALL_LEFT_INDEX,
    ANNEXE_LEFT_ID,
    ANNEXE_RIGHT_ID,
    WINDOW_DISTANCE_TO_GROUND,
    QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS,
    QUOTES_DOOR_TYPE_IDS, WALL_BRACE_LOCATION_IDS,
    KNEE_BRACE_ANGLE
} from "../../../constants";

import DrawEndWall1Component from "../../../components/QuoteDetail/DrawingMode/DrawEndWall1";

import {formValueSelector} from "redux-form";
import FrameSelection from "../TutorialSelection/FrameSelection";
import CalculationUtils from "../Calculation/CalculationUtils";
import DrawModeView from "./DrawModeView";
import DrawFloorPlanComponent from "../../../components/QuoteDetail/DrawingMode/DrawFloorPlan";
import {isCarport} from "./Utils";
import isEmpty from 'lodash/isEmpty';
import BaseBuildingCalculation from '../Calculation/BaseBuildingCalculation';
import {getKneeBraceAndCollarTieOptionsFromProduct} from '../../../selectors';

class DrawEndWall1 extends React.Component {

    handleDragEnd = (attr) => {
        //console.log("Dragend: b:", attr.bayIndex, ", w:", attr.wallIndex,", d:", attr.doorIndex, ", offset:", attr.offset/this.props.scale);
        if(attr.wallIndex >= 0 && attr.bayIndex >= 0 && attr.doorIndex >= 0){
            const {changeFieldValue, buildingDetails} = this.props;
            const fieldName = `bays[${attr.bayIndex}].doors[${attr.doorIndex}].offset`;

            //Check if door interact with end wall mullion
            if (attr.doorType === QUOTES_DOOR_TYPE_IDS.WINDOW || attr.doorType === QUOTES_DOOR_TYPE_IDS.ACCESS_DOOR){
                let bayIndex = attr.bayIndex;
                            
                if (buildingDetails.bays && buildingDetails.bays[bayIndex]){
                    let bay = buildingDetails.bays[bayIndex];
                    let doorIndex = attr.doorIndex;

                    if (bay.doors && bay.doors[doorIndex]){
                        let door = bay.doors[doorIndex];
                        let doorOffset = (attr.newX - attr.startX) / this.props.scale;
                        let jambWidth = 40;
                        let leftDoor = doorOffset - jambWidth;
                        let rightDoor = doorOffset + door.width + jambWidth;
                        let wallIndex = attr.wallIndex;
                        let annexeIndex = door.annexeIndex;
                        let mullions = annexeIndex ?
                            CalculationUtils.countAwningEndWallMullionFrame(buildingDetails, wallIndex, annexeIndex) :
                            CalculationUtils.countEndWallMullionFrame(buildingDetails, wallIndex, bayIndex);
                        let clashing = false;
                        let mullion;
                        for (let mullionIndex = 0; mullionIndex < mullions.length; mullionIndex++){
                            mullion = mullions[mullionIndex];
                            if (leftDoor < mullion.offset + mullion.height / 2 + 5 && rightDoor > mullion.offset - mullion.height / 2 - 5){
                                clashing = true;
                                break;
                            }
                        }

                        if(clashing){
                            let newDoorOffset1 = Math.ceil(mullion.offset + mullion.height / 2 + 5 + jambWidth);
                            let newDoorOffset2 = Math.floor(mullion.offset - mullion.height / 2 - 5 - jambWidth - door.width);
                            let newDoorOffset;
                            if ((leftDoor + rightDoor) / 2 > mullion.offset){
                                newDoorOffset = CalculationUtils.isDoorClash(door, newDoorOffset1, bayIndex, buildingDetails.bays) ? newDoorOffset2 : newDoorOffset1;
                            } else {
                                newDoorOffset = CalculationUtils.isDoorClash(door, newDoorOffset2, bayIndex, buildingDetails.bays) ? newDoorOffset1 : newDoorOffset2;
                            }
                            
                            if (window.confirm("WARNING: This door clashes with wall mullion." + 
                                                "\nChange offset to " + newDoorOffset + " to avoid clashing?")){
                                if (newDoorOffset === door.offset){
                                    changeFieldValue(fieldName, newDoorOffset - 1);  // <= make props change so the form can re-render
                                }
                                changeFieldValue(fieldName, newDoorOffset);
                            } else {
                                changeFieldValue(fieldName, door.offset - 1);// <= to make the form re-render
                                changeFieldValue(fieldName, door.offset);
                            }
                        } else {
                            let offset = attr.newX - attr.startX;
                            changeFieldValue(fieldName, Math.floor(offset/this.props.scale));
                        }
                    }   
                }
            } else {
                let offset = attr.newX - attr.startX;
                changeFieldValue(fieldName, Math.floor(offset/this.props.scale));
            }
        }
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

    render() {
        const bigPadding = DRAW_LEFT_PADDING;
        const topPadding = DRAW_TOP_PADDING;
        const {buildingSpan, buildingHeight, isAnnexeLeft, isAnnexeRight, annexeLeft, annexeRight, isSkillionRoof,
               buildingSlope, scale, stageHeight, stageWidth, buildingDetails, setStageRef, isHidden
                } = this.props;
        let hasLeftAnnexe = isAnnexeLeft && annexeLeft && annexeLeft.height && annexeLeft.span;
        let hasRightAnnexe = isAnnexeRight && annexeRight && annexeRight.height && annexeRight.span;

        let tempSlope = buildingSlope;
        if(!tempSlope || tempSlope===0){
            tempSlope = 10;
        }
        let roofRadian = (Math.PI * tempSlope) / 180;
        let buildingRoofHeight = isSkillionRoof ?  Math.abs((Math.tan(roofRadian) * buildingSpan))
            : Math.abs((Math.tan(roofRadian) * (buildingSpan / 2)));

        let  leftX = bigPadding + (hasLeftAnnexe ?  annexeLeft.span*scale : 0);
        let  baseY = topPadding +  (buildingHeight + buildingRoofHeight)*scale;

        let frameSelection = FrameSelection.selectFrame(buildingDetails);
        const  {dashLines, verticleArrows, horizontalArrows, boldLines, normalLines, slopes, allDoors, allBraces, allMullions, title} =
            this.initialAll(scale, leftX,  topPadding,baseY, hasLeftAnnexe, hasRightAnnexe, frameSelection);
        return (
            <DrawEndWall1Component stageHeight={stageHeight} stageWidth={stageWidth}
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
                                    setStageRef={setStageRef} isHidden={isHidden}
                                    isQuotePrint = {this.props.isQuotePrint}
                                    title = {title}
                                    grid = "1"
            />
        );
    }
};

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    mezzanineFloor:       (formSelector(state, "mezzanineFloor")),
    roofColors0:    formSelector(state, "roofs[0].color"),
    roofColors1:    formSelector(state, "roofs[1].color"),
    roofColors2:    formSelector(state, "roofs[2].color"),
    wallColors0:    formSelector(state, "walls[0].color"),
});

export default connect(mapStateToProps, {})(DrawEndWall1);