import React, {Component} from 'react';
import {connect} from 'react-redux';
import BayPartitionComponent from "../../../components/QuoteDetail/BuildingDetail/CombinationBayPartition";

import {
    ANNEXE_HEIGHT, BASE_BAY_PADDING, WALL_THICKNESS, BAY_LENGTH_RATIO, BAY_PARTITION_TOP_PADDING,
    BAY_PARTITION_WIDTH, QUOTES_BUILDING_DETAIL_FORM_NAME, WALL_STATUS_NOTHING, WALL_STATUS_HAS_WALL,
    WALL_STATUS_NO_WALL, BAY_COMBINATION_WALL_COLOR, BAY_COMBINATION_PIER_ONLY_SLAB_COLOR, PIER_STATUS_HAS_PIER, WALL_WIDTH,
    PIER_STATUS_NO_PIER, ANNEXE_LEFT_ID, ANNEXE_RIGHT_ID, ANNEXE_WALL_HORIZONTAL_INDEX, ANNEXE_WALL_LEFT_INDEX,
    ANNEXE_WALL_RIGHT_INDEX, WALL_LEFT_INDEX, WALL_RIGHT_INDEX, SHEETING_DIRECTION_IDS,
    WALL_TOP_INDEX, WALL_BOTTOM_INDEX, QUOTES_DOOR_TYPE_IDS, FOOTING_TYPES, WORKING_COMPONENTS
} from "../../../constants";
import {PRODUCT_CATEGORY_GABLE_CARPORTS, PRODUCT_CATEGORY_SKILLION_CARPORTS} from '../../../../../constants';
import {formValueSelector} from "redux-form";
import CalculationUtils from "../Calculation/CalculationUtils";
import {QD_BD_changeGrid} from "../../../actions";
import {getQDBDSelectedGrid} from "../../../selectors";
import isEmpty from 'lodash/isEmpty';

class CombinationBayPartition extends Component {
    componentDidMount(){
        const {bays, changeFieldValue, workingComponent} = this.props;
        const hasWallGrids = this.calculateHasWallGrids(bays);
        if (hasWallGrids && hasWallGrids.length > 0){
            const grid = hasWallGrids[0];
            const fieldName = 'selectedGridIndex';
            changeFieldValue(fieldName, grid.id);
            this.props.QD_BD_changeGrid({grid: grid});
        }

        if (!workingComponent) {
            const fieldName = 'workingComponent';
            changeFieldValue(fieldName, WORKING_COMPONENTS.SLAB);
        }
    };

    handlePierClick = (attr) => {
        const {changeFieldValue, footingsPiers, bays, workingComponent} = this.props;
        const footingType = Number(footingsPiers);
        if (footingType === FOOTING_TYPES.SLAB_AND_PIERS && Number(workingComponent) === WORKING_COMPONENTS.SLAB) {
            const bayIndex = attr.bayIndex;
            const annexeIndex = attr.annexeIndex;
            const pierIndex = attr.pierIndex;
            const hasPier = attr.hasPier ? PIER_STATUS_NO_PIER : PIER_STATUS_HAS_PIER;
            const bay = bayIndex >= 0 && bayIndex < bays.length ? bays[bayIndex] : null;
            if (pierIndex > 0 && bay && annexeIndex){
                let fieldName = `bays[${bayIndex}].isAnnexeP` + pierIndex;
                changeFieldValue(fieldName, hasPier);
            } else if(pierIndex > 0 && bay){
                let fieldName = `bays[${bayIndex}].isP` + pierIndex;
                changeFieldValue(fieldName, hasPier);
            }
            
            /*const nextBay = bayIndex + 1 < bays.length ? bays[bayIndex + 1] : null;
            const prevBay = bayIndex - 1 >= 0 && bayIndex - 1 < bays.length ? bays[bayIndex - 1] : null;
            const prevPrevBay = bayIndex - 2 >= 0 && bayIndex - 2 < bays.length ? bays[bayIndex - 2] : null;
            if(pierIndex > 0 && bay && annexeIndex){
                let fieldName = `bays[${bayIndex}].isAnnexeP` + pierIndex;
                changeFieldValue(fieldName, hasPier);

                if (annexeIndex === ANNEXE_LEFT_ID) {
                    if (pierIndex === 1) {
                        if (!prevBay || !prevBay.hasLeftAnnexe) {
                            //Left bay
                            fieldName = `bays[${bayIndex}].isLeftAnnexeFullSlab`;
                            changeFieldValue(fieldName, !hasPier);
                        } else {
                            //Check if it is middle bay
                            if (prevPrevBay && prevPrevBay.hasLeftAnnexe) {
                                let prevGridHasPier = prevBay.isAnnexeP1;
                                if (!hasPier || !prevGridHasPier) {
                                    fieldName = `bays[${bayIndex - 1}].isLeftAnnexeFullSlab`;
                                    changeFieldValue(fieldName, true);
                                } else if (hasPier && prevGridHasPier) {
                                    fieldName = `bays[${bayIndex - 1}].isLeftAnnexeFullSlab`;
                                    changeFieldValue(fieldName, false);
                                }
                            }

                            if (nextBay && nextBay.hasLeftAnnexe) {
                                let nextGridHasPier = nextBay.isAnnexeP1;
                                
                                if (!hasPier || !nextGridHasPier) {
                                    fieldName = `bays[${bayIndex}].isLeftAnnexeFullSlab`;
                                    changeFieldValue(fieldName, true);
                                } else if (hasPier && nextGridHasPier) {
                                    fieldName = `bays[${bayIndex}].isLeftAnnexeFullSlab`;
                                    changeFieldValue(fieldName, false);
                                }
                            }
                        }
                    } else if (pierIndex === 6) {
                        if (!nextBay || !nextBay.hasLeftAnnexe) {
                            //Right bay
                            fieldName = `bays[${bayIndex}].isLeftAnnexeFullSlab`;
                            changeFieldValue(fieldName, !hasPier);
                        }
                    }
                } else if (annexeIndex === ANNEXE_RIGHT_ID) {
                    if (pierIndex === 3) {
                        if (!prevBay || !prevBay.hasRightAnnexe) {
                            //Left bay
                            fieldName = `bays[${bayIndex}].isRightAnnexeFullSlab`;
                            changeFieldValue(fieldName, !hasPier);
                        } else {
                            //Check if it is middle bay
                            if (prevPrevBay && prevPrevBay.hasRightAnnexe) {
                                let prevGridHasPier = prevBay.isAnnexeP3;
                                if (!hasPier || !prevGridHasPier) {
                                    fieldName = `bays[${bayIndex - 1}].isRightAnnexeFullSlab`;
                                    changeFieldValue(fieldName, true);
                                } else if (hasPier && prevGridHasPier) {
                                    fieldName = `bays[${bayIndex - 1}].isRightAnnexeFullSlab`;
                                    changeFieldValue(fieldName, false);
                                }
                            }

                            if (nextBay && nextBay.hasRightAnnexe) {
                                let nextGridHasPier = nextBay.isAnnexeP3;
                                
                                if (!hasPier || !nextGridHasPier) {
                                    fieldName = `bays[${bayIndex}].isRightAnnexeFullSlab`;
                                    changeFieldValue(fieldName, true);
                                } else if (hasPier && nextGridHasPier) {
                                    fieldName = `bays[${bayIndex}].isRightAnnexeFullSlab`;
                                    changeFieldValue(fieldName, false);
                                }
                            }
                        }
                    } else if (pierIndex === 8) {
                        if (!nextBay || !nextBay.hasRightAnnexe) {
                            //Right bay
                            fieldName = `bays[${bayIndex}].isRightAnnexeFullSlab`;
                            changeFieldValue(fieldName, !hasPier);
                        }
                    }
                } 
            } else if(pierIndex > 0 && bay){
                let fieldName = `bays[${bayIndex}].isP` + pierIndex;
                changeFieldValue(fieldName, hasPier);
                if (bay) {
                    if (bayIndex === 0 && (pierIndex === 1 || pierIndex === 3)) {
                        //Left bay
                        let gridHasPier = (hasPier && (bay.isP1 || bay.isP3));
                        fieldName = `bays[${bayIndex}].isFullSlab`;
                        changeFieldValue(fieldName, !gridHasPier);
                    } else if (pierIndex === 1 || pierIndex === 3) {
                        //Middle bay
                        let gridHasPier = (hasPier && (bay.isP1 || bay.isP3));
                        if (prevPrevBay) {
                            let prevGridHasPier = prevBay.isP1 && prevBay.isP3;
                            if (!gridHasPier || !prevGridHasPier) {
                                fieldName = `bays[${bayIndex - 1}].isFullSlab`;
                                changeFieldValue(fieldName, true);
                            } else if (gridHasPier && prevGridHasPier) {
                                fieldName = `bays[${bayIndex - 1}].isFullSlab`;
                                changeFieldValue(fieldName, false);
                            }
                        }

                        if (nextBay) {
                            let nextGridHasPier = nextBay.isP1 && nextBay.isP3;
                            if (!gridHasPier || !nextGridHasPier) {
                                fieldName = `bays[${bayIndex}].isFullSlab`;
                                changeFieldValue(fieldName, true);
                            } else if (gridHasPier && nextGridHasPier) {
                                fieldName = `bays[${bayIndex}].isFullSlab`;
                                changeFieldValue(fieldName, false);
                            }
                        }
                    } else if (pierIndex === 6 || pierIndex === 8) {
                        //Right bay
                        let gridHasPier = (hasPier && (bay.isP6 || bay.isP8));
                        fieldName = `bays[${bayIndex}].isFullSlab`;
                        changeFieldValue(fieldName, !gridHasPier);
                    }
                }
            }*/
        }
    };

