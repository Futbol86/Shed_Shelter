import React from 'react';
import Modal from 'react-modal';
import {Stage, Layer, Image} from 'react-konva';
import isEmpty from 'lodash/isEmpty';
import useImage from 'use-image';
import RollerDoorGroup from '../../../containers/QuoteDetail/DrawingMode/RollerDoorGroup';
import Brace from '../../../containers/QuoteDetail/DrawingMode/Brace';
import DashLine from './DashLine';
import HorizontalDistanceArrow from './HorizontalDistanceArrow';
import VerticleDistanceArrow from './VerticleDistanceArrow';
import BoldLine from './BoldLine';
import NormalLine from './NormalLine';
import Text from './Text';
import DrawFloorPlanDoorModal from "../../../containers/QuoteDetail/DrawingMode/DrawFloorPlanDoorModal";
import DrawFloorPlanBraceModal from "../../../containers/QuoteDetail/DrawingMode/DrawFloorPlanBraceModal";

import {QUOTES_DOOR_TYPES, QUOTES_STRAP_BRACE_TYPES} from '../../../constants';

class DrawFloorPlan extends React.Component {

    render(){
        const {dashLines, verticleArrows, horizontalArrows, boldLines, normalLines, changeFieldValue,
            handleModalChange, currentModalId, buildingHeight, buildingSpan, bays, roofs, basePlateType,
            activeBayDoor, activeWallBrace, activeRoofBrace, handleBayComponentEditClick, buildingSlope, frameSelection,
            hasLeftAnnexe, hasRightAnnexe, annexes, title, isSkillionRoof,
            isHidden, buildingDetails, isQuotePrint
        } = this.props;
        
        return (
            <div> {/* This <div> is for getting stage width size */}
                <div style={{display: (isHidden ? 'none' : '')}}>
                    {!isQuotePrint && (
                        <div>
                            {QUOTES_DOOR_TYPES.map((door, idx) => {
                                const Img = require("../../../assets/img/" + door.imgSrc);
                                return (
                                    <button key={idx} type="button" className="mr-1" onClick={() => handleModalChange(door.id)}>
                                        <img src={Img} className="img-fluid" />{door.name}
                                    </button>
                                );
                            })}
                            {QUOTES_STRAP_BRACE_TYPES.map((brace, idx) => {
                                const Img = require("../../../assets/img/" + brace.imgSrc);
                                return (
                                    <button key={idx + QUOTES_DOOR_TYPES.length} type="button" className="mr-1" onClick={() => handleModalChange(brace.id)}>
                                        <img src={Img} className="img-fluid" />{brace.name}
                                    </button>
                                );
                            })}

                            <Modal className="Modal__Bootstrap modal-dialog modal-lg"
                                isOpen={(currentModalId > 0 && currentModalId <= 4) || (!isEmpty(activeBayDoor))}
                                onRequestClose={() => handleModalChange(0)}
                                contentLabel="Doors / Windows"
                            >
                                <DrawFloorPlanDoorModal
                                    buildingSlope={buildingSlope}
                                    frameSelection={frameSelection}
                                    currentDoorModalId={currentModalId}
                                    handleModalClose={() => handleModalChange(0)}
                                    buildingHeight={buildingHeight}
                                    buildingSpan={buildingSpan}
                                    hasLeftAnnexe={hasLeftAnnexe}
                                    hasRightAnnexe={hasRightAnnexe}
                                    annexes={annexes}
                                    bays={bays}
                                    activeBayDoor={activeBayDoor}
                                    buildingDetails={buildingDetails}
                                    basePlateType={basePlateType}
                                />
                            </Modal>
                            <Modal className="Modal__Bootstrap modal-dialog modal-lg"
                                isOpen={(currentModalId === 5) || (!isEmpty(activeWallBrace) || !isEmpty(activeRoofBrace)) }
                                onRequestClose={() => handleModalChange(0)}
                                contentLabel="Brace"
                            >
                            <DrawFloorPlanBraceModal 
                                    buildingDetails = {buildingDetails}
                                    handleModalClose={() => handleModalChange(0)}
                                    bays={bays} roofs = {roofs}
                                    activeWallBrace = {activeWallBrace}
                                    activeRoofBrace = {activeRoofBrace}
                                    buildingHeight={buildingHeight}
                                    buildingSpan={buildingSpan}
                                    hasLeftAnnexe={hasLeftAnnexe}
                                />
                            </Modal>
                        </div>
                    )}
                    <Stage height={this.props.stageHeight} width={this.props.stageWidth}
                        ref={ref => this.props.setStageRef('floorPlan', ref)}
                    >
                        <Layer>
                            {dashLines && dashLines.map((line, idx) => {
                                    if (line) {
                                        return <DashLine key={idx} points={line.points} value={line.value}/>
                                    }
                                    return null;
                                }

                            )}

                            {verticleArrows && verticleArrows.map((line, idx) => {
                                    if (line) {
                                        return <VerticleDistanceArrow key={idx} points={line.points} value={line.value}/>
                                    }
                                    return null;
                                }

                            )}

                            {horizontalArrows && horizontalArrows.map((line, idx) => {
                                    if (line) {
                                        return <HorizontalDistanceArrow key={idx} points={line.points} value={line.value}/>
                                    }
                                    return null;
                                }
                            )}

                            {normalLines && normalLines.map((line, idx) => {
                                    if (line) {
                                        return <NormalLine key={idx} points={line.points}/>
                                    }
                                    return null;
                                }
                            )}
                        </Layer>

                        <Layer>
                            {boldLines && boldLines.map((line, idx) => {
                                    if (line) {
                                        return <BoldLine key={idx} points={line.points}/>
                                    }
                                    return null;
                                }
                            )}

                            {title && 
                                <Text
                                    width = {title.width}
                                    x = {title.x}
                                    y = {title.y}
                                    text = {title.text}
                                    fontSize = {title.fontSize}
                                    fontStyle = {title.fontStyle}
                                />
                            }
                        </Layer>

                        <RollerDoorGroup scale={this.props.scale} bays={this.props.bays}
                                        leftX={this.props.leftX} topY={this.props.topY}
                                        buildingDetails={buildingDetails}
                                        buildingHeight={this.props.buildingHeight}
                                        buildingSpan={this.props.buildingSpan}
                                        buildingSlope={buildingSlope}
                                        frameSelection={frameSelection}
                                        changeFieldValue={this.props.changeFieldValue}
                                        handleBayDoorEditClick={handleBayComponentEditClick}
                                        isQuotePrint={isQuotePrint}
                        />

                        <Brace  scale={this.props.scale} bays={this.props.bays} roofs = {this.props.roofs}
                                leftX={this.props.leftX} topY={this.props.topY}
                                buildingDetails={buildingDetails}
                                buildingHeight={this.props.buildingHeight}
                                buildingSpan={this.props.buildingSpan}
                                buildingSlope={buildingSlope}
                                isSkillionRoof={isSkillionRoof}
                                handleBayBraceEditClick={handleBayComponentEditClick}
                        />
                    </Stage>
                </div>
            </div>
        );
    }
}

export default DrawFloorPlan;