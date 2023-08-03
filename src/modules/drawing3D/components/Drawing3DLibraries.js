import React, {Component} from 'react';
import * as dat from 'dat.gui';
import * as BABYLON from "babylonjs";
import earcut from "earcut";
import * as GUI from "babylonjs-gui";
import "@babylonjs/core";
import "babylonjs-loaders";
import { Col, Row, Button } from 'reactstrap';

import {
    BRACKET_SAMPLES, PURLIN_GIRT_C_SECTIONS, PURLIN_GIRT_Z_SECTIONS, PURLIN_GIRT_TS_SECTIONS, WALL_CLADDING_SAMPLES,
    HEX_BOLT_DIMENSIONS
} from '../constants';

import BackgroundLibrary from './Libraries/Background';
import PurlinAndGirt from './Drawing3DLibraries/PurlinAndGirt';
import BracketLibrary from './Libraries/Bracket';
import BargeCappingLibrary from './Libraries/BargeCapping';
import JambLibrary from './Libraries/Jamb';
import DoorLibrary from './Libraries/Door';
import WindowLibrary from './Libraries/Window';
import PanelLibrary from './Libraries/Panel';
import GutterLibrary from './Libraries/Gutter';
import FlashingLibrary from './Libraries/Flashing';
import BasePlateLibrary from './Libraries/BasePlate';
import BrigingApexPlateLibrary from './Libraries/BrigingApexPlate';
import AwningLibrary from './Libraries/Awning';

import Drawing3DLibrariesToolbar from '../containers/Toolbar/Drawing3DLibrariesToolbar';
import RandomBracketFiltersComponent from '../components/Toolbar/Drawing3DToolbar/RandomBracketFilters';
import { 
    APEX_PLATE_SAMPLES, KNEE_PLATE_CARPORT_GABLE_SAMPLES, KNEE_PLATE_CARPORT_SKILLION_SAMPLES,
    KNEE_PLATE_FRAME_TOPHAT_SAMPLES, KNEE_PLATE_FRAME_ZSECTION_SAMPLES, KNEE_PLATE_ROLLER_DOOR_TOPHAT_SAMPLES,
    KNEE_PLATE_ROLLER_DOOR_ZSECTION_SAMPLES, LATERAL_KNEE_BRACE_SAMPLES, OTHER_BRACKET_SAMPLES,
    FLASHING_SAMPLES, BASE_PLATE_SAMPLES, 
    BRIGING_APEX_PLATE_SINGLE_SECTIONS_TOP_HAT_SAMPLES, BRIGING_APEX_PLATE_SINGLE_SECTIONS_Z_SECTION_SAMPLES,
    BRIGING_APEX_PLATE_DOUBLE_SECTIONS_TOP_HAT_SAMPLES, BRIGING_APEX_PLATE_DOUBLE_SECTIONS_Z_SECTION_SAMPLES
} from '../constants2';

import {
    AWNING_DAB_SAMPLES, AWNING_IAB_SAMPLES
} from '../constants3';

let engine, scene, camera, gui;
let newMesh, rollerDoorMesh, windowMesh;
let bracketSampleMeshes = [], bracketSampleLabels = [];
let highlightMat, normalMat;
let attributionLine = new GUI.TextBlock();
let lblObjectName = new GUI.TextBlock();
let lblObjectDetail = new GUI.TextBlock();

class Drawing3DLibraries extends Component {
    componentDidMount = async() => {
        engine = new BABYLON.Engine(this.canvas, true, {preserveDrawingBuffer: true, stencil: true});
        scene = new BABYLON.Scene(engine);
        scene.useRightHandedSystem = true;
        scene.clearColor = new BABYLON.Color3(0.31, 0.48, 0.64);

        let upperHemisphericLight = new BABYLON.HemisphericLight("upper-light", new BABYLON.Vector3(0, 0, 3000), scene);
        let lowerHemisphericLight =  new BABYLON.HemisphericLight("lower-light", new BABYLON.Vector3(0, 0, -3000), scene);

        camera = new BABYLON.ArcRotateCamera("camera", 0, 0.8, 2000, new BABYLON.Vector3(0, 0, 0), scene);
        camera.setPosition(new BABYLON.Vector3(-50, -11, 18).scale(2));
        camera.upVector = new BABYLON.Vector3(0, 0, 1);
        camera.attachControl(this.canvas, true);
        camera.wheelPrecision = 1; // 0.1

        this.createUI();
        this.showAxis(1000);  

        this.handleSelectedMesh();

        // // Test - New extrude box jamp
        // let newMesh = JambLibrary.ExtrudeBoxJamb2("mesh", {width: 20, length: 80, thickness: 2, R: 4,}, scene);

        // newMesh.rotation.x = Math.PI/2;
        // newMesh.position.z = -40;
        // newMesh.enableEdgesRendering();
        // newMesh.edgesWidth = 40;
        // newMesh.edgesColor = new BABYLON.Color4(1, 0, 0, 1);
        // if(newMesh.edgesRenderer) {
        //     let childrenMesh = newMesh.getChildMeshes();
        //     childrenMesh.forEach(item => {
        //         item.enableEdgesRendering();
        //         item.edgesWidth = 40;
        //         item.edgesColor = new BABYLON.Color4(1, 0, 0, 1);
        //     })
        // }

        // newMesh.material = new BABYLON.StandardMaterial("", scene);
        // newMesh.material.diffuseColor = new BABYLON.Color3.Blue();

        engine.runRenderLoop(() => {
            scene.render();
        });
    }