    handleWallClick = (attr) => {
        const {bays, changeFieldValue, workingComponent} = this.props;
        if(attr.wallIndex >= 0 && attr.bayIndex >= 0 &&
            (!attr.annexeIndex || (attr.annexeIndex && Number(workingComponent) === WORKING_COMPONENTS.AWNING))
        ){
            const hasWall = !attr.hasWall;
            const partitionWallStatus = this.convertWallIndexToFieldName(attr.wallIndex, attr.annexeIndex)
            let fieldName = `bays[${attr.bayIndex}].` + partitionWallStatus;
            let removedWall = false;
            if (hasWall) {
                changeFieldValue(fieldName, WALL_STATUS_HAS_WALL);
            } else {
                //Check if this wall contains door/window or brace and place a warning
                let hasDoor = false;
                let hasBrace = false;

                if (bays[attr.bayIndex].doors) {
                    if (attr.annexeIndex) {
                        hasDoor = bays[attr.bayIndex].doors.some(door => door.wallIndex === attr.wallIndex && door.annexeIndex === attr.annexeIndex);
                        if (!hasDoor) {
                            //Also check previous bay if wall is left wall or next bay if wall is right wall
                            let wallIndex = attr.wallIndex;
                            let bayIndex = attr.bayIndex;
                            
                            if (wallIndex === ANNEXE_WALL_LEFT_INDEX) {
                                let prevBay = bayIndex - 1 >= 0 ? bays[bayIndex - 1] : null;
                                if (prevBay && prevBay.doors) {
                                    hasDoor = prevBay.doors.some(door => door.wallIndex === ANNEXE_WALL_RIGHT_INDEX && door.annexeIndex === attr.annexeIndex);
                                }
                            } else if (wallIndex === ANNEXE_WALL_RIGHT_INDEX) {
                                let nextBay = bayIndex + 1 < bays.length ? bays[bayIndex + 1] : null;
                                if (nextBay && nextBay.doors) {
                                    hasDoor = nextBay.doors.some(door => door.wallIndex === ANNEXE_WALL_LEFT_INDEX && door.annexeIndex === attr.annexeIndex);
                                }
                            }
                        }
                    } else {
                        hasDoor = bays[attr.bayIndex].doors.some(door => door.wallIndex === attr.wallIndex && !door.annexeIndex);
                    }
                }

                if (bays[attr.bayIndex].braces){
                    if (attr.annexeIndex) {
                        hasBrace = bays[attr.bayIndex].braces.some(brace => brace.wallIndex === attr.wallIndex && brace.annexeIndex === attr.annexeIndex);
                        if (!hasBrace) {
                            //Also check previous bay if wall is left wall or next bay if wall is right wall
                            let wallIndex = attr.wallIndex;
                            let bayIndex = attr.bayIndex;
                            
                            if (wallIndex === ANNEXE_WALL_LEFT_INDEX) {
                                let prevBay = bayIndex - 1 >= 0 ? bays[bayIndex - 1] : null;
                                if (prevBay && prevBay.braces) {
                                    hasBrace = prevBay.braces.some(brace => brace.wallIndex === ANNEXE_WALL_RIGHT_INDEX && brace.annexeIndex === attr.annexeIndex);
                                }
                            } else if (wallIndex === ANNEXE_WALL_RIGHT_INDEX) {
                                let nextBay = bayIndex + 1 < bays.length ? bays[bayIndex + 1] : null;
                                if (nextBay && nextBay.braces) {
                                    hasBrace = nextBay.braces.some(brace => brace.wallIndex === ANNEXE_WALL_LEFT_INDEX && brace.annexeIndex === attr.annexeIndex);
                                }
                            }
                        }
                    } else {
                        hasBrace = bays[attr.bayIndex].braces.some(brace => brace.wallIndex === attr.wallIndex && !brace.annexeIndex);
                    }
                }
               
                if ((!hasDoor && !hasBrace) ||
                    window.confirm('This wall contains a door / window or strap brace.' +
                        '\nRemoving the wall will also remove the door and components' +
                        '\nDo you wish to continue?')
                ) {
                    //Remove all doors if wall is removed
                    if (bays[attr.bayIndex].doors){
                        let bayDoors = [];
                        if (attr.annexeIndex) {
                            bayDoors = bays[attr.bayIndex].doors.filter(door => door.wallIndex !== attr.wallIndex || door.annexeIndex !== attr.annexeIndex);
                        } else {
                            bayDoors = bays[attr.bayIndex].doors.filter(door => door.wallIndex !== attr.wallIndex || door.annexeIndex);
                        }
                        fieldName = `bays[${attr.bayIndex}].doors`;
                        changeFieldValue(fieldName, bayDoors);

                        if (attr.annexeIndex) {
                            let wallIndex = attr.wallIndex;
                            let bayIndex = attr.bayIndex;
                            
                            if (wallIndex === ANNEXE_WALL_LEFT_INDEX) {
                                let prevBay = bayIndex - 1 >= 0 ? bays[bayIndex - 1] : null;
                                if (prevBay && prevBay.doors) {
                                    let prevBayDoors = prevBay.doors.filter(door => door.wallIndex !== ANNEXE_WALL_RIGHT_INDEX || door.annexeIndex !== attr.annexeIndex);
                                    fieldName = `bays[${attr.bayIndex - 1}].doors`;
                                    changeFieldValue(fieldName, prevBayDoors);
                                }
                            } else if (wallIndex === ANNEXE_WALL_RIGHT_INDEX) {
                                let nextBay = bayIndex + 1 < bays.length ? bays[bayIndex + 1] : null;
                                if (nextBay && nextBay.doors) {
                                    let nextBayDoors = nextBay.doors.filter(door => door.wallIndex !== ANNEXE_WALL_LEFT_INDEX || door.annexeIndex !== attr.annexeIndex);
                                    fieldName = `bays[${attr.bayIndex + 1}].doors`;
                                    changeFieldValue(fieldName, nextBayDoors);
                                }
                            }
                        }
                    }

                    //Remove all braces if wall is removed
                    if (bays[attr.bayIndex].braces){
                        let bayBraces = [];
                        if (attr.annexeIndex) {
                            bayBraces = bays[attr.bayIndex].braces.filter(brace => brace.wallIndex !== attr.wallIndex || brace.annexeIndex !== attr.annexeIndex);
                        } else {
                            bayBraces = bays[attr.bayIndex].braces.filter(brace => brace.wallIndex !== attr.wallIndex || brace.annexeIndex);
                        }
                        fieldName = `bays[${attr.bayIndex}].braces`;
                        changeFieldValue(fieldName, bayBraces);

                        if (attr.annexeIndex) {
                            let wallIndex = attr.wallIndex;
                            let bayIndex = attr.bayIndex;
                            
                            if (wallIndex === ANNEXE_WALL_LEFT_INDEX) {
                                let prevBay = bayIndex - 1 >= 0 ? bays[bayIndex - 1] : null;
                                if (prevBay && prevBay.braces) {
                                    let prevBayBraces = prevBay.braces.filter(brace => brace.wallIndex !== ANNEXE_WALL_RIGHT_INDEX || brace.annexeIndex !== attr.annexeIndex);
                                    fieldName = `bays[${attr.bayIndex - 1}].braces`;
                                    changeFieldValue(fieldName, prevBayBraces);
                                }
                            } else if (wallIndex === ANNEXE_WALL_RIGHT_INDEX) {
                                let nextBay = bayIndex + 1 < bays.length ? bays[bayIndex + 1] : null;
                                if (nextBay && nextBay.braces) {
                                    let nextBayBraces = nextBay.braces.filter(brace => brace.wallIndex !== ANNEXE_WALL_LEFT_INDEX || brace.annexeIndex !== attr.annexeIndex);
                                    fieldName = `bays[${attr.bayIndex + 1}].braces`;
                                    changeFieldValue(fieldName, nextBayBraces);
                                }
                            }
                        }
                    }
                    
                    fieldName = `bays[${attr.bayIndex}].` + partitionWallStatus;
                    changeFieldValue(fieldName, WALL_STATUS_NO_WALL);
                    removedWall = true;
                }
            }

            if (hasWall || removedWall) {
                //Reset Finished floor level
                if (bays && !attr.annexeIndex){
                    const newBays = [...bays];
                    newBays[attr.bayIndex][partitionWallStatus] = hasWall ? WALL_STATUS_HAS_WALL : WALL_STATUS_NO_WALL;
                    const {leftWallBayIndex, leftWallIndex, rightWallBayIndex} = CalculationUtils.endWalls(newBays);
                    for (let bayIndex = 0; bayIndex < bays.length; bayIndex++){
                        let bay = bays[bayIndex];
                        if (bay){
                            let FFL;
                            if (leftWallIndex === WALL_LEFT_INDEX){
                                FFL = bayIndex <= rightWallBayIndex ? 0 : -50;
                            } else {
                                FFL = (bayIndex > leftWallBayIndex && bayIndex <= rightWallBayIndex) ? 0 : -50;
                            }
                            fieldName = `bays[${bayIndex}].finishedFloorLevel`;
                            changeFieldValue(fieldName, FFL);
                        }
                    }
                }

                //Re-calculate sheeting direction
                const {leftWallBayIndex, rightWallBayIndex} = CalculationUtils.endWalls(bays);
                for (let bayIndex = 0; bayIndex < bays.length; bayIndex++) {
                    let bay = bays[bayIndex];
                    if (bayIndex >= rightWallBayIndex
                        && bay.partitionRightStatus === WALL_STATUS_HAS_WALL
                        && !bay.partitionRightSheetingDirection
                    ) {
                        fieldName = `bays[${bayIndex}].partitionRightSheetingDirection`;
                        changeFieldValue(fieldName, SHEETING_DIRECTION_IDS.FROM_BOTTOM_WALL);
                    } else if (bay.partitionRightStatus !== WALL_STATUS_HAS_WALL) {
                        fieldName = `bays[${bayIndex}].partitionRightSheetingDirection`;
                        changeFieldValue(fieldName, 0);
                    }
                    
                    if (bay.partitionLeftStatus !== WALL_STATUS_HAS_WALL) {
                        fieldName = `bays[${bayIndex}].partitionLeftSheetingDirection`;
                        changeFieldValue(fieldName, 0);
                    }
                }

                //Update door width to avoid clashing
                if (attr.bayIndex >= leftWallBayIndex && attr.bayIndex < rightWallBayIndex) {
                    let bay = bays[attr.bayIndex];
                    let gridId = attr.bayIndex + 2;
                    fieldName = `bays[${attr.bayIndex}].partitionRightSheetSide`;
                    if (bay.partitionRightStatus === WALL_STATUS_HAS_WALL) {
                        changeFieldValue(fieldName, gridId - 1);
                        //Check door offset
                        let sideWallDoors = [];
                        if (bay && bay.doors) {
                            sideWallDoors = bay.doors.filter(bayDoor =>
                                bayDoor.doorType === QUOTES_DOOR_TYPE_IDS.ROLLER_DOOR &&
                                (bayDoor.wallIndex === WALL_TOP_INDEX || bayDoor.wallIndex === WALL_BOTTOM_INDEX)
                            );
                        }

                        if (sideWallDoors.length > 0) {
                            let hasDoorChanged = false;
                            let {selectedFrame, purlinAndGirtType} = this.props;
                            let midFrameType = selectedFrame && selectedFrame.MidColumnMember ? selectedFrame.MidColumnMember : "";
                            let columnWidth;
                            if (midFrameType.includes("C150")) {
                                columnWidth = 64
                            } else if (midFrameType.includes("C200") || midFrameType.includes("C250")) {
                                columnWidth = 76;
                            } else {
                                columnWidth = 96;
                            }
                            let portalFrameDoors = bay.doors.filter(bayDoor =>
                                bayDoor.doorType === QUOTES_DOOR_TYPE_IDS.ROLLER_DOOR &&
                                bayDoor.wallIndex === WALL_RIGHT_INDEX &&
                                bayDoor.portalFrame && Number(bayDoor.portalFrame) > 0
                            );
        
                            if (portalFrameDoors && portalFrameDoors.length > 0) {
                                for (let doorIndex = 0; doorIndex < portalFrameDoors.length; doorIndex++) {
                                    let bayDoor = portalFrameDoors[doorIndex];
                                    let doorFrameType = bayDoor.frameType ? bayDoor.frameType : "";
                                    let doorFrameWidth;
                                    if (doorFrameType.includes("C150")) {
                                        doorFrameWidth = 64
                                    } else if (doorFrameType.includes("C200") || doorFrameType.includes("C250")) {
                                        doorFrameWidth = 76;
                                    } else {
                                        doorFrameWidth = 96;
                                    }
                                    if (doorFrameWidth > columnWidth) {
                                        columnWidth = doorFrameWidth;
                                    }
                                }
                            }
                            let buildingOffset = CalculationUtils.convertPurlinAndGirtTypeToOffset(purlinAndGirtType);
                            for (let doorIndex = 0; doorIndex < sideWallDoors.length; doorIndex++) {
                                let door = sideWallDoors[doorIndex];
                                let doorFrameWidth = (door.frameType && door.frameType.length >= 4) ? parseInt(door.frameType.substring(1, 4)) : 0;
                                let maxDoorWidth = bay.actualSize - (buildingOffset + columnWidth / 2 + doorFrameWidth + 50 + door.offset);
                                if (door.width > maxDoorWidth) {
                                    door.width = maxDoorWidth;
                                    hasDoorChanged = true;
                                }
                            }

                            if (hasDoorChanged) {
                                window.alert("Roller door widths have been adjusted because internal wall was changed. Please check them in Drawing Mode");
                            }
                        }
                    } else {
                        changeFieldValue(fieldName, 0);
                    }
                }

                //Change selected grid
                if (bays && hasWall){
                    let gridId = attr.wallIndex === WALL_LEFT_INDEX ? attr.bayIndex + 1 : attr.bayIndex + 2;
                    const hasWallGrids = this.calculateHasWallGrids(bays);
                    if (hasWallGrids){
                        const selectedGrid = hasWallGrids.find(item => item.id === gridId);
                        if (selectedGrid){
                            changeFieldValue('selectedGridIndex', gridId);
                            this.props.QD_BD_changeGrid({grid: selectedGrid});
                        }
                    }
                } else if (bays && attr.bayIndex >= 0 && attr.bayIndex < bays.length){
                    let fieldName;
                    if (attr.wallIndex === WALL_LEFT_INDEX){
                        fieldName = `bays[${attr.bayIndex}].partitionLeftIsGaraportFlashing`;
                    } else {
                        fieldName = `bays[${attr.bayIndex}].partitionRightIsGaraportFlashing`;
                    }
                    changeFieldValue(fieldName, 0);

                    const hasWallGrids = this.calculateHasWallGrids(bays);
                    if (hasWallGrids && hasWallGrids.length > 0){
                        const selectedGrid = hasWallGrids[0];
                        if (selectedGrid){
                            changeFieldValue('selectedGridIndex', selectedGrid.id);
                            this.props.QD_BD_changeGrid({grid: selectedGrid});
                        }
                    }
                }
            }
        }
    };

