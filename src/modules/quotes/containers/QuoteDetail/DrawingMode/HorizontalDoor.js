import React from 'react';
import {Group} from 'react-konva';
import RollerDoorItemComponent from '../../../components/QuoteDetail/DrawingMode/RollerDoorItem';
import WindowItemComponent from '../../../components/QuoteDetail/DrawingMode/WindowItem';
import AccessDoorComponent from '../../../components/QuoteDetail/DrawingMode/AccessDoor';
import OpeningOnlyDoorComponent from '../../../components/QuoteDetail/DrawingMode/OpeningOnlyDoor';
import {ROLLER_DOOR_THICK, QUOTES_DOOR_TYPE_IDS, QUOTES_DM_COMPONENT_IDS, ACCESS_DOOR_AREA} from "../../../constants";

class HorizontalDoor extends React.Component{

    limitArea = (pos) => {
        return this.countLimitArea(pos, ROLLER_DOOR_THICK);
    }

    limitAreaAccessDoor = (pos) => {
        return this.countLimitArea(pos, ACCESS_DOOR_AREA);
    }

    countLimitArea = (pos, width) => {
        var {startX, endX, posY, leftOffset, rightOffset} = this.props;
        var tempX = pos.x;
        //console.log("countLimitArea:", pos.x, tempX, startX, endX);
        if(tempX < (startX + leftOffset)){
            tempX = startX + leftOffset;
        } else if (tempX > endX - rightOffset){
            tempX = endX - rightOffset;
        }

        //console.log("countLimitArea:", pos.x, tempX, startX, endX);
        return{
            x: tempX,
            y: posY - width/2
        }
    }

    handleDragEnd = (newPos) => {
        if(this.props.handleDragEnd) {
            this.props.handleDragEnd({
                ...this.props,
                offset: newPos.newX - this.props.startX
            });
        }
    };

    handleDoubleClickToEditDoor = () => {
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
        if(isOpeningOnly){
            return (
                <OpeningOnlyDoorComponent
                    {...this.props}
                    posX={posX} posY={posY - ROLLER_DOOR_THICK/2}
                                            width={width} height={ROLLER_DOOR_THICK}
                                            limitArea={this.limitArea}
                                            isHorizontal={true}
                                            handleDragEnd={this.handleDragEnd}
                                            handleDoubleClickToEditDoor={this.handleDoubleClickToEditDoor}
                />
            );
        } else if(doorType === QUOTES_DOOR_TYPE_IDS.ROLLER_DOOR){
            return (
                <RollerDoorItemComponent
                                          {...this.props}
                                          posX={posX} posY={posY - ROLLER_DOOR_THICK/2}
                                          width={width} height={ROLLER_DOOR_THICK}
                                          limitArea={this.limitArea}
                                          handleDragEnd={this.handleDragEnd}
                                          handleDoubleClickToEditDoor={this.handleDoubleClickToEditDoor}
                />
            );
        } else if(doorType === QUOTES_DOOR_TYPE_IDS.WINDOW){
            return (
                <WindowItemComponent
                    {...this.props}
                    posX={posX} posY={posY - ROLLER_DOOR_THICK/2}
                                          width={width} height={ROLLER_DOOR_THICK}
                                          limitArea={this.limitArea}
                                          handleDragEnd={this.handleDragEnd}
                                          handleDoubleClickToEditDoor={this.handleDoubleClickToEditDoor}
                />
            );
        } else if(doorType === QUOTES_DOOR_TYPE_IDS.ACCESS_DOOR){
            return (
                <AccessDoorComponent {...this.props}
                                          posY = {posY - ACCESS_DOOR_AREA/2}
                                          width={width} height={ACCESS_DOOR_AREA}
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


export default HorizontalDoor;