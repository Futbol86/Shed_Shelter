import * as BABYLON from "babylonjs";
import earcut from "earcut";
import { floor } from "lodash";
import {
    SHED_BUILDING_INFORMATION, SIMULATE_3D_SCALE, UNDERSIDE_OF_PURLIN_WALL, UNDERSIDE_OF_RAFTER_WALL, 
    WALL_CLADDING_BOTH_SIDE, WALL_CLADDING_ONE_SIDE, WALL_CLADDING_NONE, WALL_CLADDING_MATERIALS, 
    PINE_STUD_INTERIOR_WALL_COLOR, PINE_STUD_PLASTER_BOARD_COLOR, PINE_STUD_EXTERN_PLASTER_BOARD_COLOR, EXTERN_WALL_CLADDINGS,
    EXTERN_WALL_CLADDING_NONE, FLOOR_HEIGHT,
    FURNITURE_WALL_HEIGHT_TYPES, FURNITURE_STUD_SIZE, FURNITURE_DOOR_TYPES
} from '../../../../constants';

let UnderOrTopRafterWallHasDoorLibrary = {
    async createUnderOrTopRafterInteriorWallHasDoor(params, scene) {
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
                return (await createWallHasDoorLocateHalfLeftAlongAxisX(params, scene));
            }
            // 2 point of wall locate on right haft sheds
            else if(FROM_BEGIN_COORD_TO_SHED_CENTER < 0 && FROM_SHED_CENTER_TO_END_COORD < 0) {
                return (await createWallHasDoorLocateHalfRightAlongAxisX(params, scene));
            }
            // 1 point of wall locate of left and another point locate on right
            else if(FROM_BEGIN_COORD_TO_SHED_CENTER > 0 && FROM_SHED_CENTER_TO_END_COORD < 0) {
                return (await createWallHasDoorLocateLeftAndRightAlongAxisX(params, scene));
            }
        } 
        // ** interior wall locate along SHED'S LENGTH
        else {
            return (await createWallHasDoorLocateAlongAxisY(params, scene));
        }
    },
}

