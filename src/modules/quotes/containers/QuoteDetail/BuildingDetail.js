import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formValueSelector} from "redux-form";

import BuildingDetailComponent from "../../components/QuoteDetail/BuildingDetail";
import {
    QUOTES_BUILDING_DETAIL_FORM_NAME,
    QUOTES_DOOR_TYPE_IDS,
    WALL_STATUS_HAS_WALL,
    WALL_STATUS_NOTHING,
    WALL_STATUS_NO_WALL,
    WALL_LEFT_INDEX,
    WALL_RIGHT_INDEX,
    WALL_TOP_INDEX,
    WALL_BOTTOM_INDEX,
    SHEETING_DIRECTION_IDS,
    ROLLER_DOOR_PORTAL_FRAME_IDS,
    QUOTES_DOOR_KITS,
    QUOTES_DOOR_TYPES_SUB_OPTIONS,
    BASE_PLATE_TYPE,
    FOOTING_TYPES
} from "../../constants";
import {QD_BD_fieldFocusAction, QD_BD_openLightBoxAction} from '../../actions';
import {getQDBDLightBoxIndex, getSavedValue, getPurlinAndGirtFromID, getSelectedFrame} from '../../selectors';
import CalculationUtils from '../QuoteDetail/Calculation/CalculationUtils';
import ProductConvert from '../QuoteDetail/Calculation/ProductConvert';
import auth from "../../../../services/auth";
import {
    PRODUCT_CATEGORY_SKILLION_CARPORTS,
    PRODUCT_CATEGORY_GABLE_CARPORTS,
    STRAMIT
} from "../../../../constants";
class BuildingDetail extends Component {
    /**
     * Listen to changes in the profile and colour if we decide to update "all"
     *
     * If "all" is the selected mode, we will update all other values according to the first option
     */
    componentWillReceiveProps(nextProp) {

    };

