import * as BABYLON from "babylonjs";
import earcut from "earcut";

let BracketLibrary = {
    strapBraceBase(name, params, scene) {
        let {width, depth, coordinates = [], color="#73736B", planeColor} = params;
        let positions = [], indices = [], colors = [];

        let _coordinates = [
            new BABYLON.Vector3(coordinates[0].x, coordinates[0].y, coordinates[0].z),
            new BABYLON.Vector3(coordinates[1].x, coordinates[1].y, coordinates[1].z),
            new BABYLON.Vector3(coordinates[2].x, coordinates[2].y, coordinates[2].z),
            new BABYLON.Vector3(coordinates[3].x, coordinates[3].y, coordinates[3].z)
        ];

        let mat0 = new BABYLON.StandardMaterial("mat", scene);
        mat0.diffuseColor = BABYLON.Color3.Blue();

        let mat3 = new BABYLON.StandardMaterial("mat", scene);
        mat3.diffuseColor = BABYLON.Color3.Magenta();

        // create 4 sphere for 4 coordinates
        let sphere0 = BABYLON.MeshBuilder.CreateSphere("", {segments: 32, diameter: 32}, scene);

        let sphere1 = sphere0.clone();
        let sphere2 = sphere0.clone();
        let sphere3 = sphere0.clone();

        sphere0.material = mat0;
        sphere3.material = mat3;

        sphere0.position.copyFromFloats(coordinates[0].x, coordinates[0].y, coordinates[0].z);
        sphere1.position.copyFromFloats(coordinates[1].x, coordinates[1].y, coordinates[1].z);
        sphere2.position.copyFromFloats(coordinates[2].x, coordinates[2].y, coordinates[2].z);
        sphere3.position.copyFromFloats(coordinates[3].x, coordinates[3].y, coordinates[3].z);

        sphere0.setEnabled(false);
        sphere1.setEnabled(false);
        sphere2.setEnabled(false);
        sphere3.setEnabled(false);

        for(let i = 0; i < _coordinates.length; i++) {
            positions.push(_coordinates[i].x, _coordinates[i].y, _coordinates[i].z);
        }

        indices.push(0, 2, 1, 0, 3, 2);

        let planeMesh = new BABYLON.Mesh("plane-mesh", scene);
        let normals = [];

        let vertexData = new BABYLON.VertexData();
        BABYLON.VertexData.ComputeNormals(positions, indices, normals, colors);

        vertexData.positions = positions;
        vertexData.indices = indices;
        vertexData.normals = normals;
        vertexData.applyToMesh(planeMesh);

        planeMesh.material = new BABYLON.StandardMaterial("mat", scene);
        planeMesh.material.diffuseColor = new BABYLON.Color3.FromHexString(planeColor);
        planeMesh.material.backFaceCulling = false;

        let distance02 = BABYLON.Vector3.Distance(_coordinates[0], _coordinates[2]);
        let distance13 = BABYLON.Vector3.Distance(_coordinates[1], _coordinates[3]);

        // vectors
        let v02 = _coordinates[0].subtract(_coordinates[2]);
        v02.normalize();
        let v03 = _coordinates[0].subtract(_coordinates[3]);
        v03.normalize();
        let v12 = _coordinates[1].subtract(_coordinates[2]);
        v12.normalize();
        let v13 = _coordinates[1].subtract(_coordinates[3]);
        v13.normalize();
        let v23 = _coordinates[2].subtract(_coordinates[3]);
        v23.normalize();
        let v32 = _coordinates[3].subtract(_coordinates[2]);
        v32.normalize();

        let axisPlane = BABYLON.Vector3.Cross(v02, v23);

        // ** Strap brace mesh A (from 2 -> 0)
        let strapBraceA = BABYLON.MeshBuilder.CreateBox("strap-brace-A", {width, height: distance02, depth}, scene);
        strapBraceA.material = new BABYLON.StandardMaterial("mat", scene);
        strapBraceA.material.diffuseColor = new BABYLON.Color3.Blue(); // new BABYLON.Color3.FromHexString(color); 

        strapBraceA.setPivotPoint(new BABYLON.Vector3(0, -distance02/2, 0));
        strapBraceA.position.copyFromFloats(_coordinates[2].x, _coordinates[2].y + distance02/2, _coordinates[2].z);

        let matrixA = strapBraceA.computeWorldMatrix(true).clone();
        let localPosA = new BABYLON.Vector3(0, 0, 0);
        let globalPosA = BABYLON.Vector3.TransformCoordinates(localPosA, matrixA);

        let vA2 = globalPosA.subtract(_coordinates[2]);
        vA2.normalize();

        // 1: rotate strap brace place A on plane
        let axisA1 = BABYLON.Vector3.Cross(vA2, v32);
        let angleA1 = BABYLON.Vector3.Dot(vA2, v32);
        angleA1 = Math.acos(angleA1);

        strapBraceA.rotate(axisA1, angleA1, BABYLON.Space.WORLD);

        // 2: after strap brace on plane, rotate to strap brace same direction (parallel) with plane
        let axisA2 = BABYLON.Vector3.Cross(BABYLON.Axis.Z, v12);
        let angleA2 = BABYLON.Vector3.Dot(BABYLON.Axis.Z, v12);
        angleA2 = Math.acos(angleA2);

        strapBraceA.rotate(axisA2, angleA2, BABYLON.Space.WORLD);

        // 3: final, rotate strap brace from position 3 -> 0;
        let angleA3 = BABYLON.Vector3.Dot(v02, v32);
        angleA3 = Math.acos(angleA3);

        strapBraceA.rotate(axisPlane, angleA3, BABYLON.Space.WORLD);     

        // ***** Strap brace mesh B (from 3 -> 1)
        let strapBraceB = BABYLON.MeshBuilder.CreateBox("strap-brace-B", {width, height: distance13, depth}, scene);
        strapBraceB.material = new BABYLON.StandardMaterial("mat", scene);
        strapBraceB.material.diffuseColor = new BABYLON.Color3.FromHexString(color); 
        
        strapBraceB.setPivotPoint(new BABYLON.Vector3(0, distance13/2, 0));
        strapBraceB.position.copyFromFloats(_coordinates[3].x, _coordinates[3].y - distance13/2, _coordinates[3].z);

        let matrixB = strapBraceB.computeWorldMatrix(true).clone();
        let localPosB = new BABYLON.Vector3(0, 0, 0);
        let globalPosB = BABYLON.Vector3.TransformCoordinates(localPosB, matrixB);

        let vB3 = globalPosB.subtract(_coordinates[3]);
        vB3.normalize();

        // 1: rotate strap brace place B on plane
        let axisB1 = BABYLON.Vector3.Cross(vB3, v23);
        let angleB1 = BABYLON.Vector3.Dot(vB3, v23);
        angleB1 = Math.acos(angleB1);

        strapBraceB.rotate(axisB1, angleB1, BABYLON.Space.WORLD);

        // 2: after strap brace on plane, rotate to strap brace same direction (parallel) with plane
        let axisB2 = BABYLON.Vector3.Cross(BABYLON.Axis.Z, v03);
        let angleB2 = BABYLON.Vector3.Dot(BABYLON.Axis.Z, v03);
        angleB2 = Math.acos(angleB2);

        strapBraceB.rotate(axisB2, angleB2, BABYLON.Space.WORLD);

        // 3: final, rotate strap brace from position 2 -> 1;
        let angleB3 = BABYLON.Vector3.Dot(v13, v23);
        angleB3 = Math.acos(angleB3);

        strapBraceB.rotate(axisPlane, -angleB3, BABYLON.Space.WORLD);

        let newMesh = BABYLON.Mesh.MergeMeshes([strapBraceA, strapBraceB], true, true, undefined, false, true);
        newMesh.name = name;

        return newMesh;
    },
}

export default BracketLibrary;