import {createSelector} from 'reselect';
import {utils} from "../../services";
import isEmpty from "lodash/isEmpty";
import {formValueSelector, getFormValues} from "redux-form";

import FrameSelection from './containers/QuoteDetail/TutorialSelection/FrameSelection';
import BaseTutorialSelection from './containers/QuoteDetail/TutorialSelection/BaseTutorialSelection';
import AwningFrameSelection from './containers/QuoteDetail/TutorialSelection/AwningFrameSelection';

import {MODULE_ID, SCHEMA_QUOTES, QUOTES_DOOR_TYPE_IDS, QUOTES_BUILDING_DETAIL_FORM_NAME, ANNEXE_LEFT_ID, ROLLER_DOOR_PORTAL_FRAME_IDS, ANNEXE_RIGHT_ID} from "./constants";
import {DEFAULT_BUILDING_VALUES, PRODUCT_TYPES, PRODUCT_CATEGORIES, PRODUCT_CATEGORIES_ORDERS} from "../../constants";
import {QUOTES_DM_DOOR_ADD_FORM_NAME, QUOTES_DOOR_KITS, QUOTES_DOOR_TYPES_SUB_OPTIONS} from "../../modules/quotes/constants";

const getQuotesListFunc = (state) => {
    const currentSelectedState = state[MODULE_ID].quoteList.quotes;
    return utils.getItemListInStateTree(currentSelectedState, SCHEMA_QUOTES);
};

export const getQuotesList = createSelector(
    getQuotesListFunc,
    (clients) => clients
);

const getProductListFunc = (state) => {
    const products = state[MODULE_ID].quoteDetail.productSelection.products;
    let sortedProducts = {};
    for (let i = 0; i < PRODUCT_CATEGORIES_ORDERS.length; i++) {
        let productItem = PRODUCT_CATEGORIES.find(cat => cat.id === PRODUCT_CATEGORIES_ORDERS[i]);
        if (productItem && products[productItem.label]) {
            sortedProducts[productItem.label] = products[productItem.label];
        }
    }
    return sortedProducts;
};

export const getProductList = createSelector(
    getProductListFunc,
    (products) => products
);

export const getCategoryList = (state) => state[MODULE_ID].quoteDetail.productSelection.categories;

export const getPaginationInfo = (state) => state[MODULE_ID].quoteList.pagination;

export const getFilterInfo = (state) => state[MODULE_ID].quoteList.filter;

export const getQDSelectedProductInfo = (state) => {
    const productId = state[MODULE_ID].quoteDetail.productSelection.productId;
    const products  = state[MODULE_ID].quoteDetail.productSelection.products;
    if (products && Array.isArray(products))
        return products.find(item => item.id === productId);
};

export const getQDAvailableProducts = (state) => {
    return state[MODULE_ID].quoteDetail.productSelection.products;
};

export const getQDCurrentProduct = (productId, products) => {
    if (products && Array.isArray(products))
        return products.find(item => item.id === productId);
    return {};
};


