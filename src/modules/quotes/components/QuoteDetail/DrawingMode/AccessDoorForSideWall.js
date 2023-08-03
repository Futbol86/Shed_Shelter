import React from 'react';
import {Line, Group, Rect} from 'react-konva';
import {WALL_BOTTOM_INDEX, WALL_LEFT_INDEX, WALL_RIGHT_INDEX, WALL_TOP_INDEX,
    QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS} from "../../../constants";

class AccessDoorForSideWall extends React.Component {

    render() {
        var {doorType, wallIndex, width, height,openingOrientation, posX, posY} = this.props;
        var linesForOpeningOrientation = [];
        var x1, y1, x2, y2, x3, y3;
        y1 = 0;
        y2 = height/2;
        y3 = height;
        if((
                (openingOrientation === QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.LEFT_INSIDE
                    || openingOrientation === QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.LEFT_OUTSIDE)
                &&
                (wallIndex === WALL_TOP_INDEX || wallIndex === WALL_RIGHT_INDEX)
            )
            ||
            (
                (openingOrientation === QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.RIGHT_INSIDE
                    || openingOrientation === QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.RIGHT_OUTSIDE)
                &&
                (wallIndex === WALL_BOTTOM_INDEX || wallIndex === WALL_LEFT_INDEX)
            )
        ){
            x1 = x3 = 0;
            x2 = width;
        } else if((
                (openingOrientation === QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.RIGHT_INSIDE
                    || openingOrientation === QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.RIGHT_OUTSIDE)
                &&
                (wallIndex === WALL_TOP_INDEX || wallIndex === WALL_RIGHT_INDEX))
            ||
            ((openingOrientation === QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.LEFT_INSIDE
                    || openingOrientation === QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.LEFT_OUTSIDE)
                &&
                (wallIndex === WALL_BOTTOM_INDEX || wallIndex === WALL_LEFT_INDEX)
            )
        ){
            x1 = x3 = width;
            x2 = 0;
        }
        linesForOpeningOrientation = [x1,y1, x2, y2, x3, y3];
        //console.log('AccessDoorForSideWall', linesForOpeningOrientation);
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
                          strokeWidth={1}>
                    </Rect>

                    <Line
                        points={linesForOpeningOrientation}
                        stroke="black"
                        strokeWidth={1}
                    />
                </Group>
            </React.Fragment>
        );
    }
}

export default AccessDoorForSideWall;