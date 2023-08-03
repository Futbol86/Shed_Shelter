import React from 'react';
import {Button} from 'reactstrap';
import { Stage, Layer, Text, Line} from 'react-konva';
import {
    DRAW_MODE_LEFT_BUTTON_WIDTH,
    WALL_STATUS_HAS_WALL, WALL_RIGHT_INDEX, WALL_LEFT_INDEX
} from "../../../constants";
import {Field} from "redux-form";

class PartitionWallsButton extends React.Component {

    onPartitionChanged =  (event) => {
        const {handleDrawingButtonClick} = this.props;
        const baywallIndex = event.target.value;
        handleDrawingButtonClick(baywallIndex);
    };

    handleButtonClick(){
        const {bayPartionWall, handleDrawingButtonClick} = this.props;
        if (bayPartionWall && bayPartionWall >= 10) {
            handleDrawingButtonClick(bayPartionWall);
        }
    }

    render() {
        const {bays, isSkillionRoof} = this.props;
        var walls = [];
        var bay, nextBay;
        if(bays){
            for (var i = 0; i < bays.length - 1; i++){
                bay = bays[i];
                nextBay = bays[i + 1];
                if(bay){
                    if((bay.partitionRightStatus === WALL_STATUS_HAS_WALL) ||
                        (bay.hasLeftAnnexe && bay.leftAnnexeP3 === WALL_STATUS_HAS_WALL) ||
                        (bay.hasRightAnnexe && bay.rightAnnexeP3 === WALL_STATUS_HAS_WALL) ||
                        (nextBay && nextBay.hasLeftAnnexe && nextBay.leftAnnexeP1 === WALL_STATUS_HAS_WALL) ||
                        (nextBay && nextBay.hasRightAnnexe && nextBay.rightAnnexeP1 === WALL_STATUS_HAS_WALL)
                    ) {
                       walls.push({
                          bayNumber: i + 2,
                          wallIndex: WALL_RIGHT_INDEX
                       });
                   }
                }
            }
        }

        return (

            <div>
                <Button type="button" color="secondary" className="mt-2" onClick={() => this.handleButtonClick()}>
                    <Stage width={DRAW_MODE_LEFT_BUTTON_WIDTH} height={DRAW_MODE_LEFT_BUTTON_WIDTH / 2.5}>
                        <Layer>
                            <Text
                                x={2}
                                y={2}
                                fontSize={12}
                                text={"Partitions"}
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

                <div>
                    <Field component="select" name="bayPartionWall"
                           onChange={this.onPartitionChanged}
                           className="form-control form-control-sm ml-1">
                        <option value=""></option>
                        {walls.map((item, idx) =>
                            <option key={idx} value={item.bayNumber*10 + item.wallIndex}>{item.bayNumber}</option>
                        )}
                    </Field>
                </div>
            </div>
        );
    }
}

export default PartitionWallsButton;