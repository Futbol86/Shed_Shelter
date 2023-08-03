import React from 'react';
import {Line, Text} from 'react-konva';

class SlopeValue extends React.Component {

    render() {
        const {x, y, slope, width, isFromRight} = this.props;
        let tempSlope = slope;
        if(!tempSlope || tempSlope===0){
            tempSlope = 10;
        }
        var roofRadian = (Math.PI * tempSlope) / 180;
        var height = Math.abs((Math.tan(roofRadian) * (width)));
        var y2 = y + height;
        var x2 = (isFromRight ? x - width : x + width);

        return (
            <React.Fragment>
                <Line points={[
                        x2, y,
                        x, y,
                        x2, y2
                      ]}
                      stroke="gray"
                      strokeWidth={1}
                />
                <Text
                        x={isFromRight ? x2 : x}
                        y={y - 12}
                        fontSize={11}
                        text={tempSlope+"°"}
                        wrap="word"
                        align="center"
                        width={width}
                        fill="gray"
                    />
            </React.Fragment>
        );
    }
};

export default SlopeValue;