    handleBaseBayClick = (attr) => {
        const {changeFieldValue, bays, workingComponent} = this.props;
        const {leftWallBayIndex, leftWallIndex, rightWallBayIndex} = CalculationUtils.endWalls(bays);
        if (attr.bayIndex >= 0 && attr.bayIndex < bays.length && attr.annexeIndex){
            if(this.props.editableAnnexe){
                const {changeFieldValue, initNewRoofSkylightItems} = this.props;
                if(attr.bayIndex >= 0 && attr.bayIndex < this.props.bays.length){
                    const bay = this.props.bays[attr.bayIndex];
                    if(bay && Number(workingComponent) === WORKING_COMPONENTS.AWNING){
                        const fieldName = `bays[${attr.bayIndex}]`; //+ (attr.annexeIndex === ANNEXE_LEFT_ID ? `hasLeftAnnexe` : `hasRightAnnexe`);
                        if(attr.annexeIndex === ANNEXE_LEFT_ID){
                            bay.hasLeftAnnexe = bay.hasLeftAnnexe ? 0 : 1;
                            if(bay.hasLeftAnnexe === 0){
                                bay.leftAnnexeP1 = bay.leftAnnexeP2 = bay.leftAnnexeP3 = WALL_STATUS_NOTHING;
                            }
                        } else {
                            bay.hasRightAnnexe = bay.hasRightAnnexe ? 0 : 1;
                            if(bay.hasRightAnnexe === 0){
                                bay.rightAnnexeP1 = bay.rightAnnexeP2 = bay.rightAnnexeP3 = WALL_STATUS_NOTHING;
                            }
                        }
                        changeFieldValue(fieldName, bay);
                        // reinit skylight
                        var newBays = this.props.bays;
                        newBays[attr.bayIndex] = bay
                        initNewRoofSkylightItems({...this.props, bays:this.props.bays});
    
                       // console.log('AnnexeClick',fieldName,': bay-',  attr.bayIndex, ', annexe-',attr.annexeIndex, ',' +
                       //     ' value-',value);
                    } else if (bay) {
                        if (attr.annexeIndex === ANNEXE_LEFT_ID) {
                            const fieldName = `bays[${attr.bayIndex}].isLeftAnnexeFullSlab`;
                            changeFieldValue(fieldName, !bay.isLeftAnnexeFullSlab);
                        } else if (attr.annexeIndex === ANNEXE_RIGHT_ID) {
                            const fieldName = `bays[${attr.bayIndex}].isRightAnnexeFullSlab`;
                            changeFieldValue(fieldName, !bay.isRightAnnexeFullSlab);
                        } 
                    }
                }
            }
        } else if (Number(workingComponent) === WORKING_COMPONENTS.SLAB && attr.bayIndex >= 0 && attr.bayIndex < bays.length){
            const bayIndex = attr.bayIndex;
            const bay = bays[bayIndex];
            changeFieldValue("selectedBayIndex", bayIndex);
            
            if (bay.finishedFloorLevel === undefined || bay.finishedFloorLevel === null){
                const fieldName = `bays[${bayIndex}].finishedFloorLevel`;
                let FFL;
                if (leftWallIndex === WALL_LEFT_INDEX){
                    FFL = bayIndex <= rightWallBayIndex ? 0 : -50;
                } else {
                    FFL = (bayIndex > leftWallBayIndex && bayIndex <= rightWallBayIndex) ? 0 : -50;
                }
                changeFieldValue(fieldName, FFL);
            }

            const fieldName = `bays[${bayIndex}].isFullSlab`;
            changeFieldValue(fieldName, !bay.isFullSlab);
        }

        /*
        const {footingsPiers} = this.props;
        if(footingsPiers) {
            if (attr.bayIndex >= 0 && attr.bayIndex < this.props.bays.length
                && !this.isOpenBase(this.props.bays[attr.bayIndex])) {
                //TODO: have to reset surrounding walls
                var fieldName;
                if (attr.bayIndex === 0) {
                    // top wall
                    fieldName = `bays[${attr.bayIndex}].` + this.convertWallIndexToFieldName(1);
                    changeFieldValue(fieldName, WALL_STATUS_NO_WALL);

                    // bottom wall
                    fieldName = `bays[${attr.bayIndex}].` + this.convertWallIndexToFieldName(3);
                    changeFieldValue(fieldName, WALL_STATUS_NO_WALL);

                    // left wall
                    fieldName = `bays[${attr.bayIndex}].` + this.convertWallIndexToFieldName(0);
                    changeFieldValue(fieldName, WALL_STATUS_NO_WALL);

                } else if (attr.bayIndex === this.props.bays.length - 1) {
                    // top wall
                    fieldName = `bays[${attr.bayIndex}].` + this.convertWallIndexToFieldName(1);
                    changeFieldValue(fieldName, WALL_STATUS_NO_WALL);

                    // bottom wall
                    fieldName = `bays[${attr.bayIndex}].` + this.convertWallIndexToFieldName(3);
                    changeFieldValue(fieldName, WALL_STATUS_NO_WALL);

                    // right wall
                    fieldName = `bays[${attr.bayIndex}].` + this.convertWallIndexToFieldName(2);
                    changeFieldValue(fieldName, WALL_STATUS_NO_WALL);
                } else {
                    // top wall
                    fieldName = `bays[${attr.bayIndex}].` + this.convertWallIndexToFieldName(1);
                    changeFieldValue(fieldName, WALL_STATUS_NO_WALL);

                    // bottom wall
                    fieldName = `bays[${attr.bayIndex}].` + this.convertWallIndexToFieldName(3);
                    changeFieldValue(fieldName, WALL_STATUS_NO_WALL);
                }
            }
        }
        */
    };

