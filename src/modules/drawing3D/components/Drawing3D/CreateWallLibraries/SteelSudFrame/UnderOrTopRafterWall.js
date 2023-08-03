import * as BABYLON from "babylonjs";
import earcut from "earcut";
import { floor } from "lodash";
import {
    SHED_BUILDING_INFORMATION, SIMULATE_3D_SCALE, UNDERSIDE_OF_PURLIN_WALL, UNDERSIDE_OF_RAFTER_WALL, 
    WALL_CLADDING_BOTH_SIDE, WALL_CLADDING_ONE_SIDE, WALL_CLADDING_NONE, EXTERN_WALL_CLADDING_NONE, 
    STEEL_STUD_INTERIOR_WALL_COLOR, STEEL_STUD_PLASTER_BOARD_COLOR, STEEL_STUD_EXTERN_PLASTER_BOARD_COLOR,
    WALL_CLADDING_MATERIALS, EXTERN_WALL_CLADDINGS, FLOOR_HEIGHT,
    FURNITURE_WALL_HEIGHT_TYPES, FURNITURE_STUD_SIZE
} from '../../../../constants';

function newV(x = 0, y = 0, z = 0) {
    return new BABYLON.Vector3(x, y, z);
}

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

        //** interior wall locate along SHED'S SPAN
        if(sign === 0) {
            const FROM_BEGIN_COORD_TO_SHED_CENTER = SHED_BUILDING_INFORMATION.span/2 - beginCoord.x;
            const FROM_SHED_CENTER_TO_END_COORD = SHED_BUILDING_INFORMATION.span/2 - endCoord.x;

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

    const MIN_WALL_HEIGHT = MIN_ROOF_HEIGHT + (beginCoord.x * Math.tan(ROOF_PITCH));
    const MAX_WALL_HEIGHT = MIN_ROOF_HEIGHT + (endCoord.x*Math.tan(ROOF_PITCH));
    const TOP_PLATE_WIDTH = WALL_LENGTH/Math.cos(ROOF_PITCH);

    const TOTAL_WALL_STUD = Math.ceil(WALL_LENGTH/STUD_DISTANCE);
    const WALL_STUD_WEB = 0.7 * STUD_WEB;
    const STUD_DISTANCE_OFFSET = (WALL_LENGTH - (TOTAL_WALL_STUD-1)*STUD_DISTANCE) - STUD_FLANGE;

    let meshes = [];
    let plasterBoard;

    let multiMat = new BABYLON.MultiMaterial('multi', scene);
    let interiorMat = new BABYLON.StandardMaterial("interiorMat", scene);
    interiorMat.diffuseColor = new BABYLON.Color3.FromHexString(STEEL_STUD_INTERIOR_WALL_COLOR);
    interiorMat.backFaceCulling = false;

    // ** BOTTOM PLATE
    let bottomPlateIW = BABYLON.MeshBuilder.ExtrudeShape("bottomPlate", {
        shape: [
            newV(0, 0, 0), newV(STUD_FLANGE, 0, 0), 
            newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0)
        ],  
        path: [
            newV(0, 0, 0), newV(WALL_LENGTH, 0, 0)
        ], 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    });
    bottomPlateIW.position.z += STUD_FLANGE;

    meshes = [...meshes, bottomPlateIW];
    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

    //** TOP PLATE
    let topPlateIW = BABYLON.MeshBuilder.ExtrudeShape("topPlate", {
        shape: [
            newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0), 
            newV(0, 0, 0), newV(STUD_FLANGE, 0, 0)
        ], 
        path: [
            newV(0, 0, 0), newV(TOP_PLATE_WIDTH, 0, 0)
        ], 
        sideOrientation: BABYLON.Mesh.FRONTSIDE
    });

    topPlateIW.position.z = MIN_WALL_HEIGHT;
    topPlateIW.rotation.y = -ROOF_PITCH;  

    meshes = [...meshes, topPlateIW];
    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

    if( wallCladdingType === WALL_CLADDING_NONE 
    || (wallCladdingType === WALL_CLADDING_ONE_SIDE && (!externWallCladding || externWallCladding === EXTERN_WALL_CLADDING_NONE) )) {
        //*** WALL STUD */
        for(let i = 0; i < TOTAL_WALL_STUD; i++) { 
            let wallStudHeight = MIN_ROOF_HEIGHT + (beginCoord.x + (STUD_DISTANCE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1))*i) * Math.tan(ROOF_PITCH) - STUD_FLANGE;
            
            let newWallStudIW = BABYLON.MeshBuilder.ExtrudeShape("stud", {
                shape: [
                    newV(0, 0, 0), newV(-STUD_FLANGE, 0, 0), 
                    newV(-STUD_FLANGE, WALL_STUD_WEB, 0), newV(0, WALL_STUD_WEB, 0) 
                ], 
                path: [
                    newV(0, 0, 0), newV(0, 0, wallStudHeight)
                ], 
                sideOrientation: BABYLON.Mesh.DOUBLESIDE
            });
            
            if(i !== TOTAL_WALL_STUD - 1) {
                newWallStudIW.position.x += (STUD_DISTANCE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1))*i;
            } else {
                newWallStudIW.position.x = WALL_LENGTH;
            }
            newWallStudIW.position.y += (STUD_WEB - WALL_STUD_WEB)/2;

            meshes = [...meshes, newWallStudIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
        }
        
        // *** NOGGINS        
        let newNogginIW = BABYLON.MeshBuilder.ExtrudeShape("noggin", {
            shape: [
                newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0), 
                newV(0, 0, 0), newV(STUD_FLANGE, 0, 0)
            ], 
            path: [
                newV(0, 0, 0), newV(WALL_LENGTH, 0, 0)
            ], 
            sideOrientation: BABYLON.Mesh.FRONTSIDE
        });
        newNogginIW.position.z = MIN_WALL_HEIGHT/2;

        meshes = [...meshes, newNogginIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
    }
    
    //*** outerest wall stud left and right
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE 
   || (wallCladdingType === WALL_CLADDING_ONE_SIDE) && (externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE)) { 
        let leftOuterWallStudIW = BABYLON.MeshBuilder.ExtrudeShape("leftOuterStud", {
            shape: [
                newV(0, 0, 0), newV(-STUD_FLANGE, 0, 0), 
                newV(-STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0)  
            ], 
            path: [
                newV(0, 0, 0), newV(0, 0, MIN_WALL_HEIGHT)
            ], 
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        });
        leftOuterWallStudIW.position.x += STUD_FLANGE;
        
        meshes = [...meshes, leftOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

        let rightOuterWallStudIW = BABYLON.MeshBuilder.ExtrudeShape("rightOuterStud", {
            shape: [
                newV(0, 0, 0), newV(STUD_FLANGE, 0, 0), 
                newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0) 
            ], 
            path: [
                newV(0, 0, 0), newV(0, 0, MAX_WALL_HEIGHT)
            ], 
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        });

        rightOuterWallStudIW.position.x += WALL_LENGTH - STUD_FLANGE;

        meshes = [...meshes, rightOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
    }

    //** CLADDING */
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE || wallCladdingType === WALL_CLADDING_ONE_SIDE) {
        let pBDepth = WALL_CLADDING_MATERIALS[wallCladdingMaterial]?.["depth"];
        let pbColor = WALL_CLADDING_MATERIALS[wallCladdingMaterial]?.["color"];

        // plaster board
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
        plasterBoardMat.diffuseColor = new BABYLON.Color3.FromHexString(pbColor || STEEL_STUD_PLASTER_BOARD_COLOR);
        plasterBoardMat.backFaceCulling = false;

        meshes = [...meshes, plasterBoard];
        multiMat.subMaterials = [...multiMat.subMaterials, plasterBoardMat];
    }

    //** EXTERN PLASTER BOARD
    if((wallCladdingType === WALL_CLADDING_ONE_SIDE) && externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE) {
        let externPlasterBoard = plasterBoard.clone("externPlasterBoard");
        externPlasterBoard.position.y += 2*STUD_FLANGE + 1;

        // update extern plaster board
        let externPlasterBoardMat = new BABYLON.StandardMaterial("externPlasterBoardMat", scene);
        externPlasterBoardMat.emissiveColor = new BABYLON.Color3.FromHexString(STEEL_STUD_EXTERN_PLASTER_BOARD_COLOR);
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
        const numBPLength3000 = floor(WALL_LENGTH/300, 0);
        let lengthBPRemain = WALL_LENGTH - (numBPLength3000 * 300);

        if(numBPLength3000 >= 1) {
            wallComponentIndexes[wallName]["bottomPlates"].push({
                "item": "Bottom plate",
                "desc": studSizeName,
                "mark": 'BP' + (++wallComponentIndexes["maxBottomPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": 3000,
                "cutLength": 3000,
                "quantity": numBPLength3000
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
        const numTPLength3000 = floor(TOP_PLATE_WIDTH/300, 0);
        let lengthTPRemain = TOP_PLATE_WIDTH - (numTPLength3000 * 300);

        if(numTPLength3000 >= 1) {
            wallComponentIndexes[wallName]["topPlates"].push({
                "item": "Top plate",
                "desc": studSizeName,
                "mark": 'TP' + (++wallComponentIndexes["maxTopPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": 3000,
                "cutLength": 3000,
                "quantity": numTPLength3000
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
                let wallStudHeight = MIN_ROOF_HEIGHT + (beginCoord.x + (STUD_DISTANCE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1))*i) * Math.tan(ROOF_PITCH) - STUD_FLANGE;
                
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

            // *** NOGINS
            wallComponentIndexes[wallName]["noggins"].push({
                "item": "Noggin",
                "desc": studSizeName,
                "mark": 'N' + (++wallComponentIndexes["maxNogginIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(WALL_LENGTH * 10), -2),
                "cutLength": Math.round(WALL_LENGTH * 10),
                "quantity": 1
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
    
            //** */
            ///////////////////////////////////////////////////////////
            //              PART 2                     //   PART 3   //
            ///////////////////////////////////////////////////////////
            //                                         //   PART4    //
            //              PART 1                     //            //
            //                                         //            //
            //////////////////////////////////////////////////////////
            //** */
    
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
            // (PART 2)
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
    
            // (PART 3)
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
    
            // (PART 4)
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
                    "desc": EXTERN_WALL_CLADDINGS[externWallCladding] && EXTERN_WALL_CLADDINGS[externWallCladding]["name"],
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

    newInteriorWallMesh.enableEdgesRendering();
    newInteriorWallMesh.edgesWidth = 10.0;
    newInteriorWallMesh.edgesColor = new BABYLON.Color4(117/255, 117/255, 117/255, 1);

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
    const WALL_STUD_WEB = 0.7 * STUD_WEB;
    const STUD_DISTANCE_OFFSET = (WALL_LENGTH - (TOTAL_WALL_STUD-1)*STUD_DISTANCE) - STUD_FLANGE;

    let meshes = [];
    let plasterBoard;

    let multiMat = new BABYLON.MultiMaterial('multi', scene);
    let interiorMat = new BABYLON.StandardMaterial("interiorMat", scene);
    interiorMat.diffuseColor = new BABYLON.Color3.FromHexString(STEEL_STUD_INTERIOR_WALL_COLOR);
    interiorMat.backFaceCulling = false;

    // ** BOTTOM PLATE
    let bottomPlateIW = BABYLON.MeshBuilder.ExtrudeShape("bottomPlate", {
        shape: [
            newV(0, 0, 0), newV(STUD_FLANGE, 0, 0), 
            newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0)
        ], 
        path: [
            newV(0, 0, 0), newV(WALL_LENGTH, 0, 0)
        ], 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    });
    bottomPlateIW.position.z += STUD_FLANGE;

    meshes = [...meshes, bottomPlateIW];
    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

    //** TOP PLATE
    let topPlateIW = BABYLON.MeshBuilder.ExtrudeShape("topPlate", {
        shape: [
            newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0), 
            newV(0, 0, 0), newV(STUD_FLANGE, 0, 0)
        ], 
        path: [
            newV(0, 0, 0), newV(TOP_PLATE_WIDTH, 0, 0)
        ], 
        sideOrientation: BABYLON.Mesh.FRONTSIDE
    });

    topPlateIW.position.z = MAX_WALL_HEIGHT;
    topPlateIW.rotation.y = ROOF_PITCH;  

    meshes = [...meshes, topPlateIW];
    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

    if( wallCladdingType === WALL_CLADDING_NONE 
    || (wallCladdingType === WALL_CLADDING_ONE_SIDE && (!externWallCladding || externWallCladding === EXTERN_WALL_CLADDING_NONE) )) {
        //** WALL STUD */
        for(let i = 0; i < TOTAL_WALL_STUD; i++) {
            let wallStudHeight = MIN_ROOF_HEIGHT + (SHED_BUILDING_INFORMATION.span - beginCoord.x) * Math.tan(ROOF_PITCH) - (STUD_DISTANCE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1))*i * Math.tan(ROOF_PITCH) - STUD_FLANGE;
            
            let newWallStudIW = BABYLON.MeshBuilder.ExtrudeShape("stud", {
                shape: [
                    newV(0, 0, 0), newV(-STUD_FLANGE, 0, 0), 
                    newV(-STUD_FLANGE, WALL_STUD_WEB, 0), newV(0, WALL_STUD_WEB, 0)
                ], 
                path: [
                    newV(0, 0, 0), newV(0, 0, wallStudHeight)
                ],
                sideOrientation: BABYLON.Mesh.DOUBLESIDE
            });

            if(i !== TOTAL_WALL_STUD - 1) {
                newWallStudIW.position.x += (STUD_DISTANCE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1))*i;
            } else {
                newWallStudIW.position.x = WALL_LENGTH;
            }
            newWallStudIW.position.y += (STUD_WEB - WALL_STUD_WEB)/2;
  
            meshes = [...meshes, newWallStudIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
        }

        //** NOGGIN */
        let newNogginIW = BABYLON.MeshBuilder.ExtrudeShape("noggin", {
            shape: [
                newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0), 
                newV(0, 0, 0), newV(STUD_FLANGE, 0, 0)
            ], 
            path: [
                newV(0, 0, 0), newV(WALL_LENGTH, 0, 0)
            ], 
            sideOrientation: BABYLON.Mesh.FRONTSIDE
        });
        newNogginIW.position.z = MIN_WALL_HEIGHT/2;

        meshes = [...meshes, newNogginIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
    }

    //*** Outerest wall stud left and right
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE || (wallCladdingType === WALL_CLADDING_ONE_SIDE) && (externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE)) {        
        let leftOuterWallStudIW = BABYLON.MeshBuilder.ExtrudeShape("leftStud", {
            shape: [
                newV(0, 0, 0), newV(-STUD_FLANGE, 0, 0), 
                newV(-STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0)  
            ], 
            path: [
                newV(0, 0, 0), newV(0, 0, MAX_WALL_HEIGHT)
            ], 
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        });
        leftOuterWallStudIW.position.x += STUD_FLANGE;

        meshes = [...meshes, leftOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

        let rightOuterWallStudIW = BABYLON.MeshBuilder.ExtrudeShape("rightStud", {
            shape: [
                newV(0, 0, 0), newV(STUD_FLANGE, 0, 0), 
                newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0) 
            ], 
            path: [
                newV(0, 0, 0), newV(0, 0, MIN_WALL_HEIGHT)
            ], 
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        });

        rightOuterWallStudIW.position.x += WALL_LENGTH - STUD_FLANGE;

        meshes = [...meshes, rightOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
    }

    //** PLASTER BOARD/
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
        plasterBoardMat.diffuseColor = new BABYLON.Color3.FromHexString(pbColor || STEEL_STUD_PLASTER_BOARD_COLOR);
        plasterBoardMat.backFaceCulling = false;

        meshes = [...meshes, plasterBoard];
        multiMat.subMaterials = [...multiMat.subMaterials, plasterBoardMat];
    }

    //*** EXTERN PLASTER BOARD
    if((wallCladdingType === WALL_CLADDING_ONE_SIDE) && externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE) {
        let externPlasterBoard = plasterBoard.clone("externPlasterBoard");
        externPlasterBoard.position.y += 2*STUD_FLANGE + 1;

        // update extern plaster board
        let externPlasterBoardMat = new BABYLON.StandardMaterial("externPlasterBoardMat", scene);
        externPlasterBoardMat.emissiveColor = new BABYLON.Color3.FromHexString(STEEL_STUD_EXTERN_PLASTER_BOARD_COLOR);
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
        const numBPLength3000 = floor(WALL_LENGTH/300, 0);
        let lengthBPRemain = WALL_LENGTH - (numBPLength3000 * 300);

        if(numBPLength3000 >= 1) {
            wallComponentIndexes[wallName]["bottomPlates"].push({
                "item": "Bottom plate",
                "desc": studSizeName,
                "mark": 'BP' + (++wallComponentIndexes["maxBottomPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": 3000,
                "cutLength": 3000,
                "quantity": numBPLength3000
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
        const numTPLength3000 = floor(TOP_PLATE_WIDTH/300, 0);
        let lengthTPRemain = TOP_PLATE_WIDTH - (numTPLength3000 * 300);

        if(numTPLength3000 >= 1) {
            wallComponentIndexes[wallName]["topPlates"].push({
                "item": "Top plate",
                "desc": studSizeName,
                "mark": 'TP' + (++wallComponentIndexes["maxTopPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": 3000,
                "cutLength": 3000,
                "quantity": numTPLength3000
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
                let wallStudHeight = MIN_ROOF_HEIGHT + (SHED_BUILDING_INFORMATION.span - beginCoord.x) * Math.tan(ROOF_PITCH) - (STUD_DISTANCE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1))*i * Math.tan(ROOF_PITCH) - STUD_FLANGE;
                
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
                "length": floor(Math.round(WALL_LENGTH * 10), -2),
                "cutLength": Math.round(WALL_LENGTH * 10),
                "quantity": 1
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

    newInteriorWallMesh.enableEdgesRendering();
    newInteriorWallMesh.edgesWidth = 10.0;
    newInteriorWallMesh.edgesColor = new BABYLON.Color4(117/255, 117/255, 117/255, 1);

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
    const WALL_STUD_WEB = 0.7 * STUD_WEB;

    const TOTAL_LEFT_WALL_STUD = Math.ceil(HALF_LEFT_WALL_LENGTH/STUD_DISTANCE);
    const TOTAL_RIGHT_WALL_STUD = Math.ceil(HALF_RIGHT_WALL_LENGTH/STUD_DISTANCE);
    const LEFT_WALL_STUD_DISTANCE_OFFSET = (HALF_LEFT_WALL_LENGTH - (TOTAL_LEFT_WALL_STUD-1)*STUD_DISTANCE) - STUD_FLANGE;
    const RIGHT_WALL_STUD_DISTANCE_OFFSET = (HALF_RIGHT_WALL_LENGTH - (TOTAL_RIGHT_WALL_STUD-1)*STUD_DISTANCE) - STUD_FLANGE;

    let meshes = [];
    let plasterBoard;

    let multiMat = new BABYLON.MultiMaterial('multi', scene);
    let interiorMat = new BABYLON.StandardMaterial("interiorMat", scene);
    interiorMat.diffuseColor = new BABYLON.Color3.FromHexString(STEEL_STUD_INTERIOR_WALL_COLOR);
    interiorMat.backFaceCulling = false;

    // ** BOTTOM PLATE
    let bottomPlateIW = BABYLON.MeshBuilder.ExtrudeShape("bottomPlate", {
        shape: [
            newV(0, 0, 0), newV(STUD_FLANGE, 0, 0), 
            newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0)
        ], 
        path: [
            newV(0, 0, 0), newV(WALL_LENGTH, 0, 0)
        ], 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    });
    bottomPlateIW.position.z += STUD_FLANGE;

    meshes = [...meshes, bottomPlateIW];
    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

    //** TOP PLATE
    let leftTopPlateMesh = BABYLON.MeshBuilder.ExtrudeShape("leftTopPlate", {
        shape: [
            newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0), 
            newV(0, 0, 0), newV(STUD_FLANGE, 0, 0)
        ], 
        path: [
            newV(0, 0, 0), newV(LEFT_TOP_PLANE_WIDTH, 0, 0)
        ], 
        sideOrientation: BABYLON.Mesh.FRONTSIDE
    });

    leftTopPlateMesh.position.z = MIN_ROOF_HEIGHT + (beginCoord.x * Math.tan(ROOF_PITCH));
    leftTopPlateMesh.rotation.y = -ROOF_PITCH;  

    meshes = [...meshes, leftTopPlateMesh];
    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

    let rightTopPlateMesh = BABYLON.MeshBuilder.ExtrudeShape("rightTopPlate", {
        shape: [
            newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0), 
            newV(0, 0, 0), newV(STUD_FLANGE, 0, 0)
        ], 
        path: [
            newV(0, 0, 0), newV(RIGHT_TOP_PLANE_WIDTH, 0, 0)
        ], 
        sideOrientation: BABYLON.Mesh.FRONTSIDE
    });

    rightTopPlateMesh.position.x = HALF_LEFT_WALL_LENGTH;
    rightTopPlateMesh.position.z = MIN_ROOF_HEIGHT + SHED_BUILDING_INFORMATION.span/2 * Math.tan(ROOF_PITCH);
    rightTopPlateMesh.rotation.y = ROOF_PITCH;  

    meshes = [...meshes, rightTopPlateMesh];
    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

    //***** WALL STUD && NOGGIN */
    if( wallCladdingType === WALL_CLADDING_NONE 
    || (wallCladdingType === WALL_CLADDING_ONE_SIDE && (!externWallCladding || externWallCladding === EXTERN_WALL_CLADDING_NONE) )) {
        //*** WALL STUD */
        for(let i = 0; i < TOTAL_LEFT_WALL_STUD; i++) {  
            let leftWallStudHeight = MIN_ROOF_HEIGHT + (beginCoord.x + (STUD_DISTANCE + LEFT_WALL_STUD_DISTANCE_OFFSET/(TOTAL_LEFT_WALL_STUD-1))*i) * Math.tan(ROOF_PITCH) - STUD_FLANGE;

            let newWallStudIW = BABYLON.MeshBuilder.ExtrudeShape("leftStud", {
                shape: [
                    newV(0, 0, 0), newV(-STUD_FLANGE, 0, 0), 
                    newV(-STUD_FLANGE, WALL_STUD_WEB, 0), newV(0, WALL_STUD_WEB, 0)
                ], 
                path: [
                    newV(0, 0, 0), newV(0, 0, leftWallStudHeight)
                ], 
                sideOrientation: BABYLON.Mesh.DOUBLESIDE
            });

            if(i !== TOTAL_LEFT_WALL_STUD - 1) {
                newWallStudIW.position.x += (STUD_DISTANCE + LEFT_WALL_STUD_DISTANCE_OFFSET/(TOTAL_LEFT_WALL_STUD-1))*i;
            } else {
                newWallStudIW.position.x = HALF_LEFT_WALL_LENGTH;
            }
      
            newWallStudIW.position.y += (STUD_WEB - WALL_STUD_WEB)/2;

            meshes = [...meshes, newWallStudIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
        }

        for(let i = 1; i < TOTAL_RIGHT_WALL_STUD; i++) { 
            let rightWallStudHeight = MIN_ROOF_HEIGHT + (SHED_BUILDING_INFORMATION.span/2 - (STUD_DISTANCE + RIGHT_WALL_STUD_DISTANCE_OFFSET/(TOTAL_RIGHT_WALL_STUD-1))*i) * Math.tan(ROOF_PITCH);

            let newWallStudIW = BABYLON.MeshBuilder.ExtrudeShape("rightStud", {
                shape: [
                    newV(0, 0, 0), newV(-STUD_FLANGE, 0, 0), 
                    newV(-STUD_FLANGE, WALL_STUD_WEB, 0), newV(0, WALL_STUD_WEB, 0)
                ], 
                path: [
                    newV(0, 0, 0), newV(0, 0, rightWallStudHeight)
                ], 
                sideOrientation: BABYLON.Mesh.DOUBLESIDE
            });

            if(i !== TOTAL_RIGHT_WALL_STUD - 1) {
                newWallStudIW.position.x += HALF_LEFT_WALL_LENGTH + (STUD_DISTANCE + RIGHT_WALL_STUD_DISTANCE_OFFSET/TOTAL_RIGHT_WALL_STUD)*i;
            } else {
                newWallStudIW.position.x = WALL_LENGTH;
            }
            newWallStudIW.position.y += (STUD_WEB - WALL_STUD_WEB)/2;

            meshes = [...meshes, newWallStudIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
        }

        //*** NOGGIN */ 
        let newNogginIW = BABYLON.MeshBuilder.ExtrudeShape("noggin", {
            shape: [
                newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0), 
                newV(0, 0, 0), newV(STUD_FLANGE, 0, 0)
            ], 
            path: [
                newV(0, 0, 0), newV(WALL_LENGTH, 0, 0)
            ], 
            sideOrientation: BABYLON.Mesh.FRONTSIDE
        });
        newNogginIW.position.z = LEFT_WALL_HEIGHT/2;

        meshes = [...meshes, newNogginIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
    }

    //*** Outerest wall stud left and right
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE 
    || (wallCladdingType === WALL_CLADDING_ONE_SIDE) && (externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE)) {
        let leftOuterWallStudIW = BABYLON.MeshBuilder.ExtrudeShape("leftOuterStud", {
            shape: [
                newV(0, 0, 0), newV(-STUD_FLANGE, 0, 0), 
                newV(-STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0)  
            ], 
            path: [
                newV(0, 0, 0), newV(0, 0, LEFT_WALL_HEIGHT)
            ], 
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        });
        leftOuterWallStudIW.position.x += STUD_FLANGE;

        meshes = [...meshes, leftOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

        let rightOuterWallStudIW = BABYLON.MeshBuilder.ExtrudeShape("rightOuterStud", {
            shape: [
                newV(0, 0, 0), newV(STUD_FLANGE, 0, 0), 
                newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0)  
            ], 
            path: [
                newV(0, 0, 0), newV(0, 0, RIGHT_WALL_HEIGHT)
            ], 
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        });

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
        plasterBoardMat.diffuseColor = new BABYLON.Color3.FromHexString(pbColor || STEEL_STUD_PLASTER_BOARD_COLOR);
        plasterBoardMat.backFaceCulling = false;

        meshes = [...meshes, plasterBoard];
        multiMat.subMaterials = [...multiMat.subMaterials, plasterBoardMat];
    }

    //** EXTERN PLASTER BOARD
    if((wallCladdingType === WALL_CLADDING_ONE_SIDE) && externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE) {
        let externPlasterBoard = plasterBoard.clone("externPlasterBoard");
        externPlasterBoard.position.y += 2*STUD_FLANGE + 1;

        // update extern plaster board
        let externPlasterBoardMat = new BABYLON.StandardMaterial("externPlasterBoardMat", scene);
        externPlasterBoardMat.emissiveColor = new BABYLON.Color3.FromHexString(STEEL_STUD_EXTERN_PLASTER_BOARD_COLOR);
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
            "crippleStuds": [],
            "headerStuds": [],
            "trimmerDoorStuds": [],
            "plasterBoards": [],
            "externPlasterBoards": []
        }

        let studSizeName = FURNITURE_STUD_SIZE[studSize]?.["name"];
        let wallHeightTypeName = FURNITURE_WALL_HEIGHT_TYPES[wallHeightType]?.["name"];

        //** BOTTOM PLATE
        const numBPLength3000 = floor(WALL_LENGTH/300, 0);
        let lengthBPRemain = WALL_LENGTH - (numBPLength3000 * 300);

        if(numBPLength3000 >= 1) {
            wallComponentIndexes[wallName]["bottomPlates"].push({
                "item": "Bottom plate",
                "desc": studSizeName,
                "mark": 'BP' + (++wallComponentIndexes["maxBottomPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": 3000,
                "cutLength": 3000,
                "quantity": numBPLength3000
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
        const numLTPLength3000 = floor(LEFT_TOP_PLANE_WIDTH/300, 0);
        let lengthLTPRemain = LEFT_TOP_PLANE_WIDTH - (numLTPLength3000 * 300);

        if(numLTPLength3000 >= 1) {
            wallComponentIndexes[wallName]["topPlates"].push({
                "item": "Top plate",
                "desc": studSizeName,
                "mark": 'TP' + (++wallComponentIndexes["maxTopPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": 3000,
                "cutLength": 3000,
                "quantity": numLTPLength3000
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

        const numRTPLength3000 = floor(RIGHT_TOP_PLANE_WIDTH/300, 0);
        let lengthRTPRemain = RIGHT_TOP_PLANE_WIDTH - (numRTPLength3000 * 300);

        if(numRTPLength3000 >= 1) {
            wallComponentIndexes[wallName]["topPlates"].push({
                "item": "Top plate",
                "desc": studSizeName,
                "mark": 'TP' + (++wallComponentIndexes["maxTopPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": 3000,
                "cutLength": 3000,
                "quantity": numRTPLength3000
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
                let leftWallStudHeight = MIN_ROOF_HEIGHT + (beginCoord.x + (STUD_DISTANCE + LEFT_WALL_STUD_DISTANCE_OFFSET/(TOTAL_LEFT_WALL_STUD-1))*i) * Math.tan(ROOF_PITCH) - STUD_FLANGE;
    
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
            wallComponentIndexes[wallName]["noggins"].push({
                "item": "Noggin",
                "desc": studSizeName,
                "mark": 'N' + (++wallComponentIndexes["maxNogginIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": floor(Math.round(WALL_LENGTH * 10), -2),
                "cutLength": Math.round(WALL_LENGTH * 10),
                "quantity": 1
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

    newInteriorWallMesh.enableEdgesRendering();
    newInteriorWallMesh.edgesWidth = 10.0;
    newInteriorWallMesh.edgesColor = new BABYLON.Color4(117/255, 117/255, 117/255, 1);

    return { wall: newInteriorWallMesh };
}

function createWallLocateAlongAxisY(params, scene) {
    const { 
        name, wallType, wallHeightType, wallHeight, studSize, studWeb, studFlange, studDistance, 
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
    const WALL_STUD_WEB = 0.7 * STUD_WEB;
    const STUD_DISTANCE_OFFSET = (WALL_LENGTH - (TOTAL_WALL_STUD-1)*STUD_DISTANCE) - STUD_FLANGE;

    let meshes = [];
    let plasterBoard;

    let multiMat = new BABYLON.MultiMaterial('multi', scene);
    let interiorMat = new BABYLON.StandardMaterial("interiorMat", scene);
    interiorMat.diffuseColor = new BABYLON.Color3.FromHexString(STEEL_STUD_INTERIOR_WALL_COLOR);
    interiorMat.backFaceCulling = false;

    // ** BOTTOM PLATE
    let bottomPlateIW = BABYLON.MeshBuilder.ExtrudeShape("bottomPlate", {
        shape: [
            newV(0, 0, 0), newV(STUD_FLANGE, 0, 0), 
            newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0)
        ], 
        path: [
            newV(0, 0, 0), newV(WALL_LENGTH, 0, 0)
        ], 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    });
    bottomPlateIW.position.z = STUD_FLANGE;

    meshes = [...meshes, bottomPlateIW];
    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

    //** TOP PLATE
    let topPlateIW = BABYLON.MeshBuilder.ExtrudeShape("topPlate", {
        shape: [
            newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0), 
            newV(0, 0, 0), newV(STUD_FLANGE, 0, 0)
        ], 
        path: [
            newV(0, 0, 0), newV(WALL_LENGTH, 0, 0)
        ], 
        sideOrientation: BABYLON.Mesh.FRONTSIDE
    });

    topPlateIW.position.z = WALL_HEIGHT;
    
    meshes = [...meshes, topPlateIW];
    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

    //*** WALL STUD */
    if( wallCladdingType === WALL_CLADDING_NONE 
    || (wallCladdingType === WALL_CLADDING_ONE_SIDE && (!externWallCladding || externWallCladding === EXTERN_WALL_CLADDING_NONE) )) {
        for(let i = 0; i < TOTAL_WALL_STUD; i++) {
            let newWallStudIW = BABYLON.MeshBuilder.ExtrudeShape("stud", {
                shape: [
                    newV(0, 0, 0), newV(-STUD_FLANGE, 0, 0), 
                    newV(-STUD_FLANGE, WALL_STUD_WEB, 0), newV(0, WALL_STUD_WEB, 0)
                ], 
                path: [
                    newV(0, 0, 0), newV(0, 0, WALL_HEIGHT)
                ], 
                sideOrientation: BABYLON.Mesh.DOUBLESIDE
            });

            if(i !== TOTAL_WALL_STUD - 1) {
                newWallStudIW.position.x += (STUD_DISTANCE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1))*i;
            } else {
                newWallStudIW.position.x = WALL_LENGTH;
            }
            newWallStudIW.position.y += (STUD_WEB - WALL_STUD_WEB)/2;

            meshes = [...meshes, newWallStudIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
        }
    
        //** NOGGIN */
        let newNogginIW = BABYLON.MeshBuilder.ExtrudeShape("noggin", {
            shape: [
                newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0), 
                newV(0, 0, 0), newV(STUD_FLANGE, 0, 0)
            ], 
            path: [
                newV(0, 0, 0), newV(WALL_LENGTH, 0, 0)
            ],
            sideOrientation: BABYLON.Mesh.FRONTSIDE
        });
        newNogginIW.position.z = WALL_HEIGHT/2;

        meshes = [...meshes, newNogginIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
    }
    
    //*** Outerest wall stud left and right
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE 
    || (wallCladdingType === WALL_CLADDING_ONE_SIDE) && (externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE)) {    
        let leftOuterWallStudIW = BABYLON.MeshBuilder.ExtrudeShape("leftStud", {
            shape: [
                newV(0, 0, 0), newV(-STUD_FLANGE, 0, 0), 
                newV(-STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0)   
            ], 
            path: [
                newV(0, 0, 0), newV(0, 0, WALL_HEIGHT)
            ], 
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        });
        leftOuterWallStudIW.position.x += STUD_FLANGE;

        meshes = [...meshes, leftOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

        let rightOuterWallStudIW = BABYLON.MeshBuilder.ExtrudeShape("rightStud", {
            shape: [
                newV(0, 0, 0), newV(STUD_FLANGE, 0, 0), 
                newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0)  
            ], 
            path: [
                newV(0, 0, 0), newV(0, 0, WALL_HEIGHT)
            ], 
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        });

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
        plasterBoardMat.diffuseColor = new BABYLON.Color3.FromHexString(pbColor || STEEL_STUD_PLASTER_BOARD_COLOR);
        plasterBoardMat.backFaceCulling = false;

        meshes = [...meshes, plasterBoard];
        multiMat.subMaterials = [...multiMat.subMaterials, plasterBoardMat];
    }

    //** */ EXTERN PLASTER BOARD
    if((wallCladdingType === WALL_CLADDING_ONE_SIDE) && (externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE)) {
        let externPlasterBoard = plasterBoard.clone("externPlasterBoard");
        externPlasterBoard.position.y += 2*STUD_FLANGE + 1;

        // update extern plaster board
        let externPlasterBoardMat = new BABYLON.StandardMaterial("externPlasterBoardMat", scene);
        externPlasterBoardMat.emissiveColor = new BABYLON.Color3.FromHexString(STEEL_STUD_EXTERN_PLASTER_BOARD_COLOR);
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
            "crippleStuds": [],
            "headerStuds": [],
            "trimmerDoorStuds": [],
            "plasterBoards": [],
            "externPlasterBoards": []
        }

        let studSizeName = FURNITURE_STUD_SIZE[studSize]?.["name"];
        let wallHeightTypeName = FURNITURE_WALL_HEIGHT_TYPES[wallHeightType]?.["name"];

        //** BOTTOM PLATE
        const numBPLength3000 = floor(WALL_LENGTH/300, 0);
        let lengthBPRemain = WALL_LENGTH - (numBPLength3000 * 300);

        if(numBPLength3000 >= 1) {
            wallComponentIndexes[wallName]["bottomPlates"].push({
                "item": "Bottom plate",
                "desc": studSizeName,
                "mark": 'BP' + (++wallComponentIndexes["maxBottomPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": 3000,
                "cutLength": 3000,
                "quantity": numBPLength3000
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
        if(numBPLength3000 >= 1) {
            wallComponentIndexes[wallName]["topPlates"].push({
                "item": "Top plate",
                "desc": studSizeName,
                "mark": 'TP' + (++wallComponentIndexes["maxTopPlateIdx"]),
                "wallName": wallName,
                "wallHeightType": wallHeightTypeName,
                "length": 3000,
                "cutLength": 3000,
                "quantity": numBPLength3000
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
                "length": floor(Math.round(WALL_LENGTH * 10), -2),
                "cutLength": Math.round(WALL_LENGTH * 10),
                "quantity": 1
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

    newInteriorWallMesh.enableEdgesRendering();
    newInteriorWallMesh.edgesWidth = 10.0;
    newInteriorWallMesh.edgesColor = new BABYLON.Color4(117/255, 117/255, 117/255, 1);

    return { wall: newInteriorWallMesh };
}

export default UnderOrTopRafterWallLibrary;