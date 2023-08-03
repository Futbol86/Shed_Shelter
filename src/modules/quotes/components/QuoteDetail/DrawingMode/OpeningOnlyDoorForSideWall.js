import React from 'react';
import {Line, Group, Rect, Text} from 'react-konva';

class OpeningOnlyDoorForSideWall extends React.Component {

    render() {
        var {posX, posY} = this.props;

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
                          fill='lightblue'
                          stroke='black'
                          strokeWidth={1}>
                    </Rect>

                    <Line points={[0, 0, this.props.width, this.props.height]}
                          stroke='black'
                          strokeWidth={1}/>

                    <Line points={[this.props.width, 0, 0, this.props.height]}
                          stroke='black'
                          strokeWidth={1}/>

                    {!this.props.isDraggable ?
                        <Text
                            x={this.props.width/2 - 30}
                            y={this.props.height}
                            fontSize={10}
                            text="Opening Only"
                            wrap="word"
                            align="center"
                            fill="black"
                            padding={3}
                        /> :
                        null
                    }
                </Group>
            </React.Fragment>
        );
    }
}

export default OpeningOnlyDoorForSideWall;