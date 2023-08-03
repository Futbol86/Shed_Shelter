let BaseBuildingCalculation = {

    defineInputData(buildingDetails, allMaterial){
        let InputData;
        return InputData;
    },

    /**
     * Main BOM Calculation
     *
     * @param buildingDetails
     * @param allMaterial
     * @param userDetail containing wholeSaleMargin and retailMargin
     * @returns {*|Array}
     */
    calculateBuildingMaterialQty(buildingDetails, allMaterial, userDetail = {}){
        return {};
    },

    eavePurlins(InputData) {
        var eavePurlins = [];
        
        return eavePurlins;
    },

    girtSpacing(buildingDetails, allMaterial) {     
        return {
        }
    },

    girtWidth(girtType) {
        if (!girtType)
            return 0;

        if (girtType.includes("TS")) {
            return 102.5;
        } if (girtType === "Z100"){
            return 100;
        } else if (girtType === "Z150"){
            return 130;
        } else if (girtType === "Z200"){
            return 155;
        } else if (girtType === "Z250"){
            return 160;
        }
    },

    parseFrameMaterialToSizes(item){
        let result = {};
        if (item && item.includes("SHS")) {
            result['width'] = parseInt(item.substring(0, 3));
            result['type'] = "SHS" + result['width'];
        } else if(item && item.length >= 6){
            result['type'] = item.substring(0,4);
            result['width'] = parseInt(item.substring(1,4));
            result['thickness'] = parseInt(item.substring(4,6));
            result['lip'] = this.findMaterialLip(item)
        }
        return result;
    },

    parseBatterTypeToSize(batternType) {
        if(batternType && batternType.startsWith("TH61")){
            return 61;
        } else if(batternType && batternType.startsWith("64TH")){
            return 64;
        } else if(batternType && batternType.startsWith("TH120")){
            return 120;
        } else if(batternType && batternType.startsWith("96TH")){
            return 96;
        } else if(batternType && batternType.startsWith("Z100")){
            return 100;
        } else if(batternType && batternType.startsWith("Z150")){
            return 150;
        } else if(batternType && batternType.startsWith("Z200")){
            return 200;
        } else if(batternType && batternType.startsWith("Z250")){
            return 250;
        }
    },

    findMaterialLip(item) {
        if(item && item.length >= 6){
            let width = item.substring(1,4);
            let thickness = item.substring(4,6);
            let lipTable = {
                "100": {"10": 12.5, "12": 13, "15": 14, "19": 15},
                "150": {"10": 14.5, "12": 15, "15": 16, "19": 17, "24": 18.5},
                "200": {"15": 16, "19": 19.5, "24": 21},
                "250": {"19": 19.5, "24": 20.5},
                "300": {"24": 28, "30": 31.5},
                "350": {"30": 30},
            };

            if (lipTable[width] && lipTable[width][thickness]) {
                return lipTable[width][thickness];
            }

            return parseInt(thickness); //Because lip nearly equals 10 times of thickness
        }
    },

    eavePurlinMember(buildingDetails, allMaterial) {
        if (allMaterial.batternType && ["Z150", "Z200", "Z250"].includes(buildingDetails.purlinAndGirtType)) {
            return allMaterial.batternType.replace("Z", "C");
        }

        return "C15012";
    }
};

export default BaseBuildingCalculation;