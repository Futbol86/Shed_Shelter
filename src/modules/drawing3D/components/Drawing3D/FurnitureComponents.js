import React, {Component} from 'react';
import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";
import "babylonjs-loaders";
import earcut from "earcut";
import uuid from "uuid";
import { min, sortBy, cloneDeep } from "lodash";
import {MODAL_TYPE_CONFIRMATION} from '../../../../constants'
import {
    SHED_BUILDING_INFORMATION, FURNITURE_HIGHLIGHT_COLOR, COPIED_FURNITURE_HIGHLIGHT_COLOR, INVALID_HIGHLIGHT_COLOR,
    FURNITURE_NORMAL_OPTION, FURNITURE_DRAW_WALL_OPTION,
    SIMULATE_3D_SCALE, FRONT_PLANE_DIRECTION, BACK_PLANE_DIRECTION, LEFT_PLANE_DIRECTION, RIGHT_PLANE_DIRECTION,
    CUSTOM_WALL, UNDERSIDE_OF_RAFTER_WALL, UNDERSIDE_OF_PURLIN_WALL, UNDERSIDE_OF_EAVE_PURLIN_WALL,
    FURNITURE_STUD_SIZE, FURNITURE_STUD_DISTANCE, FURNITURE_DOOR_TYPES, FURNITURE_TILES, FLOOR_HEIGHT, PINE_STUD_FRAME, WALL_CLADDING_NONE, WALL_CLADDING_BOTH_SIDE
} from '../../constants';

import CustomWallPSFLibrary from './CreateWallLibraries/PineStudFrame/CustomWall';
import UnderOrTopRafterWallPSFLibrary from './CreateWallLibraries/PineStudFrame/UnderOrTopRafterWall';
import UnderOrTopRafterWallHasDoorPSFLibrary from './CreateWallLibraries/PineStudFrame/UnderOrTopRafterWallHasDoor';
import UnderEavePurlinWallPSFLibrary from './CreateWallLibraries/PineStudFrame/UnderEavePurlinWall';

import CustomWallSSFLibrary from './CreateWallLibraries/SteelSudFrame/CustomWall';
import UnderOrTopRafterWallSSFLibrary from './CreateWallLibraries/SteelSudFrame/UnderOrTopRafterWall';
import UnderOrTopRafterWallHasDoorSSFLibrary from './CreateWallLibraries/SteelSudFrame/UnderOfTopRafterWallHasDoor';
import UnderEavePurlinWallSSFLibrary from './CreateWallLibraries/SteelSudFrame/UnderEavePurlinWall';

let engine, scene, observer;
let groundMesh;
let furnitureMeshActive = {}, furnitureItemMeshes = [], tileItemMeshes = [], glassItemMeshes = [], mirrorItemMeshes = [];
let guiTexture, labelSimulateWallAngle, labelSimulateWallLength;
let highLightLayer, utilLayer, gizmo;
let drawPoint;
let newWallCornerCoords = [], wallMeshes = [], planeMeshes = [];
let wallComponentIndexes = {
    "maxWallIdx": 0,
    "maxBottomPlateIdx": 0,
    "maxTopPlateIdx": 0,
    "maxStudIdx": 0,
    "maxNogginIdx": 0,
    "maxCrippleStudIdx": 0,
    "maxHeaderStudIdx": 0,
    "maxTrimmerDoorStudIdx": 0,
    "maxPlasterBoardIdx": 0,
    "maxExternPlasterBoardIdx": 0,
    "maxDoorIdx": 0,
};

let tileIndexes = {
    "maxTileIdx": 0,
};

let glassMirrorIndexes = {
    "maxGlassIdx": 0,
    "maxMirrorIdx": 0,
}

class FurnitureComponents {
    constructor(props, canvas, camera, _scene, _engine) {
        this.props = props;
        this.canvas = canvas;
        this.camera = camera;
        scene = _scene;
        engine = _engine;

        this.initialize();
        this.initializeGUI();
    }

    initialize = async() => {
        utilLayer = new BABYLON.UtilityLayerRenderer(scene);
        utilLayer.utilityLayerScene.autoClearDepthAndStencil = false;
        gizmo = new BABYLON.PlaneRotationGizmo(new BABYLON.Vector3(0, 0, 1), BABYLON.Color3.FromHexString("#91ff35"), utilLayer);
        
        // // *** change diameter of gizmo
        // gizmo.scaleRatio = 1.5;

        // // *** get event when rotate gizmo, step is 10 degree
        // gizmo.snapDistance = 10/180*Math.PI;
   
        // gizmo.onSnapObservable.add((event) => {
        //     console.log('--- Gizmo onSnapObservable event', event.snapDistance)
        //     console.log('--- angle', BABYLON.Tools.ToDegrees(gizmo.angle))
        // });

        if(!highLightLayer) {
            highLightLayer = new BABYLON.HighlightLayer("hl", scene);
        }

        this.handleItemDragOnGround();

        this.canvas.addEventListener("click", this.handleCanvasClick);
        this.canvas.addEventListener("contextmenu",  this.handleReset, false);

        // short key
        document.addEventListener("keydown", (evt) => {
            if(!evt.key) return;
            if(evt.key === "Escape") {
                gizmo.attachedMesh = null;
                furnitureMeshActive = null;
                highLightLayer.removeAllMeshes();

                this.props.doSetSelectedFurnitureWall(null);
                this.props.doSetSelectedFurnitureItem(null);
                this.props.doSetFurnitureDrawingType(FURNITURE_NORMAL_OPTION);

                this.resetDrawWall();
            } 
            
            if(evt.key === "Delete") {
                this.removeFurnitureWall();
                this.removeFurnitureItem();
                this.removeTileItem();
                this.removeGlassItem();
                this.removeMirrorItem();
            }
            
            if(evt.key.toLowerCase() === "n") {
                this.props.doSetFurnitureDrawingType(FURNITURE_NORMAL_OPTION);
                this.setFurnitureNormalMode();
            }

            if(evt.key.toLowerCase() === "d") {
                this.props.doSetFurnitureDrawingType(FURNITURE_DRAW_WALL_OPTION);
                this.setFurnitureDrawWallMode();
            }

            if(evt.key.toLowerCase() === "z" && evt.ctrlKey) {
                this.undoDrawWall();
            }
        });
    }

    initializeGUI() {
        guiTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("guiTexture", true, scene);

        labelSimulateWallAngle = new GUI.TextBlock("labelSimulateWallAngle", "");
        labelSimulateWallAngle.textWrapping = true;
        labelSimulateWallAngle.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        labelSimulateWallAngle.fontSize = 18;
        labelSimulateWallAngle.color = "#150DF7"; //BEE64B
        labelSimulateWallAngle.isVisible = false;
        guiTexture.addControl(labelSimulateWallAngle);

        labelSimulateWallLength = new GUI.TextBlock("labelSimulateWallLength", "");
        labelSimulateWallLength.textWrapping = true;
        labelSimulateWallLength.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        labelSimulateWallLength.fontSize = 18;
        labelSimulateWallLength.color = "#150DF7";
        labelSimulateWallLength.isVisible = false;
        guiTexture.addControl(labelSimulateWallLength); 
    }

    updateProps(props, prevProps) {
        this.props = props;

        switch(this.props.furnitureDrawingType) {
            case FURNITURE_NORMAL_OPTION:
                this.setFurnitureNormalMode();
                break;

            case FURNITURE_DRAW_WALL_OPTION:
                this.setFurnitureDrawWallMode();
                break;
        }
    }

    reset = () => {
        highLightLayer.removeAllMeshes();
        gizmo.attachedMesh = null;

        this.props.doSetSelectedFurnitureWall(null);
        this.props.doSetSelectedFurnitureItem(null);
        this.props.doSetSelectedTileItem(null);
        this.props.doSetSelectedGlassItem(null);
        this.props.doSetSelectedMirrorItem(null);
    }

    setFurnitureNormalMode = () => {
        this.resetDrawWall();

        if(drawPoint) {
            scene.removeMesh(drawPoint);
            drawPoint = null;
        }

        this.canvas.removeEventListener("click",        this.handleDrawWallClick);
        this.canvas.removeEventListener("mousemove",    this.handleDrawWallMouseMove);
    }

    setFurnitureDrawWallMode = () => {
        if(!drawPoint) {
            drawPoint = BABYLON.MeshBuilder.CreateTorus("drawPoint", {thickness: 8, diameter: 50, tessellation: 128});
            drawPoint.rotation.x = Math.PI/2;
            drawPoint.material = new BABYLON.StandardMaterial("drawPointMat", scene);
            drawPoint.material.diffuseColor = new BABYLON.Color3.FromHexString("#23C1FF");
            drawPoint.material.backFaceCulling = false;  
        }

        this.reset();

        this.canvas.addEventListener("click",        this.handleDrawWallClick, false);
        this.canvas.addEventListener("mousemove",    this.handleDrawWallMouseMove, false);  
    }

    // *** CANVAS
    handleCanvasClick = (evt) => {
        let setHighLightWall = (mesh) => {
            // only click to show information in option 'furniture normal'
            if(this.props.furnitureDrawingType !== FURNITURE_NORMAL_OPTION) return;

            if(mesh) {
                highLightLayer.removeAllMeshes();
                highLightLayer.addMesh(mesh, new BABYLON.Color3.FromHexString(FURNITURE_HIGHLIGHT_COLOR));

                furnitureMeshActive = mesh;
                this.props.doChangeFurnitureTab({tabIndex: "tab-walls"});
                this.props.doSetSelectedFurnitureWall(mesh);
            }
        }

        let setHighLightFurnitureItem = (mesh) => {
            // only click to show information in option 'furniture normal'
            if(this.props.furnitureDrawingType !== FURNITURE_NORMAL_OPTION) return;

            if(mesh) {
                highLightLayer.removeAllMeshes();
                highLightLayer.addMesh(mesh, new BABYLON.Color3.FromHexString(FURNITURE_HIGHLIGHT_COLOR));

                furnitureMeshActive = mesh;         
                this.props.doChangeFurnitureTab({tabIndex: "tab-items"});
                this.props.doSetSelectedFurnitureItem(mesh);

                // test some function with gizmo
                gizmo.attachedMesh = mesh;
            }
        }

        let setHighLightTileItem = (mesh) => {
            // only click to show information in option 'furniture normal'
            if(this.props.furnitureDrawingType !== FURNITURE_NORMAL_OPTION) return;

            if(mesh) {
                highLightLayer.removeAllMeshes();
                highLightLayer.addMesh(mesh, new BABYLON.Color3.FromHexString(FURNITURE_HIGHLIGHT_COLOR));

                furnitureMeshActive = mesh;
                this.props.doChangeFurnitureTab({tabIndex: "tab-tiles"});
                this.props.doSetSelectedTileItem(mesh);
            }
        }

        let setHighLightGlassItem = (mesh) => {
            // only click to show information in option 'furniture normal'
            if(this.props.furnitureDrawingType !== FURNITURE_NORMAL_OPTION) return;

            if(mesh) {
                highLightLayer.removeAllMeshes();
                highLightLayer.addMesh(mesh, new BABYLON.Color3.FromHexString(FURNITURE_HIGHLIGHT_COLOR));

                furnitureMeshActive = mesh;
                this.props.doChangeFurnitureTab({tabIndex: "tab-glass-mirrors"});
                this.props.doSetSelectedMirrorItem(null);
                this.props.doSetSelectedGlassItem(mesh);

                // attach drag for glass mesh
                this.attachOwnPointerDragBehavior(mesh);
            } 
        }

        let setHighLightMirrorItem = (mesh) => {
            // only click to show information in option 'furniture normal'
            if(this.props.furnitureDrawingType !== FURNITURE_NORMAL_OPTION) return;

            if(mesh) {
                highLightLayer.removeAllMeshes();
                highLightLayer.addMesh(mesh, new BABYLON.Color3.FromHexString(FURNITURE_HIGHLIGHT_COLOR));

                furnitureMeshActive = mesh;
                this.props.doChangeFurnitureTab({tabIndex: "tab-glass-mirrors"});
                this.props.doSetSelectedGlassItem(null);
                this.props.doSetSelectedMirrorItem(mesh);

                // attach drag for mirror mesh
                this.attachOwnPointerDragBehavior(mesh);
            }
        }

        var pickResult = scene.pick(scene.pointerX, scene.pointerY);
        if(pickResult.hit) {
            let selectedMesh = pickResult.pickedMesh;

            let isWallMesh = wallMeshes.find(item => item.wall.name === selectedMesh.name) !== undefined;
            if(isWallMesh) {
                setHighLightWall(selectedMesh);
            }

            let isFurnitureItemMesh = furnitureItemMeshes.find(item => item.name === selectedMesh.name) !== undefined;
            if(isFurnitureItemMesh) {
                setHighLightFurnitureItem(selectedMesh);
            }
            
            let isTileItemMesh = tileItemMeshes.find(item => item.name === selectedMesh.name) !== undefined;
            if(isTileItemMesh) {
                setHighLightTileItem(selectedMesh);
            }

            let isGlassItemMesh = glassItemMeshes.find(item => item.name === selectedMesh.name) !== undefined;
            if(isGlassItemMesh) {
                setHighLightGlassItem(selectedMesh);
            }

            let isMirrorItemMesh = mirrorItemMeshes.find(item => item.name === selectedMesh.name) !== undefined;
            if(isMirrorItemMesh) {
                setHighLightMirrorItem(selectedMesh);
            }
        }
    }

