import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import {change, formValueSelector, getFormValues, reduxForm, initialize} from 'redux-form';
import {onSubmitActions} from "redux-form-submit-saga";
import { Prompt } from 'react-router';

import moment from 'moment';

import auth from '../../../services/auth';
import {loadQuoteInfo, QD_changeTabAction, QD_changeAWaitingTask, QD_sendOrder} from '../actions';
import {DOC_requestZipContent, DOC_loadADocument} from "../../documents/actions";
import QuoteAddComponent from "../components/QuoteAdd";
import {
    getQDBuildingDetail,
    getQDQuoteId,
    getQDQuoteUserId,
    getQDSelectedProductInfo,
    getQDSelectedTab,
    getQDClientDetail,
    getQDQuoteStatus,
    getQDDMIsMounted,
    getQDWaitingTasks,
    getQDJobNumber,
    getQDUserDetail,
    getPurlinAndGirtFromID,
    getBuildingSlopesListFromProduct,
    getKneeBraceAndCollarTieOptionsFromProduct
} from "../selectors";
import {
    BD_OA_VERMIN_LENGTH_DEFAULT,
    BD_OA_VERMIN_LENGTH_MAX,
    BD_OA_VERMIN_LENGTH_MIN,
    QUOTES_BUILDING_DETAIL_FORM_NAME,
    SKYLIGHT_WIDTH,
    WALL_STATUS_HAS_WALL, WALL_STATUS_NO_WALL, WALL_STATUS_NOTHING, WALL_LEFT_INDEX,
    ZIP_PACKAGE_TYPES,
    SHEETING_DIRECTION_IDS,
    FOOTING_TYPES
} from '../constants';
import {
    validateBetweenValue,
    validateMaxValue, validateMinValue,
    validateRequired
} from "../../../components/common/Form/FieldLevelValidation";
import isEmpty from "lodash/isEmpty";
import {
    DEFAULT_BUILDING_VALUES,
    PREDEFINED_ENGINEERING_CLASSES,
    PREDEFINED_FFL_RANGES,
    PRODUCT_CATEGORY_SKILLION_CARPORTS,
    PRODUCT_CATEGORY_GABLE_CARPORTS,
    PRODUCT_CATEGORY_SKILLION_SHEDS,
    PRODUCT_TYPES,
} from "../../../constants";
import ProductConvert from "./QuoteDetail/Calculation/ProductConvert";
import {getDealerInfo, getUserProfile} from "../../users/selectors";
import {DOCS_TYPE_FLASHING, DOCS_TYPE_BRACKET, DOCS_TYPE_QUOTE_PAGE, DOCS_TYPE_COLOURS_SHEET} from "../../documents/constants";
import LongWindBracingCount from "../containers/QuoteDetail/TutorialSelection/LongWindBracingCount";
import CrossBraceCount from "../containers/QuoteDetail/TutorialSelection/CrossBraceCount";

/**
 * This will also need to persist working items into local storage for each saved change
 *  so that when a page is refreshed, it will remain intact.
 */
class QuoteEdit extends Component {

    constructor(props) {
        super(props);

        //-- Since we need to refer refs in the footer, we must have it here :-(
        this.dmRefs = [];
    }

    /**
     * Set ref for an element
     *
     * @param type
     * @param element
     */
    setStageRef = (type, element) => {
        let dmRef = this.dmRefs.find(r => r.type === type);
        if (!dmRef) {
            this.dmRefs.push({
                type,
                element
            });
        }
    };

    componentDidMount() {
        const {history} = this.props;
        let {quoteId} = this.props.match.params;
        if (!quoteId) {
            history.push('/quotes/list');
        }

        const query = new URLSearchParams(history.location.search);
        const fromCreated = query.get('fromCreated');
        //-- If redirection is from just created page, we do not need to load content
        if (!(fromCreated && this.props.buildingDetail && this.props.buildingDetail.id)){
            let isAdminMode = +query.get('adminMode');
            if (isAdminMode) {
                if (!auth.checkIsAdmin(auth.getUserFromStorage()))
                    isAdminMode = 0;
            }
            this.props.loadQuoteInfo({id: quoteId, adminMode: isAdminMode});
        }
        else{
            this.doInitBuildingForm(this.props.buildingDetail, this.props.product, this.props.clientDetail, this.props.userInfo);
        }
    }

