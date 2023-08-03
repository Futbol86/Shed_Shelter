import {
    BOM_KEYWORDS,
} from "../../../constants";

let BridgingCalculation = {
    bridging(InputData){
        let items = this.bridgingAndScrewQty(InputData);
        if (items){
            return[{
                item: BOM_KEYWORDS.BRIDGING,
                description: "Ceiling Batten 6.100",
                no: "CBTC61",
                qty: items.bridgingQty
            }];
        }

       return [];
    },

    screw(InputData){
        let items = this.bridgingAndScrewQty(InputData);
        if (items){
            return[{
                item: BOM_KEYWORDS.SCREW_FIXING,
                description: "Frame" ,
                no: "C4 12-14x20 Bare Gal",
                qty: items.screwQty
            }];
        }

        return [];
    },

    bridgingAndScrewQty() {},

    countEndWallBridging() {},

    sortDoorListAtBay(doors){
        let tempDoor;
        let nearestOffset = 10000;
        for (let i = 0; i < doors.length ; i++){
            nearestOffset = doors[i].leftDoor;
            for (let j = i+1; j < doors.length; j++){
                if(nearestOffset > doors[j].leftDoor){
                    nearestOffset = doors[j].leftDoor;
                    tempDoor = doors[i];
                    doors[i] = doors[j];
                    doors[j] = tempDoor;
                }
            }
        }
        return doors;
    },
}

export default BridgingCalculation;