    componentDidUpdate(prevProps) {
        let {purlinAndGirtFormData, wallCladdingFormData, bracketFormData} = this.props;

        if((prevProps.purlinAndGirtFormData && purlinAndGirtFormData.purlinGirtSection !== prevProps.purlinAndGirtFormData.purlinGirtSection)
        ) {
            newMesh = PurlinAndGirt.CreateNewPurlinAndGirt(purlinAndGirtFormData, scene);
            this.displayPurlinAndGirtParameters();
        }

        const { 
            apexPlateBracketSelected, kneePlateCarportGableSelected, kneePlateCarportSkillionSelected, kneePlateFrameTophatSelected,
            kneePlateFrameZSectionSelected, kneePlateRollerDoorTophatSelected, kneePlateRollerDoorZSectionSelected, 
            lateralKneeBraceSelected, otherBracketSelected
        } = this.props;

        let findABracketSample, code;

        switch(bracketFormData) {
            case "APEX-PLATE":
                findABracketSample = APEX_PLATE_SAMPLES[apexPlateBracketSelected];
                code = apexPlateBracketSelected;
                break;

            case "KNEE-PLATE-CARPORT-GABLE":
                findABracketSample = KNEE_PLATE_CARPORT_GABLE_SAMPLES[kneePlateCarportGableSelected];
                code = kneePlateCarportGableSelected;
                break;

            case "KNEE-PLATE-CARPORT-SKILLION":
                findABracketSample = KNEE_PLATE_CARPORT_SKILLION_SAMPLES[kneePlateCarportSkillionSelected];
                code = kneePlateCarportSkillionSelected;
                break;

            case "KNEE-PLATE-FRAME-TOPHAT":
                findABracketSample = KNEE_PLATE_FRAME_TOPHAT_SAMPLES[kneePlateFrameTophatSelected];
                code = kneePlateFrameTophatSelected;
                break;

            case "KNEE-PLATE-FRAME-ZSECTION":
                findABracketSample = KNEE_PLATE_FRAME_ZSECTION_SAMPLES[kneePlateFrameZSectionSelected];
                code = kneePlateFrameZSectionSelected;
                break;

            case "KNEE-PLATE-ROLLER-DOOR-TOPHAT":
                findABracketSample = KNEE_PLATE_ROLLER_DOOR_TOPHAT_SAMPLES[kneePlateRollerDoorTophatSelected];
                code = kneePlateRollerDoorTophatSelected;
                break;

            case "KNEE-PLATE-ROLLER-DOOR-ZSECTION":
                findABracketSample = KNEE_PLATE_ROLLER_DOOR_ZSECTION_SAMPLES[kneePlateRollerDoorZSectionSelected];
                code = kneePlateRollerDoorZSectionSelected;
                break;

            case "LATERAL-KNEE-BRACE":
                findABracketSample = LATERAL_KNEE_BRACE_SAMPLES[lateralKneeBraceSelected];
                code = lateralKneeBraceSelected;
                break;

            case "OTHER-BRACKET":
                findABracketSample = OTHER_BRACKET_SAMPLES[otherBracketSelected];
                code = otherBracketSelected;
                break;
        }

        if(findABracketSample) {
            let { type, direction, panel, holes } = findABracketSample;
            if(newMesh) newMesh.dispose();

            switch(type) {
                case "NSZAP":
                    newMesh = BracketLibrary.NSZAP(code, panel, holes, scene);
                    break;

                case "NSCKP":
                    newMesh = BracketLibrary.NSCKP(code, direction, panel, holes, scene);
                    break;

                case "NSKP":
                    newMesh = BracketLibrary.NSKP(code, direction, panel, holes, scene);
                    break;

                case "NSCKP_SKILLION":
                    newMesh = BracketLibrary.NSCKP_SKILLION(code, direction, panel, holes, scene);
                    break;

                case "NSCKP_DEC_SKILLION":
                    newMesh = BracketLibrary.NSCKP_DEC_SKILLION(code, direction, panel, holes, scene);
                    break;

                case "NSKP_SKILLION":
                    newMesh = BracketLibrary.NSKP_SKILLION(code, direction, panel, holes, scene);
                    break;

                case "NSKP_DEC_SKILLION":
                    newMesh = BracketLibrary.NSKP_DEC_SKILLION(code, direction, panel, holes, scene);
                    break;

                case "NSTKP":
                    newMesh = BracketLibrary.NSTKP(code, direction, panel, holes, scene);
                    break;

                case "NSTKP_DEC":
                    newMesh = BracketLibrary.NSTKP_DEC(code, direction, panel, holes, scene);
                    break;

                case "NSZKP":
                    newMesh = BracketLibrary.NSZKP(code, direction, panel, holes, scene);
                    break;

                case "NSZKP_DEC":
                    newMesh = BracketLibrary.NSZKP_DEC(code, direction, panel, holes, scene);
                    break;

                case "NSTRKP":
                    newMesh = BracketLibrary.NSTRKP(code, direction, panel, holes, scene);
                    break;

                case "NSTRKP_DEC":
                    newMesh = BracketLibrary.NSTRKP_DEC(code, direction, panel, holes, scene);
                    break;

                case "NSZRKP":
                    newMesh = BracketLibrary.NSZRKP(code, direction, panel, holes, scene);
                    break;

                case "NSZRKP_DEC":
                    newMesh = BracketLibrary.NSZRKP_DEC(code, direction, panel, holes, scene);
                    break;

                // Lateral Knee Brace
                case "LDB":
                    newMesh = BracketLibrary.LDB(code, panel, holes, scene);
                    break;

                case "LSB":
                    newMesh = BracketLibrary.LSB(code, direction, panel, holes, scene);
                break;

                case "LSB2":
                    newMesh = BracketLibrary.LSB2(code, direction, panel, holes, scene);
                    break;

                case "CPLKB":
                    newMesh = BracketLibrary.CPLKB(code, panel, holes, scene);
                    break;

                // Other Bracket
                case "GPB":
                    newMesh = BracketLibrary.GPB(code, direction, panel, holes, scene);
                    break;

                case "GPB_B2":
                    newMesh = BracketLibrary.GPB_B2(code, direction, panel, holes, scene);
                    break;
    
                case "GPB_B3":
                    newMesh = BracketLibrary.GPB_B3(code, panel, holes, scene);
                    break;
                    
                case "GPB_B4":
                    newMesh = BracketLibrary.GPB_B4(code, panel, holes, scene);
                    break;

                case "BP":
                    newMesh = BracketLibrary.BP(code, panel, holes, scene);
                    break;

                case "FSP":
                    newMesh = BracketLibrary.FSP(code, panel, holes, scene);
                    break;

                case "BRK_EP1":
                    newMesh = BracketLibrary.BRK_EP1(code, panel, holes, scene);
                    break;

                case "BRK_EP2":
                    newMesh = BracketLibrary.BRK_EP2(code, panel, holes, scene);
                    break;

                case "ZFB":
                    newMesh = BracketLibrary.ZFB(code, panel, scene);
                    break;

                case "CFB":
                    newMesh = BracketLibrary.CFB(code, panel, scene);
                    break;

                case "CBG":
                    newMesh = BracketLibrary.CBG(code, panel, scene);
                    break;

                case "BKB":
                    newMesh = BracketLibrary.BKB(code, direction, panel, holes, scene);
                    break;

                case "TKB":
                    newMesh = BracketLibrary.TKB(code, direction, panel, holes, scene);
                    break;

                case "RDC200":
                    newMesh = BracketLibrary.RDC200(code, direction, panel, holes, scene);
                    break;

                case "CRWS":
                    newMesh = BracketLibrary.CRWS(code, panel, holes, scene);
                    break;

                case "CTB":
                    newMesh = BracketLibrary.CTB(code, direction, panel, holes, scene);
                    break;

                default:
                    break;
            }

            lblObjectName.text = code + " ( " + type + " ) ";
            lblObjectDetail.text = "panel: " + JSON.stringify(panel);

            this.props.doSetBracketDrawing(findABracketSample);
        }

        //*** Flashing Samples */
        const { flashingSelected } = this.props;
        let findAFlashingSample = FLASHING_SAMPLES[flashingSelected];
        code = flashingSelected;

        if(findAFlashingSample) {
            let { type, direction, panel } = findAFlashingSample;
            if(newMesh) newMesh.dispose();

            switch(type) {
                case "NSCF":
                    newMesh = FlashingLibrary.NSCF(code, direction, panel, scene);
                    break;

                case "NSGIF":
                    newMesh = FlashingLibrary.NSGIF(code, direction, panel, scene);
                    break; 

                case "NSHCF":
                    newMesh = FlashingLibrary.NSHCF(code, direction, panel, scene);
                    break; 

                case "NSHCF_RD":
                    newMesh = FlashingLibrary.NSHCF_RD(code, direction, panel, scene);
                    break; 

                case "NSHCF_TCV":
                    newMesh = FlashingLibrary.NSHCF_TCV(code, direction, panel, scene);
                    break; 

                case "NSHOF":
                    newMesh = FlashingLibrary.NSHOF(code, direction, panel, scene);
                    break; 

                case "NSICF":
                    newMesh = FlashingLibrary.NSICF(code, direction, panel, scene);
                    break; 

                case "NSOF":
                    newMesh = FlashingLibrary.NSOF(code, direction, panel, scene);
                    break; 

                case "NS_J":
                    newMesh = FlashingLibrary.NS_J(code, direction, panel, scene);
                    break; 
                    
                default:
                    break;
            }

            lblObjectName.text = code + " ( " + type + " ) ";
            lblObjectDetail.text = "panel: " + JSON.stringify(panel);

            this.props.doSetFlashingDrawing(findAFlashingSample);
        }

        //** Base Plate Samples */
        const { basePlateSelected } = this.props;
        let findABasePlateSample = BASE_PLATE_SAMPLES[basePlateSelected];
        code = basePlateSelected;

        if(findABasePlateSample) {
            let { type, panel, holes } = findABasePlateSample;
            if(newMesh) newMesh.dispose();

            switch(type) {
                case "NSBPC":
                    newMesh = BasePlateLibrary.NSBPC(code, panel, holes, scene);
                    break;

                case "NSBP":
                    newMesh = BasePlateLibrary.NSBP(code, panel, holes, scene);
                    break; 

                case "NSBPI":
                    newMesh = BasePlateLibrary.NSBPI(code, panel, holes, scene);
                    break; 

                case "NSBPI_2":
                    newMesh = BasePlateLibrary.NSBPI_2(code, panel, holes, scene);
                    break; 

                case "NSBP_P":
                    newMesh = BasePlateLibrary.NSBP_P(code, panel, holes, scene);
                    break; 

                case "NSBP_P2":
                    newMesh = BasePlateLibrary.NSBP_P2(code, panel, holes, scene);
                    break; 

                case "NSBP_P125":
                    newMesh = BasePlateLibrary.NSBP_P125(code, panel, holes, scene);
                    break; 

                case "NSBP_P125_2":
                    newMesh = BasePlateLibrary.NSBP_P125_2(code, panel, holes, scene);
                    break; 

                case "NSBP_P125_4":
                    newMesh = BasePlateLibrary.NSBP_P125_4(code, panel, holes, scene);
                    break; 

                case "CPT_100A":
                    newMesh = BasePlateLibrary.CPT_100A(code, panel, holes, scene);
                    break; 

                case "CPT_125A":
                    newMesh = BasePlateLibrary.CPT_125A(code, panel, holes, scene);
                    break; 

                case "CPB_100":
                    newMesh = BasePlateLibrary.CPB_100(code, panel, holes, scene);
                    break; 

                case "CPB_100A":
                    newMesh = BasePlateLibrary.CPB_100A(code, panel, holes, scene);
                    break; 

                case "CPB_125":
                    newMesh = BasePlateLibrary.CPB_125(code, panel, holes, scene);
                    break; 
                    
                default:
                    break;
            }

            lblObjectName.text = code + " ( " + type + " ) ";
            lblObjectDetail.text = "panel: " + JSON.stringify(panel);

            this.props.doSetBasePlateDrawing(findABasePlateSample);
        }

        //** Briging Apex Plate Samples */
        const { 
            brigingApexPlateSSTopHatSelected, brigingApexPlateSSZSectionSelected, 
            brigingApexPlateDSTopHatSelected, brigingApexPlateDSZSectionSelected 
        } = this.props;

        let findABrigingApexSample; 
        
        if(brigingApexPlateSSTopHatSelected !== prevProps.brigingApexPlateSSTopHatSelected) {
            findABrigingApexSample = BRIGING_APEX_PLATE_SINGLE_SECTIONS_TOP_HAT_SAMPLES[brigingApexPlateSSTopHatSelected];
            code = brigingApexPlateSSTopHatSelected;
        } else if(brigingApexPlateSSZSectionSelected !== prevProps.brigingApexPlateSSZSectionSelected) {
            findABrigingApexSample = BRIGING_APEX_PLATE_SINGLE_SECTIONS_Z_SECTION_SAMPLES[brigingApexPlateSSZSectionSelected];
            code = brigingApexPlateSSZSectionSelected;
        } else if(brigingApexPlateDSTopHatSelected !== prevProps.brigingApexPlateDSTopHatSelected) {
            findABrigingApexSample = BRIGING_APEX_PLATE_DOUBLE_SECTIONS_TOP_HAT_SAMPLES[brigingApexPlateDSTopHatSelected];
            code = brigingApexPlateDSTopHatSelected;
        } else if(brigingApexPlateDSZSectionSelected !== prevProps.brigingApexPlateDSZSectionSelected) {
            findABrigingApexSample = BRIGING_APEX_PLATE_DOUBLE_SECTIONS_Z_SECTION_SAMPLES[brigingApexPlateDSZSectionSelected];
            code = brigingApexPlateDSZSectionSelected;
        }

        if(findABrigingApexSample) {
            let { type, panel, holes } = findABrigingApexSample;
            if(newMesh) newMesh.dispose();

            switch(type) {
                case "APBR":
                    newMesh = BrigingApexPlateLibrary.APBR(code, panel, holes, scene);
                    break;

                case "APDBR":
                    newMesh = BrigingApexPlateLibrary.APDBR(code, panel, holes, scene);
                    break;

                default:
                    break;
            }

            lblObjectName.text = code + " ( " + type + " ) ";
            lblObjectDetail.text = "panel: " + JSON.stringify(panel);

            this.props.doSetBrigingApexPlateDrawing(findABrigingApexSample);
        }

        //** Awning DAB Samples */
        const { awningDABSelected } = this.props;

        let findAnAwningDABSample; 
        if(awningDABSelected !== prevProps.awningDABSelected) {
            findAnAwningDABSample = AWNING_DAB_SAMPLES[awningDABSelected];
            code = awningDABSelected;
        } 

        if(findAnAwningDABSample) {
            let { type, panel, holes } = findAnAwningDABSample;
            if(newMesh) newMesh.dispose();

            switch(type) {
                case "DAB":
                    newMesh = AwningLibrary.DAB(code, panel, holes, scene);
                    break;

                default:
                    break;
            }

            lblObjectName.text = code + " ( " + type + " ) ";
            lblObjectDetail.text = "panel: " + JSON.stringify(panel);

            this.props.doSetAwningDrawing(findAnAwningDABSample);
        }

        //** Awning IAB Samples */
        const { awningIABSelected } = this.props;

        let findAnAwningIABSample; 
        if(awningIABSelected !== prevProps.awningIABSelected) {
            findAnAwningIABSample = AWNING_IAB_SAMPLES[awningIABSelected];
            code = awningIABSelected;
        } 

        if(findAnAwningIABSample) {
            let { type, direction, panel, holes } = findAnAwningIABSample;
            if(newMesh) newMesh.dispose();

            switch(type) {
                case "IAB":
                    newMesh = AwningLibrary.IAB(code, direction, panel, holes, scene);
                    break;

                case "IAB2":
                    newMesh = AwningLibrary.IAB2(code, panel, holes, scene);
                    break;

                default:
                    break;
            }

            lblObjectName.text = code + " ( " + type + " ) ";
            lblObjectDetail.text = "panel: " + JSON.stringify(panel);

            this.props.doSetAwningDrawing(findAnAwningIABSample);
        }

        //*** Highlight Bracket Samples
        const { searchBracketSampleMesh } = this.props;
        if(searchBracketSampleMesh !== prevProps.searchBracketSampleMesh) {
            let findListHighlightMeshes = bracketSampleMeshes.filter(item => item.material.name === "highlightMat");
            if(findListHighlightMeshes.length > 0) {
                findListHighlightMeshes.map(item => item.material = normalMat);
            }

            let findListBracketSampleMesh = bracketSampleMeshes.filter(item => item.name === searchBracketSampleMesh);
            if(findListBracketSampleMesh.length > 0) {
                findListBracketSampleMesh.map(item => {
                    item.material = highlightMat;
                });
            } else {
                alert("can't find bracket '" + searchBracketSampleMesh + "'")
            }
        }
    }

