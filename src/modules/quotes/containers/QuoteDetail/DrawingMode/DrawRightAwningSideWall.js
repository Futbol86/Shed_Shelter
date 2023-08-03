import React from 'react';
import {connect} from 'react-redux';
import {
    QUOTES_BUILDING_DETAIL_FORM_NAME,
    DRAW_LEFT_PADDING, DRAW_TOP_PADDING,
    ANNEXE_WALL_HORIZONTAL_INDEX,
    ANNEXE_RIGHT_ID,
    QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS,
    QUOTES_DOOR_TYPE_IDS,
    WINDOW_DISTANCE_TO_GROUND, 
    WALL_BRACE_LOCATION_IDS,
    WALL_STATUS_HAS_WALL,
} from "../../../constants";

import DrawBottomSideWallComponent from "../../../components/QuoteDetail/DrawingMode/DrawBottomSideWall";

import {formValueSelector} from "redux-form";
import FrameSelection from "../TutorialSelection/FrameSelection";
import CalculationUtils from "../Calculation/CalculationUtils";

class DrawRightAwningSideWall extends React.Component {
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
        const {buildingSpan, buildingHeight, isAnnexeLeft, annexeLeft, isAnnexeRight, annexeRight,
               buildingSlope, scale, stageHeight, stageWidth, buildingDetails, setStageRef, isHidden
              } = this.props;
        let hasLeftAnnexe = isAnnexeLeft && annexeLeft && annexeLeft.height && annexeLeft.span;
        let hasRightAnnexe = isAnnexeRight && annexeRight && annexeRight.height && annexeRight.span;

        let tempSlope = buildingSlope;
        if(!tempSlope || tempSlope===0){
            tempSlope = 10;
        }
        let roofRadian = (Math.PI * tempSlope) / 180;
        let buildingRoofHeight = Math.abs((Math.tan(roofRadian) * (buildingSpan / 2)));

        let  leftX = bigPadding;
        let  baseY = topPadding + (buildingHeight + buildingRoofHeight)*scale;

        let frameSelection = FrameSelection.selectFrame(buildingDetails);
        const  {dashLines, verticleArrows, horizontalArrows, boldLines, normalLines, allDoors, allBraces, title} =
            this.initialAll(scale, leftX,  topPadding, baseY, hasLeftAnnexe, hasRightAnnexe, frameSelection);

        return (
            <DrawBottomSideWallComponent stageHeight={stageHeight} stageWidth={stageWidth}
                                   dashLines={dashLines}
                                   verticleArrows={verticleArrows}
                                   horizontalArrows={horizontalArrows}
                                   boldLines={boldLines}
                                   normalLines={normalLines}
                                   allDoors={allDoors}
                                   allBraces={allBraces}
                                   scale={scale}
                                   handleDragEnd={this.handleDragEnd}
                                   setStageRef={setStageRef} isHidden={isHidden}
                                   isQuotePrint = {this.props.isQuotePrint}
                                   title = {title}
                                   grid = {hasLeftAnnexe ? "D" : "C"}
            />
        );

    }
};

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    mezzanineFloor:       (formSelector(state, "mezzanineFloor")),
    roofColors2:    formSelector(state, "roofs[2].color"),
    wallColors3:    formSelector(state, "walls[3].color")
});

export default connect(mapStateToProps, {})(DrawRightAwningSideWall);