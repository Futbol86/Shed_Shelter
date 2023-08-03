import React from 'react';
import {Group, Rect} from 'react-konva';
import {VERTICLE_DOOR, HORIZONTAL_DOOR} from "../../../constants";

class RollerDoorItem extends React.Component {
    handleDragEnd = e => {
        if(this.props.handleDragEnd) {
            this.props.handleDragEnd({
                newX: e.target.x(),
                newY: e.target.y()
            });
        }
    };

    render() {
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
                                <Rect x={0 + this.props.width/3} y={0}
                                    width={this.props.width/3}
                                    height={this.props.height}
                                    fill={this.props.colour}
                                    stroke='gray'
                                    strokeWidth={1}/>
                           </React.Fragment>
                        }

                        {(this.props.doorOrientation === HORIZONTAL_DOOR) &&
                            <React.Fragment>
                                <Rect x={0} y={0 + this.props.height/3}
                                      width={this.props.width}
                                      height={this.props.height/3}
                                      fill={this.props.colour}
                                      stroke='gray'
                                      strokeWidth={1}/>
                            </React.Fragment>
                        }
                </Group>
            </React.Fragment>
        );
    }
}

export default RollerDoorItem;