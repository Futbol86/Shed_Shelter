import React from 'react';
import { Layer} from 'react-konva';
import HorizontalDoor from "../../../containers/QuoteDetail/DrawingMode/HorizontalDoor";
import VerticleDoor from "../../../containers/QuoteDetail/DrawingMode/VerticleDoor";
import {VERTICLE_DOOR} from "../../../constants";

class RollerDoorGroup extends React.Component {

    render() {
        const {doors} = this.props;
        return (
                <Layer>
                    {doors && doors.map((door, idx) => {
                            if (door.doorOrientation === VERTICLE_DOOR) {
                                return <VerticleDoor key={idx} posX={door.posX} posY={door.posY}
                                                     startX={door.startX} endX={door.endX}
                                                     startY={door.startY} endY={door.endY}
                                                     isDraggable = {door.isDraggable}
                                                     colour={door.colour} wallIndex={door.wallIndex}
                                                     bayIndex={door.bayIndex} width={door.width}
                                                     openingOrientation={door.openingOrientation}
                                                     doorOrientation={door.doorOrientation}
                                                     doorType={door.doorType} doorIndex={door.doorIndex}
                                                     isOpeningOnly={door.isOpeningOnly}
                                                     handleDragEnd={this.props.handleDragEnd}
                                                     handleDoubleClickToEditDoor={this.props.handleDoubleClickToEditDoor}
                                                     handleClick={this.props.handleClick}
                                                     leftOffset={door.leftOffset}
                                                     rightOffset={door.rightOffset}
                                                     doorProfile={door.doorProfile}
                                                     annexeIndex={door.annexeIndex}
                                />
                            } else {
                                return <HorizontalDoor key={idx} posX={door.posX} posY={door.posY}
                                                     startX={door.startX} endX={door.endX}
                                                     startY={door.startY} endY={door.endY}
                                                     isDraggable = {door.isDraggable}
                                                     colour={door.colour} wallIndex={door.wallIndex}
                                                     bayIndex={door.bayIndex}  width={door.width}
                                                     openingOrientation={door.openingOrientation}
                                                     doorOrientation={door.doorOrientation}
                                                     doorType={door.doorType} doorIndex={door.doorIndex}
                                                     isOpeningOnly={door.isOpeningOnly}
                                                     handleDragEnd={this.props.handleDragEnd}
                                                     handleDoubleClickToEditDoor={this.props.handleDoubleClickToEditDoor}
                                                     handleClick={this.props.handleClick}
                                                     leftOffset={door.leftOffset}
                                                     rightOffset={door.rightOffset}
                                                     doorProfile={door.doorProfile}
                                                     annexeIndex={door.annexeIndex}
                                />
                            }
                        }
                    )}
                </Layer>
        );
    }
}

export default RollerDoorGroup;