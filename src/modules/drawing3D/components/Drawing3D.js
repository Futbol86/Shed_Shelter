import React, {Component} from 'react';
import * as dat from 'dat.gui';
import moment from 'moment';
import Modal from 'react-modal';

import { Col, Row, Button } from 'reactstrap';
// import {STLFileLoader} from "@babylonjs/core";
import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";
import earcut from "earcut";
// import * as Ammo from 'ammo.js';
// import "@babylonjs/core";
import "babylonjs-loaders";
import * as BABYLON_SERIALIZER from "babylonjs-serializers";
import {OBJFileLoader, STLFileLoader} from "babylonjs-loaders"
import {each, sortBy, max, union, difference} from "lodash";
import Stats from 'stats-js';
import {
    SHED_BUILDING_INFORMATION, PLANE_DIRECTION_OFFSET, HIGH_LIGHT_WALL_WHEN_DRAG,
    FRONT_PLANE_DIRECTION, BACK_PLANE_DIRECTION, LEFT_PLANE_DIRECTION, RIGHT_PLANE_DIRECTION,
    FOOTING_PLAN_SECTION_LABELS, VENTILATION_DIAMETER, 
    VALID_LOCATE_POSITION, INVALID_LOCATE_POSITION, VALID_HIGHLIGHT_COLOR, 
    INVALID_HIGHLIGHT_COLOR, SEARCH_BRACKET_HIGHLIGHT_COLOR,
    LOAD_BASIC_OPTION, LOAD_OPTIMIZE_BY_CLONE_OPTION, LOAD_OPTIMIZE_BY_INSTANCE_OPTION
} from '../constants';
import {
    DOCS_TYPE_SIMPLIFIED_SHED_SHEET,
    FURNITURE_NORMAL_OPTION,
    FURNITURE_DRAW_WALL_OPTION,
} from '../constants';
import {PUNCHINGS} from '../punchingConstants';
import {FLOOR_HEIGHT} from '../constants';

import BackgroundLibrary from './Libraries/Background';
import PanelLibrary from './Libraries/Panel';
import BargeCappingLibrary from './Libraries/BargeCapping';
import RidgeCappingLibrary from './Libraries/RidgeCapping';
import DoorLibrary from './Libraries/Door';
import WindowLibrary from './Libraries/Window';
import JambLibrary from './Libraries/Jamb';
import BracketLibrary from './Libraries/Bracket';
import GutterLibrary from './Libraries/Gutter';
import StrapBraceLibrary from './Libraries/StrapBrace';
import RoofLibrary from './Libraries/Roof';
import StramitLibrary from './Libraries/Stramit';
import PunchingLibrary from './Libraries/Punching';

import PurlinAndGirt from './Drawing3DLibraries/PurlinAndGirt';
import Drawing3DToolbar from '../containers/Toolbar/Drawing3DToolbar';
import FurnitureComponents from './Drawing3D/FurnitureComponents';

import {PURLIN_GIRT_C_SECTIONS, PURLIN_GIRT_Z_SECTIONS, PURLIN_GIRT_TS_SECTIONS} from '../constants';

let scene, gui, camera;
let selectedMesh, lastSelectedMesh;
let shedSelectedText = new GUI.TextBlock();
let measureLoadingShedText = new GUI.TextBlock();

let skyBoxMesh, groundMesh, floorMesh;
let endColumnMeshes = [], mainColumnMeshes = []; 
let endRafterMeshes = [], mainRafterMeshes = [], rafterMeshes = [], roofStructMeshes = [], roofPurlinMeshes = [];
let mullionColumnMeshes = [], rDColumnMeshes = [], columnMeshes = [], extraRDColumnMeshes = [], eavePurlinMeshes = [];
let sideWallGirtMeshes = [], endWallGirtMeshes = [];
let accessDoorMeshes = [], accessDoublePADoorMeshes = [], rollerDoorHeaderMeshes = [], rollerDoorMeshes = [], windowJambMeshes = [], windowMeshes = [], barnWindowMeshes = [];
let bargeCappingMeshes = [], ridgeCappingMeshes = [], gutterMeshes = [], sideWallSheetingMeshes = [], endWallSheetingMeshes = [], roofSheetingMeshes = [];
let strapBraceMeshes = [];
let skyLightMeshes = [], ventilationFanMeshes = [];

let newDragMesh = null, currentPointerDragMesh = null;
let highLightLayer;
let highLightMeshes = [], validHighLightMesh, invalidHighLightMesh;
let currentPlaneDirection, lastPlaneDirection;
let frontEWPurlinAndGirtMeshes = [], backEWPurlinAndGirtMeshes = [], leftSWPurlinAndGirtMeshes = [], rightSWPurlinAndGirtMeshes = [];
let frontEWInDragMode, backEWInDragMode, leftSWInDragMode, rightSWInDragMode;

let sphereFaceCamera;
let leftSWSMeshes = [], rightSWSMeshes = [], frontEWSMeshes = [], backEWSMeshes = [];
let currentWallActive = null;
let sphereCameraOffset = 0;
let lastWallIndexWhenParallelSphereCamera = -1;

let lastHoverRoofName, lastPointerDragHoverRoofName;
let ventilationFanMeshSample, sphereOnSkyMesh;
let rayHelper;
let minRoofX = Number.POSITIVE_INFINITY, minRoofY = Number.POSITIVE_INFINITY, minRoofZ = Number.POSITIVE_INFINITY; 
let maxRoofX = Number.NEGATIVE_INFINITY, maxRoofY = Number.NEGATIVE_INFINITY, maxRoofZ = Number.NEGATIVE_INFINITY;

let footingPlanLabelMeshes = [];
let purlinGirtSampleMeshes = [];

let renderShedByOption = LOAD_BASIC_OPTION;

let statsFPS = new Stats();
statsFPS.domElement.style.cssText = "position:absolute;top:20%;left:22%";
statsFPS.showPanel(0);

let bracketSampleMesh;
let furnitureComponents;

BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function() {
    if(document.getElementById("loadingDiv")) {
        document.getElementById("loadingDiv").style.display = "initial";
        return;
    }

    this._loadingDiv = document.createElement("div");
    this._loadingDiv.id = "loadingDiv";
    this._loadingDiv.style.pointerEvents = "none";

    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
    .boxParent {
            margin: 0;
            padding: 0;
            height: 300px;
        }
        
        .box {
            width: 160px;
            height: 160px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            overflow: hidden;
        }
        
        .box .b {
            border-radius: 50%;
            border-left: 4px solid;
            border-right: 4px solid;
            border-top: 4px solid transparent !important;
            border-bottom: 4px solid transparent !important;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: ro 2s infinite;
        }
        
        .box .b1 {
            border-color: #4A69BD;
            width: 80px;
            height: 80px;
        }
        
        .box .b2 {
            border-color: #F6B93B;
            width: 60px;
            height: 60px;
            animation-delay: 0.2s;
        }
        
        .box .b3 {
            border-color: #2ECC71;
            width: 40px;
            height: 40px;
            animation-delay: 0.4s;
        }
        
        .box .b4 {
            border-color: #34495E;
            width: 20px;
            height: 20px;
            animation-delay: 0.6s;
        }
        
        @keyframes ro {
            0% {
                transform: translate(-50%, -50%) rotate(0deg);
            }
        
            50% {
                transform: translate(-50%, -50%) rotate(-180deg);
            }
        
            100% {
                transform: translate(-50%, -50%) rotate(0deg);
            }
        }
    `;
    document.getElementsByTagName('head')[0].appendChild(style);

    let boxParentDiv = document.createElement("div");
    boxParentDiv.className = "boxParent";
    let boxDiv = document.createElement("div");
    boxDiv.className = "box";
    let boxB1Div = document.createElement("div");
    boxB1Div.className = "b b1";
    let boxB2Div = document.createElement("div");
    boxB2Div.className = "b b2";
    let boxB3Div = document.createElement("div");
    boxB3Div.className = "b b3";
    let boxB4Div = document.createElement("div");
    boxB4Div.className = "b b4";

    boxDiv.appendChild(boxB1Div);
    boxDiv.appendChild(boxB2Div);
    boxDiv.appendChild(boxB3Div);
    boxDiv.appendChild(boxB4Div);
    boxParentDiv.appendChild(boxDiv);

    this._loadingDiv.appendChild(boxParentDiv)

    this._resizeLoadingUI();
    window.addEventListener("resize", this._resizeLoadingUI);
    document.body.appendChild(this._loadingDiv);
};

BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function() {
    document.getElementById("loadingDiv").style.display = "none";
}

class Drawing3D extends Component {
    componentDidMount = async() => {
        this.engine = new BABYLON.Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
        this.engine.enableOfflineSupport = true;

        scene = new BABYLON.Scene(this.engine);
        scene.clearColor = new BABYLON.Color3(0.31, 0.48, 0.64); //new BABYLON.Color3(1, 1, 1);
        scene.useRightHandedSystem = true;
      
        new BABYLON.HemisphericLight("upper-hemis-light", new BABYLON.Vector3(0, 0, 3000), scene);
        //new BABYLON.HemisphericLight("lower-hemis-light", new BABYLON.Vector3(0, 0, -3000), scene);
        //new BABYLON.HemisphericLight("upper-hemis-light", new BABYLON.Vector3(0, 10, -5), scene);

        camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 100, new BABYLON.Vector3(0, 0, 0), scene);

        camera.setPosition(new BABYLON.Vector3(950, -900 - 200, 1800));
        camera.attachControl(this.canvas, true);
        //camera.noRotationConstraint=true;
        camera.upVector = new BABYLON.Vector3(0, 0, 1);

        camera.panningSensibility = 10;

        // // // to fix camera not rotate
        // camera.lowerAlphaLimit = 0;
        // camera.upperAlphaLimit = 2*Math.PI;
        // camera.lowerBetaLimit = 0;
        // camera.upperBetaLimit = Math.PI;
        
        // camera.lowerRadiusLimit = 10;
        // camera.upperRadiusLimit = 3000;

        // camera.alpha = Math.PI/2;
        camera.pinchPrecision = 1;
        camera.wheelPrecision = 0.1;
        camera.maxZ = 25000;
        camera.setTarget(new BABYLON.Vector3(SHED_BUILDING_INFORMATION.span/2, SHED_BUILDING_INFORMATION.length/2, 0));

        this.initialize();
        this.showAxis(500);
        //this.generateUI();

        //this.handleSelectedMesh();
        // this.addHighLightMesh();

        //*** */ resize engine when dimension of canvas change
        const resizeObserver = new ResizeObserver((entries) => {
            for(let entry of entries) {
                if(entry.contentBoxSize) {
                    if(entry.contentBoxSize[0]) {
                        this.engine.resize();
                    }
                }
            }
        });

        resizeObserver.observe(document.querySelector('canvas'));

        // // /* Drag Drop */
        //this.determineCurrentPlaneDirection();
        //this.determineWallFaceToCamera();
        //this.dragDropComponents();
        // this.dragDropCanvas();
        // this.handleDeleteDragComponentByKeypad();

        //this.initSkyLightAndVentilationFan({ventilationDiameter: 200});
        //this.initFootingPlanLabels();

        // scene.debugLayer.show({
        //    embedMode: true
        // });

        // //**** measure time when load
        //this.engine.displayLoadingUI();

        // setTimeout(() => {
        //     let begin = moment(new Date());
            this.renderFrameSheds();
            //this.renderSheetingSheds();
        //     this.createShedNodes();

        //     let end = moment(new Date());
        //     let t = end.diff(begin, "milliseconds");
        //     this.engine.hideLoadingUI();
        //    // measureLoadingShedText.text = "BASIC - Total load time: " + t + " (ms)";
        // }, 1000);

        // let divBody =  document.getElementById("drawing3D");
        // divBody.appendChild(statsFPS.dom);

        furnitureComponents = new FurnitureComponents(this.props, this.canvas, camera, scene, this.engine);

        // // test cut 2 rectangle overlap
        // let rectanglePBCoordinates = [];

        // rectanglePBCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        // rectanglePBCoordinates[1] = new BABYLON.Vector3(
        //     rectanglePBCoordinates[0].x + 1000, 
        //     rectanglePBCoordinates[0].y, 
        //     rectanglePBCoordinates[0].z
        // );

        // rectanglePBCoordinates[2] = new BABYLON.Vector3(
        //     rectanglePBCoordinates[1].x, 
        //     rectanglePBCoordinates[1].y + 500, 
        //     rectanglePBCoordinates[1].z
        // );

        // rectanglePBCoordinates[3] = new BABYLON.Vector3(
        //     rectanglePBCoordinates[2].x - 1000, 
        //     rectanglePBCoordinates[2].y, 
        //     rectanglePBCoordinates[2].z
        // );

        // let rectanglePBMeshBuilder = new BABYLON.PolygonMeshBuilder("rectanglePB", rectanglePBCoordinates, scene, earcut);    
        // let rectanglePBMesh = rectanglePBMeshBuilder.build(true, 1);

        // let plasterBoardMat = new BABYLON.StandardMaterial("plasterBoardMat", scene);
        // plasterBoardMat.diffuseColor = new BABYLON.Color3.Green();
        // plasterBoardMat.backFaceCulling = false;

        // // tiếp theo chúng ta sẽ tạo những ô hình chữ nhật để cắt
        // let rectanglePBCSG = BABYLON.CSG.FromMesh(rectanglePBMesh);

        // // Door 1
        // let doorPanel1Coordinates = [];

        // doorPanel1Coordinates[0] = new BABYLON.Vector3(0, 0, 0);
        // doorPanel1Coordinates[1] = new BABYLON.Vector3(
        //     doorPanel1Coordinates[0].x + 100, 
        //     doorPanel1Coordinates[0].y, 
        //     doorPanel1Coordinates[0].z
        // );
        // doorPanel1Coordinates[2] = new BABYLON.Vector3(
        //     doorPanel1Coordinates[1].x, 
        //     doorPanel1Coordinates[1].y + 300, 
        //     doorPanel1Coordinates[1].z
        // );
        // doorPanel1Coordinates[3] = new BABYLON.Vector3(
        //     doorPanel1Coordinates[2].x - 100, 
        //     doorPanel1Coordinates[2].y, 
        //     doorPanel1Coordinates[2].z
        // );

        // let doorPanel1MeshBuilder = new BABYLON.PolygonMeshBuilder("doorPanel1", doorPanel1Coordinates, scene, earcut);    
        // let doorPanel1 = doorPanel1MeshBuilder.build(true, 100);
        // doorPanel1.position.x = 200;
        // doorPanel1.setPivotMatrix(BABYLON.Matrix.Translation(0, 100/2, 0), false)

        // // Door 2
        // let doorPanel2Coordinates = [];

        // doorPanel2Coordinates[0] = new BABYLON.Vector3(0, 0, 0);
        // doorPanel2Coordinates[1] = new BABYLON.Vector3(
        //     doorPanel2Coordinates[0].x + 300, 
        //     doorPanel2Coordinates[0].y, 
        //     doorPanel2Coordinates[0].z
        // );
        // doorPanel2Coordinates[2] = new BABYLON.Vector3(
        //     doorPanel2Coordinates[1].x, 
        //     doorPanel2Coordinates[1].y + 100, 
        //     doorPanel2Coordinates[1].z
        // );
        // doorPanel2Coordinates[3] = new BABYLON.Vector3(
        //     doorPanel2Coordinates[2].x - 300, 
        //     doorPanel2Coordinates[2].y, 
        //     doorPanel2Coordinates[2].z
        // );

        // let doorPanel2MeshBuilder = new BABYLON.PolygonMeshBuilder("doorPanel2", doorPanel2Coordinates, scene, earcut);    
        // let doorPanel2 = doorPanel2MeshBuilder.build(true, 100);
        // doorPanel2.position.x = 250;
        // doorPanel2.position.z += 100;
        // doorPanel2.setPivotMatrix(BABYLON.Matrix.Translation(0, 100/2, 0), false)


        // let doorMesh1CSG = BABYLON.CSG.FromMesh(doorPanel1);
        // let doorMesh2CSG = BABYLON.CSG.FromMesh(doorPanel2);

        // rectanglePBCSG = rectanglePBCSG.subtract(doorMesh1CSG);
        // rectanglePBCSG = rectanglePBCSG.subtract(doorMesh2CSG);

        // doorPanel1.dispose();
        // doorPanel2.dispose();

        // // chuyển CSG tới Mesh
        // let plasterBoard = rectanglePBCSG.toMesh("plasterBoard", plasterBoardMat, scene, false);
        // rectanglePBMesh.dispose();


        this.engine.runRenderLoop(() => {
            scene.render();
        });
    }

    initialize() {
        if(!highLightLayer) {
            highLightLayer = new BABYLON.HighlightLayer("hl", scene);
        }
    }

    // attachPointerDragBehaviorForVentilationFan = (mesh) => {
    //     let pointerDragBehavior = new BABYLON.PointerDragBehavior({dragPlaneNormal: new BABYLON.Vector3(0, 0, 1)});
    //     pointerDragBehavior.moveAttached = false;
    //     pointerDragBehavior.useObjectOrientationForDragging = false;

    //     pointerDragBehavior.onDragStartObservable.add((evt) => {
    //         currentPointerDragMesh = mesh;

    //         // add highLightLayer when drag
    //         if(highLightLayer) {
    //             highLightLayer.addMesh(currentPointerDragMesh, new BABYLON.Color3.FromHexString(VALID_HIGHLIGHT_COLOR))
    //         }
    //     });

    //     pointerDragBehavior.onDragObservable.add((evt) => {
    //         mesh.position.x += 0.7*evt.delta.x;
    //         mesh.position.y += 0.7*evt.delta.y;

    //         if(sphereOnSkyMesh.position.x < minRoofX) {
    //             mesh.position.x = minRoofX;
    //         }

    //         if(sphereOnSkyMesh.position.y < minRoofY) {
    //             mesh.position.y = minRoofY;
    //         }

    //         if(sphereOnSkyMesh.position.x > maxRoofX) {
    //             mesh.position.x = maxRoofX;
    //         }

    //         if(sphereOnSkyMesh.position.y > maxRoofY) {
    //             mesh.position.y = maxRoofY;
    //         }

    //         // update for sphereOnSkyMesh
    //         sphereOnSkyMesh.position.x = mesh.position.x;
    //         sphereOnSkyMesh.position.y = mesh.position.y;

    //         // check interect with other ventilation
    //         if(ventilationFanMeshes.length >= 2) {
    //             let filterVentilationFanMeshes = ventilationFanMeshes.filter(item => item.name !== currentPointerDragMesh.name);
    //             let isIntersect = this.checkIntersectWithOtherMeshes(currentPointerDragMesh, filterVentilationFanMeshes);

    //             if(isIntersect) {
    //                 highLightLayer.effectName = INVALID_LOCATE_POSITION;
    //                 highLightLayer.removeMesh(currentPointerDragMesh);
    //                 highLightLayer.addMesh(currentPointerDragMesh, new BABYLON.Color3.FromHexString(INVALID_HIGHLIGHT_COLOR));
    //             } else {
    //                 highLightLayer.effectName = VALID_LOCATE_POSITION;
    //                 highLightLayer.removeMesh(currentPointerDragMesh);
    //                 highLightLayer.addMesh(currentPointerDragMesh, new BABYLON.Color3.FromHexString(VALID_HIGHLIGHT_COLOR));
    //             }
    //         }
    //     });

    //     pointerDragBehavior.onDragEndObservable.add((evt) => {
    //         if(highLightLayer.effectName === VALID_LOCATE_POSITION) {
    //             highLightLayer.removeMesh(currentPointerDragMesh);
    //         }
    //     });

    //     mesh.addBehavior(pointerDragBehavior);
    // }

    attachBracket = (parentMesh, bracket) => {
        let bracketMesh = bracketSampleMesh.clone("bracket-mesh");
        bracketMesh.enableEdgesRendering();
        bracketMesh.edgesWidth = 20.0;
        bracketMesh.edgesColor = new BABYLON.Color4(1, 0, 0, 1);
        bracketMesh.setEnabled(true);

        let bracketMeshBoundingBoxMin = bracketMesh.getBoundingInfo().boundingBox.minimumWorld;
        let bracketMeshBoundingBoxMax = bracketMesh.getBoundingInfo().boundingBox.maximumWorld;

        let parentMeshBoundingBoxMin = parentMesh.getBoundingInfo().boundingBox.minimumWorld;
        let parentMeshBoundingBoxMax = parentMesh.getBoundingInfo().boundingBox.maximumWorld;

        // Bracket locate in Top Mesh
        if(bracket.position === "TOP") {
            bracketMesh.position.x = (bracketMeshBoundingBoxMax.x - bracketMeshBoundingBoxMin.x)/1.5 -(parentMeshBoundingBoxMax.x - parentMeshBoundingBoxMin.x)/2;
            bracketMesh.position.y += 0.48*(parentMeshBoundingBoxMax.y - parentMeshBoundingBoxMin.y);
            bracketMesh.position.z += parentMeshBoundingBoxMax.z - Math.abs(bracketMeshBoundingBoxMax.z - bracketMeshBoundingBoxMin.z);
    
            bracketMesh.parent = parentMesh;
        }

        // Bracket locate in Bottom Mesh
        if(bracket.position === "BOTTOM") {
            bracketMesh.position.x = (bracketMeshBoundingBoxMax.x - bracketMeshBoundingBoxMin.x)/1.5 -(parentMeshBoundingBoxMax.x - parentMeshBoundingBoxMin.x)/2;
            bracketMesh.position.y += 0.48*(parentMeshBoundingBoxMax.y - parentMeshBoundingBoxMin.y);

            bracketMesh.parent = parentMesh;
        }
    }

    // determineWallFaceToCamera = () => {
    //     //****** initialize sphere face to camera when camera move
    //     sphereFaceCamera = BABYLON.MeshBuilder.CreateSphere("sphere-drag", {segments: 16, diameter: 50}, scene);
    //     sphereFaceCamera.material = new BABYLON.StandardMaterial("sphere-mat", scene);
    //     sphereFaceCamera.material.diffuseColor = new BABYLON.Color3.Red();
    //     sphereFaceCamera.material.backFaceCulling = false;

    //     let ray = new BABYLON.Ray();
    //     let rayHelper = new BABYLON.RayHelper(ray);
    //     let localMeshDirection = new BABYLON.Vector3(1, 0, 0);
    //     let localMeshOrigin = new BABYLON.Vector3(0, 0, 0);
    //     let length = 50;

    //     rayHelper.attachToMesh(sphereFaceCamera, localMeshDirection, localMeshOrigin, length);
    //     rayHelper.show(scene);

    //     scene.registerBeforeRender(function() {
    //         if(currentPlaneDirection !== lastPlaneDirection) {
    //             switch (currentPlaneDirection) {
    //                 case FRONT_PLANE_DIRECTION:
    //                     lastWallIndexWhenParallelSphereCamera = -1;
    //                     localMeshDirection = new BABYLON.Vector3(0, 1, 0);
    //                     break;
                
    //                 case BACK_PLANE_DIRECTION:
    //                     lastWallIndexWhenParallelSphereCamera = -1;
    //                     localMeshDirection = new BABYLON.Vector3(0, -1, 0);
    //                     break;

    //                 case LEFT_PLANE_DIRECTION:
    //                     lastWallIndexWhenParallelSphereCamera = -1;
    //                     localMeshDirection = new BABYLON.Vector3(1, 0, 0);
    //                     break;

    //                 case RIGHT_PLANE_DIRECTION:
    //                     lastWallIndexWhenParallelSphereCamera = -1;
    //                     localMeshDirection = new BABYLON.Vector3(-1, 0, 0);
    //                     break;

    //                 default:
    //                     break;
    //             }
    //             rayHelper.detachFromMesh();
    //             rayHelper.attachToMesh(sphereFaceCamera, localMeshDirection, localMeshOrigin, length);
    //             rayHelper.show(scene);
    //         }

    //         let hitInfo = ray.intersectsMeshes([
    //             ...frontEWSMeshes, ...backEWSMeshes, ...leftSWSMeshes, ...rightSWSMeshes
    //         ]);
            
    //         if(hitInfo.length) {
    //             currentWallActive = hitInfo[0].pickedMesh;
    //         } else {
    //             currentWallActive = null;
    //         }

    //         let cameraForwardDirection = scene.activeCamera.getForwardRay().direction;
    //         let angleX = BABYLON.Vector3.Dot(cameraForwardDirection, new BABYLON.Vector3(1, 0, 0));
    //         let angleY = BABYLON.Vector3.Dot(cameraForwardDirection, new BABYLON.Vector3(0, 1, 0));

    //         if(angleX < Math.PI/6 && angleX > -Math.PI/6) {
    //             lastPlaneDirection = currentPlaneDirection;
    //             currentPlaneDirection = angleY > 0 ? FRONT_PLANE_DIRECTION : BACK_PLANE_DIRECTION;
    //         } else if(angleY < Math.PI/6 && angleY > -Math.PI/6) {
    //             lastPlaneDirection = currentPlaneDirection;
    //             currentPlaneDirection = angleX > 0 ? LEFT_PLANE_DIRECTION : RIGHT_PLANE_DIRECTION;
    //         }

    //         if(currentPlaneDirection !== lastPlaneDirection) {
    //             for(let i = 0; i < footingPlanLabelMeshes.length; i++) {
    //                 switch(currentPlaneDirection) {
    //                     case FRONT_PLANE_DIRECTION:
    //                         footingPlanLabelMeshes[i].rotation.z = 0;
    //                         break;

    //                     case BACK_PLANE_DIRECTION:
    //                         footingPlanLabelMeshes[i].rotation.z = Math.PI;
    //                         break;

    //                     case LEFT_PLANE_DIRECTION:
    //                         footingPlanLabelMeshes[i].rotation.z = -Math.PI/2;
    //                         break;

    //                     case RIGHT_PLANE_DIRECTION:
    //                         footingPlanLabelMeshes[i].rotation.z = Math.PI/2;
    //                         break;
    //                 }
    //             }
    //         }
    //     });
    // }

    // determineCurrentPlaneDirection = () => {
    //     const {span, length, height} = SHED_BUILDING_INFORMATION;
    //     let lastPlaneDirectionName = "";

    //     /* create object to detect current direction (when camera rotate) */
    //     let centerPoint = BABYLON.MeshBuilder.CreateBox("center-point", {height: 5, width: 5, depth: 5}, scene);
    //     centerPoint.position = new BABYLON.Vector3(span/2, length/2, 20);
    //     centerPoint.isPickable = false;

    //     // 4 Planes for 4 direction
    //     let frontPlaneMesh = BABYLON.MeshBuilder.CreatePlane(FRONT_PLANE_DIRECTION, {width: 3/4*span, height, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
    //     frontPlaneMesh.rotation.x = Math.PI/2;
    //     frontPlaneMesh.position = new BABYLON.Vector3(span/2, length/8, height/2);
  
    //     let backPlaneMesh = frontPlaneMesh.clone(BACK_PLANE_DIRECTION);
    //     backPlaneMesh.position = new BABYLON.Vector3(span/2, 7/8*length, height/2);

    //     let leftPlaneMesh = BABYLON.MeshBuilder.CreatePlane(LEFT_PLANE_DIRECTION, {width: 3/4*length, height, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
    //     leftPlaneMesh.rotation.y = Math.PI/2;
    //     leftPlaneMesh.rotation.z = Math.PI/2;
    //     leftPlaneMesh.position = new BABYLON.Vector3(span/8, length/2, height/2);
      
    //     let rightPlaneMesh = leftPlaneMesh.clone(RIGHT_PLANE_DIRECTION);
    //     rightPlaneMesh.position = new BABYLON.Vector3(7/8*span, length/2, height/2);

    //     // hidden material
    //     let hiddenMat = new BABYLON.StandardMaterial("hidden-mat");
    //     hiddenMat.backFaceCulling = false;
    //     hiddenMat.alpha = 0;

    //     centerPoint.material = hiddenMat;
    //     frontPlaneMesh.material = hiddenMat;
    //     backPlaneMesh.material = hiddenMat;
    //     leftPlaneMesh.material = hiddenMat;
    //     rightPlaneMesh.material = hiddenMat;

    //     function ray() {
    //         let tar = camera.getFrontPosition(10);
    //         let r = new BABYLON.Ray(centerPoint.position, new BABYLON.Vector3(tar.x, tar.y, 20), 1000);
    //         return scene.pickWithRay(r);
    //     }

    //     scene.registerBeforeRender(() => {
    //         let res = ray();
    //         if(res.hit) {
    //             let directionName = res.pickedMesh.name;
    //             if(directionName !== lastPlaneDirectionName) {
    //                 currentPlaneDirection = directionName;
    //                 lastPlaneDirectionName = directionName;

    //                 /* Only enable drag for components in same plane direction */
    //                 let disableDragRollerDoorMeshes = rollerDoorMeshes.filter(item => item.currentPlaneDirection !== currentPlaneDirection);
    //                 let disableDragAccessDoorMeshes = accessDoorMeshes.filter(item => item.currentPlaneDirection !== currentPlaneDirection);
    //                 let disableDragWindowMeshes = windowMeshes.filter(item => item.currentPlaneDirection !== currentPlaneDirection);
                    
    //                 for(let i = 0; i < disableDragRollerDoorMeshes.length; i++) {
    //                     if(disableDragRollerDoorMeshes[i].pointerDragBehavior) {
    //                         disableDragRollerDoorMeshes[i].pointerDragBehavior.enabled = false;
    //                     }
    //                 }

    //                 for(let i = 0; i < disableDragAccessDoorMeshes.length; i++) {
    //                     if(disableDragAccessDoorMeshes[i].pointerDragBehavior) {
    //                         disableDragAccessDoorMeshes[i].pointerDragBehavior.enabled = false;
    //                     }
    //                 }

    //                 for(let i = 0; i < disableDragWindowMeshes.length; i++) {
    //                     if(disableDragWindowMeshes[i].pointerDragBehavior) {
    //                         disableDragWindowMeshes[i].pointerDragBehavior.enabled = false;
    //                     }
    //                 }

    //                 let enableDragRollerDoorMeshes = rollerDoorMeshes.filter(item => item.currentPlaneDirection === currentPlaneDirection);
    //                 let enableDragAccessDoorMeshes = accessDoorMeshes.filter(item => item.currentPlaneDirection === currentPlaneDirection);
    //                 let enableDragWindowMeshes = windowMeshes.filter(item => item.currentPlaneDirection === currentPlaneDirection);
                    
    //                 for(let i = 0; i < enableDragRollerDoorMeshes.length; i++) {
    //                     if(enableDragRollerDoorMeshes[i].pointerDragBehavior) {
    //                         enableDragRollerDoorMeshes[i].pointerDragBehavior.enabled = true;
    //                     }
    //                 }

    //                 for(let i = 0; i < enableDragAccessDoorMeshes.length; i++) {
    //                     if(enableDragAccessDoorMeshes[i].pointerDragBehavior) {
    //                         enableDragAccessDoorMeshes[i].pointerDragBehavior.enabled = true;
    //                     }
    //                 }

    //                 for(let i = 0; i < enableDragWindowMeshes.length; i++) {
    //                     if(enableDragWindowMeshes[i].pointerDragBehavior) {
    //                         enableDragWindowMeshes[i].pointerDragBehavior.enabled = true;
    //                     }
    //                 }
    //             }
    //         }
    //     });
    // }

    initSkyLightAndVentilationFan = async(params) => {
        const {ventilationDiameter} = params;

        sphereOnSkyMesh = BABYLON.MeshBuilder.CreateSphere("sphere-on-sky-mesh", {segments: 16, diameter: 50}, scene);
        sphereOnSkyMesh.material = new BABYLON.StandardMaterial("sphere-on-sky-mat", scene);
        sphereOnSkyMesh.material.diffuseColor = new BABYLON.Color3.Red();
        sphereOnSkyMesh.material.backFaceCulling = false;
        sphereOnSkyMesh.position.z = 3000;

        if(!highLightLayer) {
            highLightLayer = new BABYLON.HighlightLayer("hl", scene);
        }

        BABYLON.SceneLoader.ImportMesh("", "/assets/", "ventilation.obj", scene, function(newMeshes) {
            ventilationFanMeshSample = BABYLON.Mesh.MergeMeshes(newMeshes, true, true, undefined, false, true);
            ventilationFanMeshSample.rotation.x = Math.PI/2;
            ventilationFanMeshSample.name = "ventilation-fan-sample";

            ventilationFanMeshSample.material = new BABYLON.StandardMaterial("ventilation-fan-mat", scene);;
            ventilationFanMeshSample.material.diffuseColor = BABYLON.Color3.FromHexString("#bdbdbd");
            ventilationFanMeshSample.material.backFaceCulling = false;
            
            const ratio = ventilationDiameter/VENTILATION_DIAMETER;

            ventilationFanMeshSample.scaling.copyFromFloats(ratio, ratio, ratio);
            ventilationFanMeshSample.setEnabled(false);
        });

        let ray = new BABYLON.Ray();
        rayHelper = new BABYLON.RayHelper(ray);
        let localMeshDirection = new BABYLON.Vector3(0, 0, -1);
        let localMeshOrigin = new BABYLON.Vector3(0, 0, 0);
        let length = 6000;

        rayHelper.attachToMesh(sphereOnSkyMesh, localMeshDirection, localMeshOrigin, length);
        //rayHelper.show(scene);

        scene.registerBeforeRender(function() {
            let hitInfo = ray.intersectsMeshes([...roofSheetingMeshes]);

            if(hitInfo.length) {
                let _pickedPoint = hitInfo[0].pickedPoint;
                let _pickedMesh  = hitInfo[0].pickedMesh;

                if(currentPointerDragMesh && (currentPointerDragMesh.name.indexOf("sky-light") !== -1 || currentPointerDragMesh.name.indexOf("ventilation-fan") !== -1)) {
                    if(lastPointerDragHoverRoofName !== _pickedMesh.name) {
                        //*** change rotation of mesh if drag from roof to another roof

                        currentPointerDragMesh.position.z = _pickedMesh.position.z;

                        currentPointerDragMesh.rotation.x = _pickedMesh.rotation.x;
                        currentPointerDragMesh.rotation.y = _pickedMesh.rotation.y;
                        currentPointerDragMesh.rotation.z = _pickedMesh.rotation.z;

                        lastPointerDragHoverRoofName = _pickedMesh.name;
                    }
                }

                if(currentPointerDragMesh && currentPointerDragMesh.name.indexOf("ventilation-fan") !== -1) {
                    currentPointerDragMesh.position.z = _pickedPoint.z;
                    currentPointerDragMesh.setEnabled(true);
                }
            }

            //*** animation ventilation fans rotate
            for(let i = 0; i < ventilationFanMeshes.length; i++) {
                ventilationFanMeshes[i].rotate(BABYLON.Axis.Z, 0.01, BABYLON.Space.WORLD);
            }
        });
    }

    // initFootingPlanLabels = () => {
    //     let createNewFootingFlanLabes = (text, textColor = "#EFEFEF") => {
    //         let planeWidth = 100;
    //         let planeHeight = 100;
    //         let DTWidth = planeWidth*0.6;
    //         let DTHeight = planeHeight*0.6;
    
    //         let plane = BABYLON.MeshBuilder.CreatePlane("plane-text", {width: planeWidth, height: planeHeight}, scene);
    //         //plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
    
    //         let dynamicTexture = new BABYLON.DynamicTexture("dynamic texture", {width: DTWidth, height: DTHeight}, scene);   
    //         dynamicTexture.hasAlpha = true;
            
    //         let mat = new BABYLON.StandardMaterial("Mat", scene);    				
    //         mat.diffuseTexture = dynamicTexture;
    //         mat.backFaceCulling = false;
            
    //         dynamicTexture.drawText(text, 20, 60, "50px Arial", textColor, "transparent", true, true);
    
    //         plane.material = mat;
    //         return plane;
    //     }

    //     FOOTING_PLAN_SECTION_LABELS.map(item => {
    //         let newFPLMesh = createNewFootingFlanLabes(item.text);
    //         newFPLMesh.position.x = item.position.x;
    //         newFPLMesh.position.y = item.position.y;
    //         newFPLMesh.position.z = item.position.z;

    //         footingPlanLabelMeshes.push(newFPLMesh);
    //     });
    // }
    
    dragDropComponents = () => {
        // let rollerDoorImg = document.getElementById("roller-door-img");
        // let accessDoorImg = document.getElementById("access-door-img");
        // let windowImg = document.getElementById("window-img");
        let skyLightImg = document.getElementById("sky-light-img");
        let ventilationFanImg = document.getElementById("ventilation-fan-img");

        let hiddenImgClone = skyLightImg.cloneNode(true);
        hiddenImgClone.style.visibility = "hidden";
        hiddenImgClone.style.position = "absolute"; 
        hiddenImgClone.style.top = "0px"; 
        hiddenImgClone.style.right = "0px";
        document.body.appendChild(hiddenImgClone);

        let handleDragComponent = (evt) => {
            if(evt.target.id === "roller-door-img") {
                let {width, height, rotation, hasRollerDoor} = SHED_BUILDING_INFORMATION.rollerDoors[0];
                let W1 = 20, W2 = 20, W3 = 20, thickness = 2;
                let numRollerDoorMesh = rollerDoorMeshes.length;
                let name = "roller-door-" + numRollerDoorMesh++;

                newDragMesh = DoorLibrary.RollerDoor(name, {width, height, W1, W2, W3, thickness, rotation, hasRollerDoor}, scene);
                newDragMesh.initDimension = {width: width + W1 + W2, height: height + W3};
                newDragMesh.setEnabled(false);
               // newDragMesh.pointerDragBehavior = this.attachOwnPointerDragBehavior(newDragMesh);
                rollerDoorMeshes.push(newDragMesh);
            } 
            // else if(evt.target.id === "access-door-img") {
            //     let {width, height, rotation} = SHED_BUILDING_INFORMATION.accessDoors[0];      
            //     let W1 = 20, W2 = 20, thickness = 2;
            //     let numAccessDoorMesh = accessDoorMeshes.length;
            //     let name = "access-door-" + numAccessDoorMesh++;

            //     newDragMesh = DoorLibrary.AccessDoor(name, {width, height, W1, W2, thickness, sideRailColor: "#332784", topRailColor: "#A82B2F", rotation}, scene);
            //     newDragMesh.initDimension = {width: width + 2*W1, height: height + W1};
            //     newDragMesh.setEnabled(false);
            //     newDragMesh.pointerDragBehavior = this.attachOwnPointerDragBehavior(newDragMesh);

            //     accessDoorMeshes.push(newDragMesh);
            // }
            // else if(evt.target.id === "window-img") {
            //     let {width, height, thickness, t, rotation} = SHED_BUILDING_INFORMATION.windows[0];
            //     let numWindowMesh = windowMeshes.length;
            //     let name = "window-" + numWindowMesh++;

            //     newDragMesh = WindowLibrary.Window(name, {width, height, thickness, t, rotation}, scene);
            //     newDragMesh.initDimension = {width, height};
            //     newDragMesh.setEnabled(false);
            //     newDragMesh.pointerDragBehavior = this.attachOwnPointerDragBehavior(newDragMesh);

            //     windowMeshes.push(newDragMesh);
            // }
            else if(evt.target.id === "sky-light-img") {
                newDragMesh = RoofLibrary.SkyLightMesh("sky-light", {width: (18000/20)/10, height: 9647/10, thickness: 5, t: 8,}, scene);
                newDragMesh.name = "sky-light-" + skyLightMeshes.length;
                newDragMesh.rotation = {x: 0, y: Math.PI/2, z: Math.PI/2};

                newDragMesh.initDimension = {width: (18000/20)/10, height: 9647/10};
                newDragMesh.isPickable = false;

               // this.getBoundaryRoofMeshes();
               // this.attachPointerDragBehaviorForSkyLight(newDragMesh);
                //this.createNewHighLightMeshInDragMode(newDragMesh);

                skyLightMeshes.push({mesh: newDragMesh, roofMeshIndex: -1});
                currentPointerDragMesh = null;
            } else if(evt.target.id === "ventilation-fan-img") {
                newDragMesh = ventilationFanMeshSample.clone("ventilation-fan-" + ventilationFanMeshes.length);
                newDragMesh.isPickable = false;

                //this.getBoundaryRoofMeshes();
                //this.attachPointerDragBehaviorForVentilationFan(newDragMesh);

                ventilationFanMeshes.push(newDragMesh);
                currentPointerDragMesh = null;
            }

            // if(evt.target.id === "roller-door-img" || evt.target.id === "access-door-img" || evt.target.id === "window-img") {
            //     if(currentPlaneDirection === FRONT_PLANE_DIRECTION) {
            //         newDragMesh.rotation.z = 0;
            //     } else if(currentPlaneDirection === BACK_PLANE_DIRECTION) {
            //         newDragMesh.rotation.z = Math.PI;
            //     } else if(currentPlaneDirection === LEFT_PLANE_DIRECTION) {
            //         newDragMesh.rotation.z = -Math.PI/2;
            //     } else if(currentPlaneDirection === RIGHT_PLANE_DIRECTION) {
            //         newDragMesh.rotation.z = Math.PI/2;
            //     }

            //     this.createNewHighLightMeshInDragMode(newDragMesh);
            // }

            // if(!(frontEWInDragMode || backEWInDragMode || leftSWInDragMode || rightSWInDragMode)) {
            //     /* replace current purlin girt, wall with new drag mode */
            //     for(let i = 0; i < sideWallGirtMeshes.length; i++) {
            //         sideWallGirtMeshes[i].dispose();
            //     }
            //     sideWallGirtMeshes = [];

            //     for(let i = 0; i < endWallGirtMeshes.length; i++) {
            //         endWallGirtMeshes[i].dispose();
            //     }
            //     endWallGirtMeshes = [];

            //     for(let i = 0; i < endWallSheetingMeshes.length; i++) {
            //         endWallSheetingMeshes[i].dispose();
            //     } 
            //     endWallSheetingMeshes = [];

            //     for(let i = 0; i < sideWallSheetingMeshes.length; i++) {
            //         sideWallSheetingMeshes[i].dispose();
            //     }
            //     sideWallSheetingMeshes = [];

            //     // add drag drop for current components
            //     for(let i = 0; i < rollerDoorMeshes.length; i++) {
            //         rollerDoorMeshes[i].pointerDragBehavior = this.attachOwnPointerDragBehavior(rollerDoorMeshes[i]);
            //     }

            //     for(let i = 0; i < accessDoorMeshes.length; i++) {
            //         accessDoorMeshes[i].pointerDragBehavior = this.attachOwnPointerDragBehavior(accessDoorMeshes[i]);
            //     }

            //     for(let i = 0; i < windowMeshes.length; i++) {
            //         windowMeshes[i].pointerDragBehavior = this.attachOwnPointerDragBehavior(windowMeshes[i]);
            //     }
              
            //     const {sideWallSheetingInDragMode, endWallSheetingInDragMode} = SHED_BUILDING_INFORMATION;

            //     this.createNewWallsInDragMode(FRONT_PLANE_DIRECTION, endWallSheetingInDragMode[0].holeCoordinates, ["roller-door-0", "main-door-0"]);
            //     this.createNewWallsInDragMode(BACK_PLANE_DIRECTION, endWallSheetingInDragMode[1].holeCoordinates, ["access-door-0"]);
            //     this.createNewWallsInDragMode(LEFT_PLANE_DIRECTION, sideWallSheetingInDragMode[0].holeCoordinates, ["window-0", "window-1"]);
            //     this.createNewWallsInDragMode(RIGHT_PLANE_DIRECTION, sideWallSheetingInDragMode[1].holeCoordinates, ["window-2", "window-3"]);
            // }

            evt.dataTransfer.setDragImage(hiddenImgClone, 0, 0);
        }

        // Events
        //rollerDoorImg.addEventListener('dragstart', handleDragComponent, false);
        // accessDoorImg.addEventListener('dragstart', handleDragComponent, false);
        // windowImg.addEventListener('dragstart', handleDragComponent, false);
        skyLightImg.addEventListener('dragstart', handleDragComponent, false);
        ventilationFanImg.addEventListener('dragstart', handleDragComponent, false);
    }

    // checkIntersectWithOtherMeshes = (mesh, meshes) => {
    //     for(let i = 0; i < meshes.length; i++) {
    //         // for sky light
    //         if(meshes[i].mesh) {
    //             if(meshes[i].mesh.intersectsMesh(mesh, false)) {
    //                 return true;
    //             }
    //         }
    //         // for ventilation 
    //         else {
    //             if(meshes[i].intersectsMesh(mesh, true)) {
    //                 return true;
    //             }
    //         }
    //     }

    //     return false;
    // }

    // dragDropCanvas = () => {
    //     let handleDragOver = (evt) => {
    //         evt.preventDefault();

    //         if(newDragMesh && (newDragMesh.name.indexOf("sky-light") !== -1 || newDragMesh.name.indexOf("ventilation-fan") !== -1)) {
    //             let pickResult = scene.pick(evt.offsetX, evt.offsetY);
      
    //             if(pickResult.hit) {
    //                 let pickedMesh = pickResult.pickedMesh;

    //                 if(pickedMesh.name.indexOf("roof-cladding") !== -1) {
    //                     if(pickedMesh.name !== lastHoverRoofName) {
    //                         newDragMesh.rotation.x = pickedMesh.rotation.x;
    //                         newDragMesh.rotation.y = pickedMesh.rotation.y;
    //                         newDragMesh.rotation.z = pickedMesh.rotation.z;

    //                         lastHoverRoofName = pickedMesh.name;
    //                     }

    //                     if(newDragMesh.name.indexOf("sky-light") !== -1) {
    //                         newDragMesh.position.x = pickedMesh.position.x;
    //                         newDragMesh.position.y = pickedMesh.position.y;
    //                         newDragMesh.position.z = pickedMesh.position.z;

    //                         //*** check if intersect with other sky light on roof
    //                         if(skyLightMeshes.length >= 2) {
    //                             let filterSkyLightMeshes = skyLightMeshes.filter(item => item.mesh.name !== newDragMesh.name);
    //                             let isIntersect = this.checkIntersectWithOtherMeshes(newDragMesh, filterSkyLightMeshes);
    //                             let findLastRoofIndex = roofSheetingMeshes.findIndex(item => item.name === lastHoverRoofName);

    //                             if(isIntersect && !findLastRoofIndex) {
    //                                 invalidHighLightMesh.setEnabled(true);
    //                                 validHighLightMesh.setEnabled(false);
    //                             } else {
    //                                 invalidHighLightMesh.setEnabled(false);
    //                                 validHighLightMesh.setEnabled(true);
    //                             }
    //                         } else {
    //                             invalidHighLightMesh.setEnabled(false);
    //                             validHighLightMesh.setEnabled(true);
    //                         }
    //                     } else if(newDragMesh.name.indexOf("ventilation-fan") !== -1) {
    //                         newDragMesh.position.x = pickResult.pickedPoint.x;
    //                         newDragMesh.position.y = pickResult.pickedPoint.y;
    //                         newDragMesh.position.z = pickResult.pickedPoint.z;

    //                         //*** check if intersect with other ventilation on roof
    //                         if(ventilationFanMeshes.length >= 2) {
    //                             let filterVentilationFanMeshes = ventilationFanMeshes.filter(item => item.name !== newDragMesh.name);
    //                             let isIntersect = this.checkIntersectWithOtherMeshes(newDragMesh, filterVentilationFanMeshes);
            
    //                             if(isIntersect) {
    //                                 highLightLayer.effectName = INVALID_LOCATE_POSITION;
    //                                 highLightLayer.removeMesh(newDragMesh);
    //                                 highLightLayer.addMesh(newDragMesh, new BABYLON.Color3.FromHexString(INVALID_HIGHLIGHT_COLOR));
    //                             } else {
    //                                 highLightLayer.effectName = VALID_LOCATE_POSITION;
    //                                 highLightLayer.removeMesh(newDragMesh);
    //                                 highLightLayer.addMesh(newDragMesh, new BABYLON.Color3.FromHexString(VALID_HIGHLIGHT_COLOR));
    //                             }
    //                         } else {
    //                             highLightLayer.effectName = VALID_LOCATE_POSITION;
    //                             highLightLayer.removeMesh(newDragMesh);
    //                             highLightLayer.addMesh(newDragMesh, BABYLON.Color3.FromHexString(VALID_HIGHLIGHT_COLOR));
    //                         }
    //                     }

    //                     newDragMesh.setEnabled(true);
    //                 } else {
    //                     if(pickedMesh.name !== newDragMesh.name) {
    //                         let target = BABYLON.Vector3.Unproject(
    //                             new BABYLON.Vector3(evt.offsetX, evt.offsetY, 0),
    //                             this.canvas.width,
    //                             this.canvas.height,
    //                             new BABYLON.Matrix.Identity(),
    //                             camera.getViewMatrix(),
    //                             camera.getProjectionMatrix()
    //                         );
            
    //                         target.x = camera.position.x - target.x;
    //                         target.y = camera.position.y - target.y;
    //                         target.z = camera.position.z - target.z;
            
    //                         let position = getPlaneAxisZVector(0.5*(minRoofZ + maxRoofZ), camera.position, target);
    //                         newDragMesh.position = new BABYLON.Vector3(position.x, position.y, position.z);  
    //                         newDragMesh.setEnabled(true);

    //                         if(newDragMesh.name.indexOf("sky-light") !== -1) {
    //                             if(invalidHighLightMesh)
    //                                 invalidHighLightMesh.setEnabled(true);
    //                             if(validHighLightMesh)
    //                                 validHighLightMesh.setEnabled(false);
    //                         } else if(newDragMesh.name.indexOf("ventilation-fan") !== -1) {
    //                             highLightLayer.effectName = INVALID_LOCATE_POSITION;
    //                             highLightLayer.removeMesh(newDragMesh);
    //                             highLightLayer.addMesh(newDragMesh, new BABYLON.Color3.FromHexString(INVALID_HIGHLIGHT_COLOR));
    //                         }
    //                     }
    //                 }
    //             }
    //         } else {
    //             // convert postion from Screen 2D -> 3D
    //             let target = BABYLON.Vector3.Unproject(
    //                 new BABYLON.Vector3(evt.offsetX, evt.offsetY, 0),
    //                 this.canvas.width,
    //                 this.canvas.height,
    //                 new BABYLON.Matrix.Identity(),
    //                 camera.getViewMatrix(),
    //                 camera.getProjectionMatrix()
    //             )

    //             target.x = camera.position.x - target.x;
    //             target.y = camera.position.y - target.y;
    //             target.z = camera.position.z - target.z;

    //             let position = getZeroPlaneVector(camera.position, target);
    //             sphereFaceCamera.position.copyFrom(position);
                
    //             // determine position of sphere when move camera
    //             if(currentPlaneDirection === FRONT_PLANE_DIRECTION) {
    //                 // *** find index of wall that when sphere move parallel it
    //                 let _index = 0;

    //                 for(let i = 0; i < frontEWSMeshes.length; i++) {
    //                     if(lastWallIndexWhenParallelSphereCamera !== -1) {
    //                         if(i !== lastWallIndexWhenParallelSphereCamera) continue;
    //                     }

    //                     let boundingBoxMin = frontEWSMeshes[i].getBoundingInfo().boundingBox.minimumWorld;
    //                     let boundingBoxMax = frontEWSMeshes[i].getBoundingInfo().boundingBox.maximumWorld;
                
    //                     if(sphereFaceCamera.position.x >= boundingBoxMin.x && sphereFaceCamera.position.x < boundingBoxMax.x) {
    //                         _index = i;
    //                         // *** store index when find wall parallel sphere camera
    //                         lastWallIndexWhenParallelSphereCamera = _index;
    //                         break;
    //                     } else {
    //                         lastWallIndexWhenParallelSphereCamera = -1;
    //                     }
    //                 }

    //                 sphereFaceCamera.position.y = frontEWSMeshes[_index].getFacetPosition(0).y - 20;
    //                 sphereFaceCamera.position.z = position.z > 0 ? position.z : 10;
    //             }

    //             if(currentPlaneDirection === BACK_PLANE_DIRECTION) {
    //                 let _index = 0;

    //                 for(let i = 0; i < backEWSMeshes.length; i++) {
    //                     if(lastWallIndexWhenParallelSphereCamera !== -1) {
    //                         if(i !== lastWallIndexWhenParallelSphereCamera) continue;
    //                     }

    //                     let boundingBoxMin = backEWSMeshes[i].getBoundingInfo().boundingBox.minimumWorld;
    //                     let boundingBoxMax = backEWSMeshes[i].getBoundingInfo().boundingBox.maximumWorld;
                
    //                     if(sphereFaceCamera.position.x >= boundingBoxMin.x && sphereFaceCamera.position.x < boundingBoxMax.x) {
    //                         _index = i;
    //                         lastWallIndexWhenParallelSphereCamera = _index;
    //                         break;
    //                     } else {
    //                         lastWallIndexWhenParallelSphereCamera = -1;
    //                     }
    //                 }

    //                 sphereFaceCamera.position.y = backEWSMeshes[_index].getFacetPosition(0).y + 20;
    //                 sphereFaceCamera.position.z = position.z > 0 ? position.z : 10;
    //             }

    //             if(currentPlaneDirection === LEFT_PLANE_DIRECTION) {
    //                 let _index = 0;

    //                 for(let i = 0; i < leftSWSMeshes.length; i++) {
    //                     if(lastWallIndexWhenParallelSphereCamera !== -1) {
    //                         if(i !== lastWallIndexWhenParallelSphereCamera) continue;
    //                     }

    //                     let boundingBoxMin = leftSWSMeshes[i].getBoundingInfo().boundingBox.minimumWorld;
    //                     let boundingBoxMax = leftSWSMeshes[i].getBoundingInfo().boundingBox.maximumWorld;

    //                     if(sphereFaceCamera.position.y >= boundingBoxMin.y && sphereFaceCamera.position.y < boundingBoxMax.y) {
    //                         _index = i;
    //                         lastWallIndexWhenParallelSphereCamera = _index;
    //                         break;
    //                     } else {
    //                         lastWallIndexWhenParallelSphereCamera = -1;
    //                     }
    //                 }

    //                 sphereFaceCamera.position.x = leftSWSMeshes[_index].getFacetPosition(0).x - 20;
    //                 sphereFaceCamera.position.z = position.z > 0 ? position.z : 10;
    //             }

    //             if(currentPlaneDirection === RIGHT_PLANE_DIRECTION) {
    //                 let _index = 0;

    //                 for(let i = 0; i < rightSWSMeshes.length; i++) {
    //                     if(lastWallIndexWhenParallelSphereCamera !== -1) {
    //                         if(i !== lastWallIndexWhenParallelSphereCamera) continue;
    //                     }

    //                     let boundingBoxMin = leftSWSMeshes[i].getBoundingInfo().boundingBox.minimumWorld;
    //                     let boundingBoxMax = leftSWSMeshes[i].getBoundingInfo().boundingBox.maximumWorld;

    //                     if(sphereFaceCamera.position.y >= boundingBoxMin.y && sphereFaceCamera.position.y < boundingBoxMax.y) {
    //                         _index = i;
    //                         lastWallIndexWhenParallelSphereCamera = _index;
    //                         break;
    //                     } else {
    //                         lastWallIndexWhenParallelSphereCamera = -1;
    //                     }
    //                 }

    //                 sphereFaceCamera.position.x = rightSWSMeshes[_index].getFacetPosition(0).x + 20;
    //                 sphereFaceCamera.position.z = position.z > 0 ? position.z : 10;
    //             }

    //             newDragMesh.position = position;  
    //             newDragMesh.setEnabled(true);

    //             let hasValid = this.checkValidPosition(newDragMesh);
    //             validHighLightMesh.setEnabled(true);
    //             // if(validHighLightMesh) {
    //             //     validHighLightMesh.setEnabled(hasValid);
    //             // }
    //             // if(invalidHighLightMesh) {
    //             //     invalidHighLightMesh.setEnabled(!hasValid);
    //             // }

    //             this.setHighLightWallsInDragMode(true);
    //         }
    //     }

    //     let handleDrop = (evt) => {
    //         evt.preventDefault();
             
    //         if(newDragMesh && newDragMesh.name.indexOf("sky-light") !== -1) {
    //             if(validHighLightMesh && validHighLightMesh.isEnabled() === true) {
    //                 // *** replace roof mesh with current sky light mesh
    //                 let findRoofIndex = roofSheetingMeshes.findIndex(item => item.name === lastHoverRoofName);
    //                 if(findRoofIndex != -1) {
    //                     let findOneSkyLightMesh = skyLightMeshes.find(item => item.mesh.name === newDragMesh.name);
    //                     if(findOneSkyLightMesh) {
    //                         findOneSkyLightMesh.roofMeshIndex = findRoofIndex;
    //                     }

    //                     let findRoofMeshIndexesOfSkyLight = skyLightMeshes.map(item => item.roofMeshIndex);           
    //                     for(let i = 0; i < roofSheetingMeshes.length; i++) {
    //                         roofSheetingMeshes[i].setEnabled(findRoofMeshIndexesOfSkyLight.indexOf(i) !== -1 ? false : true);
    //                     }
    
    //                     let _center = this.getCenterBoundingBoxMesh(roofSheetingMeshes[findRoofIndex]);
        
    //                     sphereOnSkyMesh.position.x = _center.x;
    //                     sphereOnSkyMesh.position.y = _center.y;

    //                     //*** update last position & rotation
    //                     findOneSkyLightMesh.mesh.lastPosition = {
    //                         x: roofSheetingMeshes[findRoofIndex].position.x, 
    //                         y: roofSheetingMeshes[findRoofIndex].position.y, 
    //                         z: roofSheetingMeshes[findRoofIndex].position.z
    //                     };

    //                     findOneSkyLightMesh.mesh.lastRotation = {
    //                         x: roofSheetingMeshes[findRoofIndex].rotation.x, 
    //                         y: roofSheetingMeshes[findRoofIndex].rotation.y, 
    //                         z: roofSheetingMeshes[findRoofIndex].rotation.z
    //                     };
    //                 }
    //             } else {
    //                this.removeMeshInDragMode(newDragMesh);
    //             }

    //             this.removeHighLightMesh();
    //         } else if(newDragMesh && newDragMesh.name.indexOf("ventilation-fan") !== -1) {
    //             highLightLayer.removeMesh(newDragMesh);

    //             if(highLightLayer.effectName === INVALID_LOCATE_POSITION) {
    //                 this.removeMeshInDragMode(newDragMesh);
    //             }
    //         } else if(newDragMesh && (newDragMesh.name.indexOf("roller-door") !== -1 
    //                                || newDragMesh.name.indexOf("access-door") !== -1 
    //                                || newDragMesh.name.indexOf("window") !== -1)) {
    //             let hasValid = this.checkValidPosition(newDragMesh);

    //             if(hasValid === false) {
    //                 this.removeMeshInDragMode(newDragMesh);
    //             } else {
    //                 newDragMesh.lastPosition = new BABYLON.Vector3(newDragMesh.position.x, newDragMesh.position.y, newDragMesh.position.z);
    //                 newDragMesh.currentPlaneDirection = currentPlaneDirection;
    //                 this.calNewHoleWallsInDragMode(newDragMesh);
    //             }

    //             this.removeHighLightMesh();
    //             this.setHighLightWallsInDragMode(false);
    //         }

    //         newDragMesh.isPickable = true;
    //     }

    //     // when user drag and drop out canvas then remove this mesh
    //     let handleDragLeave = (evt) => {
    //         if(newDragMesh) {
    //             if(newDragMesh && newDragMesh.name.indexOf("sky-light") !== -1) {
    //                 this.removeMeshInDragMode(newDragMesh);
    //                 this.removeHighLightMesh();
    //             } else if(newDragMesh && newDragMesh.name.indexOf("ventilation-fan") !== -1) {
    //                 highLightLayer.removeMesh(newDragMesh);
    //                 this.removeMeshInDragMode(newDragMesh);
    //             } else if(newDragMesh && (newDragMesh.name.indexOf("roller-door") !== -1 
    //                    || newDragMesh.name.indexOf("access-door") !== -1 
    //                    || newDragMesh.name.indexOf("window") !== -1)) {
    //                 this.removeMeshInDragMode(newDragMesh);
    //                 this.removeHighLightMesh();
    //                 this.setHighLightWallsInDragMode(false);
    //             }
    //         }
    //     }

    //     let handleClick = () => {
    //         var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    //         if(pickResult.hit) {
    //             selectedMesh = pickResult.pickedMesh;

    //             if(selectedMesh && selectedMesh.name && (selectedMesh.name.indexOf('roller-door') !== -1 
    //                             || selectedMesh.name.indexOf('access-door') !== -1 
    //                             || selectedMesh.name.indexOf('window') !== -1)) {
    //                 lastSelectedMesh = selectedMesh;
    //             }
    //         }
    //     }

    //     function getZeroPlaneVector (pos, rot) {
    //         if(currentWallActive) {
    //             let _direction = getWallActiveDirection(currentWallActive);
    //             let _facePosition = currentWallActive.getFacetPosition(0);

    //             if(_direction) {
    //                 if(_direction.equals(new BABYLON.Vector3(0, 1, 0))) {
    //                     sphereCameraOffset = _facePosition.x;
    //                 } else if(_direction.equals(new BABYLON.Vector3(1, 0, 0))) {
    //                     sphereCameraOffset = _facePosition.y;
    //                 }
    //             }
    //         }

    //         if(currentPlaneDirection === LEFT_PLANE_DIRECTION || currentPlaneDirection === RIGHT_PLANE_DIRECTION) {
    //             return getPlaneAxisXVector(sphereCameraOffset, pos, rot);
    //         }
    //         else {
    //             return getPlaneAxisYVector(sphereCameraOffset, pos, rot);
    //         }
    //     }
        
    //     function getPlaneAxisXVector (x, pos, rot) {
    //         if(!rot.x)
    //             return null;

    //         return new BABYLON.Vector3(
    //             x,
    //             pos.y - (pos.x - x)*rot.y/rot.x,
    //             pos.z - (pos.x - x)*rot.z/rot.x,
    //         )
    //     }

    //     function getPlaneAxisYVector (y, pos, rot) {
    //         if(!rot.y)
    //             return null;

    //         return new BABYLON.Vector3(
    //             pos.x - (pos.y - y)*rot.x/rot.y,
    //             y,
    //             pos.z - (pos.y - y)*rot.z/rot.y,
    //         )
    //     }

    //     function getPlaneAxisZVector (z, pos, rot) {
    //         if(!rot.z)
    //             return null;

    //         return new BABYLON.Vector3(
    //             pos.x - (pos.z - z)*rot.x/rot.z,
    //             pos.y - (pos.z - z)*rot.y/rot.z,
    //             z,
    //         )
    //     }

    //     function getWallActiveDirection (mesh) {
    //         if(!mesh) return BABYLON.Vector3(0, 0, 0);

    //         let facetNormal = mesh.getFacetNormal(0);
    //         let angleX = BABYLON.Vector3.Dot(facetNormal, new BABYLON.Vector3(1, 0, 0));
    //         let angleY = BABYLON.Vector3.Dot(facetNormal, new BABYLON.Vector3(0, 1, 0));

    //         if(Math.abs(angleY) < 0.01) {
    //             return new BABYLON.Vector3(0, 1, 0);
    //         }  
    
    //         if(Math.abs(angleX) < 0.01) {
    //             return new BABYLON.Vector3(1, 0, 0);
    //         }  

    //         return new BABYLON.Vector3(0, 1, 0);
    //     }

    //     this.canvas.addEventListener("dragover", handleDragOver, false);
    //     this.canvas.addEventListener("dragleave", handleDragLeave, false)
    //     this.canvas.addEventListener("drop", handleDrop, false);
    //     this.canvas.addEventListener("click", handleClick, false);
    // }

    // attachOwnPointerDragBehavior = (dragMesh) => {
    //     let dragPlaneNormal;
    //     if(currentPlaneDirection === FRONT_PLANE_DIRECTION || currentPlaneDirection === BACK_PLANE_DIRECTION) {
    //         dragPlaneNormal = new BABYLON.Vector3(0, 1, 0);
    //     } else {
    //         dragPlaneNormal = new BABYLON.Vector3(1, 0, 0);
    //     }

    //     let pointerDragBehavior = new BABYLON.PointerDragBehavior({dragPlaneNormal});
    //     pointerDragBehavior.moveAttached = false;
    //     pointerDragBehavior.useObjectOrientationForDragging = false;
    //     pointerDragBehavior.enabled = true;

    //     pointerDragBehavior.onDragObservable.add((evt) => {
    //         if(currentPlaneDirection === FRONT_PLANE_DIRECTION || currentPlaneDirection === BACK_PLANE_DIRECTION) {
    //             pointerDragBehavior.attachedNode.position.x += evt.delta.x;
    //             pointerDragBehavior.attachedNode.position.z += evt.delta.z;
    //         } else {
    //             pointerDragBehavior.attachedNode.position.y += evt.delta.y;
    //             pointerDragBehavior.attachedNode.position.z += evt.delta.z;
    //         }

    //         this.createNewHighLightMeshInDragMode(dragMesh);
    //         this.setHighLightWallsInDragMode(true);

    //         let hasValid = this.checkValidPosition(dragMesh);
  
    //         if(validHighLightMesh) {
    //             validHighLightMesh.setEnabled(hasValid);
    //         }

    //         if(invalidHighLightMesh) {
    //             invalidHighLightMesh.setEnabled(!hasValid);
    //         }
    //     });

    //     pointerDragBehavior.onDragEndObservable.add((evt) => {
    //         if(dragMesh) {
    //             let lastPosition = dragMesh.lastPosition;
    //             let currentPosition = dragMesh.position;
    //             let hasValid = this.checkValidPosition(dragMesh);

    //             if(hasValid === false) {
    //                 dragMesh.position = new BABYLON.Vector3(lastPosition.x, lastPosition.y, lastPosition.z);
    //             } else {
    //                 dragMesh.lastPosition = new BABYLON.Vector3(currentPosition.x, currentPosition.y, currentPosition.z);
    //                 this.calNewHoleWallsInDragMode(dragMesh);
    //             }

    //             this.removeHighLightMesh();
    //             this.setHighLightWallsInDragMode(false);
    //         }
    //     });
        
    //     dragMesh.addBehavior(pointerDragBehavior);
    //     return pointerDragBehavior;
    // }

    // attachPointerDragBehaviorForSkyLight = (mesh) => {
    //     let pointerDragBehavior = new BABYLON.PointerDragBehavior({dragPlaneNormal: new BABYLON.Vector3(0, 0, 1)});
    //     pointerDragBehavior.moveAttached = false;
    //     pointerDragBehavior.useObjectOrientationForDragging = false;

    //     pointerDragBehavior.onDragStartObservable.add((evt) => {
    //         currentPointerDragMesh = mesh;
    //         this.createNewHighLightMeshInDragMode(mesh);
    //     });

    //     pointerDragBehavior.onDragObservable.add((evt) => {
    //         mesh.position.x += evt.delta.x;
    //         mesh.position.y += evt.delta.y;

    //         let _center = this.getCenterBoundingBoxMesh(mesh);

    //         //**** update postion for sphereOnSkyMesh
    //         sphereOnSkyMesh.position.x = _center.x;
    //         sphereOnSkyMesh.position.y = _center.y;

    //         //*** check if intersect with other sky light mesh on roof
    //         if(skyLightMeshes.length >= 2) {
    //             let filterSkyLightMeshes = skyLightMeshes.filter(item => item.mesh.name !== mesh.name);
    //             let isIntersect = this.checkIntersectWithOtherMeshes(mesh, filterSkyLightMeshes);

    //             if(isIntersect) {
    //                 invalidHighLightMesh.setEnabled(true);
    //                 validHighLightMesh.setEnabled(false);
    //             } else {
    //                 invalidHighLightMesh.setEnabled(false);
    //                 validHighLightMesh.setEnabled(true);
    //             }
    //         } else {
    //             invalidHighLightMesh.setEnabled(false);
    //             validHighLightMesh.setEnabled(true);
    //         }
    //     });

    //     pointerDragBehavior.onDragEndObservable.add((evt) => {
    //         if(validHighLightMesh && validHighLightMesh.isEnabled()) {
    //             let findRoofIndex = roofSheetingMeshes.findIndex(item => item.name === lastPointerDragHoverRoofName);
    //             if(findRoofIndex !== -1) {
    //                 mesh.position.x = roofSheetingMeshes[findRoofIndex].position.x;
    //                 mesh.position.y = roofSheetingMeshes[findRoofIndex].position.y;
    //                 mesh.position.z = roofSheetingMeshes[findRoofIndex].position.z;

    //                 mesh.lastPosition = {
    //                     x: roofSheetingMeshes[findRoofIndex].position.x, 
    //                     y: roofSheetingMeshes[findRoofIndex].position.y, 
    //                     z: roofSheetingMeshes[findRoofIndex].position.z
    //                 };

    //                 mesh.lastRotation = {
    //                     x: roofSheetingMeshes[findRoofIndex].rotation.x, 
    //                     y: roofSheetingMeshes[findRoofIndex].rotation.y, 
    //                     z: roofSheetingMeshes[findRoofIndex].rotation.z
    //                 };
    //                 //*** disable roof if mesh over locate
    //                 let findOneSkyLightMesh = skyLightMeshes.find(item => item.mesh.name === currentPointerDragMesh.name);
    //                 if(findOneSkyLightMesh) {
    //                     findOneSkyLightMesh.roofMeshIndex = findRoofIndex;
    //                 }
                    
    //                 let findRoofMeshIndexesOfSkyLight = skyLightMeshes.map(item => item.roofMeshIndex);
    //                 for(let i = 0; i < roofSheetingMeshes.length; i++) {
    //                     if(findRoofMeshIndexesOfSkyLight.indexOf(i) !== -1) {
    //                         roofSheetingMeshes[i].setEnabled(false);
    //                     } else {
    //                         roofSheetingMeshes[i].setEnabled(true);
    //                     }
    //                 }
    //             }
    //         } else {
    //             //*** return last position & rotation if drag wrong position
    //             if(mesh.lastPosition) {
    //                 mesh.position.copyFromFloats(mesh.lastPosition.x, mesh.lastPosition.y, mesh.lastPosition.z);
    //             }

    //             if(mesh.lastRotation) {
    //                 mesh.rotation.x = mesh.lastRotation.x; 
    //                 mesh.rotation.y = mesh.lastRotation.y;
    //                 mesh.rotation.z = mesh.lastRotation.z;
    //             }
    //         }

    //         this.removeHighLightMesh();
    //     });

    //     mesh.addBehavior(pointerDragBehavior);
    // }

    // attachPointerDragBehaviorForVentilationFan = (mesh) => {
    //     let pointerDragBehavior = new BABYLON.PointerDragBehavior({dragPlaneNormal: new BABYLON.Vector3(0, 0, 1)});
    //     pointerDragBehavior.moveAttached = false;
    //     pointerDragBehavior.useObjectOrientationForDragging = false;

    //     pointerDragBehavior.onDragStartObservable.add((evt) => {
    //         currentPointerDragMesh = mesh;

    //         // add highLightLayer when drag
    //         if(highLightLayer) {
    //             highLightLayer.addMesh(currentPointerDragMesh, new BABYLON.Color3.FromHexString(VALID_HIGHLIGHT_COLOR))
    //         }
    //     });

    //     pointerDragBehavior.onDragObservable.add((evt) => {
    //         mesh.position.x += 0.7*evt.delta.x;
    //         mesh.position.y += 0.7*evt.delta.y;

    //         if(sphereOnSkyMesh.position.x < minRoofX) {
    //             mesh.position.x = minRoofX;
    //         }

    //         if(sphereOnSkyMesh.position.y < minRoofY) {
    //             mesh.position.y = minRoofY;
    //         }

    //         if(sphereOnSkyMesh.position.x > maxRoofX) {
    //             mesh.position.x = maxRoofX;
    //         }

    //         if(sphereOnSkyMesh.position.y > maxRoofY) {
    //             mesh.position.y = maxRoofY;
    //         }

    //         // update for sphereOnSkyMesh
    //         sphereOnSkyMesh.position.x = mesh.position.x;
    //         sphereOnSkyMesh.position.y = mesh.position.y;

    //         // check interect with other ventilation
    //         if(ventilationFanMeshes.length >= 2) {
    //             let filterVentilationFanMeshes = ventilationFanMeshes.filter(item => item.name !== currentPointerDragMesh.name);
    //             let isIntersect = this.checkIntersectWithOtherMeshes(currentPointerDragMesh, filterVentilationFanMeshes);

    //             if(isIntersect) {
    //                 highLightLayer.effectName = INVALID_LOCATE_POSITION;
    //                 highLightLayer.removeMesh(currentPointerDragMesh);
    //                 highLightLayer.addMesh(currentPointerDragMesh, new BABYLON.Color3.FromHexString(INVALID_HIGHLIGHT_COLOR));
    //             } else {
    //                 highLightLayer.effectName = VALID_LOCATE_POSITION;
    //                 highLightLayer.removeMesh(currentPointerDragMesh);
    //                 highLightLayer.addMesh(currentPointerDragMesh, new BABYLON.Color3.FromHexString(VALID_HIGHLIGHT_COLOR));
    //             }
    //         }
    //     });

    //     pointerDragBehavior.onDragEndObservable.add((evt) => {
    //         if(highLightLayer.effectName === VALID_LOCATE_POSITION) {
    //             highLightLayer.removeMesh(currentPointerDragMesh);
    //         }
    //     });

    //     mesh.addBehavior(pointerDragBehavior);
    // }

    // getCenterBoundingBoxMesh = (mesh) => {
    //     let _boundingBoxMin = mesh.getBoundingInfo().boundingBox.minimumWorld;
    //     let _boundingBoxMax = mesh.getBoundingInfo().boundingBox.maximumWorld;
    //     let _centerX = (_boundingBoxMin.x + _boundingBoxMax.x)/2;
    //     let _centerY = (_boundingBoxMin.y + _boundingBoxMax.y)/2;

    //     return {x: _centerX, y: _centerY};
    // }

    // getBoundaryRoofMeshes = () => {
    //     for(let i = 0; i < roofSheetingMeshes.length; i++) {
    //         let _boundingBoxMin = roofSheetingMeshes[i].getBoundingInfo().boundingBox.minimumWorld;
    //         let _boundingBoxMax = roofSheetingMeshes[i].getBoundingInfo().boundingBox.maximumWorld;

    //         let _minRoofX = _boundingBoxMin.x;
    //         let _minRoofY = _boundingBoxMin.y;
    //         let _minRoofZ = _boundingBoxMin.z;
    //         let _maxRoofX = _boundingBoxMax.x;
    //         let _maxRoofY = _boundingBoxMax.y;
    //         let _maxRoofZ = _boundingBoxMax.z;

    //         if(_minRoofX < minRoofX) {
    //             minRoofX = _minRoofX;
    //         }

    //         if(_minRoofY < minRoofY) {
    //             minRoofY = _minRoofY;
    //         }

    //         if(_minRoofZ < minRoofZ) {
    //             minRoofZ = _minRoofZ;
    //         }

    //         if(_maxRoofX > maxRoofX) {
    //             maxRoofX = _maxRoofX;
    //         }

    //         if(_maxRoofY > maxRoofY) {
    //             maxRoofY = _maxRoofY;
    //         }

    //         if(_maxRoofZ > maxRoofZ) {
    //             maxRoofZ = _maxRoofZ;
    //         }
    //     }
    // }

    // createNewHighLightMeshInDragMode = (dragMesh) => {
    //     if(validHighLightMesh && validHighLightMesh.name === dragMesh.name) return;

    //     validHighLightMesh = BackgroundLibrary.HighlightMesh({
    //         _coordinates: [
    //             {x: 0, y: 0}, 
    //             {x: dragMesh.initDimension.width, y: 0}, 
    //             {x: dragMesh.initDimension.width, y: dragMesh.initDimension.height}, 
    //             {x: 0, y: dragMesh.initDimension.height}
    //         ], 
    //         thickness: 10
    //     }, scene);
    //     validHighLightMesh.position = new BABYLON.Vector3(0, 5, 0);

    //     invalidHighLightMesh = BackgroundLibrary.HighlightMesh({
    //         _coordinates: [
    //             {x: 0, y: 0}, 
    //             {x: dragMesh.initDimension.width, y: 0}, 
    //             {x: dragMesh.initDimension.width, y: dragMesh.initDimension.height}, 
    //             {x: 0, y: dragMesh.initDimension.height}
    //         ], 
    //         thickness: 10,
    //         color: "#ff3d00"
    //     }, scene);
    //     invalidHighLightMesh.position = new BABYLON.Vector3(0, 5, 0);

    //     validHighLightMesh.name = dragMesh.name;
    //     validHighLightMesh.parent = dragMesh;
    //     validHighLightMesh.setEnabled(false);

    //     invalidHighLightMesh.name = dragMesh.name;
    //     invalidHighLightMesh.parent = dragMesh;
    //     invalidHighLightMesh.setEnabled(false);
    // }

    // setHighLightWallsInDragMode = (dragging) => {
    //     switch(currentPlaneDirection) {
    //         case FRONT_PLANE_DIRECTION:
    //             _setHighlightWall(frontEWInDragMode, dragging);
    //             break;

    //         case BACK_PLANE_DIRECTION:
    //             _setHighlightWall(backEWInDragMode, dragging);
    //             break;

    //         case LEFT_PLANE_DIRECTION:
    //             _setHighlightWall(leftSWInDragMode, dragging);
    //             break;

    //         case RIGHT_PLANE_DIRECTION:
    //             _setHighlightWall(rightSWInDragMode, dragging);
    //             break;
    //     }

    //     function _setHighlightWall(wallMesh, isDragging) {
    //         if(!wallMesh) return;

    //         if(isDragging) {
    //             if(wallMesh.material.subMaterials[0].alpha !== HIGH_LIGHT_WALL_WHEN_DRAG) {
    //                 wallMesh.material.subMaterials[0].alpha = 0;
    //                 wallMesh.material.subMaterials[1].alpha = HIGH_LIGHT_WALL_WHEN_DRAG;
    //             }
    //         } else {
    //             if(wallMesh.material.subMaterials[0].alpha !== 1) {
    //                 wallMesh.material.subMaterials[0].alpha = 1;
    //                 wallMesh.material.subMaterials[1].alpha = 1;
    //             }
    //         }
    //     }
    // }

    // calNewHoleWallsInDragMode = (dragMesh) => {
    //     const {span, length} = SHED_BUILDING_INFORMATION;
    //     let _position = dragMesh.position;
    //     let _dimension = dragMesh.initDimension;
    //     let holeCoordinates = [], lastHoles, lastHoleNames, findDragIndex;

    //     switch(currentPlaneDirection) {
    //         case FRONT_PLANE_DIRECTION:
    //             holeCoordinates[0] = {x: _position.x, y: _position.z};
    //             holeCoordinates[1] = {x: _position.x + _dimension.width, y: _position.z};
    //             holeCoordinates[2] = {x: _position.x + _dimension.width, y: _position.z + _dimension.height};
    //             holeCoordinates[3] = {x: _position.x, y: _position.z + _dimension.height};

    //             lastHoles = frontEWInDragMode ? frontEWInDragMode.holes : [];
    //             lastHoleNames =  frontEWInDragMode ? frontEWInDragMode.holeNames : [];

    //             findDragIndex = lastHoleNames.findIndex(item => item === dragMesh.name);

    //             if(findDragIndex === -1) {
    //                 lastHoles.push([holeCoordinates[0], holeCoordinates[1], holeCoordinates[2], holeCoordinates[3]]);
    //                 lastHoleNames.push(dragMesh.name);
    //             } else {
    //                 lastHoles[findDragIndex] = [holeCoordinates[0], holeCoordinates[1], holeCoordinates[2], holeCoordinates[3]];
    //             }
    //             this.createNewWallsInDragMode(FRONT_PLANE_DIRECTION, lastHoles, lastHoleNames);
    //             break;

    //         case BACK_PLANE_DIRECTION:
    //             holeCoordinates[0] = {x: _position.x, y: _position.z};
    //             holeCoordinates[1] = {x: _position.x - _dimension.width, y: _position.z};
    //             holeCoordinates[2] = {x: _position.x - _dimension.width, y: _position.z + _dimension.height};
    //             holeCoordinates[3] = {x: _position.x, y: _position.z + _dimension.height};

    //             lastHoles = backEWInDragMode ? backEWInDragMode.holes : [];
    //             lastHoleNames =  backEWInDragMode ? backEWInDragMode.holeNames : [];

    //             findDragIndex = lastHoleNames.findIndex(item => item === dragMesh.name);

    //             if(findDragIndex === -1) {
    //                 lastHoles.push([holeCoordinates[1], holeCoordinates[0], holeCoordinates[3], holeCoordinates[2]]);
    //                 lastHoleNames.push(dragMesh.name);
    //             } else {
    //                 lastHoles[findDragIndex] = [holeCoordinates[1], holeCoordinates[0], holeCoordinates[3], holeCoordinates[2]];
    //             }

    //             this.createNewWallsInDragMode(BACK_PLANE_DIRECTION, lastHoles, lastHoleNames);
    //             break;

    //         case LEFT_PLANE_DIRECTION:
    //             holeCoordinates[0] = {x: _position.y, y: _position.z};
    //             holeCoordinates[1] = {x: _position.y - _dimension.width, y: _position.z};
    //             holeCoordinates[2] = {x: _position.y - _dimension.width, y: _position.z + _dimension.height};
    //             holeCoordinates[3] = {x: _position.y, y: _position.z + _dimension.height};

    //             lastHoles = leftSWInDragMode ? leftSWInDragMode.holes : [];
    //             lastHoleNames =  leftSWInDragMode ? leftSWInDragMode.holeNames : [];

    //             findDragIndex = lastHoleNames.findIndex(item => item === dragMesh.name);

    //             if(findDragIndex === -1) {
    //                 lastHoles.push([holeCoordinates[1], holeCoordinates[0], holeCoordinates[3], holeCoordinates[2]]);
    //                 lastHoleNames.push(dragMesh.name);
    //             } else {
    //                 lastHoles[findDragIndex] = [holeCoordinates[1], holeCoordinates[0], holeCoordinates[3], holeCoordinates[2]];
    //             }

    //             this.createNewWallsInDragMode(LEFT_PLANE_DIRECTION, lastHoles, lastHoleNames);
    //             break;

    //         case RIGHT_PLANE_DIRECTION:
    //             holeCoordinates[0] = {x: _position.y, y: _position.z};
    //             holeCoordinates[1] = {x: _position.y + _dimension.width, y: _position.z};
    //             holeCoordinates[2] = {x: _position.y + _dimension.width, y: _position.z + _dimension.height};
    //             holeCoordinates[3] = {x: _position.y, y: _position.z + _dimension.height};

    //             lastHoles = rightSWInDragMode ? rightSWInDragMode.holes : [];
    //             lastHoleNames =  rightSWInDragMode ? rightSWInDragMode.holeNames : [];

    //             findDragIndex = lastHoleNames.findIndex(item => item === dragMesh.name);
                
    //             if(findDragIndex === -1) {
    //                 lastHoles.push([holeCoordinates[0], holeCoordinates[1], holeCoordinates[2], holeCoordinates[3]]);
    //                 lastHoleNames.push(dragMesh.name);
    //             } else {
    //                 lastHoles[findDragIndex] = [holeCoordinates[0], holeCoordinates[1], holeCoordinates[2], holeCoordinates[3]];
    //             }

    //             this.createNewWallsInDragMode(RIGHT_PLANE_DIRECTION, lastHoles, lastHoleNames);
    //             break;

    //         default:
    //             break;
    //     }

    //     // count holes for purlin and girt
    //     let holeBreakPoints = [], segmentLengths = [], maxHeight = 0;

    //     for(let i = 0; i < lastHoles.length; i++) {
    //         if(lastHoleNames[i] && lastHoleNames[i].indexOf("window") === -1) {
    //             let hole = lastHoles[i];
    //             holeBreakPoints = [...holeBreakPoints, hole[0].x, hole[1].x];

    //             let _maxHeight = max(hole.map(item => item.y));
               
    //             maxHeight = maxHeight >= _maxHeight ? maxHeight : _maxHeight;
    //         }
    //     }

    //     holeBreakPoints = sortBy(holeBreakPoints, function(item) {return item;});
        
    //     for(let i = 0; i < holeBreakPoints.length; i++) {
    //         let segmentLength = (i === 0) ? holeBreakPoints[i] : holeBreakPoints[i] - holeBreakPoints[i -1];
    //         segmentLengths.push(segmentLength);
    //     }

    //     if(currentPlaneDirection === FRONT_PLANE_DIRECTION || currentPlaneDirection === BACK_PLANE_DIRECTION)
    //         segmentLengths.push(span - holeBreakPoints[holeBreakPoints.length - 1]);
    //     else 
    //         segmentLengths.push(length - holeBreakPoints[holeBreakPoints.length - 1]);

    //     this.createNewPurlinAndGirtsInDragMode(segmentLengths, maxHeight); 
    // }

    // createNewPurlinAndGirtsInDragMode = (segmentLengths, maxHeight) => {
    //     const {span, length, endWallGirtInDragMode, sideWallGirtInDragMode} = SHED_BUILDING_INFORMATION;

    //     switch(currentPlaneDirection) {
    //         case FRONT_PLANE_DIRECTION:
    //             for(let i = 0; i < frontEWPurlinAndGirtMeshes.length; i++) {
    //                 frontEWPurlinAndGirtMeshes[i].dispose();
    //             }
    //             frontEWPurlinAndGirtMeshes = [];

    //             let frontEWGirtInDragModes = endWallGirtInDragMode.filter(item => item.coordinate.y === 0);
    //             _createNewPurlinAndGirt(frontEWGirtInDragModes, frontEWPurlinAndGirtMeshes);
    //             break;

    //         case BACK_PLANE_DIRECTION:
    //             for(let i = 0; i < backEWPurlinAndGirtMeshes.length; i++) {
    //                 backEWPurlinAndGirtMeshes[i].dispose();
    //             }
    //             backEWPurlinAndGirtMeshes = [];

    //             let backEWGirtInDragModes = endWallGirtInDragMode.filter(item => item.coordinate.y === length);
    //             _createNewPurlinAndGirt(backEWGirtInDragModes, backEWPurlinAndGirtMeshes);
    //             break;

    //         case LEFT_PLANE_DIRECTION:
    //             for(let i = 0; i < leftSWPurlinAndGirtMeshes.length; i++) {
    //                 leftSWPurlinAndGirtMeshes[i].dispose();
    //             }
    //             leftSWPurlinAndGirtMeshes = [];

    //             let leftSWGirtInDragModes = sideWallGirtInDragMode.filter(item => item.coordinate.x === 0);
    //             _createNewPurlinAndGirt(leftSWGirtInDragModes, leftSWPurlinAndGirtMeshes);
    //             break;

    //         case RIGHT_PLANE_DIRECTION:
    //             for(let i = 0; i < rightSWPurlinAndGirtMeshes.length; i++) {
    //                 rightSWPurlinAndGirtMeshes[i].dispose();
    //             }
    //             rightSWPurlinAndGirtMeshes = [];

    //             let rightSWGirtInDragModes = sideWallGirtInDragMode.filter(item => item.coordinate.x === span);
    //             _createNewPurlinAndGirt(rightSWGirtInDragModes, rightSWPurlinAndGirtMeshes);
    //             break;
    //     }

    //     function _createNewPurlinAndGirt (purlinAndGirts, meshes) {
    //         for(let i = 0; i < purlinAndGirts.length; i++) {
    //             let {
    //                 name, length, coordinate, offsetX, offsetY, offsetZ, mark, 
    //                 purlinGirtSectionType, purlinGirtSection, rollForm, rotation, color
    //             } = purlinAndGirts[i];

    //             name += " (" + mark + ")";
    //             let webHolePunchings = PUNCHINGS[mark].webHolePunchings;
    //             let flangeHolePunchings = PUNCHINGS[mark].flangeHolePunchings;
    //             segmentLengths = (maxHeight > coordinate.z) ? segmentLengths : [length];

    //             let newMesh = PurlinAndGirt.CreatNSegmentPurlinAndGirt({
    //                 name, purlinGirtSectionType, rollForm, purlinGirtSection, segmentLengths, isAddPunching: false, 
    //                 webHolePunchings, flangeHolePunchings, rotation, color}, scene);

    //             newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + offsetZ);
    //             newMesh.initCoordinate = coordinate;

    //             meshes.push(newMesh);
    //         }
    //     }
    // }

    // createNewWallsInDragMode = (planeDirection, holes = [], holeNames = []) => {
    //     const {endWallSheetingInDragMode, sideWallSheetingInDragMode} = SHED_BUILDING_INFORMATION;

    //     switch(planeDirection) {
    //         case FRONT_PLANE_DIRECTION:
    //             if(frontEWInDragMode) {
    //                 frontEWInDragMode.dispose();
    //             }
    
    //             frontEWInDragMode = _createNewWall(endWallSheetingInDragMode[0]);
    //             break;

    //         case BACK_PLANE_DIRECTION:
    //             if(backEWInDragMode) {
    //                 backEWInDragMode.dispose();
    //             }
    
    //             backEWInDragMode = _createNewWall(endWallSheetingInDragMode[1]);
    //             break;

    //         case LEFT_PLANE_DIRECTION:
    //             if(leftSWInDragMode) {
    //                 leftSWInDragMode.dispose();
    //             }
    
    //             leftSWInDragMode = _createNewWall(sideWallSheetingInDragMode[0]);
    //             break;

    //         case RIGHT_PLANE_DIRECTION:
    //             if(rightSWInDragMode) {
    //                 rightSWInDragMode.dispose();
    //             }
    
    //             rightSWInDragMode = _createNewWall(sideWallSheetingInDragMode[1]);
    //             break;
    //     }

    //     function _createNewWall(params) {
    //         let {name, vertexCoordinates, thickness, rotation, coordinate, direction, uScale, vScale} = params;

    //         let wallMesh = PanelLibrary.PolygonCladding(name, {
    //             coordinates: vertexCoordinates, thickness, holes, rotation, 
    //             outerColor: "#F6E3C0", innerColor: "#CDCCC8", uScale, vScale, direction
    //         }, scene);

    //         wallMesh.position = new BABYLON.Vector3(coordinate.x, coordinate.y, coordinate.z);
    //         wallMesh.holes = holes;
    //         wallMesh.holeNames = holeNames;

    //         return wallMesh;
    //     }
    // }

    // checkValidPosition = (checkMesh) => {
    //     let minRoofX, minRoofY, minRoofZ, maxRoofX, maxRoofY, maxRoofZ;

    //     switch (currentPlaneDirection) {
    //         case FRONT_PLANE_DIRECTION:
    //             minRoofX = checkMesh.position.x;
    //             maxRoofX = checkMesh.position.x + checkMesh.initDimension.width;
    //             minRoofZ = checkMesh.position.z;
    //             maxRoofZ = checkMesh.position.z + checkMesh.initDimension.height;

    //             if(!((minRoofX <= SHED_BUILDING_INFORMATION.span && minRoofX >= 0) && (maxRoofX <= SHED_BUILDING_INFORMATION.span && maxRoofX >= 0))) {
    //                 return false;
    //             } else {
    //                 if(minRoofZ < 0 || maxRoofZ > SHED_BUILDING_INFORMATION.height) {
    //                     return false;
    //                 }
    //             }
    //             break;

    //         case BACK_PLANE_DIRECTION:
    //             maxRoofX = checkMesh.position.x;
    //             minRoofX = checkMesh.position.x - checkMesh.initDimension.width;
    //             minRoofZ = checkMesh.position.z;
    //             maxRoofZ = checkMesh.position.z + checkMesh.initDimension.height;

    //             if(!((minRoofX <= SHED_BUILDING_INFORMATION.span && minRoofX >= 0) && (maxRoofX <= SHED_BUILDING_INFORMATION.span && maxRoofX >= 0))) {
    //                 return false;
    //             } else {
    //                 if(minRoofZ < 0 || maxRoofZ > SHED_BUILDING_INFORMATION.height) {
    //                     return false;
    //                 }
    //             }
    //             break;

    //         case LEFT_PLANE_DIRECTION:
    //             maxRoofY = checkMesh.position.y;
    //             minRoofY = checkMesh.position.y - checkMesh.initDimension.width;
    //             minRoofZ = checkMesh.position.z;
    //             maxRoofZ = checkMesh.position.z + checkMesh.initDimension.height;

    //             if(!((minRoofY <= SHED_BUILDING_INFORMATION.length && minRoofY >= 0) && (maxRoofY <= SHED_BUILDING_INFORMATION.length && maxRoofY >= 0))) {
    //                 return false;
    //             } else {
    //                 if(minRoofZ < 0 || maxRoofZ > SHED_BUILDING_INFORMATION.height) {
    //                     return false;
    //                 }
    //             }
    //             break;

    //         case RIGHT_PLANE_DIRECTION:
    //             minRoofY = checkMesh.position.y;
    //             maxRoofY = checkMesh.position.y + checkMesh.initDimension.width;
    //             minRoofZ = checkMesh.position.z;
    //             maxRoofZ = checkMesh.position.z + checkMesh.initDimension.height;

    //             if(!((minRoofY <= SHED_BUILDING_INFORMATION.length && minRoofY >= 0) && (maxRoofY <= SHED_BUILDING_INFORMATION.length && maxRoofY >= 0))) {
    //                 return false;
    //             } else {
    //                 if(minRoofZ < 0 || maxRoofZ > SHED_BUILDING_INFORMATION.height) {
    //                     return false;
    //                 }
    //             }
    //             break;
    //     }

    //     if(checkMesh.name.indexOf("roller-door") !== -1) {
    //         for(let i = 0; i < rollerDoorMeshes.length; i++) {
    //             let rollerDoorMeshFilters = rollerDoorMeshes.filter((item, index) => index !== i);

    //             let hasNoIntersectMeshes = checkNoIntersectMeshes(rollerDoorMeshes[i], [...rollerDoorMeshFilters, ...accessDoorMeshes, ...windowMeshes]);
    //             if(hasNoIntersectMeshes === false) {
    //                 return false;
    //             }
    //         }
    //     }

    //     if(checkMesh.name.indexOf("window") !== -1) {
    //         for(let i = 0; i < windowMeshes.length; i++) {
    //             let windowMeshFilters = windowMeshes.filter((item, index) => index !== i);
                
    //             let hasNoIntersectMeshes = checkNoIntersectMeshes(windowMeshes[i], [...windowMeshFilters, ...rollerDoorMeshes, ...accessDoorMeshes]);
    //             if(hasNoIntersectMeshes === false) {
    //                 return false;
    //             }
    //         }
    //     }

    //     if(checkMesh.name.indexOf("access-door") !== -1) {
    //         for(let i = 0; i < accessDoorMeshes.length; i++) {
    //             let accessDoorMeshFilters = accessDoorMeshes.filter((item, index) => index !== i);
                
    //             let hasNoIntersectMeshes = checkNoIntersectMeshes(accessDoorMeshes[i], [...accessDoorMeshFilters, ...rollerDoorMeshes, ...windowMeshes]);
    //             if(hasNoIntersectMeshes === false) {
    //                 return false;
    //             }
    //         }
    //     }

    //     function checkNoIntersectMeshes(mesh, meshes) {
    //         for(let i = 0; i < meshes.length; i++) {
    //             if(meshes[i].intersectsMesh(mesh, true)) {
    //                 return false;
    //             }
    //         }

    //         return true;
    //     }

    //     return true;
    // }
    
    // handleDeleteDragComponentByKeypad = () => {
    //     scene.actionManager = new BABYLON.ActionManager(scene);
    //     scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => {          
    //         if(evt.sourceEvent.key === "Delete") {
    //             let lastHoles = [], lastHoleNames = [];

    //             // if(lastSelectedMesh) {
    //             //     switch(currentPlaneDirection) {
    //             //         case FRONT_PLANE_DIRECTION:
    //             //             if(frontEWInDragMode) {
    //             //                 lastHoles = frontEWInDragMode.holes;
    //             //                 lastHoleNames = frontEWInDragMode.holeNames;
    //             //             }
    //             //             break;

    //             //         case BACK_PLANE_DIRECTION:
    //             //             if(backEWInDragMode) {
    //             //                 lastHoles = backEWInDragMode.holes;
    //             //                 lastHoleNames = backEWInDragMode.holeNames;
    //             //             }
    //             //             break;

    //             //         case LEFT_PLANE_DIRECTION:
    //             //             if(leftSWInDragMode) {
    //             //                 lastHoles = leftSWInDragMode.holes;
    //             //                 lastHoleNames = leftSWInDragMode.holeNames;
    //             //             }
    //             //             break;

    //             //         case RIGHT_PLANE_DIRECTION:
    //             //             if(rightSWInDragMode) {
    //             //                 lastHoles = rightSWInDragMode.holes;
    //             //                 lastHoleNames = rightSWInDragMode.holeNames;
    //             //             }
    //             //             break;
    //             //     }

    //             //     let findDeletedIndex = lastHoleNames.findIndex(item => item === lastSelectedMesh.name);
                            
    //             //     if(findDeletedIndex !== -1) {
    //             //         lastHoles.splice(findDeletedIndex, 1);
    //             //         lastHoleNames.splice(findDeletedIndex, 1);

    //             //         this.createNewWallsInDragMode(currentPlaneDirection, lastHoles, lastHoleNames);
    //             //     }
    //             // }

    //             if(lastSelectedMesh) {
    //                 this.removeMeshInDragMode(lastSelectedMesh);
    //             }
    //         }
    //     }));
    // }

    // removeHighLightMesh = () => {
    //     if(validHighLightMesh) {
    //         validHighLightMesh.dispose();
    //         validHighLightMesh = undefined;
    //     }

    //     if(invalidHighLightMesh) {
    //         invalidHighLightMesh.dispose();
    //         invalidHighLightMesh = undefined;
    //     }
    // }

    // removeMeshInDragMode = (deletedMesh) => {
    //     rollerDoorMeshes = rollerDoorMeshes.filter(item => item.name !== deletedMesh.name);
    //     accessDoorMeshes = accessDoorMeshes.filter(item => item.name !== deletedMesh.name);
    //     windowMeshes = windowMeshes.filter(item => item.name !== deletedMesh.name);
    //     ventilationFanMeshes = ventilationFanMeshes.filter(item => item.name !== deletedMesh.name);
    //     skyLightMeshes = skyLightMeshes.filter(item => item.mesh.name !== deletedMesh.name);

    //     deletedMesh.dispose();
    //     deletedMesh = undefined;
    // }

    componentDidUpdate = async(prevProps) => {
        const {isShowSheetingShed, baySheds, colourFormData} = this.props;

        if(isShowSheetingShed !== prevProps.isShowSheetingShed) {
            this.renderSheetingSheds();
        }

        if(colourFormData) {
            if(colourFormData.roofType && colourFormData.roofColour) {
                if((colourFormData.roofColour && !prevProps.colourFormData) || (prevProps.colourFormData && this.props.colourFormData.roofColour !== prevProps.colourFormData.roofColour)
                || (colourFormData.roofType && !prevProps.colourFormData) || (prevProps.colourFormData && this.props.colourFormData.roofType !== prevProps.colourFormData.roofType)) {

                    let mat = new BABYLON.StandardMaterial("mat", scene);
                    mat.diffuseTexture = new BABYLON.Texture("/assets/textures/" + colourFormData.roofType + "/" + colourFormData.roofColour.replace("#", "") + ".bmp");
                    mat.backFaceCulling = false;

                    for(let i = 0; i < roofSheetingMeshes.length; i++) {
                        roofSheetingMeshes[i].material.subMaterials[0] = mat;
                    }
                }
            }

            if(colourFormData.wallType && colourFormData.wallColour) {
                if((colourFormData.wallColour && !prevProps.colourFormData) || (prevProps.colourFormData && this.props.colourFormData.wallColour !== prevProps.colourFormData.wallColour)
                || (colourFormData.wallType && !prevProps.colourFormData) || (prevProps.colourFormData && this.props.colourFormData.wallType !== prevProps.colourFormData.wallType)) {

                    let mat = new BABYLON.StandardMaterial("mat", scene);
                    mat.diffuseTexture = new BABYLON.Texture("/assets/textures/" + colourFormData.wallType + "/" + colourFormData.wallColour.replace("#", "") + ".bmp");
                    mat.backFaceCulling = false;

                    for(let i = 0; i < sideWallSheetingMeshes.length; i++) {
                        sideWallSheetingMeshes[i].material.subMaterials[0] = mat;
                    }

                    for(let i = 0; i < endWallSheetingMeshes.length; i++) {
                        endWallSheetingMeshes[i].material.subMaterials[0] = mat;
                    }
                }
            }

            if((colourFormData.doorColour && !prevProps.colourFormData) 
            || (prevProps.colourFormData && this.props.colourFormData.doorColour !== prevProps.colourFormData.doorColour)) {
                let multiMat;
                let mat = new BABYLON.StandardMaterial("mat", scene);
                mat.diffuseColor = new BABYLON.Color3.FromHexString(colourFormData.doorColour);
                mat.backFaceCulling = false;

                if(colourFormData.doorType === "access_door" || colourFormData.doorType === "access_double_pa_door") {
                    if(colourFormData.doorType === "access_door") {
                        multiMat = accessDoorMeshes[0].material;
                    }
                    else if(colourFormData.doorType === "access_double_pa_door") {
                        multiMat = accessDoublePADoorMeshes[0].material;
                    }

                    if(colourFormData.doorComponent === "main_door") {
                        multiMat.subMaterials[0] = mat;
                    } else if(colourFormData.doorComponent === "side_rail") {
                        multiMat.subMaterials[1] = mat;
                        multiMat.subMaterials[2] = mat;
                    } else if(colourFormData.doorComponent === "top_rail") {
                        multiMat.subMaterials[3] = mat;
                    }
                } else if(colourFormData.doorType === "roller_door") {
                    multiMat = rollerDoorMeshes[0].material;

                    if(colourFormData.doorComponent === "main_door") {
                        let colour = colourFormData.doorColour.replace('#', '').toUpperCase();

                        if(multiMat.hasRollerDoor) {
                            let mainDoorMat = mat.clone();
                            mainDoorMat.diffuseTexture = new BABYLON.Texture(`/assets/textures/easy_clad/${colour}.bmp`);
                            mainDoorMat.diffuseTexture.vScale = 8;
                            mainDoorMat.backFaceCulling = false;

                            let winchMat = mat.clone();
                            winchMat.diffuseTexture = new BABYLON.Texture(`/assets/textures/kliplok_700/${colour}.bmp`);
                            winchMat.diffuseTexture.uScale = 4;
                            winchMat.backFaceCulling = false;

                            multiMat.subMaterials[0] = mainDoorMat;
                            multiMat.subMaterials[1] = winchMat;
                        }
                    }
                    else if(colourFormData.doorComponent === "side_rail") {
                        if(multiMat.hasRollerDoor) {
                            multiMat.subMaterials[2] = mat;
                            multiMat.subMaterials[3] = mat;
                        } else {
                            multiMat.subMaterials[0] = mat;
                            multiMat.subMaterials[1] = mat;
                        }
                    }
                    else if(colourFormData.doorComponent === "top_rail") {
                        if(multiMat.hasRollerDoor) {
                            multiMat.subMaterials[4] = mat;
                        } else {
                            multiMat.subMaterials[2] = mat;
                        }
                    }
                }
            }
        }

        // if(baySheds && prevProps.baySheds && baySheds !== prevProps.baySheds) {
        //     this.renderShedsByBayChanged(baySheds, prevProps.baySheds)
        // }

        const { furnitureComponent } = this.props;

        if((furnitureComponent && !prevProps.furnitureComponent) 
        || (furnitureComponent && prevProps.furnitureComponent 
         && furnitureComponent.quoteId !== prevProps.furnitureComponent.quoteId)) {
            furnitureComponents.importFurnitureComponentsIntoScene(this.props.furnitureComponent);
        }

        if((this.props.furnitureDrawingType !== prevProps.furnitureDrawingType) 
        || (this.props.selectedWall !== prevProps.selectedWall)
        || (this.props.selectedFurnitureItem !== prevProps.selectedFurnitureItem)
        || (this.props.selectedTileItem !== prevProps.selectedTileItem)
        || (this.props.selectedGlassItem !== prevProps.selectedGlassItem)
        || (this.props.selectedMirrorItem !== prevProps.selectedMirrorItem)
        || (this.props.wallType !== prevProps.wallType)
        || (this.props.wallHeightType !== prevProps.wallHeightType)
        || (this.props.wallHeight !== prevProps.wallHeight)
        || (this.props.wallCladdingType !== prevProps.wallCladdingType)
        || (this.props.wallCladdingMaterial !== prevProps.wallCladdingMaterial)
        || (this.props.externWallCladding !== prevProps.externWallCladding)
        || (this.props.addDoors !== prevProps.addDoors)
        || (this.props.studSize !== prevProps.studSize)
        || (this.props.studDistance !== prevProps.studDistance)
        || (this.props.tileItem !== prevProps.tileItem)
        || (this.props.tileWidth !== prevProps.tileWidth)
        || (this.props.tileLength !== prevProps.tileLength)
        || (this.props.tileColor !== prevProps.tileColor)
        || (this.props.tileTexture !== prevProps.tileTexture)
        || (this.props.tileOrientation !== prevProps.tileOrientation)
        || (this.props.glassWidth !== prevProps.glassWidth)
        || (this.props.glassHeight !== prevProps.glassHeight)
        || (this.props.glassDepth !== prevProps.glassDepth)
        || (this.props.mirrorWidth !== prevProps.mirrorWidth)
        || (this.props.mirrorHeight !== prevProps.mirrorHeight)
        || (this.props.mirrorDepth !== prevProps.mirrorDepth)
        ) {
            furnitureComponents && furnitureComponents.updateProps(this.props, prevProps);
        }

        // Hide Rafter and Roof Purlin if change to 'DRAW WALL' mode
        if(this.props.furnitureDrawingType !== prevProps.furnitureDrawingType) {
            switch(this.props.furnitureDrawingType) {
                case FURNITURE_NORMAL_OPTION:
                    [...mainRafterMeshes, ...rafterMeshes, ...roofStructMeshes, ...roofPurlinMeshes].map(item => {
                        item.setEnabled(true);
                    });
                    break;

                case FURNITURE_DRAW_WALL_OPTION:
                    [...mainRafterMeshes, ...rafterMeshes, ...roofStructMeshes, ...roofPurlinMeshes].map(item => {
                        item.setEnabled(false);
                    });
                    break;
            }
        }

        // Shed Component Node Tree View Checkbox
        const { checkedShedComponentNodes } = this.props;

        if(checkedShedComponentNodes.length !== prevProps.checkedShedComponentNodes.length) {
            let allShedMeshes = [
                ...endColumnMeshes, ...mainColumnMeshes, ...endRafterMeshes, ...mainRafterMeshes, ...rafterMeshes,
                ...roofStructMeshes, ...roofPurlinMeshes, ...mullionColumnMeshes, 
                ...rDColumnMeshes, ...columnMeshes, ...extraRDColumnMeshes,
                ...eavePurlinMeshes, ...sideWallGirtMeshes, ...endWallGirtMeshes, 
                ...rollerDoorMeshes, ...windowMeshes, ...barnWindowMeshes
            ];
            let unCheckedShedNodes = difference(prevProps.checkedShedComponentNodes, checkedShedComponentNodes);

            for(let i = 0; i < checkedShedComponentNodes.length; i++) {
                allShedMeshes.map(item => {
                    if(item.id === checkedShedComponentNodes[i]) {
                        item.setEnabled(true);
                    }
                });
            }

            for(let i = 0; i < unCheckedShedNodes.length; i++) {
                allShedMeshes.map(item => {
                    if(item.id === unCheckedShedNodes[i]) {
                        item.setEnabled(false);
                    }
                });
            }
        }

        const { clickedShedComponentNode } = this.props;

        if(clickedShedComponentNode !== prevProps.clickedShedComponentNode) {
            let allShedMeshes = [
                ...endColumnMeshes, ...mainColumnMeshes, ...endRafterMeshes, ...mainRafterMeshes, ...rafterMeshes,
                ...roofStructMeshes, ...roofPurlinMeshes, ...mullionColumnMeshes, 
                ...rDColumnMeshes, ...columnMeshes, ...extraRDColumnMeshes,
                ...eavePurlinMeshes, ...sideWallGirtMeshes, ...endWallGirtMeshes, 
                ...rollerDoorMeshes, ...windowMeshes, ...barnWindowMeshes
            ];

            let findOneSC = allShedMeshes.find(item => item.id === clickedShedComponentNode.value);
            if(findOneSC) {
                highLightLayer.removeAllMeshes();
                highLightLayer.addMesh(findOneSC, new BABYLON.Color3.FromHexString(SEARCH_BRACKET_HIGHLIGHT_COLOR));
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onWindowResize, false);
    }

    onWindowResize = event => {
        this.engine.resize();
    }

    addHighLightMesh = () => {
        let _coordinates = [{x: 0, y: 0}, {x: 500, y: 0}, {x: 400, y: 500}, {x: 100, y: 500}];
        let newHighLightMesh = BackgroundLibrary.HighlightMesh({_coordinates, thickness: 10}, scene);
        newHighLightMesh.setEnabled(false);

        highLightMeshes.push(newHighLightMesh);
    }

    renderFrameSheds = async() => {
        const {
            span, length, endColumns, extrudeEndColumns, mainColumns, endRafters, mainRafters, roofStructs, 
            mullionColumns, rDColumns, columns, extraRDColumns, rafters
        } = SHED_BUILDING_INFORMATION;

        const {
            endWallGirts, sideWallGirts, eavePurlins, roofPurlins, rollerDoorHeaders, rollerDoors, 
            accessDoors, accessDoublePADoors, doorJambs, windows, barnWindows, windowJambs, strapBraces
        } = SHED_BUILDING_INFORMATION;

        skyBoxMesh = BackgroundLibrary.SkyBox(scene);
        skyBoxMesh.position = new BABYLON.Vector3(span, length, 0);

        groundMesh = BackgroundLibrary.Ground(8000, 8000, scene);
        groundMesh.position = new BABYLON.Vector3(span/2, length/2, 0);

        floorMesh = BackgroundLibrary.Floor({span: span, length: length, height: FLOOR_HEIGHT}, scene);
        floorMesh.rotation.x = -Math.PI/2;

        // END COLUMN
        for(let i = 0; i < endColumns.length; i++) {
            let {
                name, code, length, coordinate, offsetX, offsetY, offsetZ, 
                mark, purlinGirtSectionType, purlinGirtSection, 
                rollForm, rotation, color, hasPunching, hasSlabFooting, webHolePunchings
            } = endColumns[i];

            let newMesh = BABYLON.Mesh;
            if(renderShedByOption === LOAD_BASIC_OPTION) {
                newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(endColumns[i], scene);
            } else if(renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION || renderShedByOption === LOAD_OPTIMIZE_BY_INSTANCE_OPTION) {
                let findOnePGSampleMesh = this.getPurlinGirtSampleMesh(purlinGirtSection, length);
                if(findOnePGSampleMesh) {
                    newMesh = renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION ? findOnePGSampleMesh.clone(name) : findOnePGSampleMesh.createInstance(name);
                } else {
                    newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(endColumns[i], scene);
                    this.addSampleMesh(newMesh, purlinGirtSection, length);
                }
            }

            newMesh.id = code;
            newMesh.rotation.x = rotation.x;
            newMesh.rotation.y = rotation.y;
            newMesh.rotation.z = rotation.z;
            newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
            newMesh.initCoordinate = coordinate;

            this.setEdgesAndPointerMouse(newMesh);

            endColumnMeshes.push(newMesh);
        }

        return;

        // *********************** PASS ***************
        // for(let i = 0; i < extrudeEndColumns.length; i++) {
        //     let { coordinate, offsetX, offsetY, offsetZ, rotation } = extrudeEndColumns[i];

        //     let newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(extrudeEndColumns[i], scene);
     
        //     newMesh.rotation.x = rotation.x;
        //     newMesh.rotation.y = rotation.y;
        //     newMesh.rotation.z = rotation.z;
        //     newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
        //     newMesh.initCoordinate = coordinate;
        // }

        // MAIN COLUMN
        for(let i = 0; i < mainColumns.length; i++) {
            let {
                name, code, length, coordinate, offsetX, offsetY, offsetZ, mark, 
                purlinGirtSectionType, purlinGirtSection, rollForm, rotation, color, hasPunching, hasSlabFooting,
            } = mainColumns[i];

            let newMesh = BABYLON.Mesh;

            if(renderShedByOption === LOAD_BASIC_OPTION) {
                newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(mainColumns[i], scene);
            } else if(renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION || renderShedByOption === LOAD_OPTIMIZE_BY_INSTANCE_OPTION) {
                let findOnePGSampleMesh = this.getPurlinGirtSampleMesh(purlinGirtSection, length);
                if(findOnePGSampleMesh) {
                    newMesh = renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION ? findOnePGSampleMesh.clone(name) : findOnePGSampleMesh.createInstance(name);
                } else {
                    newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(mainColumns[i], scene);
                    this.addSampleMesh(newMesh, purlinGirtSection, length);
                }
            }
            
            newMesh.id = code;
            newMesh.rotation.x = rotation.x;
            newMesh.rotation.y = rotation.y;
            newMesh.rotation.z = rotation.z;
            newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
            newMesh.initCoordinate = coordinate;

            this.setEdgesAndPointerMouse(newMesh);

            mainColumnMeshes.push(newMesh);
        }

        //  END RAFTER
        for(let i = 0; i < endRafters.length; i++) {
            let {
                name, code, length, coordinate, offsetX, offsetY, offsetZ, mark, 
                purlinGirtSectionType, purlinGirtSection, rollForm, rotation, color
            } = endRafters[i];

            let newMesh = BABYLON.Mesh;

            if(renderShedByOption === LOAD_BASIC_OPTION) {
                newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(endRafters[i], scene);
            } else if(renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION || renderShedByOption === LOAD_OPTIMIZE_BY_INSTANCE_OPTION) {
                let findOnePGSampleMesh = this.getPurlinGirtSampleMesh(purlinGirtSection, length);
                if(findOnePGSampleMesh) {
                    newMesh = renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION ? findOnePGSampleMesh.clone(name) : findOnePGSampleMesh.createInstance(name);
                } else {
                    newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(endRafters[i], scene);
                    this.addSampleMesh(newMesh, purlinGirtSection, length);
                }
            }
    
            newMesh.id = code;
            newMesh.rotation.x = rotation.x;
            newMesh.rotation.y = rotation.y;
            newMesh.rotation.z = rotation.z;
            newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
            newMesh.initCoordinate = coordinate;

            this.setEdgesAndPointerMouse(newMesh);

            endRafterMeshes.push(newMesh);
        }

        //  MAIN RAFTER
        for(let i = 0; i < mainRafters.length; i++) {
            let {
                name, code, length, coordinate, offsetX, offsetY, offsetZ, mark, 
                purlinGirtSectionType, purlinGirtSection, rollForm, rotation, color
            } = mainRafters[i];

            let newMesh = BABYLON.Mesh;

            if(renderShedByOption === LOAD_BASIC_OPTION) {
                newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(mainRafters[i], scene);
            } else if(renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION || renderShedByOption === LOAD_OPTIMIZE_BY_INSTANCE_OPTION) {
                let findOnePGSampleMesh = this.getPurlinGirtSampleMesh(purlinGirtSection, length);
                if(findOnePGSampleMesh) {
                    newMesh = renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION ? findOnePGSampleMesh.clone(name) : findOnePGSampleMesh.createInstance(name);
                } else {
                    newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(mainRafters[i], scene);
                    this.addSampleMesh(newMesh, purlinGirtSection, length);
                }
            }
            
            newMesh.id = code;
            newMesh.rotation.x = rotation.x;
            newMesh.rotation.y = rotation.y;
            newMesh.rotation.z = rotation.z;
            newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
            newMesh.initCoordinate = coordinate;

            this.setEdgesAndPointerMouse(newMesh);

            mainRafterMeshes.push(newMesh);
        }

        // RAFTER
        for(let i = 0; i < rafters.length; i++) {
            let {
                name, code, length, coordinate, offsetX, offsetY, offsetZ, mark, 
                purlinGirtSectionType, purlinGirtSection, rollForm, rotation, color
            } = rafters[i];

            let newMesh = BABYLON.Mesh;

            if(renderShedByOption === LOAD_BASIC_OPTION) {
                newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(rafters[i], scene);
            } else if(renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION || renderShedByOption === LOAD_OPTIMIZE_BY_INSTANCE_OPTION) {
                let findOnePGSampleMesh = this.getPurlinGirtSampleMesh(purlinGirtSection, length);
                if(findOnePGSampleMesh) {
                    newMesh = renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION ? findOnePGSampleMesh.clone(name) : findOnePGSampleMesh.createInstance(name);
                } else {
                    newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(rafters[i], scene);
                    this.addSampleMesh(newMesh, purlinGirtSection, length);
                }
            }

            newMesh.id = code;
            newMesh.rotation.x = rotation.x;
            newMesh.rotation.y = rotation.y;
            newMesh.rotation.z = rotation.z;
            newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
            newMesh.initCoordinate = coordinate;

            this.setEdgesAndPointerMouse(newMesh);

            rafterMeshes.push(newMesh);
        }

        //  ROOF STRUCT
        for(let i = 0; i < roofStructs.length; i++) {
            let {
                name, code, length, coordinate, offsetX, offsetY, offsetZ, mark, 
                purlinGirtSectionType, purlinGirtSection, rollForm, rotation, color
            } = roofStructs[i];

            let newMesh = BABYLON.Mesh;

            if(renderShedByOption === LOAD_BASIC_OPTION) {
                newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(roofStructs[i], scene);
            } else if(renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION || renderShedByOption === LOAD_OPTIMIZE_BY_INSTANCE_OPTION) {
                let findOnePGSampleMesh = this.getPurlinGirtSampleMesh(purlinGirtSection, length);
                if(findOnePGSampleMesh) {
                    newMesh = renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION ? findOnePGSampleMesh.clone(name) : findOnePGSampleMesh.createInstance(name);
                } else {
                    newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(roofStructs[i], scene);
                    this.addSampleMesh(newMesh, purlinGirtSection, length);
                }
            }

            newMesh.id = code;
            newMesh.rotation.x = rotation.x;
            newMesh.rotation.y = rotation.y;
            newMesh.rotation.z = rotation.z;
            newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
            newMesh.initCoordinate = coordinate;

            this.setEdgesAndPointerMouse(newMesh);

            roofStructMeshes.push(newMesh);
        }

        // ROOF PURLIN
        for(let i = 0; i < roofPurlins.length; i++) {
            let {
                name, code, length, coordinate, offsetX, offsetY, offsetZ,
                purlinGirtSectionType, purlinGirtSection, rollForm, rotation, color, mark
            } = roofPurlins[i];

            let newMesh = BABYLON.Mesh;

            if(renderShedByOption === LOAD_BASIC_OPTION) {
                newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(roofPurlins[i], scene);
            } else if(renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION || renderShedByOption === LOAD_OPTIMIZE_BY_INSTANCE_OPTION) {
                let findOnePGSampleMesh = this.getPurlinGirtSampleMesh(purlinGirtSection, length);
                if(findOnePGSampleMesh) {
                    newMesh = renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION ? findOnePGSampleMesh.clone(name) : findOnePGSampleMesh.createInstance(name);
                } else {
                    newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(roofPurlins[i], scene);
                    this.addSampleMesh(newMesh, purlinGirtSection, length);
                }
            }

            newMesh.id = code;
            newMesh.rotation.x = rotation.x;
            newMesh.rotation.y = rotation.y;
            newMesh.rotation.z = rotation.z;
            newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
            newMesh.initCoordinate = coordinate;

            this.setEdgesAndPointerMouse(newMesh);

            roofPurlinMeshes.push(newMesh);
        }

        // MULLION COLUMN
        for(let i = 0; i < mullionColumns.length; i++) {
            let {
                name, code, length, coordinate, offsetX, offsetY, offsetZ, mark, 
                purlinGirtSectionType, purlinGirtSection, rollForm, rotation, color
            } = mullionColumns[i];

            let newMesh = BABYLON.Mesh;

            if(renderShedByOption === LOAD_BASIC_OPTION) {
                newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(mullionColumns[i], scene);
            } else if(renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION || renderShedByOption === LOAD_OPTIMIZE_BY_INSTANCE_OPTION) {
                let findOnePGSampleMesh = this.getPurlinGirtSampleMesh(purlinGirtSection, length);
                if(findOnePGSampleMesh) {
                    newMesh = renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION ? findOnePGSampleMesh.clone(name) : findOnePGSampleMesh.createInstance(name);
                } else {
                    newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(mullionColumns[i], scene);
                    this.addSampleMesh(newMesh, purlinGirtSection, length);
                }
            }

            newMesh.id = code;
            newMesh.rotation.x = rotation.x;
            newMesh.rotation.y = rotation.y;
            newMesh.rotation.z = rotation.z;
            newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
            newMesh.initCoordinate = coordinate;

            this.setEdgesAndPointerMouse(newMesh);

            mullionColumnMeshes.push(newMesh);
        }

        // RD COLUMN
        for(let i = 0; i < rDColumns.length; i++) {
            let {
                name, code, length, coordinate, offsetX, offsetY, offsetZ, mark, 
                purlinGirtSectionType, purlinGirtSection, rollForm, rotation, color
            } = rDColumns[i];

            let newMesh = BABYLON.Mesh;

            if(renderShedByOption === LOAD_BASIC_OPTION) {
                newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(rDColumns[i], scene);
            } else if(renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION || renderShedByOption === LOAD_OPTIMIZE_BY_INSTANCE_OPTION) {
                let findOnePGSampleMesh = this.getPurlinGirtSampleMesh(purlinGirtSection, length);
                if(findOnePGSampleMesh) {
                    newMesh = renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION ? findOnePGSampleMesh.clone(name) : findOnePGSampleMesh.createInstance(name);
                } else {
                    newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(rDColumns[i], scene);
                    this.addSampleMesh(newMesh, purlinGirtSection, length);
                }
            }

            newMesh.id = code;
            newMesh.rotation.x = rotation.x;
            newMesh.rotation.y = rotation.y;
            newMesh.rotation.z = rotation.z;
            newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
            newMesh.initCoordinate = coordinate;

            this.setEdgesAndPointerMouse(newMesh);

            rDColumnMeshes.push(newMesh);
        }

        // COLUMN
        for(let i = 0; i < columns.length; i++) {
            let {
                name, code, length, coordinate, offsetX, offsetY, offsetZ, mark, 
                purlinGirtSectionType, purlinGirtSection, rollForm, rotation, color
            } = columns[i];

            let newMesh = BABYLON.Mesh;

            if(renderShedByOption === LOAD_BASIC_OPTION) {
                newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(columns[i], scene);
            } else if(renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION || renderShedByOption === LOAD_OPTIMIZE_BY_INSTANCE_OPTION) {
                let findOnePGSampleMesh = this.getPurlinGirtSampleMesh(purlinGirtSection, length);
                if(findOnePGSampleMesh) {
                    newMesh = renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION ? findOnePGSampleMesh.clone(name) : findOnePGSampleMesh.createInstance(name);
                } else {
                    newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(columns[i], scene);
                    this.addSampleMesh(newMesh, purlinGirtSection, length);
                }
            }

            newMesh.id = code;
            newMesh.rotation.x = rotation.x;
            newMesh.rotation.y = rotation.y;
            newMesh.rotation.z = rotation.z;
            newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
            newMesh.initCoordinate = coordinate;

            this.setEdgesAndPointerMouse(newMesh);

            columnMeshes.push(newMesh);
        }

        // EXTRA RD COLUMN
        for(let i = 0; i < extraRDColumns.length; i++) {
            let {
                name, code, length, coordinate, offsetX, offsetY, offsetZ, mark, 
                purlinGirtSectionType, purlinGirtSection, rollForm, rotation
            } = extraRDColumns[i];

            let newMesh = BABYLON.Mesh;

            if(renderShedByOption === LOAD_BASIC_OPTION) {
                newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(extraRDColumns[i], scene);
            } else if(renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION || renderShedByOption === LOAD_OPTIMIZE_BY_INSTANCE_OPTION) {
                let findOnePGSampleMesh = this.getPurlinGirtSampleMesh(purlinGirtSection, length);
                if(findOnePGSampleMesh) {
                    newMesh = renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION ? findOnePGSampleMesh.clone(name) : findOnePGSampleMesh.createInstance(name);
                } else {
                    newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(extraRDColumns[i], scene);
                    this.addSampleMesh(newMesh, purlinGirtSection, length);
                }
            }

            newMesh.id = code;
            newMesh.rotation.x = rotation.x;
            newMesh.rotation.y = rotation.y;
            newMesh.rotation.z = rotation.z;
            newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
            newMesh.initCoordinate = coordinate;

            this.setEdgesAndPointerMouse(newMesh);

            extraRDColumnMeshes.push(newMesh); 
        }

        // // EAVE PURLIN GIRT
        // for(let i = 0; i < eavePurlins.length; i++) {
        //     let {
        //         name, code, length, coordinate, offsetX, offsetY, offsetZ, mark,
        //         purlinGirtSectionType, purlinGirtSection, rollForm, rotation, color
        //     } = eavePurlins[i];

        //     let newMesh = BABYLON.Mesh;

        //     if(renderShedByOption === LOAD_BASIC_OPTION) {
        //         newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(eavePurlins[i], scene);
        //     } else if(renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION || renderShedByOption === LOAD_OPTIMIZE_BY_INSTANCE_OPTION) {
        //         let findOnePGSampleMesh = this.getPurlinGirtSampleMesh(purlinGirtSection, length);
        //         if(findOnePGSampleMesh) {
        //             newMesh = renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION ? findOnePGSampleMesh.clone(name) : findOnePGSampleMesh.createInstance(name);
        //         } else {
        //             newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(eavePurlins[i], scene);
        //             this.addSampleMesh(newMesh, purlinGirtSection, length);
        //         }
        //     }

        //     newMesh.id = code;
        //     newMesh.rotation.x = rotation.x;
        //     newMesh.rotation.y = rotation.y;
        //     newMesh.rotation.z = rotation.z;
        //     newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
        //     newMesh.initCoordinate = coordinate;

        //     this.setEdgesAndPointerMouse(newMesh);

        //     eavePurlinMeshes.push(newMesh);
        // }

        // // SIDE WALL GIRT
        // for(let i = 0; i < sideWallGirts.length; i++) {
        //     let {
        //         name, code, length, coordinate, offsetX, offsetY, offsetZ, mark,
        //         purlinGirtSectionType, purlinGirtSection, rollForm, rotation, color,
        //     } = sideWallGirts[i];

        //     let newMesh = BABYLON.Mesh;

        //     if(renderShedByOption === LOAD_BASIC_OPTION) {
        //         newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(sideWallGirts[i], scene);
        //     } else if(renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION || renderShedByOption === LOAD_OPTIMIZE_BY_INSTANCE_OPTION) {
        //         let findOnePGSampleMesh = this.getPurlinGirtSampleMesh(purlinGirtSection, length);
        //         if(findOnePGSampleMesh) {
        //             newMesh = renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION ? findOnePGSampleMesh.clone(name) : findOnePGSampleMesh.createInstance(name);
        //         } else {
        //             newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(sideWallGirts[i], scene);
        //             this.addSampleMesh(newMesh, purlinGirtSection, length);
        //         }
        //     }

        //     newMesh.id = code;
        //     newMesh.rotation.x = rotation.x;
        //     newMesh.rotation.y = rotation.y;
        //     newMesh.rotation.z = rotation.z;
        //     newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
        //     newMesh.initCoordinate = coordinate;

        //     this.setEdgesAndPointerMouse(newMesh);

        //     sideWallGirtMeshes.push(newMesh);
        // }

        // //END WALL GIRT
        // for(let i = 0; i < endWallGirts.length; i++) {
        //     let {
        //         name, code, length, coordinate, offsetX, offsetY, offsetZ, mark, 
        //         purlinGirtSectionType, purlinGirtSection, rollForm, rotation, color
        //     } = endWallGirts[i];

        //     let newMesh = BABYLON.Mesh;

        //     if(renderShedByOption === LOAD_BASIC_OPTION) {
        //         newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(endWallGirts[i], scene);
        //     } else if(renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION || renderShedByOption === LOAD_OPTIMIZE_BY_INSTANCE_OPTION) {
        //         let findOnePGSampleMesh = this.getPurlinGirtSampleMesh(purlinGirtSection, length);
        //         if(findOnePGSampleMesh) {
        //             newMesh = renderShedByOption === LOAD_OPTIMIZE_BY_CLONE_OPTION ? findOnePGSampleMesh.clone(name) : findOnePGSampleMesh.createInstance(name);
        //         } else {
        //             newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(endWallGirts[i], scene);
        //             this.addSampleMesh(newMesh, purlinGirtSection, length);
        //         }
        //     }

        //     newMesh.id = code;
        //     newMesh.rotation.x = rotation.x;
        //     newMesh.rotation.y = rotation.y;
        //     newMesh.rotation.z = rotation.z;
        //     newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
        //     newMesh.initCoordinate = coordinate;

        //     this.setEdgesAndPointerMouse(newMesh);

        //     endWallGirtMeshes.push(newMesh);
        // }

    //     // ROLLER DOOR
    //     for(let i = 0; i < rollerDoors.length; i++) {
    //         let {
    //             code, width, height, coordinate, offsetX, offsetY, offsetZ, rotation, 
    //             hasRollerDoor, planeDirection
    //         } = rollerDoors[i];       
    //         let W1 = 20, W2 = 20, W3 = 20;

    //         let newMesh = DoorLibrary.RollerDoor("roller-door", {
    //             width, height, W1, W2, W3, thickness: 2, rotation, hasRollerDoor
    //         }, scene);
    //         newMesh.name = "roller-door-" + i;
    //         newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);;
    //         newMesh.initCoordinate = coordinate;

    //         newMesh.id = code;
    //         // add drag drop
    //         newMesh.initDimension = {width: width + W1 + W2, height: height + W3};
    //         newMesh.currentPlaneDirection = planeDirection;
    //         newMesh.lastPosition = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);;

    //         this.setEdgesAndPointerMouse(newMesh);

    //         rollerDoorMeshes.push(newMesh);
    //     }

    //     // // ACCESS DOOR
    //     // for(let i = 0; i < accessDoors.length; i++) {
    //     //     let {width, height, coordinate, offsetX, offsetY, offsetZ, rotation, planeDirection} = accessDoors[i];       
    //     //     let W1 = 20, W2 = 20;

    //     //     let newMesh = DoorLibrary.AccessDoor("access-door", {
    //     //         width, height, W1, W2, thickness: 2, sideRailColor: "#332784", topRailColor: "#A82B2F", rotation
    //     //     }, scene);

    //     //     newMesh.name = "access-door-" + i;
    //     //     newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);;
    //     //     newMesh.initCoordinate = coordinate;

    //     //     // set edges for mesh
    //     //     newMesh.enableEdgesRendering();
    //     //     newMesh.edgesWidth = 100.0;;
    //     //     newMesh.edgesColor = new BABYLON.Color4(0, 0, 0, 1);

    //     //     // add drag drop
    //     //     newMesh.initDimension = {width: width + 2*W1, height: height + W1};
    //     //     newMesh.currentPlaneDirection = planeDirection;
    //     //     newMesh.lastPosition = new BABYLON.Vector3(
    //     //         coordinate.x + offsetX, 
    //     //         coordinate.y + offsetY, 
    //     //         coordinate.z + FLOOR_HEIGHT + offsetZ
    //     //     );

    //     //     accessDoorMeshes.push(newMesh);

    //     //     // set bracket view options
    //     //     this.props.doSetBracketViewOptions({"accessDoors": true});
    //     // }

    //     // // DOUBLE PA DOOR
    //     // for(let i = 0; i < accessDoublePADoors.length; i++) {
    //     //     let {width, height, coordinate, offsetX, offsetY, offsetZ, rotation, planeDirection} = accessDoublePADoors[i];       
    //     //     let W1 = 20, W2 = 20;

    //     //     let newMesh = DoorLibrary.AccessDoublePADoor("access-double-pa-door", {
    //     //         width, height, W1, W2, thickness: 2, sideRailColor: "#332784", topRailColor: "#A82B2F", rotation
    //     //     }, scene);

    //     //     newMesh.name = "access-double-pa-door-" + i;
    //     //     newMesh.position = new BABYLON.Vector3(
    //     //         coordinate.x + offsetX, 
    //     //         coordinate.y + offsetY, 
    //     //         coordinate.z + FLOOR_HEIGHT + offsetZ
    //     //     );
    //     //     newMesh.initCoordinate = coordinate;

    //     //     // set edges for mesh
    //     //     newMesh.enableEdgesRendering();
    //     //     newMesh.edgesWidth = 100.0;;
    //     //     newMesh.edgesColor = new BABYLON.Color4(0, 0, 0, 1);

    //     //     // add drag drop
    //     //     newMesh.initDimension = {width: width + 2*W1, height: height + W1};
    //     //     newMesh.currentPlaneDirection = planeDirection;
    //     //     newMesh.lastPosition = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);;

    //     //     accessDoublePADoorMeshes.push(newMesh);

    //     //     // set bracket view options
    //     //     this.props.doSetBracketViewOptions({"accessDoublePADoors": true});
    //     // }

    //     // WINDOW
    //     for(let i = 0; i < windows.length; i++) {
    //         let {
    //             name, code, width, height, thickness, t, coordinate, 
    //             offsetX, offsetY, offsetZ, rotation, planeDirection
    //         } = windows[i];

    //         let newMesh = WindowLibrary.Window(name, {width, height, thickness, t, rotation}, scene);
    //         newMesh.name = "window-" + i;
    //         newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX + 50, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);;
    //         newMesh.initCoordinate = coordinate;

    //         newMesh.id = code;
    //         // add drag drop
    //         newMesh.initDimension = {width, height};
    //         newMesh.currentPlaneDirection = planeDirection;
    //         newMesh.lastPosition = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);;

    //         this.setEdgesAndPointerMouse(newMesh);

    //         windowMeshes.push(newMesh);
    //     }

    //     // BARN WINDOW
    //     for(let i = 0; i < barnWindows.length; i++) {
    //         let {
    //             name, code, width, height, diameter, pitchs, coordinate, 
    //             offsetX, offsetY, offsetZ, rotation
    //         } = barnWindows[i];

    //         let newMesh = WindowLibrary.BarnWindow(name, {width, height, diameter, pitchs, rotation}, scene);
    //         newMesh.name = "barn-window-" + i;
    //         newMesh.id = code;
    //         newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);;
    //         newMesh.initCoordinate = coordinate;

    //         // add drag drop
    //         newMesh.initDimension = {width, height};
    //         newMesh.lastPosition = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);;

    //         this.setEdgesAndPointerMouse(newMesh);

    //         barnWindowMeshes.push(newMesh);
    //     }

        // // STRAP BRACES
        // //for(let i = 0; i < 1; i++) {
        // for(let i = 0; i < strapBraces.length; i++) {
        //     let { name, width, depth, coordinates, planeColor } = strapBraces[i];

        //     let newMesh = StrapBraceLibrary.strapBraceBase(name, {width, depth, coordinates, planeColor}, scene);
        //     strapBraceMeshes.push(newMesh);

        //     // set bracket view options
        //    // this.props.doSetBracketViewOptions({"strapBraces": true});
        // }
    }

    renderSheetingSheds = () => {
        const {bargeCappings, ridgeCappings, gutters, sideWallSheetings, endWallSheetings, roofSheetings} = SHED_BUILDING_INFORMATION;
        const {isShowSheetingShed} = this.props;

        // BARGE CAPPING
        if(bargeCappingMeshes.length !== 0) {
            for(let i = 0; i < bargeCappingMeshes.length; i++) {
                bargeCappingMeshes[i].setEnabled(isShowSheetingShed);
            }
        } else {
            for(let i = 0; i < bargeCappings.length; i++) {
                let {name, length, coordinate, offsetX, offsetY, offsetZ, rotation, type} = bargeCappings[i]; //3A4757

                let newMesh = BargeCappingLibrary.StandardBargeCapping(name,{W1: 20, W2: 20, length, thickness: 4, angle: Math.PI/2, rotation, color: "#F6E3C0"}, scene);  // B59D76
                newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
                newMesh.initCoordinate = coordinate;
                newMesh.type = type;

                bargeCappingMeshes.push(newMesh);
            }
        }
                
        // RIDGE CAPPING
        if(ridgeCappingMeshes.length !== 0) {
            for(let i = 0; i < ridgeCappingMeshes.length; i++) {
                ridgeCappingMeshes[i].setEnabled(isShowSheetingShed);
            }
        } else {
            for(let i = 0; i < ridgeCappings.length; i++) {
                let {name, length, H1, H2, R, foldAngles, coordinate, offsetX, offsetY, offsetZ, rotation} = ridgeCappings[i];

                let newMesh = RidgeCappingLibrary.RoolTopRidge(name, {W: length, H1, H2, R, thickness: 4, rotation, color: "#F6E3C0"}, foldAngles, scene); 

                newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
                newMesh.initCoordinate = coordinate;

                ridgeCappingMeshes.push(newMesh);
            }
        }

        // GUTTER
        if(gutterMeshes.length !== 0) {
            for(let i = 0; i < gutterMeshes.length; i++) {
                gutterMeshes[i].setEnabled(isShowSheetingShed);
            }
        } else {
           for(let i = 0; i < gutters.length; i++) {
                let {name, W1, W2, W3, length, coordinate, offsetX, offsetY, offsetZ, rotation, isRightDirection} = gutters[i];

                let newMesh = GutterLibrary.StandardGutter(name, {W1, W2, W3, length, thickness: 4, rotation, isRightDirection}, scene); 

                newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
                newMesh.initCoordinate = coordinate;

                gutterMeshes.push(newMesh);
            }
        }

        // SIDE WALL SHEETING
        if(sideWallSheetingMeshes.length !== 0) {
            for(let i = 0; i < sideWallSheetingMeshes.length; i++) {
                sideWallSheetingMeshes[i].setEnabled(isShowSheetingShed);
            }
        } else {
            for(let i = 0; i < sideWallSheetings.length; i++) {
                let {
                    name, length, height, coordinate, offsetX, offsetY, offsetZ, holes, 
                    rotation, uScale, vScale, direction, mark
                } = sideWallSheetings[i];

                name += " (" + mark + ")";
                let newMesh = PanelLibrary.VerticalCladding(name, {
                    length, height, thickness: 5, holes, rotation, outerColor: "#F6E3C0", innerColor: "#CDCCC8", 
                    uScale, vScale, direction
                }, scene);

                newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
                newMesh.initDimension = {width: length, height};
                newMesh.initRotation = rotation;
                newMesh.initCoordinate = coordinate;

                newMesh.actionManager = new BABYLON.ActionManager(scene);
                newMesh.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(
                        {
                            trigger: BABYLON.ActionManager.OnPointerOverTrigger,
                            parameter: 'r',
                        },
                        function(e) {
                            // let ratioZ = e.meshUnderPointer.initDimension.height/500;
                            // let highLightMesh = highLightMeshes[highLightMeshes.length - 1];
                            // highLightMesh.scaling.z = ratioZ;
                            // highLightMesh.rotation.z = e.meshUnderPointer.initRotation.z;
                            // highLightMesh.position = new BABYLON.Vector3(e.meshUnderPointer.initCoordinate.x, e.meshUnderPointer.initCoordinate.y, e.meshUnderPointer.initCoordinate.z);
                            // highLightMesh.setEnabled(true);
                        }
                    )
                );
        
                // newMesh.actionManager.registerAction(
                //     new BABYLON.ExecuteCodeAction(
                //         BABYLON.ActionManager.OnPointerOutTrigger,
                //         function() {
                //             let highLightMesh = highLightMeshes[highLightMeshes.length - 1];
                //             highLightMesh.setEnabled(false);
                //         }
                //     )
                // );

                sideWallSheetingMeshes.push(newMesh);
            }
        }

        //return;

        // //********* */ Create SIMULATION Interlaced Side Wall 
        // let leftSWSMeshes_1 = sideWallSheetingMeshes.filter((item, index) => index >= 0 && index < 10);
        // let leftSWSMeshes_2 = sideWallSheetingMeshes.filter((item, index) => index >= 10 && index < 24);
        // let rightSWSMeshes_1 = sideWallSheetingMeshes.filter((item, index) => index >= 24 && index < 34);
        // let rightSWSMeshes_2 = sideWallSheetingMeshes.filter((item, index) => index >= 34 && index < sideWallSheetingMeshes.length);

        // let leftWallSheetingMerged_1 = BABYLON.Mesh.MergeMeshes(leftSWSMeshes_1, true, true, undefined, false, true);
        // leftWallSheetingMerged_1.name = "left-wall-sheeting-1"; 

        // let leftWallSheetingMerged_2 = BABYLON.Mesh.MergeMeshes(leftSWSMeshes_2, true, true, undefined, false, true);
        // leftWallSheetingMerged_2.name = "left-wall-sheeting-2"; 
        // leftWallSheetingMerged_2.position.x += 1000;
        // leftWallSheetingMerged_2.position.y -= 400;

        // let rightWallSheetingMerged_1 = BABYLON.Mesh.MergeMeshes(rightSWSMeshes_1, true, true, undefined, false, true);
        // rightWallSheetingMerged_1.name = "right-wall-sheeting-1"; 

        // let rightWallSheetingMerged_2 = BABYLON.Mesh.MergeMeshes(rightSWSMeshes_2, true, true, undefined, false, true);
        // rightWallSheetingMerged_2.name = "right-wall-sheeting-2"; 
        // rightWallSheetingMerged_2.position.y -= 300;
        // rightWallSheetingMerged_2.position.x -= 100;

        // leftSWSMeshes = [leftWallSheetingMerged_1, leftWallSheetingMerged_2];
        // rightSWSMeshes = [rightWallSheetingMerged_1, rightWallSheetingMerged_2];

        // END WALL SHEETING
        if(endWallSheetingMeshes.length !== 0) {
            for(let i = 0; i < endWallSheetingMeshes.length; i++) {
                endWallSheetingMeshes[i].setEnabled(isShowSheetingShed);
            }
        } else {
            for(let i = 0; i < endWallSheetings.length; i++) {
                let {
                    name, length, height0, height1, height2, height3, coordinate, offsetX, offsetY, offsetZ, 
                    rotation, uScale, vScale, direction, mark, type
                } = endWallSheetings[i];

                name += " (" + mark + ")";

                let newMesh;
                if(type === "TopHeaderCutting") {
                    newMesh = PanelLibrary.TopHeaderCuttingCladding(name, {
                        length, height0, height1, thickness: 5, rotation, outerColor: "#F6E3C0", innerColor: "#CDCCC8", 
                        uScale, vScale, direction,
                    }, scene);
                } else if(type === "BothEndCutting") {
                    newMesh = PanelLibrary.BothEndCuttingCladding(name, {
                        length, height0, height1, height2, height3, thickness: 5, rotation, outerColor: "#F6E3C0", innerColor: "#CDCCC8", 
                        uScale, vScale, direction,
                    }, scene);
                }

                newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
                newMesh.initDimension = {width: length, height: height1};
                newMesh.initRotation = rotation;
                newMesh.initCoordinate = coordinate;

                // newMesh.actionManager = new BABYLON.ActionManager(scene);
                // newMesh.actionManager.registerAction(
                //     new BABYLON.ExecuteCodeAction(
                //         {
                //             trigger: BABYLON.ActionManager.OnPointerOverTrigger,
                //             parameter: 'r',
                //         },
                //         function(e) {
                //             console.log('---- Hover Mesh', e.meshUnderPointer.name)
                //             // let ratioZ = e.meshUnderPointer.initDimension.height/500;
                //             // let highLightMesh = highLightMeshes[highLightMeshes.length - 1];
                //             // highLightMesh.scaling.z = ratioZ;
                //             // highLightMesh.rotation.z = e.meshUnderPointer.initRotation.z;
                //             // highLightMesh.position = new BABYLON.Vector3(e.meshUnderPointer.initCoordinate.x, e.meshUnderPointer.initCoordinate.y, e.meshUnderPointer.initCoordinate.z);
                //             // highLightMesh.setEnabled(true);
                //         }
                //     )
                // );
        
                // newMesh.actionManager.registerAction(
                //     new BABYLON.ExecuteCodeAction(
                //         BABYLON.ActionManager.OnPointerOutTrigger,
                //         function() {
                //             let highLightMesh = highLightMeshes[highLightMeshes.length - 1];
                //             highLightMesh.setEnabled(false);
                //         }
                //     )
                // );

                endWallSheetingMeshes.push(newMesh);
            }

            // //********* */ Create SIMULATION Interlaced End Wall 
            // let backEWSMeshes_1 = endWallSheetingMeshes.filter((item, index) => index >= 0 && index < 10);
            // let backEWSMeshes_2 = endWallSheetingMeshes.filter((item, index) => index >= 10 && index < 18);
            // let backEWSMeshes_3 = endWallSheetingMeshes.filter((item, index) => index >= 18 && index < 26);
            // let frontEWSMeshes_1 = endWallSheetingMeshes.filter((item, index) => index >= 26 && index < 40);
            // let frontEWSMeshes_2 = endWallSheetingMeshes.filter((item, index) => index >= 40 && index < endWallSheetingMeshes.length);

            // let backWallSheetingMerged_1 = BABYLON.Mesh.MergeMeshes(backEWSMeshes_1, true, true, undefined, false, true);
            // backWallSheetingMerged_1.name = "back-wall-sheeting-1"; 

            // let backWallSheetingMerged_2 = BABYLON.Mesh.MergeMeshes(backEWSMeshes_2, true, true, undefined, false, true);
            // backWallSheetingMerged_2.name = "back-wall-sheeting-2"; 
            // backWallSheetingMerged_2.position.x -= 300;
            // backWallSheetingMerged_2.position.y -= 300;

            // let backWallSheetingMerged_3 = BABYLON.Mesh.MergeMeshes(backEWSMeshes_3, true, true, undefined, false, true);
            // backWallSheetingMerged_3.name = "back-wall-sheeting-3"; 

            // let frontWallSheetingMerged_1 = BABYLON.Mesh.MergeMeshes(frontEWSMeshes_1, true, true, undefined, false, true);
            // frontWallSheetingMerged_1.name = "front-wall-sheeting-1"; 
            // frontWallSheetingMerged_1.position.x += 200;

            // let frontWallSheetingMerged_2 = BABYLON.Mesh.MergeMeshes(frontEWSMeshes_2, true, true, undefined, false, true);
            // frontWallSheetingMerged_2.name = "front-wall-sheeting-2"; 
            // frontWallSheetingMerged_2.position.x -= 200;
            // frontWallSheetingMerged_2.position.y += 300;
            
            // frontEWSMeshes = [frontWallSheetingMerged_1, frontWallSheetingMerged_2];
            // backEWSMeshes  = [backWallSheetingMerged_1, backWallSheetingMerged_2, backWallSheetingMerged_3];
        }

        // ROOF SHEETING
        if(roofSheetingMeshes.length !== 0) {
            for(let i = 0; i < roofSheetingMeshes.length; i++) {
                roofSheetingMeshes[i].setEnabled(isShowSheetingShed);
            }
        } else {
            for(let i = 0; i < roofSheetings.length; i++) {
                let {length, height, coordinate, offsetX, offsetY, offsetZ, rotation, uScale, vScale, direction} = roofSheetings[i];

                let newMesh = PanelLibrary.VerticalCladding(`roof-cladding-${i}`, {
                        length, height, thickness: 5, rotation, outerColor: "#F6E3C0", innerColor: "#C0C0C0", 
                        uScale, vScale, direction,
                    }, scene);

                newMesh.position = new BABYLON.Vector3(coordinate.x + offsetX, coordinate.y + offsetY, coordinate.z + FLOOR_HEIGHT + offsetZ);
                newMesh.initCoordinate = coordinate;

                roofSheetingMeshes.push(newMesh);
            }
        }
    }

    getPurlinGirtSampleMesh = (purlinGirtSection, length) => {
        let findOnePGSampleMesh = purlinGirtSampleMeshes.find(item => item.purlinGirtSection === purlinGirtSection);
        if(findOnePGSampleMesh) {
            let findOneMesh = findOnePGSampleMesh.sampleMeshes.find(item => item.length === length);
            return findOneMesh ? findOneMesh.mesh : null;
        }
        return null;
    }

    addSampleMesh = (newMesh, purlinGirtSection, length) => {
        let findOnePGSampleMesh = purlinGirtSampleMeshes.find(item => item.purlinGirtSection === purlinGirtSection);
        if(findOnePGSampleMesh) {
            findOnePGSampleMesh.sampleMeshes.push({mesh: newMesh, length});
        } else {
            purlinGirtSampleMeshes.push({purlinGirtSection, sampleMeshes: [{mesh: newMesh, length}]});
        }
    }

    setEdgesAndPointerMouse = (mesh) => {
        mesh.enableEdgesRendering();
        mesh.edgesWidth = 100.0;
        mesh.edgesColor = new BABYLON.Color4(0, 0, 0, 1);

        mesh.actionManager = new BABYLON.ActionManager(scene);        
        mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOverTrigger,
                function() { }
            )
        );
    }

    createShedNodes = () => {
        const {
            endColumns, extrudeEndColumns, mainColumns, endRafters, mainRafters, roofStructs, 
            mullionColumns, rDColumns, columns, extraRDColumns, rafters,
            endWallGirts, sideWallGirts, eavePurlins, roofPurlins, rollerDoorHeaders, rollerDoors, 
            accessDoors, accessDoublePADoors, doorJambs, windows, barnWindows, windowJambs, strapBraces
        } = SHED_BUILDING_INFORMATION;

        let newColumnNodes = {
            value: "columns", label: "Columns", children: []
        };

        let newRafterNodes = {
            value: "rafters", label: "Rafters", children: []
        };

        let newRoofPurlinNodes = {
            value: "roofPurlins", label: "Roof Purlins", children: []
        };

        let newEavePurlinNodes = {
            value: "eavePurlins", label: "Eave Purlins", children: []
        };

        let newSideGirtNodes = {
            value: "sideGirts", label: "Side Girts", children: []
        };

        let newEndGirtNodes = {
            value: "endGirts", label: "End Girts", children: []
        };

        let newRollerDoorMullionNodes = {
            value: "rollerDoorMullions", label: "Roller Door Mullions", children: []
        };

        let newShedNodes = [
            newColumnNodes, newRafterNodes, newRoofPurlinNodes, newEavePurlinNodes,
            newSideGirtNodes, newEndGirtNodes, newRollerDoorMullionNodes
        ];

        let newCheckedShedNodes = [];

        //** */ COLUMN
        endColumns && endColumns.map(item => {
            newColumnNodes.children.push({
                value: item.code, label: item.code
            });

            newCheckedShedNodes.push(item.code);
        });

        mainColumns && mainColumns.map(item => {
            newColumnNodes.children.push({
                value: item.code, label: item.code
            });

            newCheckedShedNodes.push(item.code);
        });

        mullionColumns && mullionColumns.map(item => {
            newColumnNodes.children.push({
                value: item.code, label: item.code
            });

            newCheckedShedNodes.push(item.code);
        });

        columns && columns.map(item => {
            newColumnNodes.children.push({
                value: item.code, label: item.code
            });

            newCheckedShedNodes.push(item.code);
        });

        //** */ RAFTER
        endRafters && endRafters.map(item => {
            newRafterNodes.children.push({
                value: item.code, label: item.code
            });

            newCheckedShedNodes.push(item.code);
        });

        mainRafters && mainRafters.map(item => {
            newRafterNodes.children.push({
                value: item.code, label: item.code
            });

            newCheckedShedNodes.push(item.code);
        });

        rafters && rafters.map(item => {
            newRafterNodes.children.push({
                value: item.code, label: item.code
            });

            newCheckedShedNodes.push(item.code);
        });

        //** */ ROOF PURLINS
        roofStructs && roofStructs.map(item => {
            newRoofPurlinNodes.children.push({
                value: item.code, label: item.code
            });

            newCheckedShedNodes.push(item.code);
        });
        
        roofPurlins && roofPurlins.map(item => {
            newRoofPurlinNodes.children.push({
                value: item.code, label: item.code
            });

            newCheckedShedNodes.push(item.code);
        });

        //** */ EAVE PURLIN GIRT
        eavePurlins && eavePurlins.map(item => {
            newEavePurlinNodes.children.push({
                value: item.code, label: item.code
            });

            newCheckedShedNodes.push(item.code);
        });

        // ** SIDE GIRT
        sideWallGirts && sideWallGirts.map(item => {
            newSideGirtNodes.children.push({
                value: item.code, label: item.code
            });

            newCheckedShedNodes.push(item.code);
        });

        // ** END GIRT
        endWallGirts && endWallGirts.map(item => {
            newEndGirtNodes.children.push({
                value: item.code, label: item.code
            });

            newCheckedShedNodes.push(item.code);
        });

        // ** ROLLER DOOR MULLIONS
        rDColumns && rDColumns.map(item => {
            newRollerDoorMullionNodes.children.push({
                value: item.code, label: item.code
            });

            newCheckedShedNodes.push(item.code);
        });

        extraRDColumns && extraRDColumns.map(item => {
            newRollerDoorMullionNodes.children.push({
                value: item.code, label: item.code
            });

            newCheckedShedNodes.push(item.code);
        });

        // *** WINDOW AND PA DOOR FRAMES
        // let newWindowAndPADoorFrameNodes = {
        //     value: "windowAndPADoorFrames", label: "Window and PA Door Frames", children: []
        // };

        // windows && windows.map(item => {
        //     newWindowAndPADoorFrameNodes.children.push({
        //         value: item.code, label: item.code
        //     });

        //     newCheckedShedNodes.push(item.code);
        // });

        // barnWindows && barnWindows.map(item => {
        //     newWindowAndPADoorFrameNodes.children.push({
        //         value: item.code, label: item.code
        //     });

        //     newCheckedShedNodes.push(item.code);
        // });

        // newShedNodes.push(newWindowAndPADoorFrameNodes);

        this.props.doSetShedComponentNodes(newShedNodes);
        this.props.doSetCheckedShedComponentNodes(newCheckedShedNodes);
    }

    // renderShedsByBayChanged = (baySheds, prevBaySheds) => {
    //     const {length} = SHED_BUILDING_INFORMATION;
    //     const DISTANCE = 450;

    //     // MOVE
    //     // END COLUMN
    //     let outerECMeshes = endColumnMeshes.filter(item => item.initCoordinate.y !== 0);

    //     for(let i = 0; i < outerECMeshes.length; i++) {
    //         outerECMeshes[i].position.y       += (baySheds - prevBaySheds)*DISTANCE;
    //         outerECMeshes[i].initCoordinate.y += (baySheds - prevBaySheds)*DISTANCE;
    //     }

    //     // END RAFTER
    //     let outerERMeshes = endRafterMeshes.filter(item => item.initCoordinate.y !== 0);

    //     for(let i = 0; i < outerERMeshes.length; i++) {
    //         outerERMeshes[i].position.y       += (baySheds - prevBaySheds)*DISTANCE;
    //         outerERMeshes[i].initCoordinate.y += (baySheds - prevBaySheds)*DISTANCE;
    //     }

    //     // MULLION COLUMN
    //     let outerMulCMeshes = mullionColumnMeshes.filter(item => item.initCoordinate.y !== 0);

    //     for(let i = 0; i < outerMulCMeshes.length; i++) {
    //         outerMulCMeshes[i].position.y       += (baySheds - prevBaySheds)*DISTANCE;
    //         outerMulCMeshes[i].initCoordinate.y += (baySheds - prevBaySheds)*DISTANCE;
    //     }

    //     // ROOF STRUCT
    //     let outerRStrCoordY = (baySheds > prevBaySheds) ? (baySheds - 2)*4500/10 : (prevBaySheds - 1)*4500/10;
    //     let outerRStrMeshes = roofStructMeshes.filter(item => item.initCoordinate.y === outerRStrCoordY);
 
    //     for(let i = 0; i < outerRStrMeshes.length; i++) {
    //         outerRStrMeshes[i].position.y       += (baySheds - prevBaySheds)*DISTANCE;
    //         outerRStrMeshes[i].initCoordinate.y += (baySheds - prevBaySheds)*DISTANCE;
    //     }

    //     // END WALL GIRT
    //     let outerEWGCoordY = (baySheds > prevBaySheds) ? (baySheds - 1)*4500/10 : prevBaySheds*4500/10;
    //     let outerEWGMeshes = endWallGirtMeshes.filter(item => item.initCoordinate.y === outerEWGCoordY);

    //     for(let i = 0; i < outerEWGMeshes.length; i++) {
    //         outerEWGMeshes[i].position.y       += (baySheds - prevBaySheds)*DISTANCE;
    //         outerEWGMeshes[i].initCoordinate.y += (baySheds - prevBaySheds)*DISTANCE;
    //     }

    //     // BARGE CAPPING
    //     let outerBCCoordY = (baySheds > prevBaySheds) ? (baySheds - 1)*4500/10 : prevBaySheds*4500/10;
    //     let outerBCMeshes = bargeCappingMeshes.filter(item => item.initCoordinate.y === outerBCCoordY);

    //     for(let i = 0; i < outerBCMeshes.length; i++) {
    //         outerBCMeshes[i].position.y       += (baySheds - prevBaySheds)*DISTANCE;
    //         outerBCMeshes[i].initCoordinate.y += (baySheds - prevBaySheds)*DISTANCE;
    //     }

    //     // END WALL SHEETING
    //     let outerEWSCoordY = (baySheds > prevBaySheds) ? (baySheds - 1)*4500/10 : prevBaySheds*4500/10;
    //     let outerEWSMeshes = endWallSheetingMeshes.filter(item => item.initCoordinate.y === outerEWSCoordY);

    //     for(let i = 0; i < outerEWSMeshes.length; i++) {
    //         outerEWSMeshes[i].position.y       += (baySheds - prevBaySheds)*DISTANCE;
    //         outerEWSMeshes[i].initCoordinate.y += (baySheds - prevBaySheds)*DISTANCE;
    //     }

    //     // NEW
    //     // FLOOR
    //     floorMesh.scaling.y += (baySheds - prevBaySheds)*DISTANCE/length;

    //     // MAIN COLUMN
    //     if(baySheds > prevBaySheds) {
    //         let outerMCMeshes = mainColumnMeshes.filter(item => item.initCoordinate.y === (baySheds - 2)*4500/10);
    //         let totalMCMesh = mainColumnMeshes.length;

    //         for(let i = 0; i < outerMCMeshes.length; i++) {
    //             totalMCMesh++;
    //             let initCoordinate = outerMCMeshes[i].initCoordinate;
    //             let newMesh = outerMCMeshes[i].clone();
    //             newMesh.name = "Main Column " + totalMCMesh;
    //             newMesh.position.y += DISTANCE;
    //             newMesh.initCoordinate = new BABYLON.Vector3(initCoordinate.x, initCoordinate.y + DISTANCE, initCoordinate.z);

    //             mainColumnMeshes.push(newMesh);
    //         }
    //     } else {
    //         let removedMeshes = mainColumnMeshes.filter(item => item.initCoordinate.y === baySheds*4500/10);

    //         for(let i = 0; i < removedMeshes.length; i++) {
    //             removedMeshes[i].dispose();
    //         }

    //         mainColumnMeshes = mainColumnMeshes.filter(item => item.initCoordinate.y !== baySheds*4500/10);
    //     }

    //     // MAIN RAFTER
    //     if(baySheds > prevBaySheds) {
    //         let outerMRMeshes = mainRafterMeshes.filter(item => item.initCoordinate.y === (baySheds - 2)*4500/10);
    //         let totalMRMesh = mainRafterMeshes.length;

    //         for(let i = 0; i < outerMRMeshes.length; i++) {
    //             totalMRMesh++;
    //             let initCoordinate = outerMRMeshes[i].initCoordinate;
    //             let newMesh = outerMRMeshes[i].clone();
    //             newMesh.name = "Main Rafter " + totalMRMesh;
    //             newMesh.position.y += DISTANCE;
    //             newMesh.initCoordinate = new BABYLON.Vector3(initCoordinate.x, initCoordinate.y + DISTANCE, initCoordinate.z);

    //             mainRafterMeshes.push(newMesh);
    //         }
    //     } else {
    //         let removedMeshes = mainRafterMeshes.filter(item => item.initCoordinate.y === baySheds*4500/10);

    //         for(let i = 0; i < removedMeshes.length; i++) {
    //             removedMeshes[i].dispose();
    //         }

    //         mainRafterMeshes = mainRafterMeshes.filter(item => item.initCoordinate.y !== baySheds*4500/10);
    //     }

    //     // ROOF PURLIN
    //     if(baySheds > prevBaySheds) {
    //         let outerRPMeshes = roofPurlinMeshes.filter(item => item.initCoordinate.y === (baySheds - 2)*4500/10);
    //         let totalRPMesh = roofPurlinMeshes.length;

    //         for(let i = 0; i < outerRPMeshes.length; i++) {
    //             totalRPMesh++;
    //             let initCoordinate = outerRPMeshes[i].initCoordinate;
    //             let newMesh = outerRPMeshes[i].clone();
    //             newMesh.name = "Roof Purlin " + totalRPMesh;
    //             newMesh.position.y += DISTANCE;
    //             newMesh.initCoordinate = new BABYLON.Vector3(initCoordinate.x, initCoordinate.y + DISTANCE, initCoordinate.z);

    //             roofPurlinMeshes.push(newMesh);
    //         }
    //     } else {
    //         let removedMeshes = roofPurlinMeshes.filter(item => item.initCoordinate.y === baySheds*4500/10);

    //         for(let i = 0; i < removedMeshes.length; i++) {
    //             removedMeshes[i].dispose();
    //         }

    //         roofPurlinMeshes = roofPurlinMeshes.filter(item => item.initCoordinate.y !== baySheds*4500/10);
    //     }

    //     // EAVE PURLIN
    //     if(baySheds > prevBaySheds) {
    //         let outerEPMeshes = eavePurlinMeshes.filter(item => item.initCoordinate.y === (baySheds - 2)*4500/10);
    //         let totalEPMesh = eavePurlinMeshes.length;

    //         for(let i = 0; i < outerEPMeshes.length; i++) {
    //             totalEPMesh++;
    //             let initCoordinate = outerEPMeshes[i].initCoordinate;
    //             let newMesh = outerEPMeshes[i].clone();
    //             newMesh.name = "Eave Purlin " + totalEPMesh;
    //             newMesh.position.y += DISTANCE;
    //             newMesh.initCoordinate = new BABYLON.Vector3(initCoordinate.x, initCoordinate.y + DISTANCE, initCoordinate.z);

    //             eavePurlinMeshes.push(newMesh);
    //         }
    //     } else {
    //         let removedMeshes = eavePurlinMeshes.filter(item => item.initCoordinate.y === baySheds*4500/10);

    //         for(let i = 0; i < removedMeshes.length; i++) {
    //             removedMeshes[i].dispose();
    //         }

    //         eavePurlinMeshes = eavePurlinMeshes.filter(item => item.initCoordinate.y !== baySheds*4500/10);
    //     }

    //     // SIDE WALL GIRT
    //     if(baySheds > prevBaySheds) {
    //         let outerSWGMeshes = sideWallGirtMeshes.filter(item => item.initCoordinate.y === (baySheds - 2)*4500/10);
    //         let totalSWGMesh = sideWallGirtMeshes.length;

    //         for(let i = 0; i < outerSWGMeshes.length; i++) {
    //             totalSWGMesh++;
    //             let initCoordinate = outerSWGMeshes[i].initCoordinate;
    //             let newMesh = outerSWGMeshes[i].clone();
    //             newMesh.name = "Side Wall Girt " + totalSWGMesh;
    //             newMesh.position.y += DISTANCE;
    //             newMesh.initCoordinate = new BABYLON.Vector3(initCoordinate.x, initCoordinate.y + DISTANCE, initCoordinate.z);

    //             sideWallGirtMeshes.push(newMesh);
    //         }
    //     } else {
    //         let removedMeshes = sideWallGirtMeshes.filter(item => item.initCoordinate.y === baySheds*4500/10);

    //         for(let i = 0; i < removedMeshes.length; i++) {
    //             removedMeshes[i].dispose();
    //         }

    //         sideWallGirtMeshes = sideWallGirtMeshes.filter(item => item.initCoordinate.y !== baySheds*4500/10);
    //     }

    //     // BARGE CAPPING
    //     let horizontalBargeCappingMeshes = bargeCappingMeshes.filter(item => item.type === "horizontal");

    //     for(let i = 0; i < horizontalBargeCappingMeshes.length; i++) {
    //         horizontalBargeCappingMeshes[i].scaling.x += (baySheds - prevBaySheds)*DISTANCE/length;
    //     }

    //     // RIDGE CAPPING
    //     for(let i = 0; i < ridgeCappingMeshes.length; i++) {
    //         ridgeCappingMeshes[i].scaling.x += (baySheds - prevBaySheds)*DISTANCE/length;
    //     }
            
    //     // SIDE WALL SHEETING
    //     let numSideWallSheeting = DISTANCE/(length/24);

    //     if(baySheds > prevBaySheds) {
    //         let outerSWSMeshes = sideWallSheetingMeshes.filter(item => item.initCoordinate.y === ((baySheds - 1)*4500/10 - length/24));
    //         let totalSWSMesh = sideWallSheetingMeshes.length;

    //         for(let num = 1; num <= numSideWallSheeting; num ++) {
    //             for(let i = 0; i < outerSWSMeshes.length; i++) {
    //                 totalSWSMesh++;
    //                 let initCoordinate = outerSWSMeshes[i].initCoordinate;
    //                 let newMesh = outerSWSMeshes[i].clone();
    //                 newMesh.name = "Side Wall Sheeting " + totalSWSMesh;
    //                 newMesh.position.y += num*length/24;
    //                 newMesh.initDimension = outerSWSMeshes[i].initDimension;
    //                 newMesh.initRotation = outerSWSMeshes[i].initRotation;
    //                 newMesh.initCoordinate = new BABYLON.Vector3(initCoordinate.x, initCoordinate.y + num*length/24, initCoordinate.z);
                    
    //                 sideWallSheetingMeshes.push(newMesh);
    //             }
    //         }
    //     } else {
    //         let removedMeshes = sideWallSheetingMeshes.filter(item => item.initCoordinate.y > (baySheds*4500/10 - length/24));

    //         for(let i = 0; i < removedMeshes.length; i++) {
    //             removedMeshes[i].dispose();
    //         }

    //         sideWallSheetingMeshes = sideWallSheetingMeshes.filter(item => item.initCoordinate.y <= (baySheds*4500/10 - length/24));
    //     }

    //     // ROOF SHEETING
    //     let numRoofSheeting = DISTANCE/(length/20);

    //     if(baySheds > prevBaySheds) {
    //         let outerRSMeshes = roofSheetingMeshes.filter(item => item.initCoordinate.y === ((baySheds - 1)*4500/10 - length/20));
    //         let totalRSMesh = roofSheetingMeshes.length;

    //         for(let num = 0; num <= numRoofSheeting; num ++) {
    //             for(let i = 0; i < outerRSMeshes.length; i++) {
    //                 totalRSMesh++;
    //                 let initCoordinate = outerRSMeshes[i].initCoordinate;
    //                 let newMesh = outerRSMeshes[i].clone();
    //                 newMesh.name = "Roof Sheeting " + totalRSMesh;
    //                 newMesh.position.y += num*length/20;
    //                 newMesh.initCoordinate = new BABYLON.Vector3(initCoordinate.x, initCoordinate.y + num*length/20, initCoordinate.z);

    //                 roofSheetingMeshes.push(newMesh);
    //             }
    //         }
    //     } else {
    //         let removedMeshes = roofSheetingMeshes.filter(item => item.initCoordinate.y > (baySheds*4500/10 - length/20));

    //         for(let i = 0; i < removedMeshes.length; i++) {
    //             removedMeshes[i].dispose();
    //         }

    //         roofSheetingMeshes  = roofSheetingMeshes.filter(item => item.initCoordinate.y <= (baySheds*4500/10 - length/20));
    //     }
    // }

    generateUI = () => {
        const uiTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        let btnFullShed = GUI.Button.CreateSimpleButton("btnFullShed", "FULL SHED");
        btnFullShed.left = "-42%";
        btnFullShed.top = "-5%";
        btnFullShed.width = "100px";
        btnFullShed.height = "50px";
        btnFullShed.color = "#f5f5f5";
        btnFullShed.background = "#424242";
        btnFullShed.hoverCursor = "pointer";
        btnFullShed.onPointerClickObservable.add(() => {
            this.props.handleShowSheetingShed();
        });

        let btnFrameShed = GUI.Button.CreateSimpleButton("btnFrameShed", "FRAME SHED");
        btnFrameShed.left = "-42%";
        btnFrameShed.top = "5%";
        btnFrameShed.width = "100px";
        btnFrameShed.height = "50px";
        btnFrameShed.color = "#f5f5f5";
        btnFrameShed.background = "#43a047";
        btnFrameShed.hoverCursor = "pointer";
        btnFrameShed.onPointerClickObservable.add((event) => {
            this.props.handleHideSheetingShed();
        });

        // let btnSimplifiedShed = GUI.Button.CreateSimpleButton("btnSimplifiedShed", "SIMPLIFIED SHED");
        // btnSimplifiedShed.left = "-42%";
        // btnSimplifiedShed.top = "15%";
        // btnSimplifiedShed.width = "100px";
        // btnSimplifiedShed.height = "50px";
        // btnSimplifiedShed.color = "#f5f5f5";
        // btnSimplifiedShed.background = "#1B9CE6";
        // btnSimplifiedShed.hoverCursor = "pointer";
        // btnSimplifiedShed.onPointerClickObservable.add((event) => {
        //     let whiteMat = new BABYLON.StandardMaterial("white-mat", scene);
        //     whiteMat.diffuseColor = new BABYLON.Color3.White();

        //     scene.clearColor = new BABYLON.Color3(1, 1, 1);

        //     // set edges for floor mesh
        //     floorMesh.material = whiteMat;
        //     floorMesh.enableEdgesRendering();
        //     floorMesh.edgesWidth = 100.0;;
        //     floorMesh.edgesColor = new BABYLON.Color4(0, 0, 0, 1);

        //     [
        //         ...endColumnMeshes, ...mainColumnMeshes, ...endRafterMeshes, ...mainRafterMeshes,
        //         ...rafterMeshes, ...roofStructMeshes, ...roofPurlinMeshes, ...mullionColumnMeshes,
        //         ...rDColumnMeshes, ...columnMeshes, ...extraRDColumnMeshes, ...eavePurlinMeshes,
        //         ...sideWallGirtMeshes, ...endWallGirtMeshes
        //     ].forEach((mesh, idx) => {         
        //         for(let i = 0; i < mesh.material.subMaterials.length; i++) {
        //             mesh.material.subMaterials[i] = whiteMat;
        //         }
        //     });
        // });

        // let btnFilledShed = GUI.Button.CreateSimpleButton("btnFillShed", "FILLED SHED");
        // btnFilledShed.left = "-42%";
        // btnFilledShed.top = "25%";
        // btnFilledShed.width = "100px";
        // btnFilledShed.height = "50px";
        // btnFilledShed.color = "#f5f5f5";
        // btnFilledShed.background = "#29A809";
        // btnFilledShed.hoverCursor = "pointer";
        // btnFilledShed.onPointerClickObservable.add((event) => {
        //     scene.clearColor = new BABYLON.Color3(0.31, 0.48, 0.64);

        //     [
        //         ...endColumnMeshes, ...mainColumnMeshes, ...endRafterMeshes, ...mainRafterMeshes,
        //         ...rafterMeshes, ...roofStructMeshes, ...roofPurlinMeshes, ...mullionColumnMeshes,
        //         ...rDColumnMeshes, ...columnMeshes, ...extraRDColumnMeshes, ...eavePurlinMeshes,
        //         ...sideWallGirtMeshes, ...endWallGirtMeshes
        //     ].forEach((mesh, idx) => {
        //         for(let i = 0; i < mesh.material.subMaterials.length; i++) {
        //             mesh.material.subMaterials[i].alpha = 1;
        //         }
        //     });
        // });

        // let btnExportShedPDF = GUI.Button.CreateSimpleButton("btnExportShedPDF", "EXPORT SHED PDF");
        // btnExportShedPDF.left = "-42%";
        // btnExportShedPDF.top = "5%";
        // btnExportShedPDF.width = "100px";
        // btnExportShedPDF.height = "50px";
        // btnExportShedPDF.color = "#f5f5f5";
        // btnExportShedPDF.background = "#43a047";
        // btnExportShedPDF.hoverCursor = "pointer";
        // btnExportShedPDF.onPointerClickObservable.add(async(event) => {
        //     function base64ToBlob(base64, contentType='image/png', chunkLength=512) {
        //         const byteCharsArray = Array.from(atob(base64.substr(base64.indexOf(',') + 1)));
        //         const chunksIterator = new Array(Math.ceil(byteCharsArray.length / chunkLength));
        //         const bytesArrays = [];
            
        //         for (let c = 0; c < chunksIterator.length; c++) {
        //             bytesArrays.push(new Uint8Array(byteCharsArray.slice(c * chunkLength, chunkLength * (c + 1)).map(s => s.charCodeAt(0))));
        //         }
            
        //         const blob = new Blob(bytesArrays, {type: contentType});
        //         return blob;
        //     }

        //     // reduce resolution texture
        //     var textureResolution = 512; // higher value will set resolution higher

        //     var floorDT = new BABYLON.DynamicTexture("floor-dynamic-texture", textureResolution, scene);
        //     var floorDTContext = floorDT.getContext();
        //     var floorMat = new BABYLON.StandardMaterial("mat", scene);
        //     floorMat.diffuseTexture = floorDT;

        //     var groundDT = new BABYLON.DynamicTexture("ground-dynamic-texture", textureResolution, scene);
        //     var groundDTContext = groundDT.getContext();
        //     var groundMat = new BABYLON.StandardMaterial("mat", scene);
        //     groundMat.diffuseTexture = groundDT;

        //     var floorImg = new Image();
        //     floorImg.src = "/assets/textures/floor.png";
        //     floorImg.onload = function() {
        //         floorDTContext.drawImage(this, 0, 0);
        //         floorDT.update();
        //     }

        //     var groundImg = new Image();
        //     groundImg.src = "/assets/grass.jpg";
        //     groundImg.onload = function() {
        //         groundDTContext.drawImage(this, 0, 0);
        //         groundDT.update();

        //         createScreenShot();
        //     }

        //     let createScreenShot = () => {
        //         // export PDF Screen shot
        //         var currentCanvasSizeWidth = this.canvas.width;
        //         var currentCanvasSizeHeight = this.canvas.height;
        //         var ratio = currentCanvasSizeWidth/currentCanvasSizeHeight;

        //         // increase precision pixel
        //         const renderWidth = 1500;
        //         const renderHeight = renderWidth/ratio;
        //         this.canvas.style.width = renderWidth + "px";
        //         this.canvas.style.height = renderHeight + "px";
        //         this.engine.resize(true);

        //         floorMesh.material = floorMat;
        //         groundMesh.material = groundMat;

        //         BABYLON.Tools.CreateScreenshotUsingRenderTarget(this.engine, camera, {precision: 4}, (blobData) => {
        //             exportShedPDF(blobData);

        //             floorMesh.material = scene.getMaterialByName("floor-mat");
        //             groundMesh.material = scene.getMaterialByName("ground-mat");

        //             this.canvas.style.width = currentCanvasSizeWidth + "px";
        //             this.canvas.style.height = currentCanvasSizeHeight + "px";
        //             this.engine.resize(true)
        //         });
        //     }

        //     const exportShedPDF = (blobData) => {
        //         // *** save as image
        //         let newData = base64ToBlob(blobData)
        //         let blobUrl = window.URL.createObjectURL(newData);
        //         window.open(blobUrl, '_blank');

        //         // this.props.DOC_exportSimplifiedShedPDF({
        //         //     pageId: DOCS_TYPE_SIMPLIFIED_SHED_SHEET,
        //         //     pageData: blobData,
        //         // });
        //     }
        // });

        // let btnBasicShed = GUI.Button.CreateSimpleButton("btnBasicShed", "BASIC SHED");
        // btnBasicShed.left = "20%";
        // btnBasicShed.top = "-5%";
        // btnBasicShed.width = "160px";
        // btnBasicShed.height = "80px";
        // btnBasicShed.color = "#FFFFFF";
        // btnBasicShed.background = "#43a047";
        // btnBasicShed.hoverCursor = "pointer";
        // btnBasicShed.onPointerClickObservable.add((event) => {
        //     renderShedByOption = LOAD_BASIC_OPTION;
        //     let _loadingTextDiv = document.getElementById("loadingTextDev");
        //     _loadingTextDiv.innerHTML = "BASIC OPTION LOADING ................";
        //     this.reRenderShed("BASIC");
        // });

        // let btnOptimizeShed = GUI.Button.CreateSimpleButton("btnOptimizeShed", "OPTIMIZE SHED (CLONE)");
        // btnOptimizeShed.left = "20%";
        // btnOptimizeShed.top = "10%";
        // btnOptimizeShed.width = "160px";
        // btnOptimizeShed.height = "80px";
        // btnOptimizeShed.color = "#FFFFFF";
        // btnOptimizeShed.background = "#DF8918";
        // btnOptimizeShed.hoverCursor = "pointer";
        // btnOptimizeShed.onPointerClickObservable.add((event) => {
        //     renderShedByOption = LOAD_OPTIMIZE_BY_CLONE_OPTION;
        //     let _loadingTextDiv = document.getElementById("loadingTextDev");
        //     _loadingTextDiv.innerHTML = "OPTIMIZE OPTION LOADING ................";
        //     this.reRenderShed("OPTIMIZE");
        // });

        // let btnOptimizeShed2 = GUI.Button.CreateSimpleButton("btnOptimizeShed2", "OPTIMIZE SHED (INSTANCE)");
        // btnOptimizeShed2.left = "20%";
        // btnOptimizeShed2.top = "25%";
        // btnOptimizeShed2.width = "160px";
        // btnOptimizeShed2.height = "80px";
        // btnOptimizeShed2.color = "#FFFFFF";
        // btnOptimizeShed2.background = "#FF2200";
        // btnOptimizeShed2.hoverCursor = "pointer";
        // btnOptimizeShed2.onPointerClickObservable.add((event) => {
        //     renderShedByOption = LOAD_OPTIMIZE_BY_INSTANCE_OPTION;
        //     let _loadingTextDiv = document.getElementById("loadingTextDev");
        //     _loadingTextDiv.innerHTML = "INSTANCE OPTION LOADING ................";
        //     this.reRenderShed("INSTANCE");
        // });

        shedSelectedText.text = "National Shed & Shelters"
        shedSelectedText.color = "#76ff03";
        shedSelectedText.fontSize = 24;
        shedSelectedText.left = "-35%";
        shedSelectedText.top = "45%";
        shedSelectedText.width = "400px";
        shedSelectedText.height = "50px";
        
        // measureLoadingShedText.text = "BASIC OPTION - Total time: ..... (ms)"
        // measureLoadingShedText.color = "#4400FF";
        // measureLoadingShedText.fontSize = 24;
        // measureLoadingShedText.left = "15%";
        // measureLoadingShedText.top = "-15%";
        // measureLoadingShedText.width = "400px";
        // measureLoadingShedText.height = "50px";

        uiTexture.addControl(shedSelectedText);
        //uiTexture.addControl(measureLoadingShedText);

        // uiTexture.addControl(btnFullShed);
        // uiTexture.addControl(btnFrameShed);
        // uiTexture.addControl(btnBasicShed);
        // uiTexture.addControl(btnOptimizeShed);
        // uiTexture.addControl(btnOptimizeShed2);
        // uiTexture.addControl(btnExportShedPDF);
        // uiTexture.addControl(btnSimplifiedShed);
        // uiTexture.addControl(btnFilledShed);
    }

    reRenderShed = (text) => {
        skyBoxMesh.dispose();
        groundMesh.dispose();
        floorMesh.dispose();

        for(let i = 0; i < endColumnMeshes.length; i++) {
            scene.removeMesh(endColumnMeshes[i]);
        }

        for(let i = 0; i < mainColumnMeshes.length; i++) {
            scene.removeMesh(mainColumnMeshes[i]);
        }

        for(let i = 0; i < endRafterMeshes.length; i++) {
            scene.removeMesh(endRafterMeshes[i]);
        }

        for(let i = 0; i < mainRafterMeshes.length; i++) {
            scene.removeMesh(mainRafterMeshes[i]);
        }

        for(let i = 0; i < rafterMeshes.length; i++) {
            scene.removeMesh(rafterMeshes[i]);
        }

        for(let i = 0; i < roofStructMeshes.length; i++) {
            scene.removeMesh(roofStructMeshes[i]);
        }

        for(let i = 0; i < roofPurlinMeshes.length; i++) {
            scene.removeMesh(roofPurlinMeshes[i]);
        }

        for(let i = 0; i < mullionColumnMeshes.length; i++) {
            scene.removeMesh(mullionColumnMeshes[i]);
        }

        for(let i = 0; i < rDColumnMeshes.length; i++) {
            scene.removeMesh(rDColumnMeshes[i]);
        }

        for(let i = 0; i < columnMeshes.length; i++) {
            scene.removeMesh(endColumnMeshes[i]);
        }

        for(let i = 0; i < extraRDColumnMeshes.length; i++) {
            scene.removeMesh(extraRDColumnMeshes[i]);
        }

        for(let i = 0; i < eavePurlinMeshes.length; i++) {
            scene.removeMesh(endColumnMeshes[i]);
        }

        for(let i = 0; i < sideWallGirtMeshes.length; i++) {
            scene.removeMesh(sideWallGirtMeshes[i]);
        }

        for(let i = 0; i < endWallGirtMeshes.length; i++) {
            scene.removeMesh(endWallGirtMeshes[i]);
        }

        // // Sheeting meshes
        // for(let i = 0; i < bargeCappingMeshes.length; i++) {
        //     bargeCappingMeshes[i].dispose();
        // }

        // for(let i = 0; i < ridgeCappingMeshes.length; i++) {
        //     ridgeCappingMeshes[i].dispose();
        // }

        // for(let i = 0; i < gutterMeshes.length; i++) {
        //     gutterMeshes[i].dispose();
        // }

        // for(let i = 0; i < sideWallSheetingMeshes.length; i++) {
        //     sideWallSheetingMeshes[i].dispose();
        // }

        // for(let i = 0; i < endWallSheetingMeshes.length; i++) {
        //     endWallSheetingMeshes[i].dispose();
        // }

        // for(let i = 0; i < roofSheetingMeshes.length; i++) {
        //     roofSheetingMeshes[i].dispose();
        // }

        skyBoxMesh = null;
        groundMesh = null;
        floorMesh = null;

        endColumnMeshes = [];            
        mainColumnMeshes = [];
        endRafterMeshes = [];
        mainRafterMeshes = [];
        rafterMeshes = [];
        roofStructMeshes = [];
        roofPurlinMeshes = [];
        mullionColumnMeshes = [];
        rDColumnMeshes = [];
        columnMeshes = [];
        extraRDColumnMeshes = [];
        eavePurlinMeshes = [];
        sideWallGirtMeshes = [];
        endWallGirtMeshes = [];
        purlinGirtSampleMeshes = [];

        // bargeCappingMeshes = [];
        // ridgeCappingMeshes = [];
        // gutterMeshes = [];
        // sideWallSheetingMeshes = [];
        // endWallSheetingMeshes = [];
        // roofSheetingMeshes = [];

        this.engine.displayLoadingUI();

        setTimeout(() => {
            let begin = moment(new Date());
            this.renderFrameSheds();
            // this.renderSheetingSheds();
            let end = moment(new Date());
            let t = end.diff(begin, "milliseconds");
            this.engine.hideLoadingUI();
            measureLoadingShedText.text = text + " - Total time: " + t + " (ms)";
        }, 1000);
    }

    makeTextPlane = (text, color, size) => {
        var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
        dynamicTexture.hasAlpha = true;
        dynamicTexture.drawText(text, 5, 40, "bold 48px Arial", color, "transparent", true, true);
        var plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
        plane.material = new BABYLON.StandardMaterial("mat", scene);
        plane.material.backFaceCulling = false;
        plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
        plane.material.diffuseTexture = dynamicTexture;
        return plane;
    }

    showAxis = (size) => {
        let above = 0;

        let axisX = BABYLON.Mesh.CreateLines("axisX", [
            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), 
            new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
        ], scene);
        axisX.position = new BABYLON.Vector3(0, 0, above);

        axisX.color = new BABYLON.Color3(1,0,0);
        let xChar = this.makeTextPlane("X", "red", size/10);
        xChar.rotation.x = Math.PI/2;
        xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, above);

        let axisY = BABYLON.Mesh.CreateLines("axisZ", [
            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, 0.95 * size, 0), 
            new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(size * 0.05, 0.95 * size, 0)
        ], scene);
        axisY.position = new BABYLON.Vector3(0, 0, above);

        axisY.color = new BABYLON.Color3(0, 1, 0);
        let yChar = this.makeTextPlane("Y", "green", size/10);
        yChar.rotation.x = Math.PI/2;
        yChar.position = new BABYLON.Vector3(-0.05 * size, 0.95 * size, above);

        let axisZ = BABYLON.Mesh.CreateLines("axisZ", [
            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, 0.95 * size), 
            new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, size * 0.05, 0.95 * size)
        ], scene);
        axisZ.position = new BABYLON.Vector3(0, 0, above);

        axisZ.color = new BABYLON.Color3(0, 0, 1);
        let zChar = this.makeTextPlane("Z", "blue", size/10);
        zChar.rotation.x = Math.PI/2;
        zChar.position = new BABYLON.Vector3(-0.05 * size, 0, 0.95*size + above);
    }

    handleSelectedMesh = () => {
        this.canvas.addEventListener("click", function(e) {
            var pickResult = scene.pick(scene.pointerX, scene.pointerY);
            if(pickResult.hit) {
                selectedMesh = pickResult.pickedMesh;

                if(selectedMesh.name && !(selectedMesh.name.indexOf("ground-mesh") !== -1 || selectedMesh.name.indexOf("floor-mesh") !== -1)) {
                    //shedSelectedText.text = selectedMesh.name;
                    //console.log('--- select mesh', selectedMesh.name)

                    // console.log('--- select mesh rotation', selectedMesh.rotation)
                    // //camera.setTarget(selectedMesh);
                    
                    // let angleX = BABYLON.Vector3.Dot(
                    //     //selectedMesh.rotation,
                    //     selectedMesh.rotation,
                    //     BABYLON.Axis.X
                    // );
                    // // console.log('--- angleX 1', angleX, Math.PI/2)
                    // // angleX = Math.acos(1);
                    // // // console.log('--- angleX 2', xx, )
                    // console.log('--- angleX', angleX, BABYLON.Tools.ToDegrees(angleX))
             

                    // selectedMesh.updateFacetData();
                    // console.log('facetNb', selectedMesh.facetNb);
                    // selectedMesh.computeWorldMatrix(true);
                    // const facetNormals = selectedMesh.getFacetLocalNormals();
                    // console.log('---- facetNormals', facetNormals)

                    // var normals = selectedMesh.getVerticesData(BABYLON.VertexBuffer.NormalKind);
                    // console.log('---- normals', normals)

                    //showNormal(selectedMesh, 200, new BABYLON.Color3.Red(), scene);
                }
            }
        });

        var showNormal = (mesh, size, color, sc) => {
            var normals = mesh.getVerticesData(BABYLON.VertexBuffer.NormalKind);
            var positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);      
            color = color || BABYLON.Color3.White();
            sc = sc || scene;
            size = size || 1;
    
            var lines = [];

            console.log('--- showNormal', normals)
            for (var i = 0; i < normals.length; i += 3) {
                var v1 = BABYLON.Vector3.FromArray(positions, i);
                var v2 = v1.add(BABYLON.Vector3.FromArray(normals, i).scaleInPlace(size));
                lines.push([v1.add(mesh.position), v2.add(mesh.position)]);
            }
            var normalLines = BABYLON.MeshBuilder.CreateLineSystem("normalLines", {lines: lines}, sc);
            normalLines.color = color;
            return normalLines;
    
        }
        // this.canvas.addEventListener("dblclick", function(e) {
        //     var pickResult = scene.pick(scene.pointerX, scene.pointerY);
        //     if(pickResult.hit) {
        //         selectedMesh = pickResult.pickedMesh;

        //         if(selectedMesh.name && !(selectedMesh.name.indexOf("ground-mesh") !== -1 || selectedMesh.name.indexOf("floor-mesh") !== -1)) {
        //             //shedSelectedText.text = selectedMesh.name;
        //             camera.setTarget(selectedMesh);
        //         } 
        //     }
        // });
    }



    render() {
        return (
            <div id="drawing3D">
                <div style={{display: 'flex', flexFlow: 'row'}}>
                    <div style={{flexGrow: 1}}>
                        <canvas
                            style={{ width: '100%', height: 800, zIndex: 100}}
                            ref={
                                canvas => {this.canvas = canvas;}
                            }
                        />
                    </div>
                    <div style={{flexGrow: 0}}>
                        <Drawing3DToolbar 
                            handleFurnitureItemIconDragStart={
                                (evt, group, code, name) => furnitureComponents.handleFurnitureItemIconDragStart(evt, group, code, name)
                            } 
                            handleTileItemIconDragStart={
                                (evt, group, type) => furnitureComponents.handleTileItemIconDragStart(evt, group, type)
                            }
                            handleGlassIconDragStart={
                                (evt, type) => furnitureComponents.handleGlassIconDragStart(evt, type)
                            }
                            handleMirrorIconDragStart={
                                (evt, type) => furnitureComponents.handleMirrorIconDragStart(evt, type)
                            }
                            undoDrawWall={() => furnitureComponents.undoDrawWall()}
                            duplicateFurnitureWall={() => furnitureComponents.duplicateFurnitureWall()}
                            duplicateFurnitureItem={() => furnitureComponents.duplicateFurnitureItem()}
                            duplicateTileItem={() => furnitureComponents.duplicateTileItem()}
                            duplicateGlassItem={() => furnitureComponents.duplicateGlassItem()}
                            duplicateMirrorItem={() => furnitureComponents.duplicateMirrorItem()}
                            removeFurnitureWall={() => furnitureComponents.removeFurnitureWall()}
                            removeFurnitureItem={() => furnitureComponents.removeFurnitureItem()}
                            removeTileItem={() => furnitureComponents.removeTileItem()}
                            removeGlassItem={() => furnitureComponents.removeGlassItem()}
                            removeMirrorItem={() => furnitureComponents.removeMirrorItem()}
                            addWallDoor={() => furnitureComponents.addWallDoor()}
                            deSelectedWall={() => furnitureComponents.deSelectedWall()}
                            deSelectedFurnitureItem={() => furnitureComponents.deSelectedFurnitureItem()}
                            deSelectedTileItem={() => furnitureComponents.deSelectedTileItem()}
                            deSelectedGlassItem={() => furnitureComponents.deSelectedGlassItem()}
                            deSelectedMirrorItem={() => furnitureComponents.deSelectedMirrorItem()}
                            enableRotateFurnitureItem={() => furnitureComponents.enableRotateFurnitureItem()}
                            handleSaveFurnitureComponent={() => furnitureComponents.handleSave()}
                            handleRemoveAll={() => furnitureComponents.handleRemoveAll()}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Drawing3D;