    handleAnnexeClick = (attr) => {
       if(this.props.editableAnnexe){
            const {changeFieldValue, initNewRoofSkylightItems} = this.props;
            if(attr.bayIndex >= 0 && attr.bayIndex < this.props.bays.length){
                const bay = this.props.bays[attr.bayIndex];
                if(bay){
                    const fieldName = `bays[${attr.bayIndex}]`; //+ (attr.annexeIndex === ANNEXE_LEFT_ID ? `hasLeftAnnexe` : `hasRightAnnexe`);
                    if(attr.annexeIndex === ANNEXE_LEFT_ID){
                        bay.hasLeftAnnexe = bay.hasLeftAnnexe ? 0 : 1;
                        if(bay.hasLeftAnnexe === 0){
                            bay.leftAnnexeP1 = bay.leftAnnexeP2 = bay.leftAnnexeP3 = WALL_STATUS_NOTHING;
                        }
                    } else {
                        bay.hasRightAnnexe = bay.hasRightAnnexe ? 0 : 1;
                        if(bay.hasRightAnnexe === 0){
                            bay.rightAnnexeP1 = bay.rightAnnexeP2 = bay.rightAnnexeP3 = WALL_STATUS_NOTHING;
                        }
                    }
                    changeFieldValue(fieldName, bay);
                    // reinit skylight
                    var newBays = this.props.bays;
                    newBays[attr.bayIndex] = bay
                    initNewRoofSkylightItems({...this.props, bays:this.props.bays});

                   // console.log('AnnexeClick',fieldName,': bay-',  attr.bayIndex, ', annexe-',attr.annexeIndex, ',' +
                   //     ' value-',value);
                }
            }
        }
    };

    handleBayButtonClick = (event) => {
        event.persist();
        const bayIndex = Number(event.target.value);
        const {changeFieldValue, bays} = this.props;
        const {leftWallBayIndex, leftWallIndex, rightWallBayIndex} = CalculationUtils.endWalls(bays);
        if (bayIndex >= 0 && bayIndex < bays.length){
            const bay = bays[bayIndex];
            changeFieldValue("selectedBayIndex", bayIndex);
            
            if (bay.finishedFloorLevel === undefined || bay.finishedFloorLevel === null){
                const fieldName = `bays[${bayIndex}].finishedFloorLevel`;
                let FFL;
                if (leftWallIndex === WALL_LEFT_INDEX){
                    FFL = bayIndex <= rightWallBayIndex ? 0 : -50;
                } else {
                    FFL = (bayIndex > leftWallBayIndex && bayIndex <= rightWallBayIndex) ? 0 : -50;
                }
                changeFieldValue(fieldName, FFL);
            }
        }
    };

    handleFFLChange = (event) => {
        // let FFL = Number(event.target.value);
        // let garaportRange = PREDEFINED_FFL_RANGES.find(range => range.id === 'Garaport');
        // if (garaportRange && FFL >= garaportRange.min && FFL <= garaportRange.max){
        //     //Set all garaport bays same level
        //     const {changeFieldValue, selectedBayIndex, bays} = this.props;
        //     const {leftWallBayIndex, leftWallIndex, rightWallBayIndex} = CalculationUtils.endWalls(bays);
        //     if (leftWallIndex === WALL_RIGHT_INDEX && selectedBayIndex <= leftWallBayIndex){
        //         for (let bayIndex = 0; bayIndex <= leftWallBayIndex; bayIndex++){
        //             if (bayIndex !== selectedBayIndex){
        //                 const fieldName = `bays[${bayIndex}].finishedFloorLevel`;
        //                 changeFieldValue(fieldName, FFL);
        //             }
        //         }
        //     } else if (selectedBayIndex > rightWallBayIndex){
        //         for (let bayIndex = rightWallBayIndex + 1; bayIndex < bays.length; bayIndex++){
        //             if (bayIndex !== selectedBayIndex){
        //                 const fieldName = `bays[${bayIndex}].finishedFloorLevel`;
        //                 changeFieldValue(fieldName, FFL);
        //             }
        //         }
        //     }
        // }
    };

