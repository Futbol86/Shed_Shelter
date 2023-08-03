import {
    DOWN_WIND_CPE_FOR_BD3, DOWN_WIND_CPE_FOR_BD8, DOWN_WIND_CPE_OVER_BD8,
    UPWIND_CPE_ROOF_PITCH
} from '../../../../../constants';
import FrameSelection from "./FrameSelection";
let LongWindBracingCount = {

    //Enclosed sheet, D14
    bracingForEndWall() {},

    //Enclosed sheet, D21
    bracingForSideWall() {},

    //Enclosed sheet, D22
    bracingForRoof() {},

    //Crosswind Enclosed Sheet, D14, D15 and D16
    crossWindEnclosedRequirement() {},

    crossBraceSideWall() {},

    crossBraceEndWall() {},

    //Wind Speed Sheet, C19
    QuKPa() {},
};
export default LongWindBracingCount;