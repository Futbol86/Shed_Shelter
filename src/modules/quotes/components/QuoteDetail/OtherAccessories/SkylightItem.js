import React from 'react';
import { Rect, Group } from 'react-konva';
import {BAY_PARTITION_WIDTH, WALL_THICKNESS, WALL_WIDTH} from "../../../constants";
class SkylightItem extends React.Component{

    state ={
        border_color: 'black',
        border_width:1
    };

    handleClick = () => {
        //console.log('handleClick:', this.props);
        if(this.props.onClick) {
            this.props.onClick({
                skylightIndex: this.props.skylightIndex,
                partIndex: this.props.partIndex,
                rowIndex: this.props.rowIndex,
                hasSkylight: this.props.hasSkylight
            });
        }
    };

    render() {
            if (this.props.hasSkylight) {
                return (
                    <Rect
                        x={this.props.x}
                        y={this.props.y}
                        width={this.props.width}
                        height={this.props.height}
                        fill={this.props.skylightColor}
                        stroke={this.state.border_color}
                        strokeWidth={this.state.border_width}
                        onClick={this.handleClick}
                    />

                );

            } else {
                return (
                    <Rect
                        x={this.props.x}
                        y={this.props.y}
                        width={this.props.width}
                        height={this.props.height}
                        fill={this.props.roofColor}
                        stroke={this.state.border_color}
                        strokeWidth={this.state.border_width}
                        onClick={this.handleClick}
                    />

                );
            }
    }
};
export default SkylightItem;