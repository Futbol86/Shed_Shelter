import {
    PURLIN_PROPERTIES, PURLIN_PENDING_REACTION
} from '../../../../../constants';
import utils from "../../../../../services/utils";
import PurlinGirtUtils from "./PurlinGirtUtils";
import HighZonePlottingPurlinCount from "./HighZonePlottingPurlinCount";

let SnowLoadPlottingPurlinCount = {

    snowloadPurlin() {},

    //P35 = MAX(P41:P127)
    countPRecord() {},

    //T36=MAX(P128:P154)
    countTRecord() {},

    loadsCounting() {},

    // In A8-> L13,
    createPurlinBendingReactionsRecord() {},
};

export default SnowLoadPlottingPurlinCount;