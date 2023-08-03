import React from 'react';
import {Line, Text, Circle} from 'react-konva';

class DashLine extends React.Component {

    render() {
        var {points} = this.props;
        var x = 0;
        var y = 0;
        var textX = 0;
        var textY = 0;
        var textWidth = 0;
        if(points.length >= 4) {
            if(points[0] === points[2]){
                // verticle line
                x = points[0];
                y = points[1] - 8;
            } else  if(points[1] === points[3]) {
                // horizontal line
                x = points[0] - 8;
                y = points[1];
            }
            textX = x - 8;
            textY = y - 5;
            textWidth = 16;
        }
        return (
            <React.Fragment>
                <Line {...this.props}
                      dash={[3, 5]}
                      stroke="gray"
                      strokeWidth={1}
                />

                {this.props.value && this.props.value !== '' &&
                    <React.Fragment>
                        <Circle
                            x={x}
                            y={y}
                            radius={8}
                            stroke="gray"
                            strokeWidth={1}
                        />
                        <Text
                            x={textX}
                            y={textY}
                            fontSize={12}
                            text={this.props.value ? this.props.value : ''}
                            wrap="word"
                            align="center"
                            width={textWidth}
                            height={textWidth}
                            fill="gray"
                            />
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
};

export default DashLine;