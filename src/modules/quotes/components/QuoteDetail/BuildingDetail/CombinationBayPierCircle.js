import React from 'react';
import {Circle} from 'react-konva';
import {PIER_CIRCLE_RADIUS, PIER_COLOR} from "../../../constants";
class CombinationBayPierCircle extends React.Component{

    state ={
        border_color: 'black',
        border_width:1
    };

    handleClick = () => {
        if(this.props.onPierClick) {
            this.props.onPierClick({
                pierIndex: this.props.pierIndex,
                bayIndex: this.props.bayIndex,
                annexeIndex: this.props.annexeIndex,
                hasPier: this.props.hasPier
            });
        }
    };

    render() {
            if (this.props.hasPier) {
                return (
                    <Circle ref="circle"
                        x={this.props.x}
                        y={this.props.y}
                        radius={PIER_CIRCLE_RADIUS}
                        fill={PIER_COLOR}
                        stroke={this.state.border_color}
                        strokeWidth={this.state.border_width}
                        onClick={this.handleClick}
                    />
                );
            } else {
                return (
                    <Circle ref="circle"
                        x={this.props.x}
                        y={this.props.y}
                        radius={PIER_CIRCLE_RADIUS}
                        fill="transparent"
                        stroke={this.state.border_color}
                        strokeWidth={this.state.border_width}
                        onClick={this.handleClick}
                    />
                );
            }
    }
};
export default CombinationBayPierCircle;