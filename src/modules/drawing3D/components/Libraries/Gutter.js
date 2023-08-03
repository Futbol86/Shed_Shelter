import * as BABYLON from "babylonjs";
import earcut from "earcut";

let GutterLibrary = {
    StandardGutter(name, params, scene) {
        let {W1, W2, W3, thickness, length, rotation, isRightDirection = true} = params;

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

        let _leftCapPanelCoordinates = [];

        _leftCapPanelCoordinates[0] = new BABYLON.Vector3(0, W1, 0);
        _leftCapPanelCoordinates[1] = new BABYLON.Vector3(_leftCapPanelCoordinates[0].x, _leftCapPanelCoordinates[0].y - W1, _leftCapPanelCoordinates[0].z);
        _leftCapPanelCoordinates[2] = new BABYLON.Vector3(_leftCapPanelCoordinates[1].x + W2, _leftCapPanelCoordinates[1].y, _leftCapPanelCoordinates[1].z);
        _leftCapPanelCoordinates[3] = new BABYLON.Vector3(_leftCapPanelCoordinates[2].x, _leftCapPanelCoordinates[2].y + W3, _leftCapPanelCoordinates[2].z);

        let firstPanelMeshBuilder  = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        let thirdPanelMeshBuilder  = new BABYLON.PolygonMeshBuilder(name, _thirdPanelCoordinates, scene, earcut);
        let leftCapPanelMeshBuilder    = new BABYLON.PolygonMeshBuilder(name, _leftCapPanelCoordinates, scene, earcut);

        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        let thirdPanelMesh = thirdPanelMeshBuilder.build(true, thickness);
        let leftCapPanelMesh = leftCapPanelMeshBuilder.build(true, thickness);
        let rightCapPanelMesh = leftCapPanelMesh.clone();

        firstPanelMesh.parent = secondPanelMesh;
        thirdPanelMesh.parent = secondPanelMesh;
        leftCapPanelMesh.parent = secondPanelMesh;
        rightCapPanelMesh.parent = leftCapPanelMesh;

        if(isRightDirection) {
            leftCapPanelMesh.rotation.x = -Math.PI/2;
            leftCapPanelMesh.rotation.y = Math.PI;

            firstPanelMesh.position    = new BABYLON.Vector3(W2, 0, 0);
            secondPanelMesh.position   = new BABYLON.Vector3(0, length, -W3);
            leftCapPanelMesh.position  = new BABYLON.Vector3(W2, 0, 0);
            rightCapPanelMesh.position = new BABYLON.Vector3(0, length, 0);
        } else {
            leftCapPanelMesh.rotation.x = -Math.PI/2

            secondPanelMesh.position   = new BABYLON.Vector3(-W2, length, -W3);
            thirdPanelMesh.position    = new BABYLON.Vector3(W2, 0, 0);
            rightCapPanelMesh.position = new BABYLON.Vector3(0, -length, 0);
        }

        firstPanelMesh.rotation.z = Math.PI/2;
        secondPanelMesh.rotation.x = Math.PI/2;
        thirdPanelMesh.rotation.z = Math.PI/2;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseTexture = new BABYLON.Texture("/assets/textures/multi_clad/F6E3C0.bmp");  //F6E3C0 A5A08C
        mat.backFaceCulling = false;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh, thirdPanelMesh, leftCapPanelMesh, rightCapPanelMesh], true, true, undefined, false, true);
        newMesh.material = mat;
        newMesh.name = name;

        if(rotation)
            newMesh.rotation = {x: rotation.x, y: rotation.y, z: rotation.z};

        firstPanelMesh.dispose();
        secondPanelMesh.dispose();
        thirdPanelMesh.dispose();
        leftCapPanelMesh.dispose();
        rightCapPanelMesh.dispose();

        return newMesh;
    }
}

export default GutterLibrary;