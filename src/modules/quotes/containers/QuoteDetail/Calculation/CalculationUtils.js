let CalculationUtils = {

    /**
     * Main Process for Calculate BOM price calculation
     *
     * @param allItems
     * @param userDetail contains wholeSaleMargin and retailMargin
     * @returns {Array}
     */
    countPrice(allItems, userDetail = {}, dealerKitMargin = 0, rollFormSupply, isCarport, currentProduct) {
        let resultsByHeader = [];
        //console.log('resultsByHeader', resultsByHeader);
        return resultsByHeader;
    },

    /**
     * Build Wall Types array for Drawing Mode - Door / Strap Operations. A item in array will contains the following information
     *  - id:   {bayIndex}-{wallIndex}
     *  - name: {wallTypeText}{bayIndex + 1}
     */
    calculateWallTypesArr(buildingDetails, isRoofUsing){
     let {bays, buildingHeight, buildingSpan, annexeLeft, annexeRight, isAnnexeLeft, isAnnexeRight } = buildingDetails;
        let wallTypesArr = [];
        
        return wallTypesArr;
    },

    mapRollerDoorSeri(door){
        
        return {frame: "", frameWidth: 0}
    },

    getRollDoorFrameWidth(subTypeId, isSmallMullion){
        let frameWidth = 0;
        
        return frameWidth;
    },

    getRollerDoorTrackWidth(subTypeId){
        let trackWidth = 0;
        

        return trackWidth;
    },

    doorOffsetLimit(door, buildingDetails, bayCount, bays, bayIndex, wallIndex, frameMaterial, basePlateType, purlinAndGirtType, rollFormSupply){
        // offset + (column width depend on side wall or end wall) + 100
        // If doorType is roller door: offset + (column width depend on side wall or end wall) + 5mm + (roller door mullion width) 
        //                             to avoid clashing with portal frames
        return {};
    },

    /*
3) Head Height maximum
We need to allow a “head Height” for all roller doors
A series and AA series doors will need 400mm head height.
B series doors will need 600mm head height.
Maximum height will be eave height minus required head height.
So eave of 3m, minus 400mm for A series door – will only allow 2.6m high door.
if(door.height <= 3000 && door.width <= 3000) => A seri
if (door.height <= 3000 && door.width <= 5000) => "AA" seri
if (door.height > 3000)  => "B" seri

Update: head Height for Access Door: 150mm
*/
    countOffsetLimitEndWall() {},

    countOffsetLimitAwningEndWall() {},

    countDoorHeadHeight() {},

    countOffsetLimitSideWall() {},

    countOffsetLimitAwningSideWall() {},

    countEndWallMullionFrame() {},

    countAwningEndWallMullionFrame() {},

    endWallMullionLength() {},

    countOffsetRollerDoorPortalFrameUse() {},

    countDragLimit() {},

    countDragLimitEndWall() {},

    countDragLimitSideWall() {},

    countDragLimitAwningEndWall() {},

    countDragLimitAwningSideWall() {},

    countDoorOffsetForMullion() {},

    findEndWallMullionWidth() {},

    findAwningEndWallMullionWidth() {},

    isDoorClash() {},

    sortDoorListAtBay() {},

    findAvailableRollerDoorKits() {},

    findNextSizeUpDoorKit() {},

    findRollerDoorSubType() {},

    centerGirtHeight() {},

    awningCenterGirtHeight() {},

    findRafterThicknessOption() {},

    findApexPlateLength() {},

    endWalls(bays) {},

    convertPurlinAndGirtTypeToOffset() {},

    awningOffset() {},

    carportOffset() {},

    getBOMRequestData({buildingDetail, clientDetail, dealerInfo, jobNumber, userDetail}) {
        return {};
    },
    
    getPunchingDetailRequestData({buildingDetail, clientDetail, dealerInfo, jobNumber}) {
        return {};
    },

    getSHSColumnDetailRequestData({buildingDetail, clientDetail, dealerInfo, jobNumber}) {
        return {};
    },

    getEngineeringRequestData({buildingDetail, clientDetail, dealerInfo, jobNumber}) {
        return {};
    },

    getPDFRequestData({buildingDetail}, pageId){
        return {};
    },

    getPurlinGirtReportRequestData({buildingDetail, clientDetail, dealerInfo, jobNumber}){
        return {};
    },

    getMapRequestData({buildingDetail, clientDetail, dealerInfo, jobNumber, userDetail}) {
        return {};
    },
};

export default CalculationUtils;