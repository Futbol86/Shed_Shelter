import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formValueSelector, reduxForm, change} from "redux-form";
import LongWindBracingCount from "../TutorialSelection/LongWindBracingCount";
import CrossBraceCount from "../TutorialSelection/CrossBraceCount";
import DrawFloorPlanBraceModalComponent from "../../../components/QuoteDetail/DrawingMode/DrawFloorPlanBraceModal";
import CalculationUtils from "../Calculation/CalculationUtils";
import {getQDDMSelectedBayWall} from "../../../selectors";
import {QD_DM_changeBayWall} from "../../../actions";
import { 
    QUOTES_DM_BRACE_ADD_FORM_NAME,
    QUOTES_BUILDING_DETAIL_FORM_NAME,
    QUOTES_WALL_TYPES_NAME,
    WALL_LEFT_INDEX,
    WALL_RIGHT_INDEX,
    WALL_TOP_INDEX,
    WALL_BOTTOM_INDEX,
    WALL_BRACE_LOCATION_IDS,
    BRACE_ADDING_MODE_IDS,
    WALL_STATUS_NO_WALL,
    ANNEXE_LEFT_ID,
    ANNEXE_RIGHT_ID,
    ANNEXE_WALL_LEFT_INDEX,
    ANNEXE_WALL_RIGHT_INDEX,
    ANNEXE_WALL_HORIZONTAL_INDEX,
    WALL_STATUS_HAS_WALL
 } from "../../../constants";
import { PREDEFINED_BRACE_SELECTION } from "../../../../../constants";
import isEmpty from "lodash/isEmpty";

class DrawFloorPlanBraceModal extends Component {
    componentDidMount(){
        const {buildingDetails, wallTypesArr, activeWallBrace, activeRoofBrace, bays, roofs} = this.props;
        let initialBraceForm = {};

        let sideWallBraceRequired = LongWindBracingCount.bracingForSideWall(buildingDetails);
        let endWallBraceRequired = LongWindBracingCount.bracingForEndWall(buildingDetails);
        let roofBraceRequired = LongWindBracingCount.bracingForRoof(buildingDetails);

        let bay;
        let bayIndex;
        let wallBrace;
        let wallBraceIndex = -1;
        let roofBrace;
        let wallIndex;
        let annexeIndex;
        let isEndWall, isLeftAwningEndWall, isRightAwningEndWall;
        let addingMode;

        if ((activeWallBrace && activeWallBrace.braceIndex >= 0 && activeWallBrace.bayIndex >= 0) ||
            (activeRoofBrace && activeRoofBrace.wallIndex >= 0 && activeRoofBrace.bayIndex >= 0)
        ){
            if (activeWallBrace && activeWallBrace.braceIndex >= 0 && activeWallBrace.bayIndex >= 0){
                bayIndex = activeWallBrace.bayIndex;
                annexeIndex = activeWallBrace.annexeIndex;
                wallBraceIndex = activeWallBrace.braceIndex;
                bay = bays[bayIndex];
            } else {
                bayIndex = activeRoofBrace.bayIndex;
                wallIndex = activeRoofBrace.wallIndex;
                annexeIndex = activeRoofBrace.annexeIndex;
                bay = bays[bayIndex];
                if (bay.braces){
                    if (annexeIndex) {
                        wallBrace = bay.braces.find(brace => brace.annexeIndex === annexeIndex && brace.wallIndex === wallIndex);
                    } else {
                        wallBrace = bay.braces.find(brace => !brace.annexeIndex && brace.wallIndex === wallIndex);
                    }
                }
            }
            addingMode = BRACE_ADDING_MODE_IDS.MANUAL;
        } else {
            if (wallTypesArr && wallTypesArr.length > 0) {
                let firstWallType = wallTypesArr[0];
                bayIndex = firstWallType.bayIndex;
                wallIndex = firstWallType.wallIndex;
                annexeIndex = firstWallType.annexeIndex;

                bay = bays[bayIndex];
                if (bay.braces){
                    if (annexeIndex) {
                        wallBrace = bay.braces.find(brace => brace.annexeIndex === annexeIndex && brace.wallIndex === wallIndex);
                    } else {
                        wallBrace = bay.braces.find(brace => !brace.annexeIndex && brace.wallIndex === wallIndex);
                    }
                }
            }
            addingMode = BRACE_ADDING_MODE_IDS.MANUAL;  
            /* TO DO: Change to BRACE_ADDING_MODE_IDS.AUTO when finishing auto brace calculator */
        }

        if (!wallBrace && wallBraceIndex >= 0 && bay.braces && bay.braces[wallBraceIndex]){
            wallBrace = bay.braces[wallBraceIndex];
            wallIndex = wallBrace.wallIndex;
            annexeIndex = wallBrace.annexeIndex;
        }

        //Wall brace
        isEndWall = !annexeIndex && (wallIndex === WALL_LEFT_INDEX || wallIndex === WALL_RIGHT_INDEX);
        isLeftAwningEndWall = annexeIndex === ANNEXE_LEFT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;
        isRightAwningEndWall = annexeIndex === ANNEXE_RIGHT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;
        const wallBraceType = wallBrace ? wallBrace.type : 0;
        const wallBraceLocation = wallBrace ? wallBrace.location : WALL_BRACE_LOCATION_IDS.ENTIRE_BAY;
        const endWallOffset = ((isEndWall || isLeftAwningEndWall || isRightAwningEndWall) && wallBrace) ? wallBrace.offset : 0;
        const wallBraceStrength = wallBrace ? ((isEndWall || isLeftAwningEndWall || isRightAwningEndWall) ?
                                    CrossBraceCount.endWallBraceStrength(buildingDetails, endWallOffset, wallBraceType, wallBraceLocation, annexeIndex) :
                                    CrossBraceCount.sideWallBraceStrength(buildingDetails, bayIndex, wallBraceType, wallBraceLocation, annexeIndex)) : 0;
        
        //Roof brace
        if (!isEndWall && !isLeftAwningEndWall && !isRightAwningEndWall && roofs && roofs.length >= 3){
            let roof = ((!annexeIndex && wallIndex === WALL_TOP_INDEX) ||
                (annexeIndex === ANNEXE_LEFT_ID && wallIndex === ANNEXE_WALL_HORIZONTAL_INDEX)) ? roofs[0] : roofs[2];
            if (roof.braces){
                if (annexeIndex) {
                    roofBrace = roof.braces.find(brace => brace.annexeIndex === annexeIndex && brace.bayIndex === bayIndex);
                } else {
                    roofBrace = roof.braces.find(brace => !brace.annexeIndex && brace.bayIndex === bayIndex);
                }
            }
        }

        const roofBraceType = roofBrace ? roofBrace.type : 0;
        const roofBraceStrength = CrossBraceCount.roofBraceStrength(buildingDetails, bayIndex, roofBraceType, annexeIndex);
        const totalBraceStrength = CrossBraceCount.totalBraceStrength(buildingDetails);
        let bayBraceWallId = `${bayIndex}-${wallIndex}${annexeIndex ? `-${annexeIndex}` : ''}`;
        
        initialBraceForm = {
            ewBraceRequired: endWallBraceRequired ? parseFloat(endWallBraceRequired).toFixed(1) + " KN": 0,
            swBraceRequired: sideWallBraceRequired ? parseFloat(sideWallBraceRequired).toFixed(1) + " KN": 0,
            rBraceRequired: roofBraceRequired ? parseFloat(roofBraceRequired).toFixed(1) + " KN": 0,
            bayWallType: bayBraceWallId,
            endWallOffset: endWallOffset,
            wallBraceType: wallBraceType,
            wallBraceLocation: wallBraceLocation,
            wallBraceStrength: parseFloat(wallBraceStrength).toFixed(1) + ' KN',
            totalWallBraceStrength: (isEndWall || isLeftAwningEndWall || isRightAwningEndWall) ?
                parseFloat(totalBraceStrength.endWall).toFixed(1) + ' KN' : 
                parseFloat(totalBraceStrength.sideWall).toFixed(1) + ' KN' ,
            roofBraceType: roofBraceType,
            roofBraceStrength: parseFloat(roofBraceStrength).toFixed(1) + ' KN',
            totalRoofBraceStrength: parseFloat(totalBraceStrength.roof).toFixed(1) + ' KN',
            braceAddingMode: addingMode
        }

        this.props.QD_DM_changeBayWall({wall: wallTypesArr.find(item => item.id === bayBraceWallId)}); 
        this.props.initialize(initialBraceForm);
    };

