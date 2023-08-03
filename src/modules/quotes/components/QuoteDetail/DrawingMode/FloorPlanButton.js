import React from 'react';
import {Button} from 'reactstrap';
import { Stage, Layer, Text, Rect, Line} from 'react-konva';
import {DRAW_MODE_BUTTON_IDS, DRAW_MODE_LEFT_BUTTON_WIDTH} from "../../../constants";

const FloorPlanButton = ({ handleDrawingButtonClick }) => (
        <Button color="secondary" type="button" onClick={() => handleDrawingButtonClick(DRAW_MODE_BUTTON_IDS.FLOOR_PLAN)}>
            <Stage  width={DRAW_MODE_LEFT_BUTTON_WIDTH} height={DRAW_MODE_LEFT_BUTTON_WIDTH/2.5}>
                <Layer>
                    <Text
                        x={2}
                        y={2}
                        fontSize={12}
                        text="Floor Plan"
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
                            (DRAW_MODE_LEFT_BUTTON_WIDTH/2 + (DRAW_MODE_LEFT_BUTTON_WIDTH/2-3)/3), (2),
                            (DRAW_MODE_LEFT_BUTTON_WIDTH/2 + (DRAW_MODE_LEFT_BUTTON_WIDTH/2-3)/3), (DRAW_MODE_LEFT_BUTTON_WIDTH/2.5 - 2)
                        ]}
                        stroke="#000000"
                        strokeWidth={1}
                    />

                    <Line
                        points={[
                            (DRAW_MODE_LEFT_BUTTON_WIDTH/2 + (DRAW_MODE_LEFT_BUTTON_WIDTH/2-3)/3*2), (2),
                            (DRAW_MODE_LEFT_BUTTON_WIDTH/2 + (DRAW_MODE_LEFT_BUTTON_WIDTH/2-3)/3*2), (DRAW_MODE_LEFT_BUTTON_WIDTH/2.5 - 2)
                        ]}
                        stroke="#000000"
                        strokeWidth={1}
                    />
                </Layer>
            </Stage>
        </Button>
);

export default FloorPlanButton;