import * as BABYLON from "babylonjs";
import earcut from "earcut";

let RidgeCappingLibrary = {
    ThreeBreakRidge(name, params, foldAngles = {}, scene) {
        let {W, H1, H2, thickness, rotation, color="#3A4757"} = params;

        let _leftFlangeCoordinates = [];

        _leftFlangeCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _leftFlangeCoordinates[1] = new BABYLON.Vector3(_leftFlangeCoordinates[0].x - W, _leftFlangeCoordinates[0].y, _leftFlangeCoordinates[0].z);
        _leftFlangeCoordinates[2] = new BABYLON.Vector3(_leftFlangeCoordinates[1].x, _leftFlangeCoordinates[1].y - H1, _leftFlangeCoordinates[1].z);
        _leftFlangeCoordinates[3] = new BABYLON.Vector3(_leftFlangeCoordinates[2].x + W, _leftFlangeCoordinates[2].y, _leftFlangeCoordinates[2].z);

        let _leftWebCoordinates = [];

        _leftWebCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _leftWebCoordinates[1] = new BABYLON.Vector3(_leftWebCoordinates[0].x - W, _leftWebCoordinates[0].y, _leftWebCoordinates[0].z);
        _leftWebCoordinates[2] = new BABYLON.Vector3(_leftWebCoordinates[1].x, _leftWebCoordinates[1].y - H2, _leftWebCoordinates[1].z);
        _leftWebCoordinates[3] = new BABYLON.Vector3(_leftWebCoordinates[2].x + W, _leftWebCoordinates[2].y, _leftWebCoordinates[2].z);

        let _rightWebCoordinates = [];

        _rightWebCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _rightWebCoordinates[1] = new BABYLON.Vector3(_rightWebCoordinates[0].x - W, _rightWebCoordinates[0].y, _rightWebCoordinates[0].z);
        _rightWebCoordinates[2] = new BABYLON.Vector3(_rightWebCoordinates[1].x, _rightWebCoordinates[1].y + H2, _rightWebCoordinates[1].z);
        _rightWebCoordinates[3] = new BABYLON.Vector3(_rightWebCoordinates[2].x + W, _rightWebCoordinates[2].y, _rightWebCoordinates[2].z);

        let leftFlangeMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _leftFlangeCoordinates, scene, earcut);
        let leftWebMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _leftWebCoordinates, scene, earcut);
        let rightWebMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _rightWebCoordinates, scene, earcut);

        let leftWebMesh = leftWebMeshBuilder.build(true, thickness);
        let rightWebMesh = rightWebMeshBuilder.build(true, thickness);
        let leftFlangeMesh = leftFlangeMeshBuilder.build(true, thickness);
        let rightFlangeMesh = leftFlangeMesh.clone();

        leftFlangeMesh.parent = leftWebMesh;
        rightFlangeMesh.parent = rightWebMesh;
        
        leftWebMesh.rotation.x = foldAngles["leftWeb"];
        rightWebMesh.rotation.x = foldAngles["rightWeb"];
        leftFlangeMesh.rotation.x = foldAngles["leftFlange"];
        rightFlangeMesh.rotation.x = foldAngles["rightFlange"];

        rightWebMesh.position = new BABYLON.Vector3(0, 0, 0);
        leftFlangeMesh.position = new BABYLON.Vector3(0, 0, -H2);
        rightFlangeMesh.position = new BABYLON.Vector3(0, 0, H2);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString(color);
        mat.backFaceCulling = false;

        leftFlangeMesh.material = mat;
        leftWebMesh.material = mat;
        rightWebMesh.material = mat;
        rightFlangeMesh.material = mat;

        let newMesh = BABYLON.Mesh.MergeMeshes([leftFlangeMesh, leftWebMesh, rightWebMesh, rightFlangeMesh], true, true, undefined, false, true);
        newMesh.rotation = {x: rotation.x, y: rotation.y, z: rotation.z};
        newMesh.name = name;

        leftFlangeMesh.dispose();
        leftWebMesh.dispose();
        rightWebMesh.dispose();
        rightFlangeMesh.dispose();

        return newMesh;
    },
    RoolTopRidge(name, params, foldAngles = {}, scene) {
        let {W, H1, H2, R, thickness, rotation, color="#3A4757", rollTopColor="#2D3949"} = params;

        let _leftFlangeCoordinates = [];

        _leftFlangeCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _leftFlangeCoordinates[1] = new BABYLON.Vector3(_leftFlangeCoordinates[0].x - W, _leftFlangeCoordinates[0].y, _leftFlangeCoordinates[0].z);
        _leftFlangeCoordinates[2] = new BABYLON.Vector3(_leftFlangeCoordinates[1].x, _leftFlangeCoordinates[1].y - H1, _leftFlangeCoordinates[1].z);
        _leftFlangeCoordinates[3] = new BABYLON.Vector3(_leftFlangeCoordinates[2].x + W, _leftFlangeCoordinates[2].y, _leftFlangeCoordinates[2].z);

        let _leftWebCoordinates = [];

        _leftWebCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _leftWebCoordinates[1] = new BABYLON.Vector3(_leftWebCoordinates[0].x - W, _leftWebCoordinates[0].y, _leftWebCoordinates[0].z);
        _leftWebCoordinates[2] = new BABYLON.Vector3(_leftWebCoordinates[1].x, _leftWebCoordinates[1].y - H2, _leftWebCoordinates[1].z);
        _leftWebCoordinates[3] = new BABYLON.Vector3(_leftWebCoordinates[2].x + W, _leftWebCoordinates[2].y, _leftWebCoordinates[2].z);

        let _rightWebCoordinates = [];

        _rightWebCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _rightWebCoordinates[1] = new BABYLON.Vector3(_rightWebCoordinates[0].x - W, _rightWebCoordinates[0].y, _rightWebCoordinates[0].z);
        _rightWebCoordinates[2] = new BABYLON.Vector3(_rightWebCoordinates[1].x, _rightWebCoordinates[1].y + H2, _rightWebCoordinates[1].z);
        _rightWebCoordinates[3] = new BABYLON.Vector3(_rightWebCoordinates[2].x + W, _rightWebCoordinates[2].y, _rightWebCoordinates[2].z);

        let _rollTopCoordinates = [];
  
        function createArc(_xCenter, _yCenter, _radiusX, _radiusY) {
            let _ellipsePoints = [];

            for(let theta = 0; theta <= Math.PI; theta += Math.PI/20) {
                let x = _xCenter + _radiusX*Math.cos(theta);
                let y = _yCenter + _radiusY*Math.sin(theta);

                _ellipsePoints.push(new BABYLON.Vector3(x, y, 0));
            }

            return _ellipsePoints;
        }

        _rollTopCoordinates = createArc(0, 0, R, R);

        const arcPath = [
            new BABYLON.Vector3(0, 0, 0), 
            new BABYLON.Vector3(W, 0, 0)
        ]

        let leftFlangeMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _leftFlangeCoordinates, scene, earcut);
        let leftWebMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _leftWebCoordinates, scene, earcut);
        let rightWebMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _rightWebCoordinates, scene, earcut);

        let leftWebMesh = leftWebMeshBuilder.build(true, thickness);
        let rightWebMesh = rightWebMeshBuilder.build(true, thickness);
        let leftFlangeMesh = leftFlangeMeshBuilder.build(true, thickness);
        let rightFlangeMesh = leftFlangeMesh.clone();
        let rollTopMesh = BABYLON.MeshBuilder.ExtrudeShape("roll-top-mesh", {shape: _rollTopCoordinates, path: arcPath, scale: 1, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);

        leftFlangeMesh.parent = leftWebMesh;
        rightFlangeMesh.parent = rightWebMesh;

        leftWebMesh.rotation.x = foldAngles["leftWeb"];
        rightWebMesh.rotation.x = foldAngles["rightWeb"];
        leftFlangeMesh.rotation.x = foldAngles["leftFlange"];
        rightFlangeMesh.rotation.x = foldAngles["rightFlange"];
        rollTopMesh.rotation.x = Math.PI;

        leftWebMesh.position = new BABYLON.Vector3(0, 0, -R);
        rightWebMesh.position = new BABYLON.Vector3(0, 0, R);

        leftFlangeMesh.position = new BABYLON.Vector3(0, 0, -H2);
        rightFlangeMesh.position = new BABYLON.Vector3(0, 0, H2);
        rollTopMesh.position = new BABYLON.Vector3(-W, 0, 0);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString(color);
        mat.backFaceCulling = false;

        let secondMat = mat.clone();
        secondMat.alpha = 0.8;
        // secondMat.diffuseColor = new BABYLON.Color3.FromHexString(rollTopColor);

        leftFlangeMesh.material = mat;
        leftWebMesh.material = mat;
        rightWebMesh.material = mat;
        rightFlangeMesh.material = mat;
        rollTopMesh.material = secondMat;

        let newMesh = BABYLON.Mesh.MergeMeshes([leftFlangeMesh, leftWebMesh, rightWebMesh, rightFlangeMesh, rollTopMesh], true, true, undefined, false, true);
        newMesh.rotation = {x: rotation.x, y: rotation.y, z: rotation.z};
        newMesh.name = name;

        leftFlangeMesh.dispose();
        leftWebMesh.dispose();
        rightWebMesh.dispose();
        rightFlangeMesh.dispose();
        rollTopMesh.dispose();

        return newMesh;
    }
}

export default RidgeCappingLibrary;