    handleCanvasDragOver = (evt) => {
        evt.preventDefault();

        if(!furnitureMeshActive) return;

        //** */ convert postion from Screen 2D -> 3D
        let target = BABYLON.Vector3.Unproject(
            new BABYLON.Vector3(evt.offsetX, evt.offsetY, 0),
            this.canvas.width,
            this.canvas.height,
            new BABYLON.Matrix.Identity(),
            this.camera.getViewMatrix(),
            this.camera.getProjectionMatrix()
        );

        target.x = this.camera.position.x - target.x;
        target.y = this.camera.position.y - target.y;
        target.z = this.camera.position.z - target.z;
        let position = this.getPlaneAxisZVector(0, this.camera.position, target);

        furnitureMeshActive.position = new BABYLON.Vector3(position.x, position.y, position.z + FLOOR_HEIGHT);  
        furnitureMeshActive.setEnabled(true);

        if(furnitureMeshActive.type 
        && (furnitureMeshActive.type.indexOf("glass") !== -1 || furnitureMeshActive.type.indexOf("mirror") !== -1
        )) {
            let checkCoT = scene.getTransformNodeByName("GlassOrMirrorCoT");

            if(!checkCoT) {
                // update 'glass mesh' or 'mirror mesh' side orientation = BABYLON.MESH.DOUBLESIDE

                // we will create 'transparent material' for 'wall no cladding' to
                // ray can detect that walls
                planeMeshes = [];
                wallMeshes.map((item, idx) => {
                    const { wallParams } = item.wall;
                    if(wallParams?.wallCladdingType === WALL_CLADDING_NONE) {
                        let wallHeight = wallParams?.wallHeight || 
                            wallParams?.minWallHeight || wallParams?.maxWallHeight ||
                            wallParams?.leftWallHeight || wallParams?.rightWallHeight;

                        let tempPlane = BABYLON.MeshBuilder.CreatePlane(`tempPlaneToRayDetect-${idx}`, {
                            width: wallParams?.wallLength,
                            height: wallHeight,
                        }, scene);


                        tempPlane.id = "tempPlaneToRayDetect";
                        tempPlane.setPivotMatrix(BABYLON.Matrix.Translation(wallParams?.wallLength/2, wallHeight/2, 0), false);
                        tempPlane.rotation.x = Math.PI/2;

                        let tempPlaneMat = new BABYLON.StandardMaterial("mat", scene);
                        tempPlaneMat.diffuseColor = BABYLON.Color3.White();
                        tempPlaneMat.backFaceCulling = false;
                        tempPlaneMat.alpha = 0;

                        tempPlane.material = tempPlaneMat;
                        tempPlane.parent = item.wall;

                        planeMeshes.push(tempPlane);
                    }
                });

                // we create 2 ray (front & back) from center of drag glass or mirror
                // to detect any wall in range 
                let CoT = new BABYLON.TransformNode("GlassOrMirrorCoT");
                CoT.parent = furnitureMeshActive;

                let localOrigin = new BABYLON.Vector3(0, 0, 0);
                let rayLength = 100;
                let _pickedPoint = BABYLON.Vector3.Zero();
                let _pickedMesh = null;

                let backRay = new BABYLON.Ray();
                let backLocalDirection = new BABYLON.Vector3(0, 0, -1);
                let backRayHelper = new BABYLON.RayHelper(backRay);
                backRayHelper.attachToMesh(CoT, backLocalDirection, localOrigin, rayLength);
                //backRayHelper.show(scene);

                let frontRay = new BABYLON.Ray();
                let frontLocalDirection = new BABYLON.Vector3(0, 0, 1);
                let frontRayHelper = new BABYLON.RayHelper(frontRay);
                frontRayHelper.attachToMesh(CoT, frontLocalDirection, localOrigin, rayLength);
                //frontRayHelper.show(scene);
    
                let existWallMeshes = wallMeshes.map(item => item.wall);
              
                let currentDirection = this.getCurrentDirection();

                if(!currentDirection) return;

                observer = scene.onBeforeRenderObservable.add(function() {
                    let backHitInfo = backRay.intersectsMeshes([...existWallMeshes, ...planeMeshes]);
                    let frontHitInfo = frontRay.intersectsMeshes([...existWallMeshes, ...planeMeshes]);              
                    
                    // when ray detect will have 2 type: detect wall or detect temp wall
                    if(backHitInfo.length) {
                        _pickedPoint = backHitInfo[0].pickedPoint;
                        if(backHitInfo[0].pickedMesh.parent) {
                            _pickedMesh = backHitInfo[0].pickedMesh.parent;
                        } else {
                            _pickedMesh = backHitInfo[0].pickedMesh;
                        }
                        furnitureMeshActive.informations.attachedMesh = _pickedMesh;            
                    } 
                    else if(frontHitInfo.length) {
                        _pickedPoint = frontHitInfo[0].pickedPoint;
                        if(frontHitInfo[0].pickedMesh.parent) {
                            _pickedMesh = frontHitInfo[0].pickedMesh.parent;
                        } else {
                            _pickedMesh = frontHitInfo[0].pickedMesh;
                        }
                        furnitureMeshActive.informations.attachedMesh = _pickedMesh;     
                    } 
                    else {
                        furnitureMeshActive.informations.attachedMesh = null;
                    }

                    if(_pickedMesh) {
                        let beginCoord = _pickedMesh.wallParams.beginCoord;
                        let endCoord = _pickedMesh.wallParams.endCoord;

                        let vec = (new BABYLON.Vector3(beginCoord.x, beginCoord.y, beginCoord.z)).subtract(
                            new BABYLON.Vector3(endCoord.x, endCoord.y, endCoord.z)
                        );

                        vec = vec.normalize();
                        
                        if(currentDirection === FRONT_PLANE_DIRECTION || currentDirection === BACK_PLANE_DIRECTION) {
                            let angleX = BABYLON.Vector3.Dot(vec, BABYLON.Axis.X);
                            angleX = Math.acos(angleX);

                            if(furnitureMeshActive.lastRotate !== angleX) {
                                // first rotate back to angle = 0
                                furnitureMeshActive.rotate(BABYLON.Axis.Z, -(furnitureMeshActive.lastRotate || 0), BABYLON.Space.WORLD);
                                // then rotate to angle = angleX
                                furnitureMeshActive.rotate(BABYLON.Axis.Z, Math.sign(vec.y)*angleX, BABYLON.Space.WORLD);
                                furnitureMeshActive.lastRotate = Math.sign(vec.y)*angleX;
                                // update rotation Z when reload
                                furnitureMeshActive.informations.rotationZ = Math.sign(vec.y)*angleX;
                            }
                        } 
                        else if(currentDirection === LEFT_PLANE_DIRECTION || currentDirection === RIGHT_PLANE_DIRECTION) {
                            let angleY = BABYLON.Vector3.Dot(vec, BABYLON.Axis.Y);
                            angleY = Math.acos(angleY);

                            if(furnitureMeshActive.lastRotate !== angleY) {
                                furnitureMeshActive.rotate(BABYLON.Axis.Z, -(furnitureMeshActive.lastRotate || 0), BABYLON.Space.WORLD);
                                furnitureMeshActive.rotate(BABYLON.Axis.Z, -Math.sign(vec.x)*angleY, BABYLON.Space.WORLD);
                                furnitureMeshActive.lastRotate = -Math.sign(vec.x)*angleY;
                                // update rotation Z when reload
                                furnitureMeshActive.informations.rotationZ = -Math.sign(vec.x)*angleY;
                            }
                        }

                        if(backHitInfo.length || frontHitInfo.length) {
                            switch (currentDirection) {
                                case FRONT_PLANE_DIRECTION:
                                    furnitureMeshActive.position.y = _pickedPoint.y - 15;
                                    furnitureMeshActive.informations.lastestPosition = new BABYLON.Vector3(
                                        _pickedPoint.x, 
                                        furnitureMeshActive.position.y, 
                                        furnitureMeshActive.position.z
                                    );
                                    break;

                                case BACK_PLANE_DIRECTION:
                                    furnitureMeshActive.position.y = _pickedPoint.y + 15;
                                    furnitureMeshActive.informations.lastestPosition = new BABYLON.Vector3(
                                        _pickedPoint.x, 
                                        furnitureMeshActive.position.y, 
                                        furnitureMeshActive.position.z
                                    );
                                    break;

                                case LEFT_PLANE_DIRECTION:
                                    furnitureMeshActive.position.x = _pickedPoint.x - 15;
                                    furnitureMeshActive.informations.lastestPosition = new BABYLON.Vector3(
                                        furnitureMeshActive.position.x, 
                                        _pickedPoint.y, 
                                        furnitureMeshActive.position.z
                                    );
                                    break;

                                case RIGHT_PLANE_DIRECTION:
                                    furnitureMeshActive.position.x = _pickedPoint.x + 15;
                                    furnitureMeshActive.informations.lastestPosition = new BABYLON.Vector3(
                                        furnitureMeshActive.position.x, 
                                        _pickedPoint.y, 
                                        furnitureMeshActive.position.z
                                    );
                                    break;
                            }

                            // check intersect of glass and mirror with other
                            _checkGlassOrMirrorIntersect();
                        }
                    }
                });
            } 

            let _checkGlassOrMirrorIntersect = () => { this.checkGlassOrMirrorIntersect() };
        }

        // update glass && mirror reflection
        this.renderGlassAndMirrorReflection();
    }

    handleCanvasDropOrLeave = (evt) => { 
        // if 'glass' or 'mirror' not attached with any wall, we will remove it
        if(furnitureMeshActive && furnitureMeshActive.type 
        && (furnitureMeshActive.type.indexOf("glass") !== -1 || furnitureMeshActive.type.indexOf("mirror") !== -1
        )) {
            if(furnitureMeshActive.type.indexOf("glass") !== -1) {
                if(!furnitureMeshActive.informations.attachedMesh) {
                    this.removeGlassItem();
                }
            } else if(furnitureMeshActive.type.indexOf("mirror") !== -1) {
                if(!furnitureMeshActive.informations.attachedMesh) {
                    this.removeMirrorItem();
                }
            }

            // prevent jagging when drop 'glass' or 'mirror'
            if(furnitureMeshActive) {
                furnitureMeshActive.position = furnitureMeshActive.informations?.lastestPosition;
            }
            
            // remove temp plane that attach walls (no cladding) to ray detect
            let tempPlaneToRayDetectMeshes = scene.getMeshesByID("tempPlaneToRayDetect");
            tempPlaneToRayDetectMeshes.map(item => {
                scene.removeMesh(item);
            })

            // when drop mesh, "turn off" ray detect wall
            if(scene.onBeforeRenderObservable.hasObservers) {
                scene.onBeforeRenderObservable.remove(observer);
            }
        }

        this.canvas.removeEventListener("dragover", this.handleCanvasDragOver);
        this.canvas.removeEventListener("dragleave", this.handleCanvasDropOrLeave);
        this.canvas.removeEventListener("drop", this.handleCanvasDropOrLeave);
    }

    handleItemDragOnGround = () => {
        let startingPoint;

        let getGroundPosition = function() {
            groundMesh = scene.getMeshByName("ground");

            let pickInfo = scene.pick(scene.pointerX, scene.pointerY, function(mesh) {
                return mesh === groundMesh;
            });

            if(pickInfo.hit) {
                return pickInfo.pickedPoint;
            }
            return null;
        }        

        let pointerDown = (mesh) => {
            let isWallMesh = wallMeshes.find(item => (item.wall.name === mesh.name) || (mesh.parent && item.wall.name === mesh.parent.name)) !== undefined;
            let isFurnitureItemMesh = furnitureItemMeshes.find(item => item.name === mesh.name) !== undefined;
            let isTileItemMesh = tileItemMeshes.find(item => item.name === mesh.name) !== undefined;

            if(isWallMesh || isFurnitureItemMesh || isTileItemMesh) {
                startingPoint = getGroundPosition();
                if(startingPoint) {
                    setTimeout(() => {
                        this.camera.detachControl(this.canvas);
                    }, 0);
                }
            }
        }

        // *** pointer up === drop
        let pointerUp = () => {
            if(startingPoint) {
                this.camera.attachControl(this.canvas, true);
                startingPoint = null;

                // ** update new position for wall
                const { selectedWall } = this.props;

                if(selectedWall) {
                    let vec = new BABYLON.Vector3(
                        selectedWall.wallParams.endCoord.x,
                        selectedWall.wallParams.endCoord.y,
                        selectedWall.wallParams.endCoord.z,
                    ).subtract(
                        new BABYLON.Vector3(
                            selectedWall.wallParams.beginCoord.x,
                            selectedWall.wallParams.beginCoord.y,
                            selectedWall.wallParams.beginCoord.z,
                        )
                    );

                    let vecNormal = vec.normalize();

                    let newBeginCoord = new BABYLON.Vector3(
                        selectedWall.position.x,
                        selectedWall.position.y,
                        selectedWall.position.z,
                    );

                    let newEndCoord = newBeginCoord.add(vecNormal.scale(selectedWall.wallParams.wallLength));

                    // ** check in case "Under Of Top Rafter", if user drag wall from "half left" to "half right",
                    // we will reset position to begin
                    if(selectedWall.wallParams.wallHeightType === UNDERSIDE_OF_RAFTER_WALL || selectedWall.wallParams.wallHeightType === UNDERSIDE_OF_PURLIN_WALL) {               
                        let sign1 = Math.sign((SHED_BUILDING_INFORMATION.span/2 - selectedWall.wallParams.beginCoord.x));
                        let sign2 = Math.sign((SHED_BUILDING_INFORMATION.span/2 - newBeginCoord.x));

                        let sign3 = Math.sign((SHED_BUILDING_INFORMATION.span/2 - selectedWall.wallParams.endCoord.x) );
                        let sign4 = Math.sign((SHED_BUILDING_INFORMATION.span/2 - newEndCoord.x));

                        if(sign1 !== sign2 || sign3 !== sign4) {
                            selectedWall.position = new BABYLON.Vector3(
                                selectedWall.wallParams.beginCoord.x,
                                selectedWall.wallParams.beginCoord.y,
                                selectedWall.wallParams.beginCoord.z,
                            )
                            return;
                        }
                    }

                    let newWallParams =  {
                        ...selectedWall.wallParams,
                        "beginCoord": {x: newBeginCoord.x, y: newBeginCoord.y, z: newBeginCoord.z},
                        "endCoord": {x: newEndCoord.x, y: newEndCoord.y, z: newEndCoord.z},
                    };

                    // update wallParams
                    selectedWall.wallParams = newWallParams;
                }

                return;
            }
        }

        let pointerMove = () => {
            if(!startingPoint) {
                return;
            }
            let current = getGroundPosition();
            if(!current) {
                return;
            }

            let diff = current.subtract(startingPoint);
            if(furnitureMeshActive)
                furnitureMeshActive.position.addInPlace(diff);
            startingPoint = current;
        }

        scene.onPointerObservable.add((pointerInfo) => {
            const { 
                selectedWall, selectedFurnitureItem, selectedTileItem, 
                selectedGlassItem, selectedMirrorItem 
            } = this.props;

            if(!selectedWall && !selectedFurnitureItem && !selectedTileItem 
            && !selectedGlassItem && !selectedMirrorItem) return;

            switch(pointerInfo.type) {
                case BABYLON.PointerEventTypes.POINTERDOWN:
                    if(pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh != groundMesh) {
                        pointerDown(pointerInfo.pickInfo.pickedMesh);
                    }
                    break;

                case BABYLON.PointerEventTypes.POINTERUP:
                    pointerUp();
                    break;

                case BABYLON.PointerEventTypes.POINTERMOVE:
                    pointerMove();
                    break;
            }
        });
    }

