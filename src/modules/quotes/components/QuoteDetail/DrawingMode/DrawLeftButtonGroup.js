import React from 'react';
import {ButtonGroup} from 'reactstrap';
import FloorPlanButton from "./FloorPlanButton";
import EndWall1Button from "./EndWall1Button";
import EndWall3Button from "./EndWall3Button";
import PartitionWallsButton from "./PartitionWallsButton";
import TopSideWallButton from "./TopSideWallButton";
import BottomSideWallButton from "./BottomSideWallButton";
import { DRAW_MODE_BUTTON_IDS } from "../../../constants";

const DrawingLeftButtonGroup = ({handleDrawingButtonClick, bays, bayPartionWall, partitionWalls, sideWalls, isSkillionRoof}) => (
    <ButtonGroup className="btn-group-vertical" >
        <FloorPlanButton handleDrawingButtonClick={handleDrawingButtonClick} />
        <EndWall1Button isSkillionRoof={isSkillionRoof} handleDrawingButtonClick={handleDrawingButtonClick} />
        {partitionWalls && partitionWalls.length > 0 &&
            <PartitionWallsButton bays={bays} handleDrawingButtonClick={handleDrawingButtonClick}
                                    bayPartionWall = {bayPartionWall}
                                    isSkillionRoof={isSkillionRoof}

            />
        }
        <EndWall3Button isSkillionRoof={isSkillionRoof} bays={bays} handleDrawingButtonClick={handleDrawingButtonClick} />
        {sideWalls && sideWalls.length > 0 &&
            sideWalls.map((wall, index) => {
                if (wall.buttonId === DRAW_MODE_BUTTON_IDS.LEFT_AWNING_SIDE_WALL || wall.buttonId === DRAW_MODE_BUTTON_IDS.TOP_SIDE_WALL) {
                    return  <TopSideWallButton key={index}
                                grid={wall.grid}
                                buttonId={wall.buttonId}
                                handleDrawingButtonClick={handleDrawingButtonClick} 
                            />;
                } else {
                    return  <BottomSideWallButton key={index}
                                grid={wall.grid}
                                buttonId={wall.buttonId}
                                handleDrawingButtonClick={handleDrawingButtonClick}
                            />
                }
            })
        }
    </ButtonGroup>
);

export default DrawingLeftButtonGroup;