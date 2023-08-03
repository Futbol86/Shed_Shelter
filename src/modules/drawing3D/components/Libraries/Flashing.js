import * as BABYLON from "babylonjs";
import earcut from "earcut";

let FlashingLibrary = {
    NS_J(name, direction, panel, scene) {
        let {W0, H0, H1, thickness, length} = panel;

        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(0, H0, 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x, _panelCoordinates[0].y - H0, _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3(_panelCoordinates[1].x + W0, _panelCoordinates[1].y, _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x, _panelCoordinates[2].y + H1, _panelCoordinates[2].z);

        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[3].x - thickness, _panelCoordinates[3].y, _panelCoordinates[3].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[4].x, _panelCoordinates[4].y - (H1 - thickness), _panelCoordinates[4].z);
        _panelCoordinates[6] = new BABYLON.Vector3(_panelCoordinates[5].x - (W0 - 2*thickness), _panelCoordinates[5].y, _panelCoordinates[5].z);
        _panelCoordinates[7] = new BABYLON.Vector3(_panelCoordinates[6].x, _panelCoordinates[6].y + (H0 - thickness), _panelCoordinates[6].z);

        _panelCoordinates.push(_panelCoordinates[0]);

        const _shape = [
            ..._panelCoordinates
        ];

        const _path = direction === "LH" 
            ? [new BABYLON.Vector3(0, 0, 1), new BABYLON.Vector3(0, 0, length)] 
            : [new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, 0, -length)];

        const mainMesh = BABYLON.MeshBuilder.ExtrudeShape("extrude-shape", {shape: _shape, path: _path}, scene);
        if(direction === "LH") {
            mainMesh.position.y = length;
        }
        mainMesh.rotation.x = Math.PI/2;

        let capMeshBuilder = new BABYLON.PolygonMeshBuilder("cap-mesh", _panelCoordinates, scene, earcut);
        let frontCapMesh = capMeshBuilder.build(true, 0.01);
        let backCapMesh = frontCapMesh.clone();
        backCapMesh.position.y = length;

        if(direction === "RH") {
            frontCapMesh.rotation.z = Math.PI;
            backCapMesh.rotation.z = Math.PI;
        }

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        mainMesh.material = mat;
        frontCapMesh.material = mat2;
        backCapMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([mainMesh, frontCapMesh, backCapMesh], true, true, undefined, false, true);
        newMesh.name = name;

        return newMesh;
    },
    NSCF(name, direction, panel, scene) {
        let {W0, H0, thickness, length} = panel;

        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(0, -H0, 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x, _panelCoordinates[0].y + H0, _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3(_panelCoordinates[1].x + W0, _panelCoordinates[1].y, _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x, _panelCoordinates[2].y - thickness, _panelCoordinates[2].z);
        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[3].x - (W0 - thickness), _panelCoordinates[3].y, _panelCoordinates[3].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[4].x, _panelCoordinates[4].y - (H0 - thickness), _panelCoordinates[4].z);

        _panelCoordinates.push(_panelCoordinates[0]);

        const _shape = [
            ..._panelCoordinates
        ];

        const _path = direction === "LH" 
            ? [new BABYLON.Vector3(0, 0, 1), new BABYLON.Vector3(0, 0, length)] 
            : [new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, 0, -length)];

        const mainMesh = BABYLON.MeshBuilder.ExtrudeShape("extrude-shape", {shape: _shape, path: _path}, scene);
        if(direction === "LH") {
            mainMesh.position.y = length;
        }
        mainMesh.rotation.x = Math.PI/2;

        let capMeshBuilder = new BABYLON.PolygonMeshBuilder("cap-mesh", _panelCoordinates, scene, earcut);
        let frontCapMesh = capMeshBuilder.build(true, 0.01);
        let backCapMesh = frontCapMesh.clone();
        backCapMesh.position.y = length;

        if(direction === "RH") {
            frontCapMesh.rotation.z = Math.PI;
            backCapMesh.rotation.z = Math.PI;
        }

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        mainMesh.material = mat;
        frontCapMesh.material = mat2;
        backCapMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([mainMesh, frontCapMesh, backCapMesh], true, true, undefined, false, true);
        newMesh.name = name;

        return newMesh;
    },
    NSGIF(name, direction, panel, scene) {
        let {W0, H0, H1, thickness, length} = panel;

        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(0, -H0, 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x, _panelCoordinates[0].y + H0, _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3(_panelCoordinates[1].x + W0, _panelCoordinates[1].y, _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x, _panelCoordinates[2].y - H1, _panelCoordinates[2].z);
        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[3].x - thickness, _panelCoordinates[3].y, _panelCoordinates[3].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[4].x, _panelCoordinates[4].y + (H1 - thickness), _panelCoordinates[4].z);
        _panelCoordinates[6] = new BABYLON.Vector3(_panelCoordinates[5].x - (W0 - 2*thickness), _panelCoordinates[5].y, _panelCoordinates[5].z);
        _panelCoordinates[7] = new BABYLON.Vector3(_panelCoordinates[6].x, _panelCoordinates[6].y - (H0 - thickness), _panelCoordinates[6].z);

        _panelCoordinates.push(_panelCoordinates[0]);

        const _shape = [
            ..._panelCoordinates
        ];

        const _path = direction === "LH" 
            ? [new BABYLON.Vector3(0, 0, 1), new BABYLON.Vector3(0, 0, length)] 
            : [new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, 0, -length)];

        const mainMesh = BABYLON.MeshBuilder.ExtrudeShape("extrude-shape", {shape: _shape, path: _path}, scene);
        if(direction === "LH") {
            mainMesh.position.y = length;
        }
        mainMesh.rotation.x = Math.PI/2;

        let capMeshBuilder = new BABYLON.PolygonMeshBuilder("cap-mesh", _panelCoordinates, scene, earcut);
        let frontCapMesh = capMeshBuilder.build(true, 0.01);
        let backCapMesh = frontCapMesh.clone();
        backCapMesh.position.y = length;

        if(direction === "RH") {
            frontCapMesh.rotation.z = Math.PI;
            backCapMesh.rotation.z = Math.PI;
        }

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        mainMesh.material = mat;
        frontCapMesh.material = mat2;
        backCapMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([mainMesh, frontCapMesh, backCapMesh], true, true, undefined, false, true);
        newMesh.name = name;

        return newMesh;
    },
    NSHCF(name, direction, panel, scene) {
        let {W0, W1, W2, H0, H1, H2, thickness, length} = panel;

        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(0, -H0, 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x, _panelCoordinates[0].y + H0, _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3(_panelCoordinates[1].x - W0, _panelCoordinates[1].y, _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x, _panelCoordinates[2].y + H1, _panelCoordinates[2].z);
        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[3].x + W1, _panelCoordinates[3].y, _panelCoordinates[3].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[4].x, _panelCoordinates[4].y - H2, _panelCoordinates[4].z);
        _panelCoordinates[6] = new BABYLON.Vector3(_panelCoordinates[5].x + W2, _panelCoordinates[5].y, _panelCoordinates[5].z);
        _panelCoordinates[7] = new BABYLON.Vector3(_panelCoordinates[6].x, _panelCoordinates[6].y - thickness, _panelCoordinates[6].z);
        _panelCoordinates[8] = new BABYLON.Vector3(_panelCoordinates[7].x - (W2 + thickness), _panelCoordinates[7].y, _panelCoordinates[7].z);
        _panelCoordinates[9] = new BABYLON.Vector3(_panelCoordinates[8].x, _panelCoordinates[8].y + H2, _panelCoordinates[8].z);
        _panelCoordinates[10] = new BABYLON.Vector3(_panelCoordinates[9].x - (W1 - 2*thickness), _panelCoordinates[9].y, _panelCoordinates[9].z);
        _panelCoordinates[11] = new BABYLON.Vector3(_panelCoordinates[10].x, _panelCoordinates[10].y - (H1 - 2*thickness), _panelCoordinates[10].z);
        _panelCoordinates[12] = new BABYLON.Vector3(_panelCoordinates[11].x + W0, _panelCoordinates[11].y, _panelCoordinates[11].z);
        _panelCoordinates[13] = new BABYLON.Vector3(_panelCoordinates[12].x, _panelCoordinates[12].y - (H0 + thickness), _panelCoordinates[12].z);

        _panelCoordinates.push(_panelCoordinates[0]);

        const _shape = [
            ..._panelCoordinates
        ];

        const _path = direction === "LH" 
            ? [new BABYLON.Vector3(0, 0, 1), new BABYLON.Vector3(0, 0, length)] 
            : [new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, 0, -length)];

        const mainMesh = BABYLON.MeshBuilder.ExtrudeShape("extrude-shape", {shape: _shape, path: _path}, scene);
        if(direction === "LH") {
            mainMesh.position.y = length;
        }
        mainMesh.rotation.x = Math.PI/2;

        let capMeshBuilder = new BABYLON.PolygonMeshBuilder("cap-mesh", _panelCoordinates, scene, earcut);
        let frontCapMesh = capMeshBuilder.build(true, 0.01);
        let backCapMesh = frontCapMesh.clone();
        backCapMesh.position.y = length;

        if(direction === "RH") {
            frontCapMesh.rotation.z = Math.PI;
            backCapMesh.rotation.z = Math.PI;
        }

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        mainMesh.material = mat;
        frontCapMesh.material = mat2;
        backCapMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([mainMesh, frontCapMesh, backCapMesh], true, true, undefined, false, true);
        newMesh.name = name;

        return newMesh;
    },
    NSHCF_RD(name, direction, panel, scene) {
        let {W0, W1, H0, H1, thickness, length} = panel;

        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(-W0, 0, 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x + W0, _panelCoordinates[0].y, _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3(_panelCoordinates[1].x, _panelCoordinates[1].y - H0, _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x + W1, _panelCoordinates[2].y, _panelCoordinates[2].z);
        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[3].x, _panelCoordinates[3].y + H1, _panelCoordinates[3].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[4].x - thickness, _panelCoordinates[4].y, _panelCoordinates[4].z);
        _panelCoordinates[6] = new BABYLON.Vector3(_panelCoordinates[5].x, _panelCoordinates[5].y - (H1 - thickness), _panelCoordinates[5].z);
        _panelCoordinates[7] = new BABYLON.Vector3(_panelCoordinates[6].x - (W1 - 2*thickness), _panelCoordinates[6].y, _panelCoordinates[6].z);
        _panelCoordinates[8] = new BABYLON.Vector3(_panelCoordinates[7].x, _panelCoordinates[7].y + H0, _panelCoordinates[7].z);
        _panelCoordinates[9] = new BABYLON.Vector3(_panelCoordinates[8].x - (W0 + thickness), _panelCoordinates[8].y, _panelCoordinates[8].z);

        _panelCoordinates.push(_panelCoordinates[0]);

        const _shape = [
            ..._panelCoordinates
        ];

        const _path = direction === "LH" 
            ? [new BABYLON.Vector3(0, 0, 1), new BABYLON.Vector3(0, 0, length)] 
            : [new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, 0, -length)];

        const mainMesh = BABYLON.MeshBuilder.ExtrudeShape("extrude-shape", {shape: _shape, path: _path}, scene);
        if(direction === "LH") {
            mainMesh.position.y = length;
        }
        mainMesh.rotation.x = Math.PI/2;

        let capMeshBuilder = new BABYLON.PolygonMeshBuilder("cap-mesh", _panelCoordinates, scene, earcut);
        let frontCapMesh = capMeshBuilder.build(true, 0.01);
        let backCapMesh = frontCapMesh.clone();
        backCapMesh.position.y = length;

        if(direction === "RH") {
            frontCapMesh.rotation.z = Math.PI;
            backCapMesh.rotation.z = Math.PI;
        }

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        mainMesh.material = mat;
        frontCapMesh.material = mat2;
        backCapMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([mainMesh, frontCapMesh, backCapMesh], true, true, undefined, false, true);
        newMesh.name = name;

        return newMesh;
    },
    NSHCF_TCV(name, direction, panel, scene) {
        let {W0, W1, H0, angle, thickness, length} = panel;

        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(0, H0, 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x, _panelCoordinates[0].y - H0, _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3(_panelCoordinates[1].x + W0, _panelCoordinates[1].y, _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x + W1*Math.cos(Math.PI - angle), _panelCoordinates[2].y + W1*Math.sin(Math.PI - angle), _panelCoordinates[2].z);
        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[3].x - thickness*Math.sin(Math.PI - angle), _panelCoordinates[3].y + thickness*Math.cos(Math.PI - angle), _panelCoordinates[3].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[4].x - W1*Math.cos(Math.PI - angle), _panelCoordinates[4].y - W1*Math.sin(Math.PI - angle), _panelCoordinates[4].z);
        _panelCoordinates[6] = new BABYLON.Vector3(_panelCoordinates[5].x - (W0 - thickness - thickness*Math.sin(Math.PI - angle)), _panelCoordinates[5].y, _panelCoordinates[5].z);
        _panelCoordinates[7] = new BABYLON.Vector3(_panelCoordinates[6].x, _panelCoordinates[6].y + (H0 - thickness*Math.cos(Math.PI - angle)), _panelCoordinates[6].z);

        _panelCoordinates.push(_panelCoordinates[0]);

        const _shape = [
            ..._panelCoordinates
        ];

        const _path = direction === "LH" 
            ? [new BABYLON.Vector3(0, 0, 1), new BABYLON.Vector3(0, 0, length)] 
            : [new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, 0, -length)];

        const mainMesh = BABYLON.MeshBuilder.ExtrudeShape("extrude-shape", {shape: _shape, path: _path}, scene);
        if(direction === "LH") {
            mainMesh.position.y = length;
        }
        mainMesh.rotation.x = Math.PI/2;

        let capMeshBuilder = new BABYLON.PolygonMeshBuilder("cap-mesh", _panelCoordinates, scene, earcut);
        let frontCapMesh = capMeshBuilder.build(true, 0.01);
        let backCapMesh = frontCapMesh.clone();
        backCapMesh.position.y = length;

        if(direction === "RH") {
            frontCapMesh.rotation.z = Math.PI;
            backCapMesh.rotation.z = Math.PI;
        }

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        mainMesh.material = mat;
        frontCapMesh.material = mat2;
        backCapMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([mainMesh, frontCapMesh, backCapMesh], true, true, undefined, false, true);
        newMesh.name = name;

        return newMesh;
    },
    NSHOF(name, direction, panel, scene) {
        let {W0, W1, W2, H0, H1, thickness, length} = panel;

        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(W0, 0, 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x - W0, _panelCoordinates[0].y, _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3(_panelCoordinates[1].x, _panelCoordinates[1].y + H0, _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x + W1, _panelCoordinates[2].y, _panelCoordinates[2].z);
        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[3].x, _panelCoordinates[3].y - H1, _panelCoordinates[3].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[4].x + W2, _panelCoordinates[4].y, _panelCoordinates[4].z);
        _panelCoordinates[6] = new BABYLON.Vector3(_panelCoordinates[5].x, _panelCoordinates[5].y - thickness, _panelCoordinates[5].z);
        _panelCoordinates[7] = new BABYLON.Vector3(_panelCoordinates[6].x - (W2 + thickness), _panelCoordinates[6].y, _panelCoordinates[6].z);
        _panelCoordinates[8] = new BABYLON.Vector3(_panelCoordinates[7].x, _panelCoordinates[7].y + H1, _panelCoordinates[7].z);
        _panelCoordinates[9] = new BABYLON.Vector3(_panelCoordinates[8].x - (W1 - 2*thickness), _panelCoordinates[8].y, _panelCoordinates[8].z);
        _panelCoordinates[10] = new BABYLON.Vector3(_panelCoordinates[9].x, _panelCoordinates[9].y - (H0 - 2*thickness), _panelCoordinates[9].z);
        _panelCoordinates[11] = new BABYLON.Vector3(_panelCoordinates[10].x + (W0 - thickness), _panelCoordinates[10].y, _panelCoordinates[10].z);

        _panelCoordinates.push(_panelCoordinates[0]);
        
        const _shape = [
            ..._panelCoordinates
        ];

        const _path = direction === "LH" 
            ? [new BABYLON.Vector3(0, 0, 1), new BABYLON.Vector3(0, 0, length)] 
            : [new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, 0, -length)];

        const mainMesh = BABYLON.MeshBuilder.ExtrudeShape("extrude-shape", {shape: _shape, path: _path}, scene);

        if(direction === "LH") {
            mainMesh.position.y = length;
        }
        mainMesh.rotation.x = Math.PI/2;

        let capMeshBuilder = new BABYLON.PolygonMeshBuilder("cap-mesh", _panelCoordinates, scene, earcut);
        let frontCapMesh = capMeshBuilder.build(true, 0.01);
        let backCapMesh = frontCapMesh.clone();
        backCapMesh.position.y = length;

        if(direction === "RH") {
            frontCapMesh.rotation.z = Math.PI;
            backCapMesh.rotation.z = Math.PI;
        }

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        mainMesh.material = mat;
        frontCapMesh.material = mat2;
        backCapMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([mainMesh, frontCapMesh, backCapMesh], true, true, undefined, false, true);
        newMesh.name = name;

        return newMesh;
    },
    NSICF(name, direction, panel, scene) {
        let {W0, H0, thickness, length} = panel;

        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(-W0, 0, 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x + W0, _panelCoordinates[0].y, _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3(_panelCoordinates[1].x, _panelCoordinates[1].y + H0, _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x - thickness, _panelCoordinates[2].y, _panelCoordinates[2].z);
        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[3].x, _panelCoordinates[3].y - (H0 - thickness), _panelCoordinates[3].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[4].x - (W0 - thickness), _panelCoordinates[4].y, _panelCoordinates[4].z);

        _panelCoordinates.push(_panelCoordinates[0]);

        const _shape = [
            ..._panelCoordinates
        ];

        const _path = direction === "LH" 
            ? [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, length)] 
            : [new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, 0, -length)];

        const mainMesh = BABYLON.MeshBuilder.ExtrudeShape("extrude-shape", {shape: _shape,  path: _path}, scene);
        
        if(direction === "LH") {
            mainMesh.position.y = length;
        }
        mainMesh.rotation.x = Math.PI/2;

        let capMeshBuilder = new BABYLON.PolygonMeshBuilder("cap-mesh", _panelCoordinates, scene, earcut);
        let frontCapMesh = capMeshBuilder.build(true, 0.01);
        let backCapMesh = frontCapMesh.clone();
        backCapMesh.position.y = length;

        if(direction === "RH") {
            frontCapMesh.rotation.z = Math.PI;
            backCapMesh.rotation.z = Math.PI;
        }

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        mainMesh.material = mat;
        frontCapMesh.material = mat2;
        backCapMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([mainMesh, frontCapMesh, backCapMesh], true, true, undefined, false, true);
        newMesh.name = name;

        return newMesh;
    },
    NSOF(name, direction, panel, scene) {
        let {W0, W1, H0, thickness, length} = panel;

        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(W0, 0, 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x - W0, _panelCoordinates[0].y, _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3(_panelCoordinates[1].x, _panelCoordinates[1].y + H0, _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x + W1, _panelCoordinates[2].y, _panelCoordinates[2].z);
        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[3].x, _panelCoordinates[3].y - thickness, _panelCoordinates[3].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[4].x - (W1 - thickness), _panelCoordinates[4].y, _panelCoordinates[4].z);
        _panelCoordinates[6] = new BABYLON.Vector3(_panelCoordinates[5].x, _panelCoordinates[5].y - (H0 - 2*thickness), _panelCoordinates[5].z);
        _panelCoordinates[7] = new BABYLON.Vector3(_panelCoordinates[6].x + (W0 - thickness), _panelCoordinates[6].y, _panelCoordinates[6].z);

        _panelCoordinates.push(_panelCoordinates[0]);

        const _shape = [
            ..._panelCoordinates
        ];

        const _path = direction === "LH" 
            ? [new BABYLON.Vector3(0, 0, 1), new BABYLON.Vector3(0, 0, length)] 
            : [new BABYLON.Vector3(0, 0, -1), new BABYLON.Vector3(0, 0, -length)];

        const mainMesh = BABYLON.MeshBuilder.ExtrudeShape("extrude-shape", {shape: _shape, path: _path}, scene);

        if(direction === "LH") {
            mainMesh.position.y = length;
        }
        mainMesh.rotation.x = Math.PI/2;

        let capMeshBuilder = new BABYLON.PolygonMeshBuilder("cap-mesh", _panelCoordinates, scene, earcut);
        let frontCapMesh = capMeshBuilder.build(true, 0.01);
        let backCapMesh = frontCapMesh.clone();
        backCapMesh.position.y = length;

        if(direction === "RH") {
            frontCapMesh.rotation.z = Math.PI;
            backCapMesh.rotation.z = Math.PI;
        }

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        mainMesh.material = mat;
        frontCapMesh.material = mat2;
        backCapMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([mainMesh, frontCapMesh, backCapMesh], true, true, undefined, false, true);
        newMesh.name = name;

        return newMesh;
    },
}

export default FlashingLibrary;