    attachOwnPointerDragBehavior = (dragMesh) => {
        const { informations } = dragMesh;

        if(dragMesh.behaviors.length > 0) return;

        let dragPlaneNormal = BABYLON.Vector3.Zero();

        // first we will find normal of attached wall
        let _attachedMesh = dragMesh.informations.attachedMesh;
        let _beginCoord = _attachedMesh.wallParams.beginCoord;
        let _endCoord = _attachedMesh.wallParams.endCoord;
        let _vec = (new BABYLON.Vector3(_beginCoord.x, _beginCoord.y, _beginCoord.z)).subtract(
            new BABYLON.Vector3(_endCoord.x, _endCoord.y, _endCoord.z)
        );

        _vec = _vec.normalize();

        dragPlaneNormal = BABYLON.Vector3.Cross(_vec, BABYLON.Axis.Z);

        let pointerDragBehavior = new BABYLON.PointerDragBehavior({dragPlaneNormal});
        pointerDragBehavior.moveAttached = false;
        pointerDragBehavior.useObjectOrientationForDragging = false;
        pointerDragBehavior.enabled = true;

        pointerDragBehavior.onDragObservable.add((evt) => {
            pointerDragBehavior.attachedNode.position.x += evt.delta.x;
            pointerDragBehavior.attachedNode.position.y += evt.delta.y;
            pointerDragBehavior.attachedNode.position.z += evt.delta.z;

            // check if mesh drag out TOP, BOTTOM of attached wall
            let _dragMeshBoundingBoxMin = dragMesh.getBoundingInfo().boundingBox.minimumWorld;
            let _dragMeshBoundingBoxMax = dragMesh.getBoundingInfo().boundingBox.maximumWorld;
       
            // OVER BOTTOM
            if(_dragMeshBoundingBoxMin.z <= FLOOR_HEIGHT) {
                dragMesh.position.z = FLOOR_HEIGHT + 1;
            }

            if(informations.attachedMesh) {
                let _attachedMeshBoundingBoxMax = informations.attachedMesh.getBoundingInfo().boundingBox.maximumWorld;
    
                // OVER TOP 
                if(_dragMeshBoundingBoxMax.z >= _attachedMeshBoundingBoxMax.z) {
                    dragMesh.position.z = (_attachedMeshBoundingBoxMax.z - 1) - (_dragMeshBoundingBoxMax.z - _dragMeshBoundingBoxMin.z);       
                }
            }

            this.checkGlassOrMirrorIntersect();
        });

        // pointerDragBehavior.onDragEndObservable.add((evt) => {
        //     // remove pointer drag behavior after finished
        //     if(dragMesh.behaviors.length > 0) {
        //         dragMesh.removeBehavior(dragMesh.behaviors[0]);
        //     }
        // });

        dragMesh.addBehavior(pointerDragBehavior);
    }

    checkGlassOrMirrorIntersect = () => {
        // set red highlight if mesh intersect other mesh
        let isValidPosition = true;

        [...glassItemMeshes, ...mirrorItemMeshes]
            .filter(mesh => mesh.name !== furnitureMeshActive.name)
            .map(mesh => {
                if(furnitureMeshActive.intersectsMesh(mesh, false)) {
                    highLightLayer.removeAllMeshes();
                    highLightLayer.addMesh(furnitureMeshActive, new BABYLON.Color3.FromHexString(INVALID_HIGHLIGHT_COLOR));
                    isValidPosition = false;
                    return;
                }
            });
        
        if(isValidPosition) {
            highLightLayer.removeAllMeshes();
            highLightLayer.addMesh(furnitureMeshActive, new BABYLON.Color3.FromHexString(FURNITURE_HIGHLIGHT_COLOR));
        }
    }

    //*** */ DRAW WALL
    handleDrawWallClick = (evt) => {
        if(!drawPoint.isEnabled()) {
            return;
        }

        // determine if new coordinate ~= each of before coordinates (offset 50), we will get before coordinate
        let newCoordinate = new BABYLON.Vector3(drawPoint.position.x, drawPoint.position.y, drawPoint.position.z);
        newWallCornerCoords.push(newCoordinate);

        // add new wall
        const { 
            wallType, wallHeightType, wallHeight, wallCladdingType, wallCladdingMaterial, externWallCladding, 
            studSize, studDistance 
        } = this.props;

        let length = newWallCornerCoords.length;

        if(length >= 2) {
            let beginCoord = newWallCornerCoords[length - 2]; 
            let endCoord = newWallCornerCoords[length - 1];

            let _studWeb = FURNITURE_STUD_SIZE[studSize] ? FURNITURE_STUD_SIZE[studSize].web : 9; 
            let _studFlange = FURNITURE_STUD_SIZE[studSize] ? FURNITURE_STUD_SIZE[studSize].flange : 3.5; 
            let _studDistance = FURNITURE_STUD_DISTANCE[studDistance] ? FURNITURE_STUD_DISTANCE[studDistance].value : 40.64;
            let _wallHeight = wallHeight*SIMULATE_3D_SCALE;
            let _wallCladdingMaterial = wallCladdingMaterial, _externWallCladding = externWallCladding;
            if(wallCladdingType === WALL_CLADDING_NONE) {
                _wallCladdingMaterial = null;
                _externWallCladding = null;
            } else if(wallCladdingType === WALL_CLADDING_BOTH_SIDE) {
                _externWallCladding = null;
            }

            let params = {
                beginCoord, endCoord, 
                wallType, wallHeightType, wallHeight: _wallHeight, 
                wallCladdingType, wallCladdingMaterial: _wallCladdingMaterial, externWallCladding: _externWallCladding, 
                studSize, studWeb: _studWeb, studFlange: _studFlange, studDistance: _studDistance,
                isCreateNewWall: true, isCreateNewWallName: true, wallComponentIndexes
            }

            let result = {};

            switch (wallHeightType) {
                case CUSTOM_WALL: 
                    result = wallType === PINE_STUD_FRAME ? 
                                              CustomWallPSFLibrary.createCustomInteriorWall(params, scene) 
                                            : CustomWallSSFLibrary.createCustomInteriorWall(params, scene);
                    break;

                case UNDERSIDE_OF_RAFTER_WALL: 
                    result = wallType === PINE_STUD_FRAME ? 
                                              UnderOrTopRafterWallPSFLibrary.createUnderOrTopRafterInteriorWall(params, scene)
                                            : UnderOrTopRafterWallSSFLibrary.createUnderOrTopRafterInteriorWall(params, scene);
                    break;

                case UNDERSIDE_OF_PURLIN_WALL: 
                    result = wallType === PINE_STUD_FRAME ? 
                                                UnderOrTopRafterWallPSFLibrary.createUnderOrTopRafterInteriorWall(params, scene)
                                              : UnderOrTopRafterWallSSFLibrary.createUnderOrTopRafterInteriorWall(params, scene);
                    break;

                case UNDERSIDE_OF_EAVE_PURLIN_WALL: 
                    result = wallType === PINE_STUD_FRAME ? 
                                                UnderEavePurlinWallPSFLibrary.createUnderEavePurlinInteriorWall(params, scene)
                                              : UnderEavePurlinWallSSFLibrary.createUnderEavePurlinInteriorWall(params, scene);
                    break;
            }

            if(result.wall) {
                result.wall.actionManager = new BABYLON.ActionManager(scene);
                result.wall.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(
                        BABYLON.ActionManager.OnPointerOverTrigger,
                        function() { }
                    )
                );
            }

            wallMeshes.push({ wall: result.wall });
        }