var createWallHasDoorLocateHalfLeftAlongAxisX = async(params, scene) => {
    const { 
        name, wallType, wallHeightType, studSize, studWeb, studFlange, studDistance, 
        doorList = [],
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

    const MIN_WALL_HEIGHT = MIN_ROOF_HEIGHT + beginCoord.x * Math.tan(ROOF_PITCH);
    const MAX_WALL_HEIGHT = MIN_ROOF_HEIGHT + endCoord.x * Math.tan(ROOF_PITCH);
    const TOP_PLATE_WIDTH = WALL_LENGTH/Math.cos(ROOF_PITCH);

    let meshes = [];
    let plasterBoard;

    let multiMat = new BABYLON.MultiMaterial('multi', scene);
    let interiorMat = new BABYLON.StandardMaterial("interiorMat", scene);
    interiorMat.diffuseColor = new BABYLON.Color3.FromHexString(PINE_STUD_INTERIOR_WALL_COLOR);
    interiorMat.backFaceCulling = false;
   
    let sampleDoorMeshes = [];
    let newDoorMeshes = [];

    // import doors
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
        // ** WALL STUDS
        distanceBetweenDoors.map((data, idx) => {
            let distance = data[1] - data[0];
            let totalWallStud = Math.ceil(distance/STUD_DISTANCE);
            let studDistanceOffset = distance - (totalWallStud - 1)*STUD_DISTANCE;
            let nogginLength = STUD_DISTANCE + studDistanceOffset/(totalWallStud-1);

            for(let i = 0; i < totalWallStud; i++) {
                let wallStudHeight = MIN_WALL_HEIGHT + (data[0] + nogginLength * i) * Math.tan(ROOF_PITCH);

                let newWallStudIW = BABYLON.MeshBuilder.CreateBox(`studSample`, {
                    width: STUD_FLANGE, height: STUD_WEB, depth: wallStudHeight, updatable: true
                }, scene);

                newWallStudIW.setEnabled(true);
                newWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, wallStudHeight/2), false);

                if(i !== totalWallStud - 1) {
                    newWallStudIW.position.x = data[0] + nogginLength * i;
                } else {
                    newWallStudIW.position.x = data[0] + (distance - STUD_FLANGE);
                }

                meshes = [...meshes, newWallStudIW];
                multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
            }
        });

        // //*** CRIPPLE STUD
        for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
            let doorWidth = doorList[i]["doorWidth"];
            let doorHeight = doorList[i]["doorHeight"];

            let totalCrippleStud = Math.ceil(doorWidth/STUD_DISTANCE + 1);
            let crippleStudDistance = Math.ceil(doorWidth/totalCrippleStud);
            let crippleStudDistanceOffset = (doorWidth - (totalCrippleStud-1)*crippleStudDistance);
            let distanceBetweenTwoCrippleStud = crippleStudDistance + crippleStudDistanceOffset/(totalCrippleStud-1);

            for(let j = 0; j < totalCrippleStud - 2; j++) {
                let fromHeaderDoorToTopPlate = (MIN_WALL_HEIGHT + (distanceBetweenDoors[i][1] + distanceBetweenTwoCrippleStud*(j + 1))*Math.tan(ROOF_PITCH)) - doorHeight;

                let crippleStudIW = BABYLON.MeshBuilder.CreateBox(`crippleStud`, {
                    width: STUD_FLANGE, height: STUD_WEB, depth: fromHeaderDoorToTopPlate, updatable: true
                }, scene);
                crippleStudIW.position.x = distanceBetweenDoors[i][1] + (crippleStudDistance + crippleStudDistanceOffset/(totalCrippleStud-1))*(j + 1);
                crippleStudIW.position.z = doorHeight;
                crippleStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, fromHeaderDoorToTopPlate/2), false);

                meshes = [...meshes, crippleStudIW];
                multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
            }
        }

        // //*** NOGGIN */
        let nogginIWSample;

        distanceBetweenDoors.map((data, idx) => {
            let distance = data[1] - data[0];
            let totalWallStud = Math.ceil(distance/STUD_DISTANCE);
            let studDistanceOffset = distance - (totalWallStud - 1)*STUD_DISTANCE;
            let nogginLength = STUD_DISTANCE + studDistanceOffset/(totalWallStud-1);

            for(let i = 0; i < totalWallStud - 1; i++) {
                let newNogginIW;

                if(i === 0) {
                    nogginIWSample = BABYLON.MeshBuilder.CreateBox(`nogginSample`, {
                        width: nogginLength, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
                    }, scene);
                    nogginIWSample.setEnabled(false);
                }

                newNogginIW = nogginIWSample.clone(`noggin`);
                newNogginIW.setEnabled(true);
                newNogginIW.setPivotMatrix(BABYLON.Matrix.Translation(nogginLength/2, STUD_WEB/2, STUD_FLANGE/2), false);
                newNogginIW.position.x = data[0] + (nogginLength * i);
                newNogginIW.position.z = MIN_WALL_HEIGHT/2;

                if(i%2 === 1) {
                    newNogginIW.position.z -= 20;
                }

                meshes = [...meshes, newNogginIW];
                multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
            }
        });
    }

    // //*** HEADER DOOR STUD
    for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
        let doorWidth = doorList[i]["doorWidth"];
        let doorHeight = doorList[i]["doorHeight"];
        let headerDoorStudLength = doorWidth + STUD_FLANGE;

        let headerDoorStudIW = BABYLON.MeshBuilder.CreateBox(`headerDoorStud`, {
            width: headerDoorStudLength, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
        }, scene); 
        headerDoorStudIW.position.x = distanceBetweenDoors[i][1];
        headerDoorStudIW.position.z = doorHeight;
        headerDoorStudIW.setPivotMatrix(BABYLON.Matrix.Translation(headerDoorStudLength/2, STUD_WEB/2, STUD_FLANGE/2), false);

        meshes = [...meshes, headerDoorStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
    }

    //*** Outerest wall stud left and right
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE 
    || (wallCladdingType === WALL_CLADDING_ONE_SIDE) && (externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE)) {   
        let leftOuterWallStudIW = BABYLON.MeshBuilder.CreateBox('leftOuterStud', {
            width: STUD_FLANGE, height: STUD_WEB, depth: MIN_WALL_HEIGHT, updatable: true
        }, scene); 
        leftOuterWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, MIN_WALL_HEIGHT/2), false);

        meshes = [...meshes, leftOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

        let rightOuterWallStudIW = BABYLON.MeshBuilder.CreateBox('rightOuterStud', {
            width: STUD_FLANGE, height: STUD_WEB, depth: MAX_WALL_HEIGHT, updatable: true
        }, scene);
        rightOuterWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, MAX_WALL_HEIGHT/2), false);
        rightOuterWallStudIW.position.x += WALL_LENGTH - STUD_FLANGE;

        meshes = [...meshes, rightOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

        //*** TRIMMER DOOR STUD
        for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
            let doorWidth = doorList[i]["doorWidth"];
            let doorHeight = doorList[i]["doorHeight"];

            let leftTrimmerStudIW = BABYLON.MeshBuilder.CreateBox(`leftTrimmerStud`, {
                width: STUD_FLANGE, height: STUD_WEB, depth: doorHeight, updatable: true
            }, scene);
            leftTrimmerStudIW.position.x = distanceBetweenDoors[i][1];
            leftTrimmerStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, doorHeight/2), false);

            meshes = [...meshes, leftTrimmerStudIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

            let rightTrimmerStudIW = BABYLON.MeshBuilder.CreateBox(`rightTrimmerStud`, {
                width: STUD_FLANGE, height: STUD_WEB, depth: doorHeight, updatable: true
            }, scene);
            rightTrimmerStudIW.position.x = distanceBetweenDoors[i][1] + doorWidth;
            rightTrimmerStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, doorHeight/2), false);

            meshes = [...meshes, rightTrimmerStudIW]
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
        }
    }
     
    //** PLASTER BOARD
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE || wallCladdingType === WALL_CLADDING_ONE_SIDE) {
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
            rectanglePBCoordinates[1].y + MAX_WALL_HEIGHT, 
            rectanglePBCoordinates[1].z
        );

        rectanglePBCoordinates[3] = new BABYLON.Vector3(
            rectanglePBCoordinates[2].x - WALL_LENGTH, 
            rectanglePBCoordinates[2].y - (MAX_WALL_HEIGHT - MIN_WALL_HEIGHT), 
            rectanglePBCoordinates[2].z
        );

        let rectanglePBMeshBuilder = new BABYLON.PolygonMeshBuilder("rectanglePB", rectanglePBCoordinates, scene, earcut);    
        let rectanglePBMesh = rectanglePBMeshBuilder.build(true, pBDepth || 1);
        if(wallCladdingType === WALL_CLADDING_BOTH_SIDE) rectanglePBMesh.position.y += STUD_FLANGE;

        let plasterBoardMat = new BABYLON.StandardMaterial("plasterBoardMat", scene);
        plasterBoardMat.diffuseColor = new BABYLON.Color3.FromHexString(pbColor || PINE_STUD_PLASTER_BOARD_COLOR);
        plasterBoardMat.backFaceCulling = false;

        // tiếp theo chúng ta sẽ tạo những ô hình chữ nhật để cắt
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
                doorPanelCoordinates[1].y + (doorHeight + STUD_FLANGE), 
                doorPanelCoordinates[1].z
            );
            doorPanelCoordinates[3] = new BABYLON.Vector3(
                doorPanelCoordinates[2].x - (doorWidth + STUD_FLANGE), 
                doorPanelCoordinates[2].y, 
                doorPanelCoordinates[2].z
            );

            let doorPanelMeshBuilder = new BABYLON.PolygonMeshBuilder("doorPanel", doorPanelCoordinates, scene, earcut);    
            let doorPanel = doorPanelMeshBuilder.build(true, 100);
            doorPanel.position.x = distanceBetweenDoors[i][1];
            doorPanel.setPivotMatrix(BABYLON.Matrix.Translation(0, 100/2, 0), false)

            let mat = new BABYLON.StandardMaterial("mat", scene);
            mat.diffuseColor = new BABYLON.Color3.Green();
            mat.backFaceCulling = false;

            doorPanel.material = mat;

            let doorMeshCSG = BABYLON.CSG.FromMesh(doorPanel);
            rectanglePBCSG = rectanglePBCSG.subtract(doorMeshCSG);

            doorPanel.dispose();
        }

        // chuyển CSG tới Mesh
        plasterBoard = rectanglePBCSG.toMesh("plasterBoard", plasterBoardMat, scene, false);
        rectanglePBMesh.dispose();

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

    // *** */ NUMBERED INTERIOR WALL'S COMPONENT
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
        const numTPLength3600 = floor(TOP_PLATE_WIDTH/360, 0);
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
            distanceBetweenDoors.map((data, idx) => {
                let distance = data[1] - data[0];
                let totalWallStud = Math.ceil(distance/STUD_DISTANCE);
                let studDistanceOffset = distance - (totalWallStud - 1)*STUD_DISTANCE;
                let nogginLength = STUD_DISTANCE + studDistanceOffset/(totalWallStud-1);
    
                for(let i = 0; i < totalWallStud; i++) {
                    let wallStudHeight = MIN_WALL_HEIGHT + (data[0] + nogginLength * i) * Math.tan(ROOF_PITCH);
    
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
            });

            // *** CRIPPLE STUDS
            for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
                let doorWidth = doorList[i]["doorWidth"];
                let doorHeight = doorList[i]["doorHeight"];
    
                let totalCrippleStud = Math.ceil(doorWidth/STUD_DISTANCE + 1);
                let crippleStudDistance = Math.ceil(doorWidth/totalCrippleStud);
                let crippleStudDistanceOffset = (doorWidth - (totalCrippleStud-1)*crippleStudDistance);
                let distanceBetweenTwoCrippleStud = crippleStudDistance + crippleStudDistanceOffset/(totalCrippleStud-1);
    
                for(let j = 0; j < totalCrippleStud - 2; j++) {
                    let fromHeaderDoorToTopPlate = (MIN_WALL_HEIGHT + (distanceBetweenDoors[i][1] + distanceBetweenTwoCrippleStud*(j + 1))*Math.tan(ROOF_PITCH)) - doorHeight;
    
                    wallComponentIndexes[wallName]["crippleStuds"].push({
                        "item": "Cripple Stud",
                        "desc": studSizeName,
                        "mark": 'CS' + (++wallComponentIndexes["maxCrippleStudIdx"]),
                        "wallName": wallName,
                        "wallHeightType": wallHeightTypeName,
                        "length": floor(Math.round(fromHeaderDoorToTopPlate * 10), -2),
                        "cutLength": Math.round(fromHeaderDoorToTopPlate * 10), 
                        "quantity": 1
                    });
                }
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
            let headerDoorStudLength = doorWidth + STUD_FLANGE;

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
        "doorList": doorList
    }

    // set multi material
    newInteriorWallMesh.material = multiMat;
    for(let i = 0; i < newInteriorWallMesh.subMeshes.length; i++) {
        newInteriorWallMesh.subMeshes[i].materialIndex = i;
    }

    // attach door into wall
    newDoorMeshes.map(newDoorMesh => {
        newDoorMesh.parent = newInteriorWallMesh;
    });

    return { wall: newInteriorWallMesh, doors: newDoorMeshes };
}