export const getQDBuildingDetail    = (state) => state[MODULE_ID].quoteDetail.buildingDetailInfo;
export const getQDBuildingDetailId  = (state) => state[MODULE_ID].quoteDetail.buildingDetailInfo.id;
export const getQDQuoteId           = (state) => state[MODULE_ID].quoteDetail.quoteInfo.id;
export const getQDQuoteUserId       = (state) => state[MODULE_ID].quoteDetail.quoteInfo.userId;
export const getQDQuoteStatus       = (state) => state[MODULE_ID].quoteDetail.quoteInfo.status;
export const getQDJobStatus         = (state) => state[MODULE_ID].quoteDetail.quoteInfo.jobStatus;
export const getQDAdditionalValue   = (state) => (state[MODULE_ID].quoteDetail.quoteInfo.additionalValue || 0);
export const getQDJobNumber         = (state) => (state[MODULE_ID].quoteDetail.quoteInfo.jobNumber || 0);
export const getQDSelectedTab       = (state) => state[MODULE_ID].quoteDetail.selectedTab;
export const getSavedValue          = (state, name) => state[MODULE_ID].quoteDetail.savedValue[name];
export const getQDBCWallColorOptions     = (state) => state[MODULE_ID].quoteDetail.buildingColour.wallColorOptions;
export const getQDBCRoofColorOptions     = (state) => state[MODULE_ID].quoteDetail.buildingColour.roofColorOptions;
export const getQDClientDetail      = (state) => state[MODULE_ID].quoteDetail.clientDetail;
export const getQDSiteAddressGeoLocation = (state) => state[MODULE_ID].quoteDetail.deliverySummary.geoLocation;
export const getQDAltSiteAddressGeoLocation = (state) => state[MODULE_ID].quoteDetail.deliverySummary.altGeoLocation;
export const getQDDMCurrentButtonId = (state) => state[MODULE_ID].quoteDetail.drawingMode.currentButtonId;
export const getQDDMCurrentModalId = (state) => +state[MODULE_ID].quoteDetail.drawingMode.currentModalId;
export const getQDADCurrentModalId = (state) => +state[MODULE_ID].quoteDetail.administration.currentModalId;
export const getQDBDLightBoxIndex   = (state) => +state[MODULE_ID].quoteDetail.buildingDetail.lightBoxIndex;
export const getQDDMSelectedBayWall = (state) => state[MODULE_ID].quoteDetail.drawingMode.selectedBayWall;
export const getQDDMActiveBayComponent   = (state) => state[MODULE_ID].quoteDetail.drawingMode.activeBayComponent;
export const getQDDSActiveModal     = (state) => state[MODULE_ID].quoteDetail.deliverySummary.activeModal;
export const getQDADActiveComponent = (state) => state[MODULE_ID].quoteDetail.administration.activeComponent;
export const getQDADNotes           = (state) => state[MODULE_ID].quoteDetail.administration.notes;
export const getQDADActiveNote      = (state) => state[MODULE_ID].quoteDetail.administration.activeNote;
export const getQDADDisplayedTextMessages  = (state) => state[MODULE_ID].quoteDetail.administration.displayedTextMessages;
export const getQDADTextMessagesPaginationInfo  = (state) => state[MODULE_ID].quoteDetail.administration.textMessagesPagination;
export const getQDADCheckedQuotes   = (state) => state[MODULE_ID].quoteDetail.administration.checkedQuotes;
export const getTextMessagePhoneClientResults  = (state) => state[MODULE_ID].quoteDetail.administration.textMessageClientResults;
export const getQDADNotesPaginationInfo  = (state) => state[MODULE_ID].quoteDetail.administration.notesPagination;
export const getQDADLastTextMessage  = (state) => state[MODULE_ID].quoteDetail.administration.lastTextMessage;
export const getQDDSCertFiles       = (state) => state[MODULE_ID].quoteDetail.deliverySummary.certFiles;
export const getQDBDSelectedFrameSizeImage = (state) => state[MODULE_ID].quoteDetail.buildingDetail.selectedFrameSizeImage;
export const getQDOASkylightColors  = (state) => state[MODULE_ID].quoteDetail.otherAccessories.skylightColors;
export const getQDDMIsMounted       = (state) => state[MODULE_ID].quoteDetail.drawingMode.isMounted;
export const getQDWaitingTasks      = (state) => state[MODULE_ID].quoteDetail.waitingTasks;
export const getQDSendingOrders     = (state) => state[MODULE_ID].quoteDetail.sendingOrders;
export const getQDUserDetail      = (state) => state[MODULE_ID].quoteDetail.userDetail;
export const getQDBDSelectedGrid = (state) => state[MODULE_ID].quoteDetail.buildingDetail.selectedGrid;
export const getQDBDSelectedColumnGrid = (state) => state[MODULE_ID].quoteDetail.buildingDetail.selectedColumnGrid;
export const getQDProductId         = (state) =>  Number(state[MODULE_ID].quoteDetail.productSelection.productId);
export const getQDProductCategoryId = (state) => {
    return Number(state[MODULE_ID].quoteDetail.quoteInfo.categoryId);
    // if (state[MODULE_ID].quoteDetail.productSelection.categoryId)
    //     return state[MODULE_ID].quoteDetail.productSelection.categoryId;
    // else
    //     return state[MODULE_ID].quoteDetail.quoteInfo.categoryId;
};

export const getQDQuoteDealerId = (state) => {
    if (state[MODULE_ID].quoteDetail.quoteInfo.userDetail && state[MODULE_ID].quoteDetail.quoteInfo.userDetail.dealer) {
        return state[MODULE_ID].quoteDetail.quoteInfo.userDetail.dealer.id;
    }

    return 0;
};

