import React from 'react';
import {Text as KonvaText} from 'react-konva';

class Text extends React.Component {
    render() {
        const {x, y, width, text, fontSize, fontStyle} = this.props;
        return (
            <KonvaText
                width={width}
                height={20}
                x={x}
                y={y}
                fontSize={fontSize}
                fontStyle={fontStyle}
                text={text}
                wrap="word"
                align="center"
                fill="black"
            />
        );
    }
};

export default Text;