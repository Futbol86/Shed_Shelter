import * as BABYLON from "babylonjs";
import earcut from "earcut";
import {floor} from "lodash";
import {
    SHED_BUILDING_INFORMATION, SIMULATE_3D_SCALE, UNDERSIDE_OF_PURLIN_WALL, UNDERSIDE_OF_RAFTER_WALL, 
    WALL_CLADDING_BOTH_SIDE, WALL_CLADDING_ONE_SIDE, WALL_CLADDING_NONE, WALL_CLADDING_MATERIALS, 
    PINE_STUD_INTERIOR_WALL_COLOR, PINE_STUD_PLASTER_BOARD_COLOR, PINE_STUD_EXTERN_PLASTER_BOARD_COLOR, EXTERN_WALL_CLADDINGS,
    EXTERN_WALL_CLADDING_NONE, FLOOR_HEIGHT,
    FURNITURE_WALL_HEIGHT_TYPES, FURNITURE_STUD_SIZE
} from '../../../../constants';

let UnderOrTopRafterWallLibrary = {
    createUnderOrTopRafterInteriorWall(params, scene) {
        let beginCoord = params.beginCoord; 
        let endCoord = params.endCoord; 

        // check if coordinateX of endCoord < beginCoord
        if(endCoord.x < beginCoord.x) {
            let beginCoordTemp = beginCoord;
            beginCoord = endCoord;
            endCoord = beginCoordTemp;
            // update params
            params.beginCoord = beginCoord;
            params.endCoord = endCoord;
        }

        let vec = endCoord.subtract(beginCoord);
        vec.normalize();

        let crossVec = BABYLON.Vector3.Cross(vec, BABYLON.Axis.X);
        let sign = Math.sign(crossVec.z);

        //** interior wall locate along SHED'S 
        const FROM_BEGIN_COORD_TO_SHED_CENTER = SHED_BUILDING_INFORMATION.span/2 - beginCoord.x;
        const FROM_SHED_CENTER_TO_END_COORD = SHED_BUILDING_INFORMATION.span/2 - endCoord.x;

        if(sign === 0) {
            // 2 point of wall locate on left haft sheds
            if(FROM_BEGIN_COORD_TO_SHED_CENTER > 0 && FROM_SHED_CENTER_TO_END_COORD > 0) {
                return createWallLocateHalfLeftAlongAxisX(params, scene);
            }
            // 2 point of wall locate on right haft sheds
            else if(FROM_BEGIN_COORD_TO_SHED_CENTER < 0 && FROM_SHED_CENTER_TO_END_COORD < 0) {
                return createWallLocateHalfRightAlongAxisX(params, scene);
            }
            // 1 point of wall locate of left and another point locate on right
            else if(FROM_BEGIN_COORD_TO_SHED_CENTER > 0 && FROM_SHED_CENTER_TO_END_COORD < 0) {
                return createWallLocateLeftAndRightAlongAxisX(params, scene);
            }
        } 
        // ** interior wall locate along SHED'S LENGTH
        else {
            return createWallLocateAlongAxisY(params, scene);
        }
    },
}