    /**
     * Initiate form when remote data is loaded
     *
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.buildingDetail && isEmpty(this.props.buildingDetail) && nextProps.product){
            const {buildingDetail, product, clientDetail, userInfo} = nextProps;
            this.doInitBuildingForm(buildingDetail, product, clientDetail, userInfo);
        }
    }

    componentDidUpdate(prevProps) {
        const {isDrawingModeMounted, quotePageSavedData} = this.props;
        if (isDrawingModeMounted
            && quotePageSavedData 
            && (isDrawingModeMounted !== prevProps.isDrawingModeMounted 
                || !prevProps.quotePageSavedData
                || quotePageSavedData !== prevProps.quotePageSavedData)
        ){
            //If Quote-page is not saved or is not re-saved after user changes the shed design,
            //"quotePageSavedData" will be {} or contains wrong information,
            //so we must re-calcu quotePageData before sending it to generate PDF
            const {waitingTasks} = this.props;
            if (waitingTasks && waitingTasks.includes("QDL")){
                this.props.QD_changeAWaitingTask({type: "-", taskId: "QDL"});
                this.doSubmitDownloadData('z');
            }
            if (waitingTasks && waitingTasks.includes("QS")){
                this.props.QD_changeAWaitingTask({type: "-", taskId: "QS"});
                this.doSubmitDownloadData('s');
            }
        }

        //--Change hasKneeBrace and hasCollarTie
        if (this.props.product && this.props.quoteDetails && prevProps.quoteDetails &&
            this.props.quoteDetails.kneeBraceAndCollarTie !== prevProps.quoteDetails.kneeBraceAndCollarTie
        ) {
            const {changeFieldValue} = this.props;
            let kneeBraceAndCollarTieOptions = getKneeBraceAndCollarTieOptionsFromProduct(this.props.product.id);
            if (kneeBraceAndCollarTieOptions) {
                let kneeBraceAndCollarTie = kneeBraceAndCollarTieOptions.find(item => item.id === this.props.quoteDetails.kneeBraceAndCollarTie);
                if (kneeBraceAndCollarTie) {
                    changeFieldValue('hasKneeBrace', kneeBraceAndCollarTie.hasKneeBrace);
                    changeFieldValue('hasCollarTie', kneeBraceAndCollarTie.hasCollarTie);
                }
            }
        }
    }

    doInitBuildingForm = (buildingDetail, product, clientDetail, userInfo) => {
        if (isEmpty(buildingDetail) || isEmpty(product))
            return;

        //-- Building Detail
        buildingDetail.productId = `${product.id}`;
        const currentProduct = PRODUCT_TYPES.find(item => item.id === parseInt(buildingDetail.productId));

        let purlinAndGirt = null;
        if (!isEmpty(buildingDetail.purlinAndGirtType)) {
            purlinAndGirt = getPurlinAndGirtFromID(buildingDetail.purlinAndGirtType, product.id);
        } else
            purlinAndGirt = getPurlinAndGirtFromID(DEFAULT_BUILDING_VALUES.purlinAndGirtType, product.id);
        
        if (!buildingDetail.rollFormSupply && userInfo && !userInfo.roles.includes("admin") && userInfo.userRollFormSupply){
            buildingDetail.rollFormSupply = userInfo.userRollFormSupply;
        } 

        if (!buildingDetail.kneeBraceAndCollarTie) {
            let kneeBraceAndCollarTieOptions = getKneeBraceAndCollarTieOptionsFromProduct(product.id);
            if (kneeBraceAndCollarTieOptions && kneeBraceAndCollarTieOptions.length > 0) {
                buildingDetail.kneeBraceAndCollarTie = kneeBraceAndCollarTieOptions[0].id;
            }
        }

        if (buildingDetail.kneeBraceAndCollarTie) {
            let kneeBraceAndCollarTieOptions = getKneeBraceAndCollarTieOptionsFromProduct(product.id);
            if (kneeBraceAndCollarTieOptions) {
                let kneeBraceAndCollarTie = kneeBraceAndCollarTieOptions.find(item => item.id === buildingDetail.kneeBraceAndCollarTie);
                if (kneeBraceAndCollarTie) {
                    buildingDetail.hasKneeBrace = kneeBraceAndCollarTie.hasKneeBrace;
                    buildingDetail.hasCollarTie = kneeBraceAndCollarTie.hasCollarTie;
                }
            }
        }

        let rollFormSupply = buildingDetail.rollFormSupply ? buildingDetail.rollFormSupply : DEFAULT_BUILDING_VALUES.rollFormSupply;
        let defaultBuildingValues = ProductConvert.defaultBuildingValues(rollFormSupply);

        if (!buildingDetail.buildingSpan) {
            //buildingDetail.buildingSpan = (product && product.params && product.params.min_span) || 0;
            buildingDetail.buildingSpan = defaultBuildingValues.buildingSpan;
        }
        if (!buildingDetail.buildingLength) {
            //buildingDetail.buildingLength = (product && product.params && product.params.min_length) || 0;
            buildingDetail.buildingLength = defaultBuildingValues.buildingLength;
        }
        if (!buildingDetail.buildingHeight) {
            //buildingDetail.buildingHeight = (product && product.params && product.params.min_height) || 0;
            buildingDetail.buildingHeight = defaultBuildingValues.buildingHeight;
        }

        const slopeList = getBuildingSlopesListFromProduct(parseInt(buildingDetail.productId));
        if(!buildingDetail.buildingSlope || (slopeList && slopeList.length>0 && !slopeList.includes(parseFloat(buildingDetail.buildingSlope)))){
            buildingDetail.buildingSlope = slopeList[0];
        }

        let averageHeight=Math.ceil(buildingDetail.buildingHeight+buildingDetail.buildingSpan/4*Math.tan(buildingDetail.buildingSlope/180*Math.PI));
        buildingDetail.averageHeight = averageHeight;

        if (!isEmpty(buildingDetail.bays)) {
            buildingDetail.numberOfBays = buildingDetail.bays.length;
        } else {
            // console.log('buildingDetail.bays', buildingDetail.bays);
            const purlinAndGirt = getPurlinAndGirtFromID(buildingDetail.purlinAndGirtType, parseInt(buildingDetail.productId));
            if(purlinAndGirt) {
                buildingDetail.numberOfBays = Math.ceil(buildingDetail.buildingLength / purlinAndGirt.bayMax);
            } else {
                buildingDetail.numberOfBays = Math.ceil(buildingDetail.buildingLength / product.params.max_bayspace);
            }

            if (buildingDetail.numberOfBays > 0) {  //-- init bay list with default value
                let bayValues = [];
                const eachValue = Math.ceil(buildingDetail.buildingLength/buildingDetail.numberOfBays);
                const isCarport = (currentProduct.categoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS || currentProduct.categoryId === PRODUCT_CATEGORY_GABLE_CARPORTS);

                for (let i = 0; i < buildingDetail.numberOfBays - 1; i++){
                        if ( i === 0){
                            // first bay, set surrounding walls
                            bayValues.push({
                                actualSize: eachValue,
                                partitionLeftStatus:    isCarport ? WALL_STATUS_NO_WALL : WALL_STATUS_HAS_WALL,
                                partitionTopStatus:     isCarport ? WALL_STATUS_NO_WALL :WALL_STATUS_HAS_WALL,
                                partitionBottomStatus:  isCarport ? WALL_STATUS_NO_WALL :WALL_STATUS_HAS_WALL,
                                partitionRightStatus:   WALL_STATUS_NO_WALL,
                                partitionLeftIsGaraportFlashing:    false,
                                partitionLeftSheetingDirection:     SHEETING_DIRECTION_IDS.FROM_TOP_WALL
                            });
                        } else {
                            //middle bays
                            bayValues.push({
                                actualSize: eachValue,
                                partitionLeftStatus:    WALL_STATUS_NOTHING,
                                partitionTopStatus:     isCarport ? WALL_STATUS_NO_WALL :WALL_STATUS_HAS_WALL,
                                partitionBottomStatus:  isCarport ? WALL_STATUS_NO_WALL :WALL_STATUS_HAS_WALL,
                                partitionRightStatus:   WALL_STATUS_NO_WALL
                            });
                        }
                }
                bayValues.push({
                    actualSize: buildingDetail.buildingLength - (eachValue * (buildingDetail.numberOfBays - 1)),
                    partitionLeftStatus: (buildingDetail.numberOfBays === 1) ? (isCarport? WALL_STATUS_NO_WALL : WALL_STATUS_HAS_WALL) : WALL_STATUS_NOTHING,
                    partitionTopStatus:     isCarport ? WALL_STATUS_NO_WALL :WALL_STATUS_HAS_WALL,
                    partitionBottomStatus:  isCarport ? WALL_STATUS_NO_WALL :WALL_STATUS_HAS_WALL,
                    partitionRightStatus:   isCarport ? WALL_STATUS_NO_WALL :WALL_STATUS_HAS_WALL,
                    partitionRightIsGaraportFlashing:   false,
                    partitionRightSheetingDirection:    SHEETING_DIRECTION_IDS.FROM_BOTTOM_WALL
                });
                buildingDetail.bays = bayValues;
            }
        }

        if (buildingDetail.bays){
            //-- Init finished floor levels for bays
            const {leftWallBayIndex, leftWallIndex, rightWallBayIndex} = {};
            for (let bayIndex = 0; bayIndex < buildingDetail.bays.length; bayIndex++){
                let bay = buildingDetail.bays[bayIndex];
                if (bay){
                    if (buildingDetail.selectedBayIndex === undefined){
                        buildingDetail.selectedBayIndex = bayIndex;
                    }
                    
                    if (bay.finishedFloorLevel === undefined || bay.finishedFloorLevel === null){
                        let FFL;
                        if (leftWallIndex === WALL_LEFT_INDEX){
                            FFL = (bayIndex <= rightWallBayIndex) ? 0 : defaultBuildingValues.FFL;
                        } else {
                            FFL = (bayIndex > leftWallBayIndex && bayIndex <= rightWallBayIndex) ? 0 : defaultBuildingValues.FFL;
                        }
                        buildingDetail.bays[bayIndex].finishedFloorLevel = FFL;
                    }

                    if (bay.leftAnnexeFinishedFloorLevel === undefined || bay.leftAnnexeFinishedFloorLevel === null){
                        buildingDetail.bays[bayIndex].leftAnnexeFinishedFloorLevel = defaultBuildingValues.leftAwningFFL;
                    }

                    if (bay.rightAnnexeFinishedFloorLevel === undefined || bay.rightAnnexeFinishedFloorLevel === null){
                        buildingDetail.bays[bayIndex].rightAnnexeFinishedFloorLevel = defaultBuildingValues.rightAwningFFL;
                    }

                    if (bay.partitionLeftStatus === WALL_STATUS_HAS_WALL && !bay.partitionLeftSheetingDirection) {
                        bay.partitionLeftSheetingDirection = SHEETING_DIRECTION_IDS.FROM_TOP_WALL;
                    } else if (bay.partitionLeftStatus !== WALL_STATUS_HAS_WALL) {
                        bay.partitionLeftSheetingDirection = 0;
                    }

                    if (bay.partitionRightStatus === WALL_STATUS_HAS_WALL
                        && !bay.partitionRightSheetingDirection
                        && bayIndex < rightWallBayIndex
                    ) {
                        bay.partitionRightSheetingDirection = SHEETING_DIRECTION_IDS.FROM_TOP_WALL;
                    } else if (bay.partitionRightStatus === WALL_STATUS_HAS_WALL
                        && !bay.partitionRightSheetingDirection
                        && bayIndex >= rightWallBayIndex
                    ) {
                        bay.partitionRightSheetingDirection = SHEETING_DIRECTION_IDS.FROM_BOTTOM_WALL;
                    } else if (bay.partitionRightStatus !== WALL_STATUS_HAS_WALL) {
                        bay.partitionRightSheetingDirection = 0;
                    }
                }
            }
        }

        if(!buildingDetail.regionWind){
            buildingDetail.regionWind = defaultBuildingValues.regionWind;
        }

        if (buildingDetail.regionInternalPressure === undefined || buildingDetail.regionInternalPressure === null){
            if (currentProduct.categoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS || currentProduct.categoryId === PRODUCT_CATEGORY_GABLE_CARPORTS)
            {
                buildingDetail.regionInternalPressure = 0;
            }
            else
                buildingDetail.regionInternalPressure = defaultBuildingValues.regionInternalPressure;
        }
        if(!buildingDetail.regionTerrainCategory){
            buildingDetail.regionTerrainCategory = defaultBuildingValues.regionTerrainCategory;
        }
        if(!buildingDetail.regionTopography){
            buildingDetail.regionTopography = defaultBuildingValues.regionTopography;
        }
        if(!buildingDetail.regionHillSlope){
            buildingDetail.regionHillSlope = defaultBuildingValues.regionHillSlope;
        }
        if(!buildingDetail.regionHillHeight){
            buildingDetail.regionHillHeight = defaultBuildingValues.regionHillHeight;
        }
        if(!buildingDetail.bdHoldDown){
            buildingDetail.bdHoldDown = defaultBuildingValues.bdHoldDown;
        }

        if (!buildingDetail.footingsFullSlab1){
            buildingDetail.footingsFullSlab1 = defaultBuildingValues.footingsFullSlab1;
        }
        if (!buildingDetail.footingsFullSlab2){
            buildingDetail.footingsFullSlab2 = defaultBuildingValues.footingsFullSlab2;
        }
        if (!buildingDetail.footingsFullSlab3){
            buildingDetail.footingsFullSlab3 = defaultBuildingValues.footingsFullSlab3;
        }

        if (buildingDetail.footingsPiers === undefined){
            buildingDetail.footingsPiers = defaultBuildingValues.footingsPiers;
        }

        if (buildingDetail.bays) {
            const isPierOnly = defaultBuildingValues.footingsPiers === FOOTING_TYPES.PIER_ONLY;
            if (buildingDetail.bays && buildingDetail.bays.length) {
                for (let bayIndex = 0; bayIndex < buildingDetail.bays.length; bayIndex++) {
                    let bay = buildingDetail.bays[bayIndex];
                    if (bay.isFullSlab === undefined) {
                        bay.isFullSlab = !isPierOnly;
                    }

                    if (bay.isLeftAnnexeFullSlab === undefined) {
                        bay.isLeftAnnexeFullSlab = !isPierOnly;
                    }

                    if (bay.isRightAnnexeFullSlab === undefined) {
                        bay.isRightAnnexeFullSlab = !isPierOnly;
                    }
                }
            }
        }
        if (!buildingDetail.footingsSoilType){
            buildingDetail.footingsSoilType = defaultBuildingValues.footingsSoilType;
        }

        //-- Building Colour
        buildingDetail.isSingleWall = defaultBuildingValues.isSingleWall;
        buildingDetail.isSingleWallDisabled = defaultBuildingValues.isSingleWallDisabled;
        buildingDetail.selectedWall = defaultBuildingValues.selectedWall;
        buildingDetail.isSingleRoof = defaultBuildingValues.isSingleRoof;
        buildingDetail.isSingleRoofDisabled = defaultBuildingValues.isSingleRoofDisabled;
        buildingDetail.selectedRoof = defaultBuildingValues.selectedRoof;
        if (buildingDetail.flashingIsRollerDoor === undefined || buildingDetail.flashingIsRollerDoor === null){
            buildingDetail.flashingIsRollerDoor = defaultBuildingValues.flashingIsRollerDoor;
            buildingDetail.flashingRollerDoorColor = defaultBuildingValues.flashingRollerDoorColor;
        }
            
        if (buildingDetail.flashingIsBarge === undefined || buildingDetail.flashingIsBarge === null){
            buildingDetail.flashingIsBarge = defaultBuildingValues.flashingIsBarge;
            buildingDetail.flashingBargeColor = defaultBuildingValues.flashingBargeColor;
        }
            
        if (buildingDetail.flashingIsCorner === undefined || buildingDetail.flashingIsCorner === null){
            buildingDetail.flashingIsCorner = defaultBuildingValues.flashingIsCorner;
            buildingDetail.flashingCornerColor = defaultBuildingValues.flashingCornerColor;
        }

        if(!buildingDetail.verminColor){
            buildingDetail.verminColor = defaultBuildingValues.verminColor;
        }
        if(!buildingDetail.ventilationColor){
            buildingDetail.ventilationColor = defaultBuildingValues.ventilationColor;
        }

        if ((buildingDetail.rwIsGutters === undefined || buildingDetail.rwIsGutters === null)
            && clientDetail && defaultBuildingValues.gutter && defaultBuildingValues.gutter[clientDetail.addressState]
        ){
            let defaultGutter = defaultBuildingValues.gutter[clientDetail.addressState];
            if (defaultGutter){
                buildingDetail.rwIsGutters = defaultGutter.rwIsGutters;
                buildingDetail.rwGutterId = defaultGutter.rwGutterId;
                buildingDetail.rwGuttersColor = defaultGutter.rwGuttersColor;
            }
        }

        if ((buildingDetail.rwIsDownpipes === undefined || buildingDetail.rwIsDownpipes === null)
            && clientDetail && defaultBuildingValues.downpipe && defaultBuildingValues.downpipe[clientDetail.addressState]
        ){
            let defaultDownpipe = defaultBuildingValues.downpipe[clientDetail.addressState];
            if (defaultDownpipe){
                buildingDetail.rwIsDownpipes = defaultDownpipe.rwIsDownpipes;
                buildingDetail.rwDownpipeId = defaultDownpipe.rwDownpipeId;
                buildingDetail.rwDownpipesColor = defaultDownpipe.rwDownpipesColor;
                buildingDetail.rwQty = defaultDownpipe.rwQty;
            }
        }
        
        if(buildingDetail.wallColouredTeks === undefined || buildingDetail.wallColouredTeks === null){
            buildingDetail.wallColouredTeks = defaultBuildingValues.wallColouredTeks;
        }
        if(buildingDetail.roofColouredTeks === undefined || buildingDetail.roofColouredTeks === null){
            buildingDetail.roofColouredTeks = defaultBuildingValues.roofColouredTeks;
        }

        //-- Building annexes and mezzanine floor
        if (!isEmpty(buildingDetail.annexeLeft) && buildingDetail.isAnnexeLeft)
            buildingDetail.isAnnexeLeft = 1;
        if (!isEmpty(buildingDetail.annexeRight) && buildingDetail.isAnnexeRight)
            buildingDetail.isAnnexeRight = 1;
        if (!isEmpty(buildingDetail.mezzanineFloor) && buildingDetail.isMezzanineFloor)
            buildingDetail.isMezzanineFloor = 1;

        //-- TODO: Site address, we might need to change if site address is associated with quote
        if (!isEmpty(clientDetail)){
            buildingDetail.siteAddress = {
                clientId: clientDetail.id,
                addressNumber: clientDetail.addressNumber,
                addressStreet: clientDetail.addressStreet,
                addressCity: clientDetail.addressCity,
                addressState: clientDetail.addressState,
                addressPostcode: clientDetail.addressPostcode,
                siteLocatedFrom: clientDetail.siteLocatedFrom || 0,
                lat: clientDetail.lat || 0,
                lng: clientDetail.lng || 0
            };

            if (isEmpty(buildingDetail.altSiteAddress)){
                buildingDetail.altSiteAddress = {
                    ...buildingDetail.siteAddress
                };
            }
            

        }
        
        if (isEmpty(buildingDetail.mapShedLocation) && buildingDetail.siteAddress){
            buildingDetail.mapShedLocation = {
                lat: buildingDetail.siteAddress.lat,
                lng: buildingDetail.siteAddress.lng,
                bearing: 0
            };

        }

        //-- TODO: Initiate Other Accessories -> skylightGarageRoofs: convert data to JSON object
        if(isEmpty(buildingDetail.skylightGarageRoofs) || !Array.isArray(buildingDetail.skylightGarageRoofs)){
            buildingDetail.skylightGarageRoofs = this.initNewRoofItems(buildingDetail);
        }

        if (!(buildingDetail.verminLength))
            buildingDetail.verminLength = BD_OA_VERMIN_LENGTH_DEFAULT;

        //-- Merge building purpose with building class
        if (isEmpty(buildingDetail.engineerClass))
            buildingDetail.engineerClass = defaultBuildingValues.engineerClass;
        if (!isEmpty(buildingDetail.engineerClass)) {
            buildingDetail.engineerBuildingPurpose = buildingDetail.engineerClass;
            const engineerClass = PREDEFINED_ENGINEERING_CLASSES.find(item => item.id === buildingDetail.engineerClass);
            if (!isEmpty(engineerClass))
                buildingDetail.regionImportanceLevel = engineerClass.importantLevel;
        }

        if (!buildingDetail.bdBridging)
            buildingDetail.bdBridging = defaultBuildingValues.bdBridging;

        if (isEmpty(buildingDetail.walls) || (buildingDetail.walls.length > 0 && isEmpty(buildingDetail.walls[0]))){
            buildingDetail.walls = defaultBuildingValues.walls;
        }

        if (isEmpty(buildingDetail.roofs) || (buildingDetail.roofs.length > 0 && isEmpty(buildingDetail.roofs[0]))){
            buildingDetail.roofs = defaultBuildingValues.roofs;
        }

        if (!buildingDetail.ventilationQty)
            buildingDetail.ventilationQty = defaultBuildingValues.ventilationQty;
        if (!buildingDetail.verminQty)
            buildingDetail.verminQty = defaultBuildingValues.verminQty;

        //-- Dealer margin
        if (buildingDetail.dealerKitMargin === undefined || buildingDetail.dealerKitMargin === null){
            const dealer = this.props.dealerInfo;
            if (dealer && dealer.retailMargin)
                buildingDetail.dealerKitMargin = dealer.retailMargin;
            else
                buildingDetail.dealerKitMargin = 0;
        }

        //-- Initiate the redux-form
        this.props.initialize(buildingDetail);
    };

    initNewRoofSkylightItems = (newValues) => {
        var {changeFieldValue, buildingDetail} = this.props;
        var newBuildingDetail = {...buildingDetail, ...newValues};
        var result =  this.initNewRoofItems(newBuildingDetail);
        changeFieldValue("skylightGarageRoofs", result);
        //console.log("initNewRoofSkylightItems", result);
        //console.log("initNewRoofSkylightItems - newBuilding", newBuildingDetail);
    };



    /*
    * roof structure
    * [
    *     // item 0, annexe left
    *     // includes bays
    *     [ {startBay:0, items:[ // bay 0 and list of roof items from the beginning of this bay index
    *           [{w:720, s:(false-roof, true-skylight)}, .....]
    *       ]}, {},
    *      ...]
    *      //end annexe left
    *      ,
    *      [// main building, left side]
    *      ,
    *      [// main building, right side]
    *      ,
    *      [// right annexe]
    * ]
    * */
    initNewRoofItems = (buildingDetail) => {
        const hasLeftAnnexe = buildingDetail.isAnnexeLeft && buildingDetail.annexeLeft
            && buildingDetail.annexeLeft.height > 0 && buildingDetail.annexeLeft.span > 0;
        const hasRightAnnexe = buildingDetail.isAnnexeRight && buildingDetail.annexeRight
            && buildingDetail.annexeRight.height > 0 && buildingDetail.annexeRight.span > 0;
        var bays = buildingDetail.bays;
        var newSkylight = [];
        const skylightWidth = SKYLIGHT_WIDTH;
        var partLength=0;
        var startBayIndex = 0;
        var bay;
        var leftSkylightItem = [];
        // left annex row
        if(bays) {
            if (hasLeftAnnexe) {
                for (var bayIndex = 0; bayIndex < bays.length; bayIndex++) {
                    bay = bays[bayIndex];
                    if (bay && bay.hasLeftAnnexe) {
                        if (partLength === 0) {
                            startBayIndex = bayIndex;
                        }
                        partLength = partLength + bay.actualSize;
                        if (bayIndex < bays.length - 1 && bays[bayIndex + 1] && !bays[bayIndex + 1].hasLeftAnnexe) {
                            // the next bay doesn't have annexe, start adding the roof in this part
                            leftSkylightItem.push({
                                startBay: startBayIndex,
                                items: this.calculateItemsInAPart(partLength, skylightWidth)
                            });
                            partLength = 0;
                            continue;
                        } else if (bayIndex === bays.length - 1) {
                            leftSkylightItem.push({
                                startBay: startBayIndex,
                                items: this.calculateItemsInAPart(partLength, skylightWidth)
                            });
                            break;
                        }
                    }
                }
            }
            newSkylight.push(leftSkylightItem);

            //main
            //left part
            newSkylight.push([{
                startBay: 0,
                items: this.calculateItemsInAPart(buildingDetail.buildingLength, skylightWidth)
            }]);
            //right part
            newSkylight.push([{
                startBay: 0,
                items: this.calculateItemsInAPart(buildingDetail.buildingLength, skylightWidth)
            }]);

            //right annexe row
            var rightSkylightItem = [];
            partLength = 0;
            startBayIndex = 0;
            if (hasRightAnnexe) {
                for (var bayIndex = 0; bayIndex < bays.length; bayIndex++) {
                    bay = bays[bayIndex];
                    if (bay && bay.hasRightAnnexe) {
                        if (partLength === 0) {
                            startBayIndex = bayIndex;
                        }
                        partLength = partLength + bay.actualSize;
                        if (bayIndex < bays.length - 1 && bays[bayIndex + 1] && !bays[bayIndex + 1].hasRightAnnexe) {
                            // the next bay doesn't have annexe, start adding the roof in this part
                            rightSkylightItem.push({
                                startBay: startBayIndex,
                                items: this.calculateItemsInAPart(partLength, skylightWidth)
                            });
                            partLength = 0;
                            continue;
                        } else if (bayIndex === bays.length - 1) {
                            rightSkylightItem.push({
                                startBay: startBayIndex,
                                items: this.calculateItemsInAPart(partLength, skylightWidth)
                            });
                            break;
                        }
                    }
                }
            }
            newSkylight.push(rightSkylightItem);
        }
        return newSkylight;
    };

