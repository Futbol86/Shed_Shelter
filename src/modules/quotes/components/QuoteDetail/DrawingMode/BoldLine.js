import React from 'react';
import {Line} from 'react-konva';

class BoldLine extends React.Component {

    render() {
        return (
            <Line {...this.props}
                  stroke={this.props.stroke ? this.props.stroke : 'black'}
                  strokeWidth={this.props.strokeWidth ? this.props.strokeWidth : 2}
            />
        );
    }
};

export default BoldLine;