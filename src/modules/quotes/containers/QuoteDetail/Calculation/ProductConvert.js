import {
    STRAMIT, LYSAGHT,
    STRAMIT_PREDEFINED_BUILDING_PROFILES,
    LYSAGHT_PREDEFINED_BUILDING_PROFILES,
    LYSAGHT_DEFAULT_BUILDING_VALUES,
    STRAMIT_DEFAULT_BUILDING_VALUES,
    LYSAGHT_PREDEFINED_INSULATION_LIST,
    STRAMIT_PREDEFINED_INSULATION_LIST
} from "../../../../../constants";

let ProductConvert = {
    predefinedBuildingProfiles(rollFormSupply){
        switch(rollFormSupply){
            case STRAMIT:
                return STRAMIT_PREDEFINED_BUILDING_PROFILES;
            case LYSAGHT:
                return LYSAGHT_PREDEFINED_BUILDING_PROFILES;
        }
        return {
            "walls":  [],
            "roofs": [],
            "ridges":[]   
        };
    },

    predefinedBuildingInsulations(rollFormSupply) {
        switch(rollFormSupply){
            case STRAMIT:
                return STRAMIT_PREDEFINED_INSULATION_LIST;
            case LYSAGHT:
                return LYSAGHT_PREDEFINED_INSULATION_LIST;
        }
        return {
            "Roof Insulation":  [],
            "Roof Safe Wire": [],
            "Wall Insulation":[]   
        };
    },

    defaultBuildingValues(rollFormSupply){
        switch(rollFormSupply){
            case STRAMIT:
                return STRAMIT_DEFAULT_BUILDING_VALUES;
            case LYSAGHT:
                return LYSAGHT_DEFAULT_BUILDING_VALUES;
            default:
                return STRAMIT_DEFAULT_BUILDING_VALUES;
        }
    }

};
export default ProductConvert;