    calculateItemsInAPart = (partLength, itemWidth) => {
        var items= [];
        var startX = 0;
        var width = itemWidth;
        while (startX < partLength){
            if(startX + itemWidth > partLength){
                width = partLength - startX;
            }
            items.push({w:width, s:false}); // default value is no skylight
            startX = startX + width;
        }
        return items;
    };

    /**
     * Handle go to tabs in Quote Detail.
     *  - Currently, we will submit current form when navigating
     *
     * @param idx
     * @param currentTabIndex
     */
    handleGoTab = (idx) => {
        this.props.QD_changeTabAction({tabIndex: idx});
    };


    /**
     * Handle the Download full Quote clicking event
     *
     * @param e
     */
    handleDownloadClick = (e) => {
        if (this.props.selectedTab !== 4) {
            //-- If the drawing mode is not enabled yet, try to enable it first
            this.handleGoTab(4);
        }
        this.props.DOC_loadADocument({
            type: DOCS_TYPE_QUOTE_PAGE,
            subKey: this.props.quoteId,
            pageId: DOCS_TYPE_QUOTE_PAGE
        });
        this.props.QD_changeAWaitingTask({type: "+", taskId: "QDL"});
    };

    handleSENTClick = (e) => {
        let drawingModeTabIndex = 4;
        if (this.props.product){
            const currentProduct = PRODUCT_TYPES.find(item => item.id === parseInt(this.props.product.id));
            if (currentProduct) {
                let productCategoryId = currentProduct.categoryId;
                if (productCategoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS)
                    drawingModeTabIndex = 3;
            }
        }

        if (this.props.selectedTab !== drawingModeTabIndex) {
            //-- If the drawing mode is not enabled yet, try to enable it first
            this.handleGoTab(drawingModeTabIndex);
        }
        this.props.DOC_loadADocument({
            type: DOCS_TYPE_QUOTE_PAGE,
            subKey: this.props.quoteId,
            pageId: DOCS_TYPE_QUOTE_PAGE
        });
        this.props.QD_changeAWaitingTask({type: "+", taskId: "QS"});
    };

