import React from 'react';
import { Rect, Group } from 'react-konva';
import {BAY_PARTITION_WIDTH, WALL_THICKNESS, WALL_WIDTH} from "../../../constants";
class CombinationWallRectangle extends React.Component{

    state ={
        border_color: 'black',
        border_width:1
    };

    handleClick = () => {
        //console.log('handleClick:', this.props);
        if(this.props.onWallClick) {
            this.props.onWallClick({
                wallIndex: this.props.wallIndex,
                bayIndex: this.props.bayIndex,
                annexeIndex: this.props.annexeIndex,
                hasWall: this.props.hasWall
            });
        }
    };

    render() {
        if(this.props.isVerticle) {
            if (this.props.hasWall) {
                return (
                    <Rect
                        x={this.props.x-(this.props.width/2)}
                        y={this.props.y}
                        width={this.props.width}
                        height={this.props.height}
                        fill={this.props.color}
                        stroke={this.state.border_color}
                        strokeWidth={this.state.border_width}
                        onClick={this.handleClick}
                    />

                );

            } else {
                return (
                    <Group  onClick={this.handleClick}>
                        <Rect
                            x={this.props.x-(this.props.width/2)}
                            y={this.props.y}
                            width={this.props.width}
                            height={this.props.height}
                            fill='transparent'
                            onClick={this.handleClick}
                        />
                        <Rect
                            x={this.props.x-(WALL_THICKNESS/2)}
                            y={this.props.y}
                            width={WALL_THICKNESS}
                            height={this.props.height}
                            fill={this.state.border_color}
                        />
                    </Group>
                );
            }
        } else {
            if (this.props.hasWall) {
                return (
                    <Rect
                        x={this.props.x}
                        y={this.props.y - (this.props.height/2)}
                        width={this.props.width}
                        height={this.props.height}
                        fill={this.props.color}
                        stroke={this.state.border_color}
                        strokeWidth={this.state.border_color}
                        onClick={this.handleClick}
                    />
                );
            } else {
                return (
                    <Group  onClick={this.handleClick}>
                        <Rect
                            x={this.props.x}
                            y={this.props.y - (this.props.height/2)}
                            width={this.props.width}
                            height={this.props.height}
                            fill='transparent'
                        />
                        <Rect
                            x={this.props.x}
                            y={this.props.y - (WALL_THICKNESS/2)}
                            width={this.props.width}
                            height={WALL_THICKNESS}
                            fill={this.state.border_color}
                        />
                    </Group>
                );
            }
        }
    }
};
export default CombinationWallRectangle;