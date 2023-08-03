import React from 'react';
import DrawFloorPlan from "../../../containers/QuoteDetail/DrawingMode/DrawFloorPlan";
import DrawEndWall1 from "../../../containers/QuoteDetail/DrawingMode/DrawEndWall1";
import DrawEndWall2 from "../../../containers/QuoteDetail/DrawingMode/DrawEndWall2";
import DrawLeftAwningSideWall from "../../../containers/QuoteDetail/DrawingMode/DrawLeftAwningSideWall";
import DrawRightAwningSideWall from "../../../containers/QuoteDetail/DrawingMode/DrawRightAwningSideWall";
import DrawTopSideWall from "../../../containers/QuoteDetail/DrawingMode/DrawTopSideWall";
import DrawBottomSideWall from "../../../containers/QuoteDetail/DrawingMode/DrawBottomSideWall";
import DrawPartitionWall from "../../../containers/QuoteDetail/DrawingMode/DrawPartitionWall";
import {DRAW_MODE_BUTTON_IDS} from "../../../constants";
import isEmpty from "lodash/isEmpty";

const DrawModeView = (props) => {
    const {currentButtonId, partitionWalls, isAnnexeLeft, isAnnexeRight, annexeLeft, annexeRight} = props;
    const isFloorPlan = (
        (currentButtonId !== DRAW_MODE_BUTTON_IDS.END_WALL_1) &&
        (currentButtonId !== DRAW_MODE_BUTTON_IDS.END_WALL_2) &&
        (currentButtonId !== DRAW_MODE_BUTTON_IDS.LEFT_AWNING_SIDE_WALL) &&
        (currentButtonId !== DRAW_MODE_BUTTON_IDS.TOP_SIDE_WALL) &&
        (currentButtonId !== DRAW_MODE_BUTTON_IDS.BOTTOM_SIDE_WALL) &&
        (currentButtonId !== DRAW_MODE_BUTTON_IDS.RIGHT_AWNING_SIDE_WALL) &&
        (currentButtonId < 10)
    );
    let currentBayIndex = (Math.floor(currentButtonId / 10)) - 2;
    let currentWallIndex = currentButtonId % 10;
    const hasLeftAwning = isAnnexeLeft && !isEmpty(annexeLeft);
    const hasRightAwning = isAnnexeRight && !isEmpty(annexeRight);
    return (
        <React.Fragment>
            <DrawFloorPlan {...props} isHidden={ !isFloorPlan } />
            <DrawEndWall1 {...props} isHidden={currentButtonId !== DRAW_MODE_BUTTON_IDS.END_WALL_1} />
            {partitionWalls && partitionWalls.length ?
                partitionWalls.map((wall, idx) => 
                    <DrawPartitionWall
                        key = {idx}
                        {...props}
                        bayIndex = {wall.bayIndex}
                        wallIndex = {wall.wallIndex}
                        isHidden = {wall.bayIndex !== currentBayIndex || wall.wallIndex !== currentWallIndex}
                    /> 
                ) : null
            }
            <DrawEndWall2 {...props} isHidden={currentButtonId !== DRAW_MODE_BUTTON_IDS.END_WALL_2} />
            {hasLeftAwning ? 
                <DrawLeftAwningSideWall {...props} isHidden={currentButtonId !== DRAW_MODE_BUTTON_IDS.LEFT_AWNING_SIDE_WALL} />
                : null
            }
            <DrawTopSideWall {...props} isHidden={currentButtonId !== DRAW_MODE_BUTTON_IDS.TOP_SIDE_WALL} />
            <DrawBottomSideWall {...props} isHidden={currentButtonId !== DRAW_MODE_BUTTON_IDS.BOTTOM_SIDE_WALL} />
            {hasRightAwning ?
                <DrawRightAwningSideWall {...props} isHidden={currentButtonId !== DRAW_MODE_BUTTON_IDS.RIGHT_AWNING_SIDE_WALL} />
                : null
            }
        </React.Fragment>
    );

    // switch (currentButtonId) {
    //     case DRAW_MODE_BUTTON_IDS.END_WALL_1:
    //         return <DrawEndWall1 {...props} />;
    //     case DRAW_MODE_BUTTON_IDS.END_WALL_2:
    //         return <DrawEndWall2 {...props} />;
    //     case DRAW_MODE_BUTTON_IDS.SIDE_WALL_A:
    //         return <DrawSideWallA {...props} />;
    //     case DRAW_MODE_BUTTON_IDS.SIDE_WALL_B:
    //         return <DrawSideWallB {...props} />;
    //     default: {
    //         if (currentButtonId >= 10) {
    //             return <DrawPartitionWall {...props} />
    //         }
    //         return <DrawFloorPlan {...props} />;
    //     }
    // }

};

export default DrawModeView;