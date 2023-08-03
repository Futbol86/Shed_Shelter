import React from 'react';
import {connect} from 'react-redux';
import {
    QUOTES_BUILDING_DETAIL_FORM_NAME,
    DRAW_LEFT_PADDING, DRAW_TOP_PADDING,
    ANNEXE_WALL_HORIZONTAL_INDEX,
    ANNEXE_LEFT_ID,
    QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS,
    QUOTES_DOOR_TYPE_IDS,
    WINDOW_DISTANCE_TO_GROUND, 
    WALL_BRACE_LOCATION_IDS,
    WALL_STATUS_HAS_WALL
} from "../../../constants";

import DrawTopSideWallComponent from "../../../components/QuoteDetail/DrawingMode/DrawTopSideWall";

import {formValueSelector} from "redux-form";
import FrameSelection from "../TutorialSelection/FrameSelection";
import CalculationUtils from "../Calculation/CalculationUtils";

class DrawLeftAwningSideWall extends React.Component {

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
        const {buildingSpan, buildingHeight, isAnnexeLeft, annexeLeft,
               buildingSlope, scale, stageHeight, stageWidth, buildingDetails, setStageRef, isHidden
              } = this.props;
        let hasLeftAnnexe = isAnnexeLeft && annexeLeft && annexeLeft.height && annexeLeft.span;

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
            this.initialAll(scale, leftX,  topPadding,baseY, hasLeftAnnexe, false, frameSelection);

        return (
            <DrawTopSideWallComponent stageHeight={stageHeight} stageWidth={stageWidth}
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
                                   grid = "A"
            />
        );

    }
};

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    mezzanineFloor:       (formSelector(state, "mezzanineFloor")),
    roofColors0:    formSelector(state, "roofs[0].color"),
    wallColors2:    formSelector(state, "walls[2].color")
});

export default connect(mapStateToProps, {})(DrawLeftAwningSideWall);