import React from 'react';
import {Group} from 'react-konva';
import NormalLine from './NormalLine';

class BraceForEndWall extends React.Component{
    render(){
        var {lines} = this.props;
        return (
            <React.Fragment>
                <Group x={0} y={0}>
                    {lines && lines.map((line, idx) => {
                            if (line) {
                                return <NormalLine key={idx} points={line.points}/>
                            }
                        }
                    )}
                </Group>
            </React.Fragment>
        );
    }
}

export default BraceForEndWall;