export const getCopiedNewQuoteId = (state) => state[MODULE_ID].quoteList.newQuoteId;

export const getQDADNoteInfo = (state) => state[MODULE_ID].note;
export const getQDADSendSMSMessageInfo = (state) => state[MODULE_ID].is_send_success;
export const getQDADClientInfo = (state) => state[MODULE_ID].quoteDetail.clientDetail;

//-- Common functions
export const getPurlinAndGirtFromID = (id, productId = 1) => {
    const purlinGirtId = isEmpty(id) ? DEFAULT_BUILDING_VALUES.purlinAndGirtType : id;
    if (productId && productId > 0) {
        const product = PRODUCT_TYPES.find(item => item.id === productId);
        return (isEmpty(product)) ? null : product.purlinAndGirts.find(item => item.id === purlinGirtId);
    }
    else {
        const product = PRODUCT_TYPES.find(product => product.purlinAndGirts.some(item => item.id === purlinGirtId));
        return (isEmpty(product)) ? null : product.purlinAndGirts.find(item => item.id === purlinGirtId);
    }
};

export const getPurlinAndGirtFromIDAndCategory = (id, categoryId = 1) => {
    const purlinGirtId = isEmpty(id) ? DEFAULT_BUILDING_VALUES.purlinAndGirtType : id;
    if (categoryId > 0) {
        const products = PRODUCT_TYPES.filter(item => item.categoryId === categoryId);
        const product = products.find(prod => prod.purlinAndGirts.some(item => item.id === purlinGirtId));
        if (product)
            return product.purlinAndGirts.find(item => item.id === purlinGirtId);
    }
    return null;
};

/**
 * Get Purlin and Girt from ID inside a product category
 * @param {*} id 
 * @param {*} productCategoryId 
 */
export const getPurlinAndGirtInCategory = (id, productCategoryId = 1) => {
    const purlinGirtId = isEmpty(id) ? DEFAULT_BUILDING_VALUES.purlinAndGirtType : id;
    const productsInCate = PRODUCT_TYPES.filter(prod => prod.categoryId === productCategoryId);
    let product = null;
    if (productsInCate)
        product = productsInCate.find(product => product.purlinAndGirts.some(item => item.id === purlinGirtId));
    
    return (isEmpty(product)) ? null : product.purlinAndGirts.find(item => item.id === purlinGirtId);
};

export const getProductFromPurlinAndGirtInCategory = (id, productCategoryId = 1) => {
    const purlinGirtId = isEmpty(id) ? DEFAULT_BUILDING_VALUES.purlinAndGirtType : id;
    const productsInCate = PRODUCT_TYPES.filter(prod => prod.categoryId === productCategoryId);
    let product = null;
    if (productsInCate)
        product = productsInCate.find(product => product.purlinAndGirts.some(item => item.id === purlinGirtId));
    
    return product;
};

export const getBuildingSlopesListFromProduct = (productId = 1) => {
    const product = PRODUCT_TYPES.find(item => item.id === productId);
    if (product)
        return product.buildingSlopes;
    else
        return [];
};

export const getKneeBraceAndCollarTieOptionsFromProduct = (productId = 1) => {
    const product = PRODUCT_TYPES.find(item => item.id === productId);
    if (product)
        return product.kneeBraceAndCollarTieOptions;
    else
        return [];
};