    handleBayWallChange = (event) => {
        const id = event.target.value;
        const {wallTypesArr, bays, roofs, buildingDetails, changeCurrentFormFieldValue} = this.props;
        if (id && wallTypesArr){
            const selectedWallType = wallTypesArr.find(wall => wall.id === id);
            
            if (selectedWallType){
                let bayIndex = selectedWallType.bayIndex;
                let wallIndex = selectedWallType.wallIndex;
                let annexeIndex = selectedWallType.annexeIndex;

                let isEndWall = !annexeIndex && (wallIndex === WALL_LEFT_INDEX || wallIndex === WALL_RIGHT_INDEX);
                let isLeftAwningEndWall = annexeIndex === ANNEXE_LEFT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;
                let isRightAwningEndWall = annexeIndex === ANNEXE_RIGHT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;
                let bay = bays[bayIndex];
                let wallBrace, roofBrace;

                if (bay.braces){
                    if (isEndWall) {
                        wallBrace = bay.braces.find(brace =>
                            !brace.annexeIndex &&
                            brace.wallIndex === wallIndex &&
                            brace.offset === 0
                        );
                    } else if (isLeftAwningEndWall || isRightAwningEndWall) {
                        wallBrace = bay.braces.find(brace =>
                            brace.annexeIndex === annexeIndex &&
                            brace.wallIndex === wallIndex &&
                            brace.offset === 0
                        );
                    } else if (annexeIndex) {
                        wallBrace = bay.braces.find(brace => brace.annexeIndex === annexeIndex && brace.wallIndex === wallIndex);
                    } else {
                        wallBrace = bay.braces.find(brace => !brace.annexeIndex && brace.wallIndex === wallIndex);
                    }
                }

                //Wall brace
                const wallBraceType = wallBrace ? wallBrace.type : 0;
                const wallBraceLocation = wallBrace ? wallBrace.location : WALL_BRACE_LOCATION_IDS.ENTIRE_BAY;
                const endWallOffset = 0;
                const wallBraceStrength = wallBrace ? ((isEndWall || isLeftAwningEndWall || isRightAwningEndWall) ?
                                        CrossBraceCount.endWallBraceStrength(buildingDetails, endWallOffset, wallBraceType, wallBraceLocation, annexeIndex) :
                                        CrossBraceCount.sideWallBraceStrength(buildingDetails, bayIndex, wallBraceType, wallBraceLocation, annexeIndex)) : 0;
                
                //Roof brace
                if (!isEndWall && !isLeftAwningEndWall && !isRightAwningEndWall && roofs && roofs.length >= 3){
                    let roof = ((!annexeIndex && wallIndex === WALL_TOP_INDEX) ||
                        (annexeIndex === ANNEXE_LEFT_ID && wallIndex === ANNEXE_WALL_HORIZONTAL_INDEX)) ? roofs[0] : roofs[2];
                    if (roof.braces){
                        if (annexeIndex) {
                            roofBrace = roof.braces.find(brace => brace.annexeIndex === annexeIndex && brace.bayIndex === bayIndex);
                        } else {
                            roofBrace = roof.braces.find(brace => !brace.annexeIndex && brace.bayIndex === bayIndex);
                        }
                    }
                }
                const roofBraceType = roofBrace ? roofBrace.type : 0;
                const roofBraceStrength = CrossBraceCount.roofBraceStrength(buildingDetails, bayIndex, roofBraceType, annexeIndex);
                const totalBraceStrength = CrossBraceCount.totalBraceStrength(buildingDetails);

                this.props.QD_DM_changeBayWall({wall: selectedWallType});
                changeCurrentFormFieldValue('wallBraceType', wallBraceType);
                changeCurrentFormFieldValue('wallBraceLocation', wallBraceLocation);
                changeCurrentFormFieldValue('wallBraceStrength', parseFloat(wallBraceStrength).toFixed(1) + ' KN');
                changeCurrentFormFieldValue('endWallOffset', endWallOffset);
                changeCurrentFormFieldValue('roofBraceType', roofBraceType);
                changeCurrentFormFieldValue('roofBraceStrength', parseFloat(roofBraceStrength).toFixed(1) + ' KN');

                if (isEndWall || isLeftAwningEndWall || isRightAwningEndWall){
                    changeCurrentFormFieldValue('totalWallBraceStrength', parseFloat(totalBraceStrength.endWall).toFixed(1) + ' KN');
                } else {
                    changeCurrentFormFieldValue('totalWallBraceStrength', parseFloat(totalBraceStrength.sideWall).toFixed(1) + ' KN');
                    changeCurrentFormFieldValue('totalRoofBraceStrength', parseFloat(totalBraceStrength.roof).toFixed(1) + ' KN');
                }
            }
        }
    };

