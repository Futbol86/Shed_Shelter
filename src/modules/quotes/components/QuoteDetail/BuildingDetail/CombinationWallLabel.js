import React from 'react';
import {Circle, Text, Group} from 'react-konva';

class CombinationWallLabel extends React.Component {
    state = {
        circleRadius: 8,
        borderColor: "black",
        borderWidth:1,
        textColor: "black",
        textWidth: 16
    };

    render() {
        return (
            <Group>
                <Circle
                    x={this.props.x}
                    y={this.props.y}
                    radius={this.state.circleRadius}
                    fill="transparent"
                    stroke={this.state.borderColor}
                    strokeWidth={this.state.borderWidth}
                />

                <Text
                    x={this.props.x - 8}
                    y={this.props.y - 5}
                    fontSize={12}
                    text={this.props.text ? this.props.text : ""}
                    wrap="word"
                    align="center"
                    width={this.state.textWidth}
                    height={this.state.textWidth}
                    fill={this.state.textColor}
                />
            </Group>
        );
    }
};
export default CombinationWallLabel;