    componentDidUpdate(prevProps) {
        const purlinAndGirtType = this.props.purlinAndGirtType;
        const prevPurlinAndGirtType = prevProps.purlinAndGirtType;

        const selectedFrame = this.props.selectedFrame;
        const prevSelectedFrame = prevProps.selectedFrame;

        const midColumnMember = (selectedFrame && selectedFrame.MidColumnMember) ? selectedFrame.MidColumnMember : null;
        const endColumnMember = (selectedFrame && selectedFrame.EndColumnMember) ? selectedFrame.EndColumnMember : null;
        const midRafterMember = (selectedFrame && selectedFrame.MidRafterMember) ? selectedFrame.MidRafterMember : null;

        const prevMidColumnMember = (prevSelectedFrame && prevSelectedFrame.MidColumnMember) ? prevSelectedFrame.MidColumnMember : null;
        const prevEndColumnMember = (prevSelectedFrame && prevSelectedFrame.EndColumnMember) ? prevSelectedFrame.EndColumnMember : null;
        const prevMidRafterMember = (prevSelectedFrame && prevSelectedFrame.MidRafterMember) ? prevSelectedFrame.MidRafterMember : null;

        const midColumnWidth = (midColumnMember) ? Number(midColumnMember.substring(1, 4)) : 0;
        const endColumnWidth = (endColumnMember) ? Number(endColumnMember.substring(1, 4)) : 0;
        const prevMidColumnWidth = (prevMidColumnMember) ? Number(prevMidColumnMember.substring(1, 4)) : 0;
        const prevEndColumnWidth = (prevEndColumnMember) ? Number(prevEndColumnMember.substring(1, 4)) : 0;
        const {bays, quoteDetails}  = this.props;
        const basePlateType = quoteDetails ? Number(quoteDetails.bdHoldDown) : 0;
        const buildingSpan = quoteDetails ? parseInt(quoteDetails.buildingSpan) : 0;
        const buildingOffset = CalculationUtils.convertPurlinAndGirtTypeToOffset(this.props.purlinAndGirtType);
        let hasDoorChanged = false;

        let columnRafterMaterial = (quoteDetails && quoteDetails.rollFormSupply === STRAMIT) ? {} : {};
        const sideWallMidColumnWidth = (midColumnMember && columnRafterMaterial[midColumnMember]) ? columnRafterMaterial[midColumnMember].columnWidth : 0;
        const sideWallEndColumnWidth = (endColumnMember && columnRafterMaterial[endColumnMember]) ? columnRafterMaterial[endColumnMember].columnWidth : 0;
        const prevSideWallMidColumnWidth = (prevMidColumnMember && columnRafterMaterial[prevMidColumnMember]) ? columnRafterMaterial[prevMidColumnMember].columnWidth : 0;
        const prevSideWallEndColumnWidth = (prevEndColumnMember && columnRafterMaterial[prevEndColumnMember]) ? columnRafterMaterial[prevEndColumnMember].columnWidth : 0;

        //Auto adjust door offset or width
        if (bays && bays.length > 0 && prevMidColumnWidth !== 0 && prevEndColumnWidth !== 0 &&
            (midColumnWidth !== prevMidColumnWidth || endColumnWidth !== prevEndColumnWidth)
        ) {
            for (let bayIndex = 0; bayIndex < bays.length; bayIndex++) {
                const bay = bays[bayIndex];
                if (bay.doors && bay.doors.length > 0) {
                    const doors = CalculationUtils.sortDoorListAtBay(bay.doors);
                    const leftWallDoors = doors.filter(door => door.doorType === QUOTES_DOOR_TYPE_IDS.ROLLER_DOOR && door.wallIndex === WALL_LEFT_INDEX);
                    const rightWallDoors = doors.filter(door => door.doorType === QUOTES_DOOR_TYPE_IDS.ROLLER_DOOR && door.wallIndex === WALL_RIGHT_INDEX);
                    let wallDoors = leftWallDoors;
                    for (let i = 0; i < 2; i++) {
                        //i === 0: left wall doors, i === 1: right wall doors   
                        if (wallDoors && wallDoors.length > 0) {
                            let columnWidth = ((i === 0 && bayIndex > 0) || (i === 1 && bayIndex < bays.length - 1)) ? midColumnWidth : endColumnWidth;
                            let prevColumnWidth = ((i === 0 && bayIndex > 0) || (i === 1 && bayIndex < bays.length - 1)) ? prevMidColumnWidth : prevEndColumnWidth;

                            //Roller door attached portal column
                            for (let doorIndex = 0; doorIndex < wallDoors.length; doorIndex++) {
                                const door = wallDoors[doorIndex];
                                const portalId = door.portalFrame ? Number(door.portalFrame) : 0;
                                if (portalId > 0) {
                                    columnWidth = midColumnWidth;
                                    let doorKit = (QUOTES_DOOR_KITS[door.doorType]) ? QUOTES_DOOR_KITS[door.doorType].find(kit => kit.id === parseInt(door.kit)) : null;
                                    let doorKitName = (doorKit && doorKit.name) ? doorKit.name : "";
                                    let isSmallMullion = door.isSmallMullion;
                                    let doorFrameWidth = 0;
                                    //Wind Lock and Wind Strong Series
                                    if (doorKitName.includes("WL") || doorKitName.includes("WS")){
                                        if (columnWidth >= 250) {
                                            door.frameType = selectedFrame.MidColumnMember;
                                        } else if (isSmallMullion || isSmallMullion === null || isSmallMullion === undefined) {
                                            door.frameType = "C20024";
                                            doorFrameWidth = 200;
                                            door.isSmallMullion = 1;
                                        } else {
                                            door.frameType = "C25024";
                                            doorFrameWidth = 250;
                                        }
                                    }
    
                                    //Standard series
                                    let doorSubType = QUOTES_DOOR_TYPES_SUB_OPTIONS[door.doorType] && QUOTES_DOOR_TYPES_SUB_OPTIONS[door.doorType].find(
                                        stype => doorKitName.includes(stype.code) && !stype.series.toUpperCase().includes("WIND")
                                    );
    
                                    if (doorSubType) {
                                        if(doorSubType.name.toUpperCase().includes("A SERIES")) {   //A Series and AA Series
                                            if (columnWidth >= 200) {
                                                door.frameType = selectedFrame.MidColumnMember;
                                            } else if (isSmallMullion || isSmallMullion === null || isSmallMullion === undefined) {
                                                door.frameType = "C15015";
                                                doorFrameWidth = 150;
                                                door.isSmallMullion = 1;
                                            } else {
                                                door.frameType = "C20015";
                                                doorFrameWidth = 200;
                                            }
                                        } else {   //B Series
                                            if (columnWidth >= 250) {
                                                door.frameType = selectedFrame.MidColumnMember;
                                            } else if (isSmallMullion || isSmallMullion === null || isSmallMullion === undefined) {
                                                door.frameType = "C20024";
                                                doorFrameWidth = 200;
                                                door.isSmallMullion = 1;
                                            } else {
                                                door.frameType = "C25024";
                                                doorFrameWidth = 250;
                                            }
                                        }
                                    }
                                    columnWidth = Math.max(doorFrameWidth, columnWidth);
    
                                    if (portalId === ROLLER_DOOR_PORTAL_FRAME_IDS.TOP_COLUMN) {
                                        door.offset = buildingOffset + columnWidth;
                                        door.width = door.width + (prevColumnWidth - columnWidth);
                                    } else if (portalId === ROLLER_DOOR_PORTAL_FRAME_IDS.BOTTOM_COLUMN) {
                                        door.width = door.width + (prevColumnWidth - columnWidth);
                                    } else if (portalId === ROLLER_DOOR_PORTAL_FRAME_IDS.BOTH_COLUMNS) {
                                        door.offset = buildingOffset + columnWidth;
                                        door.width = door.width + 2 * (prevColumnWidth - columnWidth);
                                    }

                                    hasDoorChanged = true;
                                }
                            }

                            //Roller door not attached portal column
                            let firstDoor = wallDoors[0];
                            let frameWidth = firstDoor.frameType && firstDoor.frameType.length > 4 ? parseInt(firstDoor.frameType.substring(1, 4)) : 0;
                            if (firstDoor.offset < buildingOffset + columnWidth + frameWidth + 5 + 
                                (basePlateType === BASE_PLATE_TYPE.CAST_IN_PLATE ? 20 : 0)
                            ) {
                                let newOffset = buildingOffset + columnWidth + frameWidth + 5 +
                                    (basePlateType === BASE_PLATE_TYPE.CAST_IN_PLATE ? 20 : 0);
                                firstDoor.width = firstDoor.width + (firstDoor.offset - newOffset);
                                firstDoor.offset = newOffset;
                                hasDoorChanged = true;
                            }

                            let lastDoor = wallDoors[wallDoors.length - 1];
                            frameWidth = lastDoor.frameType && lastDoor.frameType.length > 4 ? parseInt(lastDoor.frameType.substring(1, 4)) : 0;
                            if (lastDoor.offset + lastDoor.width + frameWidth > buildingSpan
                                - (buildingOffset + columnWidth + 5 + (basePlateType === BASE_PLATE_TYPE.CAST_IN_PLATE ? 20 : 0))
                            ) {
                                let newWidth = buildingSpan
                                    - (buildingOffset + columnWidth + 5 + (basePlateType === BASE_PLATE_TYPE.CAST_IN_PLATE ? 20 : 0))
                                    - (lastDoor.offset + frameWidth);
                                firstDoor.width = newWidth;
                                hasDoorChanged = true;
                            }
                        }

                        wallDoors = rightWallDoors;
                    }
                }
            }
        }

        if (bays && bays.length > 0 && prevSideWallMidColumnWidth !== 0 && prevSideWallEndColumnWidth !== 0 &&
            (sideWallMidColumnWidth !== prevSideWallMidColumnWidth || sideWallEndColumnWidth !== prevSideWallEndColumnWidth)
        ) {
            for (let bayIndex = 0; bayIndex < bays.length; bayIndex++) {
                const bay = bays[bayIndex];
                if (bay.doors && bay.doors.length > 0) {
                    const doors = CalculationUtils.sortDoorListAtBay(bay.doors);
                    const topWallDoors = doors.filter(door => door.doorType === QUOTES_DOOR_TYPE_IDS.ROLLER_DOOR && door.wallIndex === WALL_TOP_INDEX);
                    const bottomWallDoors = doors.filter(door => door.doorType === QUOTES_DOOR_TYPE_IDS.ROLLER_DOOR && door.wallIndex === WALL_BOTTOM_INDEX);
                    let wallDoors = topWallDoors;
                    for (let i = 0; i < 2; i++) {
                        //i === 0: top wall doors, i === 1: bottom wall doors
                        if (wallDoors && wallDoors.length > 0) {
                            let firstDoor = wallDoors[0];
                            let frameWidth = firstDoor.frameType && firstDoor.frameType.length > 4 ? parseInt(firstDoor.frameType.substring(1, 4)) : 0;
                            let leftOffsetLimit = (bayIndex === 0 ? buildingOffset + sideWallEndColumnWidth : 0.5 * sideWallMidColumnWidth) + frameWidth + 5;
                            if (firstDoor.offset < leftOffsetLimit) {
                                firstDoor.width = firstDoor.width + (firstDoor.offset - leftOffsetLimit);
                                firstDoor.offset = leftOffsetLimit;
                                hasDoorChanged = true;
                            }

                            let lastDoor = wallDoors[wallDoors.length - 1];
                            frameWidth = lastDoor.frameType && lastDoor.frameType.length > 4 ? parseInt(lastDoor.frameType.substring(1, 4)) : 0;
                            let rightOffsetLimit = bay.actualSize - (bayIndex === bays.length - 1 ? buildingOffset + sideWallEndColumnWidth : 0.5 * sideWallMidColumnWidth) - (frameWidth + 5);
                            if (lastDoor.offset + lastDoor.width > rightOffsetLimit) {
                                lastDoor.width = rightOffsetLimit - lastDoor.offset;
                                hasDoorChanged = true;
                            }
                        }

                        wallDoors = bottomWallDoors;
                    }
                }
            }
        }

        if (purlinAndGirtType && purlinAndGirtType.includes("C") && (purlinAndGirtType !== prevPurlinAndGirtType || midRafterMember !== prevMidRafterMember)) {
            let purlinWidth = Number(purlinAndGirtType.replace("C", ""));
            if (midRafterMember && midRafterMember.length > 4) {
                let rafterWidth = Number(midRafterMember.substring(1, 4));
                if (purlinWidth > rafterWidth) {
                    window.alert(`Warning! Purlins (${purlinAndGirtType}) are bigger than rafters (${midRafterMember.substring(0, 4)})`);
                }
            }
        }
        if (hasDoorChanged) {
            window.alert("Roller door offsets or widths have been adjusted because of the changes of portal frame sizes. Please check them in Drawing Mode");
        }
    }