    handleOffsetChange = (event) => {
        const endWallOffset = parseInt(event.target.value);
        const {bays, selectedBayWall, activeWallBrace, currentBraceData, buildingDetails, changeCurrentFormFieldValue} = this.props;        
        let bayIndex;
        let wallIndex;
        let annexeIndex;
        let isEndWall, isLeftAwningEndWall, isRightAwningEndWall;
        if (selectedBayWall){
            bayIndex = selectedBayWall.bayIndex;
            wallIndex = selectedBayWall.wallIndex;
            annexeIndex = selectedBayWall.annexeIndex;
            isEndWall = !annexeIndex && (wallIndex === WALL_LEFT_INDEX || wallIndex === WALL_RIGHT_INDEX);
            isLeftAwningEndWall = annexeIndex === ANNEXE_LEFT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;
            isRightAwningEndWall = annexeIndex === ANNEXE_RIGHT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;
        }

        if (isEndWall || isLeftAwningEndWall || isRightAwningEndWall){
            let bay = bays[bayIndex];
            let wallBrace;
            let prvWallBraceStrength;

            if (bay.braces && activeWallBrace && activeWallBrace.braceIndex >= 0){
                wallBrace = bay.braces[activeWallBrace.braceIndex];
            } else if (bay.braces){
                if (isEndWall) {
                    wallBrace = bay.braces.find(brace =>
                        !brace.annexeIndex &&
                        brace.wallIndex === wallIndex &&
                        brace.offset === endWallOffset
                    );
                } else {
                    wallBrace = bay.braces.find(brace =>
                        brace.annexeIndex === annexeIndex &&
                        brace.wallIndex === wallIndex &&
                        brace.offset === endWallOffset
                    );
                }
            }

            //Wall brace
            const wallBraceType = wallBrace ? wallBrace.type : 0;
            const wallBraceLocation = wallBrace ? wallBrace.location : WALL_BRACE_LOCATION_IDS.ENTIRE_BAY;
            const wallBraceStrength = wallBrace ? CrossBraceCount.endWallBraceStrength(buildingDetails, endWallOffset, wallBraceType, wallBraceLocation, annexeIndex) : 0;
            
            prvWallBraceStrength = wallBrace ? CrossBraceCount.endWallBraceStrength(buildingDetails, wallBrace.offset, wallBrace.type, wallBrace.location, annexeIndex) : 0;
            
            changeCurrentFormFieldValue('wallBraceType', wallBraceType);
            changeCurrentFormFieldValue('wallBraceLocation', wallBraceLocation);
            changeCurrentFormFieldValue('wallBraceStrength', parseFloat(wallBraceStrength).toFixed(1) + ' KN');

            let totalBraceStrength = CrossBraceCount.totalBraceStrength(buildingDetails)['endWall'];
            totalBraceStrength = totalBraceStrength + wallBraceStrength - prvWallBraceStrength;
            changeCurrentFormFieldValue('totalWallBraceStrength', parseFloat(totalBraceStrength).toFixed(1) + ' KN');
        }
    };

    handleWallBraceTypeChange = (event) => {
        const {changeCurrentFormFieldValue, selectedBayWall, currentBraceData, buildingDetails, activeWallBrace} = this.props;
        const braceId = parseInt(event.target.value);
        const brace = PREDEFINED_BRACE_SELECTION.find(b => b.id === braceId);
        const bayIndex = selectedBayWall && selectedBayWall.bayIndex;
        const wallIndex = selectedBayWall && selectedBayWall.wallIndex;
        const annexeIndex = selectedBayWall && selectedBayWall.annexeIndex;
        let isEndWall = !annexeIndex && (wallIndex === WALL_LEFT_INDEX || wallIndex === WALL_RIGHT_INDEX);
        let isLeftAwningEndWall = annexeIndex === ANNEXE_LEFT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;
        let isRightAwningEndWall = annexeIndex === ANNEXE_RIGHT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;
        let prvBraceStrength = 0;
        if (buildingDetails.bays && buildingDetails.bays.length >= 0 && buildingDetails.bays.length > bayIndex){
            let bay = buildingDetails.bays[bayIndex];
            if (bay.braces) {
                let prvBrace;
                if (activeWallBrace && activeWallBrace.braceIndex >= 0){
                    prvBrace = bay.braces[activeWallBrace.braceIndex];
                } else {
                    if (isEndWall) {
                        prvBrace = bay.braces.find(brace => !brace.annexeIndex && brace.wallIndex === wallIndex && brace.offset === currentBraceData.endWallOffset);
                    } else if (isLeftAwningEndWall || isRightAwningEndWall) {
                        prvBrace = bay.braces.find(brace => brace.annexeIndex === annexeIndex && brace.wallIndex === wallIndex && brace.offset === currentBraceData.endWallOffset);
                    } else if (!annexeIndex) {
                        prvBrace = bay.braces.find(brace => !brace.annexeIndex && brace.wallIndex === wallIndex);
                    } else {
                        prvBrace = bay.braces.find(brace => brace.annexeIndex === annexeIndex && brace.wallIndex === wallIndex);
                    }                    
                }
                
                if (prvBrace){
                    prvBraceStrength = (isEndWall || isLeftAwningEndWall || isRightAwningEndWall) ?
                                        CrossBraceCount.endWallBraceStrength(buildingDetails, prvBrace.offset, prvBrace.type, prvBrace.location, annexeIndex) :
                                        CrossBraceCount.sideWallBraceStrength(buildingDetails, bayIndex, prvBrace.type, prvBrace.location, annexeIndex);
                }
            }
        }

        const totalBraceStrength = CrossBraceCount.totalBraceStrength(buildingDetails);
        if (brace){
            const braceStrength = (isEndWall || isLeftAwningEndWall || isRightAwningEndWall) ?
                                    CrossBraceCount.endWallBraceStrength(buildingDetails, currentBraceData.endWallOffset, braceId, currentBraceData.wallBraceLocation, annexeIndex) :
                                    CrossBraceCount.sideWallBraceStrength(buildingDetails, selectedBayWall.bayIndex, braceId, currentBraceData.wallBraceLocation, annexeIndex);
            changeCurrentFormFieldValue('wallBraceStrength', parseFloat(braceStrength).toFixed(1) + ' KN');

            const totalWallBraceStrengh = (isEndWall || isLeftAwningEndWall || isRightAwningEndWall) ?
                totalBraceStrength.endWall - prvBraceStrength + braceStrength :
                totalBraceStrength.sideWall - prvBraceStrength + braceStrength;
            changeCurrentFormFieldValue('totalWallBraceStrength', parseFloat(totalWallBraceStrengh).toFixed(1) + ' KN');
        } else {
            changeCurrentFormFieldValue('wallBraceStrength', '0.0 KN');
            const totalWallBraceStrengh = (isEndWall || isLeftAwningEndWall || isRightAwningEndWall) ?
                totalBraceStrength.endWall - prvBraceStrength:
                totalBraceStrength.sideWall - prvBraceStrength;
            changeCurrentFormFieldValue('totalWallBraceStrength', parseFloat(totalWallBraceStrengh).toFixed(1) + ' KN');
        }
    };

