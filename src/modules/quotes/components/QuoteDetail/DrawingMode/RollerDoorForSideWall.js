import React from 'react';
import {Line, Group, Rect, Text} from 'react-konva';

class RollerDoorForSideWall extends React.Component {

    render() {
        var {posX, posY} = this.props;
        const space = 5;
        var tempy = space;
        var points = [];
        while (tempy < this.props.height - space){
            points.push(0);
            points.push(tempy);
            points.push(this.props.width);
            points.push(tempy);
            points.push(0);
            points.push(tempy);

            tempy = tempy + space;
        }

        return (
            <React.Fragment>
                <Group x={posX} y={posY}
                       draggable={this.props.isDraggable}
                       dragBoundFunc={this.props.limitArea}
                       onDragEnd={this.props.handleDragEnd}
                >
                    <Rect x={0} y={0}
                          width={this.props.width}
                          height={this.props.height}
                          fill={this.props.colour}
                          stroke='black'
                          strokeWidth={1}/>

                    <Line points={points}
                          stroke='black'
                          strokeWidth={1}
                    />

                    <Rect x={this.props.width/4} y={this.props.height/4}
                          width={this.props.width/2}
                          height={this.props.height/2}
                          fill='white'
                          stroke='black'
                          strokeWidth={1}/>

                    <Text
                        x={this.props.width/4} y={this.props.height/4}
                        fontSize={10}
                        text={'H:' + this.props.actualHeight + '\nW:' + this.props.actualWidth}
                        wrap="word"
                        align="center"
                        width={this.props.width/2}
                        height={this.props.height/2}
                        fill="black"
                        padding={3}
                    />
                </Group>
            </React.Fragment>
        );
    }
}

export default RollerDoorForSideWall;