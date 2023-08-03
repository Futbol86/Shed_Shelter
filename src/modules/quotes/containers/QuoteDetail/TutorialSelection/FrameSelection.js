import {
    AVERAGE_RECURRENCE_INTERVAL, TERRAIN_CATEGORY_MzCat, HILL_SLOPE_TOPOGRAPHY,
    TOPOGRAPHY_REGION_TOPOGRAPHY_CAL,
    WALL_LEFT_INDEX, ANNEXE_WALL_LEFT_INDEX, ANNEXE_WALL_RIGHT_INDEX,
    ANNEXE_LEFT_ID, ANNEXE_RIGHT_ID,
    QUOTES_DOOR_TYPE_IDS,
    ROLLER_DOOR_PORTAL_FRAME_IDS,
    WALL_STATUS_HAS_WALL
} from "../../../constants";

import {
    PREDEFINED_REGION_TOPOGRAPHY_REGIONS
} from "../../../../../../src/constants";
import utils from "../../../../../services/utils";

let FrameSelection = {

    selectFrame() {},

    Vzu() {},

    Vzs() {},

    calculateAverageRecurranceInterval() {},

    calculateServiceabilityRecurrenceInterval() {},

    //AC40
    regionBasicWindSpeedVR() {},

    regionBasicWindSpeedVs() {},

    //AC42
    Mzcat() {},

    //AC44
    Ms() {},
    //AC45
    Md() {},

    //AC46
    Mt() {},

    //C18
    findOldWindCategory() {},
};

export default FrameSelection;