function createWallLocateHalfLeftAlongAxisX(params, scene) {
    const { 
        name, wallType, wallHeightType, studSize, studWeb, studFlange, studDistance, 
        isCreateNewWall = true, isCreateNewWallName = true, wallComponentIndexes
    } = params;

    let wallName = isCreateNewWallName ? ("W" + (++wallComponentIndexes["maxWallIdx"])) : name;

    let beginCoord = params.beginCoord; 
    let endCoord = params.endCoord; 
    let wallCladdingType = params.wallCladdingType; 
    let wallCladdingMaterial = params.wallCladdingMaterial;
    let externWallCladding = params.externWallCladding;

    let vec = endCoord.subtract(beginCoord);
    vec.normalize();

    let crossVec = BABYLON.Vector3.Cross(vec, BABYLON.Axis.X);
    let sign = Math.sign(crossVec.z);

    let angle = BABYLON.Vector3.Dot(BABYLON.Axis.X, vec);
    angle = Math.acos(angle);

    const RAFTER_WIDTH = 35;
    const RAFTER_ABOVE_FLOOR = 466;
    const ROOF_PITCH = Math.PI/18;

    const WALL_LENGTH = BABYLON.Vector3.Distance(endCoord, beginCoord);
    const MIN_ROOF_HEIGHT = (wallHeightType === UNDERSIDE_OF_RAFTER_WALL) 
                          ? (RAFTER_ABOVE_FLOOR - RAFTER_WIDTH/2) : (RAFTER_ABOVE_FLOOR + RAFTER_WIDTH/2);

    const STUD_DISTANCE = studDistance;
    const STUD_WEB = studWeb;
    const STUD_FLANGE = studFlange;

    const MIN_WALL_HEIGHT = MIN_ROOF_HEIGHT + beginCoord.x*Math.tan(ROOF_PITCH);
    const MAX_WALL_HEIGHT = MIN_ROOF_HEIGHT + endCoord.x*Math.tan(ROOF_PITCH);
    const TOP_PLATE_WIDTH = WALL_LENGTH/Math.cos(ROOF_PITCH);

    const TOTAL_WALL_STUD = Math.ceil(WALL_LENGTH/STUD_DISTANCE);
    const STUD_DISTANCE_OFFSET = (WALL_LENGTH - (TOTAL_WALL_STUD-1)*STUD_DISTANCE) - STUD_FLANGE;

    const NOGGIN_LENGTH = STUD_DISTANCE + STUD_FLANGE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1);

    let meshes = [];
    let plasterBoard;

    let multiMat = new BABYLON.MultiMaterial('multi', scene);
    let interiorMat = new BABYLON.StandardMaterial("interiorMat", scene);
    interiorMat.diffuseColor = new BABYLON.Color3.FromHexString(PINE_STUD_INTERIOR_WALL_COLOR);
    interiorMat.backFaceCulling = false;
    
    // ** BOTTOM PLATE
    let bottomPlateIW = BABYLON.MeshBuilder.CreateBox("bottomPlate", {
        width: WALL_LENGTH, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
    }, scene);
    bottomPlateIW.setPivotMatrix(BABYLON.Matrix.Translation(WALL_LENGTH/2, STUD_WEB/2, STUD_FLANGE/2), false);

    meshes = [...meshes, bottomPlateIW];
    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

    //** TOP PLATE
    let topPlateMesh = BABYLON.MeshBuilder.CreateBox("topPlate", {
        width: TOP_PLATE_WIDTH, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
    }, scene);
    
    topPlateMesh.position.z = MIN_WALL_HEIGHT;
    topPlateMesh.rotation.y = -ROOF_PITCH;
    topPlateMesh.setPivotMatrix(BABYLON.Matrix.Translation(TOP_PLATE_WIDTH/2, STUD_WEB/2, STUD_FLANGE/2), false);

    meshes = [...meshes, topPlateMesh];
    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

    //*** WALL STUD */
    if( wallCladdingType === WALL_CLADDING_NONE 
    || (wallCladdingType === WALL_CLADDING_ONE_SIDE && (!externWallCladding || externWallCladding === EXTERN_WALL_CLADDING_NONE) )) {
        for(let i = 0; i < TOTAL_WALL_STUD; i++) { 
            let wallStudHeight = MIN_ROOF_HEIGHT + (beginCoord.x + (STUD_DISTANCE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1))*i) * Math.tan(ROOF_PITCH);
        
            let newWallStudIW = BABYLON.MeshBuilder.CreateBox("stud", {
                width: STUD_FLANGE, height: STUD_WEB, depth: wallStudHeight, updatable: true
            }, scene);
            newWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, wallStudHeight/2), false);
            newWallStudIW.position.x += (STUD_DISTANCE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1))*i;

            meshes = [...meshes, newWallStudIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
        }
        
        //*** NOGGIN */
        for(let i = 0; i < TOTAL_WALL_STUD - 1; i++) {
            let newNogginIW = BABYLON.MeshBuilder.CreateBox("noggin", {
                width: NOGGIN_LENGTH, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
            }, scene);
            newNogginIW.setPivotMatrix(BABYLON.Matrix.Translation(NOGGIN_LENGTH/2, STUD_WEB/2, STUD_FLANGE/2), false);
            newNogginIW.position.x += (STUD_DISTANCE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1))*i;
            newNogginIW.position.z = MIN_WALL_HEIGHT/2;

            meshes = [...meshes, newNogginIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

            newNogginIW.position.z -= (i%2 === 0) ? 0 : 20;
        }
    }
    
    //*** Outerest wall stud left and right
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE 
    || (wallCladdingType === WALL_CLADDING_ONE_SIDE) && (externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE)) {    
        let leftOuterWallStudIW = BABYLON.MeshBuilder.CreateBox("leftOuterStud", {
            width: STUD_FLANGE, height: STUD_WEB, depth: MIN_WALL_HEIGHT, updatable: true
        }, scene); 
        leftOuterWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, MIN_WALL_HEIGHT/2), false);

        meshes = [...meshes, leftOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

        let rightOuterWallStudIW = BABYLON.MeshBuilder.CreateBox("rightOuterStud", {
            width: STUD_FLANGE, height: STUD_WEB, depth: MAX_WALL_HEIGHT, updatable: true
        }, scene);
        rightOuterWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, MAX_WALL_HEIGHT/2), false);
        rightOuterWallStudIW.position.x += WALL_LENGTH - STUD_FLANGE;

        meshes = [...meshes, rightOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
    }

    //** PLASTER BOARD
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE || wallCladdingType === WALL_CLADDING_ONE_SIDE) {
        let pBDepth = WALL_CLADDING_MATERIALS[wallCladdingMaterial]?.["depth"];
        let pbColor = WALL_CLADDING_MATERIALS[wallCladdingMaterial]?.["color"];

        let plasterBoardCoordinates = [];

        plasterBoardCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        plasterBoardCoordinates[1] = new BABYLON.Vector3(
            plasterBoardCoordinates[0].x + WALL_LENGTH, 
            plasterBoardCoordinates[0].y, 
            plasterBoardCoordinates[0].z
        );
        plasterBoardCoordinates[2] = new BABYLON.Vector3(
            plasterBoardCoordinates[1].x, 
            plasterBoardCoordinates[1].y + MAX_WALL_HEIGHT, 
            plasterBoardCoordinates[1].z
        );
        plasterBoardCoordinates[3] = new BABYLON.Vector3(
            plasterBoardCoordinates[2].x - WALL_LENGTH, 
            plasterBoardCoordinates[0].y + MIN_WALL_HEIGHT, 
            plasterBoardCoordinates[2].z
        );
        
        let plasterBoardMeshBuilder = new BABYLON.PolygonMeshBuilder("plasterBoard", plasterBoardCoordinates, scene, earcut);    
        plasterBoard = plasterBoardMeshBuilder.build(true, pBDepth || 1);
        if(wallCladdingType === WALL_CLADDING_BOTH_SIDE) plasterBoard.position.y += STUD_FLANGE;

        let plasterBoardMat = new BABYLON.StandardMaterial("plasterBoardMat", scene);
        plasterBoardMat.diffuseColor = new BABYLON.Color3.FromHexString(pbColor || PINE_STUD_PLASTER_BOARD_COLOR);
        plasterBoardMat.backFaceCulling = false;

        meshes = [...meshes, plasterBoard];
        multiMat.subMaterials = [...multiMat.subMaterials, plasterBoardMat];
    }

    //*** EXTERN PLASTER BOARD
    if((wallCladdingType === WALL_CLADDING_ONE_SIDE) 
    && externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE) {
        let externPlasterBoard = plasterBoard.clone("externPlasterBoard");
        externPlasterBoard.position.y += 2*STUD_FLANGE + 1;

        let externPlasterBoardMat = new BABYLON.StandardMaterial("externPlasterBoardMat", scene);
        externPlasterBoardMat.emissiveColor = new BABYLON.Color3.FromHexString(PINE_STUD_EXTERN_PLASTER_BOARD_COLOR);
        externPlasterBoardMat.diffuseTexture = new BABYLON.Texture(`/assets/textures/walls/${externWallCladding}.jpg`);
        externPlasterBoardMat.diffuseTexture.vScale = Math.ceil(MAX_WALL_HEIGHT/STUD_DISTANCE);
        externPlasterBoardMat.diffuseTexture.uScale = 1;
        externPlasterBoardMat.backFaceCulling = false;

        meshes = [...meshes, externPlasterBoard]; 
        multiMat.subMaterials = [...multiMat.subMaterials, externPlasterBoardMat];
    }

    //*** */ NUMBERED INTERIOR WALL'S COMPONENT
    if(isCreateNewWall) {
        wallComponentIndexes[wallName] = {
            "bottomPlates": [],
            "topPlates": [],
            "studs": [],
            "noggins": [],
            "crippleStuds": [],
            "headerStuds": [],
            "trimmerDoorStuds": [],
            "plasterBoards": [],
            "externPlasterBoards": []
        }

        let studSizeName = FURNITURE_STUD_SIZE[studSize]?.["name"];
        let wallHeightTypeName = FURNITURE_WALL_HEIGHT_TYPES[wallHeightType]?.["name"];

        //** BOTTOM PLATE
        const numBPLength3600 = Math.floor(WALL_LENGTH/360);
        let lengthBPRemain = WALL_LENGTH - (numBPLength3600 * 360);

        if(numBPLength3600 >= 1) {
            wallComponentIndexes[wallName]["bottomPlates"].push({
                "item": "Bottom plate",
                "desc": studSizeName,
                "mark": 'BP' + (++wallComponentIndexes["maxBottomPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": 3600,
                "cutLength": 3600,
                "quantity": numBPLength3600
            });
        }

        // only order framing's length >= 10cm
        if(lengthBPRemain >= 10) {
            wallComponentIndexes[wallName]["bottomPlates"].push({
                "item": "Bottom plate",
                "desc": studSizeName,
                "mark": 'BP' + (++wallComponentIndexes["maxBottomPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(lengthBPRemain * 10), -2),
                "cutLength": Math.round(lengthBPRemain * 10),        
                "quantity": 1
            });
        }

        //** TOP PLATE
        const numTPLength3600 = Math.floor(TOP_PLATE_WIDTH/360);
        let lengthTPRemain = TOP_PLATE_WIDTH - (numTPLength3600 * 360);

        if(numTPLength3600 >= 1) {
            wallComponentIndexes[wallName]["topPlates"].push({
                "item": "Top plate",
                "desc": studSizeName,
                "mark": 'TP' + (++wallComponentIndexes["maxTopPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": 3600,
                "cutLength": 3600,
                "quantity": numTPLength3600
            });
        }

        // only order framing's length >= 10cm
        if(lengthTPRemain >= 10) {
            wallComponentIndexes[wallName]["topPlates"].push({
                "item": "Top plate",
                "desc": studSizeName,
                "mark": 'TP' + (++wallComponentIndexes["maxTopPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(lengthTPRemain * 10), -2),
                "cutLength": Math.round(lengthTPRemain * 10), 
                "quantity": 1
            });
        }

        if(wallCladdingType === WALL_CLADDING_NONE 
        || (wallCladdingType === WALL_CLADDING_ONE_SIDE && (!externWallCladding || externWallCladding === EXTERN_WALL_CLADDING_NONE) )) {
            // *** WALL STUDS    
            for(let i = 0; i < TOTAL_WALL_STUD; i++) { 
                let wallStudHeight = MIN_ROOF_HEIGHT + (beginCoord.x + (STUD_DISTANCE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1))*i) * Math.tan(ROOF_PITCH);
            
                wallComponentIndexes[wallName]["studs"].push({
                    "item": "Stud",
                    "desc": studSizeName,
                    "mark": 'S' + (++wallComponentIndexes["maxStudIdx"]),
                    "wallName": wallName,
                    "wallHeightType": wallHeightTypeName,
                    "length": floor(Math.round(wallStudHeight * 10), -2),
                    "cutLength": Math.round(wallStudHeight * 10),
                    "quantity": 1
                });
            }

            //** NOGGINS */
            wallComponentIndexes[wallName]["noggins"].push({
                "item": "Noggin",
                "desc": studSizeName,
                "mark": 'N' + (++wallComponentIndexes["maxNogginIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(NOGGIN_LENGTH * 10), -1),
                "cutLength": Math.round(NOGGIN_LENGTH * 10),
                "quantity": TOTAL_WALL_STUD - 1,
            });
        }

        //** */ OUTEREST STUD LEFT && RIGHT
        if(wallCladdingType === WALL_CLADDING_BOTH_SIDE 
       || (wallCladdingType === WALL_CLADDING_ONE_SIDE) && (externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE)) {
            wallComponentIndexes[wallName]["studs"].push({
                "item": "Stud",
                "desc": studSizeName,
                "mark": 'S' + (++wallComponentIndexes["maxStudIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(MIN_WALL_HEIGHT * 10), -2),
                "cutLength": Math.round(MIN_WALL_HEIGHT * 10),
                "quantity": 1
            });
            
            wallComponentIndexes[wallName]["studs"].push({
                "item": "Stud",
                "desc": studSizeName,
                "mark": 'S' + (++wallComponentIndexes["maxStudIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(MAX_WALL_HEIGHT * 10), -2),
                "cutLength": Math.round(MAX_WALL_HEIGHT * 10),
                "quantity": 1
            });
        }

        // *** PLASTER BOARD
        if(wallCladdingType === WALL_CLADDING_BOTH_SIDE || wallCladdingType === WALL_CLADDING_ONE_SIDE) {
            let pBName = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["name"];
            let pBLength = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["length"];
            let pBHeight = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["height"];
            let pbColorName = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["colorName"];
    
            let pbSheetDetails = [];
    
            //** 1: count for base wall fit height * width (PART 1)
            let totalLWTCLengthSection = Math.floor(WALL_LENGTH/pBLength);
            let lWTCLengthRemain = Math.round(WALL_LENGTH - totalLWTCLengthSection*pBLength);

            let totalLWTCHeightSection = Math.floor(MIN_WALL_HEIGHT/pBHeight);
            let lWTCHeightRemain = Math.round(MIN_WALL_HEIGHT - totalLWTCHeightSection*pBHeight);

            pbSheetDetails.push({ 
                    size: `${pBHeight * 10} x ${pBLength * 10} (H x W)`, 
                    quantity: totalLWTCLengthSection * totalLWTCHeightSection 
                });

            // 2 ** count for remain upper wall , if each sheet have 'right height' lesser PLASTER BOARD SHEET HEIGHT,
            // we will cut 1 sheet, if each sheet have 'right height' greater PLASTER BOARD SHEET HEIGHT we will cut 2 sheet
            for(let i = 0; i < totalLWTCLengthSection; i++) {
                let nextHeightSheet = Math.round(lWTCHeightRemain + ((pBLength * (i + 1)) * Math.tan(ROOF_PITCH)));

                if(nextHeightSheet < pBHeight) {
                    pbSheetDetails.push({ 
                            size: `${nextHeightSheet * 10} x ${pBLength * 10} (H x W)`, 
                            quantity: 1
                        });
                } else {
                    pbSheetDetails[0]["quantity"]++;

                    pbSheetDetails.push({ 
                            size: `${(nextHeightSheet - pBHeight) * 10} x ${pBLength * 10} (H x W)`, 
                            quantity: 1
                        });
                }
            }

            // from left wall to Shed center
            let lWTCHeight = Math.round(lWTCHeightRemain + (WALL_LENGTH * Math.tan(ROOF_PITCH)));
            if(lWTCHeight < pBHeight) {
                pbSheetDetails.push({ 
                        size: `${lWTCHeight * 10} x ${lWTCLengthRemain * 10} (H x W)`, 
                        quantity: 1
                    });
            } else {
                pbSheetDetails.push({ 
                        size: `${(lWTCHeight - pBHeight) * 10} x ${lWTCLengthRemain * 10} (H x W)`, 
                        quantity: 1
                    });
            }

            pbSheetDetails.push({ 
                size: `${(pBHeight) * 10} x ${lWTCLengthRemain * 10} (H x W)`, 
                quantity: totalLWTCHeightSection + (lWTCHeight >= pBHeight ? 1 : 0)
            });

            pbSheetDetails.map(item => {
                if(item.quantity === 0) return;

                wallComponentIndexes[wallName]["plasterBoards"].push({
                    "item": "Plaster Board",
                    "desc": pBName,
                    "mark": 'PB' + (++wallComponentIndexes["maxPlasterBoardIdx"]),
                    "colour": pbColorName,
                    "wallName": wallName,
                    "wallHeightType": wallHeightTypeName,
                    "length": item.size,
                    "quantity": item.quantity
                });
            });
        }

        // *** EXTERN PLASTER BOARD
        if((wallCladdingType === WALL_CLADDING_ONE_SIDE) && externWallCladding 
        && externWallCladding !== EXTERN_WALL_CLADDING_NONE) {
            wallComponentIndexes[wallName]["plasterBoards"].map(item => {
                wallComponentIndexes[wallName]["externPlasterBoards"].push({
                    "item": "Extern Plaster Board",
                    "desc": EXTERN_WALL_CLADDINGS[externWallCladding] 
                         && EXTERN_WALL_CLADDINGS[externWallCladding]["name"],
                    "mark": 'EPB' + (++wallComponentIndexes["maxExternPlasterBoardIdx"]),
                    "wallName": wallName,
                    "wallHeightType": wallHeightTypeName,
                    "length": item.length,
                    "quantity": item.quantity
                });
            });
        }
    }

    // *** MERGE MESHES
    let newInteriorWallMesh = BABYLON.Mesh.MergeMeshes(meshes, true, true, undefined, true);
    newInteriorWallMesh.name = wallName;

    newInteriorWallMesh.position = new BABYLON.Vector3(beginCoord.x, beginCoord.y, beginCoord.z + FLOOR_HEIGHT);
    newInteriorWallMesh.rotation.z = sign !== 0 ? -1*sign*angle : angle;

    newInteriorWallMesh.wallParams = {
        "beginCoord": {x: beginCoord.x, y: beginCoord.y, z: beginCoord.z},
        "endCoord": {x: endCoord.x, y: endCoord.y, z: endCoord.z},
        "wallType": wallType,
        "wallHeightType": wallHeightType,
        "wallLength": WALL_LENGTH,
        "minWallHeight": MIN_WALL_HEIGHT,
        "maxWallHeight": MAX_WALL_HEIGHT,
        "wallCladdingType": wallCladdingType,
        "wallCladdingMaterial": wallCladdingMaterial,
        "externWallCladding": externWallCladding,
        "studSize": studSize,
        "studWeb": studWeb,
        "studFlange": studFlange,
        "studDistance": studDistance,
    }

    // set multi material
    newInteriorWallMesh.material = multiMat;
    for(let i = 0; i < newInteriorWallMesh.subMeshes.length; i++) {
        newInteriorWallMesh.subMeshes[i].materialIndex = i;
    }

    return { wall: newInteriorWallMesh };
}

function createWallLocateHalfRightAlongAxisX(params, scene) {
    const { 
        name, wallType, wallHeightType, studSize, studWeb, studFlange, studDistance,
        isCreateNewWall = true, isCreateNewWallName = true, wallComponentIndexes
    } = params;

    let wallName = isCreateNewWallName ? ("W" + (++wallComponentIndexes["maxWallIdx"])) : name;

    let beginCoord = params.beginCoord; 
    let endCoord = params.endCoord; 
    let wallCladdingType = params.wallCladdingType; 
    let wallCladdingMaterial = params.wallCladdingMaterial;
    let externWallCladding = params.externWallCladding;

    let vec = endCoord.subtract(beginCoord);
    vec.normalize();

    let crossVec = BABYLON.Vector3.Cross(vec, BABYLON.Axis.X);
    let sign = Math.sign(crossVec.z);

    let angle = BABYLON.Vector3.Dot(BABYLON.Axis.X, vec);
    angle = Math.acos(angle);

    const RAFTER_WIDTH = 35;
    const RAFTER_ABOVE_FLOOR = 466;
    const ROOF_PITCH = Math.PI/18;

    const WALL_LENGTH = BABYLON.Vector3.Distance(endCoord, beginCoord);
    const MIN_ROOF_HEIGHT = (wallHeightType === UNDERSIDE_OF_RAFTER_WALL) 
                          ? (RAFTER_ABOVE_FLOOR - RAFTER_WIDTH/2) : (RAFTER_ABOVE_FLOOR + RAFTER_WIDTH/2);

    const STUD_DISTANCE = studDistance;
    const STUD_WEB = studWeb;
    const STUD_FLANGE = studFlange;

    const MIN_WALL_HEIGHT = MIN_ROOF_HEIGHT + (SHED_BUILDING_INFORMATION.span - endCoord.x) * Math.tan(ROOF_PITCH);
    const MAX_WALL_HEIGHT = MIN_ROOF_HEIGHT + (SHED_BUILDING_INFORMATION.span - beginCoord.x) * Math.tan(ROOF_PITCH);
    const TOP_PLATE_WIDTH = WALL_LENGTH/Math.cos(ROOF_PITCH);
    
    const TOTAL_WALL_STUD = Math.ceil(WALL_LENGTH/STUD_DISTANCE);
    const STUD_DISTANCE_OFFSET = (WALL_LENGTH - (TOTAL_WALL_STUD-1)*STUD_DISTANCE) - STUD_FLANGE;

    const NOGGIN_LENGTH = STUD_DISTANCE + STUD_FLANGE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1);

    let meshes = [];
    let plasterBoard;

    let multiMat = new BABYLON.MultiMaterial('multi', scene);
    let interiorMat = new BABYLON.StandardMaterial("interiorMat", scene);
    interiorMat.diffuseColor = new BABYLON.Color3.FromHexString(PINE_STUD_INTERIOR_WALL_COLOR);
    interiorMat.backFaceCulling = false;

    // ** BOTTOM PLATE
    let bottomPlateIW = BABYLON.MeshBuilder.CreateBox("bottomPlate", {
        width: WALL_LENGTH, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
    }, scene);
    bottomPlateIW.setPivotMatrix(BABYLON.Matrix.Translation(WALL_LENGTH/2, STUD_WEB/2, STUD_FLANGE/2), false);

    meshes = [...meshes, bottomPlateIW];
    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

    //** TOP PLATE
    let topPlateMesh = BABYLON.MeshBuilder.CreateBox("topPlate", {
        width: TOP_PLATE_WIDTH, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
    }, scene);
    
    topPlateMesh.position.z = MAX_WALL_HEIGHT;
    topPlateMesh.rotation.y = ROOF_PITCH;  
    topPlateMesh.setPivotMatrix(BABYLON.Matrix.Translation(TOP_PLATE_WIDTH/2, STUD_WEB/2, STUD_FLANGE/2), false);
    
    meshes = [...meshes, topPlateMesh];
    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

    //** WALL STUD */
    if( wallCladdingType === WALL_CLADDING_NONE 
    || (wallCladdingType === WALL_CLADDING_ONE_SIDE && (!externWallCladding || externWallCladding === EXTERN_WALL_CLADDING_NONE) )) {
        for(let i = 0; i < TOTAL_WALL_STUD; i++) {
            let wallStudHeight = MAX_WALL_HEIGHT - (STUD_DISTANCE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1))*Math.tan(ROOF_PITCH) * i;

            let newWallStudIW = BABYLON.MeshBuilder.CreateBox("stud", {
                width: STUD_FLANGE, height: STUD_WEB, depth: wallStudHeight, updatable: true
            }, scene); 
            newWallStudIW.position.x += (STUD_DISTANCE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1))*i;
            newWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, wallStudHeight/2), false);
                            
            meshes = [...meshes, newWallStudIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
        }

        //** NOGGIN */
        for(let i = 0; i < TOTAL_WALL_STUD - 1; i++) {
            let newNogginIW = BABYLON.MeshBuilder.CreateBox("noggin", {
                width: NOGGIN_LENGTH, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
            }, scene);
            newNogginIW.setPivotMatrix(BABYLON.Matrix.Translation(NOGGIN_LENGTH/2, STUD_WEB/2, STUD_FLANGE/2), false);
            newNogginIW.position.x += (STUD_DISTANCE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1))*i;
            newNogginIW.position.z = MIN_WALL_HEIGHT/2;
            newNogginIW.position.z -= (i%2 === 0) ? 0 : 20;

            meshes = [...meshes, newNogginIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
        }
    }

    // Outerest wall stud left and right
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE 
    || (wallCladdingType === WALL_CLADDING_ONE_SIDE) && (externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE)) {
        let leftOuterWallStudIW = BABYLON.MeshBuilder.CreateBox("leftOuterStud", {
            width: STUD_FLANGE, height: STUD_WEB, depth: MAX_WALL_HEIGHT, updatable: true
        }, scene); 
        leftOuterWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, MAX_WALL_HEIGHT/2), false);

        meshes = [...meshes, leftOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

        let rightOuterWallStudIW = BABYLON.MeshBuilder.CreateBox("rightOuterStud", {
            width: STUD_FLANGE, height: STUD_WEB, depth: MIN_WALL_HEIGHT, updatable: true
        }, scene);
        rightOuterWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, MIN_WALL_HEIGHT/2), false);
        rightOuterWallStudIW.position.x += WALL_LENGTH - STUD_FLANGE;

        meshes = [...meshes, rightOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
    }

    //** PLASTER BOARD
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE || wallCladdingType === WALL_CLADDING_ONE_SIDE) {
        let pBDepth = WALL_CLADDING_MATERIALS[wallCladdingMaterial]?.["depth"];
        let pbColor = WALL_CLADDING_MATERIALS[wallCladdingMaterial]?.["color"];

        let plasterBoardCoordinates = [];

        plasterBoardCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        plasterBoardCoordinates[1] = new BABYLON.Vector3(
            plasterBoardCoordinates[0].x + WALL_LENGTH, 
            plasterBoardCoordinates[0].y, 
            plasterBoardCoordinates[0].z
        );
        plasterBoardCoordinates[2] = new BABYLON.Vector3(
            plasterBoardCoordinates[1].x, 
            plasterBoardCoordinates[1].y + MIN_WALL_HEIGHT, 
            plasterBoardCoordinates[1].z
        );
        plasterBoardCoordinates[3] = new BABYLON.Vector3(
            plasterBoardCoordinates[2].x - WALL_LENGTH, 
            plasterBoardCoordinates[0].y + MAX_WALL_HEIGHT, 
            plasterBoardCoordinates[2].z
        );
        
        let plasterBoardMeshBuilder = new BABYLON.PolygonMeshBuilder("plasterBoard", plasterBoardCoordinates, scene, earcut);    
        plasterBoard = plasterBoardMeshBuilder.build(true, pBDepth || 1);
        if(wallCladdingType === WALL_CLADDING_BOTH_SIDE) plasterBoard.position.y += STUD_FLANGE;

        let plasterBoardMat = new BABYLON.StandardMaterial("plasterBoardMat", scene);
        plasterBoardMat.diffuseColor = new BABYLON.Color3.FromHexString(pbColor || PINE_STUD_PLASTER_BOARD_COLOR);
        plasterBoardMat.backFaceCulling = false;

        meshes = [...meshes, plasterBoard];
        multiMat.subMaterials = [...multiMat.subMaterials, plasterBoardMat];
    }

    //*** EXTERN PLASTER BOARD */
    if((wallCladdingType === WALL_CLADDING_ONE_SIDE) && externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE) {
        let externPlasterBoard = plasterBoard.clone("externPlasterBoard");
        externPlasterBoard.position.y += 2*STUD_FLANGE + 1;

        let externPlasterBoardMat = new BABYLON.StandardMaterial("externPlasterBoardMat", scene);
        externPlasterBoardMat.emissiveColor = new BABYLON.Color3.FromHexString(PINE_STUD_EXTERN_PLASTER_BOARD_COLOR);
        externPlasterBoardMat.diffuseTexture = new BABYLON.Texture(`/assets/textures/walls/${externWallCladding}.jpg`);
        externPlasterBoardMat.diffuseTexture.vScale = Math.ceil(MAX_WALL_HEIGHT/STUD_DISTANCE);
        externPlasterBoardMat.diffuseTexture.uScale = 1;
        externPlasterBoardMat.backFaceCulling = false;

        meshes = [...meshes, externPlasterBoard]; 
        multiMat.subMaterials = [...multiMat.subMaterials, externPlasterBoardMat];
    }

    //*** */ NUMBERED INTERIOR WALL'S COMPONENT
    if(isCreateNewWall) {
        wallComponentIndexes[wallName] = {
            "bottomPlates": [],
            "topPlates": [],
            "studs": [],
            "noggins": [],
            "plasterBoards": [],
            "externPlasterBoards": []
        }

        let studSizeName = FURNITURE_STUD_SIZE[studSize]?.["name"];
        let wallHeightTypeName = FURNITURE_WALL_HEIGHT_TYPES[wallHeightType]?.["name"];

        //** BOTTOM PLATE
        const numBPLength3600 = Math.floor(WALL_LENGTH/360);
        let lengthBPRemain = WALL_LENGTH - (numBPLength3600 * 360);

        if(numBPLength3600 >= 1) {
            wallComponentIndexes[wallName]["bottomPlates"].push({
                "item": "Bottom plate",
                "desc": studSizeName,
                "mark": 'BP' + (++wallComponentIndexes["maxBottomPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": 3600,
                "cutLength": 3600,
                "quantity": numBPLength3600
            });
        }

        // only order framing's length >= 10cm
        if(lengthBPRemain >= 10) {
            wallComponentIndexes[wallName]["bottomPlates"].push({
                "item": "Bottom plate",
                "desc": studSizeName,
                "mark": 'BP' + (++wallComponentIndexes["maxBottomPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(lengthBPRemain * 10), -2),
                "cutLength": Math.round(lengthBPRemain * 10),        
                "quantity": 1
            });
        }

        //** TOP PLATE
        const numTPLength3600 = Math.floor(TOP_PLATE_WIDTH/360);
        let lengthTPRemain = TOP_PLATE_WIDTH - (numTPLength3600 * 360);

        if(numTPLength3600 >= 1) {
            wallComponentIndexes[wallName]["topPlates"].push({
                "item": "Top plate",
                "desc": studSizeName,
                "mark": 'TP' + (++wallComponentIndexes["maxTopPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": 3600,
                "cutLength": 3600,
                "quantity": numTPLength3600
            });
        }

        // only order framing's length >= 10cm
        if(lengthTPRemain >= 10) {
            wallComponentIndexes[wallName]["topPlates"].push({
                "item": "Top plate",
                "desc": studSizeName,
                "mark": 'TP' + (++wallComponentIndexes["maxTopPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(lengthTPRemain * 10), -2),
                "cutLength": Math.round(lengthTPRemain * 10), 
                "quantity": 1
            });
        }

        if(wallCladdingType === WALL_CLADDING_NONE 
        || (wallCladdingType === WALL_CLADDING_ONE_SIDE && (!externWallCladding || externWallCladding === EXTERN_WALL_CLADDING_NONE) )) {
            for(let i = 0; i < TOTAL_WALL_STUD; i++) {    
                let wallStudHeight = MAX_WALL_HEIGHT - (STUD_DISTANCE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1))*Math.tan(ROOF_PITCH) * i;
        
                // *** WALL STUDS
                wallComponentIndexes[wallName]["studs"].push({
                    "item": "Stud",
                    "desc": studSizeName,
                    "mark": 'S' + (++wallComponentIndexes["maxStudIdx"]),
                    "wallName": wallName,
                    "wallHeightType": wallHeightTypeName,
                    "length": floor(Math.round(wallStudHeight * 10), -2),
                    "cutLength": Math.round(wallStudHeight * 10),
                    "quantity": 1
                });
            }

            wallComponentIndexes[wallName]["noggins"].push({
                "item": "Noggin",
                "desc": studSizeName,
                "mark": 'N' + (++wallComponentIndexes["maxNogginIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(NOGGIN_LENGTH * 10), -1),
                "cutLength": Math.round(NOGGIN_LENGTH * 10),
                "quantity": TOTAL_WALL_STUD - 1
            });
        }

         //** */ OUTEREST STUD LEFT && RIGHT
        if(wallCladdingType === WALL_CLADDING_BOTH_SIDE 
       || (wallCladdingType === WALL_CLADDING_ONE_SIDE) && (externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE)) {
            wallComponentIndexes[wallName]["studs"].push({
                "item": "Stud",
                "desc": studSizeName,
                "mark": 'S' + (++wallComponentIndexes["maxStudIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(MAX_WALL_HEIGHT * 10), -2),
                "cutLength": Math.round(MAX_WALL_HEIGHT * 10),
                "quantity": 1
            });
            
            wallComponentIndexes[wallName]["studs"].push({
                "item": "Stud",
                "desc": studSizeName,
                "mark": 'S' + (++wallComponentIndexes["maxStudIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(MIN_WALL_HEIGHT * 10), -2),
                "cutLength": Math.round(MIN_WALL_HEIGHT * 10),
                "quantity": 1
            });
        }

        // *** PLASTER BOARD
        if(wallCladdingType === WALL_CLADDING_BOTH_SIDE || wallCladdingType === WALL_CLADDING_ONE_SIDE) {
            let pBName = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["name"];
            let pBLength = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["length"];
            let pBHeight = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["height"];
            let pbColorName = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["colorName"];

            let pbSheetDetails = [];

            //** 1: count for base wall fit height * width
            //** RIGHT WALL TO SHED's CENTER   
            let totalRWTCLengthSection = Math.floor(WALL_LENGTH/pBLength);
            let rWTCLengthRemain = Math.round(WALL_LENGTH - totalRWTCLengthSection*pBLength);

            let totalRWTCHeightSection = Math.floor(MIN_WALL_HEIGHT/pBHeight);
            let rWTCHeightRemain = Math.round(MIN_WALL_HEIGHT - totalRWTCHeightSection*pBHeight);
        
            pbSheetDetails.push({ 
                    size: `${pBHeight * 10} x ${pBLength * 10} (H x W)`, 
                    quantity: totalRWTCLengthSection * totalRWTCHeightSection 
                });

            // 2 ** count for remain upper wall , if each sheet have 'right height' lesser PLASTER BOARD SHEET HEIGHT,
            // we will cut 1 sheet, if each sheet have 'right height' greater PLASTER BOARD SHEET HEIGHT we will cut 2 sheet
            for(let i = 0; i < totalRWTCLengthSection; i++) {
                let nextHeightSheet = Math.round(rWTCHeightRemain + ((pBLength * (i + 1)) * Math.tan(ROOF_PITCH)));

                if(nextHeightSheet < pBHeight) {
                    pbSheetDetails.push({ 
                            size: `${nextHeightSheet * 10} x ${pBLength * 10} (H x W)`, 
                            quantity: 1
                        });
                } else {
                    pbSheetDetails[0]["quantity"]++;

                    pbSheetDetails.push({ 
                            size: `${(nextHeightSheet - pBHeight) * 10} x ${pBLength * 10} (H x W)`, 
                            quantity: 1
                        });
                }
            }

            // from right wall to Shed center's height
            let rWTCHeight = Math.round(rWTCHeightRemain + (WALL_LENGTH * Math.tan(ROOF_PITCH)));
            if(rWTCHeight < pBHeight) {
                pbSheetDetails.push({ 
                        size: `${rWTCHeight * 10} x ${rWTCLengthRemain * 10} (H x W)`, 
                        quantity: 1
                    });
            } else {
                pbSheetDetails.push({ 
                        size: `${(rWTCHeight - pBHeight) * 10} x ${rWTCLengthRemain * 10} (H x W)`, 
                        quantity: 1
                    });
            }

            // length remain
            pbSheetDetails.push({ 
                    size: `${(pBHeight) * 10} x ${rWTCLengthRemain * 10} (H x W)`, 
                    quantity: totalRWTCHeightSection + (rWTCHeight >= pBHeight ? 1 : 0)
                });

            pbSheetDetails.map(item => {
                if(item.quantity === 0) return;

                wallComponentIndexes[wallName]["plasterBoards"].push({
                    "item": "Plaster Board",
                    "desc": pBName,
                    "mark": 'PB' + (++wallComponentIndexes["maxPlasterBoardIdx"]),
                    "colour": pbColorName,
                    "wallName": wallName,
                    "wallHeightType": wallHeightTypeName,
                    "length": item.size,
                    "quantity": item.quantity
                });
            });
        }

        // *** EXTERN PLASTER BOARD
        if((wallCladdingType === WALL_CLADDING_ONE_SIDE) && externWallCladding 
        && externWallCladding !== EXTERN_WALL_CLADDING_NONE) {
            wallComponentIndexes[wallName]["plasterBoards"].map(item => {
                wallComponentIndexes[wallName]["externPlasterBoards"].push({
                    "item": "Extern Plaster Board",
                    "desc": EXTERN_WALL_CLADDINGS[externWallCladding] 
                         && EXTERN_WALL_CLADDINGS[externWallCladding]["name"],
                    "mark": 'EPB' + (++wallComponentIndexes["maxExternPlasterBoardIdx"]),
                    "wallName": wallName,
                    "wallHeightType": wallHeightTypeName,
                    "length": item.length,
                    "quantity": item.quantity
                });
            });
        }
    }

    //*** MERGE MESHES */
    let newInteriorWallMesh = BABYLON.Mesh.MergeMeshes(meshes, true, true, undefined, true);
    newInteriorWallMesh.name = wallName;

    newInteriorWallMesh.position = new BABYLON.Vector3(beginCoord.x, beginCoord.y, beginCoord.z + FLOOR_HEIGHT);
    newInteriorWallMesh.rotation.z = sign !== 0 ? -1*sign*angle : angle;

    newInteriorWallMesh.wallParams = {
        "beginCoord": {x: beginCoord.x, y: beginCoord.y, z: beginCoord.z},
        "endCoord": {x: endCoord.x, y: endCoord.y, z: endCoord.z},
        "wallType": wallType,
        "wallHeightType": wallHeightType,
        "wallLength": WALL_LENGTH,
        "minWallHeight": MIN_WALL_HEIGHT,
        "maxWallHeight": MAX_WALL_HEIGHT,
        "wallCladdingType": wallCladdingType,
        "wallCladdingMaterial": wallCladdingMaterial,
        "externWallCladding": externWallCladding,
        "studSize": studSize,
        "studWeb": studWeb,
        "studFlange": studFlange,
        "studDistance": studDistance,
    }

    // set multi material
    newInteriorWallMesh.material = multiMat;
    for(let i = 0; i < newInteriorWallMesh.subMeshes.length; i++) {
        newInteriorWallMesh.subMeshes[i].materialIndex = i;
    }

    return { wall: newInteriorWallMesh };
}

function createWallLocateLeftAndRightAlongAxisX(params, scene) {
    const { 
        name, wallType, wallHeightType, studSize, studWeb, studFlange, studDistance,
        isCreateNewWall = true, isCreateNewWallName = true, wallComponentIndexes 
    } = params;
    
    let wallName = isCreateNewWallName ? ("W" + (++wallComponentIndexes["maxWallIdx"])) : name;

    let beginCoord = params.beginCoord; 
    let endCoord = params.endCoord; 
    let wallCladdingType = params.wallCladdingType; 
    let wallCladdingMaterial = params.wallCladdingMaterial;
    let externWallCladding = params.externWallCladding;

    let vec = endCoord.subtract(beginCoord);
    vec.normalize();

    let crossVec = BABYLON.Vector3.Cross(vec, BABYLON.Axis.X);
    let sign = Math.sign(crossVec.z);

    let angle = BABYLON.Vector3.Dot(BABYLON.Axis.X, vec);
    angle = Math.acos(angle);

    const RAFTER_WIDTH = 35;
    const RAFTER_ABOVE_FLOOR = 466;
    const ROOF_PITCH = Math.PI/18;

    const WALL_LENGTH = BABYLON.Vector3.Distance(endCoord, beginCoord);
    const MIN_ROOF_HEIGHT = (wallHeightType === UNDERSIDE_OF_RAFTER_WALL) 
                          ? (RAFTER_ABOVE_FLOOR - RAFTER_WIDTH/2) : (RAFTER_ABOVE_FLOOR + RAFTER_WIDTH/2);

    const STUD_DISTANCE = studDistance;
    const STUD_WEB = studWeb;
    const STUD_FLANGE = studFlange;

    const LEFT_WALL_HEIGHT = MIN_ROOF_HEIGHT + (beginCoord.x * Math.tan(ROOF_PITCH));
    const RIGHT_WALL_HEIGHT = MIN_ROOF_HEIGHT + ((SHED_BUILDING_INFORMATION.span - endCoord.x) * Math.tan(ROOF_PITCH));

    const HALF_LEFT_WALL_LENGTH = SHED_BUILDING_INFORMATION.span/2 - beginCoord.x;
    const HALF_RIGHT_WALL_LENGTH = endCoord.x - SHED_BUILDING_INFORMATION.span/2;

    const CENTER_WALL_HEIGHT = LEFT_WALL_HEIGHT + HALF_LEFT_WALL_LENGTH * Math.tan(ROOF_PITCH);
    
    const LEFT_TOP_PLANE_WIDTH = HALF_LEFT_WALL_LENGTH/Math.cos(ROOF_PITCH);
    const RIGHT_TOP_PLANE_WIDTH = HALF_RIGHT_WALL_LENGTH/Math.cos(ROOF_PITCH);

    const TOTAL_LEFT_WALL_STUD = Math.ceil(HALF_LEFT_WALL_LENGTH/STUD_DISTANCE);
    const TOTAL_RIGHT_WALL_STUD = Math.ceil(HALF_RIGHT_WALL_LENGTH/STUD_DISTANCE);

    const LEFT_WALL_STUD_DISTANCE_OFFSET = (HALF_LEFT_WALL_LENGTH - (TOTAL_LEFT_WALL_STUD-1)*STUD_DISTANCE);
    const RIGHT_WALL_STUD_DISTANCE_OFFSET = (HALF_RIGHT_WALL_LENGTH - (TOTAL_RIGHT_WALL_STUD-1)*STUD_DISTANCE);

    let meshes = [];
    let plasterBoard;

    let multiMat = new BABYLON.MultiMaterial('multi', scene);
    let interiorMat = new BABYLON.StandardMaterial("interiorMat", scene);
    interiorMat.diffuseColor = new BABYLON.Color3.FromHexString(PINE_STUD_INTERIOR_WALL_COLOR);
    interiorMat.backFaceCulling = false;

    // ** BOTTOM PLATE
    let bottomPlateIW = BABYLON.MeshBuilder.CreateBox("bottomPlate", {
        width: WALL_LENGTH, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
    }, scene);
    bottomPlateIW.setPivotMatrix(BABYLON.Matrix.Translation(WALL_LENGTH/2, STUD_WEB/2, STUD_FLANGE/2), false);

    meshes = [...meshes, bottomPlateIW];
    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

    //** TOP PLATE
    let leftTopPlateMesh = BABYLON.MeshBuilder.CreateBox("leftTopPlate", {
        width: LEFT_TOP_PLANE_WIDTH, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
    }, scene);
    
    leftTopPlateMesh.position.z = LEFT_WALL_HEIGHT;
    leftTopPlateMesh.rotation.y = -ROOF_PITCH;  
    leftTopPlateMesh.setPivotMatrix(BABYLON.Matrix.Translation(LEFT_TOP_PLANE_WIDTH/2, STUD_WEB/2, STUD_FLANGE/2), false);
    
    meshes = [...meshes, leftTopPlateMesh];
    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

    let rightTopPlateMesh = BABYLON.MeshBuilder.CreateBox("rightTopPlate", {
        width: RIGHT_TOP_PLANE_WIDTH, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
    }, scene);
    
    rightTopPlateMesh.position.x = HALF_LEFT_WALL_LENGTH;
    rightTopPlateMesh.position.z = MIN_ROOF_HEIGHT + (SHED_BUILDING_INFORMATION.span/2 * Math.tan(ROOF_PITCH));
    rightTopPlateMesh.rotation.y = ROOF_PITCH;  
    rightTopPlateMesh.setPivotMatrix(BABYLON.Matrix.Translation(RIGHT_TOP_PLANE_WIDTH/2, STUD_WEB/2, STUD_FLANGE/2), false);
    
    meshes = [...meshes, rightTopPlateMesh];
    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

    //***** WALL STUD && NOGGIN */
    if( wallCladdingType === WALL_CLADDING_NONE 
    || (wallCladdingType === WALL_CLADDING_ONE_SIDE && (!externWallCladding || externWallCladding === EXTERN_WALL_CLADDING_NONE) )) {
        for(let i = 0; i < TOTAL_LEFT_WALL_STUD; i++) {  
            let leftWallStudHeight = MIN_ROOF_HEIGHT + (beginCoord.x + (STUD_DISTANCE + LEFT_WALL_STUD_DISTANCE_OFFSET/(TOTAL_LEFT_WALL_STUD-1))*i) * Math.tan(ROOF_PITCH);

            let newWallStudIW = BABYLON.MeshBuilder.CreateBox("leftStud", {
                width: STUD_FLANGE, height: STUD_WEB, depth: leftWallStudHeight, updatable: true
            }, scene); 

            if(i !== TOTAL_LEFT_WALL_STUD - 1) {
                newWallStudIW.position.x += (STUD_DISTANCE + LEFT_WALL_STUD_DISTANCE_OFFSET/(TOTAL_LEFT_WALL_STUD-1))*i;
            } else {
                newWallStudIW.position.x = HALF_LEFT_WALL_LENGTH;
            }
            newWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, leftWallStudHeight/2), false);

            meshes = [...meshes, newWallStudIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
        }

        for(let i = 1; i < TOTAL_RIGHT_WALL_STUD; i++) { 
            let rightWallStudHeight = MIN_ROOF_HEIGHT + (SHED_BUILDING_INFORMATION.span/2 - (STUD_DISTANCE + RIGHT_WALL_STUD_DISTANCE_OFFSET/(TOTAL_RIGHT_WALL_STUD-1))*i) * Math.tan(ROOF_PITCH);

            let newWallStudIW = BABYLON.MeshBuilder.CreateBox("rightStud", {
                width: STUD_FLANGE, height: STUD_WEB, depth: rightWallStudHeight, updatable: true
            }, scene); 

            if(i !== TOTAL_RIGHT_WALL_STUD - 1) {
                newWallStudIW.position.x += HALF_LEFT_WALL_LENGTH + (STUD_DISTANCE + RIGHT_WALL_STUD_DISTANCE_OFFSET/(TOTAL_RIGHT_WALL_STUD - 1))*i;
            } else {
                newWallStudIW.position.x = WALL_LENGTH;
            }
            newWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, rightWallStudHeight/2), false);

            meshes = [...meshes, newWallStudIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
        }

        //*** NOGGIN */ 
        const LEFT_NOGGIN_LENGTH = (STUD_DISTANCE + STUD_FLANGE) + LEFT_WALL_STUD_DISTANCE_OFFSET/(TOTAL_LEFT_WALL_STUD-1);

        for(let i = 0; i < TOTAL_LEFT_WALL_STUD - 1; i++) {
            let newNogginIW = BABYLON.MeshBuilder.CreateBox("leftNoggin", {
                width: LEFT_NOGGIN_LENGTH, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
            }, scene);
            newNogginIW.setPivotMatrix(BABYLON.Matrix.Translation(LEFT_NOGGIN_LENGTH/2, STUD_WEB/2, STUD_FLANGE/2), false);
            newNogginIW.position.x += (STUD_DISTANCE + LEFT_WALL_STUD_DISTANCE_OFFSET/(TOTAL_LEFT_WALL_STUD-1))*i;
            newNogginIW.position.z = (i%2 === 0) ? LEFT_WALL_HEIGHT/2 : LEFT_WALL_HEIGHT/2 - 20;

            meshes = [...meshes, newNogginIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
        }

        const RIGHT_NOGGIN_LENGTH = (STUD_DISTANCE + STUD_FLANGE) + RIGHT_WALL_STUD_DISTANCE_OFFSET/(TOTAL_RIGHT_WALL_STUD-1);

        for(let i = 0; i < TOTAL_RIGHT_WALL_STUD - 1; i++) {
            let newNogginIW = BABYLON.MeshBuilder.CreateBox("rightNoggin", {
                width: RIGHT_NOGGIN_LENGTH, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
            }, scene);
            newNogginIW.setPivotMatrix(BABYLON.Matrix.Translation(RIGHT_NOGGIN_LENGTH/2, STUD_WEB/2, STUD_FLANGE/2), false);
            newNogginIW.position.x += HALF_LEFT_WALL_LENGTH + (STUD_DISTANCE + RIGHT_WALL_STUD_DISTANCE_OFFSET/(TOTAL_RIGHT_WALL_STUD - 1))*i;

            if(TOTAL_LEFT_WALL_STUD%2 === 0)
                newNogginIW.position.z = (i%2 === 0) ? (LEFT_WALL_HEIGHT/2 - 20) : LEFT_WALL_HEIGHT/2;
            else 
                newNogginIW.position.z = (i%2 === 0) ? LEFT_WALL_HEIGHT/2 : (LEFT_WALL_HEIGHT/2 - 20);

            meshes = [...meshes, newNogginIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
        }
    }

    // 2 outer wall stud left and right
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE 
   || (wallCladdingType === WALL_CLADDING_ONE_SIDE) && (externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE)) {
        let leftOuterWallStudIW = BABYLON.MeshBuilder.CreateBox("leftOuterStud", {
            width: STUD_FLANGE, height: STUD_WEB, depth: LEFT_WALL_HEIGHT, updatable: true
        }, scene); 
        leftOuterWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, LEFT_WALL_HEIGHT/2), false);

        meshes = [...meshes, leftOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

        let rightOuterWallStudIW = BABYLON.MeshBuilder.CreateBox("rightOuterStud", {
            width: STUD_FLANGE, height: STUD_WEB, depth: RIGHT_WALL_HEIGHT, updatable: true
        }, scene);
        rightOuterWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, RIGHT_WALL_HEIGHT/2), false);
        rightOuterWallStudIW.position.x += WALL_LENGTH - STUD_FLANGE;

        meshes = [...meshes, rightOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
    }

    //** PLASTER BOARD
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE || wallCladdingType === WALL_CLADDING_ONE_SIDE) {
        let pBDepth = WALL_CLADDING_MATERIALS[wallCladdingMaterial]?.["depth"];
        let pbColor = WALL_CLADDING_MATERIALS[wallCladdingMaterial]?.["color"];

        let plasterBoardCoordinates = [];

        plasterBoardCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        plasterBoardCoordinates[1] = new BABYLON.Vector3(
            plasterBoardCoordinates[0].x + WALL_LENGTH, 
            plasterBoardCoordinates[0].y, 
            plasterBoardCoordinates[0].z
        );
        plasterBoardCoordinates[2] = new BABYLON.Vector3(
            plasterBoardCoordinates[1].x, 
            plasterBoardCoordinates[1].y + RIGHT_WALL_HEIGHT, 
            plasterBoardCoordinates[1].z
        );
        plasterBoardCoordinates[3] = new BABYLON.Vector3(
            plasterBoardCoordinates[2].x - HALF_RIGHT_WALL_LENGTH, 
            plasterBoardCoordinates[2].y + HALF_RIGHT_WALL_LENGTH * Math.tan(ROOF_PITCH), 
            plasterBoardCoordinates[2].z
        );
        plasterBoardCoordinates[4] = new BABYLON.Vector3(
            plasterBoardCoordinates[0].x, 
            plasterBoardCoordinates[0].y + LEFT_WALL_HEIGHT, 
            plasterBoardCoordinates[0].z
        );
        
        let plasterBoardMeshBuilder = new BABYLON.PolygonMeshBuilder("plasterBoard", plasterBoardCoordinates, scene, earcut);    
        plasterBoard = plasterBoardMeshBuilder.build(true, pBDepth || 1);
        if(wallCladdingType === WALL_CLADDING_BOTH_SIDE) plasterBoard.position.y += STUD_FLANGE;

        let plasterBoardMat = new BABYLON.StandardMaterial("plasterBoardMat", scene);
        plasterBoardMat.diffuseColor = new BABYLON.Color3.FromHexString(pbColor || PINE_STUD_PLASTER_BOARD_COLOR);
        plasterBoardMat.backFaceCulling = false;

        meshes = [...meshes, plasterBoard];
        multiMat.subMaterials = [...multiMat.subMaterials, plasterBoardMat];
    }

    //*** EXTERN PLASTER BOARD
    if((wallCladdingType === WALL_CLADDING_ONE_SIDE) 
     && externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE) {
        let externPlasterBoard = plasterBoard.clone("externPlasterBoard");
        externPlasterBoard.position.y += 2*STUD_FLANGE + 1;

        let externPlasterBoardMat = new BABYLON.StandardMaterial("externPlasterBoardMat", scene);
        externPlasterBoardMat.emissiveColor = new BABYLON.Color3.FromHexString(PINE_STUD_EXTERN_PLASTER_BOARD_COLOR);
        externPlasterBoardMat.diffuseTexture = new BABYLON.Texture(`/assets/textures/walls/${externWallCladding}.jpg`);
        externPlasterBoardMat.diffuseTexture.vScale = Math.ceil(CENTER_WALL_HEIGHT/STUD_DISTANCE);
        externPlasterBoardMat.diffuseTexture.uScale = 1;
        externPlasterBoardMat.backFaceCulling = false;

        meshes = [...meshes, externPlasterBoard]; 
        multiMat.subMaterials = [...multiMat.subMaterials, externPlasterBoardMat];
    }

    //*** */ NUMBERED INTERIOR WALL'S COMPONENT
    if(isCreateNewWall) {
        wallComponentIndexes[wallName] = {
            "bottomPlates": [],
            "topPlates": [],
            "studs": [],
            "noggins": [],
            "plasterBoards": [],
            "externPlasterBoards": []
        }

        let studSizeName = FURNITURE_STUD_SIZE[studSize]?.["name"];
        let wallHeightTypeName = FURNITURE_WALL_HEIGHT_TYPES[wallHeightType]?.["name"];

        //** BOTTOM PLATE
        const numBPLength3600 = floor(WALL_LENGTH/360, 0);
        let lengthBPRemain = WALL_LENGTH - (numBPLength3600 * 360);

        if(numBPLength3600 >= 1) {
            wallComponentIndexes[wallName]["bottomPlates"].push({
                "item": "Bottom plate",
                "desc": studSizeName,
                "mark": 'BP' + (++wallComponentIndexes["maxBottomPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": 3600,
                "cutLength": 3600,
                "quantity": numBPLength3600
            });
        }

        // only order framing's length >= 10cm
        if(lengthBPRemain >= 10) {
            wallComponentIndexes[wallName]["bottomPlates"].push({
                "item": "Bottom plate",
                "desc": studSizeName,
                "mark": 'BP' + (++wallComponentIndexes["maxBottomPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(lengthBPRemain * 10), -2),
                "cutLength": Math.round(lengthBPRemain * 10),        
                "quantity": 1
            });
        }

        //** TOP PLATE
        const numLTPLength3600 = floor(LEFT_TOP_PLANE_WIDTH/360, 0);
        let lengthLTPRemain = LEFT_TOP_PLANE_WIDTH - (numLTPLength3600 * 360);

        if(numLTPLength3600 >= 1) {
            wallComponentIndexes[wallName]["topPlates"].push({
                "item": "Top plate",
                "desc": studSizeName,
                "mark": 'TP' + (++wallComponentIndexes["maxTopPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": 3600,
                "cutLength": 3600,
                "quantity": numLTPLength3600
            });
        }

        // only order framing's length >= 10cm
        if(lengthLTPRemain >= 10) {
            wallComponentIndexes[wallName]["topPlates"].push({
                "item": "Top plate",
                "desc": studSizeName,
                "mark": 'TP' + (++wallComponentIndexes["maxTopPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(lengthLTPRemain * 10), -2),
                "cutLength": Math.round(lengthLTPRemain * 10), 
                "quantity": 1
            });
        }

        const numRTPLength3600 = floor(RIGHT_TOP_PLANE_WIDTH/360, 0);
        let lengthRTPRemain = RIGHT_TOP_PLANE_WIDTH - (numRTPLength3600 * 360);

        if(numRTPLength3600 >= 1) {
            wallComponentIndexes[wallName]["topPlates"].push({
                "item": "Top plate",
                "desc": studSizeName,
                "mark": 'TP' + (++wallComponentIndexes["maxTopPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": 3600,
                "cutLength": 3600,
                "quantity": numRTPLength3600
            });
        }

        // only order framing's length >= 10cm
        if(lengthRTPRemain >= 10) {
            wallComponentIndexes[wallName]["topPlates"].push({
                "item": "Top plate",
                "desc": studSizeName,
                "mark": 'TP' + (++wallComponentIndexes["maxTopPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(lengthRTPRemain * 10), -2),
                "cutLength": Math.round(lengthRTPRemain * 10), 
                "quantity": 1
            });
        }

        if(wallCladdingType === WALL_CLADDING_NONE 
        || (wallCladdingType === WALL_CLADDING_ONE_SIDE && (!externWallCladding || externWallCladding === EXTERN_WALL_CLADDING_NONE) )) {
            // *** WALL STUDS
            for(let i = 0; i < TOTAL_LEFT_WALL_STUD; i++) {  
                let leftWallStudHeight = MIN_ROOF_HEIGHT + (beginCoord.x + (STUD_DISTANCE + LEFT_WALL_STUD_DISTANCE_OFFSET/(TOTAL_LEFT_WALL_STUD-1))*i) * Math.tan(ROOF_PITCH);
    
                wallComponentIndexes[wallName]["studs"].push({
                    "item": "Stud",
                    "desc": studSizeName,
                    "mark": 'S' + (++wallComponentIndexes["maxStudIdx"]),
                    "wallName": wallName,
                    "wallHeightType": wallHeightTypeName,
                    "length": floor(Math.round(leftWallStudHeight * 10), -2),
                    "cutLength": Math.round(leftWallStudHeight * 10),
                    "quantity": 1
                });
            }

            for(let i = 1; i < TOTAL_RIGHT_WALL_STUD; i++) { 
                let rightWallStudHeight = MIN_ROOF_HEIGHT + (SHED_BUILDING_INFORMATION.span/2 - (STUD_DISTANCE + RIGHT_WALL_STUD_DISTANCE_OFFSET/(TOTAL_RIGHT_WALL_STUD-1))*i) * Math.tan(ROOF_PITCH);
    
                wallComponentIndexes[wallName]["studs"].push({
                    "item": "Stud",
                    "desc": studSizeName,
                    "mark": 'S' + (++wallComponentIndexes["maxStudIdx"]),
                    "wallName": wallName,
                    "wallHeightType": wallHeightTypeName,
                    "length": floor(Math.round(rightWallStudHeight * 10), -2),
                    "cutLength": Math.round(rightWallStudHeight * 10),
                    "quantity": 1
                });
            }

            //** NOGGINS */
            const LEFT_NOGGIN_LENGTH = (STUD_DISTANCE + STUD_FLANGE) + LEFT_WALL_STUD_DISTANCE_OFFSET/(TOTAL_LEFT_WALL_STUD-1);

            wallComponentIndexes[wallName]["noggins"].push({
                "item": "Noggin",
                "desc": studSizeName,
                "mark": 'N' + (++wallComponentIndexes["maxNogginIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(LEFT_NOGGIN_LENGTH * 10), -1),
                "cutLength": Math.round(LEFT_NOGGIN_LENGTH * 10),
                "quantity": TOTAL_LEFT_WALL_STUD - 1
            });

            const RIGHT_NOGGIN_LENGTH = (STUD_DISTANCE + STUD_FLANGE) + RIGHT_WALL_STUD_DISTANCE_OFFSET/(TOTAL_RIGHT_WALL_STUD-1);

            wallComponentIndexes[wallName]["noggins"].push({
                "item": "Noggin",
                "desc": studSizeName,
                "mark": 'N' + (++wallComponentIndexes["maxNogginIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(RIGHT_NOGGIN_LENGTH * 10), -1),
                "cutLength": Math.round(RIGHT_NOGGIN_LENGTH * 10),
                "quantity": TOTAL_RIGHT_WALL_STUD - 1
            });
        }
        
        //** */ OUTEREST STUD LEFT && RIGHT
        if(wallCladdingType === WALL_CLADDING_BOTH_SIDE 
        || (wallCladdingType === WALL_CLADDING_ONE_SIDE) && (externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE)) {
            wallComponentIndexes[wallName]["studs"].push({
                "item": "Stud",
                "desc": studSizeName,
                "mark": 'S' + (++wallComponentIndexes["maxStudIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(LEFT_WALL_HEIGHT * 10), -2),
                "cutLength": Math.round(LEFT_WALL_HEIGHT * 10),
                "quantity": 1
            });

            wallComponentIndexes[wallName]["studs"].push({
                "item": "Stud",
                "desc": studSizeName,
                "mark": 'S' + (++wallComponentIndexes["maxStudIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(RIGHT_WALL_HEIGHT * 10), -2),
                "cutLength": Math.round(RIGHT_WALL_HEIGHT * 10),
                "quantity": 1
            });
        }

        // *** PLASTER BOARD
        if(wallCladdingType === WALL_CLADDING_BOTH_SIDE || wallCladdingType === WALL_CLADDING_ONE_SIDE) {
            let pBName = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["name"];
            let pBLength = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["length"];
            let pBHeight = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["height"];
            let pbColorName = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["colorName"];
    
            let pbSheetDetails = [];
    
            //** LEFT WALL TO SHED's CENTER
            let totalLWTCLengthSection = Math.floor(HALF_LEFT_WALL_LENGTH/pBLength);
            let lWTCLengthRemain = Math.round(HALF_LEFT_WALL_LENGTH - totalLWTCLengthSection*pBLength);
    
            let totalLWTCHeightSection = Math.floor(LEFT_WALL_HEIGHT/pBHeight);
            let lWTCHeightRemain = Math.round(LEFT_WALL_HEIGHT - totalLWTCHeightSection*pBHeight);
    
            pbSheetDetails.push({ 
                    size: `${pBHeight * 10} x ${pBLength * 10} (H x W)`, 
                    quantity: totalLWTCLengthSection * totalLWTCHeightSection 
                });
    
            for(let i = 0; i < totalLWTCLengthSection; i++) {
                let nextHeightSheet = Math.round(lWTCHeightRemain + 
                                      ((pBLength * (i + 1)) * Math.tan(ROOF_PITCH)));
    
                if(nextHeightSheet < pBHeight) {
                    pbSheetDetails.push({ 
                            size: `${nextHeightSheet * 10} x ${pBLength * 10} (H x W)`, 
                            quantity: 1
                        });
                } else {
                    pbSheetDetails[0]["quantity"]++;
    
                    pbSheetDetails.push({ 
                            size: `${(nextHeightSheet - pBHeight) * 10} x ${pBLength * 10} (H x W)`, 
                            quantity: 1
                        });
                }
            }
    
            // from left wall to Shed center's height
            let lWTCHeight = Math.round(lWTCHeightRemain + (HALF_LEFT_WALL_LENGTH * Math.tan(ROOF_PITCH)));
    
            if(lWTCHeight < pBHeight) {
                pbSheetDetails.push({ 
                        size: `${lWTCHeight * 10} x ${lWTCLengthRemain * 10} (H x W)`, 
                        quantity: 1
                    });
            } else {
                pbSheetDetails.push({ 
                        size: `${pBHeight * 10} x ${lWTCLengthRemain * 10} (H x W)`, 
                        quantity: 1
                    });
    
                pbSheetDetails.push({ 
                        size: `${(lWTCHeight - pBHeight) * 10} x ${lWTCLengthRemain * 10} (H x W)`, 
                        quantity: 1
                    });
            }
    
            //** FROM RIGHT WALL TO SHED's CENTER
            let totalRWTCLengthSection = Math.floor(HALF_RIGHT_WALL_LENGTH/pBLength);
            let rWTCLengthRemain = Math.round(HALF_RIGHT_WALL_LENGTH - totalRWTCLengthSection*pBLength);
    
            let totalRWTCHeightSection = Math.floor(RIGHT_WALL_HEIGHT/pBHeight);
            let rWTCHeightRemain = Math.round(RIGHT_WALL_HEIGHT - totalRWTCHeightSection*pBHeight);
    
            pbSheetDetails[0]["quantity"] += totalRWTCLengthSection * totalRWTCHeightSection;
    
            for(let i = 0; i < totalRWTCLengthSection; i++) {
                let nextHeightSheet = Math.round(rWTCLengthRemain + 
                                     ((pBLength * (i + 1)) * Math.tan(ROOF_PITCH)));
    
                if(nextHeightSheet < pBHeight) {
                    pbSheetDetails.push({ 
                            size: `${nextHeightSheet * 10} x ${pBLength * 10} (H x W)`, 
                            quantity: 1
                        });
                } else {
                    pbSheetDetails[0]["quantity"]++;
    
                    pbSheetDetails.push({ 
                            size: `${(nextHeightSheet - pBHeight) * 10} x ${pBLength * 10} (H x W)`, 
                            quantity: 1
                        });
                }
            }
    
            // from right wall to Shed center's height
            let rWTCHeight = Math.round(rWTCHeightRemain + (HALF_LEFT_WALL_LENGTH * Math.tan(ROOF_PITCH)));
    
            if(rWTCHeight < pBHeight) {
                pbSheetDetails.push({ 
                        size: `${rWTCHeight * 10} x ${rWTCLengthRemain * 10} (H x W)`, 
                        quantity: 1
                    });
            } else {
                pbSheetDetails.push({ 
                        size: `${pBHeight * 10} x ${rWTCLengthRemain * 10} (H x W)`, 
                        quantity: 1
                    });
    
                pbSheetDetails.push({ 
                        size: `${(rWTCHeight - pBHeight) * 10} x ${rWTCLengthRemain * 10} (H x W)`, 
                        quantity: 1
                    });
            }
    
            // if total length of lWTCLength Remain + rwTCLength Remain <= pbLength,
            // we will compound it   
            if((lWTCLengthRemain + rWTCLengthRemain <= pBLength) 
            && (totalLWTCHeightSection === totalRWTCHeightSection)) {
                pbSheetDetails.push({ 
                    size: `${(pBHeight) * 10} x ${(lWTCLengthRemain + rWTCLengthRemain) * 10} (H x W) - Compound`, 
                    quantity: totalLWTCHeightSection,
                });
            } else {
                pbSheetDetails.push({ 
                    size: `${(pBHeight) * 10} x ${lWTCLengthRemain * 10} (H x W)`, 
                    quantity: totalLWTCHeightSection,
                });
    
                pbSheetDetails.push({ 
                    size: `${(pBHeight) * 10} x ${rWTCLengthRemain * 10} (H x W)`, 
                    quantity: totalRWTCHeightSection,
                });
            }
    
            pbSheetDetails.map(item => {
                if(item.quantity === 0) return;

                wallComponentIndexes[wallName]["plasterBoards"].push({
                    "item": "Plaster Board",
                    "desc": pBName,
                    "mark": 'PB' + (++wallComponentIndexes["maxPlasterBoardIdx"]),
                    "colour": pbColorName,
                    "wallName": wallName,
                    "wallHeightType": wallHeightTypeName,
                    "length": item.size,
                    "quantity": item.quantity
                });
            });
        }

        // *** EXTERN PLASTER BOARD
        if((wallCladdingType === WALL_CLADDING_ONE_SIDE) && externWallCladding 
        && externWallCladding !== EXTERN_WALL_CLADDING_NONE) {
            wallComponentIndexes[wallName]["plasterBoards"].map(item => { 
                wallComponentIndexes[wallName]["externPlasterBoards"].push({
                    "item": "Extern Plaster Board",
                    "desc": EXTERN_WALL_CLADDINGS[externWallCladding] 
                         && EXTERN_WALL_CLADDINGS[externWallCladding]["name"],
                    "mark": 'EPB' + (++wallComponentIndexes["maxExternPlasterBoardIdx"]),
                    "wallName": wallName,
                    "wallHeightType": wallHeightTypeName,
                    "length": item.length,
                    "quantity": item.quantity
                });
            });
        }
    }

    //*** MERGE MESHES */  
    let newInteriorWallMesh = BABYLON.Mesh.MergeMeshes(meshes, true, true, undefined, true);
    newInteriorWallMesh.name = wallName;

    newInteriorWallMesh.position = new BABYLON.Vector3(beginCoord.x, beginCoord.y, beginCoord.z + FLOOR_HEIGHT);
    newInteriorWallMesh.rotation.z = sign !== 0 ? -1*sign*angle : angle;

    newInteriorWallMesh.wallParams = {
        "beginCoord": {x: beginCoord.x, y: beginCoord.y, z: beginCoord.z},
        "endCoord": {x: endCoord.x, y: endCoord.y, z: endCoord.z},
        "wallType": wallType,
        "wallHeightType": wallHeightType,
        "wallLength": WALL_LENGTH,
        "leftWallHeight": LEFT_WALL_HEIGHT,
        "rightWallHeight": RIGHT_WALL_HEIGHT,
        "wallCladdingType": wallCladdingType,
        "wallCladdingMaterial": wallCladdingMaterial,
        "externWallCladding": externWallCladding,
        "studSize": studSize,
        "studWeb": studWeb,
        "studFlange": studFlange,
        "studDistance": studDistance,
    }

    // set multi material
    newInteriorWallMesh.material = multiMat;
    for(let i = 0; i < newInteriorWallMesh.subMeshes.length; i++) {
        newInteriorWallMesh.subMeshes[i].materialIndex = i;
    }

    return { wall: newInteriorWallMesh };
}

function createWallLocateAlongAxisY(params, scene) {
    const { 
        name, wallType, wallHeightType, wallHeight, 
        studSize, studWeb, studFlange, studDistance, 
        isCreateNewWall = true, isCreateNewWallName = true, wallComponentIndexes
    } = params;

    let wallName = isCreateNewWallName ? ("W" + (++wallComponentIndexes["maxWallIdx"])) : name;

    let beginCoord = params.beginCoord; 
    let endCoord = params.endCoord; 
    let wallCladdingType = params.wallCladdingType; 
    let wallCladdingMaterial = params.wallCladdingMaterial;
    let externWallCladding = params.externWallCladding;

    let vec = endCoord.subtract(beginCoord);
    vec.normalize();

    let crossVec = BABYLON.Vector3.Cross(vec, BABYLON.Axis.X);
    let sign = Math.sign(crossVec.z);

    let angle = BABYLON.Vector3.Dot(BABYLON.Axis.X, vec);
    angle = Math.acos(angle);

    const RAFTER_WIDTH = 35;
    const RAFTER_ABOVE_FLOOR = 466;
    const ROOF_PITCH = Math.PI/18;

    const WALL_LENGTH = BABYLON.Vector3.Distance(endCoord, beginCoord);
    const MIN_ROOF_HEIGHT = (wallHeightType === UNDERSIDE_OF_RAFTER_WALL) 
                          ? (RAFTER_ABOVE_FLOOR - RAFTER_WIDTH/2) : (RAFTER_ABOVE_FLOOR + RAFTER_WIDTH/2);

    const STUD_DISTANCE = studDistance;
    const STUD_WEB = studWeb;
    const STUD_FLANGE = studFlange;

    let WALL_HEIGHT = beginCoord.x - SHED_BUILDING_INFORMATION.span/2 < 0 ? 
                            MIN_ROOF_HEIGHT + (beginCoord.x * Math.tan(ROOF_PITCH)) :
                            MIN_ROOF_HEIGHT + ((SHED_BUILDING_INFORMATION.span - beginCoord.x) * Math.tan(ROOF_PITCH));

    const TOTAL_WALL_STUD = Math.ceil(WALL_LENGTH/STUD_DISTANCE);
    const STUD_DISTANCE_OFFSET = (WALL_LENGTH - (TOTAL_WALL_STUD-1)*STUD_DISTANCE) - STUD_FLANGE;

    const NOGGIN_LENGTH = STUD_DISTANCE + STUD_FLANGE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1);

    let meshes = [];
    let plasterBoard;

    let multiMat = new BABYLON.MultiMaterial('multi', scene);
    let interiorMat = new BABYLON.StandardMaterial("interiorMat", scene);
    interiorMat.diffuseColor = new BABYLON.Color3.FromHexString(PINE_STUD_INTERIOR_WALL_COLOR);
    interiorMat.backFaceCulling = false;

    // ** BOTTOM PLATE
    let bottomPlateIW = BABYLON.MeshBuilder.CreateBox("bottomPlate", {
        width: WALL_LENGTH, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
    }, scene);
    bottomPlateIW.setPivotMatrix(BABYLON.Matrix.Translation(WALL_LENGTH/2, STUD_WEB/2, STUD_FLANGE/2), false);

    meshes = [...meshes, bottomPlateIW];
    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

    //** TOP PLATE
    let topPlateIW = BABYLON.MeshBuilder.CreateBox("topPlate", {
        width: WALL_LENGTH, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
    }, scene);
    
    topPlateIW.setPivotMatrix(BABYLON.Matrix.Translation(WALL_LENGTH/2, STUD_WEB/2, STUD_FLANGE/2), false);
    topPlateIW.position.z = WALL_HEIGHT;

    meshes = [...meshes, topPlateIW];
    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

    //*** WALL STUD */
    if( wallCladdingType === WALL_CLADDING_NONE 
    || (wallCladdingType === WALL_CLADDING_ONE_SIDE && (!externWallCladding || externWallCladding === EXTERN_WALL_CLADDING_NONE) )) {
        for(let i = 0; i < TOTAL_WALL_STUD; i++) { 
            let newWallStudIW = BABYLON.MeshBuilder.CreateBox("stud", {
                width: STUD_FLANGE, height: STUD_WEB, depth: WALL_HEIGHT, updatable: true
            }, scene); 
            newWallStudIW.position.x += (STUD_DISTANCE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1))*i;
            newWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, WALL_HEIGHT/2), false);

            meshes = [...meshes, newWallStudIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
        }
        
        //*** NOGGIN */
        for(let i = 0; i < TOTAL_WALL_STUD - 1; i++) {
            let newNogginIW = BABYLON.MeshBuilder.CreateBox("noggin", {
                width: NOGGIN_LENGTH, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
            }, scene);
            newNogginIW.setPivotMatrix(BABYLON.Matrix.Translation(NOGGIN_LENGTH/2, STUD_WEB/2, STUD_FLANGE/2), false);
            newNogginIW.position.x += (STUD_DISTANCE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1))*i;
            newNogginIW.position.z = (i%2 === 0) ? WALL_HEIGHT/2 : (WALL_HEIGHT/2 - 20);

            meshes = [...meshes, newNogginIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
        }
    }
    
    //*** Outerest wall stud left and right
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE 
    || (wallCladdingType === WALL_CLADDING_ONE_SIDE) && (externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE)) {
        let leftOuterWallStudIW = BABYLON.MeshBuilder.CreateBox("leftOuterStud", {
            width: STUD_FLANGE, height: STUD_WEB, depth: WALL_HEIGHT, updatable: true
        }, scene); 
        leftOuterWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, WALL_HEIGHT/2), false);

        meshes = [...meshes, leftOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

        let rightOuterWallStudIW = leftOuterWallStudIW.clone("rightOutertud"); 
        rightOuterWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, WALL_HEIGHT/2), false);
        rightOuterWallStudIW.position.x += WALL_LENGTH;

        meshes = [...meshes, rightOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
    }

    //** PLASTER BOARD
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE || wallCladdingType === WALL_CLADDING_ONE_SIDE) {
        let pBDepth = WALL_CLADDING_MATERIALS[wallCladdingMaterial]?.["depth"];
        let pbColor = WALL_CLADDING_MATERIALS[wallCladdingMaterial]?.["color"];

        let plasterBoardCoordinates = [];

        plasterBoardCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        plasterBoardCoordinates[1] = new BABYLON.Vector3(
            plasterBoardCoordinates[0].x + WALL_LENGTH, 
            plasterBoardCoordinates[0].y, 
            plasterBoardCoordinates[0].z
        );
        plasterBoardCoordinates[2] = new BABYLON.Vector3(
            plasterBoardCoordinates[1].x, 
            plasterBoardCoordinates[1].y + WALL_HEIGHT, 
            plasterBoardCoordinates[1].z
        );
        plasterBoardCoordinates[3] = new BABYLON.Vector3(
            plasterBoardCoordinates[2].x - WALL_LENGTH, 
            plasterBoardCoordinates[0].y + WALL_HEIGHT, 
            plasterBoardCoordinates[2].z
        );
        
        let plasterBoardMeshBuilder = new BABYLON.PolygonMeshBuilder("plasterBoard", plasterBoardCoordinates, scene, earcut);    
        plasterBoard = plasterBoardMeshBuilder.build(true, pBDepth || 1);
        if(wallCladdingType === WALL_CLADDING_BOTH_SIDE) plasterBoard.position.y += STUD_FLANGE;

        let plasterBoardMat = new BABYLON.StandardMaterial("plasterBoardMat", scene);
        plasterBoardMat.diffuseColor = new BABYLON.Color3.FromHexString(pbColor || PINE_STUD_PLASTER_BOARD_COLOR);
        plasterBoardMat.backFaceCulling = false;

        meshes = [...meshes, plasterBoard];
        multiMat.subMaterials = [...multiMat.subMaterials, plasterBoardMat];
    }

    //*** EXTERN PLASTER BOARD
    if((wallCladdingType === WALL_CLADDING_ONE_SIDE) 
    && externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE) {
        let externPlasterBoard = plasterBoard.clone("externPlasterBoard");
        externPlasterBoard.position.y += 2*STUD_FLANGE + 1;

        let externPlasterBoardMat = new BABYLON.StandardMaterial("externPlasterBoardMat", scene);
        externPlasterBoardMat.emissiveColor = new BABYLON.Color3.FromHexString(PINE_STUD_EXTERN_PLASTER_BOARD_COLOR);
        externPlasterBoardMat.diffuseTexture = new BABYLON.Texture(`/assets/textures/walls/${externWallCladding}.jpg`);
        externPlasterBoardMat.diffuseTexture.vScale = Math.ceil(WALL_HEIGHT/STUD_DISTANCE);
        externPlasterBoardMat.diffuseTexture.uScale = 1;
        externPlasterBoardMat.backFaceCulling = false;

        meshes = [...meshes, externPlasterBoard]; 
        multiMat.subMaterials = [...multiMat.subMaterials, externPlasterBoardMat];
    }

    //*** */ NUMBERED INTERIOR WALL'S COMPONENT
    if(isCreateNewWall) {
        wallComponentIndexes[wallName] = {
            "bottomPlates": [],
            "topPlates": [],
            "studs": [],
            "noggins": [],
            "plasterBoards": [],
            "externPlasterBoards": []
        }

        let studSizeName = FURNITURE_STUD_SIZE[studSize]?.["name"];
        let wallHeightTypeName = FURNITURE_WALL_HEIGHT_TYPES[wallHeightType]?.["name"];

        //** BOTTOM PLATE
        const numBPLength3600 = floor(WALL_LENGTH/360, 0);
        let lengthBPRemain = WALL_LENGTH - (numBPLength3600 * 360);

        if(numBPLength3600 >= 1) {
            wallComponentIndexes[wallName]["bottomPlates"].push({
                "item": "Bottom plate",
                "desc": studSizeName,
                "mark": 'BP' + (++wallComponentIndexes["maxBottomPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": 3600,
                "cutLength": 3600,
                "quantity": numBPLength3600
            });
        }

        // only order framing's length >= 10cm
        if(lengthBPRemain >= 10) {
            wallComponentIndexes[wallName]["bottomPlates"].push({
                "item": "Bottom plate",
                "desc": studSizeName,
                "mark": 'BP' + (++wallComponentIndexes["maxBottomPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(lengthBPRemain * 10), -2),
                "cutLength": Math.round(lengthBPRemain * 10),        
                "quantity": 1
            });
        }

        //** TOP PLATE
        if(numBPLength3600 >= 1) {
            wallComponentIndexes[wallName]["topPlates"].push({
                "item": "Top plate",
                "desc": studSizeName,
                "mark": 'TP' + (++wallComponentIndexes["maxTopPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": 3600,
                "cutLength": 3600,
                "quantity": numBPLength3600
            });
        }

        // only order framing's length >= 10cm
        if(lengthBPRemain >= 10) {
            wallComponentIndexes[wallName]["topPlates"].push({
                "item": "Top plate",
                "desc": studSizeName,
                "mark": 'TP' + (++wallComponentIndexes["maxTopPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(lengthBPRemain * 10), -2),
                "cutLength": Math.round(lengthBPRemain * 10), 
                "quantity": 1
            });
        }

        if(wallCladdingType === WALL_CLADDING_NONE 
        || (wallCladdingType === WALL_CLADDING_ONE_SIDE && (!externWallCladding || externWallCladding === EXTERN_WALL_CLADDING_NONE) )) {
            // *** WALL STUDS       
            wallComponentIndexes[wallName]["studs"].push({
                "item": "Stud",
                "desc": studSizeName,
                "mark": 'S' + (++wallComponentIndexes["maxStudIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(WALL_HEIGHT * 10), -2),
                "cutLength": Math.round(WALL_HEIGHT * 10),
                "quantity": TOTAL_WALL_STUD
            });

            //** NOGGINS */
            wallComponentIndexes[wallName]["noggins"].push({
                "item": "Noggin",
                "desc": studSizeName,
                "mark": 'N' + (++wallComponentIndexes["maxNogginIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(NOGGIN_LENGTH * 10), -1),
                "cutLength": Math.round(NOGGIN_LENGTH * 10),
                "quantity": TOTAL_WALL_STUD - 1
            });
        }

        //** */ OUTEREST STUD LEFT && RIGHT
        if(wallCladdingType === WALL_CLADDING_BOTH_SIDE 
       || (wallCladdingType === WALL_CLADDING_ONE_SIDE) && (externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE)) {
            wallComponentIndexes[wallName]["studs"].push({
                "item": "Stud",
                "desc": studSizeName,
                "mark": 'S' + (++wallComponentIndexes["maxStudIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(WALL_HEIGHT * 10), -2),
                "cutLength": Math.round(WALL_HEIGHT * 10),
                "quantity": 2
            });
        }

        // *** PLASTER BOARD
        if(wallCladdingType === WALL_CLADDING_BOTH_SIDE || wallCladdingType === WALL_CLADDING_ONE_SIDE) {
            let pBName = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["name"];
            let pBLength = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["length"];
            let pBHeight = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["height"];
            let pbColorName = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["colorName"];

            let totalLengthSection = Math.floor(WALL_LENGTH/pBLength);
            let lengthRemain = Math.round(WALL_LENGTH - totalLengthSection*pBLength);

            let totalHeightSection = Math.floor(WALL_HEIGHT/pBHeight);
            let heightRemain = Math.round(WALL_HEIGHT - totalHeightSection*pBHeight);

            let pbSheetDetails = [];
            pbSheetDetails.push({ 
                    size: `${pBHeight * 10} x ${pBLength * 10} (H x W)`, 
                    quantity: totalLengthSection * totalHeightSection 
                });

            if(heightRemain > 0) {
                pbSheetDetails.push({ 
                        size: `${heightRemain * 10} x ${pBLength * 10} (H x W)`, 
                        quantity: totalLengthSection 
                    });
            }

            if(lengthRemain > 0) {
                pbSheetDetails.push({ 
                        size: `${pBHeight * 10} x ${lengthRemain * 10} (H x W)`,
                        quantity: totalHeightSection 
                    });
            }

            if(heightRemain > 0 && lengthRemain > 0) {
                pbSheetDetails.push({ 
                        size: `${heightRemain * 10} x ${lengthRemain * 10} (H x W)`,
                        quantity: 1 
                    });
            }

            pbSheetDetails.map(item => {
                if(item.quantity === 0) return;

                wallComponentIndexes[wallName]["plasterBoards"].push({
                    "item": "Plaster Board",
                    "desc": pBName,
                    "mark": 'PB' + (++wallComponentIndexes["maxPlasterBoardIdx"]),
                    "colour": pbColorName,
                    "wallName": wallName,
                    "wallHeightType": wallHeightTypeName,
                    "length": item.size,
                    "quantity": item.quantity
                });
            });
        }

        // *** EXTERN PLASTER BOARD
        if((wallCladdingType === WALL_CLADDING_ONE_SIDE) && externWallCladding 
        && externWallCladding !== EXTERN_WALL_CLADDING_NONE) {
            wallComponentIndexes[wallName]["plasterBoards"].map(item => {
                wallComponentIndexes[wallName]["externPlasterBoards"].push({
                    "item": "Extern Plaster Board",
                    "desc": EXTERN_WALL_CLADDINGS[externWallCladding] 
                        && EXTERN_WALL_CLADDINGS[externWallCladding]["name"],
                    "mark": 'EPB' + (++wallComponentIndexes["maxExternPlasterBoardIdx"]),
                    "wallName": wallName,
                    "wallHeightType": wallHeightTypeName,
                    "length": item.length,
                    "quantity": item.quantity
                });
            });
        }
    }

    //*** MERGE MESHES */
    let newInteriorWallMesh = BABYLON.Mesh.MergeMeshes(meshes, true, true, undefined, true);
    newInteriorWallMesh.name = wallName;

    newInteriorWallMesh.position = new BABYLON.Vector3(beginCoord.x, beginCoord.y, beginCoord.z + FLOOR_HEIGHT);
    newInteriorWallMesh.rotation.z = sign !== 0 ? -1*sign*angle : angle;

    newInteriorWallMesh.wallParams = {
        "beginCoord": {x: beginCoord.x, y: beginCoord.y, z: beginCoord.z},
        "endCoord": {x: endCoord.x, y: endCoord.y, z: endCoord.z},
        "wallType": wallType,
        "wallHeightType": wallHeightType,
        "wallLength": WALL_LENGTH,
        "wallHeight": wallHeight,
        "wallCladdingType": wallCladdingType,
        "wallCladdingMaterial": wallCladdingMaterial,
        "externWallCladding": externWallCladding,
        "studSize": studSize,
        "studWeb": studWeb,
        "studFlange": studFlange,
        "studDistance": studDistance,
    }

    // set multi material
    newInteriorWallMesh.material = multiMat;
    for(let i = 0; i < newInteriorWallMesh.subMeshes.length; i++) {
        newInteriorWallMesh.subMeshes[i].materialIndex = i;
    }

    return { wall: newInteriorWallMesh };
}

export default UnderOrTopRafterWallLibrary;