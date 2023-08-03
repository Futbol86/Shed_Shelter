import React from 'react';
import {Stage, Layer} from 'react-konva';
import DashLine from './DashLine';
import HorizontalDistanceArrow from './HorizontalDistanceArrow';
import VerticleDistanceArrow from './VerticleDistanceArrow';
import BoldLine from './BoldLine';
import NormalLine from './NormalLine';
import Text from './Text';
import SlopeValue from './SlopeValue';
import SideWallDoor from '../../../containers/QuoteDetail/DrawingMode/SideWallDoor';
import BraceForEndWall from './BraceForEndWall';

class DrawEndWall2 extends React.Component {

    render(){
        const {dashLines, verticleArrows, horizontalArrows, boldLines, normalLines, slopes, scale, allDoors, allBraces, allMullions, isHidden, isQuotePrint, title, grid}
                    = this.props;
        return (
            <React.Fragment>
                <Stage height={this.props.stageHeight} width={this.props.stageWidth}
                       ref={ref => this.props.setStageRef(`endWall${grid}`, ref)}
                       style={{display: (isHidden ? 'none' : '')}}
                >
                    <Layer>
                        {slopes && slopes.map((line, idx) => {
                                if (line) {
                                    return <SlopeValue key={idx} x={line.x} y={line.y}
                                                       slope={line.slope} width={line.width}
                                                       isFromRight={line.isFromRight}
                                    />
                                }
                                return null;
                            }

                        )}

                        {verticleArrows && verticleArrows.map((line, idx) => {
                                if (line) {
                                    return <VerticleDistanceArrow key={idx} points={line.points} value={line.value}
                                                                  pointerAtBeginning={line.pointerAtBeginning === false ? line.pointerAtBeginning : true}/>
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
                                    if(line.fill) {
                                        return <NormalLine key={idx} points={line.points} fill={line.fill} closed={line.closed}/>
                                    } else if (line.stroke && line.strokeWidth) {
                                        return <NormalLine key={idx} points={line.points} stroke={line.stroke}
                                                         strokeWidth={line.strokeWidth}
                                        />
                                    } else {
                                        return <NormalLine key={idx} points={line.points}/>
                                    }
                                }
                                return null;
                            }
                        )}

                        {dashLines && dashLines.map((line, idx) => {
                                if (line) {
                                    return <DashLine key={idx} points={line.points} value={line.value}/>
                                }
                                return null;
                            }

                        )}
                    </Layer>

                    <Layer>
                        {boldLines && boldLines.map((line, idx) => {
                                if (line) {
                                    if(line.fill) {
                                        return <BoldLine key={idx} points={line.points} fill={line.fill} closed={line.closed}/>
                                    } else if(line.stroke && line.strokeWidth) {
                                        return <BoldLine key={idx} points={line.points} stroke={line.stroke}
                                                         strokeWidth={line.strokeWidth}
                                        />
                                    }

                                }
                                return null;
                            }
                        )}

                        {allMullions && allMullions.map((line, idx) => {
                                if (line) {
                                    return <DashLine key={idx} points={line.points}/>
                                }
                                return null;
                            }
                        )}

                        {allDoors && allDoors.map((door, idx) => {
                                 if (door) {
                                    return <SideWallDoor {...door}  key={idx}
                                                         scale={scale} isDraggable = {!isQuotePrint && !door.hasPortalFrame}
                                                         handleDragEnd={this.props.handleDragEnd}
                                    />
                                }
                                return null;
                            }
                        )}

                        {allBraces && allBraces.map((brace, idx) => {
                                 if (brace) {
                                    return <BraceForEndWall {...brace}  key={idx}/>
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
                </Stage>
            </React.Fragment>
        );
    }
};

export default DrawEndWall2;