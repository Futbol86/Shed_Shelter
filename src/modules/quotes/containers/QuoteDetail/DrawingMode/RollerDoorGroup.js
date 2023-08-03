import {
    WALL_TOP_INDEX,
    WALL_BOTTOM_INDEX,
    WALL_LEFT_INDEX,
    WALL_RIGHT_INDEX,
    ANNEXE_WALL_LEFT_INDEX,
    ANNEXE_WALL_RIGHT_INDEX,
    VERTICLE_DOOR,
    HORIZONTAL_DOOR,
    QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS,
    QUOTES_DOOR_KITS,
    QUOTES_DOOR_TYPE_IDS,
    ANNEXE_LEFT_ID,
    ANNEXE_RIGHT_ID
} from "../../../constants";
import React from 'react';
import RollerDoorGroupComponent from '../../../components/QuoteDetail/DrawingMode/RollerDoorGroup';
import CalculationUtils from "../Calculation/CalculationUtils";
import isEmpty from "lodash/isEmpty";

class RollerDoorGroup extends React.Component{

    inititialRollerDoors = () => {
        var {bays, leftX, scale} = this.props;
        var doorItems = [];
        var door;
        var bay;
        var x = leftX;
        if(bays){
            for (var i = 0; i < bays.length; i++){
                bay = bays[i];
                if(bay){
                    if(bay.doors) {

                        for (var doorIndex = 0; doorIndex < bay.doors.length; doorIndex++) {
                            door = bay.doors[doorIndex];
                            //console.log('door:',door);
                            if (door) {
                                doorItems.push(this.calcDoorPosition(door, doorIndex, x, bays, i, bays.length));
                            }
                            //console.log('RollerDoors:', doorItems);
                        }
                    }
                    x = x + bay.actualSize*scale;
                }
            }
        }
        //console.log('RollerDoors:', doorItems);
        return doorItems;
    }