    /**
     * Submit download data to the server to generate ZIP export package
     */
    doSubmitDownloadData = (type = 'z') =>  {
        return;
    }

    render() {
        const isPurlinAndGirtSelected = !isEmpty(this.props.purlinAndGirtType);
        let productCategoryId = 0;
        if (this.props.product){
            const currentProduct = PRODUCT_TYPES.find(item => item.id === parseInt(this.props.product.id));
            if (currentProduct)
                productCategoryId = currentProduct.categoryId;
        }

        const query = new URLSearchParams(this.props.history.location.search);
        let isAdminMode = +query.get('adminMode');
        if (isAdminMode) {
            if (!auth.checkIsAdmin(auth.getUserFromStorage()))
                isAdminMode = 0;
        }

        return (
            <React.Fragment>
                <QuoteAddComponent {...this.props} productCategoryId={productCategoryId}
                                   isPurlinAndGirtSelected={isPurlinAndGirtSelected}
                                   initNewRoofSkylightItems={this.initNewRoofSkylightItems}
                                   handleGoTab={this.handleGoTab}
                                   setStageRef={this.setStageRef}
                                   handleDownloadClick={this.handleDownloadClick}
                                   handleSENTClick={this.handleSENTClick}
                                   isAdminMode={isAdminMode}
                />
                <Prompt
                    when={this.props.dirty}
                    message={`WARNING: There is unsaved data in the current Form. \r\nAre you sure you want to leave?`}
                />
            </React.Fragment>
        );
    }
}


