import React from 'react';
import {Group, Rect, Line, Text} from 'react-konva';

class OpeningOnlyDoor extends React.Component {
    handleDragEnd = e => {
        if(this.props.handleDragEnd) {
            this.props.handleDragEnd({
                newX: e.target.x(),
                newY: e.target.y()
            });
        }
    };

    render() {
        //console.log('OpeningOnlyDoor:', this.props);
        var {posX, posY} = this.props;
        var x = posX;
        var y = posY;
        return (
            <React.Fragment>
                <Group x={x} y={y}
                       draggable={this.props.isDraggable}
                       dragBoundFunc={this.props.limitArea}
                       onDragEnd={this.handleDragEnd}
                       onDblClick={this.props.handleDoubleClickToEditDoor}
                >
                    <Rect x={0} y={0}
                          width={this.props.width}
                          height={this.props.height}
                          fill='lightblue'
                          stroke='black'
                          strokeWidth={1}>
                    </Rect>

                    <React.Fragment>
                        <Line points={[0, 0, this.props.width, this.props.height]}
                              stroke='black'
                              strokeWidth={1}/>

                        <Line points={[this.props.width, 0, 0, this.props.height]}
                              stroke='black'
                              strokeWidth={1}/>
                    </React.Fragment>

                    {!this.props.isDraggable ?
                        <Text
                            x={this.props.width/2 + (this.props.isHorizontal ? - 30 : 2)}
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

export default OpeningOnlyDoor;