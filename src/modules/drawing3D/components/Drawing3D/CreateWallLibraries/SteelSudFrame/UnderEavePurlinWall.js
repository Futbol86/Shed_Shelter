import * as BABYLON from "babylonjs";
import earcut from "earcut";
import {floor} from "lodash";
import {
   SIMULATE_3D_SCALE, WALL_CLADDING_BOTH_SIDE, WALL_CLADDING_ONE_SIDE, 
   WALL_CLADDING_NONE, WALL_CLADDING_MATERIALS, 
   STEEL_STUD_INTERIOR_WALL_COLOR, STEEL_STUD_PLASTER_BOARD_COLOR, STEEL_STUD_EXTERN_PLASTER_BOARD_COLOR,
   EXTERN_WALL_CLADDINGS, EXTERN_WALL_CLADDING_NONE, FLOOR_HEIGHT,
   FURNITURE_WALL_HEIGHT_TYPES, FURNITURE_STUD_SIZE, FURNITURE_DOOR_TYPES
} from '../../../../constants';

function newV(x = 0, y = 0, z = 0) {
    return new BABYLON.Vector3(x, y, z);
}

let UnderEavePurlinLibrary = {
    createUnderEavePurlinInteriorWall(params, scene) {
        const { 
            name, wallType, wallHeightType, 
            wallCladdingType, wallCladdingMaterial, externWallCladding,
            studSize, studWeb, studFlange, studDistance, 
            isCreateNewWall = true, isCreateNewWallName = true, wallComponentIndexes
        } = params;

        let wallName = isCreateNewWallName ? ("W" + (++wallComponentIndexes["maxWallIdx"])) : name;

        // we reorder 'begin coord' and 'end coord' to set exactly door left
        let beginCoord = params.beginCoord; 
        let endCoord = params.endCoord; 

        if(params.endCoord.y > params.beginCoord.y) {
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

        let angle = BABYLON.Vector3.Dot(BABYLON.Axis.X, vec);
        angle = Math.acos(angle);

        const RAFTER_WIDTH = 35;
        const RAFTER_ABOVE_FLOOR = 466;

        const WALL_LENGTH = BABYLON.Vector3.Distance(endCoord, beginCoord);
        const WALL_HEIGHT = (RAFTER_ABOVE_FLOOR - RAFTER_WIDTH/2);

        const STUD_WEB = studWeb;
        const STUD_FLANGE = studFlange;
        const STUD_DISTANCE = studDistance;
        const WALL_STUD_WEB = 0.7 * STUD_WEB;

        const TOTAL_WALL_STUD = Math.ceil(WALL_LENGTH/STUD_DISTANCE);
        const STUD_DISTANCE_OFFSET = WALL_LENGTH - (TOTAL_WALL_STUD-1)*STUD_DISTANCE;

        const NOGGIN_LENGTH = STUD_DISTANCE + STUD_DISTANCE_OFFSET/(TOTAL_WALL_STUD-1);
        
        let plasterBoard;

        let interiorMat = new BABYLON.StandardMaterial("interiorMat", scene);
        interiorMat.diffuseColor = new BABYLON.Color3.FromHexString(STEEL_STUD_INTERIOR_WALL_COLOR);
        interiorMat.backFaceCulling = false;

        let multiMat = new BABYLON.MultiMaterial('multi', scene);

        let meshes = [];

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
                newV(0, 0, 0), newV(WALL_LENGTH, 0, 0)
            ], 
            sideOrientation: BABYLON.Mesh.FRONTSIDE
        });
        topPlateIW.position.z += WALL_HEIGHT;

        meshes = [...meshes, topPlateIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

        if( wallCladdingType === WALL_CLADDING_NONE 
        || (wallCladdingType === WALL_CLADDING_ONE_SIDE && (!externWallCladding || externWallCladding === EXTERN_WALL_CLADDING_NONE) )) {
            //*** WALL STUDS */
            let wallStudIWSample;

            for(let i = 0; i < TOTAL_WALL_STUD; i++) {   
                let newWallStudIW;

                if(i === 0) {
                    wallStudIWSample = BABYLON.MeshBuilder.ExtrudeShape('studSample', {
                        shape: [
                            newV(0, 0, 0), newV(-STUD_FLANGE, 0, 0), 
                            newV(-STUD_FLANGE, WALL_STUD_WEB, 0), newV(0, WALL_STUD_WEB, 0),  
                        ], path: [
                            newV(0, 0, 0), newV(0, 0, WALL_HEIGHT)
                        ], 
                        sideOrientation: BABYLON.Mesh.DOUBLESIDE
                    });

                    wallStudIWSample.setEnabled(false);
                }
                else if( i === TOTAL_WALL_STUD - 1) {
                    wallStudIWSample = BABYLON.MeshBuilder.ExtrudeShape('studSample', {
                        shape: [
                            newV(0, 0, 0), newV(STUD_FLANGE, 0, 0), 
                            newV(STUD_FLANGE, WALL_STUD_WEB, 0), newV(0, WALL_STUD_WEB, 0)   
                        ], 
                        path: [
                            newV(0, 0, 0), newV(0, 0, WALL_HEIGHT)
                        ], 
                        sideOrientation: BABYLON.Mesh.DOUBLESIDE
                    });

                    wallStudIWSample.setEnabled(false);
                }

                newWallStudIW = wallStudIWSample.clone("stud");
                newWallStudIW.setEnabled(true);
                if(i !== TOTAL_WALL_STUD - 1) {
                    newWallStudIW.position.x += NOGGIN_LENGTH*i + STUD_FLANGE;
                } else {
                    newWallStudIW.position.x = WALL_LENGTH - STUD_FLANGE;
                }
                newWallStudIW.position.y += (STUD_WEB - WALL_STUD_WEB)/2;

                meshes = [...meshes, newWallStudIW];
                multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
            }

            //*** NOGGINS */
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
        
        //*** outerest wall stud left and right
        if(wallCladdingType === WALL_CLADDING_BOTH_SIDE 
       || (wallCladdingType === WALL_CLADDING_ONE_SIDE) && (externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE)) { 
            let leftOuterWallStudIW = BABYLON.MeshBuilder.ExtrudeShape("leftOuterStud", {
                shape: [
                    newV(0, 0, 0), newV(-STUD_FLANGE, 0, 0), 
                    newV(-STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0),  
                ], path: [
                    newV(0, 0, 0), newV(0, 0, WALL_HEIGHT)
                ], 
                sideOrientation: BABYLON.Mesh.DOUBLESIDE
            });

            meshes = [...meshes, leftOuterWallStudIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

            let rightOuterWallStudIW = BABYLON.MeshBuilder.ExtrudeShape("rightOuterStud", {
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

        // *** PLASTER BOARD
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
                plasterBoardCoordinates[2].y, 
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
        if((wallCladdingType === WALL_CLADDING_ONE_SIDE) 
        && externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE) {
            let externPlasterBoard = plasterBoard.clone("externPlasterBoard");
            externPlasterBoard.position.y += 2*STUD_FLANGE + 1;

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
                "plasterBoards": [],
                "externPlasterBoards": []
            }

            let studSizeName = FURNITURE_STUD_SIZE[studSize]?.["name"];
            let wallHeightTypeName = FURNITURE_WALL_HEIGHT_TYPES[wallHeightType]?.["name"];
                                
            //** BOTTOM PLATE
            const numBPLength3000 = Math.floor(WALL_LENGTH/300);
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
            if((wallCladdingType === WALL_CLADDING_BOTH_SIDE) || (wallCladdingType === WALL_CLADDING_ONE_SIDE)) {
                let pBName = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["name"];
                let pBLength = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["length"];
                let pBHeight = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["height"];
                let pbColorName = WALL_CLADDING_MATERIALS[wallCladdingMaterial]["colorName"];
    
                let pbSheetDetails = [];
    
                let totalLengthSection = Math.floor(WALL_LENGTH/pBLength);
                let lengthRemain = Math.round(WALL_LENGTH - totalLengthSection*pBLength);
    
                let totalHeightSection = Math.floor(WALL_HEIGHT/pBHeight);
                let heightRemain = Math.round(WALL_HEIGHT - totalHeightSection*pBHeight);
    
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

            //** EXTERN PLASTER BOARD */
            if((wallCladdingType === WALL_CLADDING_ONE_SIDE) 
            && externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE) {
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
            "wallHeight": WALL_HEIGHT,
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
    },
    async createUnderEavePurlinInteriorWallHasDoor(params, scene) {
        const { 
            name, wallType, wallHeightType, 
            wallCladdingType, wallCladdingMaterial, externWallCladding,
            studSize, studWeb, studFlange, studDistance, 
            doorList = [],
            isCreateNewWall = true, isCreateNewWallName = true, wallComponentIndexes
        } = params;

        let wallName = isCreateNewWallName ? ("W" + (++wallComponentIndexes["maxWallIdx"])) : name;

        // we reorder 'begin coord' and 'end coord' to set exactly door left
        let beginCoord = params.beginCoord; 
        let endCoord = params.endCoord; 

        if(params.endCoord.y > params.beginCoord.y) {
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

        let angle = BABYLON.Vector3.Dot(BABYLON.Axis.X, vec);
        angle = Math.acos(angle);

        const RAFTER_WIDTH = 35;
        const RAFTER_ABOVE_FLOOR = 466;

        const WALL_LENGTH = BABYLON.Vector3.Distance(endCoord, beginCoord);
        const WALL_HEIGHT = (RAFTER_ABOVE_FLOOR - RAFTER_WIDTH/2);

        const STUD_WEB = studWeb;
        const STUD_FLANGE = studFlange;
        const STUD_DISTANCE = studDistance;
        const WALL_STUD_WEB = 0.7 * STUD_WEB;

        let plasterBoard;

        let interiorMat = new BABYLON.StandardMaterial("interiorMat", scene);
        interiorMat.diffuseColor = new BABYLON.Color3.FromHexString(STEEL_STUD_INTERIOR_WALL_COLOR);
        interiorMat.backFaceCulling = false;

        let meshes = [];
        let multiMat = new BABYLON.MultiMaterial('multi', scene);

        let sampleDoorMeshes = [];
        let newDoorMeshes = [];

        for(let i = 0; i < doorList.length; i++) {
            let isExistDoorType = sampleDoorMeshes.find(item => item.name === doorList[i]["doorType"]);
            if(!isExistDoorType) {
                let importMeshes = await BABYLON.SceneLoader.ImportMeshAsync(
                    "", "/assets/FURNITURES/models/doors/", doorList[i]["doorType"] + ".glb", scene
                );
                importMeshes = importMeshes.meshes;

                if(importMeshes.length > 0) {
                    if(importMeshes[0].id === "__root__") {
                        importMeshes.splice(0, 1);
                    }
        
                    let sampleDoorMesh = BABYLON.Mesh.MergeMeshes(importMeshes, true, true, undefined, false, true);
                    sampleDoorMesh.name = doorList[i]["doorType"];
                    sampleDoorMeshes.push(sampleDoorMesh);
                }
            }
        }

        for(let i = 0; i < doorList.length; i++) {
            let findSampleDoorMesh = sampleDoorMeshes.find(item => item.name === doorList[i]["doorType"]);

            if(findSampleDoorMesh) {
                let newDoorMesh = findSampleDoorMesh.clone(doorList[i]["doorType"]);
                newDoorMesh.scaling.copyFromFloats(SIMULATE_3D_SCALE, SIMULATE_3D_SCALE, SIMULATE_3D_SCALE);
                newDoorMesh.position.x += doorList[i]["doorLeft"];
                newDoorMesh.position.y += STUD_WEB/2;
                newDoorMesh.doorType = doorList[i]["doorType"];
                newDoorMesh.doorWidth = doorList[i]["doorWidth"];
                newDoorMesh.doorHeight = doorList[i]["doorHeight"];

                newDoorMeshes.push(newDoorMesh);
            }
        }

        let distanceBetweenDoors = [];

        for(let i = 0; i < doorList.length; i++) {
            if(i === 0) {
                distanceBetweenDoors.push(
                    [0, doorList[i]["doorLeft"]]
                );
            } 
            else {
                distanceBetweenDoors.push(
                    [
                        doorList[i - 1]["doorLeft"] + doorList[i - 1]["doorWidth"], 
                        doorList[i]["doorLeft"]
                    ]
                )
            }
        }

        // from 'last door' to 'outer right wall'
        distanceBetweenDoors.push(
            [
                doorList[doorList.length - 1]["doorLeft"] + doorList[doorList.length - 1]["doorWidth"],
                WALL_LENGTH
            ]
        );

        // *** BOTTOM PLATE
        let bottomPlateIW = BABYLON.MeshBuilder.ExtrudeShape(`bottomPlate`, {
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

        // *** TOP PLATE
        let topPlateIW = BABYLON.MeshBuilder.ExtrudeShape(`topPlate`, {
            shape: [
                newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0), 
                newV(0, 0, 0), newV(STUD_FLANGE, 0, 0), 
            ], 
            path: [
                newV(0, 0, 0), newV(WALL_LENGTH, 0, 0)
            ], 
            sideOrientation: BABYLON.Mesh.FRONTSIDE
        });
        topPlateIW.position.z += WALL_HEIGHT;
        
        meshes = [...meshes, topPlateIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

        // *** WALL STUDS
        if( wallCladdingType === WALL_CLADDING_NONE 
        || (wallCladdingType === WALL_CLADDING_ONE_SIDE && (!externWallCladding || externWallCladding === EXTERN_WALL_CLADDING_NONE) )) {
            let wallStudIWSample;

            distanceBetweenDoors.map((data, idx) => {
                let distance = data[1] - data[0];
                let totalWallStud = Math.ceil(distance/STUD_DISTANCE);
                let studDistanceOffset = distance - (totalWallStud - 1)*STUD_DISTANCE;
                let nogginLength = STUD_DISTANCE + studDistanceOffset/(totalWallStud-1);

                for(let i = 0; i < totalWallStud; i++) {
                    let newWallStudIW;

                    if(i === 0) {
                        wallStudIWSample = BABYLON.MeshBuilder.ExtrudeShape(`studSample`, {
                            shape: [
                                newV(0, 0, 0), newV(-STUD_FLANGE, 0, 0), 
                                newV(-STUD_FLANGE, WALL_STUD_WEB, 0), newV(0, WALL_STUD_WEB, 0), 
                            ], 
                            path: [
                                newV(0, 0, 0), newV(0, 0, WALL_HEIGHT)
                            ], 
                            sideOrientation: BABYLON.Mesh.DOUBLESIDE
                        });

                        wallStudIWSample.setEnabled(false);
                    }

                    newWallStudIW = wallStudIWSample.clone(`stud`);
                    newWallStudIW.setEnabled(true);

                    if(i !== totalWallStud - 1) {
                        newWallStudIW.position.x = data[0] + nogginLength * i;
                    } else {
                        newWallStudIW.position.x = data[0] + distance;
                    }

                    meshes = [...meshes, newWallStudIW];
                    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
                }
            });
                
            //*** CRIPPLE STUD
            for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
                let doorWidth = doorList[i]["doorWidth"];
                let doorHeight = doorList[i]["doorHeight"];
                let fromHeaderDoorToTopPlate = WALL_HEIGHT - doorHeight;
                let totalCrippleStud = Math.ceil(doorWidth/STUD_DISTANCE + 1);
                let crippleStudDistance = Math.ceil(doorWidth/totalCrippleStud);
                let crippleStudDistanceOffset = (doorWidth - (totalCrippleStud-1)*crippleStudDistance);
            
                for(let j = 0; j < totalCrippleStud - 2; j++) {
                    let crippleStudIW = BABYLON.MeshBuilder.ExtrudeShape(`crippleStud`, {
                        shape: [
                            newV(0, 0, 0), newV(-STUD_FLANGE, 0, 0), 
                            newV(-STUD_FLANGE, WALL_STUD_WEB, 0), newV(0, WALL_STUD_WEB, 0), 
                        ], 
                        path: [
                            newV(0, 0, 0), newV(0, 0, fromHeaderDoorToTopPlate)
                        ], 
                        sideOrientation: BABYLON.Mesh.DOUBLESIDE
                    });
                    crippleStudIW.position.x = distanceBetweenDoors[i][1] + (crippleStudDistance + crippleStudDistanceOffset/(totalCrippleStud-1))*(j + 1);
                    crippleStudIW.position.z = doorHeight;

                    meshes = [...meshes, crippleStudIW];
                    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
                }
            }

            // //*** NOGGINS
            let nogginIWSample;

            distanceBetweenDoors.map((data, idx) => {
                let distance = data[1] - data[0];
                let totalWallStud = Math.ceil(distance/STUD_DISTANCE);
                let studDistanceOffset = distance - (totalWallStud - 1)*STUD_DISTANCE;
                let nogginLength = STUD_DISTANCE + studDistanceOffset/(totalWallStud-1);

                for(let i = 0; i < totalWallStud - 1; i++) {
                    let newNogginIW;

                    if(i === 0) {
                        nogginIWSample = BABYLON.MeshBuilder.ExtrudeShape(`nogginSample`, {
                            shape: [
                                newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0), 
                                newV(0, 0, 0), newV(STUD_FLANGE, 0, 0)
                            ], 
                            path: [
                                newV(0, 0, 0), newV(nogginLength, 0, 0)
                            ], 
                            sideOrientation: BABYLON.Mesh.FRONTSIDE
                        });
                        nogginIWSample.setEnabled(false);
                    }

                    newNogginIW = nogginIWSample.clone(`noggin`);
                    newNogginIW.setEnabled(true);

                    newNogginIW.position.x = data[0] + (nogginLength * i);
                    newNogginIW.position.z = WALL_HEIGHT/2;

                    meshes = [...meshes, newNogginIW];
                    multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
                }
            });
        }

        //*** HEADER DOOR STUD
        for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
            let doorWidth = doorList[i]["doorWidth"];
            let doorHeight = doorList[i]["doorHeight"];
            let headerDoorStudLength = doorWidth;

            let headerDoorStudIW = BABYLON.MeshBuilder.ExtrudeShape(`headerDoorStud`, {
                shape: [
                    newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0), 
                    newV(0, 0, 0), newV(STUD_FLANGE, 0, 0)
                ], 
                path: [
                    newV(0, 0, 0), newV(headerDoorStudLength, 0, 0)
                ], 
                sideOrientation: BABYLON.Mesh.FRONTSIDE
            });
            headerDoorStudIW.position.x = distanceBetweenDoors[i][1];
            headerDoorStudIW.position.z = doorHeight;

            meshes = [...meshes, headerDoorStudIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
        }

        //** */ OUTEREST WALL STUDS LEFT AND RIGHT
        if(wallCladdingType === WALL_CLADDING_BOTH_SIDE 
        || (wallCladdingType === WALL_CLADDING_ONE_SIDE) && (externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE)) {
            let leftOuterWallStudIW = BABYLON.MeshBuilder.ExtrudeShape(`leftOuterStud`, {
                shape: [
                    newV(0, 0, 0), newV(-STUD_FLANGE, 0, 0), 
                    newV(-STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0),
                ], 
                path: [
                    newV(0, 0, 0), newV(0, 0, WALL_HEIGHT)
                ], 
                sideOrientation: BABYLON.Mesh.DOUBLESIDE
            });

            meshes = [...meshes, leftOuterWallStudIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

            let rightOuterWallStudIW = BABYLON.MeshBuilder.ExtrudeShape(`rightOuterStud`, {
                shape: [
                    newV(0, 0, 0), newV(STUD_FLANGE, 0, 0), newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0) 
                ], 
                path: [
                    newV(0, 0, 0), newV(0, 0, WALL_HEIGHT)
                ], 
                sideOrientation: BABYLON.Mesh.DOUBLESIDE
            });

            rightOuterWallStudIW.position.x += WALL_LENGTH - STUD_FLANGE;

            meshes = [...meshes, rightOuterWallStudIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

            //*** TRIMMER DOOR STUD
            for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
                let doorWidth = doorList[i]["doorWidth"];
                let doorHeight = doorList[i]["doorHeight"];

                let leftTrimmerDoorStudIW = BABYLON.MeshBuilder.ExtrudeShape(`leftTrimmerDoorStud`, {
                    shape: [
                        newV(0, 0, 0), newV(-STUD_FLANGE, 0, 0), 
                        newV(-STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0),
                    ], 
                    path: [
                        newV(0, 0, 0), newV(0, 0, doorHeight)
                    ], 
                    sideOrientation: BABYLON.Mesh.DOUBLESIDE
                });
                leftTrimmerDoorStudIW.position.x = distanceBetweenDoors[i][1];
       
                meshes = [...meshes, leftTrimmerDoorStudIW];
                multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

                let rightTrimmerDoorStudIW = BABYLON.MeshBuilder.ExtrudeShape(`rightTrimmerDoorStud`, {
                    shape: [
                        newV(0, 0, 0), newV(STUD_FLANGE, 0, 0), newV(STUD_FLANGE, STUD_WEB, 0), newV(0, STUD_WEB, 0) 
                    ], 
                    path: [
                        newV(0, 0, 0), newV(0, 0, doorHeight)
                    ], 
                    sideOrientation: BABYLON.Mesh.DOUBLESIDE
                });
                rightTrimmerDoorStudIW.position.x = distanceBetweenDoors[i][1] + doorWidth;

                meshes = [...meshes, rightTrimmerDoorStudIW]
                multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
            }
        }

        // *** PLASTER BOARD
        if((wallCladdingType === WALL_CLADDING_BOTH_SIDE) || (wallCladdingType === WALL_CLADDING_ONE_SIDE)) {
            let pBDepth = WALL_CLADDING_MATERIALS[wallCladdingMaterial]?.["depth"];
            let pbColor = WALL_CLADDING_MATERIALS[wallCladdingMaterial]?.["color"];
            let rectanglePBCoordinates = [];

            rectanglePBCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
            rectanglePBCoordinates[1] = new BABYLON.Vector3(
                rectanglePBCoordinates[0].x + WALL_LENGTH, 
                rectanglePBCoordinates[0].y, 
                rectanglePBCoordinates[0].z
            );

            rectanglePBCoordinates[2] = new BABYLON.Vector3(
                rectanglePBCoordinates[1].x, 
                rectanglePBCoordinates[1].y + WALL_HEIGHT, 
                rectanglePBCoordinates[1].z
            );

            rectanglePBCoordinates[3] = new BABYLON.Vector3(
                rectanglePBCoordinates[2].x - WALL_LENGTH, 
                rectanglePBCoordinates[2].y, 
                rectanglePBCoordinates[2].z
            );

            let rectanglePBMeshBuilder = new BABYLON.PolygonMeshBuilder("rectanglePB", rectanglePBCoordinates, scene, earcut);    
            let rectanglePBMesh = rectanglePBMeshBuilder.build(true, pBDepth || 1);
            if(wallCladdingType === WALL_CLADDING_BOTH_SIDE) rectanglePBMesh.position.y += STUD_FLANGE;

            let plasterBoardMat = new BABYLON.StandardMaterial("plasterBoardMat", scene);
            plasterBoardMat.diffuseColor = new BABYLON.Color3.FromHexString(pbColor || STEEL_STUD_PLASTER_BOARD_COLOR);
            plasterBoardMat.backFaceCulling = false;

            let rectanglePBCSG = BABYLON.CSG.FromMesh(rectanglePBMesh);

            for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
                let doorWidth = doorList[i]["doorWidth"];
                let doorHeight = doorList[i]["doorHeight"];

                let doorPanelCoordinates = [];

                doorPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
                doorPanelCoordinates[1] = new BABYLON.Vector3(
                    doorPanelCoordinates[0].x + (doorWidth + STUD_FLANGE), 
                    doorPanelCoordinates[0].y, 
                    doorPanelCoordinates[0].z
                );
                doorPanelCoordinates[2] = new BABYLON.Vector3(
                    doorPanelCoordinates[1].x, 
                    doorPanelCoordinates[1].y + doorHeight, 
                    doorPanelCoordinates[1].z
                );
                doorPanelCoordinates[3] = new BABYLON.Vector3(
                    doorPanelCoordinates[2].x - (doorWidth + STUD_FLANGE), 
                    doorPanelCoordinates[2].y, 
                    doorPanelCoordinates[2].z
                );

                let doorPanelMeshBuilder = new BABYLON.PolygonMeshBuilder("doorPanel", doorPanelCoordinates, scene, earcut);    
                let doorPanel = doorPanelMeshBuilder.build(true, 100);
                doorPanel.position.x = distanceBetweenDoors[i][1] - (STUD_FLANGE/2);
                doorPanel.setPivotMatrix(BABYLON.Matrix.Translation(0, 100/2, 0), false)

                let mat = new BABYLON.StandardMaterial("mat", scene);
                mat.diffuseColor = new BABYLON.Color3.Green();
                mat.backFaceCulling = false;

                doorPanel.material = mat;

                let doorMeshCSG = BABYLON.CSG.FromMesh(doorPanel);
                rectanglePBCSG = rectanglePBCSG.subtract(doorMeshCSG);

                doorPanel.dispose();
            }

            plasterBoard = rectanglePBCSG.toMesh("plasterBoard", plasterBoardMat, scene, false);
            rectanglePBMesh.dispose();

            meshes = [...meshes, plasterBoard]; 
            multiMat.subMaterials = [...multiMat.subMaterials, plasterBoardMat];
        }

        //** EXTERN PLASTER BOARD */
        if((wallCladdingType === WALL_CLADDING_ONE_SIDE) && externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE) {
            let externPlasterBoard = plasterBoard.clone("externPlasterBoard");
            externPlasterBoard.position.y += 2*STUD_FLANGE + 1;

            let externPlasterBoardMat = new BABYLON.StandardMaterial("externPlasterBoardMat", scene);
            externPlasterBoardMat.emissiveColor = new BABYLON.Color3.FromHexString(STEEL_STUD_EXTERN_PLASTER_BOARD_COLOR);
            externPlasterBoardMat.diffuseTexture = new BABYLON.Texture(`/assets/textures/walls/${externWallCladding}.jpg`); 
            externPlasterBoardMat.diffuseTexture.vScale = Math.ceil(WALL_HEIGHT/STUD_DISTANCE);
            externPlasterBoardMat.diffuseTexture.uScale = 1;
            externPlasterBoardMat.backFaceCulling = false;

            meshes = [...meshes, externPlasterBoard]; 
            multiMat.subMaterials = [...multiMat.subMaterials, externPlasterBoardMat];
        }

        // *** NUMBERED INTERIOR WALL'S COMPONENT
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
                "externPlasterBoards": [],
                "doors": []
            }

            let studSizeName = FURNITURE_STUD_SIZE[studSize]?.["name"];
            let wallHeightTypeName = FURNITURE_WALL_HEIGHT_TYPES[wallHeightType]?.["name"];

            //** BOTTOM PLATE
            const numBPLength3000 = Math.floor(WALL_LENGTH/300);
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
                let totalWallStud = 0;

                distanceBetweenDoors.map((data, idx) => {
                    let distance = data[1] - data[0];
                    totalWallStud += Math.ceil(distance/STUD_DISTANCE);
                });

                wallComponentIndexes[wallName]["studs"].push({
                    "item": "Stud",
                    "desc": studSizeName,
                    "mark": 'S' + (++wallComponentIndexes["maxStudIdx"]),
                    "wallName": wallName,
                    "wallHeightType": wallHeightTypeName,
                    "length": floor(Math.round(WALL_HEIGHT * 10), -2),
                    "cutLength": Math.round(WALL_HEIGHT * 10),
                    "quantity": totalWallStud
                });

                // *** CRIPPLE STUDS
                for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
                    let doorWidth = doorList[i]["doorWidth"];
                    let doorHeight = doorList[i]["doorHeight"];
                    let fromHeaderDoorToTopPlate = WALL_HEIGHT - doorHeight;
                    let totalCrippleStud = Math.ceil(doorWidth/STUD_DISTANCE + 1);

                    wallComponentIndexes[wallName]["crippleStuds"].push({
                        "item": "Cripple Stud",
                        "desc": studSizeName,
                        "mark": 'CS' + (++wallComponentIndexes["maxCrippleStudIdx"]),
                        "wallName": wallName,
                        "wallHeightType": wallHeightTypeName,
                        "length": floor(Math.round(fromHeaderDoorToTopPlate * 10), -2),
                        "cutLength": Math.round(fromHeaderDoorToTopPlate * 10), 
                        "quantity": totalCrippleStud - 2
                    });
                }

                //** NOGGINS */
                distanceBetweenDoors.map((data, idx) => {
                    let distance = data[1] - data[0];
                    let totalWallStud = Math.ceil(distance/STUD_DISTANCE);
                    let studDistanceOffset = distance - (totalWallStud - 1)*STUD_DISTANCE;
                    let nogginLength = STUD_DISTANCE + studDistanceOffset/(totalWallStud-1);
    
                    wallComponentIndexes[wallName]["noggins"].push({
                        "item": "Noggin",
                        "desc": studSizeName,
                        "mark": 'N' + (++wallComponentIndexes["maxNogginIdx"]),
                        "wallName": wallName,
                        "wallHeightType": wallHeightTypeName,
                        "length": floor(Math.round(nogginLength * 10), -1),
                        "cutLength": Math.round(nogginLength * 10), 
                        "quantity": totalWallStud - 1
                    });
                });
            }

            // *** HEADER STUDS
            for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
                let doorWidth = doorList[i]["doorWidth"];
                let headerDoorStudLength = doorWidth;
    
                wallComponentIndexes[wallName]["headerStuds"].push({
                    "item": "Header Stud",
                    "desc": studSizeName,
                    "mark": 'HS' + (++wallComponentIndexes["maxHeaderStudIdx"]),
                    "wallName": wallName,
                    "wallHeightType": wallHeightTypeName,
                    "length": floor(Math.round(headerDoorStudLength * 10), -2),
                    "cutLength": Math.round(headerDoorStudLength * 10),
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

                for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
                    let doorHeight = doorList[i]["doorHeight"];
    
                    wallComponentIndexes[wallName]["trimmerDoorStuds"].push({
                        "item": "Trimmer Door Stud",
                        "desc": studSizeName,
                        "mark": 'TDS' + (++wallComponentIndexes["maxTrimmerDoorStudIdx"]),
                        "wallName": wallName,
                        "wallHeightType": wallHeightTypeName,
                        "length": floor(Math.round(doorHeight * 10), -2),
                        "cutLength": Math.round(doorHeight * 10),
                        "quantity": 2
                    });
                }
            }

            // ** DOOR */
            for(let i = 0; i < doorList.length; i++) {
                let doorName = FURNITURE_DOOR_TYPES[doorList[i]["doorType"]]?.["name"]
                let doorWidth = doorList[i]["doorWidth"];
                let doorHeight = doorList[i]["doorHeight"];

                wallComponentIndexes[wallName]["doors"].push({
                    "item": "Door",
                    "desc": doorName,
                    "mark": 'D' + (++wallComponentIndexes["maxDoorIdx"]),
                    "wallName": wallName,
                    "wallHeightType": wallHeightTypeName,
                    "length": `${parseFloat(doorHeight) * 10} x ${parseFloat(doorWidth) * 10} (H x W)`,
                    "cutLength": `${parseFloat(doorHeight) * 10} x ${parseFloat(doorWidth) * 10} (H x W)`,
                    "quantity": 1
                });
            }
        }

        // *** MERGE MESHES
        let newInteriorWallMesh = BABYLON.Mesh.MergeMeshes(meshes, true, true, undefined, true);
        newInteriorWallMesh.name = wallName;

        newInteriorWallMesh.position = new BABYLON.Vector3(beginCoord.x, beginCoord.y, beginCoord.z);
        newInteriorWallMesh.rotation.z = sign !== 0 ? -1*sign*angle : angle;

        newInteriorWallMesh.wallParams = {
            "beginCoord": {x: beginCoord.x, y: beginCoord.y, z: beginCoord.z},
            "endCoord": {x: endCoord.x, y: endCoord.y, z: endCoord.z},
            "wallType": wallType,
            "wallHeightType": wallHeightType,
            "wallLength": WALL_LENGTH,
            "wallHeight": WALL_HEIGHT,
            "wallCladdingType": wallCladdingType,
            "wallCladdingMaterial": wallCladdingMaterial,
            "externWallCladding": externWallCladding,
            "studSize": studSize,
            "studWeb": studWeb,
            "studFlange": studFlange,
            "studDistance": studDistance,
            "doorList": doorList
        }

        // set multi material
        newInteriorWallMesh.material = multiMat;
        for(let i = 0; i < newInteriorWallMesh.subMeshes.length; i++) {
            newInteriorWallMesh.subMeshes[i].materialIndex = i;
        }

        newInteriorWallMesh.enableEdgesRendering();
        newInteriorWallMesh.edgesWidth = 10.0;
        newInteriorWallMesh.edgesColor = new BABYLON.Color4(117/255, 117/255, 117/255, 1);

        // attach door into wall
        newDoorMeshes.map(newDoorMesh => {
            newDoorMesh.parent = newInteriorWallMesh;
        });

        return { wall: newInteriorWallMesh, doors: newDoorMeshes };
    },
}

export default UnderEavePurlinLibrary;