    handleGridChange = (event) => {
        const id = Number(event.target.value);
        const {bays} = this.props;
        if (bays && id){
            const hasWallGrids = this.calculateHasWallGrids(bays);
            if (hasWallGrids){
                const selectedGrid = hasWallGrids.find(item => item.id === id);
                if (selectedGrid && selectedGrid.bayIndex >= 0 && selectedGrid.bayIndex < bays.length){
                    this.props.QD_BD_changeGrid({grid: selectedGrid});
                }
            }
        }
    };

    handleSheetSideChange = (event) => {
        const {selectedGrid, bays} = this.props;
        const bayIndex = selectedGrid.bayIndex;
        if (selectedGrid && bays && bays.length > 1 && bayIndex >= 0 && bayIndex < bays.length - 1) {
            const sheetSideGridId = Number(event.target.value);
            const gridId = selectedGrid.bayIndex + 2;
            if (sheetSideGridId === gridId - 1 ) {
                const bay = bays[bayIndex];
                let sideWallDoors = [];
                if (bay && bay.doors) {
                    sideWallDoors = bay.doors.filter(bayDoor =>
                        bayDoor.doorType === QUOTES_DOOR_TYPE_IDS.ROLLER_DOOR &&
                        (bayDoor.wallIndex === WALL_TOP_INDEX || bayDoor.wallIndex === WALL_BOTTOM_INDEX)
                    );
                }

                if (sideWallDoors.length > 0) {
                    let hasDoorChanged = false;
                    let {selectedFrame, purlinAndGirtType} = this.props;
                    let midFrameType = selectedFrame && selectedFrame.MidColumnMember ? selectedFrame.MidColumnMember : "";
                    let columnWidth;
                    if (midFrameType.includes("C150")) {
                        columnWidth = 64
                    } else if (midFrameType.includes("C200") || midFrameType.includes("C250")) {
                        columnWidth = 76;
                    } else {
                        columnWidth = 96;
                    }
                    let portalFrameDoors = bay.doors.filter(bayDoor =>
                        bayDoor.doorType === QUOTES_DOOR_TYPE_IDS.ROLLER_DOOR &&
                        bayDoor.wallIndex === WALL_RIGHT_INDEX &&
                        bayDoor.portalFrame && Number(bayDoor.portalFrame) > 0
                    );

                    if (portalFrameDoors && portalFrameDoors.length > 0) {
                        for (let doorIndex = 0; doorIndex < portalFrameDoors.length; doorIndex++) {
                            let bayDoor = portalFrameDoors[doorIndex];
                            let doorFrameType = bayDoor.frameType ? bayDoor.frameType : "";
                            let doorFrameWidth;
                            if (doorFrameType.includes("C150")) {
                                doorFrameWidth = 64
                            } else if (doorFrameType.includes("C200") || doorFrameType.includes("C250")) {
                                doorFrameWidth = 76;
                            } else {
                                doorFrameWidth = 96;
                            }
                            if (doorFrameWidth > columnWidth) {
                                columnWidth = doorFrameWidth;
                            }
                        }
                    }

                    let buildingOffset = CalculationUtils.convertPurlinAndGirtTypeToOffset(purlinAndGirtType);
                    for (let doorIndex = 0; doorIndex < sideWallDoors.length; doorIndex++) {
                        let door = sideWallDoors[doorIndex];
                        let doorFrameWidth = (door.frameType && door.frameType.length >= 4) ? parseInt(door.frameType.substring(1, 4)) : 0;
                        let maxDoorWidth = bay.actualSize - (buildingOffset + columnWidth / 2 + doorFrameWidth + 50 + door.offset);
                        if (door.width > maxDoorWidth) {
                            door.width = maxDoorWidth;
                            hasDoorChanged = true;
                        }
                    }

                    if (hasDoorChanged) {
                        window.alert("Roller door widths have been adjusted because internal wall sheet side was changed. Please check them in Drawing Mode");
                    }
                }
            } else if (sheetSideGridId === gridId + 1 ) {
                const bay = bays[bayIndex];
                const nextBay = bays[bayIndex + 1];
                let nextBaySideWallDoors = [];
                if (nextBay && nextBay.doors) {
                    nextBaySideWallDoors = nextBay.doors.filter(bayDoor =>
                        bayDoor.doorType === QUOTES_DOOR_TYPE_IDS.ROLLER_DOOR &&
                        (bayDoor.wallIndex === WALL_TOP_INDEX || bayDoor.wallIndex === WALL_BOTTOM_INDEX)
                    
                    );
                }

                if (nextBaySideWallDoors.length > 0) {
                    let hasDoorChanged = false;
                    let {selectedFrame, purlinAndGirtType} = this.props;
                    let midFrameType = selectedFrame && selectedFrame.MidColumnMember ? selectedFrame.MidColumnMember : "";
                    let columnWidth;
                    if (midFrameType.includes("C150")) {
                        columnWidth = 64
                    } else if (midFrameType.includes("C200") || midFrameType.includes("C250")) {
                        columnWidth = 76;
                    } else {
                        columnWidth = 96;
                    }
                    if (bay && bay.doors) {
                        let portalFrameDoors = bay.doors.filter(bayDoor =>
                            bayDoor.doorType === QUOTES_DOOR_TYPE_IDS.ROLLER_DOOR &&
                            bayDoor.wallIndex === WALL_RIGHT_INDEX &&
                            bayDoor.portalFrame && Number(bayDoor.portalFrame) > 0
                        );
    
                        if (portalFrameDoors && portalFrameDoors.length > 0) {
                            for (let doorIndex = 0; doorIndex < portalFrameDoors.length; doorIndex++) {
                                let bayDoor = portalFrameDoors[doorIndex];
                                let doorFrameType = bayDoor.frameType ? bayDoor.frameType : "";
                                let doorFrameWidth;
                                if (doorFrameType.includes("C150")) {
                                    doorFrameWidth = 64
                                } else if (doorFrameType.includes("C200") || doorFrameType.includes("C250")) {
                                    doorFrameWidth = 76;
                                } else {
                                    doorFrameWidth = 96;
                                }
                                if (doorFrameWidth > columnWidth) {
                                    columnWidth = doorFrameWidth;
                                }
                            }
                        }
                    }

                    let buildingOffset = CalculationUtils.convertPurlinAndGirtTypeToOffset(purlinAndGirtType);
                    for (let doorIndex = 0; doorIndex < nextBaySideWallDoors.length; doorIndex++) {
                        let door = nextBaySideWallDoors[doorIndex];
                        let doorFrameWidth = (door.frameType && door.frameType.length >= 4) ? parseInt(door.frameType.substring(1, 4)) : 0;
                        let minLeftOffset = buildingOffset + columnWidth / 2 + doorFrameWidth + 50;
                        if (door.offset < minLeftOffset) {
                            door.width = door.width - (minLeftOffset - door.offset);
                            door.offset = minLeftOffset;
                            hasDoorChanged = true;
                        }
                    }

                    if (hasDoorChanged) {
                        window.alert("Roller door offsets and widths have been adjusted because internal wall sheet side was changed. Please check them in Drawing Mode");
                    }
                }
            }
        }
    };

    handleIsGaraportFlashingChange = (event) => {
        const isGaraportFlashing = event.target.value + '' ;
        const {selectedGrid, changeFieldValue} = this.props;
        if (selectedGrid){
            const fieldName = this.convertGridToIsFlashingFieldName(selectedGrid);
            changeFieldValue(fieldName, isGaraportFlashing);
        }
    };

    handleSheetingDirectionChange = (event) => {
        const sheetingDirection = Number(event.target.value);
        const {selectedGrid, changeFieldValue} = this.props;
        if (selectedGrid){
            const fieldName = this.convertGridToSheetingDirectionFieldName(selectedGrid);
            changeFieldValue(fieldName, sheetingDirection);
        }
    };