    /**
     * Handle roll form supply changed
     *
     * @param event
     * @param newValue
     */
    handleRollFormSupplyChange = (event, newValue) => {
        let newRollFormSupply = newValue;
        const {rollFormSupply, purlinAndGirtType, changeFieldValue, productCategoryId} = this.props;
        if (newRollFormSupply && (!rollFormSupply || !purlinAndGirtType)){
            //Re-init building detail default options
            let defaultBuildingValues = ProductConvert.defaultBuildingValues(newRollFormSupply);
            if (defaultBuildingValues) {
                for (let fieldName in defaultBuildingValues){
                    switch (fieldName) {
                        case 'FFL':
                            //No need to re-init because FFL = 0 when a new quote is created
                            break;
                        case 'gutter':
                            this.updateGutterValues(defaultBuildingValues);
                            break;
                        case 'downpipe':
                            this.updateDownpipeValues(defaultBuildingValues);
                            break;
                        case 'flashingIsRollerDoor':
                        case 'flashingIsAccessDoor':
                        case 'flashingIsCorner':
                            let isFlashingValue = defaultBuildingValues[fieldName];
                            if (productCategoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS ||
                                productCategoryId === PRODUCT_CATEGORY_GABLE_CARPORTS)
                                isFlashingValue = 0;
                            changeFieldValue(fieldName, isFlashingValue);
                            break;
                        case 'regionInternalPressure':
                            let cpiValue = defaultBuildingValues[fieldName];
                            if (productCategoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS ||
                                productCategoryId === PRODUCT_CATEGORY_GABLE_CARPORTS)
                                cpiValue = 0;
                            changeFieldValue(fieldName, cpiValue);
                            break;
                        default:
                            changeFieldValue(fieldName, defaultBuildingValues[fieldName]);
                    }
                }
            }
        } else if (newRollFormSupply) {
            let defaultBuildingValues = ProductConvert.defaultBuildingValues(newRollFormSupply);
            if (defaultBuildingValues){
                changeFieldValue("walls", defaultBuildingValues.walls);
                changeFieldValue("roofs", defaultBuildingValues.roofs);
            }
        }
    };