    generateBracketMeshes = () => {
        const DISTANCE = 1000;
        const BRACKET_SAMPLES = [
            // APEX_PLATE_SAMPLES, KNEE_PLATE_CARPORT_GABLE_SAMPLES, KNEE_PLATE_CARPORT_SKILLION_SAMPLES, KNEE_PLATE_FRAME_TOPHAT_SAMPLES,
            // KNEE_PLATE_FRAME_ZSECTION_SAMPLES, KNEE_PLATE_ROLLER_DOOR_TOPHAT_SAMPLES, KNEE_PLATE_ROLLER_DOOR_ZSECTION_SAMPLES,
            // LATERAL_KNEE_BRACE_SAMPLES, OTHER_BRACKET_SAMPLES, FLASHING_SAMPLES, BASE_PLATE_SAMPLES, 
            // BRIGING_APEX_PLATE_SINGLE_SECTIONS_TOP_HAT_SAMPLES, BRIGING_APEX_PLATE_SINGLE_SECTIONS_Z_SECTION_SAMPLES,
            // BRIGING_APEX_PLATE_DOUBLE_SECTIONS_TOP_HAT_SAMPLES, BRIGING_APEX_PLATE_DOUBLE_SECTIONS_Z_SECTION_SAMPLES,
            AWNING_DAB_SAMPLES, AWNING_IAB_SAMPLES
        ];

        BRACKET_SAMPLES.map(BRACKET_SAMPLE => {
            const listBracketSampleCode = Object.keys(BRACKET_SAMPLE).map(key => key);

            for(let i = 0; i < 15; i++) {
                let randomNum = Math.floor(Math.random()*5);
                let code = listBracketSampleCode[randomNum];
                let { type, direction, panel, holes } = BRACKET_SAMPLE[code];
                let _signNum = Math.floor(Math.random()*3) + -1;
                let _newBracketMesh;

                switch(type) {
                    case "NSZAP":
                        _newBracketMesh = BracketLibrary.NSZAP(code, panel, holes, scene);
                        break;
    
                    case "NSCKP":
                        _newBracketMesh = BracketLibrary.NSCKP(code, direction, panel, holes, scene);
                        break;
    
                    case "NSKP":
                        _newBracketMesh = BracketLibrary.NSKP(code, direction, panel, holes, scene);
                        break;
    
                    case "NSCKP_SKILLION":
                        _newBracketMesh = BracketLibrary.NSCKP_SKILLION(code, direction, panel, holes, scene);
                        break;
    
                    case "NSCKP_DEC_SKILLION":
                        _newBracketMesh = BracketLibrary.NSCKP_DEC_SKILLION(code, direction, panel, holes, scene);
                        break;
    
                    case "NSKP_SKILLION":
                        _newBracketMesh = BracketLibrary.NSKP_SKILLION(code, direction, panel, holes, scene);
                        break;
    
                    case "NSKP_DEC_SKILLION":
                        _newBracketMesh = BracketLibrary.NSKP_DEC_SKILLION(code, direction, panel, holes, scene);
                        break;
    
                    case "NSTKP":
                        _newBracketMesh = BracketLibrary.NSTKP(code, direction, panel, holes, scene);
                        break;
    
                    case "NSTKP_DEC":
                        _newBracketMesh = BracketLibrary.NSTKP_DEC(code, direction, panel, holes, scene);
                        break;
    
                    case "NSZKP":
                        _newBracketMesh = BracketLibrary.NSZKP(code, direction, panel, holes, scene);
                        break;
    
                    case "NSZKP_DEC":
                        _newBracketMesh = BracketLibrary.NSZKP_DEC(code, direction, panel, holes, scene);
                        break;
    
                    case "NSTRKP":
                        _newBracketMesh = BracketLibrary.NSTRKP(code, direction, panel, holes, scene);
                        break;
    
                    case "NSTRKP_DEC":
                        _newBracketMesh = BracketLibrary.NSTRKP_DEC(code, direction, panel, holes, scene);
                        break;
    
                    case "NSZRKP":
                        _newBracketMesh = BracketLibrary.NSZRKP(code, direction, panel, holes, scene);
                        break;
    
                    case "NSZRKP_DEC":
                        _newBracketMesh = BracketLibrary.NSZRKP_DEC(code, direction, panel, holes, scene);
                        break;
    
                    // Lateral Knee Brace
                    case "LDB":
                        _newBracketMesh = BracketLibrary.LDB(code, panel, holes, scene);
                        break;
    
                    case "LSB":
                        _newBracketMesh = BracketLibrary.LSB(code, direction, panel, holes, scene);
                    break;
    
                    case "LSB2":
                        _newBracketMesh = BracketLibrary.LSB2(code, direction, panel, holes, scene);
                        break;
    
                    case "CPLKB":
                        _newBracketMesh = BracketLibrary.CPLKB(code, panel, holes, scene);
                        break;
    
                    // Other Bracket
                    case "GPB":
                        _newBracketMesh = BracketLibrary.GPB(code, direction, panel, holes, scene);
                        break;
    
                    case "GPB_B2":
                        _newBracketMesh = BracketLibrary.GPB_B2(code, direction, panel, holes, scene);
                        break;
        
                    case "GPB_B3":
                        _newBracketMesh = BracketLibrary.GPB_B3(code, panel, holes, scene);
                        break;
                        
                    case "GPB_B4":
                        _newBracketMesh = BracketLibrary.GPB_B4(code, panel, holes, scene);
                        break;
    
                    case "BP":
                        _newBracketMesh = BracketLibrary.BP(code, panel, holes, scene);
                        break;
    
                    case "FSP":
                        _newBracketMesh = BracketLibrary.FSP(code, panel, holes, scene);
                        break;
    
                    case "BRK_EP1":
                        _newBracketMesh = BracketLibrary.BRK_EP1(code, panel, holes, scene);
                        break;
    
                    case "BRK_EP2":
                        _newBracketMesh = BracketLibrary.BRK_EP2(code, panel, holes, scene);
                        break;
    
                    case "ZFB":
                        _newBracketMesh = BracketLibrary.ZFB(code, panel, scene);
                        break;
    
                    case "CFB":
                        _newBracketMesh = BracketLibrary.CFB(code, panel, scene);
                        break;
    
                    case "CBG":
                        _newBracketMesh = BracketLibrary.CBG(code, panel, scene);
                        break;
    
                    case "BKB":
                        _newBracketMesh = BracketLibrary.BKB(code, direction, panel, holes, scene);
                        break;
    
                    case "TKB":
                        _newBracketMesh = BracketLibrary.TKB(code, direction, panel, holes, scene);
                        break;
    
                    case "RDC200":
                        _newBracketMesh = BracketLibrary.RDC200(code, direction, panel, holes, scene);
                        break;
    
                    case "CRWS":
                        _newBracketMesh = BracketLibrary.CRWS(code, panel, holes, scene);
                        break;
    
                    case "CTB":
                        _newBracketMesh = BracketLibrary.CTB(code, direction, panel, holes, scene);
                        break;
    
                    case "NSCF":
                        _newBracketMesh = FlashingLibrary.NSCF(code, direction, panel, scene);
                        break;
    
                    case "NSGIF":
                        _newBracketMesh = FlashingLibrary.NSGIF(code, direction, panel, scene);
                        break; 
    
                    case "NSHCF":
                        _newBracketMesh = FlashingLibrary.NSHCF(code, direction, panel, scene);
                        break; 
    
                    case "NSHCF_RD":
                        _newBracketMesh = FlashingLibrary.NSHCF_RD(code, direction, panel, scene);
                        break; 
    
                    case "NSHCF_TCV":
                        _newBracketMesh = FlashingLibrary.NSHCF_TCV(code, direction, panel, scene);
                        break; 
    
                    case "NSHOF":
                        _newBracketMesh = FlashingLibrary.NSHOF(code, direction, panel, scene);
                        break; 
    
                    case "NSICF":
                        _newBracketMesh = FlashingLibrary.NSICF(code, direction, panel, scene);
                        break; 
    
                    case "NSOF":
                        _newBracketMesh = FlashingLibrary.NSOF(code, direction, panel, scene);
                        break; 
    
                    case "NS_J":
                        _newBracketMesh = FlashingLibrary.NS_J(code, direction, panel, scene);
                        break; 

                    case "NSBPC":
                        _newBracketMesh = BasePlateLibrary.NSBPC(code, panel, holes, scene);
                        break;

                    case "NSBP":
                        _newBracketMesh = BasePlateLibrary.NSBP(code, panel, holes, scene);
                        break; 

                    case "NSBPI":
                        _newBracketMesh = BasePlateLibrary.NSBPI(code, panel, holes, scene);
                        break; 

                    case "NSBPI_2":
                        _newBracketMesh = BasePlateLibrary.NSBPI_2(code, panel, holes, scene);
                        break; 

                    case "NSBP_P":
                        _newBracketMesh = BasePlateLibrary.NSBP_P(code, panel, holes, scene);
                        break; 

                    case "NSBP_P2":
                        _newBracketMesh = BasePlateLibrary.NSBP_P2(code, panel, holes, scene);
                        break; 

                    case "NSBP_P125":
                        _newBracketMesh = BasePlateLibrary.NSBP_P125(code, panel, holes, scene);
                        break; 

                    case "NSBP_P125_2":
                        _newBracketMesh = BasePlateLibrary.NSBP_P125_2(code, panel, holes, scene);
                        break; 

                    case "NSBP_P125_4":
                        _newBracketMesh = BasePlateLibrary.NSBP_P125_4(code, panel, holes, scene);
                        break; 

                    case "CPT_100A":
                        _newBracketMesh = BasePlateLibrary.CPT_100A(code, panel, holes, scene);
                        break; 

                    case "CPT_125A":
                        _newBracketMesh = BasePlateLibrary.CPT_125A(code, panel, holes, scene);
                        break; 

                    case "CPB_100":
                        _newBracketMesh = BasePlateLibrary.CPB_100(code, panel, holes, scene);
                        break; 

                    case "CPB_100A":
                        _newBracketMesh = BasePlateLibrary.CPB_100A(code, panel, holes, scene);
                        break; 

                    case "CPB_125":
                        _newBracketMesh = BasePlateLibrary.CPB_125(code, panel, holes, scene);
                        break;

                    case "APBR":
                        _newBracketMesh = BrigingApexPlateLibrary.APBR(code, panel, holes, scene);
                        break;
    
                    case "APDBR":
                        _newBracketMesh = BrigingApexPlateLibrary.APDBR(code, panel, holes, scene);
                        break;

                    case "DAB":
                        _newBracketMesh = AwningLibrary.DAB(code, panel, holes, scene);
                        break;

                    case "IAB":
                        _newBracketMesh = AwningLibrary.IAB(code, direction, panel, holes, scene);
                        break;
                        
                    case "IAB2":
                        _newBracketMesh = AwningLibrary.IAB2(code, panel, holes, scene);
                        break;

                    default:
                        break;
                }

                if(_newBracketMesh) {
                    _newBracketMesh.position = new BABYLON.Vector3(
                        _signNum*Math.floor(Math.random()*DISTANCE), 
                        _signNum*Math.floor(Math.random()*DISTANCE), 
                        _signNum*Math.floor(Math.random()*DISTANCE), 
                    );
                    bracketSampleMeshes.push(_newBracketMesh);

                    let _newBracketLabel = this.createBracketSampleLabels(_newBracketMesh.name);
                    _newBracketLabel.position.x = _newBracketMesh.position.x;
                    _newBracketLabel.position.y = _newBracketMesh.position.y - 20;
                    _newBracketLabel.position.z = _newBracketMesh.position.z;

                    bracketSampleLabels.push(_newBracketLabel);
                }
            }
        });
    }

