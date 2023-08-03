import {createSelector} from 'reselect';
import {MODULE_ID} from "./constants";
import {isEqual, isEmpty} from "lodash";

export const getDocCurrentModalId           = (state) => state[MODULE_ID].contractTerms.modalId;
export const getDocCurrentModalType         = (state) => state[MODULE_ID].contractTerms.modalType;
export const getActiveDocument              = (state) => state[MODULE_ID].contractTerms.activeDocument;
export const getRemotePDF                   = (state) => state[MODULE_ID].contractTerms.remotePDF;
export const getQPLogoFile                  = (state) => state[MODULE_ID].quotePage.logoFile;
export const getQPData                      = (state, pageId) => state[MODULE_ID].quotePage[`saved-${pageId}`];
export const getSelectedTab                 = (state) => state[MODULE_ID].quotePrinter.selectedTab;

export const getSumScopeOfWorks  = (allWorks) => {
    if (isEmpty(allWorks))
        return 0;
    let total = 0;
    allWorks.forEach(item => (item.price) ? total += parseFloat((item.price + '').replace(/[^0-9.-]+/g,"")) : total);
    return total;
};

export const modifyVariationPaymentTotalToTabs  = (variationPayments) => {
    var results = [];
    if(variationPayments){
        for (let index = 0; index < variationPayments.length; index++) {
            const element = variationPayments[index];
            const sum = getSumScopeOfWorks(variationPayments[index].variationItems);
            results.push({
                net: Math.round(sum * 0.9),
                gst: sum - Math.round(sum * 0.9),
                total: sum
            });
        }
    }
    return results;
};

export const getShortOfTradingName = (tradingName) => tradingName.replace(/[^A-Z]/g, '');
export const getNSSJobId = (tradingName, jobNumber) => {
    let nssJobId = '';
    if (tradingName) {
        nssJobId = getShortOfTradingName(tradingName);
    }
    nssJobId += 'L-' + jobNumber;
    return nssJobId;
};
export const getPDFNamePrefix = (tradingName, jobNumber, clientName) => {
    let nssJobId = getNSSJobId(tradingName, jobNumber);
    return (nssJobId.length > 0 ? nssJobId + ' - ' : '') + 
           (clientName.length > 0 ? clientName + ' - ': '');
}
export const getZIPNamePrefix = (tradingName, jobNumber, clientName) => {
    let nssJobId = getNSSJobId(tradingName, jobNumber);
    return (nssJobId.length > 0 ? nssJobId + ' - ' : '') + 
           (clientName.length > 0 ? clientName + ' - ': '');
}

export const getAccountingDetail                = (state) => state[MODULE_ID].docAccounting.accountingDetail;
export const getAccountingLogList               = (state) => state[MODULE_ID].docAccounting.accountingLogs;
export const getAccountingLogRemotePDF          = (state) => state[MODULE_ID].docAccounting.remotePDF;

export const getAQuoteInfo                      = (state) => state[MODULE_ID].docAccounting.quoteInfo;

export const getAnOfficeFormInfo                = (state) => state[MODULE_ID].docFormSheet.officeFormDetail;
export const getASafetyFormInfo                 = (state) => state[MODULE_ID].docFormSheet.safetyFormDetail;
export const getFormRemotePDF                   = (state) => state[MODULE_ID].docFormSheet.remotePDF;

export const getASWMSGenericFormInfo            = (state) => state[MODULE_ID].docNoteSheet.sWMSGenericFormDetail;
export const getRemoteNoteSheetPDF              = (state) => state[MODULE_ID].docNoteSheet.remotePDF;