        this.props.doSetEnableUndoButton(length >= 2);
    }

    handleDrawWallMouseMove = (evt) => {
        const {wallType, wallThickness} = this.props;
        let position = this.getDrawWallPosition(evt);

        // check position of draw point place in floor
        let wall2DMesh = scene.getMeshByName("wall2D");
        let floorMesh = scene.getMeshByName("floor");
        let boundingBoxMin = floorMesh.getBoundingInfo().boundingBox.minimumWorld;
        let boundingBoxMax = floorMesh.getBoundingInfo().boundingBox.maximumWorld;

        if( 
            position.x < boundingBoxMin.x || position.x > boundingBoxMax.x ||
            position.y < boundingBoxMin.y || position.y > boundingBoxMax.y
        ) {
            if(wall2DMesh) {
                wall2DMesh.setEnabled(false);
            }
            drawPoint.setEnabled(false);
            return;
        }

        if(wall2DMesh) {
            wall2DMesh.setEnabled(true);
        }
        drawPoint.setEnabled(true);

        let newWallCornerCoordIdx0 = new BABYLON.Vector3(position.x, position.y, position.z);
        let newWallCornerCoordIdx1 = newWallCornerCoords[newWallCornerCoords.length - 1];

        drawPoint.position = newWallCornerCoordIdx0;

        // ** enhance performance: if 'draw point' near 'begin coord' or 'end coord' of each wall,
        // we will move 'draw point' on exactly 'begin coord' or 'end coord'
        let beginCoords = wallMeshes && wallMeshes.map(mesh => mesh.wall.wallParams.beginCoord);
        let endCoords = wallMeshes && wallMeshes.map(mesh => mesh.wall.wallParams.endCoord);

        beginCoords.concat(endCoords).map(coord => {
           let distance = BABYLON.Vector3.Distance(newWallCornerCoordIdx0, new BABYLON.Vector3(coord.x, coord.y, coord.z));
            if(distance <= 50) {
                drawPoint.position.x = coord.x;
                drawPoint.position.y = coord.y;
                return;
            }
        });

        // ** enhance performance: if 'draw point' create with another 'begin coord' or 'end coord'
        // straight line, we will show that straight line (dashed line)
        beginCoords.concat(endCoords).map((coord, idx) => {
            let x0 = new BABYLON.Vector3(
                newWallCornerCoordIdx0.x, 
                newWallCornerCoordIdx0.y,
                newWallCornerCoordIdx0.z  
            );

            let xCoord = new BABYLON.Vector3(coord.x, coord.y, coord.z);

            let vec = xCoord.subtract(x0);
            vec.normalize();

            let angleX = BABYLON.Vector3.Dot(vec, BABYLON.Axis.X);
            angleX = Math.acos(angleX);

            let angleY = BABYLON.Vector3.Dot(vec, BABYLON.Axis.Y);
            angleY = Math.acos(angleY);

            if(scene.getMeshByName("simulateStraightLine2D-" + idx)) {
                scene.removeMesh(scene.getMeshByName("simulateStraightLine2D-" + idx))
            }

            let delta = 2;

            if(
                (BABYLON.Tools.ToDegrees(angleX) >= (90 - delta) && BABYLON.Tools.ToDegrees(angleX) <= (90 + delta)) ||
                (BABYLON.Tools.ToDegrees(angleY) >= (90 - delta) && BABYLON.Tools.ToDegrees(angleY) <= (90 + delta))
            ) {
                let paths = [];

                if(BABYLON.Tools.ToDegrees(angleX) >= (90 - delta) && BABYLON.Tools.ToDegrees(angleX) <= (90 + delta)) {
                    let distance = BABYLON.Vector3.Distance(x0, xCoord);
                    let distanceSquare = Math.abs(distance*Math.sin(angleX));

                    paths = [
                        new BABYLON.Vector3(coord.x, coord.y, coord.z + FLOOR_HEIGHT),
                        new BABYLON.Vector3(coord.x, coord.y - Math.sign(vec.y)*distanceSquare, coord.z + FLOOR_HEIGHT)
                    ]
                } else if(BABYLON.Tools.ToDegrees(angleY) >= (90 - delta) && BABYLON.Tools.ToDegrees(angleY) <= (90 + delta)) {
                    let distance = BABYLON.Vector3.Distance(x0, xCoord);
                    let distanceSquare = Math.abs(distance*Math.sin(angleY));

                    paths = [
                        new BABYLON.Vector3(coord.x, coord.y, coord.z + FLOOR_HEIGHT),
                        new BABYLON.Vector3(coord.x - Math.sign(vec.x)*distanceSquare, coord.y, coord.z + FLOOR_HEIGHT)
                    ]
                }

                let simulateStraightLine2DMesh = BABYLON.MeshBuilder.CreateDashedLines(
                    "simulateStraightLine2D-" + idx, {
                    points: paths,
                    dashSize: 1000,
                    gapSize: 500,
                    dashNb: 16,
                });
                simulateStraightLine2DMesh.id = "simulateStraightLine2D";
                simulateStraightLine2DMesh.color = new BABYLON.Color3.Yellow();

                return;
            }
        })

        if(newWallCornerCoords.length >= 1) {
            if(scene.getMeshByName("wall2D")) {
                scene.removeMesh(scene.getMeshByName("wall2D"));
            }

            if(scene.getMeshByName("dashedWall2D")) {
                scene.removeMesh(scene.getMeshByName("dashedWall2D"));
            }

            if(scene.getMeshByName("arc2D")) {
                scene.removeMesh(scene.getMeshByName("arc2D"));
            }

            let vec = newWallCornerCoordIdx0.subtract(newWallCornerCoordIdx1);
            vec.normalize();

            let angle = BABYLON.Vector3.Dot(BABYLON.Axis.X, vec);
            angle = Math.acos(angle);

            // straight wall when angle with axis X in minimum range
            const RANGE_ANGLE_STRAIGHT_WALL = (5/180)*Math.PI;

            let offset0Degree = angle;
            let offset90Degree = Math.PI/2 - angle;
            let offset180Degree = Math.PI - angle;

            if(Math.abs(offset0Degree) <= RANGE_ANGLE_STRAIGHT_WALL) {
                newWallCornerCoordIdx0.y = newWallCornerCoordIdx1.y;
            } else if(Math.abs(offset90Degree) <= RANGE_ANGLE_STRAIGHT_WALL) {
                newWallCornerCoordIdx0.x = newWallCornerCoordIdx1.x;
            } else if(Math.abs(offset180Degree) <= RANGE_ANGLE_STRAIGHT_WALL) {
                newWallCornerCoordIdx0.y = newWallCornerCoordIdx1.y;
            }

            drawPoint.position = newWallCornerCoordIdx0;

            // update angle between drawPoint and axis X
            let vec2 = drawPoint.position.subtract(newWallCornerCoordIdx1);
            vec2.normalize();

            //** We have 3 points */
            // point 0: position that mouse is moving, also call is "draw point"
            // point 1: prev position of point 0 (newWallCoornerCoord[length - 1])
            // point 2: prev position of point 1 (newWallCoornerCoord[length - 2])

            let distance01 = BABYLON.Vector3.Distance(drawPoint.position, newWallCornerCoordIdx1);
            
            let wall2DPoints = [
                new BABYLON.Vector3(
                    newWallCornerCoordIdx1.x, 
                    newWallCornerCoordIdx1.y, 
                    newWallCornerCoordIdx1.z + 5
                ),
                new BABYLON.Vector3(
                    newWallCornerCoordIdx0.x, 
                    newWallCornerCoordIdx0.y, 
                    newWallCornerCoordIdx0.z + 5
                ),
            ];

            let simulateWall2D = this.line2D("wall2D", {path: wall2DPoints, width: wallThickness*SIMULATE_3D_SCALE}, scene);
            simulateWall2D.material = new BABYLON.StandardMaterial("mat", scene);
            simulateWall2D.material.emissiveColor = wallType === PINE_STUD_FRAME 
                                                        ? new BABYLON.Color3.FromHexString("#FF6D00")
                                                        : new BABYLON.Color3.FromHexString("#C8CCCE");

            // *** code to draw some things: 
            // 'dashed wall': dashed line that place on lastest wall
            // 'arc2D': arc circle between wall2D and lastest wall
            let dashedWall2DPoints = [];

            if(newWallCornerCoords.length <= 1) {
                dashedWall2DPoints = [
                    new BABYLON.Vector3(
                        newWallCornerCoordIdx1.x, 
                        newWallCornerCoordIdx1.y, 
                        newWallCornerCoordIdx1.z + 5
                    ),
                    new BABYLON.Vector3(
                        newWallCornerCoordIdx1.x + distance01, 
                        newWallCornerCoordIdx1.y, 
                        newWallCornerCoordIdx1.z + 5
                    ),
                ];
            } else {
                let newWallCornerCoordIdx2 = newWallCornerCoords[newWallCornerCoords.length - 2];
                
                let vec21 = new BABYLON.Vector3(
                    newWallCornerCoordIdx2.x, 
                    newWallCornerCoordIdx2.y, 
                    newWallCornerCoordIdx2.z
                ).subtract(
                    new BABYLON.Vector3(
                        newWallCornerCoordIdx1.x, 
                        newWallCornerCoordIdx1.y, 
                        newWallCornerCoordIdx1.z
                    )
                )

                let vec01 = new BABYLON.Vector3(
                    newWallCornerCoordIdx0.x, 
                    newWallCornerCoordIdx0.y, 
                    newWallCornerCoordIdx0.z         
                ).subtract(
                    new BABYLON.Vector3(
                        newWallCornerCoordIdx1.x, 
                        newWallCornerCoordIdx1.y, 
                        newWallCornerCoordIdx1.z
                    )
                )

                let vec21Normal = vec21.normalize();
                let vec01Normal = vec01.normalize();

                let distance21 = BABYLON.Vector3.Distance(
                    new BABYLON.Vector3(
                        newWallCornerCoordIdx2.x, 
                        newWallCornerCoordIdx2.y, 
                        newWallCornerCoordIdx2.z + 5
                    ),
                    new BABYLON.Vector3(
                        newWallCornerCoordIdx1.x, 
                        newWallCornerCoordIdx1.y, 
                        newWallCornerCoordIdx1.z + 5
                    )     
                );

                let distance01 = BABYLON.Vector3.Distance(
                    new BABYLON.Vector3(
                        newWallCornerCoordIdx0.x, 
                        newWallCornerCoordIdx0.y, 
                        newWallCornerCoordIdx0.z + 5
                    ), 
                    new BABYLON.Vector3(
                        newWallCornerCoordIdx1.x, 
                        newWallCornerCoordIdx1.y, 
                        newWallCornerCoordIdx1.z + 5
                    )
                );

                let position1 = new BABYLON.Vector3(
                    newWallCornerCoordIdx1.x, 
                    newWallCornerCoordIdx1.y, 
                    newWallCornerCoordIdx1.z + 5
                ).add(vec21Normal.scale(distance21/4));

                let position2 = new BABYLON.Vector3(
                    newWallCornerCoordIdx1.x, 
                    newWallCornerCoordIdx1.y, 
                    newWallCornerCoordIdx1.z + 5
                ).add(vec01Normal.scale(distance01/4))

                let centerPosition12 = BABYLON.Vector3.Center(position1, position2);

                let vecC12T1 = new BABYLON.Vector3(
                    centerPosition12.x, 
                    centerPosition12.y, 
                    centerPosition12.z         
                ).subtract(
                    new BABYLON.Vector3(
                        newWallCornerCoordIdx1.x, 
                        newWallCornerCoordIdx1.y, 
                        newWallCornerCoordIdx1.z
                    )
                )

                let vecC12T1Normal = vecC12T1.normalize();

                let position3 = new BABYLON.Vector3(
                    newWallCornerCoordIdx1.x, 
                    newWallCornerCoordIdx1.y, 
                    newWallCornerCoordIdx1.z + 5
                ).add(vecC12T1Normal.scale((distance21 + distance01)/8))

                const arc = BABYLON.Curve3.ArcThru3Points(position2, position3, position1, 6);
  
                let arcLine;
    
                if(arc.getPoints().length >= 3) {
                    arcLine = BABYLON.MeshBuilder.CreateTube("arc2D", {path: arc.getPoints(), radius: 5});
                }

                let angle3 = BABYLON.Vector3.Dot(vec01Normal, vec21Normal);
                angle3 = Math.acos(angle3);

                labelSimulateWallAngle.text = BABYLON.Tools.ToDegrees(angle3).toFixed(2) + " °";
                labelSimulateWallAngle.isVisible = true;
                labelSimulateWallAngle.linkWithMesh(arcLine);

                dashedWall2DPoints = [
                    new BABYLON.Vector3(
                        newWallCornerCoordIdx1.x, 
                        newWallCornerCoordIdx1.y, 
                        newWallCornerCoordIdx1.z + 5
                    ),
                    new BABYLON.Vector3(
                        newWallCornerCoordIdx2.x, 
                        newWallCornerCoordIdx2.y, 
                        newWallCornerCoordIdx2.z + 5
                    ).add(vec21Normal.scale(1000))
                ];
            }

            let simulateDashedWall2D = BABYLON.MeshBuilder.CreateDashedLines("dashedWall2D", {
                points: dashedWall2DPoints,
                dashSize: 1000,
                gapSize: 500,
                dashNb: 16
            })

            labelSimulateWallLength.text = Math.round(distance01 * 10) + " mm";
            labelSimulateWallLength.isVisible = true;
            labelSimulateWallLength.linkWithMesh(simulateWall2D);
        }
    }

    getDrawWallPosition = (evt) => {
        //** */ get height of floor
        let floorMesh = scene.getMeshByName("floor");
        let boundingBoxMin = floorMesh.getBoundingInfo().boundingBox.minimumWorld;
        let boundingBoxMax = floorMesh.getBoundingInfo().boundingBox.maximumWorld;

        let floorMeshHeight = (boundingBoxMax.z - boundingBoxMin.z);

        //** */ convert postion from Screen 2D -> 3D
        let target = BABYLON.Vector3.Unproject(
            new BABYLON.Vector3(evt.offsetX, evt.offsetY, 0),
            this.canvas.width,
            this.canvas.height,
            new BABYLON.Matrix.Identity(),
            this.camera.getViewMatrix(),
            this.camera.getProjectionMatrix()
        );

        target.x = this.camera.position.x - target.x;
        target.y = this.camera.position.y - target.y;
        target.z = this.camera.position.z - target.z;

        let position = this.getPlaneAxisZVector(floorMeshHeight, this.camera.position, target);
        return position;
    }

    getPlaneAxisZVector (z, pos, rot) {
        if(!rot.z)
            return null;

        return new BABYLON.Vector3(
            pos.x - (pos.z - z)*rot.x/rot.z,
            pos.y - (pos.z - z)*rot.y/rot.z,
            z,
        )
    }

    getCurrentDirection = () => {
        let cameraForwardDirection = scene.activeCamera.getForwardRay().direction;
        let angleX = BABYLON.Vector3.Dot(cameraForwardDirection, new BABYLON.Vector3(1, 0, 0));
        let angleY = BABYLON.Vector3.Dot(cameraForwardDirection, new BABYLON.Vector3(0, 1, 0));
        let currentPlaneDirection; 
    
        if(angleX < Math.PI/6 && angleX > -Math.PI/6) {
            currentPlaneDirection = angleY > 0 ? FRONT_PLANE_DIRECTION : BACK_PLANE_DIRECTION;
        } else if(angleY < Math.PI/6 && angleY > -Math.PI/6) {
            currentPlaneDirection = angleX > 0 ? LEFT_PLANE_DIRECTION : RIGHT_PLANE_DIRECTION;
        }

        return currentPlaneDirection;
    }

    line2D = function(name, options, scene) {
        //Arrays for vertex positions and indices
        var positions = [];
        var indices = [];
        var normals = [];
    
        var width = options.width/2 || 5;
        var path = options.path;
        var closed = options.closed || false;
    
        //Arrays to hold wall corner data
        var outerData = [];
        var innerData = [];
        var angle = 0;
        
        var nbPoints = path.length;
        var line = BABYLON.Vector3.Zero();
        var nextLine = BABYLON.Vector3.Zero();
        path[1].subtractToRef(path[0], line);
    
        if(nbPoints > 2 && closed) {	
            path[2].subtractToRef(path[1], nextLine);    
            for(var p = 0; p < nbPoints; p++) {    
                angle = Math.PI - Math.acos(BABYLON.Vector3.Dot(line, nextLine)/(line.length() * nextLine.length()));            
                let direction = BABYLON.Vector3.Cross(line, nextLine).normalize().z;                
                let lineNormal = new BABYLON.Vector3(line.y, -1 * line.x, 0).normalize();
                line.normalize();
                innerData[(p + 1) % nbPoints] = path[(p + 1) % nbPoints].subtract(lineNormal.scale(width)).subtract(line.scale(direction * width/Math.tan(angle/2)));
                outerData[(p + 1) % nbPoints] = path[(p + 1) % nbPoints].add(lineNormal.scale(width)).add(line.scale(direction * width/Math.tan(angle/2)));        
                line = nextLine.clone();        
                path[(p + 3) % nbPoints].subtractToRef(path[(p + 2) % nbPoints], nextLine);    
            }
        }
        else {
            let lineNormal = new BABYLON.Vector3(line.y, -1 * line.x, 0).normalize();
            line.normalize();		
            innerData[0] = path[0].subtract(lineNormal.scale(width));
            outerData[0] = path[0].add(lineNormal.scale(width));
        
            for(var p = 0; p < nbPoints - 2; p++) {	
                path[p + 2].subtractToRef(path[p + 1], nextLine);
                angle = Math.PI - Math.acos(BABYLON.Vector3.Dot(line, nextLine)/(line.length() * nextLine.length()));			
                let direction = BABYLON.Vector3.Cross(line, nextLine).normalize().z;			
                lineNormal = new BABYLON.Vector3(line.y, -1 * line.x, 0).normalize();
                line.normalize();
                innerData[p + 1] = path[p + 1].subtract(lineNormal.scale(width)).subtract(line.scale(direction * width/Math.tan(angle/2)));
                outerData[p + 1] = path[p + 1].add(lineNormal.scale(width)).add(line.scale(direction * width/Math.tan(angle/2)));		
                line = nextLine.clone();			
            }
            if(nbPoints > 2) {
                path[nbPoints - 1].subtractToRef(path[nbPoints - 2], line);
                lineNormal = new BABYLON.Vector3(line.y, -1 * line.x, 0).normalize();
                line.normalize();		
                innerData[nbPoints - 1] = path[nbPoints - 1].subtract(lineNormal.scale(width));
                outerData[nbPoints - 1] = path[nbPoints - 1].add(lineNormal.scale(width));
            }
            else{
                innerData[1] = path[1].subtract(lineNormal.scale(width));
                outerData[1] = path[1].add(lineNormal.scale(width));
            }
        }
     
        for(var p = 0; p < nbPoints; p++) {
            positions.push(innerData[p].x, innerData[p].y, innerData[p].z);
        }
    
        for(var p = 0; p < nbPoints; p++) {
            positions.push(outerData[p].x, outerData[p].y, outerData[p].z);
        }
    
        for(var i = 0; i < nbPoints - 1; i++) {
            indices.push(i, i + 1, nbPoints + i + 1);
            indices.push(i, nbPoints + i + 1, nbPoints + i)
        }
        
        if(nbPoints > 2 && closed) {
            indices.push(nbPoints - 1, 0, nbPoints);
            indices.push(nbPoints - 1, nbPoints, 2 * nbPoints - 1)
        }
        
        BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        var customMesh = new BABYLON.Mesh("custom", scene);
    
        //Create a vertexData object
        var vertexData = new BABYLON.VertexData();
    
        //Assign positions and indices to vertexData
        vertexData.positions = positions;
        vertexData.indices = indices;
        vertexData.applyToMesh(customMesh);

        customMesh.name = name;
        return customMesh;
    }

    addWallDoor = async() => {
        let { selectedWall, addDoors } = this.props;
        if(!selectedWall) return;

        let { 
            beginCoord, endCoord, wallType, wallHeightType, wallHeight, 
            studSize, studWeb, studFlange, studDistance,
            wallCladdingType, wallCladdingMaterial, externWallCladding
        } = selectedWall && selectedWall.wallParams;

        let doorList = [];
        // sort addDoors belong doorLeft from low -> high
        addDoors = sortBy(addDoors, function(item) {return item.doorLeft});

        addDoors.map(item => {
            doorList.push({ 
                doorType: item.doorType, 
                doorWidth: FURNITURE_DOOR_TYPES[item.doorType].value.width, 
                doorHeight: FURNITURE_DOOR_TYPES[item.doorType].value.height, 
                doorLeft: item.doorLeft * SIMULATE_3D_SCALE 
            });
        });

        let wallIdxDeleted = -1;
        wallMeshes.map((item, idx) => {
            if(this.props.selectedWall) {
                if(item.wall.name === selectedWall.name) {
                    wallIdxDeleted = idx;
                }
            }
        });

        if(wallIdxDeleted !== -1) {
            scene.removeMesh(wallMeshes[wallIdxDeleted].wall);
   
            // wallChildren: doors
            let wallChildren = wallMeshes[wallIdxDeleted].wall.getChildren();

            if(wallChildren && wallChildren.length > 0) {
                wallChildren.map(item => {
                    scene.removeMesh(item);
                });
            }

            wallMeshes.splice(wallIdxDeleted, 1);
        }

        if(wallComponentIndexes[selectedWall.name]) {
            delete wallComponentIndexes[selectedWall.name];
        }

        let params = {
            name: selectedWall.name, 
            beginCoord: new BABYLON.Vector3(beginCoord.x, beginCoord.y, beginCoord.z),
            endCoord: new BABYLON.Vector3(endCoord.x, endCoord.y, endCoord.z), 
            wallType, wallHeightType, wallHeight, studSize, studWeb, studFlange, studDistance,
            wallCladdingType, wallCladdingMaterial, externWallCladding,
            doorList,
            isCreateNewWall: true, isCreateNewWallName: false, wallComponentIndexes, 
        }

        let result = {};

        if(doorList.length > 0) {
            switch (wallHeightType) {         
                case CUSTOM_WALL:
                    result = (wallType === PINE_STUD_FRAME) ? 
                                            await CustomWallPSFLibrary.createCustomInteriorWallHasDoor(params, scene) 
                                            : await CustomWallSSFLibrary.createCustomInteriorWallHasDoor(params, scene);
                    break;
                
                case UNDERSIDE_OF_RAFTER_WALL:
                    result = (wallType === PINE_STUD_FRAME) ? 
                                            await UnderOrTopRafterWallHasDoorPSFLibrary.createUnderOrTopRafterInteriorWallHasDoor(params, scene) 
                                            : await UnderOrTopRafterWallHasDoorSSFLibrary.createUnderOrTopRafterInteriorWallHasDoor(params, scene);
                    break;

                case UNDERSIDE_OF_PURLIN_WALL:
                    result = (wallType === PINE_STUD_FRAME) ? 
                                            await UnderOrTopRafterWallHasDoorPSFLibrary.createUnderOrTopRafterInteriorWallHasDoor(params, scene) 
                                            : await UnderOrTopRafterWallHasDoorSSFLibrary.createUnderOrTopRafterInteriorWallHasDoor(params, scene);
                    break;

                case UNDERSIDE_OF_EAVE_PURLIN_WALL: 
                    result = (wallType === PINE_STUD_FRAME) ? 
                                            await UnderEavePurlinWallPSFLibrary.createUnderEavePurlinInteriorWallHasDoor(params, scene) 
                                            : await UnderEavePurlinWallSSFLibrary.createUnderEavePurlinInteriorWallHasDoor(params, scene);
                    break;
            }
        } else {
            switch (params.wallHeightType) {
                case CUSTOM_WALL: 
                    result = params.wallType === PINE_STUD_FRAME ? 
                                              CustomWallPSFLibrary.createCustomInteriorWall(params, scene) 
                                            : CustomWallSSFLibrary.createCustomInteriorWall(params, scene);
                    break;

                case UNDERSIDE_OF_RAFTER_WALL: 
                    result = params.wallType === PINE_STUD_FRAME ? 
                                              UnderOrTopRafterWallPSFLibrary.createUnderOrTopRafterInteriorWall(params, scene)
                                            : UnderOrTopRafterWallSSFLibrary.createUnderOrTopRafterInteriorWall(params, scene);
                    break;

                case UNDERSIDE_OF_PURLIN_WALL: 
                    result = params.wallType === PINE_STUD_FRAME ? 
                                              UnderOrTopRafterWallPSFLibrary.createUnderOrTopRafterInteriorWall(params, scene)
                                            : UnderOrTopRafterWallSSFLibrary.createUnderOrTopRafterInteriorWall(params, scene);
                    break;

                case UNDERSIDE_OF_EAVE_PURLIN_WALL: 
                    result = params.wallType === PINE_STUD_FRAME ? 
                                              UnderEavePurlinWallPSFLibrary.createUnderEavePurlinInteriorWall(params, scene)
                                            : UnderEavePurlinWallSSFLibrary.createUnderEavePurlinInteriorWall(params, scene);
                    break;
            }
        }

        if(result.wall) {
            result.wall.actionManager = new BABYLON.ActionManager(scene);
            result.wall.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOverTrigger,
                    function() { }
                )
            );
        }

        if(result.doors) {
            result.doors.map(door => {
                door.actionManager = new BABYLON.ActionManager(scene);        
                door.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(
                        BABYLON.ActionManager.OnPointerOverTrigger,
                        function() { }
                    )
                );
                door.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(
                        BABYLON.ActionManager.OnLeftPickTrigger,
                        function() { 
                            setSelectedFurnitureWall(result.wall);
                        }
                    )
                );

                const setSelectedFurnitureWall = (wall) => {
                    highLightLayer.removeAllMeshes();
                    highLightLayer.addMesh(wall, new BABYLON.Color3.FromHexString(FURNITURE_HIGHLIGHT_COLOR));

                    furnitureMeshActive = wall;

                    //this.props.doChangeFurnitureTab({tabIndex: 0});
                    this.props.doSetSelectedFurnitureWall(wall);
                }
            });
        }

        wallMeshes.push({ wall: result.wall, doors: result.doors });
    }

    undoDrawWall = () => {
        if(newWallCornerCoords.length > 1) {
            newWallCornerCoords.splice(newWallCornerCoords.length - 1, 1);
            
            // delete wall after undo draw
            let deletedWall = wallMeshes[wallMeshes.length - 1];
            scene.removeMesh(deletedWall.wall);

            wallMeshes.splice(wallMeshes.length - 1);
        }
    }

    resetDrawWall = () => {
        let wall2DMesh = scene.getMeshByName("wall2D");
        if(wall2DMesh) {
            scene.removeMesh(wall2DMesh);
        }

        let dashedWall2DMesh = scene.getMeshByName("dashedWall2D");
        if(dashedWall2DMesh) {
            scene.removeMesh(dashedWall2DMesh);
        }

        let arc2DMesh = scene.getMeshByName("arc2D");
        if(arc2DMesh) {
            scene.removeMesh(arc2DMesh);
        }

        let simulateStraightLine2DMeshes = scene.getMeshesByID("simulateStraightLine2D");
        simulateStraightLine2DMeshes.map(mesh => {
            scene.removeMesh(mesh);
        })

        labelSimulateWallAngle.isVisible = false;
        labelSimulateWallLength.isVisible = false;

        newWallCornerCoords = [];

        this.props.doSetEnableUndoButton(false);
    }

    duplicateFurnitureWall = () => {
        const { selectedWall } = this.props;
        if(!selectedWall) return;

        const { beginCoord, endCoord } = selectedWall && selectedWall.wallParams;
        
        let newWallName = "W" + (++wallComponentIndexes["maxWallIdx"]);
        let newFurnitureWall= selectedWall.clone(newWallName);

        //** Also update wall component indexes for new wall */
        let currentWCI = wallComponentIndexes[selectedWall.name];
        wallComponentIndexes[newWallName] = {};
        let newWCI = wallComponentIndexes[newWallName];

        if(currentWCI["bottomPlates"] && currentWCI["bottomPlates"].length > 0) {
            newWCI["bottomPlates"] = [];

            currentWCI["bottomPlates"].map(doc => {
                newWCI["bottomPlates"].push({
                    ...doc,
                    "wallName": newWallName,
                    "mark": 'BP' + (++wallComponentIndexes["maxBottomPlateIdx"]),
                });
            });
        }

        if(currentWCI["topPlates"] && currentWCI["topPlates"].length > 0) {
            newWCI["topPlates"] = [];

            currentWCI["topPlates"].map(doc => {
                newWCI["topPlates"].push({
                    ...doc,
                    "wallName": newWallName,
                    "mark": 'TP' + (++wallComponentIndexes["maxTopPlateIdx"]),
                });
            });
        }

        if(currentWCI["studs"] && currentWCI["studs"].length > 0) {
            newWCI["studs"] = [];

            currentWCI["studs"].map(doc => {
                newWCI["studs"].push({
                    ...doc,
                    "wallName": newWallName,
                    "mark": 'S' + (++wallComponentIndexes["maxStudIdx"]),
                });
            });
        }

        if(currentWCI["crippleStuds"] && currentWCI["crippleStuds"].length > 0) {
            newWCI["crippleStuds"] = [];

            currentWCI["crippleStuds"].map(doc => {
                newWCI["crippleStuds"].push({
                    ...doc,
                    "wallName": newWallName,
                    "mark": 'CS' + (++wallComponentIndexes["maxCrippleStudIdx"]),
                });
            });
        }

        if(currentWCI["noggins"] && currentWCI["noggins"].length > 0) {
            newWCI["noggins"] = [];

            currentWCI["noggins"].map(doc => {
                newWCI["noggins"].push({
                    ...doc,
                    "wallName": newWallName,
                    "mark": 'N' + (++wallComponentIndexes["maxNogginIdx"]),
                });
            });
        }

        if(currentWCI["headerStuds"] && currentWCI["headerStuds"].length > 0) {
            newWCI["headerStuds"] = [];

            currentWCI["headerStuds"].map(doc => {
                newWCI["headerStuds"].push({
                    ...doc,
                    "wallName": newWallName,
                    "mark": 'HS' + (++wallComponentIndexes["maxHeaderStudIdx"]),
                });
            });
        }
        
        if(currentWCI["trimmerDoorStuds"] && currentWCI["trimmerDoorStuds"].length > 0) {
            newWCI["trimmerDoorStuds"] = [];

            currentWCI["trimmerDoorStuds"].map(doc => {
                newWCI["trimmerDoorStuds"].push({
                    ...doc,
                    "wallName": newWallName,
                    "mark": 'TDS' + (++wallComponentIndexes["maxTrimmerDoorStudIdx"]),
                });
            });
        }

        if(currentWCI["doors"] && currentWCI["doors"].length > 0) {
            newWCI["doors"] = [];

            currentWCI["doors"].map(doc => {
                newWCI["doors"].push({
                    ...doc,
                    "wallName": newWallName,
                    "mark": 'D' + (++wallComponentIndexes["maxDoorIdx"]),
                });
            });
        }

        if(currentWCI["plasterBoards"] && currentWCI["plasterBoards"].length > 0) {
            newWCI["plasterBoards"] = [];

            currentWCI["plasterBoards"].map(doc => {
                newWCI["plasterBoards"].push({
                    ...doc,
                    "wallName": newWallName,
                    "mark": 'PB' + (++wallComponentIndexes["maxPlasterBoardIdx"]),
                });
            });
        }

        if(currentWCI["externPlasterBoards"] && currentWCI["externPlasterBoards"].length > 0) {
            newWCI["externPlasterBoards"] = [];

            currentWCI["externPlasterBoards"].map(doc => {
                newWCI["externPlasterBoards"].push({
                    ...doc,
                    "wallName": newWallName,
                    "mark": 'EPB' + (++wallComponentIndexes["maxExternPlasterBoardIdx"]),
                });
            });
        }

        let vec = new BABYLON.Vector3(
            beginCoord.x, 
            beginCoord.y, 
            beginCoord.z
        ).subtract(
            new BABYLON.Vector3( 
                endCoord.x, 
                endCoord.y, 
                endCoord.z
            )
        );

        let crossWithAxisZ = BABYLON.Vector3.Cross(vec.normalize(), BABYLON.Axis.Z);

        const WALL_BLANK = 100;

        let newBeginCoord = new BABYLON.Vector3(
            beginCoord.x, 
            beginCoord.y, 
            beginCoord.z
        ).add(crossWithAxisZ.scale(WALL_BLANK));

        let newEndCoord = new BABYLON.Vector3(
            endCoord.x, 
            endCoord.y, 
            endCoord.z
        ).add(crossWithAxisZ.scale(WALL_BLANK));

        newFurnitureWall.position.copyFrom(newBeginCoord);

        let newWallParams = {
            ...selectedWall.wallParams,
            "beginCoord": {x: newBeginCoord.x, y: newBeginCoord.y, z: newBeginCoord.z},
            "endCoord": {x: newEndCoord.x, y: newEndCoord.y, z: newEndCoord.z},
        };

        newFurnitureWall.wallParams = newWallParams;

        newFurnitureWall.actionManager = new BABYLON.ActionManager(scene);        
        newFurnitureWall.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOverTrigger,
                function() { }
            )
        );
  
        // set highlight for new copied item
        highLightLayer.addMesh(newFurnitureWall, new BABYLON.Color3.FromHexString(COPIED_FURNITURE_HIGHLIGHT_COLOR));
  
        // add into array
        wallMeshes.push({ wall: newFurnitureWall });
    }

    removeFurnitureWall = () => {
        let idxDeleted = -1;

        wallMeshes.map((item, idx) => {
            if(this.props.selectedWall) {
                if(item.wall.name === furnitureMeshActive.name) {
                    idxDeleted = idx;
                }
            }
        });

        if(idxDeleted !== -1) {
            scene.removeMesh(wallMeshes[idxDeleted].wall);

            // wallChildren: doors
            let wallChildren = wallMeshes[idxDeleted].wall.getChildren();

            if(wallChildren && wallChildren.length > 0) {
                wallChildren.map(item => {
                    scene.removeMesh(item);
                });
            }

            // when remove wall also remove all 'glass' attach that wall
            glassItemMeshes
                .map((item, idxDeleted) => {
                    if(item.informations.attachedMesh.name === furnitureMeshActive.name) {
                        //glassItemIdxesDeleted.push(idxDeleted);
                        scene.removeMesh(glassItemMeshes[idxDeleted]);
                    }
                });

            glassItemMeshes = glassItemMeshes.filter(item => item.informations.attachedMesh.name !== furnitureMeshActive.name);

            // when remove wall also remove all 'mirror' attach that wall
            let mirrorItemIdxesDeleted = [];

            mirrorItemMeshes
                .map((item, idxDeleted) => {
                    if(item.informations.attachedMesh.name === furnitureMeshActive.name) {
                        mirrorItemIdxesDeleted.push(idxDeleted);
                    }
                });
            
            for(let i = 0; i < mirrorItemIdxesDeleted.length; i++) {
                scene.removeMesh(mirrorItemMeshes[mirrorItemIdxesDeleted[i]]);
                mirrorItemMeshes.splice(mirrorItemIdxesDeleted[i], 1)
            }
   
            wallMeshes.splice(idxDeleted, 1);
        }

        if(wallComponentIndexes[furnitureMeshActive.name]) {
            delete wallComponentIndexes[furnitureMeshActive.name];
        }

        furnitureMeshActive = null;
        gizmo.attachedMesh = null;
        this.props.doSetSelectedFurnitureWall(null);
    }

    deSelectedWall = () => {
        gizmo.attachedMesh = null;
        furnitureMeshActive = null;
        highLightLayer.removeAllMeshes();

        this.props.doClearViewDetail();
        this.props.doSetSelectedFurnitureWall(null);
    }

    // *** ITEMS
    handleFurnitureItemIconDragStart = async(evt, group, code, name) => {
        furnitureMeshActive = null;

        let iconImg = document.getElementById(code);

        if(iconImg) {
            let hiddenImgClone = iconImg.cloneNode(true);
            hiddenImgClone.style.visibility = "hidden";
            hiddenImgClone.style.position = "absolute"; 
            hiddenImgClone.style.top = "0px"; 
            hiddenImgClone.style.right = "0px";
            document.body.appendChild(hiddenImgClone);

            evt.dataTransfer.setDragImage(hiddenImgClone, 0, 0);
        }

        engine.displayLoadingUI();

        // ** import mesh into scene
        BABYLON.SceneLoader.ImportMesh("", `/assets/FURNITURES/models/${group}/`, `${code}.glb`, scene, 
            function(newMeshes) {
                if(newMeshes.length > 0) {

                    if(newMeshes[0].id === "__root__") {
                        newMeshes.splice(0, 1);
                    }
                    
                    let newFurnitureMesh = BABYLON.Mesh.MergeMeshes(newMeshes, true, true, undefined, false, true);
                    newFurnitureMesh.name = name;
                    newFurnitureMesh.position.z += FLOOR_HEIGHT;

                    newFurnitureMesh.scaling.x = SIMULATE_3D_SCALE;
                    newFurnitureMesh.scaling.y = SIMULATE_3D_SCALE;
                    newFurnitureMesh.scaling.z = SIMULATE_3D_SCALE;
        
                    let meshBoundingBoxMin = newFurnitureMesh.getBoundingInfo().boundingBox.minimumWorld;
                    let meshBoundingBoxMax = newFurnitureMesh.getBoundingInfo().boundingBox.maximumWorld;
        
                    let width  = (meshBoundingBoxMax.x - meshBoundingBoxMin.x);
                    //let height = (meshBoundingBoxMax.y - meshBoundingBoxMin.y);
                    let length = (meshBoundingBoxMax.y - meshBoundingBoxMin.y);
                    let height = (meshBoundingBoxMax.z - meshBoundingBoxMin.z);
                    
                    newFurnitureMesh.informations = {
                        group, code, name, width, length, height
                    }

                    newFurnitureMesh.actionManager = new BABYLON.ActionManager(scene);        
                    newFurnitureMesh.actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(
                            BABYLON.ActionManager.OnPointerOverTrigger,
                            function() { }
                        )
                    );
                    newFurnitureMesh.setEnabled(false);

                    furnitureMeshActive = newFurnitureMesh;

                    // add into array
                    furnitureItemMeshes.push(newFurnitureMesh);

                    engine.hideLoadingUI();
                }
            },
            // onProgress
            function(evt) { 
                let loadedPercent = 0;
                if(evt.lengthComputable) {
                    loadedPercent = (evt.loaded*100/evt.total).toFixed();

                } else {
                    let dlCount = evt.loaded / (1024 * 1024);

                    loadedPercent = Math.floor(dlCount*100)/100;
                }

                //document.getElementById("div0").innerHTML = '%' + loadedPercent;
                //document.getElementById("loadingScreenPercent").innerHTML = loadedPercent;
            }
        );

        this.canvas.addEventListener("dragover", this.handleCanvasDragOver, false);
        this.canvas.addEventListener("drop", this.handleCanvasDropOrLeave, false);
    }

    duplicateFurnitureItem = () => {
        const { selectedFurnitureItem } = this.props;
        if(!selectedFurnitureItem) return;

        const { name, informations } = selectedFurnitureItem;
        const { group, type, width, length, height } = informations;
        const FURNITURE_ITEM_BLANK = 50;

        let newFurnitureItem = selectedFurnitureItem.clone(name);

        let position = selectedFurnitureItem.position.clone();
        position.addInPlace(new BABYLON.Vector3(width*SIMULATE_3D_SCALE + FURNITURE_ITEM_BLANK, 0, 0));
        newFurnitureItem.position.copyFrom(position);

        newFurnitureItem.informations = informations;

        newFurnitureItem.actionManager = new BABYLON.ActionManager(scene);        
        newFurnitureItem.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOverTrigger,
                function() { }
            )
        );

        // set highlight for new copied item
        highLightLayer.addMesh(newFurnitureItem, new BABYLON.Color3.FromHexString(COPIED_FURNITURE_HIGHLIGHT_COLOR));
  
        // add into array
        furnitureItemMeshes.push(newFurnitureItem);
    }

    removeFurnitureItem = () => {
        let idxDeleted = -1;

        furnitureItemMeshes.map((item, idx) => {
            if(furnitureMeshActive) {
                if(item.name === furnitureMeshActive.name) {
                    idxDeleted = idx;
                }
            }
        });

        if(idxDeleted !== -1) {
            scene.removeMesh(furnitureItemMeshes[idxDeleted]);
            furnitureItemMeshes.splice(idxDeleted, 1);
        }

        furnitureMeshActive = null;
        gizmo.attachedMesh = null;
        this.props.doSetSelectedFurnitureItem(null);
    }

    deSelectedFurnitureItem = (evt) => {
        gizmo.attachedMesh = null;
        furnitureMeshActive = null;
        highLightLayer.removeAllMeshes();
        
        this.props.doClearViewDetail();
        this.props.doSetSelectedFurnitureItem(null);
    }

    enableRotateFurnitureItem = () => {
        const { selectedFurnitureItem } = this.props;

        gizmo.attachedMesh = selectedFurnitureItem;
    }

    // *** TILES 
    handleTileItemIconDragStart = async(evt, group, type) => {
        const { 
            tileType, tileItem, tileWidth, tileLength, tileOrientation, 
            tileColor = "0xFFFFFF", tileTexture,
        } = this.props;

        furnitureMeshActive = null;

        let iconImg = document.getElementById(type);

        if(iconImg) {
            let hiddenImgClone = iconImg.cloneNode(true);
            hiddenImgClone.style.visibility = "hidden";
            hiddenImgClone.style.position = "absolute"; 
            hiddenImgClone.style.top = "0px"; 
            hiddenImgClone.style.right = "0px";
            document.body.appendChild(hiddenImgClone);

            evt.dataTransfer.setDragImage(hiddenImgClone, 0, 0);
        }

        let name = "T" + (++tileIndexes["maxTileIdx"]);
        let newTileMesh = this.createTileMesh({ 
            group, type, name, tileWidth, tileLength, tileOrientation, tileTexture, tileColor 
        });
        newTileMesh.setEnabled(false);

        this.canvas.addEventListener("dragover", this.handleCanvasDragOver, false);
        this.canvas.addEventListener("drop", this.handleCanvasDropOrLeave, false);
    }

    createTileMesh = (params) => {
        const { 
            group, type, name, tileWidth, tileLength, 
            tileOrientation, tileTexture, tileColor, 
            position, rotation 
        } = params;

        let value = FURNITURE_TILES[group]["itemTypes"][type]["value"];
        const TILE_WIDTH = value.width * SIMULATE_3D_SCALE;
        const TILE_LENGTH = value.length * SIMULATE_3D_SCALE;
        const TILE_DEPTH = value.depth * SIMULATE_3D_SCALE;
        const TILE_BLANK = 0.8;

        // material
        let tileMat = new BABYLON.StandardMaterial(`${type}-mat-${uuid.v1()}`);
        if(tileTexture) {
            tileMat.diffuseTexture = new BABYLON.Texture(`/assets/FURNITURES/textures/${tileTexture}.png`);
        }
        tileMat.diffuseColor = new BABYLON.Color3.FromHexString(tileColor);
        tileMat.backFaceCulling = false;

        let groutMat = tileMat.clone("grout-mat");
        groutMat.diffuseColor = tileColor === "#FFFFFF" ? new BABYLON.Color3.FromHexString("#4B3D33") 
                                                        : new BABYLON.Color3.White();
        groutMat.backFaceCulling = false;

        let tileWidthNum = Math.floor(tileWidth/value.width);
        let tileLengthNum = Math.floor(tileLength/value.length);

        let newTileMeshes = [];
        let multiMat = new BABYLON.MultiMaterial('multi', scene);

        for(let i = 0; i < tileWidthNum; i++) {
            for(let j = 0; j < tileLengthNum; j++){
                let _newTileMesh = BABYLON.MeshBuilder.CreateBox("new-tile-mesh", { 
                    width: TILE_WIDTH, height: TILE_LENGTH, depth: TILE_DEPTH 
                }, scene);

                _newTileMesh.setPivotMatrix(
                    BABYLON.Matrix.Translation(TILE_WIDTH/2, TILE_LENGTH/2, TILE_DEPTH/2), false
                );

                _newTileMesh.position.x = (TILE_WIDTH + TILE_BLANK) * i;
                _newTileMesh.position.y = (TILE_LENGTH + TILE_BLANK) * j;

                newTileMeshes = [...newTileMeshes, _newTileMesh];
                multiMat.subMaterials = [...multiMat.subMaterials, tileMat];
            }
        }

        // create vertical grout
        for(let i = 0; i < tileWidthNum - 1; i++) {
            const GROUT_WIDTH = TILE_BLANK;
            const GROUT_LENGTH = (TILE_LENGTH * tileLengthNum) + TILE_BLANK * (tileLengthNum - 1);
            const GROUT_DEPTH = TILE_DEPTH;

            let _newGroutMesh = BABYLON.MeshBuilder.CreateBox(`vertical-grout-${uuid.v1()}`, { 
                width: GROUT_WIDTH, height: GROUT_LENGTH, depth: GROUT_DEPTH
            }, scene);

            _newGroutMesh.setPivotMatrix(
                BABYLON.Matrix.Translation(GROUT_WIDTH/2, GROUT_LENGTH/2, GROUT_DEPTH/2), false
            );

            _newGroutMesh.position.x = TILE_WIDTH * (i + 1) + TILE_BLANK * i;

            newTileMeshes = [...newTileMeshes, _newGroutMesh];
            multiMat.subMaterials = [...multiMat.subMaterials, groutMat];
        }

        // create horizontal grout
        for(let i = 0; i < tileLengthNum - 1; i++) {
            const GROUT_WIDTH = TILE_WIDTH * tileWidthNum + TILE_BLANK * (tileWidthNum - 1);
            const GROUT_LENGTH = TILE_BLANK;
            const GROUT_DEPTH = TILE_DEPTH;

            let _newGroutMesh = BABYLON.MeshBuilder.CreateBox(`horizontal-grout-${uuid.v1()}`, { 
                width: GROUT_WIDTH, height: GROUT_LENGTH, depth: GROUT_DEPTH
            }, scene);

            _newGroutMesh.setPivotMatrix(
                BABYLON.Matrix.Translation(GROUT_WIDTH/2, GROUT_LENGTH/2, GROUT_DEPTH/2), false
            );

            _newGroutMesh.position.y = TILE_LENGTH * (i + 1) + TILE_BLANK * i;

            newTileMeshes = [...newTileMeshes, _newGroutMesh];
            multiMat.subMaterials = [...multiMat.subMaterials, groutMat];
        }

        let newTileMesh = BABYLON.Mesh.MergeMeshes(newTileMeshes, true, true, undefined, false, true);
        newTileMesh.name = name;

        let currentDirection = this.getCurrentDirection();

        if(tileOrientation === "horizontal") {
            switch (currentDirection) {
                case FRONT_PLANE_DIRECTION:
                    newTileMesh.rotation.z = 0;
                    break;

                case BACK_PLANE_DIRECTION:
                    newTileMesh.rotation.z = Math.PI;
                    break;

                case LEFT_PLANE_DIRECTION:
                    newTileMesh.rotation.z = -Math.PI/2;
                    break;

                case RIGHT_PLANE_DIRECTION:
                    newTileMesh.rotation.z = Math.PI/2;
                    break;
            }
        } else {
            switch (currentDirection) {
                case FRONT_PLANE_DIRECTION:
                    newTileMesh.rotation.x = Math.PI/2;          
                    break;

                case BACK_PLANE_DIRECTION:
                    newTileMesh.rotation.x = Math.PI/2;
                    break;

                case LEFT_PLANE_DIRECTION:
                    newTileMesh.rotation.y = -Math.PI/2;
                    newTileMesh.rotation.z = -Math.PI/2;
                    break;

                case RIGHT_PLANE_DIRECTION:
                    newTileMesh.rotation.y = Math.PI/2;
                    newTileMesh.rotation.z = Math.PI/2;
                    break;
            }
        }

        if(position) {
            newTileMesh.position = new BABYLON.Vector3(position.x, position.y, position.z);
        }

        if(rotation) {
            newTileMesh.rotation = new BABYLON.Vector3(rotation.x, rotation.y, rotation.z);
        }

        // set multi material
        newTileMesh.material = multiMat;
        for(let i = 0; i < newTileMesh.subMeshes.length; i++) {
            newTileMesh.subMeshes[i].materialIndex = i;
        }

        newTileMesh.informations = {
            group, type, name, tileWidth, tileLength, tileOrientation, tileTexture, tileColor
        }

        newTileMesh.actionManager = new BABYLON.ActionManager(scene);        
        newTileMesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOverTrigger,
                function() { }
            )
        );

        furnitureMeshActive = newTileMesh;
        tileItemMeshes.push(newTileMesh);

        return newTileMesh;
    } 

    duplicateTileItem = () => {
        const { selectedTileItem } = this.props;
        if(!selectedTileItem) return;

        const { informations } = selectedTileItem || {};
        const { 
            group, type, tileWidth, tileLength, tileOrientation, 
            tileTexture, tileColor 
        } = informations;

        const TILE_BLANK = 50;
        let name = "T" + (++tileIndexes["maxTileIdx"]);
        let newTileItem = selectedTileItem.clone(name);
 
        let position = selectedTileItem.position.clone();
        position.addInPlace(new BABYLON.Vector3(tileWidth * SIMULATE_3D_SCALE + TILE_BLANK, 0, 0));
        newTileItem.position.copyFrom(position);

        newTileItem.informations = {
            group, type, name, tileWidth, tileLength, tileOrientation, tileTexture, tileColor
        }

        newTileItem.actionManager = new BABYLON.ActionManager(scene); 
        newTileItem.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOverTrigger,
                function() {}
            )
        );

        // set highlight for new copied item
        highLightLayer.addMesh(newTileItem, new BABYLON.Color3.FromHexString(COPIED_FURNITURE_HIGHLIGHT_COLOR));
  
        furnitureMeshActive = newTileItem;
        tileItemMeshes.push(newTileItem);
    }

    removeTileItem = () => {
        let idxDeleted = -1;

        tileItemMeshes.map((item, idx) => {
            if(furnitureMeshActive) {
                if(item.name === furnitureMeshActive.name) {
                    idxDeleted = idx;
                }
            }
        });

        if(idxDeleted !== -1) {
            scene.removeMesh(tileItemMeshes[idxDeleted]);
            tileItemMeshes.splice(idxDeleted, 1);
        }

        furnitureMeshActive = null;
        gizmo.attachedMesh = null;
        this.props.doSetSelectedTileItem(null);
    }

    deSelectedTileItem = (evt) => {
        gizmo.attachedMesh = null;
        furnitureMeshActive = null;
        highLightLayer.removeAllMeshes();

        this.props.doClearViewDetail();
        this.props.doSetSelectedTileItem(null);
    }

    //*** GLASS && MIRRORS */
    // *** GLASS
    handleGlassIconDragStart = async(evt, type) => {
        furnitureMeshActive = null;

        let iconImg = document.getElementById(type);

        if(iconImg) {
            let hiddenImgClone = iconImg.cloneNode(true);
            hiddenImgClone.style.visibility = "hidden";
            hiddenImgClone.style.position = "absolute"; 
            hiddenImgClone.style.top = "0px"; 
            hiddenImgClone.style.right = "0px";
            document.body.appendChild(hiddenImgClone);

            evt.dataTransfer.setDragImage(hiddenImgClone, 0, 0);
        }

        const { glassWidth, glassHeight, glassDepth } = this.props;

        let name = "G" + (++glassMirrorIndexes["maxGlassIdx"]);
        let newGlassMesh = this.createGlassMesh({ name, glassWidth, glassHeight, glassDepth });
        newGlassMesh.setEnabled(false);

        let CoT = scene.getTransformNodeByName("GlassOrMirrorCoT");
        if(CoT) {
            scene.removeTransformNode(CoT);
        }
      
        this.canvas.addEventListener("dragover", this.handleCanvasDragOver, false);
        this.canvas.addEventListener("dragleave", this.handleCanvasDropOrLeave, false)
        this.canvas.addEventListener("drop", this.handleCanvasDropOrLeave, false);
    }

    createGlassMesh = (params) => {
        const { name, glassWidth, glassHeight, glassDepth, position, rotation } = params;

        // multiply SIMULATE_3D_SCALE to simulate in 3D scene
        const GLASS_WIDTH = glassWidth * SIMULATE_3D_SCALE;
        const GLASS_HEIGHT = glassHeight * SIMULATE_3D_SCALE;
        const GLASS_DEPTH = glassDepth * SIMULATE_3D_SCALE;

        let newGlassMesh = BABYLON.MeshBuilder.CreatePlane(name, {
            width: GLASS_WIDTH, 
            height: GLASS_HEIGHT,
            //sideOrientation: BABYLON.Mesh.BACKSIDE
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }, scene);
        newGlassMesh.type = "glass";
        newGlassMesh.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);
        newGlassMesh.setPivotMatrix(BABYLON.Matrix.Translation(0, GLASS_HEIGHT/2, 0), false);

        let currentDirection = this.getCurrentDirection();

        switch (currentDirection) {
            case FRONT_PLANE_DIRECTION:
                newGlassMesh.rotate(BABYLON.Axis.Z, 0, BABYLON.Space.WORLD);
                break;

            case BACK_PLANE_DIRECTION:
                newGlassMesh.rotate(BABYLON.Axis.Z, Math.PI, BABYLON.Space.WORLD);
                break;

            case LEFT_PLANE_DIRECTION:
                newGlassMesh.rotate(BABYLON.Axis.Z, -Math.PI/2, BABYLON.Space.WORLD);
                break;

            case RIGHT_PLANE_DIRECTION:
                newGlassMesh.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);
                break;
        }

        if(position) {
            newGlassMesh.position = new BABYLON.Vector3(position.x, position.y, position.z);
        }

        if(rotation) {
            newGlassMesh.rotation = new BABYLON.Vector3(rotation.x, rotation.y, rotation.z);
        }

        // ensure working with new values for glass by computing and obtaining its world matrix
        newGlassMesh.computeWorldMatrix(true);
        let glassWorldMatrix = newGlassMesh.getWorldMatrix();

        // obtain normals for plane and assign one of them as normal
        let glassVertexData = newGlassMesh.getVerticesData("normal");
        let glassNormal = new BABYLON.Vector3(glassVertexData[0], glassVertexData[1], glassVertexData[2]);
        glassNormal = new BABYLON.Vector3.TransformNormal(glassNormal, glassWorldMatrix);

        // create reflection surface for mirror surface
        let reflector = new BABYLON.Plane.FromPositionAndNormal(newGlassMesh.position, glassNormal.scale(-1));

        let glassMat = scene.getMaterialByName("glassMat");
        if(!glassMat) {
            glassMat = new BABYLON.StandardMaterial("glassMat", scene);
            glassMat.reflectionTexture = new BABYLON.MirrorTexture("glassTexture", 1024, scene, true);
            glassMat.reflectionTexture.mirrorPlane = reflector;
            glassMat.reflectionTexture.level = 1;
        }

        newGlassMesh.material = glassMat;

        newGlassMesh.informations = { name, glassWidth, glassHeight, glassDepth };
   
        newGlassMesh.actionManager = new BABYLON.ActionManager(scene);        
        newGlassMesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOverTrigger,
                function() { }
            )
        );

        furnitureMeshActive = newGlassMesh;
        glassItemMeshes.push(newGlassMesh);

        return newGlassMesh;
    }

    duplicateGlassItem = () => {
        const { selectedGlassItem } = this.props;
        if(!selectedGlassItem) return;

        const GLASS_BLANK = 50;
        const GLASS_WIDTH  = selectedGlassItem.informations.glassWidth * SIMULATE_3D_SCALE;
        const GLASS_HEIGHT = selectedGlassItem.informations.glassHeight * SIMULATE_3D_SCALE;

        let name = "G" + (++glassMirrorIndexes["maxGlassIdx"]);
        let newGlassItem = selectedGlassItem.clone(name);

        newGlassItem.setPivotMatrix(BABYLON.Matrix.Translation(0, GLASS_HEIGHT/2, 0), false);
        newGlassItem.informations = cloneDeep(selectedGlassItem.informations);

        let _attachedMesh = selectedGlassItem.informations.attachedMesh;
        let _beginCoord = _attachedMesh.wallParams.beginCoord;
        let _endCoord = _attachedMesh.wallParams.endCoord;
        let _vec = (new BABYLON.Vector3(_beginCoord.x, _beginCoord.y, _beginCoord.z)).subtract(
            new BABYLON.Vector3(_endCoord.x, _endCoord.y, _endCoord.z)
        );

        _vec = _vec.normalize();

        let angleX = BABYLON.Vector3.Dot(_vec, BABYLON.Axis.X);
        angleX = Math.acos(angleX);

        let offsetX = Math.sign(_vec.x) * Math.abs((GLASS_WIDTH + GLASS_BLANK)*Math.cos(angleX));
        let offsetY = Math.sign(_vec.y) * Math.abs((GLASS_WIDTH + GLASS_BLANK)*Math.sin(angleX));

        let position = selectedGlassItem.position.clone();
        position.addInPlace(new BABYLON.Vector3(offsetX, offsetY, 0));
        newGlassItem.position.copyFrom(position);

        newGlassItem.actionManager = new BABYLON.ActionManager(scene); 
        newGlassItem.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOverTrigger,
                function() {}
            )
        );

        // set highlight for new copied item
        highLightLayer.addMesh(newGlassItem, new BABYLON.Color3.FromHexString(COPIED_FURNITURE_HIGHLIGHT_COLOR));
  
        glassItemMeshes.push(newGlassItem);
    }

    removeGlassItem = () => {
        let idxDeleted = -1;

        glassItemMeshes.map((item, idx) => {
            if(furnitureMeshActive) {
                if(item.name === furnitureMeshActive.name) {
                    idxDeleted = idx;
                }
            }
        });

        if(idxDeleted !== -1) {
            scene.removeMesh(glassItemMeshes[idxDeleted]);
            glassItemMeshes.splice(idxDeleted, 1);
        }

        furnitureMeshActive = null;
        gizmo.attachedMesh = null;
        this.props.doSetSelectedGlassItem(null);
    }

    deSelectedGlassItem = (evt) => {
        gizmo.attachedMesh = null;
        furnitureMeshActive = null;
        highLightLayer.removeAllMeshes();

        this.props.doClearViewDetail();
        this.props.doSetSelectedGlassItem(null);
    }

    //*** MIRROR
    handleMirrorIconDragStart = async(evt, type) => {
        furnitureMeshActive = null;

        let iconImg = document.getElementById(type);

        if(iconImg) {
            let hiddenImgClone = iconImg.cloneNode(true);
            hiddenImgClone.style.visibility = "hidden";
            hiddenImgClone.style.position = "absolute"; 
            hiddenImgClone.style.top = "0px"; 
            hiddenImgClone.style.right = "0px";
            document.body.appendChild(hiddenImgClone);

            evt.dataTransfer.setDragImage(hiddenImgClone, 0, 0);
        }

        const { mirrorWidth, mirrorHeight, mirrorDepth } = this.props;

        let name = "M" + (++glassMirrorIndexes["maxMirrorIdx"]);
        let newMirrorMesh = this.createMirrorMesh({ name, mirrorWidth, mirrorHeight, mirrorDepth });
        newMirrorMesh.setEnabled(false);

        let CoT = scene.getTransformNodeByName("GlassOrMirrorCoT");
        if(CoT) {
            scene.removeTransformNode(CoT);
        }

        this.canvas.addEventListener("dragover", this.handleCanvasDragOver, false);
        this.canvas.addEventListener("dragleave", this.handleCanvasDropOrLeave, false)
        this.canvas.addEventListener("drop", this.handleCanvasDropOrLeave, false);
    }

    createMirrorMesh = (params) => {
        const { name, mirrorWidth, mirrorHeight, mirrorDepth, position, rotation } = params;

        // multiply SIMULATE_3D_SCALE to simulate in 3D scene
        const MIRROR_WIDTH = mirrorWidth * SIMULATE_3D_SCALE;
        const MIRROR_HEIGHT = mirrorHeight * SIMULATE_3D_SCALE;
        const MIRROR_DEPTH = mirrorDepth * SIMULATE_3D_SCALE;

        let newMirrorMesh = BABYLON.MeshBuilder.CreateSphere(name, {
            diameterX: MIRROR_WIDTH, diameterY: MIRROR_HEIGHT, diameterZ: MIRROR_DEPTH,
            sideOrientation: BABYLON.Mesh.BACKSIDE
        }, scene);
        newMirrorMesh.type = "mirror";
        newMirrorMesh.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);
        newMirrorMesh.setPivotMatrix(BABYLON.Matrix.Translation(0, MIRROR_HEIGHT/2, 0), false);

        let currentDirection = this.getCurrentDirection();

        switch (currentDirection) {
            case FRONT_PLANE_DIRECTION:
                newMirrorMesh.rotate(BABYLON.Axis.Z, 0, BABYLON.Space.WORLD);
                break;

            case BACK_PLANE_DIRECTION:
                newMirrorMesh.rotate(BABYLON.Axis.Z, Math.PI, BABYLON.Space.WORLD);
                break;

            case LEFT_PLANE_DIRECTION:
                newMirrorMesh.rotate(BABYLON.Axis.Z, -Math.PI/2, BABYLON.Space.WORLD);
                break;

            case RIGHT_PLANE_DIRECTION:
                newMirrorMesh.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);
                break;
        }

        if(position) {
            newMirrorMesh.position = new BABYLON.Vector3(position.x, position.y, position.z);
        }

        if(rotation) {
            newMirrorMesh.rotation = new BABYLON.Vector3(rotation.x, rotation.y, rotation.z);
        }

        // ensure working with new values for glass by computing and obtaining its world matrix
        newMirrorMesh.computeWorldMatrix(true);
        var mirrorWorldMatrix = newMirrorMesh.getWorldMatrix();

        // obtain normals for plane and assign one of them as normal
        var mirrorVertexData = newMirrorMesh.getVerticesData("normal");
        var mirrorNormal = new BABYLON.Vector3(mirrorVertexData[0], mirrorVertexData[1], mirrorVertexData[2]);
        mirrorNormal = new BABYLON.Vector3.TransformNormal(mirrorNormal, mirrorWorldMatrix);

        // create reflection surface for mirror surface
        var reflector = new BABYLON.Plane.FromPositionAndNormal(newMirrorMesh.position, mirrorNormal.scale(-1));

        // create the mirror material
        let mirrorMat = scene.getMaterialByName("mirrorMat");
        if(!mirrorMat) {
            mirrorMat = new BABYLON.StandardMaterial("mirrorMat", scene);
            mirrorMat.reflectionTexture = new BABYLON.MirrorTexture("mirrorTexture", 1024, scene, true);
            mirrorMat.reflectionTexture.mirrorPlane = reflector;
            mirrorMat.reflectionTexture.level = 1;
        }

        newMirrorMesh.material = mirrorMat;

        newMirrorMesh.informations = { name, mirrorWidth, mirrorHeight, mirrorDepth };
   
        newMirrorMesh.actionManager = new BABYLON.ActionManager(scene);        
        newMirrorMesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOverTrigger,
                function() { }
            )
        );

        furnitureMeshActive = newMirrorMesh;
        mirrorItemMeshes.push(newMirrorMesh);

        return newMirrorMesh;
    }

    duplicateMirrorItem = () => {
        const { selectedMirrorItem } = this.props;
        if(!selectedMirrorItem) return;

        const MIRROR_BLANK = 50;
        const MIRROR_WIDTH  = selectedMirrorItem.informations.mirrorWidth * SIMULATE_3D_SCALE;    
        const MIRROR_HEIGHT = selectedMirrorItem.informations.mirrorHeight * SIMULATE_3D_SCALE;  

        let name = "M" + (++glassMirrorIndexes["maxMirrorIdx"]);
        let newMirrorItem = selectedMirrorItem.clone(name);
        newMirrorItem.setPivotMatrix(BABYLON.Matrix.Translation(0, MIRROR_HEIGHT/2, 0), false);
        newMirrorItem.informations = cloneDeep(selectedMirrorItem.informations);

        // we will find attached mesh to count angle of attached mesh (wall) with Axis X
        let _attachedMesh = selectedMirrorItem.informations.attachedMesh;
        let _beginCoord = _attachedMesh.wallParams.beginCoord;
        let _endCoord = _attachedMesh.wallParams.endCoord;
        let _vec = (new BABYLON.Vector3(_beginCoord.x, _beginCoord.y, _beginCoord.z)).subtract(
            new BABYLON.Vector3(_endCoord.x, _endCoord.y, _endCoord.z)
        );

        _vec = _vec.normalize();
                    
        let angleX = BABYLON.Vector3.Dot(_vec, BABYLON.Axis.X);
        angleX = Math.acos(angleX);

        let offsetX = Math.sign(_vec.x) * Math.abs((MIRROR_WIDTH + MIRROR_BLANK)*Math.cos(angleX));
        let offsetY = Math.sign(_vec.y) * Math.abs((MIRROR_WIDTH + MIRROR_BLANK)*Math.sin(angleX));

        let position = selectedMirrorItem.position.clone();
        position.addInPlace(new BABYLON.Vector3(offsetX, offsetY, 0));
        newMirrorItem.position.copyFrom(position);

        newMirrorItem.actionManager = new BABYLON.ActionManager(scene); 
        newMirrorItem.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOverTrigger,
                function() {}
            )
        );

        // set highlight for new copied item
        highLightLayer.addMesh(newMirrorItem, new BABYLON.Color3.FromHexString(COPIED_FURNITURE_HIGHLIGHT_COLOR));

        mirrorItemMeshes.push(newMirrorItem);
    }

    removeMirrorItem = () => {
        let idxDeleted = -1;

        mirrorItemMeshes.map((item, idx) => {
            if(furnitureMeshActive) {
                if(item.name === furnitureMeshActive.name) {
                    idxDeleted = idx;
                }
            }
        });

        if(idxDeleted !== -1) {
            scene.removeMesh(mirrorItemMeshes[idxDeleted]);
            mirrorItemMeshes.splice(idxDeleted, 1);
        }

        furnitureMeshActive = null;
        gizmo.attachedMesh = null;
        this.props.doSetSelectedMirrorItem(null);
    }

    deSelectedMirrorItem = (evt) => {
        gizmo.attachedMesh = null;
        furnitureMeshActive = null;
        highLightLayer.removeAllMeshes();

        this.props.doClearViewDetail();
        this.props.doSetSelectedMirrorItem(null);
    }

    //*** SAVE && RELOAD && REMOVE ALL */
    handleReset = (evt) => {
        if(this.props.furnitureDrawingType === FURNITURE_DRAW_WALL_OPTION) {
            this.resetDrawWall();
        } else {
            this.props.doClearViewDetail();
            this.reset();
        }
    }

    handleRemoveAll = (evt) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Are you sure to remove all furniture walls, items, tiles, glasses, mirrors?',
            onConfirm: () => {      
                this.removeAllMeshes();
           
                this.props.saveFurnitureComponents({ 
                    quoteId: 2738, 
                    furnitureParams: { 
                        wallParams: [], furnitureItemParams: [], tileParams: [], 
                        glassParams: [], mirrorParams: [] 
                    } 
                });
            },
        });
    }

    removeAllMeshes = () => {
        // walls         
        wallMeshes.map((item) => {
            scene.removeMesh(item.wall);
            scene.removeMesh(item.door);
        });
        wallMeshes = [];
        this.props.doSetSelectedFurnitureWall(null);

        // items
        furnitureItemMeshes.map((item) => { scene.removeMesh(item); });
        furnitureItemMeshes = [];
        this.props.doSetSelectedFurnitureItem(null);

        // tiles
        tileItemMeshes.map(item => { scene.removeMesh(item); });
        tileItemMeshes = [];
        this.props.doSetSelectedTileItem(null);

        // glasses
        glassItemMeshes.map(item => { scene.removeMesh(item); });
        glassItemMeshes = [];
        this.props.doSetSelectedGlassItem(null);
        
        // mirrors
        mirrorItemMeshes.map(item => { scene.removeMesh(item); });
        mirrorItemMeshes = [];
        this.props.doSetSelectedMirrorItem(null);

        gizmo.attachedMesh = null;
    }

    renderGlassAndMirrorReflection() {
        let glassMat = scene.getMaterialByName("glassMat");
        if(glassMat) {
            glassMat.reflectionTexture.renderList = [...furnitureItemMeshes, ...tileItemMeshes];
        }

        let mirrorMat = scene.getMaterialByName("mirrorMat");

        if(mirrorMat) {
            mirrorMat.reflectionTexture.renderList = [...furnitureItemMeshes, ...tileItemMeshes];
        }
    }

    handleSave = (evt) => {
        this.props.openModalAction({
            id: uuid.v4(),
            type: MODAL_TYPE_CONFIRMATION,
            text: 'Are you sure to save all furniture walls, items, tiles, glasses, mirrors?',
            onConfirm: () => {      
                //** WALLS */
                let wallParams = [];

                wallMeshes && wallMeshes.map(item => {
                    const { beginCoord, endCoord } = item.wall.wallParams || {};

                    wallParams.push({ 
                        name: item.wall.name,
                        beginCoord: { x: beginCoord.x, y: beginCoord.y, z: beginCoord.z },
                        endCoord: { x: endCoord.x, y: endCoord.y, z: endCoord.z }, 
                        ...item.wall.wallParams
                    });
                });

                //** ITEMS */
                let furnitureItemParams = [];

                furnitureItemMeshes && furnitureItemMeshes.map(item => {
                    const { informations, position, rotation } = item;

                    furnitureItemParams.push({
                        ...informations,
                        position: { x: position.x, y: position.y, z: position.z, },
                        rotation: { x: rotation.x, y: rotation.y, z: rotation.z, }
                    });
                });

                //** TILES */
                let tileParams = [];

                tileItemMeshes && tileItemMeshes.map(item => {
                    const { informations, position, rotation } = item;
                    const { 
                        group, type, name, tileWidth, tileLength, tileOrientation, tileColor, tileTexture 
                    } = informations || {};

                    tileParams.push({
                        group, type, name, tileWidth, tileLength, tileOrientation, 
                        tileColor, tileTexture,
                        position: { x: position.x, y: position.y, z: position.z, },
                        rotation: { x: rotation.x, y: rotation.y, z: rotation.z, }
                    });
                });

                //** GLASS */
                let glassParams = [];

                glassItemMeshes && glassItemMeshes.map(item => {
                    const { informations, position } = item;
                    const { name, glassWidth, glassHeight, glassDepth, attachedMesh } = informations || {};
                    
                    let rotation = BABYLON.Vector3.Zero();

                    if(item.rotationQuaternion) {
                        rotation = item.rotationQuaternion.toEulerAngles();
                    } else {
                        rotation = item.rotation;
                    }

                    glassParams.push({
                        name, glassWidth, glassHeight, glassDepth,
                        position: { x: position.x, y: position.y, z: position.z },
                        rotation: { x: rotation.x, y: rotation.y, z: rotation.z },
                        attachedMeshName: attachedMesh && attachedMesh.name
                    });
                });

                //** MIRROR */
                let mirrorParams = [];

                mirrorItemMeshes && mirrorItemMeshes.map(item => {
                    const { informations, position } = item;
                    const { name, mirrorWidth, mirrorHeight, mirrorDepth, attachedMesh } = informations || {};

                    let rotation = BABYLON.Vector3.Zero();

                    if(item.rotationQuaternion) {
                        rotation = item.rotationQuaternion.toEulerAngles();
                    } else {
                        rotation = item.rotation;
                    }

                    mirrorParams.push({
                        name, mirrorWidth, mirrorHeight, mirrorDepth,
                        position: { x: position.x, y: position.y, z: position.z, },
                        rotation: { x: rotation.x, y: rotation.y, z: rotation.z, },
                        attachedMeshName: attachedMesh && attachedMesh.name
                    });
                });

                this.props.saveFurnitureComponents({ 
                    quoteId: 2738, 
                    furnitureParams: { wallParams, furnitureItemParams, tileParams, glassParams, mirrorParams },
                    wallComponentIndexes, tileIndexes, glassMirrorIndexes
                });

                console.log('---- handle Save', { wallParams, furnitureItemParams, tileParams, glassParams, mirrorParams })
            },
        });
    }

    importFurnitureComponentsIntoScene = async(furnitureComponent) => {
        const { furnitureParams } = furnitureComponent;
        if(!furnitureParams) return;

        // remove all meshes before reload again
        this.removeAllMeshes();

        wallComponentIndexes = furnitureComponent.wallComponentIndexes;
        tileIndexes = furnitureComponent.tileIndexes;
        glassMirrorIndexes = furnitureComponent.glassMirrorIndexes;

        // we will create promise for walls, because glasses and mirrors need wall to attach
        let renderWallsPromises = furnitureParams.wallParams && furnitureParams.wallParams.map(async(params, idx) => {
            params.beginCoord = new BABYLON.Vector3(
                params.beginCoord.x, 
                params.beginCoord.y, 
                params.beginCoord.z
            );
            params.endCoord = new BABYLON.Vector3(
                params.endCoord.x, 
                params.endCoord.y, 
                params.endCoord.z
            );

            params.isCreateNewWall = false;
            params.isCreateNewWallName = false;
            params.wallComponentIndexes = wallComponentIndexes;
       
            let result = {};

            if(params.doorList && params.doorList.length > 0) {
                switch (params.wallHeightType) {         
                    case CUSTOM_WALL:
                        result = (params.wallType === PINE_STUD_FRAME) ? 
                                                  await CustomWallPSFLibrary.createCustomInteriorWallHasDoor(params, scene) 
                                                : await CustomWallSSFLibrary.createCustomInteriorWallHasDoor(params, scene);
                        break;
                    
                    case UNDERSIDE_OF_RAFTER_WALL:
                        result = (params.wallType === PINE_STUD_FRAME) ? 
                                                  await UnderOrTopRafterWallHasDoorPSFLibrary.createUnderOrTopRafterInteriorWallHasDoor(params, scene) 
                                                : await UnderOrTopRafterWallHasDoorSSFLibrary.createUnderOrTopRafterInteriorWallHasDoor(params, scene);
                        break;

                    case UNDERSIDE_OF_PURLIN_WALL:
                        result = (params.wallType === PINE_STUD_FRAME) ? 
                                                  await UnderOrTopRafterWallHasDoorPSFLibrary.createUnderOrTopRafterInteriorWallHasDoor(params, scene) 
                                                : await UnderOrTopRafterWallHasDoorSSFLibrary.createUnderOrTopRafterInteriorWallHasDoor(params, scene);
                        break;
        
                    case UNDERSIDE_OF_EAVE_PURLIN_WALL: 
                        result = (params.wallType === PINE_STUD_FRAME) ? 
                                                  await UnderEavePurlinWallPSFLibrary.createUnderEavePurlinInteriorWallHasDoor(params, scene) 
                                                : await UnderEavePurlinWallSSFLibrary.createUnderEavePurlinInteriorWallHasDoor(params, scene);
                        break;
                }
            } else {
                switch (params.wallHeightType) {
                    case CUSTOM_WALL: 
                        result = params.wallType === PINE_STUD_FRAME ? 
                                                  CustomWallPSFLibrary.createCustomInteriorWall(params, scene) 
                                                : CustomWallSSFLibrary.createCustomInteriorWall(params, scene);
                        break;

                    case UNDERSIDE_OF_RAFTER_WALL: 
                        result = params.wallType === PINE_STUD_FRAME ? 
                                                  UnderOrTopRafterWallPSFLibrary.createUnderOrTopRafterInteriorWall(params, scene)
                                                : UnderOrTopRafterWallSSFLibrary.createUnderOrTopRafterInteriorWall(params, scene);
                        break;

                    case UNDERSIDE_OF_PURLIN_WALL: 
                        result = params.wallType === PINE_STUD_FRAME ? 
                                                  UnderOrTopRafterWallPSFLibrary.createUnderOrTopRafterInteriorWall(params, scene)
                                                : UnderOrTopRafterWallSSFLibrary.createUnderOrTopRafterInteriorWall(params, scene);
                        break;

                    case UNDERSIDE_OF_EAVE_PURLIN_WALL: 
                        result = params.wallType === PINE_STUD_FRAME ? 
                                                  UnderEavePurlinWallPSFLibrary.createUnderEavePurlinInteriorWall(params, scene)
                                                : UnderEavePurlinWallSSFLibrary.createUnderEavePurlinInteriorWall(params, scene);
                        break;
                }
            }

            if(result.wall) {
                result.wall.actionManager = new BABYLON.ActionManager(scene);
                result.wall.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(
                        BABYLON.ActionManager.OnPointerOverTrigger,
                        function() { }
                    )
                );
            }
            
            if(result.doors) {
                result.doors.map(door => {
                    door.actionManager = new BABYLON.ActionManager(scene);        
                    door.actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(
                            BABYLON.ActionManager.OnPointerOverTrigger,
                            function() { }
                        )
                    );
    
                    door.actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(
                            BABYLON.ActionManager.OnLeftPickTrigger,
                            function() { 
                                setSelectedFurnitureWall(result.wall);
                            }
                        )
                    );
    
                    const setSelectedFurnitureWall = (wall) => {
                        highLightLayer.removeAllMeshes();
                        highLightLayer.addMesh(wall, new BABYLON.Color3.FromHexString(FURNITURE_HIGHLIGHT_COLOR));
    
                        furnitureMeshActive = wall;
    
                        //this.props.doChangeFurnitureTab({tabIndex: 0});
                        this.props.doSetSelectedFurnitureWall(wall);
                    }
                });
            }

            wallMeshes.push({ wall: result.wall, doors: result.doors });
        });

        await Promise.all(renderWallsPromises);

        // show loading
        if(furnitureParams.furnitureItemParams && furnitureParams.furnitureItemParams.length > 0)
            engine.displayLoadingUI();

        furnitureParams.furnitureItemParams && furnitureParams.furnitureItemParams.map(async(item) => {
            const { group, code, name, width, length, height, position, rotation } = item;

            // ** import mesh into scene
            BABYLON.SceneLoader.ImportMesh("", `/assets/FURNITURES/models/${group}/`, `${code}.glb`, scene, function(newMeshes) {
                if(newMeshes.length > 0) {

                    if(newMeshes[0].id === "__root__") {
                        newMeshes.splice(0, 1);
                    }
                    
                    let newFurnitureMesh = BABYLON.Mesh.MergeMeshes(newMeshes, true, true, undefined, false, true);
                    newFurnitureMesh.name = name;
                    newFurnitureMesh.scaling.x = SIMULATE_3D_SCALE;
                    newFurnitureMesh.scaling.y = SIMULATE_3D_SCALE;
                    newFurnitureMesh.scaling.z = SIMULATE_3D_SCALE;
                    newFurnitureMesh.position = new BABYLON.Vector3(position.x, position.y, position.z);
                    newFurnitureMesh.rotation = new BABYLON.Vector3(rotation.x, rotation.y, rotation.z);
             
                    newFurnitureMesh.informations = { group, code, name, width, length, height };

                    newFurnitureMesh.actionManager = new BABYLON.ActionManager(scene);        
                    newFurnitureMesh.actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(
                            BABYLON.ActionManager.OnPointerOverTrigger,
                            function() { }
                        )
                    );
                    furnitureMeshActive = newFurnitureMesh;

                    // add into array
                    furnitureItemMeshes.push(newFurnitureMesh);
                    
                    // hide loading
                    if(furnitureItemMeshes.length === furnitureParams.furnitureItemParams.length) {
                        engine.hideLoadingUI();
                        // reload reflection for glasses and mirrors
                        _renderGlassAndMirrorReflection();
                    }
                }
            });

            const _renderGlassAndMirrorReflection = () => {
                this.renderGlassAndMirrorReflection();
            }
        });

        furnitureParams.tileParams && furnitureParams.tileParams.map(async(item) => {
            const { 
                group, type, name, tileWidth, tileLength, tileOrientation, 
                tileColor, tileTexture, position, rotation
            } = item;

            this.createTileMesh({ 
                group, type, name, tileWidth, tileLength, tileOrientation, tileTexture, tileColor,
                position, rotation
            });
        });

        furnitureParams.glassParams && furnitureParams.glassParams.map(async(item) => {
            const { 
                name, attachedMeshName, glassWidth, glassHeight, glassDepth, position, rotation
            } = item;

            let newGlassMesh = this.createGlassMesh({ 
                name, glassWidth, glassHeight, glassDepth, position, rotation
            });

            let findAttachedWallMesh = wallMeshes.find(wallMesh => wallMesh.wall.name === attachedMeshName);
            // update attachedMesh for informations
            newGlassMesh.informations.attachedMesh = findAttachedWallMesh && findAttachedWallMesh.wall;
        });

        furnitureParams.mirrorParams && furnitureParams.mirrorParams.map(async(item) => {
            const { 
                name, attachedMeshName, mirrorWidth, mirrorHeight, 
                mirrorDepth, position, rotation 
            } = item;
            let newMirrorMesh = this.createMirrorMesh({ 
                name, mirrorWidth, mirrorHeight, mirrorDepth, position, rotation 
            });
            let findAttachedWallMesh = wallMeshes.find(wallMesh => wallMesh.wall.name === attachedMeshName);
            // update attachedMesh for informations
            newMirrorMesh.informations.attachedMesh = findAttachedWallMesh && findAttachedWallMesh.wall;
        });
    }
}

export default FurnitureComponents;