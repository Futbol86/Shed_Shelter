import React from 'react';
import {Arrow, Text} from 'react-konva';

class HorizontalDistanceArrow extends React.Component {

    render() {
        var {points} = this.props;
        var textX = 0;
        var textY = 0;
        var textWidth = 0;
        if(points.length >= 4) {
            textX = points[0];
            textY = points[1] - 15;
            textWidth = points[2] - points[0];
        }
        return (
            <React.Fragment>
                <Arrow {...this.props}
                       pointerAtBeginning={true}
                       stroke="gray"
                       strokeWidth={1}
                       fill="gray"
                       pointerWidth={5}
                />
                <Text
                    x={textX}
                    y={textY}
                    fontSize={11}
                    text={this.props.value}
                    wrap="word"
                    align="center"
                    fill="gray"
                    width={textWidth}
                />
            </React.Fragment>
        );
    }
};

export default HorizontalDistanceArrow;