    convertWallIndexToFieldName = (wallIndex, annexeIndex) => {
        if(annexeIndex){
            var prefix = '';
            if(annexeIndex === ANNEXE_LEFT_ID){
                prefix = 'left';
            } else {
                prefix = 'right';
            }
            return prefix + 'AnnexeP' + wallIndex;
        } else {
            switch (wallIndex){
                case 0:
                    return 'partitionLeftStatus';
                case 1:
                    return 'partitionTopStatus';
                case 2:
                    return 'partitionRightStatus';
                case 3:
                    return 'partitionBottomStatus';
            }
        }

    };

    convertGridToIsFlashingFieldName = (grid) => {
        if (grid){
            if (grid.wallIndex === WALL_LEFT_INDEX){
                return `bays[${grid.bayIndex}].partitionLeftIsGaraportFlashing`;
            } else {
                return `bays[${grid.bayIndex}].partitionRightIsGaraportFlashing`;
            }
        }
    };

    convertGridToSheetingDirectionFieldName = (grid) => {
        if (grid){
            if (grid.wallIndex === WALL_LEFT_INDEX){
                return `bays[${grid.bayIndex}].partitionLeftSheetingDirection`;
            } else {
                return `bays[${grid.bayIndex}].partitionRightSheetingDirection`;
            }
        }
    }

    calculateParttionItems = (bays, isAnnexeLeft, isAnnexeRight) => {
        var wallList = [];
        var bayBaseList = [];
        //var annexes = [];
        var piers = [];
        var wallLabels = [];
        var leftX = 80;
        var bay;
        var items;
        if(bays) {
            wallLabels = this.drawWallLabels(bays, isAnnexeLeft, isAnnexeRight, leftX);
            for (var i = 0; i < bays.length; i++) {
                bay = bays[i];
                if (bay) {
                    items = this.calculatePartition(bay, i, leftX);
                    wallList = [
                        ...wallList,
                        ...items.bayWalls
                    ];

                    bayBaseList = [
                        ...bayBaseList,
                        ...items.floors
                    ];

                    // annexes = [
                    //     ...annexes,
                    //     ...items.annexes
                    // ];

                    piers = [
                        ...piers,
                        ...items.piers
                    ];

                    leftX = leftX + bay.actualSize * BAY_LENGTH_RATIO;
                }
            }
        }

        return {
            wallLabels: wallLabels,
            wallList: wallList,
            baseBayList: bayBaseList,
            //annexes: annexes,
            piers: piers,
            scaledBuildingLength:leftX,
        }
    };

    calculatePartition = (bay, index, leftX) =>{
        return{
            bayWalls: this.calculateWalls(bay, index, leftX),
            floors: this.calculateFloors(bay, index, leftX),
            //annexes: this.drawAnnexes(bay, index, leftX),
            piers: this.calculatePiers(bay, index, leftX)
        }
    };

    calculateFloors = (bay, bayIndex, leftX) => {
        let results = [];
        results = this.addItemsToList(this.drawBaseBay(bay, bayIndex, leftX), results);
        results = this.addItemsToList(this.drawAnnexeBaseBay(bay, bayIndex, leftX), results);

        return results;
    };

    calculateWalls = (bay, bayIndex, leftX) => {
        var results = [];
        var w;

        results = this.addItemToList(this.drawWall(bay, bayIndex, 0, bay.partitionLeftStatus, leftX), results);
        results = this.addItemToList(this.drawWall(bay, bayIndex, 1, bay.partitionTopStatus, leftX), results);
        results = this.addItemToList(this.drawWall(bay, bayIndex, 2, bay.partitionRightStatus, leftX), results);
        results = this.addItemToList(this.drawWall(bay, bayIndex, 3, bay.partitionBottomStatus, leftX), results);

        if(this.props.isAnnexeLeft && bay.hasLeftAnnexe) {
            //console.log('isAnnexeLeft:',bay);
            results = this.addItemToList(this.drawAnnexeWall(bay, bayIndex, ANNEXE_LEFT_ID, ANNEXE_WALL_LEFT_INDEX,
                bay.leftAnnexeP1, leftX), results);
            //console.log('isAnnexeLeft:',w);
            results = this.addItemToList(this.drawAnnexeWall(bay, bayIndex, ANNEXE_LEFT_ID, ANNEXE_WALL_HORIZONTAL_INDEX,
                bay.leftAnnexeP2, leftX), results);
            results = this.addItemToList(this.drawAnnexeWall(bay, bayIndex, ANNEXE_LEFT_ID, ANNEXE_WALL_RIGHT_INDEX,
                bay.leftAnnexeP3, leftX), results);
        }

        if(this.props.isAnnexeRight && bay.hasRightAnnexe){
            //console.log('isAnnexeRight:',bay);
            results = this.addItemToList(this.drawAnnexeWall(bay, bayIndex, ANNEXE_RIGHT_ID, ANNEXE_WALL_LEFT_INDEX,
                bay.rightAnnexeP1, leftX), results);
            results = this.addItemToList(this.drawAnnexeWall(bay, bayIndex, ANNEXE_RIGHT_ID, ANNEXE_WALL_HORIZONTAL_INDEX,
                bay.rightAnnexeP2, leftX), results);
            results = this.addItemToList(this.drawAnnexeWall(bay, bayIndex, ANNEXE_RIGHT_ID, ANNEXE_WALL_RIGHT_INDEX,
                bay.rightAnnexeP3, leftX), results);
        }

        return results;
    };

    calculatePiers = (bay, bayIndex, leftX) => {
        let results = [];

        results = this.addItemsToList(this.drawPiers(bay, bayIndex, leftX), results);

        if(this.props.isAnnexeLeft && bay.hasLeftAnnexe) {
            results = this.addItemsToList(this.drawAnnexePiers(bay, bayIndex, ANNEXE_LEFT_ID, leftX), results);
        }

        if(this.props.isAnnexeRight && bay.hasRightAnnexe){
            results = this.addItemsToList(this.drawAnnexePiers(bay, bayIndex, ANNEXE_RIGHT_ID, leftX), results);
        }

        return results;
    };

    calculateHasWallGrids = (bays) => {
        let gridArr = [];
        if (bays){
            for (let bayIndex = 0; bayIndex < bays.length; bayIndex++){
                let bay = bays[bayIndex];
                if (bay.partitionLeftStatus === WALL_STATUS_HAS_WALL){
                    gridArr.push({
                        id: bayIndex + 1,
                        bayIndex: bayIndex,
                        wallIndex: WALL_LEFT_INDEX,
                        desc: `BAY #${(bayIndex + 1)} - LEFT SIDE`
                    });
                }

                if (bay.partitionRightStatus === WALL_STATUS_HAS_WALL){
                    gridArr.push({
                        id: bayIndex + 2,
                        bayIndex: bayIndex,
                        wallIndex: WALL_RIGHT_INDEX,
                        desc: `BAY #${(bayIndex + 1)} - RIGHT SIDE`
                    });
                }
            }
        }
        return gridArr;
    };

    addItemToList = (item, list) => {
        if(item != null){
            list.push(item);
        }
        return list;
    };

    addItemsToList = (items, list) => {
        if(items && items.length){
            for (let i = 0; i < items.length; i++) {
                list.push(items[i]);
            }
        }
        return list;
    };

    drawWallLabels = (bays, isAnnexeLeft, isAnnexeRight, leftX) => {
        let offsetX = 30;
        let wallLabels = [];
        let labelX = leftX - offsetX;
        let labelY;
        
        //Left annexe
        if (isAnnexeLeft) {
            labelY = BAY_PARTITION_TOP_PADDING - ANNEXE_HEIGHT;
            wallLabels.push({
                x: labelX,
                y: labelY,
                text: "A"
            });
        }

        //Top wall
        labelY = BAY_PARTITION_TOP_PADDING;
        wallLabels.push({
            x: labelX,
            y: labelY,
            text: isAnnexeLeft ? "B" : "A"
        });

        //Bottom wall
        labelY = BAY_PARTITION_TOP_PADDING + BAY_PARTITION_WIDTH;
        wallLabels.push({
            x: labelX,
            y: labelY,
            text: isAnnexeLeft ? "C" : "B"
        });

        //Left annexe
        if (isAnnexeRight) {
            labelY = BAY_PARTITION_TOP_PADDING + BAY_PARTITION_WIDTH + ANNEXE_HEIGHT;
            wallLabels.push({
                x: labelX,
                y: labelY,
                text: isAnnexeLeft ? "D" : "C"
            });
        }

        //Grid labels
        if (bays) {
            offsetX = 0;
            labelY = BAY_PARTITION_TOP_PADDING - (isAnnexeLeft ? ANNEXE_HEIGHT + 23 : 30);
            for (let bayIndex = 0; bayIndex < bays.length; bayIndex++) {
                let bay = bays[bayIndex];
                labelX = leftX + offsetX;
                wallLabels.push({
                    x: labelX,
                    y: labelY,
                    text: bayIndex + 1
                });
                offsetX = offsetX + bay.actualSize * BAY_LENGTH_RATIO;
                if (bayIndex === bays.length - 1) {
                    labelX = leftX + offsetX;
                    wallLabels.push({
                        x: labelX,
                        y: labelY,
                        text: bayIndex + 2
                    });
                }
            }
        }

        return wallLabels;
    };

