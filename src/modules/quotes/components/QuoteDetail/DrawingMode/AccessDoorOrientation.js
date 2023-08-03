import React from 'react';
import {Group, Line} from 'react-konva';

class AccessDoorOrientation extends React.Component {
    render() {
        //console.log('AccessDoorOrientation component:', this.props);
        var {points} = this.props;
        return (
            <React.Fragment>
                <Line points={points}
                      fill={this.props.colour}
                      closed={true}
                      stroke={this.props.stroke ? this.props.stroke : 'black'}
                      strokeWidth={1}/>
            </React.Fragment>
        );
    }
}

export default AccessDoorOrientation;