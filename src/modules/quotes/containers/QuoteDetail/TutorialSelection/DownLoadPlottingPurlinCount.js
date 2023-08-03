import {
    PURLIN_PROPERTIES, PURLIN_PENDING_REACTION, PURLIN_CUFSM_PROPERITES, Z_SECTION_R_FACTORS,
    M_BRIDGING_LAP
} from '../../../../../constants';
import utils from "../../../../../services/utils";
import PurlinGirtUtils from "./PurlinGirtUtils";

let DownLoadPlottingPurlinCount = {
    downloadPurlin() {},

    //P35 = MAX(P41:P127)
    countPRecord() {},

    //T36=MAX(P128:P154)
    countTRecord() {},

    loadsCounting() {},

    // In A8-> L13,
    createPurlinBendingReactionsRecord() {},
};

export default DownLoadPlottingPurlinCount;