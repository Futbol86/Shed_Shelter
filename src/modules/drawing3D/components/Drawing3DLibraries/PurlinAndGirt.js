import * as BABYLON from "babylonjs";
import * as GUI from "babylonjs-gui";
import {PURLIN_GIRT_C_SECTIONS, PURLIN_GIRT_Z_SECTIONS, PURLIN_GIRT_TS_SECTIONS} from '../../constants';

import LysaghtLibrary from '../Libraries/Lysaght';
import StramitLibrary from '../Libraries/Stramit';
import PunchingLibrary from '../Libraries/Punching';
import BracketLibrary from '../Libraries/Bracket';
import BoltLibrary from '../Libraries/Bolt';

var m12Bolt, m16Bolt;

let PurlinAndGirt = {
    CreateNewPurlinAndGirt(params, scene) {
        let {
            name, purlinGirtSectionType, rollForm, purlinGirtSection, length = 100, 
            isAddPunching, webHolePunchings = [], flangeHolePunchings = [], 
            bolts = {rM12: 2, hM12: 4, colorM12: "#385679", rM16: 2.4, hM16: 4, colorM16: "#385679"},
            hasSlabFooting, rotation, color, 
        } = params || {};

        if(!m12Bolt) {
            m12Bolt = BoltLibrary.M12({r: bolts.rM12, height: bolts.hM12, color: bolts.colorM12}, scene);
            m12Bolt.setEnabled(false);
        }
        if(!m16Bolt) {
            m16Bolt = BoltLibrary.M16({r: bolts.rM16, height: bolts.hM16, color: bolts.colorM16}, scene);
            m16Bolt.setEnabled(false);
        }

        const renderCSection = () => {
            let findPurlinGirtSection = PURLIN_GIRT_C_SECTIONS[rollForm].find(item => item.purlinGirtCode === purlinGirtSection);
            if(!findPurlinGirtSection) return;

            let {D, B, L, t} = findPurlinGirtSection;
            let cMesh, meshes = [];

            switch(rollForm) {
                case "Stramit":
                    cMesh = StramitLibrary.CSection(name, {length: length, D, B, L, t, color}, scene);
                    break;

                case "Lysaght":
                    cMesh = LysaghtLibrary.CSection(name, {length: length, D, B, L, t, color}, scene);
                    break;

                default:
                    break;
            }

            let webMesh = PunchingLibrary.Web(name, {width: D, length, thickness: t, color}, [], scene);
            webMesh.rotation.z = Math.PI/2;
            webMesh.position = new BABYLON.Vector3(-B/2, -D/2, 0);
            webMesh.parent = cMesh;
            
            let topFlangeMesh = PunchingLibrary.Flange(name, {width: B, length, thickness: t, color: "#979797"}, [], scene);
            topFlangeMesh.position = new BABYLON.Vector3(-B/2, D/2, 0);
            topFlangeMesh.parent = cMesh;

            let bottomFlangeMesh = topFlangeMesh.clone();
            bottomFlangeMesh.position = new BABYLON.Vector3(-B/2, -D/2, 0);
            bottomFlangeMesh.parent = cMesh;

            meshes = [...meshes, cMesh, webMesh, topFlangeMesh, bottomFlangeMesh];
            let newMesh = BABYLON.Mesh.MergeMeshes(meshes, true, true, undefined, true);
            newMesh.name = name;
            newMesh.material = multiMat;

            for(let i = 0; i < newMesh.subMeshes.length; i++) {
                newMesh.subMeshes[i].materialIndex = i;
            }

            return newMesh;
        }

        const renderZSection = () => {
            let findPurlinGirtSection = PURLIN_GIRT_Z_SECTIONS[rollForm].find(item => item.purlinGirtCode === purlinGirtSection);
            if(!findPurlinGirtSection) return;

            let {D, E, F, L, t} = findPurlinGirtSection;
            let zMesh, meshes = [];
      
            switch(rollForm) {
                case "Stramit":
                    zMesh = StramitLibrary.ZSection(name, {length, D, E, F, L, t, color}, scene);
                    break;

                case "Lysaght":
                    zMesh = LysaghtLibrary.ZSection(name, {length, D, E, F, L, t, color}, scene);
                    break;

                default:
                    break;
            }

            let webMesh = PunchingLibrary.Web(name, {width: D, length, thickness: t, color}, [], scene);
            webMesh.rotation.z = Math.PI/2;
            webMesh.position = new BABYLON.Vector3(-t, -D/2, 0);
            webMesh.parent = zMesh;

            let topFlangeMesh = PunchingLibrary.Flange(name, {width: F, length, thickness: t, color: "#979797"}, [], scene);
            topFlangeMesh.position = new BABYLON.Vector3(-F, D/2, 0);
            topFlangeMesh.parent = zMesh;

            let bottomFlangeMesh = PunchingLibrary.Flange(name, {width: E, length, thickness: t, color: "#979797"}, [], scene);
            bottomFlangeMesh.position = new BABYLON.Vector3(-t, -D/2 + t, 0);
            bottomFlangeMesh.parent = zMesh;

            meshes = [...meshes, zMesh, webMesh, topFlangeMesh, bottomFlangeMesh];

            let newMesh = BABYLON.Mesh.MergeMeshes(meshes, true, true, undefined, true);
            newMesh.name = name;
            newMesh.material = multiMat;

            for(let i = 0; i < newMesh.subMeshes.length; i++) {
                newMesh.subMeshes[i].materialIndex = i;
            }

            return newMesh;
        }

        const renderTSSection = () => {
            let findPurlinGirtSection = PURLIN_GIRT_TS_SECTIONS[rollForm].find(item => item.purlinGirtCode === purlinGirtSection);
            if(!findPurlinGirtSection) return;
            
            let {width, height, thickness, tLow, tHeight, color= "#ACACA8"} = findPurlinGirtSection;
            let tSMesh, meshes = [];

            switch(rollForm) {
                case "Stramit":
                    tSMesh = StramitLibrary.TSSection(name, {width, length, height, tLow, tHeight, thickness, color}, scene);
                    break;
                    
                case "Lysaght":
                    tSMesh = LysaghtLibrary.TSSection(name, {width, length, height, tLow, tHeight, thickness, color}, scene);
                    break;

                default:
                    break;
            }

            let tRise = (width - tHeight - 2*tLow)/2;
            let webWidth = Math.sqrt(height*height + tRise*tRise);
            let alpha = Math.atan(height/tRise);

            let leftWebMesh = PunchingLibrary.Web(name, {width: webWidth, length, thickness, color: "#979797"}, [], scene);
            leftWebMesh.rotation.z = alpha;
            leftWebMesh.position = new BABYLON.Vector3(-width/2 + tLow, -height/2 + thickness, 0);
            leftWebMesh.parent = tSMesh;

            let rightWebMesh = leftWebMesh.clone();
            rightWebMesh.rotation.z = Math.PI - alpha
            rightWebMesh.position = new BABYLON.Vector3(width/2 - tLow, -height/2 + thickness, 0);
            rightWebMesh.parent = tSMesh;

            let leftFlangeMesh = PunchingLibrary.Flange(name, {width: tLow, length, thickness, color}, [], scene);
            leftFlangeMesh.position = new BABYLON.Vector3(-width/2, -height/2 + thickness, 0);
            leftFlangeMesh.parent = tSMesh;

            let rightFlangeMesh = leftFlangeMesh.clone();
            rightFlangeMesh.position = new BABYLON.Vector3(width/2 - tLow, -height/2 + thickness, 0);
            rightFlangeMesh.parent = tSMesh;

            meshes = [...meshes, tSMesh, leftWebMesh, rightWebMesh, leftFlangeMesh, rightFlangeMesh];

            let newMesh = BABYLON.Mesh.MergeMeshes(meshes, true, true, undefined, false, true);
            newMesh.name = name;

            for(let i = 0; i <  meshes.length; i++) {
                meshes[i].dispose();
                scene.removeMesh(meshes[i]);
            }
            
            return newMesh;
        }

        const renderDoubleCSection = () => {
            let findPurlinGirtSection = PURLIN_GIRT_C_SECTIONS[rollForm].find(item => item.purlinGirtCode === purlinGirtSection);
            if(!findPurlinGirtSection) return;

            let {D, B, L, t} = findPurlinGirtSection;
            let cLeftMesh, meshes = [];
            
            switch(rollForm) {
                case "Stramit":
                    cLeftMesh = StramitLibrary.CSection(name, {length: length, D, B, L, t, color}, scene);
                    break;

                case "Lysaght":
                    cLeftMesh = LysaghtLibrary.CSection(name, {length: length, D, B, L, t, color}, scene);
                    break;

                default:
                    break;
            }

            let webMesh = PunchingLibrary.Web(name, {width: 0.9*D, length, thickness: 8*t, color}, [], scene);
            webMesh.rotation.z = Math.PI/2;
            webMesh.position = new BABYLON.Vector3(-4*t, -D/2 + 0.05*D, 0);
            webMesh.parent = cLeftMesh;
            
            let topFlangeMesh = PunchingLibrary.CDoubleFlange(name, {width: 2*B, length, thickness: t, foldDirection: "left", color: "#979797"}, [], scene);
            topFlangeMesh.position = new BABYLON.Vector3(-B, D/2, 0);
            topFlangeMesh.parent = cLeftMesh;

            let topFlangeMesh2 = PunchingLibrary.CDoubleFlange(name, {width: 2*B, length, thickness: t, foldDirection: "right", color: "#979797"}, [], scene);
            topFlangeMesh2.position = new BABYLON.Vector3(-B, -D/2, 0);
            topFlangeMesh2.parent = cLeftMesh;

            meshes = [...meshes, cLeftMesh, webMesh, topFlangeMesh, topFlangeMesh2];

            let newMesh = BABYLON.Mesh.MergeMeshes(meshes, true, true, undefined, true);
            newMesh.name = name;
            newMesh.material = multiMat;

            for(let i = 0; i < newMesh.subMeshes.length; i++) {
                newMesh.subMeshes[i].materialIndex = i;
            }

            return newMesh;
        }

        const renderExtrudeCSection = (params) => {
            let {length, width, depth, alpha, beta} = params;
            let cMesh, meshes = [];

            switch(rollForm) {
                case "Stramit":
                    cMesh = StramitLibrary.ExtrudeCSection(name, {L: length, W: width, depth, alpha, beta,}, scene);
                    break;

                case "Lysaght":
                    cMesh = LysaghtLibrary.ExtrudeCSection(name, {L: length, W: width, depth, alpha, beta,}, scene);
                    break;

                default:
                    break;
            }

            let webMesh = PunchingLibrary.ExtrudePanel("web", {width, length, alpha, beta, color: "#E1E1E1"}, [], scene);
            webMesh.rotation.x = -Math.PI/2;
            webMesh.parent = cMesh;

            let leftFlangeMesh = PunchingLibrary.ExtrudePanel("left-flange", {width: depth, length, alpha, beta, color: "#979797"}, [], scene);
            leftFlangeMesh.rotation.x = -Math.PI/2;
            leftFlangeMesh.rotation.z = Math.PI/2;
            leftFlangeMesh.parent = cMesh;

            let rightFlangeMesh = PunchingLibrary.ExtrudePanel("right-flange", {width: depth, length: length - width/Math.tan(alpha) - width/Math.tan(beta), alpha, beta, color: "#979797"}, [], scene);
            rightFlangeMesh.rotation.x = -Math.PI/2;
            rightFlangeMesh.rotation.z = Math.PI/2;
            rightFlangeMesh.position.x += width;
            rightFlangeMesh.position.y += width/Math.tan(beta);
            rightFlangeMesh.parent = cMesh;

            cMesh.rotation.x = Math.PI;
            cMesh.rotation.y = Math.PI/2;
            cMesh.rotation.z = Math.PI/2;
            cMesh.position.y += width/2;

            meshes = [...meshes, cMesh, webMesh, leftFlangeMesh, rightFlangeMesh];
            let newMesh = BABYLON.Mesh.MergeMeshes(meshes, true, true, undefined, false, true);
            newMesh.name = name;

            return newMesh;
        }

        // init material
        var webMat = new BABYLON.StandardMaterial("web-mat", scene);
        webMat.backFaceCulling = false;
        webMat.diffuseColor = new BABYLON.Color3.FromHexString("#E1E1E1");
        
        var flangeMat = new BABYLON.StandardMaterial("flange-mat", scene);
        flangeMat.backFaceCulling = false;
        flangeMat.diffuseColor = new BABYLON.Color3.FromHexString("#979797");

        var multiMat = new BABYLON.MultiMaterial('multi', scene);
        multiMat.subMaterials= [webMat, webMat, flangeMat, flangeMat];

        switch(purlinGirtSectionType) {
            case 1:
                return renderCSection();

            case 2:
                return renderZSection();

            case 3: 
                return renderTSSection();

            case 4:
                return renderDoubleCSection();

            case 5:
                return renderExtrudeCSection(params);
        }
    },
    CreatNSegmentPurlinAndGirt(params, scene) {
        const {name, segmentLengths = [], rotation} = params;
        let newSegmentMeshes = [];
        let increaseLength = 0;

        for(let i = 0; i < segmentLengths.length; i++) {    
            increaseLength += i >= 1 ? segmentLengths[i - 1] : 0;

            if(i%2 === 0) {
                let segmentParams = {
                    ...params,
                    rotation: {x: 0, y: 0, z: 0},
                    length: segmentLengths[i],
                }
                let newSegmentMesh = this.CreateNewPurlinAndGirt(segmentParams, scene);
                newSegmentMesh.position = new BABYLON.Vector3(0, 0, increaseLength);

                newSegmentMeshes.push(newSegmentMesh);
            }
        }

        let newMesh = BABYLON.Mesh.MergeMeshes(newSegmentMeshes, true, true, undefined, false, true);
        newMesh.name = name;

        if(rotation) {
            newMesh.rotation = {x: rotation.x, y: rotation.y, z: rotation.z};
        }

        for(let i = 0; i < newSegmentMeshes.length; i++) {
            newSegmentMeshes[i].dispose();
        }

        return newMesh;
    },

}

export default PurlinAndGirt;