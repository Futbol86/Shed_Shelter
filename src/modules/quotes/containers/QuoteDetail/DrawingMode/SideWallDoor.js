import React from 'react';
import {Group} from 'react-konva';
import RollerDoorForSideWall from '../../../components/QuoteDetail/DrawingMode/RollerDoorForSideWall';
import WindowForSideWall from '../../../components/QuoteDetail/DrawingMode/WindowForSideWall';
import AccessDoorForSideWall from '../../../components/QuoteDetail/DrawingMode/AccessDoorForSideWall';
import OpeningOnlyDoorForSideWall from '../../../components/QuoteDetail/DrawingMode/OpeningOnlyDoorForSideWall';
import {
    QUOTES_DOOR_TYPE_IDS
} from "../../../constants";

class SideWallDoor extends React.Component{
    handleDragEnd = e => {
        //store
        //console.log("SideWallDoor - dragEnd: ", this.props);
        if(this.props.handleDragEnd) {
            this.props.handleDragEnd({
                ...this.props,
                newX: e.target.x(),
                newY: e.target.y()

        });
        }
    };

    limitArea = (pos) => {
        var {startX, endX, posY, leftOffset, rightOffset} = this.props;
        var tempX = pos.x;
        if(tempX < (startX + leftOffset) ){
            tempX = (startX + leftOffset);
        } else if (tempX > endX - rightOffset ){
            tempX = endX - rightOffset;
        }
        return{
            x: tempX,
            y: posY
        }
    }

    render() {
        var {doorType, isOpeningOnly} = this.props;
       // console.log('SideWallDoor', this.props);
        if(isOpeningOnly) {
            return (
                <OpeningOnlyDoorForSideWall {...this.props}  limitArea={this.limitArea} handleDragEnd={this.handleDragEnd}/>
            );
        } else if(doorType === QUOTES_DOOR_TYPE_IDS.ROLLER_DOOR) {
            return (
                <RollerDoorForSideWall {...this.props}  limitArea={this.limitArea} handleDragEnd={this.handleDragEnd}/>
            );
        } else if(doorType === QUOTES_DOOR_TYPE_IDS.WINDOW) {
            return (
                <WindowForSideWall {...this.props}  limitArea={this.limitArea} handleDragEnd={this.handleDragEnd}/>
            );
        } else if(doorType === QUOTES_DOOR_TYPE_IDS.ACCESS_DOOR) {

            return (
                <AccessDoorForSideWall {...this.props}
                                       limitArea={this.limitArea}
                                       handleDragEnd={this.handleDragEnd}
                />
            );
        } else {
            return (
                <Group></Group>
            );
        }
    }
}


export default SideWallDoor;