import React from 'react';
import {ROLLER_DOOR_THICK} from "../../../constants";
import {Layer, Group, Rect, Line} from 'react-konva';

class BraceForSideWall extends React.Component{
    render(){
        var {posX, posY} = this.props;
        return (
            <React.Fragment>
                <Group x={posX} y={posY}>
                    <Line points={[0, 0, this.props.width, this.props.height]}
                          stroke='black'
                          strokeWidth={1}/>

                    <Line points={[this.props.width, 0, 0, this.props.height]}
                          stroke='black'
                          strokeWidth={1}/>
                </Group>
            </React.Fragment>
        );
    }
}

export default BraceForSideWall;