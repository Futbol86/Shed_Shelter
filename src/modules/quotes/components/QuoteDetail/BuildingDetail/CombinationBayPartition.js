import React from 'react';
import { Stage, Layer } from 'react-konva';
import {Button, ButtonGroup, Row, Col} from 'reactstrap';
import CombinationBayPartitionWorkingComponent from './CombinationBayWorkingComponent';
import CombinationWallLabel from './CombinationWallLabel';
import CombinationWallRectangle from "./CombinationWallRectangle";
import CombinationBaseBayRectangle from "./CombinationBaseBayRectangle";
import CombinationAnnexeRectangle from "./CombinationAnnexeRectangle";
import CombinationBayPierCircle from  "./CombinationBayPierCircle";
import CombinationBayFinishedFloorLevel from "./CombinationBayFinishedFloorLevel";
import CombinationBayEndWallOption from "./CombinationBayEndWallOption";
import {BAY_PARTITION_WIDTH} from "../../../constants";

class CombinationBayPartition extends React.Component{
    render(){
        const {wallLabels, walls, baseBays, annexes, isAnnexeLeft, isAnnexeRight, piers, endWalls, hasWallGrids,
            selectedBayIndex, selectedGrid, scaledBuildingLength} = this.props;
        
        return(
            <React.Fragment>
                <Row >
                    <Col xs="12" md="12" lg="12" className="row justify-content-center" >
                         <ButtonGroup style={{'maxWidth': '100%', 'overflowX': 'auto'}}>
                             {baseBays && baseBays.map((bay, idx) => {
                                     if (bay && !bay.annexeIndex) {
                                         return <Button key={idx} type="button" value={bay.bayIndex} 
                                                        onClick={this.props.handleBayButtonClick}
                                                >
                                                    {bay.bayIndex+1}
                                                </Button>
                                     }
                                     return null;
                                 }
                             )}
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="12" lg="12" style={{'maxWidth': '100%', 'overflowX': 'auto'}}>
                        {isAnnexeLeft || isAnnexeRight ?
                            <CombinationBayPartitionWorkingComponent />
                            : null
                        }
                        <Stage width={scaledBuildingLength+30} height={BAY_PARTITION_WIDTH*3}>
                            <Layer>
                                {wallLabels && wallLabels.map((label, idx) => {
                                    if (label) {
                                        return <CombinationWallLabel key={idx} x={label.x} y={label.y} text={label.text} />
                                    }

                                    return null;
                                })}

                                {annexes && annexes.map((annexe, idx) => {
                                    if (annexe) {
                                       return <CombinationAnnexeRectangle key={idx} x={annexe.x} y={annexe.y}
                                                                    annexeIndex={annexe.annexeIndex}
                                                                    bayIndex={annexe.bayIndex}
                                                                    hasAnnexe={annexe.hasAnnexe}
                                                                    width={annexe.width} height={annexe.height}
                                                                    color={annexe.color}
                                                                    onAnnexeClick={this.props.handleAnnexeClick}
                                        />
                                      }
                                      return null;
                                    }

                                )}

                                {baseBays && baseBays.map((bay, idx) =>{
                                    if (bay) {
                                        return <CombinationBaseBayRectangle key={idx} x={bay.x} y={bay.y} text={bay.text}
                                                                     bayIndex={bay.bayIndex}
                                                                     annexeIndex={bay.annexeIndex}
                                                                     hasAnnexe={bay.hasAnnexe}
                                                                     width={bay.width}
                                                                     height={bay.height}
                                                                     onBaseBayClick={this.props.handleBaseBayClick}
                                                                     isFilled={!bay.isOpenBay}
                                                                     color={bay.color}
                                        />
                                    }
                                     return null;
                                }
                                )}

                                {walls && walls.map((wall, idx) =>{
                                    if (wall) {
                                        return <CombinationWallRectangle key={idx} x={wall.x} y={wall.y}
                                                                  hasWall={wall.hasWall}
                                                                  isVerticle={wall.isVerticle}
                                                                  wallIndex={wall.wallIndex}
                                                                  bayIndex={wall.bayIndex}
                                                                  annexeIndex={wall.annexeIndex}
                                                                  width={wall.width} height={wall.height}
                                                                  onWallClick={this.props.handleWallClick}
                                                                  color={wall.color}
                                        />
                                    }
                                    return null;
                                })}

                                {piers && piers.map((pier, idx) => {
                                    if(pier){
                                        return <CombinationBayPierCircle key={idx} x={pier.x} y={pier.y}
                                                                         hasPier={pier.hasPier}
                                                                         pierIndex={pier.pierIndex}
                                                                         bayIndex={pier.bayIndex}
                                                                         annexeIndex={pier.annexeIndex}
                                                                         onPierClick={this.props.handlePierClick}
                                            />
                                    }
                                    return null;
                                })

                                }
                            </Layer>
                        </Stage>
                    </Col>
                </Row>
                {baseBays &&
                    <Row>
                        <Col xs="12" md="12" lg="12">
                            <CombinationBayFinishedFloorLevel baseBays = {baseBays}
                                                            selectedBayIndex = {selectedBayIndex}
                                                            endWalls = {endWalls}
                                                            handleFFLChange = {this.props.handleFFLChange}
                            />
                        </Col>
                    </Row>
                }
                {hasWallGrids && hasWallGrids.length > 0 &&
                    <Row className = "pt-2">
                        <Col xs="12" md="12" lg="12">
                            {selectedGrid ? 
                                <CombinationBayEndWallOption hasWallGrids = {hasWallGrids}
                                                            annexes = {annexes}
                                                            isAnnexeLeft = {isAnnexeLeft}
                                                            selectedGrid = {selectedGrid}
                                                            handleGridChange = {this.props.handleGridChange}
                                                            handleIsGaraportFlashingChange = {this.props.handleIsGaraportFlashingChange}
                                                            handleSheetingDirectionChange = {this.props.handleSheetingDirectionChange}
                                                            handleSheetSideChange={this.props.handleSheetSideChange}
                                />
                                : null
                            }
                        </Col>
                    </Row>
                }
        </React.Fragment>
        );
    }
};

CombinationBayPartition.propTypes = {
   /* walls: PropTypes.array,
    annexes: PropTypes.array,
    baseBays: PropTypes.array,
    handleWallClick: PropTypes.func.isRequired*/
};

export default CombinationBayPartition;