var createWallHasDoorLocateHalfRightAlongAxisX = async(params, scene) => {
    const { 
        name, wallType, wallHeightType, studSize, studWeb, studFlange, studDistance, 
        doorList = [],
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

    let meshes = [];
    let plasterBoard;

    let multiMat = new BABYLON.MultiMaterial('multi', scene);
    let interiorMat = new BABYLON.StandardMaterial("interiorMat", scene);
    interiorMat.diffuseColor = new BABYLON.Color3.FromHexString(PINE_STUD_INTERIOR_WALL_COLOR);
    interiorMat.backFaceCulling = false;

    let sampleDoorMeshes = [];
    let newDoorMeshes = [];

    // import doors
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

    //*** WALL STUD */
    if( wallCladdingType === WALL_CLADDING_NONE 
    || (wallCladdingType === WALL_CLADDING_ONE_SIDE && (!externWallCladding || externWallCladding === EXTERN_WALL_CLADDING_NONE) )) {
        // ** WALL STUDS
        distanceBetweenDoors.map((data, idx) => {
            let distance = data[1] - data[0];
            let totalWallStud = Math.ceil(distance/STUD_DISTANCE);
            let studDistanceOffset = distance - (totalWallStud - 1)*STUD_DISTANCE;
            let nogginLength = STUD_DISTANCE + studDistanceOffset/(totalWallStud-1);

            for(let i = 0; i < totalWallStud; i++) {
                let wallStudHeight = MAX_WALL_HEIGHT - (data[0] + nogginLength * i) * Math.tan(ROOF_PITCH);
                let newWallStudIW = BABYLON.MeshBuilder.CreateBox(`studSample`, {
                    width: STUD_FLANGE, height: STUD_WEB, depth: wallStudHeight, updatable: true
                }, scene);

                newWallStudIW.setEnabled(true);
                newWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, wallStudHeight/2), false);

                if(i !== totalWallStud - 1) {
                    newWallStudIW.position.x = data[0] + nogginLength * i;
                } else {
                    newWallStudIW.position.x = data[0] + (distance - STUD_FLANGE);
                }

                meshes = [...meshes, newWallStudIW];
                multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
            }
        });

        // //*** CRIPPLE STUD
        for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
            let doorWidth = doorList[i]["doorWidth"];
            let doorHeight = doorList[i]["doorHeight"];

            let totalCrippleStud = Math.ceil(doorWidth/STUD_DISTANCE + 1);
            let crippleStudDistance = Math.ceil(doorWidth/totalCrippleStud);
            let crippleStudDistanceOffset = (doorWidth - (totalCrippleStud-1)*crippleStudDistance);
            let distanceBetweenTwoCrippleStud = crippleStudDistance + crippleStudDistanceOffset/(totalCrippleStud-1);
            
            for(let j = 0; j < totalCrippleStud - 2; j++) {
                let fromHeaderDoorToTopPlate = (MAX_WALL_HEIGHT - (distanceBetweenDoors[i][1] + distanceBetweenTwoCrippleStud*(j + 1))*Math.tan(ROOF_PITCH)) - doorHeight;

                let crippleStudIW = BABYLON.MeshBuilder.CreateBox(`crippleStud`, {
                    width: STUD_FLANGE, height: STUD_WEB, depth: fromHeaderDoorToTopPlate, updatable: true
                }, scene);
                crippleStudIW.position.x = distanceBetweenDoors[i][1] + (crippleStudDistance + crippleStudDistanceOffset/(totalCrippleStud-1))*(j + 1);
                crippleStudIW.position.z = doorHeight;
                crippleStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, fromHeaderDoorToTopPlate/2), false);

                meshes = [...meshes, crippleStudIW];
                multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
            }
        }

        // //*** NOGGIN */
        distanceBetweenDoors.map((data, idx) => {
            let distance = data[1] - data[0];
            let totalWallStud = Math.ceil(distance/STUD_DISTANCE);
            let studDistanceOffset = distance - (totalWallStud - 1)*STUD_DISTANCE;
            let nogginLength = STUD_DISTANCE + studDistanceOffset/(totalWallStud-1);

            for(let i = 0; i < totalWallStud - 1; i++) {
                let newNogginIW = BABYLON.MeshBuilder.CreateBox(`nogginSample`, {
                    width: nogginLength, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
                }, scene);

                newNogginIW.setPivotMatrix(BABYLON.Matrix.Translation(nogginLength/2, STUD_WEB/2, STUD_FLANGE/2), false);
                newNogginIW.position.x = data[0] + (nogginLength * i);
                newNogginIW.position.z = MIN_WALL_HEIGHT/2;

                if(i%2 === 1) {
                    newNogginIW.position.z -= 20;
                }

                meshes = [...meshes, newNogginIW];
                multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
            }
        });
    }

    // //*** HEADER DOOR STUD
    for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
        let doorWidth = doorList[i]["doorWidth"];
        let doorHeight = doorList[i]["doorHeight"];
        let headerDoorStudLength = doorWidth + STUD_FLANGE;

        let headerDoorStudIW = BABYLON.MeshBuilder.CreateBox(`headerDoorStud`, {
            width: headerDoorStudLength, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
        }, scene); 
        headerDoorStudIW.position.x = distanceBetweenDoors[i][1];
        headerDoorStudIW.position.z = doorHeight;
        headerDoorStudIW.setPivotMatrix(BABYLON.Matrix.Translation(headerDoorStudLength/2, STUD_WEB/2, STUD_FLANGE/2), false);

        meshes = [...meshes, headerDoorStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
    }

    //*** Outerest wall stud left and right
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE 
    || (wallCladdingType === WALL_CLADDING_ONE_SIDE) && (externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE)) {   
        let leftOuterWallStudIW = BABYLON.MeshBuilder.CreateBox('leftOuterStud', {
            width: STUD_FLANGE, height: STUD_WEB, depth: MAX_WALL_HEIGHT, updatable: true
        }, scene); 
        leftOuterWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, MAX_WALL_HEIGHT/2), false);

        meshes = [...meshes, leftOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

        let rightOuterWallStudIW = BABYLON.MeshBuilder.CreateBox('rightOuterStud', {
            width: STUD_FLANGE, height: STUD_WEB, depth: MIN_WALL_HEIGHT, updatable: true
        }, scene);
        rightOuterWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, MIN_WALL_HEIGHT/2), false);
        rightOuterWallStudIW.position.x += WALL_LENGTH - STUD_FLANGE;

        meshes = [...meshes, rightOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

        // //*** TRIMMER DOOR STUD
        for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
            let doorWidth = doorList[i]["doorWidth"];
            let doorHeight = doorList[i]["doorHeight"];

            let leftTrimmerStudIW = BABYLON.MeshBuilder.CreateBox(`leftTrimmerStud`, {
                width: STUD_FLANGE, height: STUD_WEB, depth: doorHeight, updatable: true
            }, scene);
            leftTrimmerStudIW.position.x = distanceBetweenDoors[i][1];
            leftTrimmerStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, doorHeight/2), false);

            meshes = [...meshes, leftTrimmerStudIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

            let rightTrimmerStudIW = BABYLON.MeshBuilder.CreateBox(`rightTrimmerStud`, {
                width: STUD_FLANGE, height: STUD_WEB, depth: doorHeight, updatable: true
            }, scene);
            rightTrimmerStudIW.position.x = distanceBetweenDoors[i][1] + doorWidth;
            rightTrimmerStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, doorHeight/2), false);

            meshes = [...meshes, rightTrimmerStudIW]
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
        }
    }

    //** PLASTER BOARD
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE || wallCladdingType === WALL_CLADDING_ONE_SIDE) {
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
            rectanglePBCoordinates[1].y + MIN_WALL_HEIGHT, 
            rectanglePBCoordinates[1].z
        );

        rectanglePBCoordinates[3] = new BABYLON.Vector3(
            rectanglePBCoordinates[2].x - WALL_LENGTH, 
            rectanglePBCoordinates[2].y + (MAX_WALL_HEIGHT - MIN_WALL_HEIGHT), 
            rectanglePBCoordinates[2].z
        );

        let rectanglePBMeshBuilder = new BABYLON.PolygonMeshBuilder("rectanglePB", rectanglePBCoordinates, scene, earcut);    
        let rectanglePBMesh = rectanglePBMeshBuilder.build(true, pBDepth || 1);
        if(wallCladdingType === WALL_CLADDING_BOTH_SIDE) rectanglePBMesh.position.y += STUD_FLANGE;

        let plasterBoardMat = new BABYLON.StandardMaterial("plasterBoardMat", scene);
        plasterBoardMat.diffuseColor = new BABYLON.Color3.FromHexString(pbColor || PINE_STUD_PLASTER_BOARD_COLOR);
        plasterBoardMat.backFaceCulling = false;

        // tiếp theo chúng ta sẽ tạo những ô hình chữ nhật để cắt
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
                doorPanelCoordinates[1].y + (doorHeight + STUD_FLANGE), 
                doorPanelCoordinates[1].z
            );
            doorPanelCoordinates[3] = new BABYLON.Vector3(
                doorPanelCoordinates[2].x - (doorWidth + STUD_FLANGE), 
                doorPanelCoordinates[2].y, 
                doorPanelCoordinates[2].z
            );

            let doorPanelMeshBuilder = new BABYLON.PolygonMeshBuilder("doorPanel", doorPanelCoordinates, scene, earcut);    
            let doorPanel = doorPanelMeshBuilder.build(true, 100);
            doorPanel.position.x = distanceBetweenDoors[i][1];
            doorPanel.setPivotMatrix(BABYLON.Matrix.Translation(0, 100/2, 0), false)

            let mat = new BABYLON.StandardMaterial("mat", scene);
            mat.diffuseColor = new BABYLON.Color3.Green();
            mat.backFaceCulling = false;

            doorPanel.material = mat;

            let doorMeshCSG = BABYLON.CSG.FromMesh(doorPanel);
            rectanglePBCSG = rectanglePBCSG.subtract(doorMeshCSG);

            doorPanel.dispose();
        }

        // chuyển CSG tới Mesh
        plasterBoard = rectanglePBCSG.toMesh("plasterBoard", plasterBoardMat, scene, false);
        rectanglePBMesh.dispose();

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
            "externPlasterBoards": [],
            "doors": []
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
        const numTPLength3600 = floor(TOP_PLATE_WIDTH/360, 0);
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
            distanceBetweenDoors.map((data, idx) => {
                let distance = data[1] - data[0];
                let totalWallStud = Math.ceil(distance/STUD_DISTANCE);
                let studDistanceOffset = distance - (totalWallStud - 1)*STUD_DISTANCE;
                let nogginLength = STUD_DISTANCE + studDistanceOffset/(totalWallStud-1);
    
                for(let i = 0; i < totalWallStud; i++) {
                    let wallStudHeight = MAX_WALL_HEIGHT - (data[0] + nogginLength * i) * Math.tan(ROOF_PITCH);

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
            });

            // *** CRIPPLE STUDS
            for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
                let doorWidth = doorList[i]["doorWidth"];
                let doorHeight = doorList[i]["doorHeight"];
    
                let totalCrippleStud = Math.ceil(doorWidth/STUD_DISTANCE + 1);
                let crippleStudDistance = Math.ceil(doorWidth/totalCrippleStud);
                let crippleStudDistanceOffset = (doorWidth - (totalCrippleStud-1)*crippleStudDistance);
                let distanceBetweenTwoCrippleStud = crippleStudDistance + crippleStudDistanceOffset/(totalCrippleStud-1);
    
                for(let j = 0; j < totalCrippleStud - 2; j++) {
                    let fromHeaderDoorToTopPlate = (MAX_WALL_HEIGHT - (distanceBetweenDoors[i][1] + distanceBetweenTwoCrippleStud*(j + 1))*Math.tan(ROOF_PITCH)) - doorHeight;

                    wallComponentIndexes[wallName]["crippleStuds"].push({
                        "item": "Cripple Stud",
                        "desc": studSizeName,
                        "mark": 'CS' + (++wallComponentIndexes["maxCrippleStudIdx"]),
                        "wallName": wallName,
                        "wallHeightType": wallHeightTypeName,
                        "length": floor(Math.round(fromHeaderDoorToTopPlate * 10), -2),
                        "cutLength": Math.round(fromHeaderDoorToTopPlate * 10), 
                        "quantity": 1
                    });
                }
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

        // // *** HEADER STUDS
        for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
            let doorWidth = doorList[i]["doorWidth"];
            let headerDoorStudLength = doorWidth + STUD_FLANGE;

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
        "doorList": doorList
    }

    // set multi material
    newInteriorWallMesh.material = multiMat;
    for(let i = 0; i < newInteriorWallMesh.subMeshes.length; i++) {
        newInteriorWallMesh.subMeshes[i].materialIndex = i;
    }

    // attach door into wall
    newDoorMeshes.map(newDoorMesh => {
        newDoorMesh.parent = newInteriorWallMesh;
    });

    return { wall: newInteriorWallMesh, doors: newDoorMeshes };
}

