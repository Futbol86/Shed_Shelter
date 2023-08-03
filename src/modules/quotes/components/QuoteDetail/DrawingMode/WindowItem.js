import React from 'react';
import {Group, Rect, Line} from 'react-konva';
import {VERTICLE_DOOR, HORIZONTAL_DOOR} from "../../../constants";

class WindowItem extends React.Component {
    handleDragEnd = e => {
        if(this.props.handleDragEnd) {
            this.props.handleDragEnd({
                newX: e.target.x(),
                newY: e.target.y()
            });
        }
    };

    render() {
        //console.log('WindowItem:', this.props);
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
                          fill={this.props.colour}
                          stroke='black'
                          strokeWidth={1}>
                    </Rect>
                    {(this.props.doorOrientation === VERTICLE_DOOR) &&
                        <React.Fragment>
                            <Line points={[0, this.props.height/2, this.props.width, this.props.height/2]}
                                  stroke='black'
                                  strokeWidth={1}/>
                        </React.Fragment>
                    }

                    {(this.props.doorOrientation === HORIZONTAL_DOOR) &&
                        <React.Fragment>
                            <Line points={[this.props.width/2, 0, this.props.width/2, this.props.height]}
                                  stroke='black'
                                  strokeWidth={1}/>
                        </React.Fragment>
                    }
                </Group>
            </React.Fragment>
        );
    }
}

export default WindowItem;