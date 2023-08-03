import GirtPlottingCount from "./GirtPlottingCount";
import GirtPlottingCount2 from "./GirtPlottingCount2";

let GirtSelection = {

    countGirtSpacing(buildingDetails, key, frameMaterial, maxBaySpan){
       // =MIN('GIRT Plotting'!M30,'GIRT Plotting (2)'!M30)
        let girtCount, girtCount2;
        girtCount = GirtPlottingCount.girtPlottingSpace(buildingDetails, key, frameMaterial, maxBaySpan);
        girtCount2 = GirtPlottingCount2.girtPlottingSpace(buildingDetails, key, frameMaterial, maxBaySpan);
        //console.log("girtCount", girtCount);
        //console.log("girtCount2", girtCount2);
        return Math.min(girtCount, girtCount2);
    },




};

export default GirtSelection;