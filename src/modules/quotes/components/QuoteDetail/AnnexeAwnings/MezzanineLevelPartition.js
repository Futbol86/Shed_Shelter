import React from 'react';
import { Stage, Layer } from 'react-konva';
import {Button, ButtonGroup, Row, Col} from 'reactstrap';
import CombinationWallRectangle from "../BuildingDetail/CombinationWallRectangle";
import CombinationBaseBayRectangle from "../BuildingDetail/CombinationBaseBayRectangle";
import {BAY_PARTITION_WIDTH} from "../../../constants";
class MezzanineLevelPartition extends React.Component{

    state ={
        openBaseColor:'white',
        border_color: 'transparent',
        border_width:1
    };

    render(){
        const {walls, baseBays, scaledBuildingLength} = this.props;

        return(

            <React.Fragment>
                <Row >
                    <Col xs="12" md="12" lg="12" className="row justify-content-center" >
                        <ButtonGroup style={{'maxWidth': '100%', 'overflowX': 'auto'}}>
                            {baseBays && baseBays.map((bay, idx) => {
                                    if (bay) {
                                        return <Button key={idx} type="button">{bay.bayIndex+1}</Button>
                                    }
                                    return null;
                                }
                            )}
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="12" lg="12" style={{'maxWidth': '100%', 'overflowX': 'auto'}}>
                        <Stage width={scaledBuildingLength+10} height={BAY_PARTITION_WIDTH*4}>
                            <Layer>

                                {baseBays && baseBays.map((bay, idx) =>{
                                        if (bay) {
                                            return <CombinationBaseBayRectangle key={idx} x={bay.x} y={bay.y}
                                                                                bayIndex={bay.bayIndex} width={bay.width}
                                                                                height={bay.height}
                                                                                onBaseBayClick={this.props.handleBaseBayClick}
                                                                                color={bay.color}
                                                                                isFilled={bay.hasMezzanineFloor}
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
                                                                         bayIndex={wall.bayIndex} bayWidth={wall.bayWidth}
                                                                         color={wall.color}
                                             />
                                    }
                                    return null;
                                })}
                            </Layer>
                        </Stage>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
};
export default MezzanineLevelPartition;