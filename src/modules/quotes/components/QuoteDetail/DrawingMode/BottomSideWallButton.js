import React from 'react';
import {Button} from 'reactstrap';
import { Stage, Layer, Text, Line, Rect } from 'react-konva';
import {DRAW_MODE_BUTTON_IDS, DRAW_MODE_LEFT_BUTTON_WIDTH} from "../../../constants";

const BottomSideWallButton = ({ grid, buttonId, handleDrawingButtonClick }) => (
    <Button type="button" color="secondary" className="mt-2"
            onClick={() => handleDrawingButtonClick(buttonId)}>
        <Stage  width={DRAW_MODE_LEFT_BUTTON_WIDTH} height={DRAW_MODE_LEFT_BUTTON_WIDTH/2.5}>
            <Layer>
                <Text
                    x={1}
                    y={1}
                    fontSize={12}
                    text={`Side Wall ${grid}`}
                    wrap="word"
                    align="left"
                    width={DRAW_MODE_LEFT_BUTTON_WIDTH/2}
                />
                <Rect
                    x={DRAW_MODE_LEFT_BUTTON_WIDTH/2}
                    y={2}
                    width={DRAW_MODE_LEFT_BUTTON_WIDTH/2 - 3}
                    height={DRAW_MODE_LEFT_BUTTON_WIDTH/2.5 - 4}
                    stroke='black'
                    strokeWidth={1}
                />
                <Line
                    points={[
                        (DRAW_MODE_LEFT_BUTTON_WIDTH/2), (DRAW_MODE_LEFT_BUTTON_WIDTH/2.5/4),
                        (DRAW_MODE_LEFT_BUTTON_WIDTH - 3),(DRAW_MODE_LEFT_BUTTON_WIDTH/2.5/4)
                    ]}
                    stroke="#000000"
                    strokeWidth={1}
                />
            </Layer>
        </Stage>
    </Button>
);

export default BottomSideWallButton;