    calcDoorPosition = (door, doorIndex, leftXBay, bays, bayIndex, bayCount) => {
        var {topY, scale, buildingSpan, buildingSlope, buildingHeight, buildingDetails, frameSelection, isQuotePrint} = this.props;
        var bay = bays[bayIndex];
        //calc left top position
        var x = leftXBay;
        var y = topY;
        var doorOrientation;
        var doorOpeningOrientation;
        var limitLeftX, limitRightX, limitTopY, limitBottomY;
        var isDraggable = !isQuotePrint;
        var purlinAndGirtType = buildingDetails.purlinAndGirtType;
        var rollFormSupply = buildingDetails.rollFormSupply;
        var basePlateType = parseInt(buildingDetails.bdHoldDown);
        let limitOffset = CalculationUtils.doorOffsetLimit(door, buildingDetails, bayCount, bays, bayIndex,
            door.wallIndex, frameSelection, basePlateType, purlinAndGirtType, rollFormSupply);
        let dragLimitOffset = CalculationUtils.countDragLimit(door, bayIndex, bays, buildingSpan, buildingHeight, buildingSlope, buildingDetails, frameSelection, basePlateType);
        let doorProfile = QUOTES_DOOR_KITS[door.doorType].find(d => d.id === parseInt(door.kit));
        let annexeLeft = buildingDetails.isAnnexeLeft && !isEmpty(buildingDetails.annexeLeft) ? buildingDetails.annexeLeft : null;
        let annexeRight = buildingDetails.isAnnexeRight && !isEmpty(buildingDetails.annexeRight) ? buildingDetails.annexeRight : null;
        if (!doorProfile){
            return {};
        }
        //console.log("doorProfile", doorProfile);
        if(scale > 0) {
            if (!door.annexeIndex) {
                if (door.wallIndex === WALL_LEFT_INDEX || door.wallIndex === WALL_RIGHT_INDEX) {
                    // verticle door
                    if(door.wallIndex === WALL_RIGHT_INDEX && bayIndex >= 0){
                        x = x + bay.actualSize * scale;
                    }
                    limitTopY = y;
                    limitBottomY = y + buildingSpan*scale - door.width * scale;
                    y = y + door.offset* scale;
                    limitLeftX = limitRightX = x;
                    doorOrientation = VERTICLE_DOOR;
    
                    if (door.portalFrame && door.portalFrame !== 0) {
                        isDraggable = false;
                    }
                } else {
                    // horizontal door
                    if(door.wallIndex === WALL_BOTTOM_INDEX){
                        y = y + buildingSpan*scale;
                    }
                    limitLeftX = x;
                    limitRightX = x + bay.actualSize * scale - door.width * scale;
                    x = x + door.offset* scale;
                    limitTopY = limitBottomY = y;
                    doorOrientation = HORIZONTAL_DOOR;
                }
            
                if (door.openingOrientation){
                    doorOpeningOrientation = door.openingOrientation;
                } else if (doorProfile.code){
                    if (door.wallIndex === WALL_LEFT_INDEX){
                        if (doorProfile.code.includes("IN") === true){
                            doorOpeningOrientation = QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.LEFT_INSIDE;
                        } else {
                            doorOpeningOrientation = QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.LEFT_OUTSIDE;
                        }
                    } else if (door.wallIndex === WALL_RIGHT_INDEX){
                        if (doorProfile.code.includes("IN") === true){
                            doorOpeningOrientation = QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.LEFT_OUTSIDE;
                        } else {
                            doorOpeningOrientation = QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.LEFT_INSIDE;
                        }
                    } else if (door.wallIndex === WALL_TOP_INDEX){
                        if (doorProfile.code.includes("IN") === true){
                            doorOpeningOrientation = QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.RIGHT_OUTSIDE;
                        } else {
                            doorOpeningOrientation = QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.RIGHT_INSIDE;
                        }
                    } else if (door.wallIndex === WALL_BOTTOM_INDEX){
                        if (doorProfile.code.includes("IN") === true){
                            doorOpeningOrientation = QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.RIGHT_INSIDE;
                        } else {
                            doorOpeningOrientation = QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.RIGHT_OUTSIDE;
                        }
                    }
                }
            } else if ((door.annexeIndex === ANNEXE_LEFT_ID && annexeLeft) || (door.annexeIndex === ANNEXE_RIGHT_ID && annexeRight)) {
                let annexe = door.annexeIndex === ANNEXE_LEFT_ID ? annexeLeft : annexeRight;
                if (door.wallIndex === ANNEXE_WALL_LEFT_INDEX || door.wallIndex === ANNEXE_WALL_RIGHT_INDEX) {
                    // verticle door
                    if(door.wallIndex === ANNEXE_WALL_RIGHT_INDEX && bayIndex >= 0){
                        x = x + bay.actualSize * scale;
                    }
                    if(door.annexeIndex === ANNEXE_LEFT_ID){
                        y = y - annexe.span * scale;
                    } else {
                        y = y + buildingSpan * scale;
                    }
                    limitTopY = y;
                    limitBottomY = y + annexe.span * scale - door.width * scale;
                    y = y + door.offset* scale;
                    limitLeftX = limitRightX = x;
                    doorOrientation = VERTICLE_DOOR;
    
                    if (door.portalFrame && door.portalFrame !== 0) {
                        isDraggable = false;
                    }
                } else {
                    // horizontal door
                    if(door.annexeIndex === ANNEXE_LEFT_ID){
                        y = y - annexe.span * scale;
                    } else {
                        y = y + buildingSpan * scale + annexe.span * scale;
                    }
                    limitLeftX = x;
                    limitRightX = x + bay.actualSize * scale - door.width * scale;
                    x = x + door.offset* scale;
                    limitTopY = limitBottomY = y;
                    doorOrientation = HORIZONTAL_DOOR;
                }
            
                if (door.openingOrientation){
                    doorOpeningOrientation = door.openingOrientation;
                } else if (doorProfile.code){
                    if (door.wallIndex === ANNEXE_WALL_LEFT_INDEX){
                        if (doorProfile.code.includes("IN") === true){
                            doorOpeningOrientation = QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.LEFT_INSIDE;
                        } else {
                            doorOpeningOrientation = QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.LEFT_OUTSIDE;
                        }
                    } else if (door.wallIndex === ANNEXE_WALL_RIGHT_INDEX){
                        if (doorProfile.code.includes("IN") === true){
                            doorOpeningOrientation = QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.LEFT_OUTSIDE;
                        } else {
                            doorOpeningOrientation = QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.LEFT_INSIDE;
                        }
                    } else if (door.annexeIndex === ANNEXE_LEFT_ID){
                        if (doorProfile.code.includes("IN") === true){
                            doorOpeningOrientation = QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.RIGHT_OUTSIDE;
                        } else {
                            doorOpeningOrientation = QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.RIGHT_INSIDE;
                        }
                    } else if (door.annexeIndex === ANNEXE_RIGHT_ID){
                        if (doorProfile.code.includes("IN") === true){
                            doorOpeningOrientation = QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.RIGHT_INSIDE;
                        } else {
                            doorOpeningOrientation = QUOTES_ACCESS_DOOR_OPENING_ORIENTATION_IDS.RIGHT_OUTSIDE;
                        }
                    }
                }
            }    
        }

        return {
            doorIndex: doorIndex,
            doorType:door.doorType,
            doorProfile: doorProfile ? doorProfile.name : "",
            width: door.width * scale,
            height: door.height * scale,
            colour: door.colour,
            isOpeningOnly: door.isOpeningOnly,
            posX: x,
            posY: y,
            startX: limitLeftX,
            endX: limitRightX,
            startY: limitTopY,
            endY: limitBottomY,
            isDraggable: isDraggable,
            wallIndex: door.wallIndex,
            bayIndex: bayIndex,
            annexeIndex: door.annexeIndex,
            doorOrientation: doorOrientation,
            scale: scale,
            openingOrientation: doorOpeningOrientation,
            //openingOrientation: door.openingOrientation ? door.openingOrientation : 0,
            leftOffset: Math.max(dragLimitOffset.leftOffset, limitOffset.leftOffset) * scale,
            rightOffset: Math.max(dragLimitOffset.rightOffset, limitOffset.rightOffset) * scale
        }
    }