    handleWallBraceLocationChange = (event) => {
        const {changeCurrentFormFieldValue, selectedBayWall, currentBraceData, buildingDetails, activeWallBrace} = this.props;
        const locationId = parseInt(event.target.value);
        const bayIndex = selectedBayWall && selectedBayWall.bayIndex;
        const wallIndex = selectedBayWall && selectedBayWall.wallIndex;
        const annexeIndex = selectedBayWall && selectedBayWall.annexeIndex;
        let isEndWall = !annexeIndex && (wallIndex === WALL_LEFT_INDEX || wallIndex === WALL_RIGHT_INDEX);
        let isLeftAwningEndWall = annexeIndex === ANNEXE_LEFT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;
        let isRightAwningEndWall = annexeIndex === ANNEXE_RIGHT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;

        let prvBraceStrength = 0;
        if (buildingDetails.bays && buildingDetails.bays.length >= 0 && buildingDetails.bays.length > bayIndex){
            let bay = buildingDetails.bays[bayIndex];
            if (bay.braces) {
                let prvBrace;
                if (bay.braces && activeWallBrace && activeWallBrace.braceIndex >= 0){
                    prvBrace = bay.braces[activeWallBrace.braceIndex];
                } else {
                    if (isEndWall) {
                        prvBrace = bay.braces.find(brace => !brace.annexeIndex && brace.wallIndex === wallIndex && brace.offset === currentBraceData.endWallOffset);
                    } else if (isLeftAwningEndWall || isRightAwningEndWall) {
                        prvBrace = bay.braces.find(brace => brace.annexeIndex === annexeIndex && brace.wallIndex === wallIndex && brace.offset === currentBraceData.endWallOffset);
                    } else if (!annexeIndex) {
                        prvBrace = bay.braces.find(brace => !brace.annexeIndex && brace.wallIndex === wallIndex);
                    } else {
                        prvBrace = bay.braces.find(brace => brace.annexeIndex === annexeIndex && brace.wallIndex === wallIndex);
                    }
                }
                if (prvBrace){
                    prvBraceStrength = (isEndWall || isLeftAwningEndWall || isRightAwningEndWall) ?
                                        CrossBraceCount.endWallBraceStrength(buildingDetails, prvBrace.offset, prvBrace.type, prvBrace.location, annexeIndex) :
                                        CrossBraceCount.sideWallBraceStrength(buildingDetails, bayIndex, prvBrace.type, prvBrace.location, annexeIndex);
                }
            }
        }
        const totalBraceStrength = CrossBraceCount.totalBraceStrength(buildingDetails);
        if (currentBraceData && currentBraceData.wallBraceType){
            const brace =  PREDEFINED_BRACE_SELECTION.find(b => b.id === currentBraceData.wallBraceType);
            const braceStrength = (isEndWall || isLeftAwningEndWall || isRightAwningEndWall) ?
                CrossBraceCount.endWallBraceStrength(buildingDetails, currentBraceData.endWallOffset, brace.id, locationId, annexeIndex) :
                CrossBraceCount.sideWallBraceStrength(buildingDetails, bayIndex, brace.id, locationId, annexeIndex);
            changeCurrentFormFieldValue('wallBraceStrength', parseFloat(braceStrength).toFixed(1) + ' KN');
            const totalWallBraceStrengh = (isEndWall || isLeftAwningEndWall || isRightAwningEndWall) ?
                totalBraceStrength.endWall - prvBraceStrength + braceStrength :
                totalBraceStrength.sideWall - prvBraceStrength + braceStrength;
            changeCurrentFormFieldValue('totalWallBraceStrength', parseFloat(totalWallBraceStrengh).toFixed(1) + ' KN');
        } else {
            changeCurrentFormFieldValue('wallBraceStrength', '0.0 KN');
            const totalWallBraceStrengh = (isEndWall || isLeftAwningEndWall || isRightAwningEndWall) ?
                totalBraceStrength.endWall - prvBraceStrength:
                totalBraceStrength.sideWall - prvBraceStrength;
            changeCurrentFormFieldValue('totalWallBraceStrength', parseFloat(totalWallBraceStrengh).toFixed(1) + ' KN');
        }
    }; 

    handleRoofBraceTypeChange = (event) => {
        const {changeCurrentFormFieldValue, selectedBayWall, buildingDetails} = this.props;
        const braceId = parseInt(event.target.value);
        const brace = PREDEFINED_BRACE_SELECTION.find(b => b.id === braceId);
        const bayIndex = selectedBayWall && selectedBayWall.bayIndex;
        const wallIndex = selectedBayWall && selectedBayWall.wallIndex;
        const annexeIndex = selectedBayWall && selectedBayWall.annexeIndex;
        let prvBraceStrength = 0;
        if (buildingDetails.roofs && buildingDetails.roofs.length >= 3){
            let roof = ((!annexeIndex && wallIndex === WALL_TOP_INDEX) ||
                (annexeIndex === ANNEXE_LEFT_ID && wallIndex === ANNEXE_WALL_HORIZONTAL_INDEX)) ? buildingDetails.roofs[0] : buildingDetails.roofs[2];
            if (roof.braces) {
                let prvBrace;
                if (annexeIndex) {
                    prvBrace = roof.braces.find(brace => brace.annexeIndex === annexeIndex && brace.wallIndex === wallIndex && brace.bayIndex === bayIndex);
                } else {
                    prvBrace = roof.braces.find(brace => !brace.annexeIndex && brace.wallIndex === wallIndex && brace.bayIndex === bayIndex);
                }
                
                if (prvBrace){
                    prvBraceStrength = CrossBraceCount.roofBraceStrength(buildingDetails, bayIndex, prvBrace.type, annexeIndex);
                }
            }
        }
        const totalBraceStrength = CrossBraceCount.totalBraceStrength(buildingDetails);
        if (brace){
            const braceStrength = CrossBraceCount.roofBraceStrength(buildingDetails, selectedBayWall.bayIndex, braceId, annexeIndex);
            changeCurrentFormFieldValue('roofBraceStrength', parseFloat(braceStrength).toFixed(1) + ' KN');
            const totalRoofBraceStrengh = totalBraceStrength.roof - prvBraceStrength + braceStrength;
            changeCurrentFormFieldValue('totalRoofBraceStrength', parseFloat(totalRoofBraceStrengh).toFixed(1) + ' KN');
        } else {
            changeCurrentFormFieldValue('roofBraceStrength', '0.0 KN');
            const totalRoofBraceStrengh = totalBraceStrength.roof - prvBraceStrength;
            changeCurrentFormFieldValue('totalRoofBraceStrength', parseFloat(totalRoofBraceStrengh).toFixed(1) + ' KN');
        }
    };

    handleBraceSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const {selectedBayWall, bays, roofs, currentBraceData, 
                activeWallBrace, activeRoofBrace, handleModalClose, changeFieldValue, braceAddingMode} = this.props;
        if (braceAddingMode === BRACE_ADDING_MODE_IDS.AUTO){
            //Check if there are braces to show warning
            let showWarning = false;
            if (bays){
                for (let bayIndex = 0; bayIndex < bays.length; bayIndex++){
                    if (bays[bayIndex].braces && bays[bayIndex].braces.length > 0){
                        showWarning = true;
                        break;
                    }
                }
            }

            if (!showWarning && roofs){
                for (let roofIndex = 0; roofIndex < roofs.length; roofIndex = roofIndex + 2){
                    if (roofs[roofIndex].braces && roofs[roofIndex].braces.length > 0){
                        showWarning = true;
                        break;
                    }
                }
            }
            if (!showWarning || window.confirm('The current cross braces will be deleted? Do you want to continue?')) {
                //Delete current braces
                if (bays){
                    for (let bayIndex = 0; bayIndex < bays.length; bayIndex++){
                        if (bays[bayIndex].braces){
                            changeFieldValue(`bays[${bayIndex}].braces`, []);
                        }
                    }
                }

                if (roofs){
                    for (let roofIndex = 0; roofIndex < roofs.length; roofIndex = roofIndex + 2){
                        if (roofs[roofIndex].braces){
                            changeFieldValue(`roofs[${roofIndex}].braces`, []);
                        }
                    }
                }

                /* TO DO: auto select calculator */
                handleModalClose();
            }
        } else {
            //Check if edit or add new brace
            let bay;
            let bayIndex;
            let wallIndex;
            let annexeIndex;
            let isEndWall, isLeftAwningEndWall, isRightAwningEndWall;
            let wallBrace;
            let wallBraceIndex = -1;
            let roofBrace;
            let roofBraceIndex = -1;

            let isEdit = false;
            if (selectedBayWall && currentBraceData){
                bayIndex = selectedBayWall.bayIndex;
                wallIndex = selectedBayWall.wallIndex;
                annexeIndex = selectedBayWall.annexeIndex;
                isEndWall = selectedBayWall.name &&
                    (selectedBayWall.name.includes(QUOTES_WALL_TYPES_NAME.left) || selectedBayWall.name.includes(QUOTES_WALL_TYPES_NAME.right));
                isLeftAwningEndWall = selectedBayWall.annexeIndex === ANNEXE_LEFT_ID &&
                    (selectedBayWall.wallIndex === ANNEXE_WALL_LEFT_INDEX || selectedBayWall.wallIndex === ANNEXE_WALL_RIGHT_INDEX);
                isRightAwningEndWall = selectedBayWall.annexeIndex === ANNEXE_RIGHT_ID &&
                    (selectedBayWall.wallIndex === ANNEXE_WALL_LEFT_INDEX || selectedBayWall.wallIndex === ANNEXE_WALL_RIGHT_INDEX);
                bay = bays[bayIndex];
                if (bay.braces){
                    if (isEndWall) {
                        wallBrace = bay.braces.find(brace =>
                            !brace.annexeIndex &&
                            brace.wallIndex === wallIndex &&
                            brace.offset === currentBraceData.endWallOffset
                        );
                    } else if (isLeftAwningEndWall || isRightAwningEndWall) {
                        wallBrace = bay.braces.find(brace =>
                            brace.annexeIndex === annexeIndex &&
                            brace.wallIndex === wallIndex &&
                            brace.offset === currentBraceData.endWallOffset
                        );
                    } else if (annexeIndex) {
                        wallBrace = bay.braces.find(brace => brace.annexeIndex === annexeIndex && brace.wallIndex === wallIndex);
                    } else {
                        wallBrace = bay.braces.find(brace => !brace.annexeIndex && brace.wallIndex === wallIndex);
                    }
                    
                    if (wallBrace){
                        wallBraceIndex = bay.braces.indexOf(wallBrace);
                        isEdit = true;
                    }
                }

                if (!wallBrace && !isEndWall && !isLeftAwningEndWall && !isRightAwningEndWall) {
                    let roofIndex = ((!annexeIndex && wallIndex === WALL_TOP_INDEX) ||
                        (annexeIndex === ANNEXE_LEFT_ID && wallIndex === ANNEXE_WALL_HORIZONTAL_INDEX)) ? 0 : 2;
                    if (roofs && roofs.length >= 3 && roofs[roofIndex].braces){
                        if (annexeIndex) {
                            roofBrace = roofs[roofIndex].braces.find(brace => brace.annexeIndex === annexeIndex && brace.bayIndex === bayIndex);
                        } else {
                            roofBrace = roofs[roofIndex].braces.find(brace => !brace.annexeIndex && brace.bayIndex === bayIndex);
                        }

                        if (roofBrace){
                            isEdit = true;
                        }
                    }
                }
            }

            if ((activeWallBrace && activeWallBrace.bayIndex >= 0 && activeWallBrace.braceIndex >= 0) ||
                (activeRoofBrace && activeRoofBrace.bayIndex >= 0 && activeRoofBrace.wallIndex >= 0) ||
                isEdit
            ) {
                //-- Edit current brace
                if (activeWallBrace && activeWallBrace.braceIndex >= 0 && activeWallBrace.bayIndex >= 0){
                    bayIndex = activeWallBrace.bayIndex;
                    wallBraceIndex = activeWallBrace.braceIndex;
                    bay = bays[bayIndex];
                } else if (activeRoofBrace && activeRoofBrace.bayIndex >= 0 && activeRoofBrace.wallIndex >= 0){
                    bayIndex = activeRoofBrace.bayIndex;
                    wallIndex = activeRoofBrace.wallIndex;
                    annexeIndex = activeRoofBrace.annexeIndex;
                    isEndWall = !annexeIndex && (wallIndex === WALL_LEFT_INDEX || wallIndex === WALL_RIGHT_INDEX);
                    isLeftAwningEndWall = annexeIndex === ANNEXE_LEFT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;
                    isRightAwningEndWall = annexeIndex === ANNEXE_RIGHT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;
                    bay = bays[bayIndex];
                    if (bay.braces){
                        if (isEndWall) {
                            wallBrace = bay.braces.find(brace =>
                                !brace.annexeIndex &&
                                brace.wallIndex === wallIndex &&
                                brace.offset === currentBraceData.endWallOffset
                            );
                        } else if (isLeftAwningEndWall || isRightAwningEndWall) {
                            wallBrace = bay.braces.find(brace =>
                                brace.annexeIndex === annexeIndex &&
                                brace.wallIndex === wallIndex &&
                                brace.offset === currentBraceData.endWallOffset
                            );
                        } else if (annexeIndex) {
                            wallBrace = bay.braces.find(brace => brace.annexeIndex === annexeIndex && brace.wallIndex === wallIndex);
                        } else {
                            wallBrace = bay.braces.find(brace => !brace.annexeIndex && brace.wallIndex === wallIndex);
                        }
                        
                        if (wallBrace){
                            wallBraceIndex = bay.braces.indexOf(wallBrace);
                            isEdit = true;
                        }

                        if (wallBrace){
                            wallBraceIndex = bay.braces.indexOf(wallBrace);
                        }
                    }
                }

                if (!wallBrace && wallBraceIndex >= 0 && bay.braces && bay.braces[wallBraceIndex]){
                    wallBrace = bay.braces[wallBraceIndex];
                    wallIndex = wallBrace.wallIndex;
                }

                //Wall Brace
                let wallBraceType = currentBraceData.wallBraceType;
                isEndWall = !annexeIndex && (wallIndex === WALL_LEFT_INDEX || wallIndex === WALL_RIGHT_INDEX);
                isLeftAwningEndWall = annexeIndex === ANNEXE_LEFT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;
                isRightAwningEndWall = annexeIndex === ANNEXE_RIGHT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;
                if (wallBraceType > 0){     //Edit or add wall brace
                    let brace = {
                        bayIndex:   bayIndex,
                        wallIndex:  currentBraceData.wallIndex,
                        annexeIndex: currentBraceData.annexeIndex,
                        type:       currentBraceData.wallBraceType,
                        location:   currentBraceData.wallBraceLocation,
                        offset:     (isEndWall || isLeftAwningEndWall || isRightAwningEndWall) ? currentBraceData.endWallOffset : 0
                    };
                    if (wallBraceIndex >= 0){
                        const field = `bays[${bayIndex}].braces[${wallBraceIndex}]`;
                        changeFieldValue(field, brace);
                    } else {
                        let bayWallBraces = [];
                        if (bays[bayIndex].braces){
                            for (let braceIndex = 0; braceIndex < bays[bayIndex].braces.length; braceIndex++){
                                bayWallBraces.push(bays[bayIndex].braces[braceIndex]);
                            }
                        }
                        bayWallBraces.push(brace);
                        changeFieldValue(`bays[${bayIndex}].braces`, bayWallBraces);
                    }
                } else if (wallBrace && bays[bayIndex].braces){    //Delete wall brace
                    const remainingBraces = bays[bayIndex].braces.filter(brace => brace !== wallBrace);
                    changeFieldValue(`bays[${bayIndex}].braces`, remainingBraces);
                }

                //Roof brace
                if (!isEndWall && !isLeftAwningEndWall && !isRightAwningEndWall && roofs && roofs.length >= 3){
                    let roofBraceType = currentBraceData.roofBraceType;
                    let roofIndex = ((!annexeIndex && wallIndex === WALL_TOP_INDEX) ||
                        (annexeIndex === ANNEXE_LEFT_ID && wallIndex === ANNEXE_WALL_HORIZONTAL_INDEX)) ? 0 : 2;
                    if (roofs[roofIndex].braces){
                        if (annexeIndex) {
                            roofBrace = roofs[roofIndex].braces.find(brace => brace.annexeIndex === annexeIndex && brace.bayIndex === bayIndex);
                        } else {
                            roofBrace = roofs[roofIndex].braces.find(brace => !brace.annexeIndex && brace.bayIndex === bayIndex);
                        }

                        if (roofBrace){
                            roofBraceIndex = roofs[roofIndex].braces.indexOf(roofBrace);
                        }
                    }

                    if (roofBraceType > 0){ //Edit or add roof brace
                        let brace = {
                            bayIndex:   bayIndex,
                            wallIndex:  wallIndex,
                            annexeIndex: annexeIndex,
                            type:       roofBraceType
                        }

                        if (roofBraceIndex >= 0){
                            const field = `roofs[${roofIndex}].braces[${roofBraceIndex}]`;
                            changeFieldValue(field, brace);
                        } else {
                            let roofBraces = [];
                            if (roofs[roofIndex].braces){
                                for (let braceIndex = 0; braceIndex < roofs[roofIndex].braces.length; braceIndex++){
                                    roofBraces.push(roofs[roofIndex].braces[braceIndex]);
                                }
                            }
                            roofBraces.push(brace);
                            changeFieldValue(`roofs[${roofIndex}].braces`, roofBraces);    
                        }
                    } else if (roofBrace) { //Delete roof brace
                        const remainingBraces = roofs[roofIndex].braces.filter(brace => brace !== roofBrace);
                        changeFieldValue(`roofs[${roofIndex}].braces`, remainingBraces);
                    }
                }
            } else if (selectedBayWall && currentBraceData){
                wallIndex = selectedBayWall.wallIndex;
                bayIndex = selectedBayWall.bayIndex;
                annexeIndex = selectedBayWall.annexeIndex;
                isEndWall = !annexeIndex && (wallIndex === WALL_LEFT_INDEX || wallIndex === WALL_RIGHT_INDEX);
                isLeftAwningEndWall = annexeIndex === ANNEXE_LEFT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;
                isRightAwningEndWall = annexeIndex === ANNEXE_RIGHT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;

                if (currentBraceData.wallBraceType){
                    let brace = {
                        bayIndex:   bayIndex,
                        wallIndex:  currentBraceData.wallIndex,
                        annexeIndex: currentBraceData.annexeIndex,
                        type:       currentBraceData.wallBraceType,
                        location:   currentBraceData.wallBraceLocation,
                        offset:     (isEndWall || isLeftAwningEndWall || isRightAwningEndWall) ? currentBraceData.endWallOffset : 0
                    }

                    let wallBraces = [];
                    if (bays[bayIndex].braces){
                        for (let braceIndex = 0; braceIndex < bays[bayIndex].braces.length; braceIndex++){
                            wallBraces.push(bays[bayIndex].braces[braceIndex]);
                        }
                    }
                    wallBraces.push(brace);
                    changeFieldValue(`bays[${bayIndex}].braces`, wallBraces);
                }

                if (currentBraceData.roofBraceType){
                    if (!isEndWall && roofs && roofs.length >= 3 && currentBraceData.roofBraceType){
                        let brace = {
                            bayIndex:   bayIndex,
                            wallIndex:  currentBraceData.wallIndex,
                            annexeIndex: currentBraceData.annexeIndex,
                            type:       currentBraceData.roofBraceType
                        }
                    
                        let roofIndex = ((!currentBraceData.annexeIndex && currentBraceData.wallIndex === WALL_TOP_INDEX) ||
                            (currentBraceData.annexeIndex === ANNEXE_LEFT_ID && currentBraceData.wallIndex === ANNEXE_WALL_HORIZONTAL_INDEX)) ? 0 : 2;
                        let roofBraces = [];
                        if (roofs[roofIndex].braces){
                            for (let braceIndex = 0; braceIndex < roofs[roofIndex].braces.length; braceIndex++){
                                roofBraces.push(roofs[roofIndex].braces[braceIndex]);
                            }
                        }
                        roofBraces.push(brace);
                        changeFieldValue(`roofs[${roofIndex}].braces`, roofBraces);
                    }
                }
            }
            handleModalClose();
        }
        
    };

    initialOptions() {
        const {selectedBayWall, buildingDetails, bays, roofs, activeWallBrace, activeRoofBrace, currentBraceData} = this.props;
        let bay;
        let bayIndex;
        let wallIndex;
        let annexeIndex;
        let wallBrace;
        let roofBrace;
        const isEndWall = (selectedBayWall &&selectedBayWall.name &&
            (selectedBayWall.name.includes(QUOTES_WALL_TYPES_NAME.left) || selectedBayWall.name.includes(QUOTES_WALL_TYPES_NAME.right)));
        const isLeftAwningEndWall = selectedBayWall && selectedBayWall.annexeIndex === ANNEXE_LEFT_ID &&
            (selectedBayWall.wallIndex === ANNEXE_WALL_LEFT_INDEX || selectedBayWall.wallIndex === ANNEXE_WALL_RIGHT_INDEX);
        const isRightAwningEndWall = selectedBayWall && selectedBayWall.annexeIndex === ANNEXE_RIGHT_ID &&
            (selectedBayWall.wallIndex === ANNEXE_WALL_LEFT_INDEX || selectedBayWall.wallIndex === ANNEXE_WALL_RIGHT_INDEX);

        if (selectedBayWall){
            bayIndex = selectedBayWall.bayIndex;
            wallIndex = selectedBayWall.wallIndex;
            annexeIndex = selectedBayWall.annexeIndex;
            bay = bays[bayIndex];
        }

        //Offset array
        let endWallOffsetArr = [];
        if (isLeftAwningEndWall || isRightAwningEndWall) {
            let awningSpan;
            if (annexeIndex === ANNEXE_LEFT_ID && buildingDetails.isAnnexeLeft && !isEmpty(buildingDetails.annexeLeft)) {
                awningSpan = buildingDetails.annexeLeft.span;
            } else if (annexeIndex === ANNEXE_RIGHT_ID && buildingDetails.isAnnexeRight && !isEmpty(buildingDetails.annexeRight)) {
                awningSpan = buildingDetails.annexeRight.span;
            }

            if (awningSpan) {
                let EWMs = awningSpan / Math.ceil(awningSpan / 4000);
                for (let offset = 0; offset < awningSpan; offset = offset + EWMs){
                    wallBrace = null;
                    if (activeWallBrace && activeWallBrace.braceIndex >= 0){
                        wallBrace = bay.braces.find(brace => brace.annexeIndex === annexeIndex && brace.wallIndex === wallIndex && brace.offset === Math.ceil(offset));
                        if (wallBrace === bay.braces[activeWallBrace.braceIndex]){
                            wallBrace = null;
                        }
                    }
    
                    if (!wallBrace){
                        endWallOffsetArr.push(Math.ceil(offset));
                    }
                }
            }
        } else if (isEndWall) {
            let EWMs = buildingDetails.buildingSpan / Math.ceil(buildingDetails.buildingSpan / 4000);
            for (let offset = 0; offset < buildingDetails.buildingSpan; offset = offset + EWMs){
                wallBrace = null;
                if (activeWallBrace && activeWallBrace.braceIndex >= 0){
                    wallBrace = bay.braces.find(brace => !brace.annexeIndex && brace.wallIndex === wallIndex && brace.offset === Math.ceil(offset));
                    if (wallBrace === bay.braces[activeWallBrace.braceIndex]){
                        wallBrace = null;
                    }
                }

                if (!wallBrace){
                    endWallOffsetArr.push(Math.ceil(offset));
                }
            }
        }

        //Check if is editing
        let isEditing =   ((activeWallBrace && activeWallBrace.bayIndex >= 0 && activeWallBrace.braceIndex >= 0) ||
                            (activeRoofBrace && activeRoofBrace.bayIndex >= 0 && activeRoofBrace.wallIndex >= 0));
        if (!isEditing && selectedBayWall && currentBraceData){
            if (bay && bay.braces){
                wallBrace = isEndWall ?
                            bay.braces.find(brace => brace.wallIndex === wallIndex && brace.offset === currentBraceData.endWallOffset) :
                            bay.braces.find(brace => brace.wallIndex === wallIndex);
                if (wallBrace){
                    isEditing = true;
                }
            }

            if (!wallBrace && !isEndWall) {
                let roofIndex = ((!annexeIndex && wallIndex === WALL_TOP_INDEX) ||
                    (annexeIndex === ANNEXE_LEFT_ID && wallIndex === ANNEXE_WALL_HORIZONTAL_INDEX)) ? 0 : 2;
                if (roofs && roofs.length >= 3 && roofs[roofIndex].braces){
                    roofBrace = roofs[roofIndex].braces.find(brace => brace.bayIndex === bayIndex);
                    if (roofBrace){
                        isEditing = true;
                    }
                }
            }
        }

        //Check if has roof only
        let isRoofOnly = false;
        if ((annexeIndex === ANNEXE_LEFT_ID &&
            (wallIndex === ANNEXE_WALL_HORIZONTAL_INDEX && bay.leftAnnexeP2 !== WALL_STATUS_HAS_WALL)) ||

            (annexeIndex === ANNEXE_RIGHT_ID &&
                (wallIndex === ANNEXE_WALL_HORIZONTAL_INDEX && bay.rightAnnexeP2 !== WALL_STATUS_HAS_WALL)) ||

            (!annexeIndex &&
                ((wallIndex === WALL_TOP_INDEX && bay.partitionTopStatus !== WALL_STATUS_HAS_WALL)
                || (wallIndex === WALL_BOTTOM_INDEX && bay.partitionBottomStatus !== WALL_STATUS_HAS_WALL)))
        ){
            isRoofOnly = true;
        }

        return {
            isEditing,
            isRoofOnly,
            isEndWall, isLeftAwningEndWall, isRightAwningEndWall,
            endWallOffsetArr
        }
    };

    render() {
        const  { isEditing, isRoofOnly, isEndWall, isLeftAwningEndWall, isRightAwningEndWall, endWallOffsetArr } = this.initialOptions();
        return (
            <DrawFloorPlanBraceModalComponent   {...this.props} isEndWall = {isEndWall}
                                                isLeftAwningEndWall = {isLeftAwningEndWall}
                                                isRightAwningEndWall = {isRightAwningEndWall}
                                                endWallOffsetArr = {endWallOffsetArr} 
                                                isEditing = {isEditing} isRoofOnly = {isRoofOnly}
                                                handleBayWallChange = {this.handleBayWallChange}
                                                handleOffsetChange = {this.handleOffsetChange}
                                                handleWallBraceTypeChange = {this.handleWallBraceTypeChange}
                                                handleWallBraceLocationChange = {this.handleWallBraceLocationChange}
                                                handleRoofBraceLocationChange = {this.handleRoofBraceLocationChange}
                                                handleRoofBraceTypeChange = {this.handleRoofBraceTypeChange}
                                                handleBraceSubmit = {this.handleBraceSubmit}
                                                braceAddingMode = {this.props.braceAddingMode}
                                                rollFormSupply = {this.props.buildingDetails.rollFormSupply}
            />
        );
    };
};

