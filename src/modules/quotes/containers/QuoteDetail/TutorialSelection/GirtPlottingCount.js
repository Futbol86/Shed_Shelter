import utils from "../../../../../services/utils";
import PurlinGirtUtils from "./PurlinGirtUtils";
import {PURLIN_PENDING_REACTION, GIRT_HIGH_ZONE_LOADS} from "../../../../../constants";

let GirtPlottingCount = {
    girtPlottingSpace() {},

    //P35 = MAX(P41:P127)
    countPRecord() {},

    //T36=MAX(P128:P154)
    countTRecord() {},

    //V35 = MAX(V41:V127)
    countV1Record() {},

    //V36=MAX(V128:V154)
    countV2Record() {},

    //L35=MIN(L41:L242)
    //L36=MAX(L41:L242)
    countLRecord() {},

    loadsCounting() {},

    // In A8-> L13,
    createPurlinBendingReactionsRecord() {},

    createHighZoneLoadsRecord() {},
};

export default GirtPlottingCount;