var createWallHasDoorLocateLeftAndRightAlongAxisX = async(params, scene) => {
    const { 
        name,  wallType, wallHeightType, wallHeight, studSize, studWeb, studFlange, studDistance,
        doorList = [],
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

    let meshes = [];
    let plasterBoard;

    let multiMat = new BABYLON.MultiMaterial('multi', scene);
    let interiorMat = new BABYLON.StandardMaterial("interiorMat", scene);
    interiorMat.diffuseColor = new BABYLON.Color3.FromHexString(PINE_STUD_INTERIOR_WALL_COLOR);
    interiorMat.backFaceCulling = false;

    let sampleDoorMeshes = [];
    let newDoorMeshes = [];

    // import doors
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

    //*** WALL STUD */
    if( wallCladdingType === WALL_CLADDING_NONE 
    || (wallCladdingType === WALL_CLADDING_ONE_SIDE && (!externWallCladding || externWallCladding === EXTERN_WALL_CLADDING_NONE) )) {
        // ** WALL STUDS
        distanceBetweenDoors.map((data, idx) => {
            let distance = data[1] - data[0];
            let totalWallStud = Math.ceil(distance/STUD_DISTANCE);
            let studDistanceOffset = distance - (totalWallStud - 1)*STUD_DISTANCE;
            let nogginLength = STUD_DISTANCE + studDistanceOffset/(totalWallStud-1);

            for(let i = 0; i < totalWallStud; i++) {
                let wallStudHeight = 0;

                if((beginCoord.x + data[0] + nogginLength * i) <= SHED_BUILDING_INFORMATION.span/2) {
                    wallStudHeight = LEFT_WALL_HEIGHT + (data[0] + nogginLength * i) * Math.tan(ROOF_PITCH);
                } else {
                    wallStudHeight = CENTER_WALL_HEIGHT - (nogginLength * i - (HALF_LEFT_WALL_LENGTH - data[0])) * Math.tan(ROOF_PITCH);
                }

                let newWallStudIW = BABYLON.MeshBuilder.CreateBox(`studSample`, {
                    width: STUD_FLANGE, height: STUD_WEB, depth: wallStudHeight, updatable: true
                }, scene);

                newWallStudIW.setEnabled(true);
                newWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, wallStudHeight/2), false);

                if(i !== totalWallStud - 1) {
                    newWallStudIW.position.x = data[0] + nogginLength * i;
                } else {
                    newWallStudIW.position.x = data[0] + (distance - STUD_FLANGE);
                }

                meshes = [...meshes, newWallStudIW];
                multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
            }
        });

        //*** CRIPPLE STUD
        for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
            let doorWidth = doorList[i]["doorWidth"];
            let doorHeight = doorList[i]["doorHeight"];

            let totalCrippleStud = Math.ceil(doorWidth/STUD_DISTANCE + 1);
            let crippleStudDistance = Math.ceil(doorWidth/totalCrippleStud);
            let crippleStudDistanceOffset = (doorWidth - (totalCrippleStud-1)*crippleStudDistance);
            let distanceBetweenTwoCrippleStud = crippleStudDistance + crippleStudDistanceOffset/(totalCrippleStud-1);
            
            for(let j = 0; j < totalCrippleStud - 2; j++) {
                let fromHeaderDoorToTopPlate = 0;

                if((beginCoord.x + distanceBetweenDoors[i][1] + distanceBetweenTwoCrippleStud * (j + 1)) <= SHED_BUILDING_INFORMATION.span/2) {
                    fromHeaderDoorToTopPlate = LEFT_WALL_HEIGHT + (distanceBetweenDoors[i][1] + distanceBetweenTwoCrippleStud*(j+1))*Math.tan(ROOF_PITCH) - doorHeight;
                } else {
                    fromHeaderDoorToTopPlate = CENTER_WALL_HEIGHT - (distanceBetweenDoors[i][1] - HALF_LEFT_WALL_LENGTH + distanceBetweenTwoCrippleStud*(j+1))*Math.tan(ROOF_PITCH) - doorHeight;
                }

                let crippleStudIW = BABYLON.MeshBuilder.CreateBox(`crippleStud`, {
                    width: STUD_FLANGE, height: STUD_WEB, depth: fromHeaderDoorToTopPlate, updatable: true
                }, scene);
                crippleStudIW.position.x = distanceBetweenDoors[i][1] + (crippleStudDistance + crippleStudDistanceOffset/(totalCrippleStud-1))*(j + 1);
                crippleStudIW.position.z = doorHeight;
                crippleStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, fromHeaderDoorToTopPlate/2), false);

                meshes = [...meshes, crippleStudIW];
                multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
            }
        }

        // //*** NOGGIN */
        distanceBetweenDoors.map((data, idx) => {
            let distance = data[1] - data[0];
            let totalWallStud = Math.ceil(distance/STUD_DISTANCE);
            let studDistanceOffset = distance - (totalWallStud - 1)*STUD_DISTANCE;
            let nogginLength = STUD_DISTANCE + studDistanceOffset/(totalWallStud-1);

            for(let i = 0; i < totalWallStud - 1; i++) {
                let newNogginIW = BABYLON.MeshBuilder.CreateBox(`nogginSample`, {
                    width: nogginLength, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
                }, scene);

                newNogginIW.setPivotMatrix(BABYLON.Matrix.Translation(nogginLength/2, STUD_WEB/2, STUD_FLANGE/2), false);
                newNogginIW.position.x = data[0] + (nogginLength * i);
                newNogginIW.position.z = LEFT_WALL_HEIGHT/2;

                if(i%2 === 1) {
                    newNogginIW.position.z -= 20;
                }

                meshes = [...meshes, newNogginIW];
                multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
            }
        });
    }

    // //*** HEADER DOOR STUD
    for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
        let doorWidth = doorList[i]["doorWidth"];
        let doorHeight = doorList[i]["doorHeight"];
        let headerDoorStudLength = doorWidth + STUD_FLANGE;

        let headerDoorStudIW = BABYLON.MeshBuilder.CreateBox(`headerDoorStud`, {
            width: headerDoorStudLength, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
        }, scene); 
        headerDoorStudIW.position.x = distanceBetweenDoors[i][1];
        headerDoorStudIW.position.z = doorHeight;
        headerDoorStudIW.setPivotMatrix(BABYLON.Matrix.Translation(headerDoorStudLength/2, STUD_WEB/2, STUD_FLANGE/2), false);

        meshes = [...meshes, headerDoorStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
    }

    //*** Outerest wall stud left and right
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE 
    || (wallCladdingType === WALL_CLADDING_ONE_SIDE) && (externWallCladding && externWallCladding !== EXTERN_WALL_CLADDING_NONE)) {   
        let leftOuterWallStudIW = BABYLON.MeshBuilder.CreateBox('leftOuterStud', {
            width: STUD_FLANGE, height: STUD_WEB, depth: LEFT_WALL_HEIGHT, updatable: true
        }, scene); 
        leftOuterWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, LEFT_WALL_HEIGHT/2), false);

        meshes = [...meshes, leftOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

        let rightOuterWallStudIW = BABYLON.MeshBuilder.CreateBox('rightOuterStud', {
            width: STUD_FLANGE, height: STUD_WEB, depth: RIGHT_WALL_HEIGHT, updatable: true
        }, scene);
        rightOuterWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, RIGHT_WALL_HEIGHT/2), false);
        rightOuterWallStudIW.position.x += WALL_LENGTH - STUD_FLANGE;

        meshes = [...meshes, rightOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

        //*** TRIMMER DOOR STUD
        for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
            let doorWidth = doorList[i]["doorWidth"];
            let doorHeight = doorList[i]["doorHeight"];

            let leftTrimmerStudIW = BABYLON.MeshBuilder.CreateBox(`leftTrimmerStud`, {
                width: STUD_FLANGE, height: STUD_WEB, depth: doorHeight, updatable: true
            }, scene);
            leftTrimmerStudIW.position.x = distanceBetweenDoors[i][1];
            leftTrimmerStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, doorHeight/2), false);

            meshes = [...meshes, leftTrimmerStudIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

            let rightTrimmerStudIW = BABYLON.MeshBuilder.CreateBox(`rightTrimmerStud`, {
                width: STUD_FLANGE, height: STUD_WEB, depth: doorHeight, updatable: true
            }, scene);
            rightTrimmerStudIW.position.x = distanceBetweenDoors[i][1] + doorWidth;
            rightTrimmerStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, doorHeight/2), false);

            meshes = [...meshes, rightTrimmerStudIW]
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
        }
    }

    //** PLASTER BOARD
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE || wallCladdingType === WALL_CLADDING_ONE_SIDE) {
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
            rectanglePBCoordinates[1].y + RIGHT_WALL_HEIGHT, 
            rectanglePBCoordinates[1].z
        );

        rectanglePBCoordinates[3] = new BABYLON.Vector3(
            rectanglePBCoordinates[2].x - HALF_RIGHT_WALL_LENGTH, 
            rectanglePBCoordinates[2].y + (CENTER_WALL_HEIGHT - RIGHT_WALL_HEIGHT), 
            rectanglePBCoordinates[2].z
        );

        rectanglePBCoordinates[4] = new BABYLON.Vector3(
            rectanglePBCoordinates[3].x - HALF_LEFT_WALL_LENGTH, 
            rectanglePBCoordinates[3].y - (CENTER_WALL_HEIGHT - LEFT_WALL_HEIGHT), 
            rectanglePBCoordinates[3].z
        );

        let rectanglePBMeshBuilder = new BABYLON.PolygonMeshBuilder("rectanglePB", rectanglePBCoordinates, scene, earcut);    
        let rectanglePBMesh = rectanglePBMeshBuilder.build(true, pBDepth || 1);
        if(wallCladdingType === WALL_CLADDING_BOTH_SIDE) rectanglePBMesh.position.y += STUD_FLANGE;

        let plasterBoardMat = new BABYLON.StandardMaterial("plasterBoardMat", scene);
        plasterBoardMat.diffuseColor = new BABYLON.Color3.FromHexString(pbColor || PINE_STUD_PLASTER_BOARD_COLOR);
        plasterBoardMat.backFaceCulling = false;

        // tiếp theo chúng ta sẽ tạo những ô hình chữ nhật để cắt
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
                doorPanelCoordinates[1].y + (doorHeight + STUD_FLANGE), 
                doorPanelCoordinates[1].z
            );
            doorPanelCoordinates[3] = new BABYLON.Vector3(
                doorPanelCoordinates[2].x - (doorWidth + STUD_FLANGE), 
                doorPanelCoordinates[2].y, 
                doorPanelCoordinates[2].z
            );

            let doorPanelMeshBuilder = new BABYLON.PolygonMeshBuilder("doorPanel", doorPanelCoordinates, scene, earcut);    
            let doorPanel = doorPanelMeshBuilder.build(true, 100);
            doorPanel.position.x = distanceBetweenDoors[i][1];
            doorPanel.setPivotMatrix(BABYLON.Matrix.Translation(0, 100/2, 0), false)

            let mat = new BABYLON.StandardMaterial("mat", scene);
            mat.diffuseColor = new BABYLON.Color3.Green();
            mat.backFaceCulling = false;

            doorPanel.material = mat;

            let doorMeshCSG = BABYLON.CSG.FromMesh(doorPanel);
            rectanglePBCSG = rectanglePBCSG.subtract(doorMeshCSG);

            doorPanel.dispose();
        }

        // chuyển CSG tới Mesh
        plasterBoard = rectanglePBCSG.toMesh("plasterBoard", plasterBoardMat, scene, false);
        rectanglePBMesh.dispose();

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
            distanceBetweenDoors.map((data, idx) => {
                let distance = data[1] - data[0];
                let totalWallStud = Math.ceil(distance/STUD_DISTANCE);
                let studDistanceOffset = distance - (totalWallStud - 1)*STUD_DISTANCE;
                let nogginLength = STUD_DISTANCE + studDistanceOffset/(totalWallStud-1);
    
                for(let i = 0; i < totalWallStud; i++) {
                    let wallStudHeight = 0;

                    if((beginCoord.x + data[0] + nogginLength * i) <= SHED_BUILDING_INFORMATION.span/2) {
                        wallStudHeight = LEFT_WALL_HEIGHT + (data[0] + nogginLength * i) * Math.tan(ROOF_PITCH);
                    } else {
                        wallStudHeight = CENTER_WALL_HEIGHT - (nogginLength * i - (HALF_LEFT_WALL_LENGTH - data[0])) * Math.tan(ROOF_PITCH);
                    }

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
            });

            // *** CRIPPLE STUDS
            for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
                let doorWidth = doorList[i]["doorWidth"];
                let doorHeight = doorList[i]["doorHeight"];

                let totalCrippleStud = Math.ceil(doorWidth/STUD_DISTANCE + 1);
                let crippleStudDistance = Math.ceil(doorWidth/totalCrippleStud);
                let crippleStudDistanceOffset = (doorWidth - (totalCrippleStud-1)*crippleStudDistance);
                let distanceBetweenTwoCrippleStud = crippleStudDistance + crippleStudDistanceOffset/(totalCrippleStud-1);
                
                for(let j = 0; j < totalCrippleStud - 2; j++) {
                    let fromHeaderDoorToTopPlate = 0;

                    if((beginCoord.x + distanceBetweenDoors[i][1] + distanceBetweenTwoCrippleStud * (j + 1)) <= SHED_BUILDING_INFORMATION.span/2) {
                        fromHeaderDoorToTopPlate = LEFT_WALL_HEIGHT + (distanceBetweenDoors[i][1] + distanceBetweenTwoCrippleStud*(j+1))*Math.tan(ROOF_PITCH) - doorHeight;
                    } else {
                        fromHeaderDoorToTopPlate = CENTER_WALL_HEIGHT - (distanceBetweenDoors[i][1] - HALF_LEFT_WALL_LENGTH + distanceBetweenTwoCrippleStud*(j+1))*Math.tan(ROOF_PITCH) - doorHeight;
                    }

                    wallComponentIndexes[wallName]["crippleStuds"].push({
                        "item": "Cripple Stud",
                        "desc": studSizeName,
                        "mark": 'CS' + (++wallComponentIndexes["maxCrippleStudIdx"]),
                        "wallName": wallName,
                        "wallHeightType": wallHeightTypeName,
                        "length": floor(Math.round(fromHeaderDoorToTopPlate * 10), -2),
                        "cutLength": Math.round(fromHeaderDoorToTopPlate * 10), 
                        "quantity": 1
                    });
                }
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
            let headerDoorStudLength = doorWidth + STUD_FLANGE;

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
        "doorList": doorList
    }

    // set multi material
    newInteriorWallMesh.material = multiMat;
    for(let i = 0; i < newInteriorWallMesh.subMeshes.length; i++) {
        newInteriorWallMesh.subMeshes[i].materialIndex = i;
    }

    // attach door into wall
    newDoorMeshes.map(newDoorMesh => {
        newDoorMesh.parent = newInteriorWallMesh;
    });

    return { wall: newInteriorWallMesh, doors: newDoorMeshes };
}

