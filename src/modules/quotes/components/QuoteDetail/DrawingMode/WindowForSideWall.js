import React from 'react';
import {Line, Group, Rect} from 'react-konva';

class WindowForSideWall extends React.Component {

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
                          fill={this.props.colour}
                          stroke='black'
                          strokeWidth={1}>
                    </Rect>

                    <Line points={[this.props.width/2, 0, this.props.width/2, this.props.height]}
                          stroke='black'
                          strokeWidth={1}/>
                </Group>
            </React.Fragment>
        );
    }
}

export default WindowForSideWall;