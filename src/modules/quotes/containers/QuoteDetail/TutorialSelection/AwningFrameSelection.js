import {
    RAFTER_PROPERTIES,
    RAFTER_CUFSM_PROPERTIES,
    RAFTER_MOMENT_DISTRIBUTION_TABLE
} from "../../../../../constants";
import { AWNING_TYPES, WALL_STATUS_HAS_WALL } from "../../../constants";
import utils from "../../../../../services/utils";
let AwningFrameSelection = {
    selectFrame(buildingDetails, frameMaterial){
        
    },

    //Open rafter Sheet: D10
    bendingAndShear() {},

    //Open rafter Sheet: B86
    PhiVv() {},

    //Open rafter Sheet: B87
    PhibMb() {},

    //Open rafter Sheet: B88
    shearReaction() {},

    //Open rafter Sheet: B89
    momentLoad() {},

    //Open rafter Sheet: A65 -> E72
    externalCoefficients() {},

    //Open rafterSheet: A74 -> I80
    momentFactors() {},

    awningNoOfFlyBraces() {},
}

export default AwningFrameSelection;