    drawAnnexeWall = (bay, bayIndex, annexeIndex, annexeWallIndex, status, leftX)=>{
        var {bays} = this.props;
        var y1, y2;
        var setAvailableLeftWall;
        if(annexeIndex === ANNEXE_LEFT_ID) {
            // left Annexe
            y1 = BAY_PARTITION_TOP_PADDING - ANNEXE_HEIGHT;
            y2 = BAY_PARTITION_TOP_PADDING;
            setAvailableLeftWall = ((bayIndex - 1 >=0) && bays[bayIndex - 1] && !bays[bayIndex - 1].hasLeftAnnexe);
        } else {
            // right Annexe
            y1 = BAY_PARTITION_TOP_PADDING + BAY_PARTITION_WIDTH;
            y2 = BAY_PARTITION_TOP_PADDING + BAY_PARTITION_WIDTH + ANNEXE_HEIGHT;
            setAvailableLeftWall = ((bayIndex - 1 >=0) && bays[bayIndex - 1] && !bays[bayIndex - 1].hasRightAnnexe);
        }



        if((bayIndex > 0 && annexeWallIndex !== ANNEXE_WALL_LEFT_INDEX)
            || (bayIndex === 0) || setAvailableLeftWall
        ){
            //the annexe wall at the left side of each bay (except bay 0) has nothing to select
            switch (annexeWallIndex){
                case ANNEXE_WALL_LEFT_INDEX:// left verticle
                    return {
                        x:leftX,
                        y:y1,
                        hasWall: status === WALL_STATUS_HAS_WALL,
                        isVerticle:true,
                        wallIndex:annexeWallIndex,
                        bayIndex:bayIndex,
                        width:WALL_WIDTH,
                        color:BAY_COMBINATION_WALL_COLOR,
                        height: ANNEXE_HEIGHT,
                        annexeIndex: annexeIndex
                    };
                case ANNEXE_WALL_HORIZONTAL_INDEX: //  horizontall line
                    return {
                        x:leftX,
                        y: annexeIndex === ANNEXE_LEFT_ID ? y1 : y2,
                        hasWall:  status === WALL_STATUS_HAS_WALL,
                        isVerticle:false,
                        wallIndex:annexeWallIndex,
                        bayIndex:bayIndex,
                        width:bay.actualSize*BAY_LENGTH_RATIO,
                        color:BAY_COMBINATION_WALL_COLOR,
                        height: WALL_WIDTH,
                        annexeIndex: annexeIndex
                    };
                case ANNEXE_WALL_RIGHT_INDEX: //  right vedrticle
                    return {
                        x:leftX + bay.actualSize*BAY_LENGTH_RATIO,
                        y: y1,
                        hasWall:  status === WALL_STATUS_HAS_WALL,
                        isVerticle:true,
                        wallIndex:annexeWallIndex,
                        bayIndex:bayIndex,
                        width:WALL_WIDTH,
                        color:BAY_COMBINATION_WALL_COLOR,
                        height: ANNEXE_HEIGHT,
                        annexeIndex: annexeIndex};
            }
        }
    };

    drawWall = (bay, bayIndex, wallIndex, status, leftX)=>{
        if(status !== WALL_STATUS_NOTHING) // has wall status => wall or thin line
        {
            switch (wallIndex){
                case 0: //left
                    return {
                        x:leftX,
                        y:BAY_PARTITION_TOP_PADDING,
                        hasWall: status === WALL_STATUS_HAS_WALL,
                        isVerticle:true,
                        wallIndex:wallIndex,
                        bayIndex:bayIndex,
                        width:WALL_WIDTH,
                        color:BAY_COMBINATION_WALL_COLOR,
                        height: BAY_PARTITION_WIDTH,
                    };
                case 1: // top
                    return {
                        x:leftX,
                        y:BAY_PARTITION_TOP_PADDING,
                        hasWall:  status === WALL_STATUS_HAS_WALL,
                        isVerticle:false,
                        wallIndex:wallIndex,
                        bayIndex:bayIndex,
                        width:bay.actualSize*BAY_LENGTH_RATIO,
                        color:BAY_COMBINATION_WALL_COLOR,
                        height: WALL_WIDTH
                    };
                case 2: //right
                    return {
                        x:leftX + bay.actualSize*BAY_LENGTH_RATIO,
                        y:BAY_PARTITION_TOP_PADDING,
                        hasWall:  status === WALL_STATUS_HAS_WALL,
                        isVerticle:true,
                        wallIndex:wallIndex,
                        bayIndex:bayIndex,
                        width:WALL_WIDTH,
                        color:BAY_COMBINATION_WALL_COLOR,
                        height: BAY_PARTITION_WIDTH
                    };
                case 3: // bottom
                    return {
                        x:leftX,
                        y:BAY_PARTITION_TOP_PADDING + BAY_PARTITION_WIDTH,
                        hasWall:  status === WALL_STATUS_HAS_WALL,
                        isVerticle:false,
                        wallIndex:wallIndex,
                        bayIndex:bayIndex,
                        width:bay.actualSize*BAY_LENGTH_RATIO,
                        color:BAY_COMBINATION_WALL_COLOR,
                        height: WALL_WIDTH
                    };
            }
        } else {
            return null;
        }
    };

    drawBaseBay = (bay, bayIndex, leftX) => {
        if(bay.actualSize - WALL_THICKNESS > 0){
            return [{
                x: leftX + BASE_BAY_PADDING,
                y: BAY_PARTITION_TOP_PADDING + BASE_BAY_PADDING,
                text: `FFL ${bay.finishedFloorLevel}`,
                bayIndex:bayIndex,
                width: bay.actualSize*BAY_LENGTH_RATIO - BASE_BAY_PADDING*2,
                height: BAY_PARTITION_WIDTH - BASE_BAY_PADDING*2,
                // isOpenBay:this.isOpenBase(bay, bayIndex),
                color: bay.isFullSlab ? BAY_COMBINATION_WALL_COLOR : BAY_COMBINATION_PIER_ONLY_SLAB_COLOR
            }];
        }

        return [];
    };

    drawAnnexeBaseBay = (bay, bayIndex, leftX) => {
        var results = [];

        if(this.props.isAnnexeLeft && !isEmpty(this.props.annexeLeft)){
            // left Annexe
            results.push({
                x: leftX,
                y: BAY_PARTITION_TOP_PADDING - ANNEXE_HEIGHT,
                text: `FFL ${bay.leftAnnexeFinishedFloorLevel}`,
                bayIndex: bayIndex,
                annexeIndex:ANNEXE_LEFT_ID,
                hasAnnexe: bay.hasLeftAnnexe ? bay.hasLeftAnnexe : 0,
                width: bay.actualSize * BAY_LENGTH_RATIO,
                height: ANNEXE_HEIGHT,
                color: bay.isLeftAnnexeFullSlab ? BAY_COMBINATION_WALL_COLOR : BAY_COMBINATION_PIER_ONLY_SLAB_COLOR
            });
        }

        if(this.props.isAnnexeRight && !isEmpty(this.props.annexeRight)) {
            // right Annexe
            // console.log("drawright:", bayIndex, ", annexe:", 1, ", v:", bay.hasRightAnnexe);
            results.push({
                x: leftX,
                y: BAY_PARTITION_TOP_PADDING + BAY_PARTITION_WIDTH,
                text: `FFL ${bay.rightAnnexeFinishedFloorLevel}`,
                bayIndex: bayIndex,
                annexeIndex: ANNEXE_RIGHT_ID,
                hasAnnexe: bay.hasRightAnnexe ? bay.hasRightAnnexe : 0,
                width: bay.actualSize * BAY_LENGTH_RATIO,
                height: ANNEXE_HEIGHT,
                color: bay.isRightAnnexeFullSlab ? BAY_COMBINATION_WALL_COLOR : BAY_COMBINATION_PIER_ONLY_SLAB_COLOR
            });
        }

        return results;
    };