    displayPurlinAndGirtParameters = () => {
        let {purlinGirtSectionType, rollForm, purlinGirtSection} = this.props.purlinAndGirtFormData || {};
        let findPurlinGirtSection;

        switch(purlinGirtSectionType) {
            case 1: 
                findPurlinGirtSection = PURLIN_GIRT_C_SECTIONS[rollForm].find(item => item.purlinGirtCode === purlinGirtSection);
                if(!findPurlinGirtSection) {
                    return;
                }
                else {
                    let {purlinGirtCode, D, B, L, t} = findPurlinGirtSection;

                    attributionLine.text = "National Sheds & Shelter";
                    lblObjectName.text = rollForm + " - " + purlinGirtCode;
                    lblObjectDetail.text = "D: " + D + "\nB: " + B + "\nL :" + L + "\nt: " + t;
                }
                break;
            
            case 2:
                findPurlinGirtSection = PURLIN_GIRT_Z_SECTIONS[rollForm].find(item => item.purlinGirtCode === purlinGirtSection);
                if(!findPurlinGirtSection) {
                    return;
                } else {                   
                    let {purlinGirtCode, D, E, F, L, t} = findPurlinGirtSection;

                    attributionLine.text = "National Sheds & Shelter";
                    lblObjectName.text = rollForm + " - " + purlinGirtCode;
                    lblObjectDetail.text = "D: " + D + "\nE: " + E + "\nF: " + F + "\nL :" + L + "\nt: " + t;
                }
                break;

            case 3:
                findPurlinGirtSection = PURLIN_GIRT_TS_SECTIONS[rollForm].find(item => item.purlinGirtCode === purlinGirtSection);
                if(!findPurlinGirtSection) {
                    return;
                } else {
                    let {purlinGirtCode, width, height, thickness, tLow, tHeight} = findPurlinGirtSection;

                    attributionLine.text = "National Sheds & Shelter";
                    lblObjectName.text = rollForm + " - " + purlinGirtCode;
                    lblObjectDetail.text = "Width: " + width + "\n" + "Height: " + height + "\n" + "Thickness: " + thickness + "\n" + "T Low: " + tLow + "\n" + "T Height: " + tHeight;
                }
                break;

            default:
                break;
        }
    }