    /**
     * Handle purlin/girt type changed
     *
     * @param event
     * @param newValue
     */
    handlePurlinAndGirtTypeChange = (event, newValue) => {
        const value = event && event.target && event.target.value;
        const {product, changeFieldValue, bays, buildingLength, quoteDetails} = this.props;
        const prevValue = quoteDetails ? quoteDetails.purlinAndGirtType : null;
        if (bays && prevValue) {
            //const maxBayLength = (product && product.params && product.params.max_bayspace) || 1;
            const purlinAndGirt = getPurlinAndGirtFromID(value, product.id);
            const maxBayLength = (purlinAndGirt && purlinAndGirt.bayMax) || 1;
            const minBayLength = (purlinAndGirt && purlinAndGirt.bayMin) || 1;

            let isBaySizeOutOfRange = false;
            for (let bayIndex = 0; bayIndex < bays.length; bayIndex++) {
                let bay = bays[bayIndex];
                if (bay.actualSize < minBayLength || bay.actualSize > maxBayLength) {
                    isBaySizeOutOfRange = true;
                    break;
                }
            }

            if (isBaySizeOutOfRange) {
                const numBays = Math.ceil(buildingLength / maxBayLength);
                changeFieldValue("numberOfBays", numBays);
                this.updateBaysValues(numBays, buildingLength);
                this.updateRoofsValues(buildingLength);
                changeFieldValue('isAnnexeLeft', 0);
                changeFieldValue('isAnnexeRight', 0);

                window.alert(`Because the current bay size wasn't in ${minBayLength}mm - ${maxBayLength}mm, ` +
                    "all bay sizes, all doors/windows and components were reseted.");
            }
        }
    };