const validate = (values, {selectedBayWall, bays, roofs, activeWallBrace, activeRoofBrace, currentBraceData, braceAddingMode}) => {
    const errors = {};
    let isEditing =   ((activeWallBrace && activeWallBrace.bayIndex >= 0 && activeWallBrace.braceIndex >= 0) ||
                       (activeRoofBrace && activeRoofBrace.bayIndex >= 0 && activeRoofBrace.wallIndex >= 0));
        
    if (!isEditing && selectedBayWall && currentBraceData && braceAddingMode === BRACE_ADDING_MODE_IDS.MANUAL){
        let bay;
        let bayIndex;
        let wallIndex;
        let annexeIndex;
        let isEndWall, isLeftAwningEndWall, isRightAwningEndWall;
        let wallBrace;
        let roofBrace;
        
        bayIndex = selectedBayWall.bayIndex;
        wallIndex = selectedBayWall.wallIndex;
        annexeIndex = selectedBayWall.annexeIndex;
        isEndWall = !annexeIndex && (wallIndex === WALL_LEFT_INDEX || wallIndex === WALL_RIGHT_INDEX);
        isLeftAwningEndWall = annexeIndex === ANNEXE_LEFT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;
        isRightAwningEndWall = annexeIndex === ANNEXE_RIGHT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;
        bay = bays[bayIndex];
        if (bay.braces){
            if (isEndWall) {
                wallBrace = bay.braces.find(brace =>
                    !brace.annexeIndex &&
                    brace.wallIndex === wallIndex &&
                    brace.offset === currentBraceData.endWallOffset
                );
            } else if (isLeftAwningEndWall || isRightAwningEndWall) {
                wallBrace = bay.braces.find(brace =>
                    brace.annexeIndex === annexeIndex &&
                    brace.wallIndex === wallIndex &&
                    brace.offset === currentBraceData.endWallOffset
                );
            } else if (annexeIndex) {
                wallBrace = bay.braces.find(brace => brace.annexeIndex === annexeIndex && brace.wallIndex === wallIndex);
            } else {
                wallBrace = bay.braces.find(brace => !brace.annexeIndex && brace.wallIndex === wallIndex);
            }

            if (wallBrace){
                isEditing = true;
            }
        }

        if (!wallBrace && !isEndWall) {
            let roofIndex = ((!annexeIndex && wallIndex === WALL_TOP_INDEX) ||
                (annexeIndex === ANNEXE_LEFT_ID && wallIndex === ANNEXE_WALL_HORIZONTAL_INDEX)) ? 0 : 2;
            if (roofs && roofs.length >= 3 && roofs[roofIndex].braces){
                if (annexeIndex) {
                    roofBrace = roofs[roofIndex].braces.find(brace => brace.annexeIndex === annexeIndex && brace.bayIndex === bayIndex);
                } else {
                    roofBrace = roofs[roofIndex].braces.find(brace => !brace.annexeIndex && brace.bayIndex === bayIndex);
                }

                if (roofBrace){
                    isEditing = true;
                }
            }
        }
    }
    
    if (selectedBayWall && !isEditing && braceAddingMode === BRACE_ADDING_MODE_IDS.MANUAL){
        const wallIndex = selectedBayWall.wallIndex;
        const annexeIndex = selectedBayWall.annexeIndex;
        const isEndWall = !annexeIndex && (wallIndex === WALL_LEFT_INDEX || wallIndex === WALL_RIGHT_INDEX);
        const isLeftAwningEndWall = annexeIndex === ANNEXE_LEFT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;
        const isRightAwningEndWall = annexeIndex === ANNEXE_RIGHT_ID && wallIndex !== ANNEXE_WALL_HORIZONTAL_INDEX;
        if (((isEndWall || isLeftAwningEndWall || isRightAwningEndWall) && !currentBraceData.wallBraceType) ||
            (!isEndWall && !isLeftAwningEndWall && !isRightAwningEndWall && !currentBraceData.wallBraceType && !currentBraceData.roofBraceType)
        ) {
            errors.wallBraceType = 'Required';
        }
    }
    
    return errors;
};