    createBracketSampleLabels = (text, textColor = "#1428B0") => {
        let planeWidth = 800;
        let planeHeight = 100;
        let DTWidth = planeWidth;
        let DTHeight = planeHeight;

        let plane = BABYLON.MeshBuilder.CreatePlane("plane-text", {width: planeWidth, height: planeHeight}, scene);
        plane.position.x = planeWidth/2;
        plane.rotation.x = Math.PI/2;

        let dynamicTexture = new BABYLON.DynamicTexture("dynamic texture", {width: DTWidth, height: DTHeight}, scene);   
        dynamicTexture.hasAlpha = true;
        
        let mat = new BABYLON.StandardMaterial("Mat", scene);    				
        mat.diffuseTexture = dynamicTexture;
        mat.backFaceCulling = false;
        
        dynamicTexture.drawText(text, 0, 60, "40px Arial", textColor, "transparent", true, true);

        plane.material = mat;
        return plane;
    }

    createUI = () => {
        const uiTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        attributionLine.color = "#f4511e";
        attributionLine.fontSize = 24;
        attributionLine.top = "-45%";
        attributionLine.text = "National Sheds & Shelter";
        uiTexture.addControl(attributionLine);

        // Create top line of text
        const topLine = new GUI.TextBlock();
        topLine.color = "white";
        topLine.fontSize = 24;
        topLine.top = "-38%";
        uiTexture.addControl(topLine);

        // Create left line of text 
        lblObjectName.color = "#76ff03";
        lblObjectName.fontSize = 24;
        lblObjectName.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        lblObjectName.left = "2%";
        lblObjectName.top = "-32%";
        uiTexture.addControl(lblObjectName);

        lblObjectDetail.color = "white";
        lblObjectDetail.fontSize = 18;
        lblObjectDetail.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        lblObjectDetail.left = "2%";
        lblObjectDetail.top = "-27%";
        uiTexture.addControl(lblObjectDetail);

        let uiPanel = new GUI.StackPanel();
        uiPanel.left = "20px";
        uiPanel.top = "20px";
        uiPanel.width = "80px";
        uiPanel.fontSize = "14px";
        uiPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        uiPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        uiTexture.addControl(uiPanel);
    }

