import {PREDEFINED_BRACE_SELECTION} from '../../../../../constants';
import CalculationUtils from '../Calculation/CalculationUtils';
import {
    WALL_LEFT_INDEX,
    WALL_RIGHT_INDEX,
    ANNEXE_WALL_LEFT_INDEX,
    ANNEXE_WALL_RIGHT_INDEX,
    ANNEXE_LEFT_ID,
    ANNEXE_RIGHT_ID,
    WALL_BRACE_LOCATION_IDS
} from '../../../constants';

let CrossBraceCount = {
    strength() {},

    endWallBraceStrength() {},

    sideWallBraceStrength() {},

    roofBraceStrength() {},

    totalBraceStrength() {},
}

export default CrossBraceCount;