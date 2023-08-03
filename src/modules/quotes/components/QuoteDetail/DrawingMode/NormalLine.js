import React from 'react';
import {Line} from 'react-konva';

class NormalLine extends React.Component {

    render() {
        return (
            <Line {...this.props}
                  stroke={this.props.stroke ? this.props.stroke : 'black'}
                  strokeWidth={1}
            />
        );
    }
};

export default NormalLine;