const braceFormSelector = formValueSelector(QUOTES_DM_BRACE_ADD_FORM_NAME);
const mapStateToProps = (state, ownProps) => ({
    selectedBayWall:        getQDDMSelectedBayWall(state),
    wallTypesArr:           CalculationUtils.calculateWallTypesArr(ownProps.buildingDetails, true),
    currentBraceData: {
        wallBraceType:      braceFormSelector(state, "wallBraceType"),
        wallBraceLocation:  braceFormSelector(state, "wallBraceLocation"),
        endWallOffset:      braceFormSelector(state, "endWallOffset"),
        roofBraceType:      braceFormSelector(state, "roofBraceType"),
    },

    braceAddingMode:        braceFormSelector(state, "braceAddingMode"),
});

const mapDispatchToProps = (dispatch) => ({
    changeFieldValue: function (field, value) {
        dispatch(change(QUOTES_BUILDING_DETAIL_FORM_NAME, field, value))
    },
    changeCurrentFormFieldValue: function (field, value) {
        dispatch(change(QUOTES_DM_BRACE_ADD_FORM_NAME, field, value))
    },
    QD_DM_changeBayWall: payload => dispatch(QD_DM_changeBayWall(payload))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => (
    {
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        currentBraceData: {
            ...stateProps.currentBraceData,
            wallIndex:  stateProps.selectedBayWall && stateProps.selectedBayWall.wallIndex,
            annexeIndex:  stateProps.selectedBayWall && stateProps.selectedBayWall.annexeIndex
        }
    }
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
    reduxForm({
        form: QUOTES_DM_BRACE_ADD_FORM_NAME,
        validate
    })(DrawFloorPlanBraceModal)
);