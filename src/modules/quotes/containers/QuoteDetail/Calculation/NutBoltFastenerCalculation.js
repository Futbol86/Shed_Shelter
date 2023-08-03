let NutBoltFastenerCalculation = {

    //TODO: Strap bracing, Fly bracing

    bolts() {},

    chemicalAnchorOption() {},

    dynaboltAnchorEndWallMullion() {},

    dynaboltAnchorEndWallColumn() {},

    dynaboltAnchorRollerDoorMullion() {},

    dynaboltAnchorDoorWindowsMullion() {},

    dynabolts() {},

   /* washerForDynabolt(InputData){
        let allDynabolt = [
            ...NutBoltFastenerCalculation.dynaboltAnchorEndWallColumn(InputData),
            ...NutBoltFastenerCalculation.dynaboltAnchorEndWallMullion(InputData),
            ...NutBoltFastenerCalculation.dynaboltAnchorRollerDoorMullion(InputData),
            ...NutBoltFastenerCalculation.dynaboltAnchorDoorWindowsMullion(InputData)
            ];

        let total = 0, item;
        for(let i = 0; i < allDynabolt.length; i++){
            item = allDynabolt[i];
            total = total + item.qty ? item.qty : 0;
        }

        return [{
            item: BOM_KEYWORDS.WASHER,
            description: "WASHER FLAT RND COMERCIAL ZINC 16MM",
            no: M16,
            qty: total
        }];
    },
*/

    findChemicalMaterial() {},

    findDynaboltMullionMaterial() {},

    findDynaboltEndwallMaterial() {},

    findWasherEndwallMaterial() {},

    /* Screw Frame */
    screwFixing() {},

    countAccessDoor() {},

    countWindow() {},

    countGlassDoor() {},

    countRollerDoor() {},

    countScrewRollerDoor() {},

    screwForSideWallCladding() {},

    screwForEndWallCladding() {},

    screwForWallCladding() {},

    screwCornerFlashing() {},

    screwRollerDoor() {},

    screwPersonalDoor() {},

    hingeAndLockPersonalDoor() {},

    screwBargeWall() {},

    screwBargeRoof() {},

    screwForRoofCladding() {},

    screwSkylight() {},

    screwStrapBracing() {},

    screwBasePlate() {},

    rivet() {},

    silicone() {},

    isCarport() {},

    increaseCount() {},
};

export  default NutBoltFastenerCalculation;