var createWallHasDoorLocateAlongAxisY = async(params, scene) => {
    const { 
        name, wallType, wallHeightType, wallHeight, studSize, studWeb, studFlange, studDistance,
        doorList = [],
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
    const WALL_HEIGHT = beginCoord.x - SHED_BUILDING_INFORMATION.span/2 < 0 ? 
                            MIN_ROOF_HEIGHT + (beginCoord.x * Math.tan(ROOF_PITCH)) :
                            MIN_ROOF_HEIGHT + ((SHED_BUILDING_INFORMATION.span - beginCoord.x) * Math.tan(ROOF_PITCH));

    const STUD_DISTANCE = studDistance;
    const STUD_WEB = studWeb;
    const STUD_FLANGE = studFlange;

    let meshes = [];
    let plasterBoard;

    let multiMat = new BABYLON.MultiMaterial('multi', scene);
    let interiorMat = new BABYLON.StandardMaterial("interiorMat", scene);
    interiorMat.diffuseColor = new BABYLON.Color3.FromHexString(PINE_STUD_INTERIOR_WALL_COLOR);
    interiorMat.backFaceCulling = false;
    
    // Import Doors
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

    // *** WALL STUDS
    if( wallCladdingType === WALL_CLADDING_NONE 
    || (wallCladdingType === WALL_CLADDING_ONE_SIDE && (!externWallCladding || externWallCladding === EXTERN_WALL_CLADDING_NONE) )) {
        // *** WALL STUDS
        let wallStudIWSample;
     
        distanceBetweenDoors.map((data, idx) => {
            let distance = data[1] - data[0];
            let totalWallStud = Math.ceil(distance/STUD_DISTANCE);
            let studDistanceOffset = distance - (totalWallStud - 1)*STUD_DISTANCE;
            let nogginLength = STUD_DISTANCE + studDistanceOffset/(totalWallStud-1);

            for(let i = 0; i < totalWallStud; i++) {
                let newWallStudIW;

                if(i === 0) {
                    wallStudIWSample = BABYLON.MeshBuilder.CreateBox(`studSample`, {
                        width: STUD_FLANGE, height: STUD_WEB, depth: WALL_HEIGHT, updatable: true
                    }, scene);
                    wallStudIWSample.setEnabled(false);
                }

                newWallStudIW = wallStudIWSample.clone(`stud`);
                newWallStudIW.setEnabled(true);
                newWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, WALL_HEIGHT/2), false);
                
                if(i !== totalWallStud - 1) {
                    newWallStudIW.position.x = data[0] + nogginLength * i;
                } else {
                    newWallStudIW.position.x = data[0] + (distance - STUD_FLANGE);
                }

                meshes = [...meshes, newWallStudIW];
                multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
            }
        });
            
        // //*** CRIPPLE STUD
        for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
            let doorWidth = doorList[i]["doorWidth"];
            let doorHeight = doorList[i]["doorHeight"];
            let fromHeaderDoorToTopPlate = WALL_HEIGHT - doorHeight;
            let totalCrippleStud = Math.ceil(doorWidth/STUD_DISTANCE + 1);
            let crippleStudDistance = Math.ceil(doorWidth/totalCrippleStud);
            let crippleStudDistanceOffset = (doorWidth - (totalCrippleStud-1)*crippleStudDistance);
        
            for(let j = 0; j < totalCrippleStud - 2; j++) {
                let crippleStudIW = BABYLON.MeshBuilder.CreateBox(`crippleStud`, {
                    width: STUD_FLANGE, height: STUD_WEB, depth: fromHeaderDoorToTopPlate, updatable: true
                }, scene);
                crippleStudIW.position.x = distanceBetweenDoors[i][1] + (crippleStudDistance + crippleStudDistanceOffset/(totalCrippleStud-1))*(j + 1);
                crippleStudIW.position.z = doorHeight;
                crippleStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, fromHeaderDoorToTopPlate/2), false);

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
                    nogginIWSample = BABYLON.MeshBuilder.CreateBox(`nogginSample`, {
                        width: nogginLength, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
                    }, scene);
                    nogginIWSample.setEnabled(false);
                }

                newNogginIW = nogginIWSample.clone(`noggin`);
                newNogginIW.setEnabled(true);
                newNogginIW.setPivotMatrix(BABYLON.Matrix.Translation(nogginLength/2, STUD_WEB/2, STUD_FLANGE/2), false);
                newNogginIW.position.x = data[0] + (nogginLength * i);
                newNogginIW.position.z = WALL_HEIGHT/2;

                if(i%2 === 1) {
                    newNogginIW.position.z -= 20;
                }

                meshes = [...meshes, newNogginIW];
                multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
            }
        });
    }

    //*** HEADER DOOR STUD
    for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
        let doorWidth = doorList[i]["doorWidth"];
        let doorHeight = doorList[i]["doorHeight"];
        let headerDoorStudLength = doorWidth + STUD_FLANGE;

        let headerDoorStudIW = BABYLON.MeshBuilder.CreateBox(`headerDoorStud`, {
            width: headerDoorStudLength, height: STUD_WEB, depth: STUD_FLANGE, updatable: true
        }, scene); 
        headerDoorStudIW.position.x = distanceBetweenDoors[i][1];
        headerDoorStudIW.position.z = doorHeight;
        headerDoorStudIW.setPivotMatrix(BABYLON.Matrix.Translation(headerDoorStudLength/2, STUD_WEB/2, STUD_FLANGE/2), false);

        meshes = [...meshes, headerDoorStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
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

        let rightOuterWallStudIW = BABYLON.MeshBuilder.CreateBox("rightOuterStud", {
            width: STUD_FLANGE, height: STUD_WEB, depth: WALL_HEIGHT, updatable: true
        }, scene);
        rightOuterWallStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, WALL_HEIGHT/2), false);
        rightOuterWallStudIW.position.x += WALL_LENGTH - STUD_FLANGE;

        meshes = [...meshes, rightOuterWallStudIW];
        multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

        // //*** TRIMMER DOOR STUD
        for(let i = 0; i < distanceBetweenDoors.length - 1; i++) {
            let doorWidth = doorList[i]["doorWidth"];
            let doorHeight = doorList[i]["doorHeight"];

            let leftTrimmerStudIW = BABYLON.MeshBuilder.CreateBox(`leftTrimmerStud`, {
                width: STUD_FLANGE, height: STUD_WEB, depth: doorHeight, updatable: true
            }, scene);
            leftTrimmerStudIW.position.x = distanceBetweenDoors[i][1];
            leftTrimmerStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, doorHeight/2), false);

            meshes = [...meshes, leftTrimmerStudIW];
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];

            let rightTrimmerStudIW = BABYLON.MeshBuilder.CreateBox(`rightTrimmerStud`, {
                width: STUD_FLANGE, height: STUD_WEB, depth: doorHeight, updatable: true
            }, scene);
            rightTrimmerStudIW.position.x = distanceBetweenDoors[i][1] + doorWidth;
            rightTrimmerStudIW.setPivotMatrix(BABYLON.Matrix.Translation(STUD_FLANGE/2, STUD_WEB/2, doorHeight/2), false);

            meshes = [...meshes, rightTrimmerStudIW]
            multiMat.subMaterials = [...multiMat.subMaterials, interiorMat];
        }
    }

    //** PLASTER BOARD
    if(wallCladdingType === WALL_CLADDING_BOTH_SIDE || wallCladdingType === WALL_CLADDING_ONE_SIDE) {
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
        plasterBoardMat.diffuseColor = new BABYLON.Color3.FromHexString(pbColor || PINE_STUD_PLASTER_BOARD_COLOR);
        plasterBoardMat.backFaceCulling = false;

        // tiếp theo chúng ta sẽ tạo những ô hình chữ nhật để cắt
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
                doorPanelCoordinates[1].y + (doorHeight + STUD_FLANGE), 
                doorPanelCoordinates[1].z
            );
            doorPanelCoordinates[3] = new BABYLON.Vector3(
                doorPanelCoordinates[2].x - (doorWidth + STUD_FLANGE), 
                doorPanelCoordinates[2].y, 
                doorPanelCoordinates[2].z
            );

            let doorPanelMeshBuilder = new BABYLON.PolygonMeshBuilder("doorPanel", doorPanelCoordinates, scene, earcut);    
            let doorPanel = doorPanelMeshBuilder.build(true, 100);
            doorPanel.position.x = distanceBetweenDoors[i][1];
            doorPanel.setPivotMatrix(BABYLON.Matrix.Translation(0, 100/2, 0), false)

            let mat = new BABYLON.StandardMaterial("mat", scene);
            mat.diffuseColor = new BABYLON.Color3.Green();
            mat.backFaceCulling = false;

            doorPanel.material = mat;

            let doorMeshCSG = BABYLON.CSG.FromMesh(doorPanel);
            rectanglePBCSG = rectanglePBCSG.subtract(doorMeshCSG);

            doorPanel.dispose();
        }

        // chuyển CSG tới Mesh
        plasterBoard = rectanglePBCSG.toMesh("plasterBoard", plasterBoardMat, scene, false);
        rectanglePBMesh.dispose();

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
            let headerDoorStudLength = doorWidth + STUD_FLANGE;

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
        "wallHeight": wallHeight,
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

    // attach door into wall
    newDoorMeshes.map(newDoorMesh => {
        newDoorMesh.parent = newInteriorWallMesh;
    });

    return { wall: newInteriorWallMesh, doors: newDoorMeshes };
}

export default UnderOrTopRafterWallHasDoorLibrary;