    handleDragEnd = (attr) => {
        //console.log("Dragend: b:", attr.bayIndex, ", w:", attr.wallIndex,", d:", attr.doorIndex, ", offset:", attr.offset/this.props.scale);
        if(attr.wallIndex >= 0 && attr.bayIndex >= 0 && attr.doorIndex >= 0){
            const {changeFieldValue, buildingDetails} = this.props;
            const fieldName = `bays[${attr.bayIndex}].doors[${attr.doorIndex}].offset`;
            
            //Check if door interact with end wall mullion
            if (((attr.annexeIndex && (attr.wallIndex === ANNEXE_WALL_LEFT_INDEX || attr.wallIndex === ANNEXE_WALL_RIGHT_INDEX)) ||
                (!attr.annexeIndex && (attr.wallIndex === WALL_LEFT_INDEX || attr.wallIndex === WALL_RIGHT_INDEX))) &&
                (attr.doorType === QUOTES_DOOR_TYPE_IDS.WINDOW || attr.doorType === QUOTES_DOOR_TYPE_IDS.ACCESS_DOOR)
            ){
                let bayIndex = attr.bayIndex;
                let annexeIndex = attr.annexeIndex;    
                if (buildingDetails.bays && buildingDetails.bays[bayIndex]){
                    let bay = buildingDetails.bays[bayIndex];
                    let doorIndex = attr.doorIndex;

                    if (bay.doors && bay.doors[doorIndex]){
                        let door = bay.doors[doorIndex];
                        let doorOffset = attr.offset / this.props.scale;
                        let jambWidth = 40;
                        let leftDoor = doorOffset - jambWidth;
                        let rightDoor = doorOffset + door.width + jambWidth;
                        let wallIndex = attr.wallIndex;
                        let mullions = annexeIndex ? CalculationUtils.countAwningEndWallMullionFrame(buildingDetails, wallIndex, door.annexeIndex) :
                            CalculationUtils.countEndWallMullionFrame(buildingDetails, wallIndex, bayIndex);
                        let clashing = false;
                        let mullion;
                        for (let mullionIndex = 0; mullionIndex < mullions.length; mullionIndex++){
                            mullion = mullions[mullionIndex];
                            if (leftDoor < mullion.offset + mullion.height / 2 + 5 && rightDoor > mullion.offset - mullion.height / 2 - 5){
                                clashing = true;
                                break;
                            }
                        }

                        if(clashing){
                            let newDoorOffset1 = Math.ceil(mullion.offset + mullion.height / 2 + 5 + jambWidth);
                            let newDoorOffset2 = Math.floor(mullion.offset - mullion.height / 2 - 5 - jambWidth - door.width);
                            let newDoorOffset;
                            if ((leftDoor + rightDoor) / 2 > mullion.offset){
                                newDoorOffset = CalculationUtils.isDoorClash(door, newDoorOffset1, bayIndex, buildingDetails.bays) ? newDoorOffset2 : newDoorOffset1;
                            } else {
                                newDoorOffset = CalculationUtils.isDoorClash(door, newDoorOffset2, bayIndex, buildingDetails.bays) ? newDoorOffset1 : newDoorOffset2;
                            }
                            
                            if (window.confirm("WARNING: This door clashes with wall mullion." + 
                                                "\nChange offset to " + newDoorOffset + " to avoid clashing?")){
                                if (newDoorOffset === door.offset){
                                    changeFieldValue(fieldName, newDoorOffset - 1);  // <= make props change so the form can re-render
                                }
                                changeFieldValue(fieldName, newDoorOffset);
                            } else {
                                changeFieldValue(fieldName, door.offset - 1);// <= to make the form re-render
                                changeFieldValue(fieldName, door.offset);
                            }
                        } else {
                            changeFieldValue(fieldName, Math.floor(attr.offset/this.props.scale));
                        }
                    }   
                }
            } else {
                changeFieldValue(fieldName, Math.floor(attr.offset/this.props.scale));
            }
        }
    };


    handleClick = (attr) => {
        const {changeFieldValue} = this.props;
        if(attr.wallIndex >= 0 && attr.bayIndex >= 0 && attr.doorIndex >= 0){
            const fieldName = `bays[${attr.bayIndex}].doors[${attr.doorIndex}].openingOrientation`;
            //console.log("Field: ", fieldName);
            changeFieldValue(fieldName, this.rotateToNextOrientation(attr.openingOrientation));
        }
    }

    rotateToNextOrientation = (currentPosition) => {
        return (currentPosition + 1) % 4;
    }


    render() {
        var doors = this.inititialRollerDoors();
        return (
            <RollerDoorGroupComponent {...this.props} doors={doors} handleDragEnd={this.handleDragEnd}
                                      handleDoubleClickToEditDoor={this.props.handleBayDoorEditClick}
                                      handleClick={this.handleClick}
            />
        );
    }
}

export default RollerDoorGroup;