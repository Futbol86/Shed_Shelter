import * as BABYLON from "babylonjs";
import earcut from "earcut";

let PanelLibrary = {
    VerticalCladding(name, params, scene) {
        let {
            length, height, thickness, holes = [], rotation, uScale = 1, vScale = 1, 
            outerColor = "#F6E3C0", innerColor = "#CDCCC8", direction
        } = params;
        let _panelCoordinates = [];

        _panelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x + length, _panelCoordinates[0].y, _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3(_panelCoordinates[1].x, _panelCoordinates[1].y + height, _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x - length, _panelCoordinates[2].y, _panelCoordinates[2].z);

        let panelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _panelCoordinates, scene, earcut);
        let panelMesh = panelMeshBuilder.build(true, thickness);

        let holeMeshes = [];

        for(let h = 0; h < holes.length; h++) {
            let _holeCoordinates = [];
            for(let i = 0; i < holes[h].length; i++) {
                _holeCoordinates.push(new BABYLON.Vector3(holes[h][i].x, holes[h][i].y, 0));
            }

            let newHoleMeshBuilder = new BABYLON.PolygonMeshBuilder("hole-mesh", _holeCoordinates, scene, earcut);
            let newHoleMesh = newHoleMeshBuilder.build(true, thickness);

            holeMeshes.push(newHoleMesh);
        }

        let standardMat = new BABYLON.StandardMaterial("standard-mat", scene);
        standardMat.backFaceCulling = false;

        let panelMeshCSG = BABYLON.CSG.FromMesh(panelMesh);
        var newMeshCSG = panelMeshCSG.clone();

        for(let i = 0; i < holeMeshes.length; i++) {
            let holeMeshCSG = BABYLON.CSG.FromMesh(holeMeshes[i]);
            newMeshCSG = newMeshCSG.subtract(holeMeshCSG);
        }

        let newFrontMesh = newMeshCSG.toMesh(name, standardMat, scene);
        let newBackMesh = newFrontMesh.clone("new-mesh-2");
        newBackMesh.scaling.y = 0.25;
        newBackMesh.parent = newFrontMesh;

        newBackMesh.parent = newFrontMesh;
        if(direction === "LEFT")
            newBackMesh.position = new BABYLON.Vector3(0, -thickness, 0);
        else if(direction === "RIGHT")
            newBackMesh.position = new BABYLON.Vector3(0, 0.25*thickness, 0);

        let outerMat = new BABYLON.StandardMaterial("mat", scene);
        outerMat.diffuseTexture = new BABYLON.Texture("/assets/textures/spandek/" + outerColor.replace('#', '') + ".bmp");
        outerMat.diffuseTexture.uScale = uScale;
        outerMat.diffuseTexture.vScale = vScale;
        outerMat.backFaceCulling = false;

        let innerMat = outerMat.clone();
        innerMat.diffuseTexture = new BABYLON.Texture("/assets/textures/spandek/" + innerColor.replace('#', '') + ".bmp");
        
        let multiMat = new BABYLON.MultiMaterial("multi", scene);
        multiMat.subMaterials.push(outerMat);
        multiMat.subMaterials.push(innerMat);

        let newMesh = BABYLON.Mesh.MergeMeshes([newFrontMesh, newBackMesh], true, true, undefined, true);
        newMesh.name = name;
        newMesh.material = multiMat;
       
        for(let i = 0; i < newMesh.subMeshes.length; i++) {
            newMesh.subMeshes[i].materialIndex = i;
        }

        newFrontMesh.dispose();
        newBackMesh.dispose();
        panelMesh.dispose();

        for(let i = 0; i < holeMeshes.length; i++) {
            holeMeshes[i].dispose();
        }

        if(rotation) {
            newMesh.rotation = {x: rotation.x, y: rotation.y, z: rotation.z};
        }

        return newMesh;
    },
    PolygonCladding(name, params, scene) {
        let {
            coordinates, thickness, holes = [], rotation, uScale = 1, vScale = 1, 
            outerColor = "#F6E3C0", innerColor = "#CDCCC8", direction
        } = params;

        let panelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, coordinates, scene, earcut);
        let panelMesh = panelMeshBuilder.build(true, thickness);

        let holeMeshes = [];

        for(let h = 0; h < holes.length; h++) {
            let _holeCoordinates = [];
            for(let i = 0; i < holes[h].length; i++) {
                _holeCoordinates.push(new BABYLON.Vector3(holes[h][i].x, holes[h][i].y, 0));
            }

            let newHoleMeshBuilder = new BABYLON.PolygonMeshBuilder("hole-mesh", _holeCoordinates, scene, earcut);
            let newHoleMesh = newHoleMeshBuilder.build(true, thickness);

            holeMeshes.push(newHoleMesh);
        }

        let standardMat = new BABYLON.StandardMaterial("standard-mat", scene);
        standardMat.backFaceCulling = false;

        let panelMeshCSG = BABYLON.CSG.FromMesh(panelMesh);
        var newMeshCSG = panelMeshCSG.clone();

        for(let i = 0; i < holeMeshes.length; i++) {
            let holeMeshCSG = BABYLON.CSG.FromMesh(holeMeshes[i]);
            newMeshCSG = newMeshCSG.subtract(holeMeshCSG);
        }

        let newFrontMesh = newMeshCSG.toMesh(name, standardMat, scene);
        let newBackMesh = newFrontMesh.clone("new-mesh-2");
        newBackMesh.scaling.y = 0.25;
        newBackMesh.parent = newFrontMesh;

        newBackMesh.parent = newFrontMesh;
        if(direction === "LEFT")
            newBackMesh.position = new BABYLON.Vector3(0, -thickness, 0);
        else if(direction === "RIGHT")
            newBackMesh.position = new BABYLON.Vector3(0, 0.25*thickness, 0);

        let outerMat = new BABYLON.StandardMaterial("mat", scene);
        outerMat.diffuseTexture = new BABYLON.Texture("/assets/textures/spandek/" + outerColor.replace('#', '') + ".bmp");
        outerMat.diffuseTexture.uScale = uScale;
        outerMat.diffuseTexture.vScale = vScale;
        outerMat.backFaceCulling = false;

        let innerMat = outerMat.clone();
        innerMat.diffuseTexture = new BABYLON.Texture("/assets/textures/spandek/" + innerColor.replace('#', '') + ".bmp");
        innerMat.diffuseTexture.uScale = uScale;
        innerMat.diffuseTexture.vScale = vScale;
       // innerMat.backFaceCulling = false;

        let multiMat = new BABYLON.MultiMaterial("multi", scene);
        multiMat.subMaterials.push(outerMat);
        multiMat.subMaterials.push(innerMat);

        let newMesh = BABYLON.Mesh.MergeMeshes([newFrontMesh, newBackMesh], true, true, undefined, true);
        newMesh.name = name;
        newMesh.material = multiMat;
       
        for(let i = 0; i < newMesh.subMeshes.length; i++) {
            newMesh.subMeshes[i].materialIndex = i;
        }

        newFrontMesh.dispose();
        newBackMesh.dispose();
        panelMesh.dispose();

        for(let i = 0; i < holeMeshes.length; i++) {
            holeMeshes[i].dispose();
        }

        if(rotation) {
            newMesh.rotation = {x: rotation.x, y: rotation.y, z: rotation.z};
        }

        return newMesh;
    },
    TopHeaderCuttingCladding(name, params, scene) {
        let {
            length, height0, height1, thickness, holes = [], rotation, uScale = 1, vScale = 1, 
            outerColor = "#F6E3C0", innerColor = "#CDCCC8", direction
        } = params;
        let _coordinates = [];

        _coordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _coordinates[1] = new BABYLON.Vector3(_coordinates[0].x + length, _coordinates[0].y, _coordinates[0].z);
        _coordinates[2] = new BABYLON.Vector3(_coordinates[1].x, _coordinates[1].y + height1, _coordinates[1].z);
        _coordinates[3] = new BABYLON.Vector3(_coordinates[0].x, _coordinates[0].y + height0, _coordinates[0].z);

        let holePoints = [];
    
        for(let h = 0; h < holes.length; h++) {
            holePoints.push(holes[h]);
        }

        let meshBuilder = new BABYLON.PolygonMeshBuilder(name, _coordinates, scene, earcut);

        for(let i = 0; i < holePoints.length; i++) {
            meshBuilder.addHole(holePoints[i]);
        }

        let newFrontMesh = meshBuilder.build(true, thickness);
        let newBackMesh = newFrontMesh.clone("new-mesh-2");
        newBackMesh.scaling.y = 0.25;
        newBackMesh.parent = newFrontMesh;

        if(direction === "LEFT")
            newBackMesh.position = new BABYLON.Vector3(0, -thickness, 0);
        else if(direction === "RIGHT")
            newBackMesh.position = new BABYLON.Vector3(0, 0.25*thickness, 0);

        let outerMat = new BABYLON.StandardMaterial("mat", scene);
        outerMat.diffuseTexture = new BABYLON.Texture("/assets/textures/spandek/" + outerColor.replace('#', '') + ".bmp");
        outerMat.backFaceCulling = false;
        outerMat.diffuseTexture.uScale = uScale;
        outerMat.diffuseTexture.vScale = vScale;

        let innerMat = outerMat.clone();
        innerMat.diffuseTexture = new BABYLON.Texture("/assets/textures/spandek/" + innerColor.replace('#', '') + ".bmp");
        innerMat.diffuseTexture.uScale = uScale;
        innerMat.diffuseTexture.vScale = vScale;

        let multiMat = new BABYLON.MultiMaterial("multi", scene);
        multiMat.subMaterials.push(outerMat);
        multiMat.subMaterials.push(innerMat);

        let newMesh = BABYLON.Mesh.MergeMeshes([newFrontMesh, newBackMesh], true, true, undefined, true);
        newMesh.name = name;
        newMesh.material = multiMat;
       
        for(let i = 0; i < newMesh.subMeshes.length; i++) {
            newMesh.subMeshes[i].materialIndex = i;
        }

        if(rotation)
            newMesh.rotation = {x: rotation.x, y: rotation.y, z: rotation.z};

        newFrontMesh.dispose();
        newBackMesh.dispose();

        return newMesh;
    },
    BothEndCuttingCladding(name, params, scene) {
        let {
            length, height0, height1, height2, height3, thickness, holes = [], rotation, uScale = 1, vScale = 1, 
            outerColor = "#F6E3C0", innerColor = "#CDCCC8", direction
        } = params;
        let _coordinates = [];

        _coordinates[0] = new BABYLON.Vector3(0, height0, 0);
        _coordinates[1] = new BABYLON.Vector3(_coordinates[0].x + length, _coordinates[0].y + height1 - height0, _coordinates[0].z);
        _coordinates[2] = new BABYLON.Vector3(_coordinates[1].x, _coordinates[1].y + height2 - height1, _coordinates[1].z);
        _coordinates[3] = new BABYLON.Vector3(_coordinates[0].x, _coordinates[0].y + height3 - height0, _coordinates[0].z);

        let holePoints = [];
    
        for(let h = 0; h < holes.length; h++) {
            holePoints.push(holes[h]);
        }

        let meshBuilder = new BABYLON.PolygonMeshBuilder(name, _coordinates, scene, earcut);

        for(let i = 0; i < holePoints.length; i++) {
            meshBuilder.addHole(holePoints[i]);
        }

        let newFrontMesh = meshBuilder.build(true, thickness);
        let newBackMesh = newFrontMesh.clone("new-mesh-2");
        newBackMesh.scaling.y = 0.25;
        newBackMesh.parent = newFrontMesh;

        if(direction === "LEFT")
            newBackMesh.position = new BABYLON.Vector3(0, -thickness, 0);
        else if(direction === "RIGHT")
            newBackMesh.position = new BABYLON.Vector3(0, 0.25*thickness, 0);

        let outerMat = new BABYLON.StandardMaterial("mat", scene);
        outerMat.diffuseTexture = new BABYLON.Texture("/assets/textures/spandek/" + outerColor.replace('#', '') + ".bmp");
        outerMat.backFaceCulling = false;
        outerMat.diffuseTexture.uScale = uScale;
        outerMat.diffuseTexture.vScale = vScale;

        let innerMat = outerMat.clone();
        innerMat.diffuseTexture = new BABYLON.Texture("/assets/textures/spandek/" + innerColor.replace('#', '') + ".bmp");
        innerMat.diffuseTexture.uScale = uScale;
        innerMat.diffuseTexture.vScale = vScale;

        let multiMat = new BABYLON.MultiMaterial("multi", scene);
        multiMat.subMaterials.push(outerMat);
        multiMat.subMaterials.push(innerMat);

        let newMesh = BABYLON.Mesh.MergeMeshes([newFrontMesh, newBackMesh], true, true, undefined, true);
        newMesh.name = name;
        newMesh.material = multiMat;
       
        for(let i = 0; i < newMesh.subMeshes.length; i++) {
            newMesh.subMeshes[i].materialIndex = i;
        }

        if(rotation)
            newMesh.rotation = {x: rotation.x, y: rotation.y, z: rotation.z};

        newFrontMesh.dispose();
        newBackMesh.dispose();

        return newMesh;
    }
}

export default PanelLibrary;