import React from 'react';
import {Arrow, Text} from 'react-konva';

class VerticleDistanceArrow extends React.Component {

    render() {
        var {points} = this.props;
        var textX = 0;
        var textY = 0;
        var textWidth = 0;
        if(points.length >= 4) {
            textX = points[0]-15;
            textY = points[3];
            textWidth = points[3] - points[1];
        }
        return (
            <React.Fragment>
                <Arrow {...this.props}
                       pointerAtBeginning={this.props.pointerAtBeginning === false ? this.props.pointerAtBeginning : true}
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
                    width={textWidth}
                    rotation={-90}
                    fill="gray"
                />
            </React.Fragment>

        )
    }
}

export default VerticleDistanceArrow;