/**
 * Validate the form's constraints
 *
 * @param values
 * @param product
 */
const validate = (values, {product}) => {
    const purlinAndGirt = getPurlinAndGirtFromID(values.purlinAndGirtType, product && product.id);
    const minSpan = (purlinAndGirt && purlinAndGirt.spanMin) || 0;
    const maxSpan = (purlinAndGirt && purlinAndGirt.spanMax) || 0;
    const minLength = (product && product.params && product.params.min_length) || 0;
    const maxLength = (product && product.params && product.params.max_length) || 0;
    const minHeight = (purlinAndGirt && purlinAndGirt.heightMin) || 0;
    const maxHeight = (purlinAndGirt && purlinAndGirt.heightMax) || 0;
    const minBaySpace = (purlinAndGirt && purlinAndGirt.bayMin) || 0;
    const maxBaySpace = (purlinAndGirt && purlinAndGirt.bayMax) || 0;
    const maxBays = Math.floor(values.buildingLength / minBaySpace);
    const minBays = Math.ceil(values.buildingLength / maxBaySpace);
    const garaportFFL = PREDEFINED_FFL_RANGES.find(range => range.id === 'Garaport');
    const minGaraportFFL = (garaportFFL && garaportFFL.min) || 0;
    const maxGaraportFFL = (garaportFFL && garaportFFL.max) || 0;
    const awningFFL = PREDEFINED_FFL_RANGES.find(range => range.id === 'Awning');
    const minAwningFFL = (awningFFL && awningFFL.min) || 0;
    const maxAwningFFL = (awningFFL && awningFFL.max) || 0;
    const productId = product ? Number(product.id) : 0;
    const currentProduct = PRODUCT_TYPES.find(item => item.id === parseInt(productId));
    const isSkillionRoof = (currentProduct && (currentProduct.categoryId === PRODUCT_CATEGORY_SKILLION_CARPORTS
        || currentProduct.categoryId === PRODUCT_CATEGORY_SKILLION_SHEDS));
    const errors = {};

    // errors.rollFormSupply = validateRequired(values.rollFormSupply) ||
    //     (values.rollFormSupply === `Lysaght` ? null : `Still under development`);

    // errors.rainfallIntensity = validateRequired(values.rainfallIntensity);

    errors.buildingSpan = validateRequired(values.buildingSpan) || validateBetweenValue(minSpan, maxSpan)(values.buildingSpan);
    errors.buildingLength = validateRequired(values.buildingLength) || validateBetweenValue(minLength, maxLength)(values.buildingLength);
    errors.buildingHeight = validateRequired(values.buildingHeight) || validateBetweenValue(minHeight, maxHeight)(values.buildingHeight);

    if (!errors.buildingLength)
        errors.numberOfBays = validateRequired(values.numberOfBays) || validateBetweenValue(minBays, maxBays)(values.numberOfBays);

    if (!isEmpty(values.bays) && values.bays.length) {
        const baysArrayErrors = [];
        values.bays.forEach((bay, bayIndex) => {
            const bayErrors = {};
            if (!bay.isLocked){
                const value = Number(bay.actualSize);
                bayErrors.actualSize = validateRequired(value)
                    || validateMaxValue(values.buildingLength)(value)
                    || validateBetweenValue(minBaySpace, maxBaySpace)(value);
            }

            const FFL = Number(bay.finishedFloorLevel);
            bayErrors.finishedFloorLevel = validateRequired(bay.finishedFloorLevel || bay.finishedFloorLevel === 0) 
                || validateBetweenValue(minGaraportFFL, maxGaraportFFL)(FFL);
            
            const leftAwningFFL = Number(bay.leftAnnexeFinishedFloorLevel);
            bayErrors.leftAnnexeFinishedFloorLevel = validateRequired(bay.leftAnnexeFinishedFloorLevel || bay.leftAnnexeFinishedFloorLevel === 0) 
                || validateBetweenValue(minAwningFFL, maxAwningFFL)(leftAwningFFL);
            
            const rightAwningFFL = Number(bay.rightAnnexeFinishedFloorLevel);
            bayErrors.rightAnnexeFinishedFloorLevel = validateRequired(bay.rightAnnexeFinishedFloorLevel || bay.rightAnnexeFinishedFloorLevel === 0) 
                || validateBetweenValue(minAwningFFL, maxAwningFFL)(rightAwningFFL);

            if (bayErrors.actualSize || bayErrors.finishedFloorLevel || bayErrors.leftAnnexeFinishedFloorLevel || bayErrors.rightAnnexeFinishedFloorLevel)
                baysArrayErrors[bayIndex] = bayErrors;
        });
        if (baysArrayErrors.length) {
            errors.bays = baysArrayErrors;
        }
    }
    else
        errors.bays = 'Bays cannot be empty';

    //-- Building Colours
    if (values.rwQty || values.rwSideA || values.rwSideB) {
        // errors.rwQty = validateMinValue(+(values.rwSideA) + +(values.rwSideB))(+(values.rwQty));
        errors.rwSideA = validateMaxValue(+(values.rwQty) - +(values.rwSideB))(+(values.rwSideA));
        errors.rwSideB = validateMaxValue(+(values.rwQty) - +(values.rwSideA))(+(values.rwSideB));
    }

    //-- Building Annexe
    if (values.isAnnexeLeft) {
        if (values.annexeLeft && values.annexeLeft.height > 0){
            const annexeLeftHeight = Number(values.annexeLeft.height);
            const annexeLeftSpan = (values.annexeLeft.span && Number(values.annexeLeft.span)) || 0;
            const annexeSlope = (values.annexeSlope && Number(values.annexeSlope)) || 0;

            const annexeLeftRoofHeight = Math.abs((Math.tan((Math.PI * annexeSlope) / 180) * (annexeLeftSpan)));
            const maxLeftAnnexeHeight = Math.floor(values.buildingHeight - annexeLeftRoofHeight);
            const annexeLeftBH = 500;
            if (annexeLeftHeight < maxLeftAnnexeHeight && annexeLeftHeight > maxLeftAnnexeHeight - annexeLeftBH){
                errors.annexeLeft = {
                    height: `Must equal ${maxLeftAnnexeHeight} or be in 0 - ${maxLeftAnnexeHeight - annexeLeftBH}`,
                    span: validateRequired(values.annexeLeft.span)
                };
            } else {
                errors.annexeLeft = {
                    span: validateRequired(values.annexeLeft.span)
                };
            }
        } else if (values.annexeLeft){
            errors.annexeLeft = {
                height: validateRequired(values.annexeLeft.height),
                span: validateRequired(values.annexeLeft.span),
            };
        } else {
            errors.annexeLeft = {
                height: validateRequired(values.annexeLeft),
                span: validateRequired(values.annexeLeft),
            };
        }
    }
    if (values.isAnnexeRight) {
        if (values.annexeRight && values.annexeRight.height > 0){
            const annexeRightHeight = Number(values.annexeRight.height);
            const annexeRightSpan = (values.annexeRight.span && Number(values.annexeRight.span)) || 0;
            const annexeSlope = (values.annexeSlope && Number(values.annexeSlope)) || 0;
            const annexeRightRoofHeight = Math.abs((Math.tan((Math.PI * annexeSlope) / 180) * (annexeRightSpan)));
            let maxRightAnnexeHeight = Math.floor(values.buildingHeight - annexeRightRoofHeight);
            if (isSkillionRoof) {
                const buildingSlope = (values.buildingSlope && Number(values.buildingSlope)) || 10;
                const buildingSpan = (values.buildingSpan && Number(values.buildingSpan)) || 0;
                const roofRadian = (Math.PI * buildingSlope) / 180;
                const roofHeight = isSkillionRoof ? Math.abs((Math.tan(roofRadian) * buildingSpan)) :
                    Math.abs((Math.tan(roofRadian) * (buildingSpan / 2)));
                maxRightAnnexeHeight = Math.floor(values.buildingHeight + roofHeight - annexeRightRoofHeight);
            }
            const annexeRightBH = 500;
            if (annexeRightHeight < maxRightAnnexeHeight && annexeRightHeight > maxRightAnnexeHeight - annexeRightBH){
                errors.annexeRight = {
                    height: `Must equal ${maxRightAnnexeHeight} or be in 0 - ${maxRightAnnexeHeight - annexeRightBH}`,
                    span: validateRequired(values.annexeRight.span)
                };
            } else {
                errors.annexeRight = {
                    span: validateRequired(values.annexeRight.span)
                };
            }
        } else if (values.annexeRight){
            errors.annexeRight = {
                height: validateRequired(values.annexeRight.height),
                span: validateRequired(values.annexeRight.span),
            };
        } else {
            errors.annexeRight = {
                height: validateRequired(values.annexeRight),
                span: validateRequired(values.annexeRight),
            };
        }
    }
    if (values.mezzanineFloor)
        errors.mezzanineFloor   = {height: validateMaxValue(values.buildingHeight)(values.mezzanineFloor.height)};

    //-- Other Accessories
    errors.verminLength = validateBetweenValue(BD_OA_VERMIN_LENGTH_MIN, BD_OA_VERMIN_LENGTH_MAX)(values.verminLength);
    errors.verminQty        = /*validateRequired(values.verminQty)        ||*/ validateMinValue(0)(values.verminQty);
    errors.ventilationQty   = /*validateRequired(values.ventilationQty)   ||*/ validateMinValue(0)(values.ventilationQty);

    //-- Delivery and Summary
    if (values.deliveryDeliveredBy){
        const dateNow = moment(new Date());
        const delBy = moment(values.deliveryDeliveredBy, ["DD/MM/YYYY", "YYYY-MM-DD"]);
        const duration = moment.duration(delBy.diff(dateNow));
        const diffInDays = Math.ceil(duration.asDays());
        if (diffInDays < 28) {
            const earliestDate = dateNow.add(28, 'd').format('DD/MM/YYYY');
            errors.deliveryDeliveredBy = `Insufficient time request. <br />Earliest possible date ${earliestDate}`;
        }
    }

    errors.dealerKitMargin = validateBetweenValue(0, 100)(values.dealerKitMargin);

    return errors;
};

