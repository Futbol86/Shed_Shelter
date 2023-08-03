import React from 'react';
import {connect} from 'react-redux';
import {
    QUOTES_BUILDING_DETAIL_FORM_NAME,
    DRAW_LEFT_PADDING,
    DRAW_TOP_PADDING,
    WALL_RIGHT_INDEX,
    WALL_STATUS_HAS_WALL,
    ANNEXE_WALL_RIGHT_INDEX,
    ANNEXE_LEFT_ID,
    ANNEXE_RIGHT_ID,
    QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS,
    WINDOW_DISTANCE_TO_GROUND, 
    QUOTES_DOOR_TYPE_IDS,
    WALL_BRACE_LOCATION_IDS,
    KNEE_BRACE_ANGLE
} from "../../../constants";

import DrawEndWall2Component from "../../../components/QuoteDetail/DrawingMode/DrawEndWall2";

import {formValueSelector} from "redux-form";
import FrameSelection from "../TutorialSelection/FrameSelection";
import CalculationUtils from "../Calculation/CalculationUtils";
import DrawEndWall1Component from "../../../components/QuoteDetail/DrawingMode/DrawEndWall1";
import DrawFloorPlanComponent from "../../../components/QuoteDetail/DrawingMode/DrawFloorPlan";
import {isCarport} from "./Utils";
import isEmpty from 'lodash/isEmpty';
import BaseBuildingCalculation from '../Calculation/BaseBuildingCalculation';
import {getKneeBraceAndCollarTieOptionsFromProduct} from '../../../selectors';

class DrawEndWall2 extends React.Component {

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
        let buildingRoofHeight = isSkillionRoof ? Math.abs((Math.tan(roofRadian) * buildingSpan))
            : Math.abs((Math.tan(roofRadian) * (buildingSpan / 2)));

        let  leftX = bigPadding + (hasRightAnnexe ?  annexeRight.span*scale : 0);
        let  baseY = topPadding +  (buildingHeight + buildingRoofHeight)*scale;

        let gridIndex = buildingDetails.bays ? buildingDetails.bays.length + 1 : "";
        let frameSelection = FrameSelection.selectFrame(buildingDetails);
        const  {dashLines, verticleArrows, horizontalArrows, boldLines, normalLines, slopes, allDoors, allBraces, allMullions, title} =
            this.initialAll(scale, leftX,  topPadding,baseY, hasLeftAnnexe, hasRightAnnexe, frameSelection);

        return (
            <DrawEndWall2Component stageHeight={stageHeight} stageWidth={stageWidth}
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
                                   grid = {gridIndex}
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
    wallColors1:    formSelector(state, "walls[1].color")
});

export default connect(mapStateToProps, {})(DrawEndWall2);