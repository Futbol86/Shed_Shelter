import React from 'react';
import {Group} from 'react-konva';
import RollerDoorItemComponent from '../../../components/QuoteDetail/DrawingMode/RollerDoorItem';
import WindowItemComponent from '../../../components/QuoteDetail/DrawingMode/WindowItem';
import AccessDoorComponent from '../../../components/QuoteDetail/DrawingMode/AccessDoor';
import OpeningOnlyDoorComponent from '../../../components/QuoteDetail/DrawingMode/OpeningOnlyDoor';
import {ROLLER_DOOR_THICK, QUOTES_DOOR_TYPE_IDS, QUOTES_DM_COMPONENT_IDS, ACCESS_DOOR_AREA} from "../../../constants";

class VerticleDoor extends React.Component{

    limitArea = (pos) => {
        return this.countLimitArea(pos, ROLLER_DOOR_THICK);
    }

    limitAreaAccessDoor = (pos) => {
        return this.countLimitArea(pos, ACCESS_DOOR_AREA);
    }

    countLimitArea = (pos, width) => {
        var {startY, endY, posX, leftOffset, rightOffset} = this.props;
        var tempY = pos.y;
        if(tempY < startY + leftOffset){
            tempY = startY + leftOffset;
        } else if (tempY > endY - rightOffset){
            tempY = endY - rightOffset;
        }
        return{
            x: posX - width/2,
            y: tempY
        }
    }

    handleDragEnd = (newPos) => {
        if(this.props.handleDragEnd) {
            this.props.handleDragEnd({
                ...this.props,
                offset: newPos.newY - this.props.startY
            });
        }
       // console.log('VerticleDoor - dragEnd:',this.props);
    };

    handleDoubleClickToEditDoor = () => {
        //console.log('VerticleDoor - handleDoubleClickToEditDoor:',this.props);
        if(this.props.handleDoubleClickToEditDoor) {
            const {bayIndex, doorIndex} = this.props;
            this.props.handleDoubleClickToEditDoor({
                bayIndex,
                component: {
                    index: doorIndex,
                    type: QUOTES_DM_COMPONENT_IDS.DOOR
                }
            });
        }
    }

    render() {
        var {posX, posY, width, doorType, isOpeningOnly}
                            = this.props;
        //console.log('VerticleDoor', this.props);
        if(isOpeningOnly) {
            return (
                <OpeningOnlyDoorComponent
                    {...this.props}
                    posX={posX - ROLLER_DOOR_THICK / 2} posY={posY}
                                     width={ROLLER_DOOR_THICK} height={width}
                                     limitArea={this.limitArea}
                                     handleDragEnd={this.handleDragEnd}
                                     handleDoubleClickToEditDoor={this.handleDoubleClickToEditDoor}
                />
            );
        } else if(doorType === QUOTES_DOOR_TYPE_IDS.ROLLER_DOOR) {
            return (
                <RollerDoorItemComponent {...this.props}
                                         posX={posX - ROLLER_DOOR_THICK / 2} posY={posY}
                                         width={ROLLER_DOOR_THICK} height={width}
                                         limitArea={this.limitArea}
                                         handleDragEnd={this.handleDragEnd}
                                         handleDoubleClickToEditDoor={this.handleDoubleClickToEditDoor}
                />
            );
        } else if(doorType === QUOTES_DOOR_TYPE_IDS.WINDOW) {
            return (
                <WindowItemComponent
                    {...this.props}
                    posX={posX - ROLLER_DOOR_THICK / 2} posY={posY}
                                         width={ROLLER_DOOR_THICK} height={width}
                                         limitArea={this.limitArea}
                                         handleDragEnd={this.handleDragEnd}
                                         handleDoubleClickToEditDoor={this.handleDoubleClickToEditDoor}
                />
            );
        } else if(doorType === QUOTES_DOOR_TYPE_IDS.ACCESS_DOOR) {
            return (
                <AccessDoorComponent {...this.props}
                                          posX = {posX - ACCESS_DOOR_AREA/2}
                                          width={ACCESS_DOOR_AREA} height={width}
                                          limitArea={this.limitAreaAccessDoor}
                                          handleDragEnd={this.handleDragEnd}
                                          handleDoubleClickToEditDoor={this.handleDoubleClickToEditDoor}
                />
            );
        } else {
            return (
                <Group></Group>
            );
        }
    }
}


export default VerticleDoor;