export const getRollerFrameType = (state, frameSelection) => {
    const selectedBayWall = getQDDMSelectedBayWall(state);
    const formSelector = formValueSelector(QUOTES_DM_DOOR_ADD_FORM_NAME);
    const typeId = Number(formSelector(state, "bayDoorDoorType"));
    if (selectedBayWall && typeId === QUOTES_DOOR_TYPE_IDS.ROLLER_DOOR) {
        const portalFrameId = Number(formSelector(state, "portalFrame"));
        const annexeIndex = selectedBayWall.annexeIndex
        let portalColumnMember = "";
        let portalColumnWidth = 0;
        if (portalFrameId && frameSelection &&
            (!annexeIndex || (annexeIndex === ANNEXE_LEFT_ID && portalFrameId === ROLLER_DOOR_PORTAL_FRAME_IDS.BOTTOM_COLUMN)
            || (annexeIndex === ANNEXE_RIGHT_ID && portalFrameId === ROLLER_DOOR_PORTAL_FRAME_IDS.TOP_COLUMN))
        ) {
            //If roller door is attached portal frame, we apply two rules:
            //--Rule1: Portal column size will be the maximum size among end column size, mid column size and RD mullion size
            //--Rule2: Sizes of portal column and RD mullion must be match
            portalColumnMember = frameSelection.MidColumnMember;
        } else if (portalFrameId && frameSelection && annexeIndex && portalFrameId !== ROLLER_DOOR_PORTAL_FRAME_IDS.BOTH_COLUMNS) {
            const quoteDetails = getFormValues(QUOTES_BUILDING_DETAIL_FORM_NAME)(state);
            const awningFrameSelection = AwningFrameSelection.selectFrame(quoteDetails, frameSelection);
            if (awningFrameSelection) {
                portalColumnMember = annexeIndex === ANNEXE_LEFT_ID ?
                    awningFrameSelection.LeftAwningRafterMember : awningFrameSelection.RightAwningRafterMember;
            }
        } else if (portalFrameId && frameSelection && annexeIndex) {
            const quoteDetails = getFormValues(QUOTES_BUILDING_DETAIL_FORM_NAME)(state);
            const awningFrameSelection = AwningFrameSelection.selectFrame(quoteDetails, frameSelection);
            if (awningFrameSelection) {
                let awningColumnMember = annexeIndex === ANNEXE_LEFT_ID ?
                    awningFrameSelection.LeftAwningRafterMember : awningFrameSelection.RightAwningRafterMember;
                if (awningColumnMember.length > 4) {
                    let awningColumnWidth = parseInt(awningColumnMember.substring(1,4));
                    if (portalColumnMember.length > 4) {
                        portalColumnWidth = parseInt(portalColumnMember.substring(1,4));
                    }
                    if (awningColumnWidth > portalColumnWidth) {
                        portalColumnMember = awningColumnMember;
                    }
                }
            }
        }

        if (portalColumnMember.length > 4) {
            portalColumnWidth = parseInt(portalColumnMember.substring(1,4));
        }

        const kitId = Number(formSelector(state, "bayDoorKit"));
        const isSmallMullion = Number(formSelector(state, "isDoorSmallMullion"));
        const doorKit = (typeId && QUOTES_DOOR_KITS[typeId]) ? QUOTES_DOOR_KITS[typeId].find(kit => kit.id === kitId) : null;
        const doorKitName = (doorKit && doorKit.name) ? doorKit.name : "";

        //Wind Lock and Wind Strong Series
        if (doorKitName.includes("WL") || doorKitName.includes("WS")){
            if (portalFrameId > 0 && portalColumnWidth >= 250) {
                return portalColumnMember;
            } else {
                return (isSmallMullion || isSmallMullion === null || isSmallMullion === undefined) ? "C20024" : "C25024";
            }
        } 
        
        //Standard series
        let doorSubType = QUOTES_DOOR_TYPES_SUB_OPTIONS[typeId] && QUOTES_DOOR_TYPES_SUB_OPTIONS[typeId].find(
            stype => doorKitName.includes(stype.code) && !stype.series.toUpperCase().includes("WIND")
        );

        if (doorSubType) {
            if(doorSubType.name.toUpperCase().includes("A SERIES")){   //A Series and AA Series
                if (portalFrameId > 0 && portalColumnWidth >= 200) {
                    return portalColumnMember;
                } else {
                    return (isSmallMullion || isSmallMullion === null || isSmallMullion === undefined) ? "C15015" : "C20015";
                }
            } else {   //B Series
                if (portalFrameId > 0 && portalColumnWidth >= 250) {
                    return portalColumnMember;
                } else {
                    return (isSmallMullion || isSmallMullion === null || isSmallMullion === undefined) ? "C20024" : "C25024";
                }
            }
        }

        return "";
    }

    return "";
};

export const getSelectedFrame = (state) => {
    const quoteDetails = getFormValues(QUOTES_BUILDING_DETAIL_FORM_NAME)(state);
    if (quoteDetails) {
        return FrameSelection.selectFrame(quoteDetails);
        // return BaseTutorialSelection.selectTutorial(quoteDetails);
    }

    return null;
};

export const getQuotesRemotePDF = (state) => state[MODULE_ID].quoteList.remotePDF;