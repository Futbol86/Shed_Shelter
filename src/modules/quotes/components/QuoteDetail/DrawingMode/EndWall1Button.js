import React from 'react';
import {Button} from 'reactstrap';
import { Stage, Layer, Text, Line} from 'react-konva';
import {DRAW_MODE_BUTTON_IDS, DRAW_MODE_LEFT_BUTTON_WIDTH} from "../../../constants";

class EndWall1Button extends React.Component {
    render() {
        const {handleDrawingButtonClick, isSkillionRoof} = this.props;
        return (
            <Button type="button" color="secondary" className="mt-2"
                    onClick={() => handleDrawingButtonClick(DRAW_MODE_BUTTON_IDS.END_WALL_1)}>
                <Stage width={DRAW_MODE_LEFT_BUTTON_WIDTH} height={DRAW_MODE_LEFT_BUTTON_WIDTH / 2.5}>
                    <Layer>
                        <Text
                            x={2}
                            y={2}
                            fontSize={12}
                            text={"End Wall 1"}
                            wrap="word"
                            align="left"
                            width={DRAW_MODE_LEFT_BUTTON_WIDTH / 2}
                        />
                        {isSkillionRoof ?
                            <Line
                                points={[
                                    (DRAW_MODE_LEFT_BUTTON_WIDTH / 2), (DRAW_MODE_LEFT_BUTTON_WIDTH / 2.5 / 4 + 3),
                                    (DRAW_MODE_LEFT_BUTTON_WIDTH / 2), (DRAW_MODE_LEFT_BUTTON_WIDTH / 2.5 - 2),
                                    (DRAW_MODE_LEFT_BUTTON_WIDTH - 3), (DRAW_MODE_LEFT_BUTTON_WIDTH / 2.5 - 2),
                                    (DRAW_MODE_LEFT_BUTTON_WIDTH - 3), (DRAW_MODE_LEFT_BUTTON_WIDTH / 2.5 / 4 - 3),
                                    (DRAW_MODE_LEFT_BUTTON_WIDTH / 2), (DRAW_MODE_LEFT_BUTTON_WIDTH / 2.5 / 4 + 3)
                                ]}
                                stroke="#000000"
                                strokeWidth={1}
                            />
                            :
                            <Line
                                points={[
                                    (DRAW_MODE_LEFT_BUTTON_WIDTH / 2), (DRAW_MODE_LEFT_BUTTON_WIDTH / 2.5 / 4),
                                    (DRAW_MODE_LEFT_BUTTON_WIDTH / 2), (DRAW_MODE_LEFT_BUTTON_WIDTH / 2.5 - 2),
                                    (DRAW_MODE_LEFT_BUTTON_WIDTH - 3), (DRAW_MODE_LEFT_BUTTON_WIDTH / 2.5 - 2),
                                    (DRAW_MODE_LEFT_BUTTON_WIDTH - 3), (DRAW_MODE_LEFT_BUTTON_WIDTH / 2.5 / 4),
                                    (DRAW_MODE_LEFT_BUTTON_WIDTH / 2 + (DRAW_MODE_LEFT_BUTTON_WIDTH / 2 - 3) / 2), (2),
                                    (DRAW_MODE_LEFT_BUTTON_WIDTH / 2), (DRAW_MODE_LEFT_BUTTON_WIDTH / 2.5 / 4)
                                ]}
                                stroke="#000000"
                                strokeWidth={1}
                            />
                        }
                    </Layer>
                </Stage>
            </Button>
            );
    }
}

export default EndWall1Button;