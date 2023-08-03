import React from 'react';
import {ROLLER_DOOR_THICK} from "../../../constants";
import {Layer, Group, Rect, Line} from 'react-konva';

class Brace extends React.Component{
    render(){
        const {allWallBraces, allRoofBraces, handleDoubleClickToEditWallBrace, handleDoubleClickToEditRoofBrace} = this.props;
        let x, y, width, height;
        return(
            <Layer>
                {allWallBraces && allWallBraces.map((brace, idx) => {
                    x = brace.posX;
                    y = brace.posY;
                    width = brace.width;
                    height = brace.height;

                    return (
                        <React.Fragment key = {idx}>
                            <Group x = {x} y = {y} 
                                   onDblClick = {handleDoubleClickToEditWallBrace}
                                   braceIndex = {brace.braceIndex} 
                                   bayIndex = {brace.bayIndex}
                                   annexeIndex = {brace.annexeIndex}
                            >
                                <Rect x = {0} y = {0}
                                    width = {width}
                                    height={height}
                                    stroke = 'black'
                                    strokeWidth = {1}>
                                </Rect>

                                <React.Fragment>
                                    <Line points={[0, 0, width, height]}
                                        stroke = 'black'
                                        strokeWidth = {1}/>

                                    <Line points={[width, 0, 0, height]}
                                        stroke = 'black'
                                        strokeWidth = {1}/>
                                </React.Fragment>
                            </Group>
                        </React.Fragment>
                    );
                })}

                {allRoofBraces && allRoofBraces.map((brace, idx) => {
                    x = brace.posX;
                    y = brace.posY;
                    width = brace.width;
                    height = brace.height;

                    //Rect for double click
                    let dblClickX = width / 2 - width / 6;
                    let dblClickY = height / 2 - height / 6;
                    let dblClickWidth = width / 3;
                    let dblClickHeight = height / 3;
                    return (
                        <React.Fragment key = {idx}>
                            <Group x = {x} y = {y} 
                                   onDblClick = {handleDoubleClickToEditRoofBrace}
                                   wallIndex = {brace.wallIndex} 
                                   bayIndex = {brace.bayIndex}
                                   annexeIndex = {brace.annexeIndex}
                            >
                                <Rect x = {dblClickX} y = {dblClickY}
                                    width = {dblClickWidth}
                                    height={dblClickHeight}
                                    stroke = 'white'
                                    strokeWidth = {1}>
                                </Rect>

                                <React.Fragment>
                                    <Line points={[0, 0, width, height]}
                                        stroke = 'black'
                                        strokeWidth = {1}/>

                                    <Line points={[width, 0, 0, height]}
                                        stroke = 'black'
                                        strokeWidth = {1}/>
                                </React.Fragment>
                            </Group>
                        </React.Fragment>
                    );
                })}
            </Layer>
        );
    }
}

export default Brace;