    drawPiers = (bay, bayIndex, leftX) => {
        var results = [];
        if(this.props.footingsPiers !== FOOTING_TYPES.FULL_SLAB) {
            //top to bottom, left to right
            //draw P1
            results.push({
                x: leftX,
                y: BAY_PARTITION_TOP_PADDING,
                bayIndex: bayIndex,
                pierIndex: 1,
                hasPier: bay.isP1
            })

            /*if(bayIndex === 0){
                //draw P2
                /results.push({
                    x: leftX,
                    y: BAY_PARTITION_TOP_PADDING + BAY_PARTITION_WIDTH/2,
                    bayIndex: bayIndex,
                    pierIndex: 2,
                    hasPier: bay.isP2
                });
            }*/

            //draw P3
            results.push({
                x: leftX,
                y: BAY_PARTITION_TOP_PADDING + BAY_PARTITION_WIDTH,
                bayIndex: bayIndex,
                pierIndex: 3,
                hasPier: bay.isP3
            });

            //draw P4
            /*results.push({
                x: leftX +  (bay.actualSize * BAY_LENGTH_RATIO)/2,
                y: BAY_PARTITION_TOP_PADDING,
                bayIndex: bayIndex,
                pierIndex: 4,
                hasPier: bay.isP4
            });

            //draw P5
            results.push({
                x: leftX +  (bay.actualSize * BAY_LENGTH_RATIO)/2,
                y: BAY_PARTITION_TOP_PADDING + BAY_PARTITION_WIDTH,
                bayIndex: bayIndex,
                pierIndex: 5,
                hasPier: bay.isP5
            });*/

            if ((bayIndex === 0 && this.props.bays.length === 1)
                || (bayIndex === this.props.bays.length - 1)) {
                //draw P6
                results.push({
                    x: leftX + (bay.actualSize * BAY_LENGTH_RATIO),
                    y: BAY_PARTITION_TOP_PADDING,
                    bayIndex: bayIndex,
                    pierIndex: 6,
                    hasPier: bay.isP6
                });

                //draw P7
                /*results.push({
                    x: leftX +  (bay.actualSize * BAY_LENGTH_RATIO),
                    y: BAY_PARTITION_TOP_PADDING + BAY_PARTITION_WIDTH/2,
                    bayIndex: bayIndex,
                    pierIndex: 7,
                    hasPier: bay.isP7
                });*/

                //draw P8
                results.push({
                    x: leftX + (bay.actualSize * BAY_LENGTH_RATIO),
                    y: BAY_PARTITION_TOP_PADDING + BAY_PARTITION_WIDTH,
                    bayIndex: bayIndex,
                    pierIndex: 8,
                    hasPier: bay.isP8
                });
            }
        }

        return results;
    };

    drawAnnexePiers = (bay, bayIndex, annexeIndex, leftX) => {
        let results = [];
        const {bays, annexeLeft, annexeRight} = this.props;
        if (annexeIndex === ANNEXE_LEFT_ID && annexeLeft && bays) {
            let nextBay = bayIndex + 1 < bays.length ? bays[bayIndex + 1] : null;
            if (this.props.footingsPiers !== FOOTING_TYPES.FULL_SLAB) {
                //draw P1
                results.push({
                    x: leftX,
                    y: BAY_PARTITION_TOP_PADDING - ANNEXE_HEIGHT,
                    bayIndex: bayIndex,
                    annexeIndex: annexeIndex,
                    pierIndex: 1,
                    hasPier: bay.isAnnexeP1
                })

                if (!nextBay || !nextBay.hasLeftAnnexe) {
                    //draw P6
                    results.push({
                        x: leftX + (bay.actualSize * BAY_LENGTH_RATIO),
                        y: BAY_PARTITION_TOP_PADDING - ANNEXE_HEIGHT,
                        bayIndex: bayIndex,
                        annexeIndex: annexeIndex,
                        pierIndex: 6,
                        hasPier: bay.isAnnexeP6
                    })  
                }
            }
        }

        if (annexeIndex === ANNEXE_RIGHT_ID && annexeRight && bays) {
            let nextBay = bayIndex + 1 < bays.length ? bays[bayIndex + 1] : null;
            if (this.props.footingsPiers !== FOOTING_TYPES.FULL_SLAB) {
                //draw P3
                results.push({
                    x: leftX,
                    y: BAY_PARTITION_TOP_PADDING + BAY_PARTITION_WIDTH + ANNEXE_HEIGHT,
                    bayIndex: bayIndex,
                    annexeIndex: annexeIndex,
                    pierIndex: 3,
                    hasPier: bay.isAnnexeP3
                })
        
                if (!nextBay || !nextBay.hasRightAnnexe) {
                    //draw P8
                    results.push({
                        x: leftX + (bay.actualSize * BAY_LENGTH_RATIO),
                        y: BAY_PARTITION_TOP_PADDING + BAY_PARTITION_WIDTH + ANNEXE_HEIGHT,
                        bayIndex: bayIndex,
                        annexeIndex: annexeIndex,
                        pierIndex: 8,
                        hasPier: bay.isAnnexeP8
                    })  
                }
            }
        }

        return results;
    };

    isOpenBase = (bay, bayIndex) => {
        const {footingsPiers} = this.props;
        if(footingsPiers === 2) {
            if (bay.partitionTopStatus !== WALL_STATUS_NO_WALL
                || bay.partitionBottomStatus !== WALL_STATUS_NO_WALL) {
                // has wall
                return false;
            }
            if (bayIndex === 0) {
                if (bay.partitionLeftStatus !== WALL_STATUS_NO_WALL) {
                    return false;
                }
                return true;
            } else if (bayIndex === this.props.bays.length - WALL_STATUS_HAS_WALL) {
                if (bay.partitionRightStatus !== WALL_STATUS_NO_WALL) {
                    return false;
                }
                return true;
            } else {
                return true;
            }
        } else {
            return false;
        }
    };


    render() {
        const {bays, isAnnexeLeft, isAnnexeRight} = this.props;
        const {wallLabels, wallList, baseBayList, annexes, piers, scaledBuildingLength} = this.calculateParttionItems(bays, isAnnexeLeft, isAnnexeRight);
        const endWalls = CalculationUtils.endWalls(this.props.bays);
        const hasWallGrids = this.calculateHasWallGrids(this.props.bays);
        const isCarport = (this.props.productCategoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS
            || this.props.productCategoryId === PRODUCT_CATEGORY_GABLE_CARPORTS);


        //console.log("piers", piers);
        return (
            <BayPartitionComponent wallLabels={wallLabels}
                                   walls={wallList}
                                   baseBays={baseBayList}
                                   annexes={annexes}
                                   isAnnexeLeft={isAnnexeLeft}
                                   isAnnexeRight={isAnnexeRight}
                                   piers={piers}
                                   endWalls={endWalls}
                                   hasWallGrids={hasWallGrids}
                                   selectedBayIndex={this.props.selectedBayIndex}
                                   selectedGrid={this.props.selectedGrid}
                                   scaledBuildingLength={scaledBuildingLength}
                                   handleBayButtonClick={this.handleBayButtonClick}
                                   handleAnnexeClick={this.handleAnnexeClick}
                                   handleBaseBayClick={this.handleBaseBayClick}
                                   handleWallClick={isCarport ? null : this.handleWallClick}
                                   handleFFLChange={this.handleFFLChange}
                                   handleGridChange={this.handleGridChange}
                                   handleIsGaraportFlashingChange={this.handleIsGaraportFlashingChange}
                                   handleSheetingDirectionChange={this.handleSheetingDirectionChange}
                                   handlePierClick={this.handlePierClick}
                                   handleSheetSideChange={this.handleSheetSideChange}
            />
        );
    }
}


const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    buildingLength:       Number(formSelector(state, "buildingLength")),
    footingsPiers:        formSelector(state, "footingsPiers"),
    selectedBayIndex:     formSelector(state, "selectedBayIndex"),
    selectedGrid:         getQDBDSelectedGrid(state),
    isAnnexeLeft:         +(formSelector(state, "isAnnexeLeft")),
    isAnnexeRight:        +(formSelector(state, "isAnnexeRight")),
    annexeLeft:           (formSelector(state, "annexeLeft")),
    annexeRight:          (formSelector(state, "annexeRight")),
    workingComponent:     +(formSelector(state, "workingComponent")), 
});

const mapDispatchToProps = (dispatch) => ({
    QD_BD_changeGrid: payload => dispatch(QD_BD_changeGrid(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(CombinationBayPartition);