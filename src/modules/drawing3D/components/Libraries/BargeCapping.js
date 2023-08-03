import * as BABYLON from "babylonjs";
import earcut from "earcut";

let BargeCappingLibrary = {
    StandardBargeCapping(name, params, scene) {
        let {W1, W2, length, thickness, angle, rotation, color= "#3A4757"} = params;

        let _firstPanelCoordinates = [];

        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W1, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x, _firstPanelCoordinates[1].y + length, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x - W1, _firstPanelCoordinates[2].y, _firstPanelCoordinates[2].z);

        let _secondPanelCoordinates = [];

        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x + W2, _secondPanelCoordinates[0].y, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x, _secondPanelCoordinates[1].y + length, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x - W2, _secondPanelCoordinates[2].y, _secondPanelCoordinates[2].z);

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);

        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.parent = firstPanelMesh;
        
        secondPanelMesh.rotation.z = angle;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString(color);
        mat.backFaceCulling = false;

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat;

        if(rotation)
            firstPanelMesh.rotation = {x: rotation.x, y: rotation.y, z: rotation.z};

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;

        firstPanelMesh.dispose();
        secondPanelMesh.dispose();

        return newMesh;
    },
    ThreePanelBargeCapping(name, params, scene) {
        let {W1, W2, W3, length, thickness, angle, rotation, color= "#3A4757"} = params;

        let _firstPanelCoordinates = [];

        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W1, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x, _firstPanelCoordinates[1].y + length, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x - W1, _firstPanelCoordinates[2].y, _firstPanelCoordinates[2].z);

        let _secondPanelCoordinates = [];

        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x + W2, _secondPanelCoordinates[0].y, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x, _secondPanelCoordinates[1].y + length, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x - W2, _secondPanelCoordinates[2].y, _secondPanelCoordinates[2].z);

        let _thirdPanelCoordinates = [];

        _thirdPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _thirdPanelCoordinates[1] = new BABYLON.Vector3(_thirdPanelCoordinates[0].x + W3, _thirdPanelCoordinates[0].y, _thirdPanelCoordinates[0].z);
        _thirdPanelCoordinates[2] = new BABYLON.Vector3(_thirdPanelCoordinates[1].x, _thirdPanelCoordinates[1].y + length, _thirdPanelCoordinates[1].z);
        _thirdPanelCoordinates[3] = new BABYLON.Vector3(_thirdPanelCoordinates[2].x - W3, _thirdPanelCoordinates[2].y, _thirdPanelCoordinates[2].z);

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        let thirdPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _thirdPanelCoordinates, scene, earcut);

        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        let thirdPanelMesh = thirdPanelMeshBuilder.build(true, thickness);

        secondPanelMesh.parent = firstPanelMesh;
        secondPanelMesh.rotation.z = angle;

        thirdPanelMesh.parent = firstPanelMesh;
        thirdPanelMesh.position = new BABYLON.Vector3(0, W2, 0);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString(color);
        mat.backFaceCulling = false;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh, thirdPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;
        newMesh.material = mat;

        if(rotation)
            newMesh.rotation = {x: rotation.x, y: rotation.y, z: rotation.z};

        firstPanelMesh.dispose();
        secondPanelMesh.dispose();
        thirdPanelMesh.dispose();

        return newMesh;
    },
}

export default BargeCappingLibrary;