    makeTextPlane = (text, color, size) => {
        var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
        dynamicTexture.hasAlpha = true;
        dynamicTexture.drawText(text, 5, 40, "bold 48px Arial", color, "transparent", true, true);
        var plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
        plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
        plane.material.backFaceCulling = false;
        plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
        plane.material.diffuseTexture = dynamicTexture;
        return plane;
    }

    showAxis = (size) => {
        let axisX = BABYLON.Mesh.CreateLines("axisX", [
            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), 
            new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
        ], scene);

        axisX.color = new BABYLON.Color3(1,0,0);
        let xChar = this.makeTextPlane("X", "red", size/10);
        xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);

        let axisY = BABYLON.Mesh.CreateLines("axisY", [
            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, 0.95 * size, 0), 
            new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(size * 0.05, 0.95 * size, 0)
        ], scene);

        axisY.color = new BABYLON.Color3(0, 1, 0);
        let yChar = this.makeTextPlane("Y", "green", size/10);
        yChar.position = new BABYLON.Vector3(0, 0.95 * size, -0.05 * size);

        let axisZ = BABYLON.Mesh.CreateLines("axisZ", [
            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, 0.95 * size), 
            new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, size * 0.05, 0.95 * size)
        ], scene);

        axisZ.color = new BABYLON.Color3(0, 0, 1);
        let zChar = this.makeTextPlane("Z", "blue", size/10);
        zChar.position = new BABYLON.Vector3(0,  0.05 * size, 0.9 * size);
    }

    handleSelectedMesh = () => {
        this.canvas.addEventListener("dblclick", function(e) {
            var pickResult = scene.pick(scene.pointerX, scene.pointerY);
            if(pickResult.hit) {
                if(pickResult.pickedMesh)
                    camera.setTarget(pickResult.pickedMesh);
            }
        });
    }

    handleGenerateRandomBrackets = (evt) => {
        if(bracketSampleMeshes.length > 0){
            bracketSampleMeshes.map(item => item.dispose());
        }
        bracketSampleMeshes = [];

        if(bracketSampleLabels.length > 0){
            bracketSampleLabels.map(item => item.dispose());
        }
        bracketSampleLabels = [];

        this.generateBracketMeshes();
    }

    generateBoltAndNut = async(evt) => {
        const { distanceBoltHeadAndBottomWasher, position, rotate } = this.props.boltAndNutFormData;

        let boltMesh = await this.generateBolt();
        
        let topWasherMesh = await this.generateWasher();

        let bottomWasherMesh = await this.generateWasher(); 
        bottomWasherMesh.position.x += distanceBoltHeadAndBottomWasher;
        
        let nutMesh =  await this.generateNut();
        // 3 is thickness of wahser
        nutMesh.position.x += distanceBoltHeadAndBottomWasher + 3;

        if(scene.getMeshByName("boltAndNutMesh")){
            scene.removeMesh(scene.getMeshByName("boltAndNutMesh"));
        }

        let boltAndNutMesh = BABYLON.Mesh.MergeMeshes([boltMesh, topWasherMesh, bottomWasherMesh, nutMesh], true, true, undefined, false, true);
        boltAndNutMesh.name = "boltAndNutMesh";

        if(boltAndNutMesh) {
            boltAndNutMesh.position = new BABYLON.Vector3(position.x, position.y, position.z);
            boltAndNutMesh.rotation = new BABYLON.Vector3(
                BABYLON.Tools.ToRadians(rotate.x), 
                BABYLON.Tools.ToRadians(rotate.y), 
                BABYLON.Tools.ToRadians(rotate.z)
            );
        }
    }

    generateBolt = async() => {
        let sampleBoltMesh = scene.getMeshByName("sampleBoltMesh");

        if(sampleBoltMesh) {
            scene.removeMesh(sampleBoltMesh);
        }

        let importMeshes = await BABYLON.SceneLoader.ImportMeshAsync(
            "", "/assets/NUT_BOLTS/", "Bolt_M16.stl", scene
        );
        importMeshes = importMeshes.meshes;

        if(importMeshes.length > 0) {
            if(importMeshes[0].id === "__root__") {
                importMeshes.splice(0, 1);
            }

            sampleBoltMesh = BABYLON.Mesh.MergeMeshes(importMeshes, true, true, undefined, false, true);
            sampleBoltMesh.name = "sampleBoltMesh";

            let mat = new BABYLON.StandardMaterial("mat", scene);
            mat.diffuseColor = BABYLON.Color3.FromHexString("#CCCAC9");
            mat.backFaceCulling = false;

            sampleBoltMesh.material = mat;

            let boltH = HEX_BOLT_DIMENSIONS["m16"]["Hmin"];

            // move bolt's center is coordinate (0, 0, 0)
            let _boundingBoxMin = sampleBoltMesh.getBoundingInfo().boundingBox.minimumWorld;
            let _boundingBoxMax = sampleBoltMesh.getBoundingInfo().boundingBox.maximumWorld;

            let lengthY = _boundingBoxMax.y - _boundingBoxMin.y;
            let lengthZ = _boundingBoxMax.z - _boundingBoxMin.z;

            sampleBoltMesh.setPivotMatrix(
                BABYLON.Matrix.Translation(-boltH, -lengthY/2, -lengthZ/2), false
            );

            return sampleBoltMesh;
        }
    }

    generateWasher = async() => {
        let sampleWasherMesh = scene.getMeshByName("sampleWasherMesh");

        if(sampleWasherMesh) {
            scene.removeMesh(sampleWasherMesh);
        }

        let importMeshes = await BABYLON.SceneLoader.ImportMeshAsync(
            "", "/assets/NUT_BOLTS/", "Washer_M16.stl", scene
        );
        importMeshes = importMeshes.meshes;

        if(importMeshes.length > 0) {
            if(importMeshes[0].id === "__root__") {
                importMeshes.splice(0, 1);
            }

            sampleWasherMesh = BABYLON.Mesh.MergeMeshes(importMeshes, true, true, undefined, false, true);
            sampleWasherMesh.name = "sampleWasherMesh";

            let mat = new BABYLON.StandardMaterial("mat", scene);
            mat.diffuseColor = BABYLON.Color3.FromHexString("#B3B1A1");
            mat.backFaceCulling = false;

            sampleWasherMesh.material = mat;

            // move washer's center is coordinate (0, 0, 0)
            let _boundingBoxMin = sampleWasherMesh.getBoundingInfo().boundingBox.minimumWorld;
            let _boundingBoxMax = sampleWasherMesh.getBoundingInfo().boundingBox.maximumWorld;

            let lengthX = _boundingBoxMax.x - _boundingBoxMin.x;
            let lengthY = _boundingBoxMax.y - _boundingBoxMin.y;
            let lengthZ = _boundingBoxMax.z - _boundingBoxMin.z;

            sampleWasherMesh.setPivotMatrix(
                BABYLON.Matrix.Translation(-lengthX/2, -lengthY, -lengthZ/2), false
            );

            sampleWasherMesh.rotation.z = Math.PI/2;

            return sampleWasherMesh;
        }     
    }

    generateNut = async() => {
        let sampleNutMesh = scene.getMeshByName("sampleNutMesh");

        if(sampleNutMesh) {
            scene.removeMesh(sampleNutMesh);
        }

        let importMeshes = await BABYLON.SceneLoader.ImportMeshAsync(
            "", "/assets/NUT_BOLTS/", "Nut_M16.stl", scene
        );
        importMeshes = importMeshes.meshes;

        if(importMeshes.length > 0) {
            if(importMeshes[0].id === "__root__") {
                importMeshes.splice(0, 1);
            }

            sampleNutMesh = BABYLON.Mesh.MergeMeshes(importMeshes, true, true, undefined, false, true);
            sampleNutMesh.name = "sampleNutMesh";

            let mat = new BABYLON.StandardMaterial("mat", scene);
            mat.diffuseColor = BABYLON.Color3.FromHexString("#919096");
            mat.backFaceCulling = false;

            sampleNutMesh.material = mat;

            // move washer's nut is coordinate (0, 0, 0)
            let _boundingBoxMin = sampleNutMesh.getBoundingInfo().boundingBox.minimumWorld;
            let _boundingBoxMax = sampleNutMesh.getBoundingInfo().boundingBox.maximumWorld;

            let lengthX = _boundingBoxMax.x - _boundingBoxMin.x;
            let lengthY = _boundingBoxMax.y - _boundingBoxMin.y;
            let lengthZ = _boundingBoxMax.z - _boundingBoxMin.z;

            let D = 15.73;

            sampleNutMesh.setPivotMatrix(
                BABYLON.Matrix.Translation(-lengthX/2, -lengthY, -lengthZ/2 - D/2), false
            );

            sampleNutMesh.rotation.z = Math.PI/2;

            return sampleNutMesh;
        }     
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={2}>
                        <Drawing3DLibrariesToolbar handleGenerateRandomBrackets={this.handleGenerateRandomBrackets}
                                                   generateBoltAndNut={this.generateBoltAndNut}/>
                    </Col>
                    <Col xs={10}>
                        {/* <Row>
                            <Col xs="12">
                                <div className="float-right mb-2">
                                    <RandomBracketFiltersComponent handleSubmit={this.props.handleSubmit}/>
                                </div>
                            </Col>
                        </Row> */}
                        <Row>
                            <Col xs="12">
                                <canvas 
                                    style={{width: window.innerWidth, height: window.innerHeight}}
                                    ref={
                                        canvas => {this.canvas = canvas;}
                                    }
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Drawing3DLibraries;