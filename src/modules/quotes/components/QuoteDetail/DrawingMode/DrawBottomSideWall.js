import React from 'react';
import {Stage, Layer} from 'react-konva';
import DashLine from './DashLine';
import HorizontalDistanceArrow from './HorizontalDistanceArrow';
import VerticleDistanceArrow from './VerticleDistanceArrow';
import BoldLine from './BoldLine';
import NormalLine from './NormalLine';
import Text from './Text';
import SideWallDoor from '../../../containers/QuoteDetail/DrawingMode/SideWallDoor';
import BraceForSideWall from './BraceForSideWall';

class DrawBottomSideWall extends React.Component {

    render(){
        const {dashLines, verticleArrows, horizontalArrows, boldLines, normalLines, scale, allDoors, allBraces, isHidden, isQuotePrint, title, grid}
                        = this.props;
        return (
            <React.Fragment>
                <Stage height={this.props.stageHeight} width={this.props.stageWidth}
                       ref={ref => this.props.setStageRef(`sideWall${grid}`, ref)}
                       style={{display: (isHidden ? 'none' : '')}}
                >
                    <Layer>


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
                                    if (line.fill) {
                                        return <NormalLine key={idx} points={line.points} fill={line.fill}
                                                           closed={line.closed} stroke={line.stroke}/>
                                    }
                                    return <NormalLine key={idx} points={line.points}/>
                                }
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
                                    } else {
                                        return <BoldLine key={idx} points={line.points} stroke='black'
                                                         strokeWidth={2}
                                        />
                                    }

                                }
                                return null;
                            }
                        )}

                        {allDoors && allDoors.map((door, idx) => {
                                if (door) {
                                    return <SideWallDoor {...door}  key={idx}
                                                         scale={scale} isDraggable = {!isQuotePrint}
                                                         handleDragEnd={this.props.handleDragEnd}
                                    />
                                }
                                return null;
                            }
                        )}

                        {allBraces && allBraces.map((brace, idx) => {
                                if (brace) {
                                    return <BraceForSideWall {...brace} key={idx} scale={scale} />
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

export default DrawBottomSideWall;