    /**
     * Handle building length changed
     *
     * @param event
     * @param newValue
     */
    handleLengthChange = (event, newValue) => {
        const value = Number(newValue);
        const {product, changeFieldValue, previousBuildingLength, purlinAndGirtType} = this.props;
        if (value !== Number(previousBuildingLength)) {
            //const maxBayLength = (product && product.params && product.params.max_bayspace) || 1;
            const purlinAndGirt = getPurlinAndGirtFromID(purlinAndGirtType, product.id);
            const maxBayLength = (purlinAndGirt && purlinAndGirt.bayMax) || 1;
            const minLength = (product && product.params && product.params.min_length) || 0;
            const maxLength = (product && product.params && product.params.max_length) || 0;

            if (value >= minLength && value <= maxLength) {
                const numBays = Math.ceil(value / maxBayLength);
                changeFieldValue("numberOfBays", numBays);
                this.updateBaysValues(numBays, value);
                this.updateRoofsValues(value);
                changeFieldValue('isAnnexeLeft', 0);
                changeFieldValue('isAnnexeRight', 0);
            }
        }
    };

    /**
     * Handle building height changed
     * If building height goes up => do nothing
     * If building height goes down => delete the door that break limitation rules
     * 
     * @param event
     * @param newValue
     */
    handleHeightChange = (event, newValue) => {
        const buildingHeight = Number(newValue);
        const {previousBuildingHeight} = this.props;
        if (buildingHeight < Number(previousBuildingHeight)){
            const {changeFieldValue, quoteDetails} = this.props;
            if (quoteDetails && quoteDetails.bays){
                let buildingSpan = quoteDetails.buildingSpan;
                let buildingSlope = quoteDetails.buildingSlope;
                let purlinAndGirtType = quoteDetails.purlinAndGirtType;
                let rollFormSupply = quoteDetails.rollFormSupply;
                
                for (let bayIndex = 0; bayIndex < quoteDetails.bays.length; bayIndex++){
                    let bay = quoteDetails.bays[bayIndex];
                    if (bay.doors){
                        for (let doorIndex = 0; doorIndex < bay.doors.length; doorIndex++){
                            let door = bay.doors[doorIndex];
                            if (door.doorType === QUOTES_DOOR_TYPE_IDS.ROLLER_DOOR ||
                                door.doorType === QUOTES_DOOR_TYPE_IDS.ACCESS_DOOR
                            ){
                                let maxDoorHeight;
                                let headHeight = CalculationUtils.countDoorHeadHeight(door, purlinAndGirtType, rollFormSupply);
                                if (door.wallIndex === WALL_LEFT_INDEX || door.wallIndex === WALL_RIGHT_INDEX){
                                    let actualOffset = 0;
                                    if (door.doorType === QUOTES_DOOR_TYPE_IDS.ROLLER_DOOR && !door.portalFrame){
                                        let series = CalculationUtils.mapRollerDoorSeri(door);
                                        let mullionWidth = series ? series.frameWidth : 0;
                                        let mullion1ActualOffset = (door.offset <= buildingSpan / 2) ?
                                                                    door.offset - 62 - mullionWidth :
                                                                    buildingSpan - 62 - door.offset;
                                        let mullion2ActualOffset = (door.offset + door.width + mullionWidth <= buildingSpan / 2) ?
                                                                    door.offset - 62 + door.width :
                                                                    buildingSpan - 62 - door.offset - door.width - mullionWidth;
                                        //Find the lower roof height
                                        actualOffset = Math.min(mullion1ActualOffset, mullion2ActualOffset);
                                    } else if (door.doorType !== QUOTES_DOOR_TYPE_IDS.ROLLER_DOOR){
                                        actualOffset = (door.offset <= buildingSpan / 2) ?
                                                        door.offset - 62 :
                                                        buildingSpan - 62 - door.offset - door.width;
                                    }
                                    let roofHeight = buildingHeight + actualOffset * Math.tan(Math.PI * buildingSlope / 180);
                                    maxDoorHeight = Math.ceil(roofHeight - headHeight);
                                } else {
                                    maxDoorHeight = Math.ceil(buildingHeight - headHeight);
                                }
                                if (door.height > maxDoorHeight){
                                    let removed = bay.doors.splice(doorIndex, 1);
                                    if (removed){
                                        changeFieldValue(`bays[${bayIndex}].doors`, bay.doors);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Handle number of bays changed on Blur
     *
     * @param event
     * @param newValue
     */
    handleNumberOfBaysChange = (event, newValue) => {
        const value = Number(newValue);
        const {product, buildingLength, previousNumberOfBays, purlinAndGirtType} = this.props;
        if (value !== Number(previousNumberOfBays)){
            //const maxBayLength = (product && product.params && product.params.max_bayspace) || 1;
            //const minBayLength = (product && product.params && product.params.min_bayspace) || 1;
            const purlinAndGirt = getPurlinAndGirtFromID(purlinAndGirtType, product.id);
            const maxBayLength = (purlinAndGirt && purlinAndGirt.bayMax) || 1;
            const minBayLength = (purlinAndGirt && purlinAndGirt.bayMin) || 1;
            const maxBays = Math.floor(buildingLength / minBayLength);
            const minBays = Math.ceil(buildingLength / maxBayLength);
            if (value >= minBays && value <= maxBays) {
                this.updateBaysValues(value, buildingLength);
                this.updateRoofsValues(buildingLength);
            }
        }
    };

    /**
     * Handle Wind Region changed
     * 
     * @param event
     */
    handleRegionWindChange = (event) => {
        const regionWind = event.target.value;
        const {changeFieldValue, productCategoryId} = this.props;
        const isCarport = (productCategoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS || productCategoryId === PRODUCT_CATEGORY_GABLE_CARPORTS);
        if ((regionWind === "C" || regionWind === "D") && !isCarport) {
            changeFieldValue("regionInternalPressure", 0.7);
        }
    };

    /**
     * Handle + / - button to change the numberOfBays
     *
     * @param type
     */
    handleBayChangeClick = (type = '') => {
        const {numberOfBays, buildingLength, product, changeFieldValue, purlinAndGirtType} = this.props;
        //const maxBayLength = (product && product.params && product.params.max_bayspace) || 1;
        //const minBayLength = (product && product.params && product.params.min_bayspace) || 1;
        const purlinAndGirt = getPurlinAndGirtFromID(purlinAndGirtType, product.id);
        const maxBayLength = (purlinAndGirt && purlinAndGirt.bayMax) || 1;
        const minBayLength = (purlinAndGirt && purlinAndGirt.bayMin) || 1;
        const maxBays = Math.floor(buildingLength / minBayLength);
        const minBays = Math.ceil(buildingLength / maxBayLength);
        const minLength = (product && product.params && product.params.min_length) || 0;
        const maxLength = (product && product.params && product.params.max_length) || 0;
        if (buildingLength >= minLength && buildingLength <= maxLength) {
            if (type === 'plus'){
                if (numberOfBays < maxBays){
                    changeFieldValue("numberOfBays", (numberOfBays) + 1);
                    this.updateBaysValues(numberOfBays + 1, buildingLength);
                    this.updateRoofsValues(buildingLength);
                }
            }
            else if (type === 'minus'){
                if (numberOfBays > minBays){
                    changeFieldValue("numberOfBays", (numberOfBays) - 1);
                    this.updateBaysValues(numberOfBays - 1, buildingLength);
                    this.updateRoofsValues(buildingLength);
                }
            }
        }
    };

    /**
     * Init bay values when the number of Bays changes. We will update the whole bays variable, not by single item.
     *
     * @param numBays
     */
    updateBaysValues = (numBays, buildingLength) => {
        if (numBays){
            const {changeFieldValue, initNewRoofSkylightItems, productCategoryId, footingsPiers} = this.props;
            const isCarport = (productCategoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS || productCategoryId === PRODUCT_CATEGORY_GABLE_CARPORTS);
            const isPierOnly = Number(footingsPiers) === FOOTING_TYPES.PIERS_ONLY;

            if (buildingLength > 0){
                let bayValues = [];
                const eachValue = Math.ceil(buildingLength/numBays);
                for (let i = 0; i < numBays - 1; i++){
                    if ( i === 0){
                        // first bay, set surrounding walls
                        bayValues.push({
                            actualSize: eachValue,
                            partitionLeftStatus:    isCarport ? WALL_STATUS_NO_WALL : WALL_STATUS_HAS_WALL,
                            partitionTopStatus:     isCarport ? WALL_STATUS_NO_WALL : WALL_STATUS_HAS_WALL,
                            partitionBottomStatus:  isCarport ? WALL_STATUS_NO_WALL : WALL_STATUS_HAS_WALL,
                            partitionRightStatus:   WALL_STATUS_NO_WALL,
                            partitionLeftIsGaraportFlashing:    false,
                            partitionLeftSheetingDirection:     SHEETING_DIRECTION_IDS.FROM_TOP_WALL,
                            isFullSlab:             !isPierOnly,
                            isLeftAnnexeFullSlab:   !isPierOnly,
                            isRightAnnexeFullSlab:  !isPierOnly,
                            isP1:                   isPierOnly,
                            isP3:                   isPierOnly,
                            finishedFloorLevel:     0,
                            leftAnnexeFinishedFloorLevel:   -50,
                            rightAnnexeFinishedFloorLevel:  -50
                        });
                    } else {
                        //middle bays
                        bayValues.push({
                            actualSize: eachValue,
                            partitionLeftStatus:    WALL_STATUS_NOTHING,
                            partitionTopStatus:     isCarport ? WALL_STATUS_NO_WALL : WALL_STATUS_HAS_WALL,
                            partitionBottomStatus:  isCarport ? WALL_STATUS_NO_WALL : WALL_STATUS_HAS_WALL,
                            partitionRightStatus:   WALL_STATUS_NO_WALL,
                            isFullSlab:             !isPierOnly,
                            isLeftAnnexeFullSlab:   !isPierOnly,
                            isRightAnnexeFullSlab:  !isPierOnly,
                            isP1:                   isPierOnly,
                            isP3:                   isPierOnly,
                            finishedFloorLevel:     0,
                            leftAnnexeFinishedFloorLevel:   -50,
                            rightAnnexeFinishedFloorLevel:  -50
                        });
                    }
                }
                bayValues.push({
                    actualSize: buildingLength - (eachValue * (numBays - 1)),
                    partitionLeftStatus: (numBays === 1) ? (isCarport? WALL_STATUS_NO_WALL : WALL_STATUS_HAS_WALL) : WALL_STATUS_NOTHING,
                    partitionTopStatus:     isCarport ? WALL_STATUS_NO_WALL : WALL_STATUS_HAS_WALL,
                    partitionBottomStatus:  isCarport ? WALL_STATUS_NO_WALL : WALL_STATUS_HAS_WALL,
                    partitionRightStatus:   isCarport ? WALL_STATUS_NO_WALL : WALL_STATUS_HAS_WALL,
                    partitionRightIsGaraportFlashing:   false,
                    partitionRightSheetingDirection:     SHEETING_DIRECTION_IDS.FROM_BOTTOM_WALL,
                    isFullSlab:             !isPierOnly,
                    isLeftAnnexeFullSlab:   !isPierOnly,
                    isRightAnnexeFullSlab:  !isPierOnly,
                    isP1:                   isPierOnly,
                    isP3:                   isPierOnly,
                    isP6:                   isPierOnly,
                    isP8:                   isPierOnly,
                    finishedFloorLevel:     0,
                    leftAnnexeFinishedFloorLevel:   -50,
                    rightAnnexeFinishedFloorLevel:  -50
                });
                changeFieldValue("bays", bayValues);
                initNewRoofSkylightItems({bays: bayValues, buildingLength:buildingLength});
            }
        }
    };

    /**
     * Delete roof braces when the number of Bays changes.
     *
     */
    updateRoofsValues = (buildingLength) => {
        const {changeFieldValue, roofs} = this.props;
        if (roofs && buildingLength > 0){
            for (let roofIndex = 0; roofIndex < roofs.length; roofIndex++){
                const roof = roofs[roofIndex];
                if (roof.braces && roof.braces.length > 0){
                    const fieldName = `roofs[${roofIndex}].braces`;
                    const newBraceValue = [];
                    changeFieldValue(fieldName, newBraceValue);      
                }
            }
        }
    };

    /**
     * Update gutter when roll form supply change when a new quote is create
     * 
     */
    updateGutterValues = (defaultBuildingValues) => {
        const {clientDetail, changeFieldValue} = this.props;
        let defaultGutter = defaultBuildingValues.gutter && defaultBuildingValues.gutter[clientDetail.addressState];
        if (defaultGutter){
            for (let fieldName in defaultGutter){
                changeFieldValue(fieldName, defaultGutter[fieldName]);
            }
        }
    };

    /**
     * Update gutter when roll form supply change when a new quote is create
     * 
     */
    updateDownpipeValues = (defaultBuildingValues) => {
        const {clientDetail, changeFieldValue} = this.props;
        let defaultDownpipe = defaultBuildingValues.downpipe && defaultBuildingValues.downpipe[clientDetail.addressState];
        if (defaultDownpipe){
            for (let fieldName in defaultDownpipe){
                changeFieldValue(fieldName, defaultDownpipe[fieldName]);
            }
        }
    };

    /**
     * Save field data onFocus to compare with onBlur later --> To see if data is changed
     *
     * @param event
     * @param name
     */
    handleSaveDataOnFocus = (event, name) => {
        const {QD_BD_fieldFocusAction} = this.props;
        if (event.target.value){
            const payload = {
                name,
                value: event.target.value
            };
            QD_BD_fieldFocusAction(payload);
        }
    };

    handleLightBoxClick = (lightBoxIndex) => {
        const {QD_BD_openLightBoxAction} = this.props;
        QD_BD_openLightBoxAction(lightBoxIndex);
    };

    render() {
        const isAdmin = auth.checkIsAdmin(auth.getUserFromStorage());
        return (
            <BuildingDetailComponent {...this.props} isAdmin={isAdmin}
                                     handleLengthChange={this.handleLengthChange}
                                     handleHeightChange = {this.handleHeightChange}
                                     handleNumberOfBaysChange={this.handleNumberOfBaysChange}
                                     handleBayChangeClick={this.handleBayChangeClick}
                                     handleSaveDataOnFocus={this.handleSaveDataOnFocus}
                                     handleLightBoxClick={this.handleLightBoxClick}
                                     handleRegionWindChange = {this.handleRegionWindChange}
                                     handleRollFormSupplyChange = {this.handleRollFormSupplyChange}
                                     handlePurlinAndGirtTypeChange = {this.handlePurlinAndGirtTypeChange}
            />
        );
    }
}

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    purlinAndGirtType:      formSelector(state, "purlinAndGirtType"),
    rollFormSupply:         formSelector(state, "rollFormSupply"),
    bays:                   formSelector(state, "bays"),
    roofs:                  formSelector(state, "roofs"),
    buildingLength:         Number(formSelector(state, "buildingLength")),
    numberOfBays:           Number(formSelector(state, "numberOfBays")),
    previousBuildingLength: getSavedValue(state, 'buildingLength'),
    previousBuildingHeight: getSavedValue(state, "buildingHeight"),
    previousNumberOfBays:   getSavedValue(state, 'numberOfBays'),
    lightBoxIndex:          getQDBDLightBoxIndex(state),
    regionWind:             formSelector(state, "regionWind"),
    selectedFrame:          getSelectedFrame(state),
    kneeBraceAndCollarTie:  formSelector(state, "kneeBraceAndCollarTie"),
    footingsPiers:          formSelector(state, "footingsPiers")
});


export default connect(mapStateToProps, {QD_BD_fieldFocusAction, QD_BD_openLightBoxAction})(BuildingDetail);