const formSelector = formValueSelector(QUOTES_BUILDING_DETAIL_FORM_NAME);
const mapStateToProps = (state) => ({
    product:        getQDSelectedProductInfo(state),
    quoteId:        getQDQuoteId(state),
    quoteUserId:    getQDQuoteUserId(state),
    quoteStatus:    getQDQuoteStatus(state),
    buildingDetail: getQDBuildingDetail(state),
    clientDetail:   getQDClientDetail(state),
    userDetail:     getQDUserDetail(state),
    isRollFormSelected: !isEmpty(formSelector(state, "rollFormSupply")),
    purlinAndGirtType:    formSelector(state, "purlinAndGirtType"),
    selectedTab:    getQDSelectedTab(state),
    isDrawingModeMounted:   getQDDMIsMounted(state),
    waitingTasks:           getQDWaitingTasks(state),
    quoteDetails:   getFormValues(QUOTES_BUILDING_DETAIL_FORM_NAME)(state),
    jobNumber:      getQDJobNumber(state),
    dealerInfo:     getDealerInfo(state),
    userInfo:       getUserProfile(state),
});

const mapDispatchToProps = (dispatch) => (
    {
        changeFieldValue: function (field, value) {
            dispatch(change(QUOTES_BUILDING_DETAIL_FORM_NAME, field, value))
        },
        loadQuoteInfo:          payload => dispatch(loadQuoteInfo(payload)),
        QD_changeTabAction:     payload => dispatch(QD_changeTabAction(payload)),
        QD_changeAWaitingTask:  payload => dispatch(QD_changeAWaitingTask(payload)),
        DOC_requestZipContent:  payload => dispatch(DOC_requestZipContent(payload)),
        QD_sendOrder:           payload => dispatch(QD_sendOrder(payload)),
        DOC_loadADocument:      payload => dispatch(DOC_loadADocument(payload))
    }
);

const onSubmitSuccess = (result, dispatch, props) => {
    dispatch(
        initialize(
            QUOTES_BUILDING_DETAIL_FORM_NAME,
            props.quoteDetails,
            true,
            {keepSubmitSucceeded: true}
        )
    );
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: QUOTES_BUILDING_DETAIL_FORM_NAME,
            onSubmit: onSubmitActions(QUOTES_BUILDING_DETAIL_FORM_NAME),
            onSubmitSuccess: onSubmitSuccess,
            enableReinitialize: true,
            keepDirtyOnReinitialize: true,
            updateUnregisteredFields: true,
            validate,
            forwardRef: true
        })(QuoteEdit)
    )
);