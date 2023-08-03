import React from 'react';
import {connect} from 'react-redux';
import {
    WALL_STATUS_HAS_WALL,
    DRAW_TOP_PADDING,
    DRAW_LEFT_PADDING,
    QUOTES_DM_COMPONENT_IDS
} from "../../../constants";
import DrawFloorPlanComponent from "../../../components/QuoteDetail/DrawingMode/DrawFloorPlan";
import {getQDDMActiveBayComponent} from "../../../selectors";
import FrameSelection from "../TutorialSelection/FrameSelection";
import DrawBottomSideWallComponent from "../../../components/QuoteDetail/DrawingMode/DrawBottomSideWall";
import isEmpty from 'lodash/isEmpty';

class DrawFloorPlan extends React.Component {
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
        const {isAnnexeLeft, isAnnexeRight, annexeLeft, annexeRight, scale, bays, roofs, buildingHeight, buildingSpan, buildingLength,
            handleModalChange, currentModalId, handleBayComponentEditClick, activeBayComponent, buildingSlope, basePlateType,
            buildingDetails, refFloorPlan, setStageRef, isHidden, stageWidth, isQuotePrint} = this.props;
        const activeBayDoor = (activeBayComponent && activeBayComponent.component.type === QUOTES_DM_COMPONENT_IDS.DOOR)
                                ? {bayIndex: activeBayComponent.bayIndex, 
                                  doorIndex: activeBayComponent.component.index} 
                                : null;
        const activeWallBrace = (activeBayComponent && activeBayComponent.component.type === QUOTES_DM_COMPONENT_IDS.WALL_BRACE)
                                ? {
                                    bayIndex: activeBayComponent.bayIndex,
                                    annexeIndex: activeBayComponent.annexeIndex,
                                    braceIndex: activeBayComponent.component.index
                                } : null;
        const activeRoofBrace = (activeBayComponent && activeBayComponent.component.type === QUOTES_DM_COMPONENT_IDS.ROOF_BRACE)
                                ? {
                                    bayIndex: activeBayComponent.bayIndex,
                                    annexeIndex: activeBayComponent.annexeIndex,
                                    wallIndex: activeBayComponent.component.index
                                } : null;

        const hasLeftAnnexe = isAnnexeLeft && annexeLeft && annexeLeft.height > 0 && annexeLeft.span > 0;
        const hasRightAnnexe = isAnnexeRight && annexeRight && annexeRight.height > 0 && annexeRight.span > 0;

        const  topY = topPadding + (hasLeftAnnexe ?  annexeLeft.span*scale : 0);
        const  leftX = isQuotePrint ? (stageWidth / 2 - scale * buildingLength / 2) : bigPadding;
        
        const  {dashLines, verticleArrows, horizontalArrows, boldLines, normalLines, title} =
            this.initialAll(scale, leftX,  topY, hasLeftAnnexe, hasRightAnnexe);

        let frameSelection = FrameSelection.selectFrame(buildingDetails);
        let annexes = {
            annexeLeft,
            annexeRight
        }
        //console.log("FloorPlan - frameSelection", frameSelection);

        return (
            <DrawFloorPlanComponent stageHeight={this.props.stageHeight} stageWidth={this.props.stageWidth}
                                    dashLines={dashLines}
                                    verticleArrows={verticleArrows}
                                    horizontalArrows={horizontalArrows}
                                    boldLines={boldLines}
                                    normalLines={normalLines}
                                    scale = {scale} leftX={leftX} topY={topY}
                                    handleModalChange={handleModalChange}
                                    currentModalId={currentModalId}
                                    buildingHeight={buildingHeight}
                                    bays={bays} roofs = {roofs}
                                    activeBayDoor={activeBayDoor}
                                    activeWallBrace={activeWallBrace}
                                    activeRoofBrace={activeRoofBrace}
                                    handleBayComponentEditClick={handleBayComponentEditClick}
                                    buildingSpan={buildingSpan}
                                    changeFieldValue={this.props.changeFieldValue}
                                    hasLeftAnnexe={hasLeftAnnexe}
                                    hasRightAnnexe={hasRightAnnexe}
                                    annexes={annexes}
                                    buildingSlope={buildingSlope}
                                    frameSelection={frameSelection}
                                    refFloorPlan={refFloorPlan} setStageRef={setStageRef} 
                                    isHidden={isHidden} isQuotePrint = {isQuotePrint}
                                    buildingDetails={buildingDetails}
                                    basePlateType={basePlateType}
                                    title = {title}
                                    isSkillionRoof = {this.props.isSkillionRoof}
            />
        );

    }
}
const mapStateToProps = (state) => ({
    activeBayComponent:      getQDDMActiveBayComponent(state)
});

export default connect(mapStateToProps, {})(DrawFloorPlan);