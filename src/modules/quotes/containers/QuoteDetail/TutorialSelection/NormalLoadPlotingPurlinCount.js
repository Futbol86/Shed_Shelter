import {
    PURLIN_PROPERTIES, PURLIN_PENDING_REACTION
} from '../../../../../constants';
import utils from "../../../../../services/utils";
import PurlinGirtUtils from "./PurlinGirtUtils";
import HighZonePlottingPurlinCount from "./HighZonePlottingPurlinCount";
import { EXPOSURE_IDS } from '../../../constants';

let NormalLoadPlottingPurlinCount = {
    // Nomal = Uplift
    // Normal Load Plotting -> P36
    normalPurlin() {},


    //P35 = MAX(P41:P127)
    countPRecord() {},

    //V35 = MAX(V41:V127)
    countV1Record() {},

    //T36=MAX(P128:P154)
    countTRecord() {},

    //V36=MAX(V128:V154)
    countV2Record() {},

    //L35=MIN(L41:L242)
    //L36=MAX(L41:L242)
    countLRecord() {},
    

    //B8 = Loads!C45-Loads!C54
    loadsCounting() {},

    // In A8-> L13,
    createPurlinBendingReactionsRecord() {},

    //Wind Loads sheet
    windloadsCounting() {},
};


export default NormalLoadPlottingPurlinCount;