import * as BABYLON from "babylonjs";
import earcut from "earcut";

function createArc({_xCenter, _yCenter, _radiusX, _radiusY, _fromAngle, _toAngle}) {
    let _ellipsePoints = [];

    if(_fromAngle <= _toAngle) {
        for(let theta = _fromAngle; theta <= _toAngle; theta += Math.PI/20) {
            let x = _xCenter + _radiusX*Math.cos(theta);
            let y = _yCenter + _radiusY*Math.sin(theta);

            _ellipsePoints.push(new BABYLON.Vector3(x, y, 0));
        }
    } else {
        for(let theta = _fromAngle; theta >= _toAngle; theta -= Math.PI/20) {
            let x = _xCenter + _radiusX*Math.cos(theta);
            let y = _yCenter + _radiusY*Math.sin(theta);

            _ellipsePoints.push(new BABYLON.Vector3(x, y, 0));
        }
    }

    return _ellipsePoints;
}

function createTubeMesh(width, length, height, radius, scene) {
    let _firstArcCoordinates  = createArc({_xCenter: 0, _yCenter: 0, _radiusX: radius, _radiusY: radius, _fromAngle: Math.PI, _toAngle: Math.PI + Math.PI/2});
    let _secondArcCoordinates = createArc({_xCenter: width, _yCenter: 0, _radiusX: radius, _radiusY: radius, _fromAngle: -Math.PI/2, _toAngle: 0});
    let _thirdArcCoordinates  = createArc({_xCenter: width, _yCenter: length, _radiusX: radius, _radiusY: radius, _fromAngle: 0, _toAngle: Math.PI/2});
    let _fourthArcCoordinates = createArc({_xCenter: 0, _yCenter: length, _radiusX: radius, _radiusY: radius, _fromAngle: Math.PI/2, _toAngle: Math.PI});

    let _outerTubeCoordinates = [];

    _outerTubeCoordinates = [..._firstArcCoordinates, ..._secondArcCoordinates, ..._thirdArcCoordinates, ..._fourthArcCoordinates];

    let outerTubeMeshBuilder = new BABYLON.PolygonMeshBuilder("outer-tube-mesh", _outerTubeCoordinates, scene, earcut);
    let outerTubeMesh = outerTubeMeshBuilder.build(true, height);

    let innerTubeMesh = outerTubeMesh.clone("inner-tube-mesh");
    innerTubeMesh.scaling = new BABYLON.Vector3((width - radius)/width, 1, (length - radius)/length);
    innerTubeMesh.position = new BABYLON.Vector3(radius/2, 0, radius/2);

    let outerTubeMeshCSG = BABYLON.CSG.FromMesh(outerTubeMesh);
    let innerTubeMeshCSG = BABYLON.CSG.FromMesh(innerTubeMesh);
    outerTubeMesh.dispose();
    innerTubeMesh.dispose();

    let _tubeMeshCSG = outerTubeMeshCSG.subtract(innerTubeMeshCSG);
    let _tubeMesh = _tubeMeshCSG.toMesh("tube-mesh", new BABYLON.StandardMaterial(""), scene, true);

    return _tubeMesh;
}

function createPackerMeshes(packerParams, tubeParams, offsetX, offsetY, offsetZ0, offsetZ1, mat = null) {
    let packerMesh = BABYLON.MeshBuilder.CreateBox("packer-mesh", {width: packerParams.width, height: packerParams.height, depth: packerParams.thickness});
    packerMesh.material = mat;

    let _packerMeshes = [];

    //** Front
    _packerMeshes[0] = packerMesh.clone();
    _packerMeshes[0].rotation.x = Math.PI/2;
    _packerMeshes[0].position.x = offsetX + tubeParams.width/2;
    _packerMeshes[0].position.y = offsetY - packerParams.thickness;
    _packerMeshes[0].position.z = tubeParams.height - (packerParams.height/2 + offsetZ0);

    _packerMeshes[1] = packerMesh.clone();
    _packerMeshes[1].rotation.x = Math.PI/2;
    _packerMeshes[1].position.x = offsetX + tubeParams.width/2;
    _packerMeshes[1].position.y = offsetY - packerParams.thickness;
    _packerMeshes[1].position.z = tubeParams.height - (packerParams.height/2 + offsetZ0 + offsetZ1);

    //** Back
    _packerMeshes[2] = packerMesh.clone();
    _packerMeshes[2].rotation.x = Math.PI/2;
    _packerMeshes[2].position.x = offsetX + tubeParams.width/2;
    _packerMeshes[2].position.y = offsetY + packerParams.thickness + tubeParams.width;
    _packerMeshes[2].position.z = tubeParams.height - (packerParams.height/2 + offsetZ0);

    _packerMeshes[3] = packerMesh.clone();
    _packerMeshes[3].rotation.x = Math.PI/2;
    _packerMeshes[3].position.x = offsetX + tubeParams.width/2;
    _packerMeshes[3].position.y = offsetY + packerParams.thickness + tubeParams.width;
    _packerMeshes[3].position.z = tubeParams.height - (packerParams.height/2 + offsetZ0 + offsetZ1);

    //** Left
    _packerMeshes[4] = packerMesh.clone();
    _packerMeshes[4].rotation.y = Math.PI/2;
    _packerMeshes[4].rotation.z = Math.PI/2;
    _packerMeshes[4].position.x = offsetX - packerParams.thickness;
    _packerMeshes[4].position.y = offsetY + tubeParams.length/2;
    _packerMeshes[4].position.z = tubeParams.height - (packerParams.height/2 + offsetZ0);
    
    _packerMeshes[5] = packerMesh.clone();
    _packerMeshes[5].rotation.y = Math.PI/2;
    _packerMeshes[5].rotation.z = Math.PI/2;
    _packerMeshes[5].position.x = offsetX - packerParams.thickness;
    _packerMeshes[5].position.y = offsetY + tubeParams.length/2;
    _packerMeshes[5].position.z = tubeParams.height - (packerParams.height/2 + offsetZ0 + offsetZ1);

    //** Right
    _packerMeshes[6] = packerMesh.clone();
    _packerMeshes[6].rotation.y = Math.PI/2;
    _packerMeshes[6].rotation.z = Math.PI/2;
    _packerMeshes[6].position.x = tubeParams.length + (offsetX + packerParams.thickness);
    _packerMeshes[6].position.y = offsetY + tubeParams.length/2;
    _packerMeshes[6].position.z = tubeParams.height - (packerParams.height/2 + offsetZ0);
    
    _packerMeshes[7] = packerMesh.clone();
    _packerMeshes[7].rotation.y = Math.PI/2;
    _packerMeshes[7].rotation.z = Math.PI/2;
    _packerMeshes[7].position.x = tubeParams.length + (offsetX + packerParams.thickness);
    _packerMeshes[7].position.y = offsetY + tubeParams.length/2;
    _packerMeshes[7].position.z = tubeParams.height - (packerParams.height/2 + offsetZ0 + offsetZ1);

    packerMesh.dispose();
    return _packerMeshes;
}

let BasePlateLibrary = {
    NSBPC(name, panel, holes, scene) {
        let {W0, W1, H0, H1, H2, angle, thickness, length} = panel;
        let {holeColumn = 1, sideHoleNum = 4, W01, H01, radius} = holes;
   
        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        let multiMat = new BABYLON.MultiMaterial("multiMat", scene);
        multiMat.subMaterials.push(mat, mat2);

        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(0, (H1 + H2), 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x, _panelCoordinates[0].y - H0, _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3(_panelCoordinates[1].x + W0*Math.cos(angle - Math.PI/2), _panelCoordinates[1].y - W0*Math.sin(angle - Math.PI/2), _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x + W0*Math.cos(angle - Math.PI/2), _panelCoordinates[2].y + W0*Math.sin(angle - Math.PI/2), _panelCoordinates[2].z);
        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[3].x, _panelCoordinates[3].y + H0, _panelCoordinates[3].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[4].x - thickness, _panelCoordinates[4].y, _panelCoordinates[4].z);
        _panelCoordinates[6] = new BABYLON.Vector3(_panelCoordinates[3].x - thickness, _panelCoordinates[3].y + thickness*(1 - Math.tan(angle - Math.PI/2)), _panelCoordinates[5].z);
        _panelCoordinates[7] = new BABYLON.Vector3(_panelCoordinates[2].x, _panelCoordinates[2].y + thickness, _panelCoordinates[2].z);
        _panelCoordinates[8] = new BABYLON.Vector3(_panelCoordinates[1].x + thickness, _panelCoordinates[1].y + thickness*(1 - Math.tan(angle - Math.PI/2)), _panelCoordinates[1].z);
        _panelCoordinates[9] = new BABYLON.Vector3(_panelCoordinates[0].x + thickness, _panelCoordinates[0].y, _panelCoordinates[0].z);

        _panelCoordinates.push(_panelCoordinates[0]);

        const _shape = [
            ..._panelCoordinates
        ];

        const _path = [new BABYLON.Vector3(0, 0, 1), new BABYLON.Vector3(0, 0, length)];

        const mainMesh = BABYLON.MeshBuilder.ExtrudeShape("main-shape", {shape: _shape, path: _path}, scene);
        mainMesh.position.y = length;
        mainMesh.rotation.x = Math.PI/2;
        mainMesh.material = mat;

        let capMeshBuilder = new BABYLON.PolygonMeshBuilder("cap-mesh", _panelCoordinates, scene, earcut);
        let frontCapMesh = capMeshBuilder.build(true, 0.01);
        frontCapMesh.material = mat2;

        let backCapMesh = frontCapMesh.clone();
        backCapMesh.position.y = length;
        backCapMesh.material = mat2;

        let originMesh = BABYLON.Mesh.MergeMeshes([mainMesh, frontCapMesh, backCapMesh], true, true, undefined, false, true);

        let cylinderMesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 2*W1, diameter: radius}, scene);
        cylinderMesh.rotation.z = Math.PI/2;
        cylinderMesh.position.x = 0.5*W1;

        //*** Holes
        let holeMeshes = [];

        if(holeColumn === 2) {
            // column 1
            for(let i = 0; i < sideHoleNum; i++) {
                let _holeMesh = cylinderMesh.clone();
                _holeMesh.position.y = (length - W01)/2;
                _holeMesh.position.z = (H2 + i*H01);

                holeMeshes.push(_holeMesh);
            }
            // column 2
            for(let i = 0; i < sideHoleNum; i++) {
                let _holeMesh = cylinderMesh.clone();
                _holeMesh.position.y = (length - W01)/2 + W01;
                _holeMesh.position.z = (H2 + i*H01);

                holeMeshes.push(_holeMesh);
            }
        } else {
            for(let i = 0; i < sideHoleNum; i++) {
                let _holeMesh = cylinderMesh.clone();
                _holeMesh.position.y = length/2;
                _holeMesh.position.z = (H2 + i*H01);

                holeMeshes.push(_holeMesh);
            }
        }

        var newMeshCSG = BABYLON.CSG.FromMesh(originMesh);

        for(let i = 0; i < holeMeshes.length; i++) {
            let _meshCSG = BABYLON.CSG.FromMesh(holeMeshes[i]);
            newMeshCSG = newMeshCSG.subtract(_meshCSG);
        }

        let newMesh = newMeshCSG.toMesh(name, multiMat, scene, true);

        originMesh.dispose();
        cylinderMesh.dispose();

        for(let i = 0; i < holeMeshes.length; i++) {
            holeMeshes[i].dispose();
        }

        return newMesh;
    },
    NSBP(name, panel, holes, scene) {
        let {W0, W1, H0, thickness0, thickness1, length} = panel;
        let {holeColumn = 1, W01, W02, H01, H02, sideHoleNum = 4, bottomHoleNum = 2, sideHoleRadius, bottomHoleRadius} = holes;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        let multiMat = new BABYLON.MultiMaterial("multiMat", scene);
        multiMat.subMaterials.push(mat, mat2);

        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x + W0, _panelCoordinates[0].y, _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3(_panelCoordinates[1].x, _panelCoordinates[1].y + thickness0, _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x - (W0 - (W1 + 2*thickness1))/2, _panelCoordinates[2].y, _panelCoordinates[2].z);
        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[3].x, _panelCoordinates[3].y + (H0 - thickness0), _panelCoordinates[3].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[4].x - thickness1, _panelCoordinates[4].y, _panelCoordinates[4].z);
        _panelCoordinates[6] = new BABYLON.Vector3(_panelCoordinates[5].x, _panelCoordinates[5].y - (H0 - thickness0), _panelCoordinates[5].z);
        _panelCoordinates[7] = new BABYLON.Vector3(_panelCoordinates[6].x - W1, _panelCoordinates[6].y, _panelCoordinates[6].z);
        _panelCoordinates[8] = new BABYLON.Vector3(_panelCoordinates[7].x, _panelCoordinates[7].y + (H0 - thickness0), _panelCoordinates[7].z);
        _panelCoordinates[9] = new BABYLON.Vector3(_panelCoordinates[8].x - thickness1, _panelCoordinates[8].y, _panelCoordinates[8].z);
        _panelCoordinates[10] = new BABYLON.Vector3(_panelCoordinates[9].x, _panelCoordinates[9].y - (H0 - thickness0), _panelCoordinates[9].z);
        _panelCoordinates[11] = new BABYLON.Vector3(_panelCoordinates[10].x - (W0 - (W1 + 2*thickness1))/2, _panelCoordinates[10].y, _panelCoordinates[10].z);

        _panelCoordinates.push(_panelCoordinates[0]);

        const _shape = [
            ..._panelCoordinates
        ];

        const _path = [new BABYLON.Vector3(0, 0, 1), new BABYLON.Vector3(0, 0, length)];

        const mainMesh = BABYLON.MeshBuilder.ExtrudeShape("main-shape", {shape: _shape, path: _path}, scene);
        mainMesh.position.y = length;
        mainMesh.rotation.x = Math.PI/2;
        mainMesh.material = mat;

        let capMeshBuilder = new BABYLON.PolygonMeshBuilder("cap-mesh", _panelCoordinates, scene, earcut);
        let frontCapMesh = capMeshBuilder.build(true, 0.01);
        frontCapMesh.material = mat2;

        let backCapMesh = frontCapMesh.clone();
        backCapMesh.position.y = length;
        backCapMesh.material = mat2;

        let originMesh = BABYLON.Mesh.MergeMeshes([mainMesh, frontCapMesh, backCapMesh], true, true, undefined, false, true);
        let sideCylinderMesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 2*W1, diameter: sideHoleRadius}, scene);
        let bottomCylinderMesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 2*W1, diameter: bottomHoleRadius}, scene);

        //*** Holes
        let holeMeshes = [];

        if(holeColumn === 2) {
            // Side Hole - Column 1
            for(let i = 0; i < sideHoleNum; i++) {
                let _holeMesh = sideCylinderMesh.clone();
                _holeMesh.rotation.z = Math.PI/2;
                _holeMesh.position.x = 0.5*W1;
                _holeMesh.position.y = (length - W02)/2;
                _holeMesh.position.z = H0 - thickness0 - (H01 + i*H02);

                holeMeshes.push(_holeMesh);
            }

            // Side Hole - Column 2
            for(let i = 0; i < sideHoleNum; i++) {
                let _holeMesh = sideCylinderMesh.clone();
                _holeMesh.rotation.z = Math.PI/2;
                _holeMesh.position.x = 0.5*W1;
                _holeMesh.position.y = (length - W02)/2 + W02;
                _holeMesh.position.z = H0 - thickness0 - (H01 + i*H02);

                holeMeshes.push(_holeMesh);
            }

            // Bottom Hole - Column 1
            for(let i = 0; i < bottomHoleNum; i++) {
                let _holeMesh = bottomCylinderMesh.clone();
                _holeMesh.rotation.x = Math.PI/2;
                _holeMesh.position.x = (W0 - W01)/2 + i*W01;
                _holeMesh.position.y = (length - W02)/2;

                holeMeshes.push(_holeMesh);
            }

            // Bottom Hole - Column 2
            for(let i = 0; i < bottomHoleNum; i++) {
                let _holeMesh = bottomCylinderMesh.clone();
                _holeMesh.rotation.x = Math.PI/2;
                _holeMesh.position.x = (W0 - W01)/2 + i*W01;
                _holeMesh.position.y = (length - W02)/2 + W02;

                holeMeshes.push(_holeMesh);
            }
        } else {
            for(let i = 0; i < sideHoleNum; i++) {
                let _holeMesh = sideCylinderMesh.clone();
                _holeMesh.rotation.z = Math.PI/2;
                _holeMesh.position.x = 0.5*W1;
                _holeMesh.position.y = length/2;
                _holeMesh.position.z = H0 - thickness0 - (H01 + i*H02);

                holeMeshes.push(_holeMesh);
            }

            for(let i = 0; i < bottomHoleNum; i++) {
                let _holeMesh = bottomCylinderMesh.clone();
                _holeMesh.rotation.x = Math.PI/2;
                _holeMesh.position.x = (W0 - W01)/2 + i*W01;
                _holeMesh.position.y = length/2;

                holeMeshes.push(_holeMesh);
            }
        }

        var newMeshCSG = BABYLON.CSG.FromMesh(originMesh);

        for(let i = 0; i < holeMeshes.length; i++) {
            let _meshCSG = BABYLON.CSG.FromMesh(holeMeshes[i]);
            newMeshCSG = newMeshCSG.subtract(_meshCSG);
        }

        let newMesh = newMeshCSG.toMesh(name, multiMat, scene, true);

        originMesh.dispose();
        sideCylinderMesh.dispose();
        bottomCylinderMesh.dispose();

        for(let i = 0; i < holeMeshes.length; i++) {
            holeMeshes[i].dispose();
        }

        return newMesh;
    },
    NSBPI(name, panel, holes, scene) {
        let {W0, H0, thickness, length} = panel;
        let {holeColumn = 1, W01, W02, H01, H02, sideHoleNum = 4, bottomHoleNum = 2, sideHoleRadius, bottomHoleRadius} = holes;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        let multiMat = new BABYLON.MultiMaterial("multiMat", scene);
        multiMat.subMaterials.push(mat, mat2);

        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x + (W0 + 2*thickness), _panelCoordinates[0].y, _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3(_panelCoordinates[1].x, _panelCoordinates[1].y + H0, _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x - thickness, _panelCoordinates[2].y, _panelCoordinates[2].z);
        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[3].x, _panelCoordinates[3].y - (H0 - thickness), _panelCoordinates[3].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[4].x - W0, _panelCoordinates[4].y, _panelCoordinates[4].z);
        _panelCoordinates[6] = new BABYLON.Vector3(_panelCoordinates[5].x, _panelCoordinates[5].y + (H0 - thickness), _panelCoordinates[5].z);
        _panelCoordinates[7] = new BABYLON.Vector3(_panelCoordinates[6].x - thickness, _panelCoordinates[6].y, _panelCoordinates[6].z);

        _panelCoordinates.push(_panelCoordinates[0]);

        const _shape = [
            ..._panelCoordinates
        ];

        const _path = [new BABYLON.Vector3(0, 0, 1), new BABYLON.Vector3(0, 0, length)];

        const mainMesh = BABYLON.MeshBuilder.ExtrudeShape("main-shape", {shape: _shape, path: _path}, scene);
        mainMesh.position.y = length;
        mainMesh.rotation.x = Math.PI/2;
        mainMesh.material = mat;

        let capMeshBuilder = new BABYLON.PolygonMeshBuilder("cap-mesh", _panelCoordinates, scene, earcut);
        let frontCapMesh = capMeshBuilder.build(true, 0.01);
        frontCapMesh.material = mat2;

        let backCapMesh = frontCapMesh.clone();
        backCapMesh.position.y = length;
        backCapMesh.material = mat2;

        let originMesh = BABYLON.Mesh.MergeMeshes([mainMesh, frontCapMesh, backCapMesh], true, true, undefined, false, true);
        let sideCylinderMesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 2*W0, diameter: sideHoleRadius}, scene);
        let bottomCylinderMesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 2*W0, diameter: bottomHoleRadius}, scene);

        //*** Holes
        let holeMeshes = [];

        if(holeColumn === 2) {
            // Side Hole - Column 1
            for(let i = 0; i < sideHoleNum; i++) {
                let _holeMesh = sideCylinderMesh.clone();
                _holeMesh.rotation.z = Math.PI/2;
                _holeMesh.position.x = 0.5*W0; // move cylinder through other side mesh
                _holeMesh.position.y = (length - W02)/2;
                _holeMesh.position.z = H0 - (H01 + i*H02);

                holeMeshes.push(_holeMesh);
            }

            // Side Hole - Column 2
            for(let i = 0; i < sideHoleNum; i++) {
                let _holeMesh = sideCylinderMesh.clone();
                _holeMesh.rotation.z = Math.PI/2;
                _holeMesh.position.x = 0.5*W0;
                _holeMesh.position.y = (length - W02)/2 + W02;
                _holeMesh.position.z = H0 - (H01 + i*H02);

                holeMeshes.push(_holeMesh);
            }

            // Bottom Hole - Column 1
            for(let i = 0; i < bottomHoleNum; i++) {
                let _holeMesh = bottomCylinderMesh.clone();
                _holeMesh.rotation.x = Math.PI/2;
                _holeMesh.position.x = ((W0 - W01)/2 + thickness) + i*W01;
                _holeMesh.position.y = (length - W02)/2;

                holeMeshes.push(_holeMesh);
            }

            // Bottom Hole - Column 2
            for(let i = 0; i < bottomHoleNum; i++) {
                let _holeMesh = bottomCylinderMesh.clone();
                _holeMesh.rotation.x = Math.PI/2;
                _holeMesh.position.x = ((W0 - W01)/2 + thickness) + i*W01;
                _holeMesh.position.y = (length - W02)/2 + W02;

                holeMeshes.push(_holeMesh);
            }
        } else {
            for(let i = 0; i < sideHoleNum; i++) {
                let _holeMesh = sideCylinderMesh.clone();
                _holeMesh.rotation.z = Math.PI/2;
                _holeMesh.position.x = 0.5*W0;
                _holeMesh.position.y = length/2;
                _holeMesh.position.z = H0 - (H01 + i*H02);

                holeMeshes.push(_holeMesh);
            }

            for(let i = 0; i < bottomHoleNum; i++) {
                let _holeMesh = bottomCylinderMesh.clone();
                _holeMesh.rotation.x = Math.PI/2;
                _holeMesh.position.x = ((W0 - W01)/2 + thickness) + i*W01;
                _holeMesh.position.y = length/2;

                holeMeshes.push(_holeMesh);
            }
        }

        var newMeshCSG = BABYLON.CSG.FromMesh(originMesh);

        for(let i = 0; i < holeMeshes.length; i++) {
            let _meshCSG = BABYLON.CSG.FromMesh(holeMeshes[i]);
            newMeshCSG = newMeshCSG.subtract(_meshCSG);
        }

        let newMesh = newMeshCSG.toMesh(name, multiMat, scene, true);

        originMesh.dispose();
        sideCylinderMesh.dispose();
        bottomCylinderMesh.dispose();

        for(let i = 0; i < holeMeshes.length; i++) {
            holeMeshes[i].dispose();
        }

        return newMesh;
    },
    NSBPI_2(name, panel, holes, scene) {
        let {W0, W1, H0, thickness, length, length1} = panel;
        let {holeColumn = 1, W01, W02, H01, H02, sideHoleNum = 4, bottomHoleNum = 2, sideHoleRadius, bottomHoleRadius} = holes;
  
        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        let multiMat = new BABYLON.MultiMaterial("multiMat", scene);
        multiMat.subMaterials.push(mat, mat2);

        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x + (W0 + 2*thickness), _panelCoordinates[0].y, _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3(_panelCoordinates[1].x, _panelCoordinates[1].y + H0, _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x - thickness, _panelCoordinates[2].y, _panelCoordinates[2].z);
        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[3].x, _panelCoordinates[3].y - (H0 - thickness), _panelCoordinates[3].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[4].x - W0, _panelCoordinates[4].y, _panelCoordinates[4].z);
        _panelCoordinates[6] = new BABYLON.Vector3(_panelCoordinates[5].x, _panelCoordinates[5].y + (H0 - thickness), _panelCoordinates[5].z);
        _panelCoordinates[7] = new BABYLON.Vector3(_panelCoordinates[6].x - thickness, _panelCoordinates[6].y, _panelCoordinates[6].z);

        _panelCoordinates.push(_panelCoordinates[0]);

        const _shape = [
            ..._panelCoordinates
        ];

        const _path = [new BABYLON.Vector3(0, 0, 1), new BABYLON.Vector3(0, 0, length)];

        const mainMesh = BABYLON.MeshBuilder.ExtrudeShape("main-shape", {shape: _shape, path: _path}, scene);
        mainMesh.position.y = length;
        mainMesh.rotation.x = Math.PI/2;
        mainMesh.material = mat;

        let capMeshBuilder = new BABYLON.PolygonMeshBuilder("cap-mesh", _panelCoordinates, scene, earcut);
        let frontCapMesh = capMeshBuilder.build(true, 0.01);
        frontCapMesh.material = mat2;

        let backCapMesh = frontCapMesh.clone();
        backCapMesh.position.y = length;
        backCapMesh.material = mat2;

        let _stiffenerPanelCoordinates = [];
        _stiffenerPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _stiffenerPanelCoordinates[1] = new BABYLON.Vector3(_stiffenerPanelCoordinates[0].x + W1, _stiffenerPanelCoordinates[0].y, _stiffenerPanelCoordinates[0].z);
        _stiffenerPanelCoordinates[2] = new BABYLON.Vector3(_stiffenerPanelCoordinates[1].x, _stiffenerPanelCoordinates[1].y - length1, _stiffenerPanelCoordinates[1].z);
        _stiffenerPanelCoordinates[3] = new BABYLON.Vector3(_stiffenerPanelCoordinates[2].x - W1, _stiffenerPanelCoordinates[2].y, _stiffenerPanelCoordinates[2].z);

        let stiffenerPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _stiffenerPanelCoordinates, scene, earcut);
        let stiffenerPanelMesh = stiffenerPanelMeshBuilder.build(true, thickness);
        stiffenerPanelMesh.rotation.x = Math.PI/2;
        stiffenerPanelMesh.position.x = (W0 + 2*thickness - W1)/2;
        stiffenerPanelMesh.position.y = (length - length1)/2;
        stiffenerPanelMesh.material = mat;

        let originMesh = BABYLON.Mesh.MergeMeshes([mainMesh, frontCapMesh, backCapMesh, stiffenerPanelMesh], true, true, undefined, false, true);
        let sideCylinderMesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 2*W0, diameter: sideHoleRadius}, scene);
        let bottomCylinderMesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 2*W0, diameter: bottomHoleRadius}, scene);

        //*** Holes
        let holeMeshes = [];

        if(holeColumn === 2) {
            // Side Hole - Column 1
            for(let i = 0; i < sideHoleNum; i++) {
                let _holeMesh = sideCylinderMesh.clone();
                _holeMesh.rotation.z = Math.PI/2;
                _holeMesh.position.x = 0.5*W0; // move cylinder through other side mesh
                _holeMesh.position.y = (length - W02)/2;
                _holeMesh.position.z = H0 - (H01 + i*H02);

                holeMeshes.push(_holeMesh);
            }

            // Side Hole - Column 2
            for(let i = 0; i < sideHoleNum; i++) {
                let _holeMesh = sideCylinderMesh.clone();
                _holeMesh.rotation.z = Math.PI/2;
                _holeMesh.position.x = 0.5*W0;
                _holeMesh.position.y = (length - W02)/2 + W02;
                _holeMesh.position.z = H0 - (H01 + i*H02);

                holeMeshes.push(_holeMesh);
            }

            // Bottom Hole - Column 1
            for(let i = 0; i < bottomHoleNum; i++) {
                let _holeMesh = bottomCylinderMesh.clone();
                _holeMesh.rotation.x = Math.PI/2;
                _holeMesh.position.x = ((W0 - W01)/2 + thickness) + i*W01;
                _holeMesh.position.y = (length - W02)/2;

                holeMeshes.push(_holeMesh);
            }

            // Bottom Hole - Column 2
            for(let i = 0; i < bottomHoleNum; i++) {
                let _holeMesh = bottomCylinderMesh.clone();
                _holeMesh.rotation.x = Math.PI/2;
                _holeMesh.position.x = ((W0 - W01)/2 + thickness) + i*W01;
                _holeMesh.position.y = (length - W02)/2 + W02;

                holeMeshes.push(_holeMesh);
            }
        } else {
            for(let i = 0; i < sideHoleNum; i++) {
                let _holeMesh = sideCylinderMesh.clone();
                _holeMesh.rotation.z = Math.PI/2;
                _holeMesh.position.x = 0.5*W0;
                _holeMesh.position.y = length/2;
                _holeMesh.position.z = H0 - (H01 + i*H02);

                holeMeshes.push(_holeMesh);
            }

            for(let i = 0; i < bottomHoleNum; i++) {
                let _holeMesh = bottomCylinderMesh.clone();
                _holeMesh.rotation.x = Math.PI/2;
                _holeMesh.position.x = ((W0 - W01)/2 + thickness) + i*W01;
                _holeMesh.position.y = length/2;

                holeMeshes.push(_holeMesh);
            }
        }

        var newMeshCSG = BABYLON.CSG.FromMesh(originMesh);

        for(let i = 0; i < holeMeshes.length; i++) {
            let _meshCSG = BABYLON.CSG.FromMesh(holeMeshes[i]);
            newMeshCSG = newMeshCSG.subtract(_meshCSG);
        }

        let newMesh = newMeshCSG.toMesh(name, multiMat, scene, true);

        originMesh.dispose();
        sideCylinderMesh.dispose();
        bottomCylinderMesh.dispose();

        for(let i = 0; i < holeMeshes.length; i++) {
            holeMeshes[i].dispose();
        }

        return newMesh;
    },
    NSBP_P(name, panel, holes, scene) {
        let {W0, W1, H0, thickness0, thickness1, length} = panel;
        let {W01, bottomHoleNum = 4, bottomHoleRadius} = holes;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        let multiMat = new BABYLON.MultiMaterial("multiMat", scene);
        multiMat.subMaterials.push(mat, mat2);

        let _bottomCoordinates = [];
        _bottomCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _bottomCoordinates[1] = new BABYLON.Vector3(_bottomCoordinates[0].x + W0, _bottomCoordinates[0].y, _bottomCoordinates[0].z);
        _bottomCoordinates[2] = new BABYLON.Vector3(_bottomCoordinates[1].x, _bottomCoordinates[1].y - length, _bottomCoordinates[1].z);
        _bottomCoordinates[3] = new BABYLON.Vector3(_bottomCoordinates[2].x - W0, _bottomCoordinates[2].y, _bottomCoordinates[2].z);

        let bottomMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _bottomCoordinates, scene, earcut);
        let bottomMesh = bottomMeshBuilder.build(true, thickness0);
        bottomMesh.rotation.x = Math.PI/2;
        bottomMesh.material = mat;

        let tubeMesh = createTubeMesh(W1, W1, H0, thickness1, scene);
        tubeMesh.rotation.x = -Math.PI/2;
        tubeMesh.position.x = (W0 - W1)/2;
        tubeMesh.position.y = (length - W1)/2;

        let originMesh = BABYLON.Mesh.MergeMeshes([bottomMesh, tubeMesh], true, true, undefined, false, true);
        let cylinderMesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 2*W0, diameter: bottomHoleRadius}, scene);

        //*** Holes
        let holeMeshes = [];

        if(bottomHoleNum === 4) {
            // Bottom Hole - Row 1
            for(let i = 0; i < bottomHoleNum/2; i++) {
                let _holeMesh = cylinderMesh.clone();
                _holeMesh.rotation.x = Math.PI/2;
                _holeMesh.position.x = (W0 - W01)/2 + i*W01;
                _holeMesh.position.y = (length - W01)/2;

                holeMeshes.push(_holeMesh);
            }

            // Bottom Hole - Row 2
            for(let i = 0; i < bottomHoleNum/2; i++) {
                let _holeMesh = cylinderMesh.clone();
                _holeMesh.rotation.x = Math.PI/2;
                _holeMesh.position.x = (W0 - W01)/2 + i*W01;
                _holeMesh.position.y = (length - W01)/2 + W01;

                holeMeshes.push(_holeMesh);
            }
        } else {
            for(let i = 0; i < bottomHoleNum; i++) {
                let _holeMesh = cylinderMesh.clone();
                _holeMesh.rotation.x = Math.PI/2;
                _holeMesh.position.x = (W0 - W01)/2 + i*W01;
                _holeMesh.position.y = length/2;

                holeMeshes.push(_holeMesh);
            }
        }

        var newMeshCSG = BABYLON.CSG.FromMesh(originMesh);

        for(let i = 0; i < holeMeshes.length; i++) {
            let _meshCSG = BABYLON.CSG.FromMesh(holeMeshes[i]);
            newMeshCSG = newMeshCSG.subtract(_meshCSG);
        }

        let newMesh = newMeshCSG.toMesh(name, multiMat, scene, true);

        originMesh.dispose();
        cylinderMesh.dispose();

        for(let i = 0; i < holeMeshes.length; i++) {
            holeMeshes[i].dispose();
        }

        return newMesh;
    },
    NSBP_P2(name, panel, holes, scene) {
        let {W0, W1, W2, H0, thickness0, thickness1, length0, length1} = panel;
        let {W01, W02, H01, H02, bottomHoleRadius} = holes;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        let multiMat = new BABYLON.MultiMaterial("multiMat", scene);
        multiMat.subMaterials.push(mat, mat2);

        //*** Bottom Mesh
        let _bottomCoordinates = [];
        _bottomCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _bottomCoordinates[1] = new BABYLON.Vector3(_bottomCoordinates[0].x + W0, _bottomCoordinates[0].y, _bottomCoordinates[0].z);
        _bottomCoordinates[2] = new BABYLON.Vector3(_bottomCoordinates[1].x, _bottomCoordinates[1].y + length0, _bottomCoordinates[1].z);
        _bottomCoordinates[3] = new BABYLON.Vector3(_bottomCoordinates[2].x - (W0 - W1), _bottomCoordinates[2].y, _bottomCoordinates[2].z);
        _bottomCoordinates[4] = new BABYLON.Vector3(_bottomCoordinates[3].x, _bottomCoordinates[3].y + (length1 - length0), _bottomCoordinates[3].z);
        _bottomCoordinates[5] = new BABYLON.Vector3(_bottomCoordinates[4].x - W1, _bottomCoordinates[4].y, _bottomCoordinates[4].z);

        let bottomMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _bottomCoordinates, scene, earcut);
        let bottomMesh = bottomMeshBuilder.build(true, thickness0);
        bottomMesh.rotation.x = -Math.PI/2;
        bottomMesh.position.z = -thickness0;
        bottomMesh.material = mat;

        //*** Tube Mesh
        let tubeMesh = createTubeMesh(W2, W2, H0, thickness1, scene);
        tubeMesh.rotation.x = -Math.PI/2;
        tubeMesh.position.x = W01;
        tubeMesh.position.y = W01;

        let originMesh = BABYLON.Mesh.MergeMeshes([bottomMesh, tubeMesh], true, true, undefined, false, true);
        let cylinderMesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 2*W0, diameter: bottomHoleRadius}, scene);

        //*** Holes
        let holeMeshes = [];

        holeMeshes[0] = cylinderMesh.clone();
        holeMeshes[0].rotation.x = Math.PI/2;
        holeMeshes[0].position.x = W1/2;
        holeMeshes[0].position.y = (length1 - H01);

        holeMeshes[1] = cylinderMesh.clone();
        holeMeshes[1].rotation.x = Math.PI/2;
        holeMeshes[1].position.x = W1/2;
        holeMeshes[1].position.y = W2/2 + W01;

        holeMeshes[2] = cylinderMesh.clone();
        holeMeshes[2].rotation.x = Math.PI/2;
        holeMeshes[2].position.x = W0 - W02;
        holeMeshes[2].position.y = length0/2;

        var newMeshCSG = BABYLON.CSG.FromMesh(originMesh);

        for(let i = 0; i < holeMeshes.length; i++) {
            let _meshCSG = BABYLON.CSG.FromMesh(holeMeshes[i]);
            newMeshCSG = newMeshCSG.subtract(_meshCSG);
        }

        let newMesh = newMeshCSG.toMesh(name, multiMat, scene, true);

        originMesh.dispose();
        cylinderMesh.dispose();

        for(let i = 0; i < holeMeshes.length; i++) {
            holeMeshes[i].dispose();
        }

        return newMesh;
    },
    NSBP_P125(name, panel, holes, scene) {
        let {W0, W1, W2, H0, H1, H2, Wd, Hd, td, thickness0, thickness1, length0, length1} = panel;
        let {W01, W02, H01, H02, bottomHoleRadius} = holes;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.FromHexString("#C9C9C9");

        let multiMat = new BABYLON.MultiMaterial("multiMat", scene);
        multiMat.subMaterials.push(mat, mat2, mat3);

        // *** Bottom Mesh
        let _bottomCoordinates = [];
        _bottomCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _bottomCoordinates[1] = new BABYLON.Vector3(_bottomCoordinates[0].x + W0, _bottomCoordinates[0].y, _bottomCoordinates[0].z);
        _bottomCoordinates[2] = new BABYLON.Vector3(_bottomCoordinates[1].x, _bottomCoordinates[1].y + length0, _bottomCoordinates[1].z);
        _bottomCoordinates[3] = new BABYLON.Vector3(_bottomCoordinates[2].x - W0, _bottomCoordinates[2].y, _bottomCoordinates[2].z);

        let bottomMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _bottomCoordinates, scene, earcut);
        let bottomMesh = bottomMeshBuilder.build(true, thickness0);
        bottomMesh.rotation.x = -Math.PI/2;
        bottomMesh.position.z = -thickness0;
        bottomMesh.material = mat;

        let tubeMesh = createTubeMesh(W1, W1, H0, thickness1, scene);
        tubeMesh.rotation.x = -Math.PI/2;
        tubeMesh.position.x = (W0 - W1)/2;
        tubeMesh.position.y = (length0 - W1)/2;

        //** Packer Meshes
        let packerParams = {width: Wd, height: Hd, thickness: td};
        let tubeParams = {width: W1, length: W1, height: H0};
        let offsetX = W2, offsetY = length1, offsetZ0 = H1, offsetZ1 = H2;

        let packerMeshes = createPackerMeshes(packerParams, tubeParams, offsetX, offsetY, offsetZ0, offsetZ1, mat3);

        let originMesh = BABYLON.Mesh.MergeMeshes([bottomMesh, tubeMesh, ...packerMeshes], true, true, undefined, false, true);
        let cylinderMesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 2*W0, diameter: bottomHoleRadius}, scene);

        //*** Holes
        let holeMeshes = [];

        // Bottom
        holeMeshes[0] = cylinderMesh.clone();
        holeMeshes[0].rotation.x = Math.PI/2;
        holeMeshes[0].position.x = W0/2;
        holeMeshes[0].position.y = W01;

        holeMeshes[1] = cylinderMesh.clone();
        holeMeshes[1].rotation.x = Math.PI/2;
        holeMeshes[1].position.x = W0/2;
        holeMeshes[1].position.y = W01 + W02;

        // Side (of Tube)
        holeMeshes[2] = cylinderMesh.clone();
        holeMeshes[2].position.x = W0/2;
        holeMeshes[2].position.y = (length0 - W1);
        holeMeshes[2].position.z = H01;

        holeMeshes[3] = cylinderMesh.clone();
        holeMeshes[3].position.x = W0/2;
        holeMeshes[3].position.y = (length0 - W1);
        holeMeshes[3].position.z = H01 + H02;

        var newMeshCSG = BABYLON.CSG.FromMesh(originMesh);

        for(let i = 0; i < holeMeshes.length; i++) {
            let _meshCSG = BABYLON.CSG.FromMesh(holeMeshes[i]);
            newMeshCSG = newMeshCSG.subtract(_meshCSG);
        }

        let newMesh = newMeshCSG.toMesh(name, multiMat, scene, true);

        originMesh.dispose();
        cylinderMesh.dispose();

        for(let i = 0; i < holeMeshes.length; i++) {
            holeMeshes[i].dispose();
        }

        return newMesh;
    },
    NSBP_P125_2(name, panel, holes, scene) {
        let {W0, W1, W2, W3, W4, H0, H1, H2, Wd, Hd, td, thickness0, thickness1, length0, length1, length2, length3} = panel;
        let {W01, W02, W03, W04, H01, H02, bottomHoleRadius} = holes;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.FromHexString("#C9C9C9");

        let multiMat = new BABYLON.MultiMaterial("multiMat", scene);
        multiMat.subMaterials.push(mat, mat2, mat3);

        //*** Bottom Mesh
        let _bottomCoordinates = [];
        _bottomCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _bottomCoordinates[1] = new BABYLON.Vector3(_bottomCoordinates[0].x + W0, _bottomCoordinates[0].y, _bottomCoordinates[0].z);
        _bottomCoordinates[2] = new BABYLON.Vector3(_bottomCoordinates[1].x, _bottomCoordinates[1].y + length2, _bottomCoordinates[1].z);
        _bottomCoordinates[3] = new BABYLON.Vector3(_bottomCoordinates[2].x + W2, _bottomCoordinates[2].y + (length0 - length1 - length2), _bottomCoordinates[2].z);
        _bottomCoordinates[4] = new BABYLON.Vector3(_bottomCoordinates[3].x + (W3 - W0 - W2), _bottomCoordinates[3].y, _bottomCoordinates[3].z);
        _bottomCoordinates[5] = new BABYLON.Vector3(_bottomCoordinates[4].x, _bottomCoordinates[4].y + length1, _bottomCoordinates[4].z);
        _bottomCoordinates[6] = new BABYLON.Vector3(_bottomCoordinates[5].x - W3, _bottomCoordinates[5].y, _bottomCoordinates[5].z);

        let bottomMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _bottomCoordinates, scene, earcut);
        let bottomMesh = bottomMeshBuilder.build(true, thickness0);
        bottomMesh.rotation.x = -Math.PI/2;
        bottomMesh.position.z = -thickness0;
        bottomMesh.material = mat;

        //*** Tube Mesh
        let tubeMesh = createTubeMesh(W1, W1, H0, thickness1, scene);
        tubeMesh.rotation.x = -Math.PI/2;
        tubeMesh.position.x = W4;
        tubeMesh.position.y = length3;

        //** Packer Meshes
        let packerParams = {width: Wd, height: Hd, thickness: td};
        let tubeParams = {width: W1, length: W1, height: H0};
        let offsetX = W4, offsetY = length3, offsetZ0 = H1, offsetZ1 = H2;

        let packerMeshes = createPackerMeshes(packerParams, tubeParams, offsetX, offsetY, offsetZ0, offsetZ1, mat3);

        let originMesh = BABYLON.Mesh.MergeMeshes([bottomMesh, tubeMesh, ...packerMeshes], true, true, undefined, false, true);
        let cylinderMesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 2*W0, diameter: bottomHoleRadius}, scene);

        //*** Holes
        let holeMeshes = [];

        // Bottom
        holeMeshes[0] = cylinderMesh.clone();
        holeMeshes[0].rotation.x = Math.PI/2;
        holeMeshes[0].position.x = W01;
        holeMeshes[0].position.y = W03;

        holeMeshes[1] = cylinderMesh.clone();
        holeMeshes[1].rotation.x = Math.PI/2;
        holeMeshes[1].position.x = W01;
        holeMeshes[1].position.y = W03 + W04;

        holeMeshes[2] = cylinderMesh.clone();
        holeMeshes[2].rotation.x = Math.PI/2;
        holeMeshes[2].position.x = W3 - W02;
        holeMeshes[2].position.y = W03 + W04;

        // Side (of Tube)
        holeMeshes[3] = cylinderMesh.clone();
        holeMeshes[3].position.x = W01;
        holeMeshes[3].position.y = (length0 - W1);
        holeMeshes[3].position.z = H01;

        holeMeshes[4] = cylinderMesh.clone();
        holeMeshes[4].position.x = W01;
        holeMeshes[4].position.y = (length0 - W1);
        holeMeshes[4].position.z = H01 + H02;

        var newMeshCSG = BABYLON.CSG.FromMesh(originMesh);

        for(let i = 0; i < holeMeshes.length; i++) {
            let _meshCSG = BABYLON.CSG.FromMesh(holeMeshes[i]);
            newMeshCSG = newMeshCSG.subtract(_meshCSG);
        }

        let newMesh = newMeshCSG.toMesh(name, multiMat, scene, true);

        originMesh.dispose();
        cylinderMesh.dispose();

        for(let i = 0; i < holeMeshes.length; i++) {
            holeMeshes[i].dispose();
        }

        return newMesh;
    },
    NSBP_P125_4(name, panel, holes, scene) {
        let {W0, W1, W2, H0, H1, H2, Wd, Hd, td, thickness0, thickness1, length0, length1} = panel;
        let {W01, W02, W03, H01, H02, bottomHoleRadius} = holes;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.FromHexString("#C9C9C9");

        let multiMat = new BABYLON.MultiMaterial("multiMat", scene);
        multiMat.subMaterials.push(mat, mat2, mat3);

        //*** Bottom Mesh
        let _bottomCoordinates = [];
        _bottomCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _bottomCoordinates[1] = new BABYLON.Vector3(_bottomCoordinates[0].x + W0, _bottomCoordinates[0].y, _bottomCoordinates[0].z);
        _bottomCoordinates[2] = new BABYLON.Vector3(_bottomCoordinates[1].x, _bottomCoordinates[1].y + length0, _bottomCoordinates[1].z);
        _bottomCoordinates[3] = new BABYLON.Vector3(_bottomCoordinates[2].x - W0, _bottomCoordinates[2].y, _bottomCoordinates[2].z);

        let bottomMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _bottomCoordinates, scene, earcut);
        let bottomMesh = bottomMeshBuilder.build(true, thickness0);
        bottomMesh.rotation.x = -Math.PI/2;
        bottomMesh.position.z = -thickness0;
        bottomMesh.material = mat;

        let tubeMesh = createTubeMesh(W1, W1, H0, thickness1, scene);
        tubeMesh.rotation.x = -Math.PI/2;
        tubeMesh.position.x = (W0 - W1)/2;
        tubeMesh.position.y = length1;

        //** Packer Meshes
        let packerParams = {width: Wd, height: Hd, thickness: td};
        let tubeParams = {width: W1, length: W1, height: H0};
        let offsetX = W2, offsetY = length1, offsetZ0 = H1, offsetZ1 = H2;

        let packerMeshes = createPackerMeshes(packerParams, tubeParams, offsetX, offsetY, offsetZ0, offsetZ1, mat3);

        let originMesh = BABYLON.Mesh.MergeMeshes([bottomMesh, tubeMesh, ...packerMeshes], true, true, undefined, false, true);
        let cylinderMesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 2*W0, diameter: bottomHoleRadius}, scene);

        //** Holes
        let holeMeshes = [];

        // Bottom
        holeMeshes[0] = cylinderMesh.clone();
        holeMeshes[0].rotation.x = Math.PI/2;
        holeMeshes[0].position.x = W01;
        holeMeshes[0].position.y = W02;

        holeMeshes[1] = cylinderMesh.clone();
        holeMeshes[1].rotation.x = Math.PI/2;
        holeMeshes[1].position.x = W01;
        holeMeshes[1].position.y = length0 - W03;

        holeMeshes[2] = cylinderMesh.clone();
        holeMeshes[2].rotation.x = Math.PI/2;
        holeMeshes[2].position.x = W0 - W01;
        holeMeshes[2].position.y = W02;

        holeMeshes[3] = cylinderMesh.clone();
        holeMeshes[3].rotation.x = Math.PI/2;
        holeMeshes[3].position.x = W0 - W01;
        holeMeshes[3].position.y = length0 - W03;

        // Side (of Tube)
        holeMeshes[4] = cylinderMesh.clone();
        holeMeshes[4].position.x = W0/2;
        holeMeshes[4].position.y = length1;
        holeMeshes[4].position.z = H0 - H01;

        holeMeshes[5] = cylinderMesh.clone();
        holeMeshes[5].position.x = W0/2;
        holeMeshes[5].position.y = length1;
        holeMeshes[5].position.z = H0 - (H01 + H02);

        var newMeshCSG = BABYLON.CSG.FromMesh(originMesh);

        for(let i = 0; i < holeMeshes.length; i++) {
            let _meshCSG = BABYLON.CSG.FromMesh(holeMeshes[i]);
            newMeshCSG = newMeshCSG.subtract(_meshCSG);
        }

        let newMesh = newMeshCSG.toMesh(name, multiMat, scene, true);

        originMesh.dispose();
        cylinderMesh.dispose();

        for(let i = 0; i < holeMeshes.length; i++) {
            holeMeshes[i].dispose();
        }

        return newMesh;
    },
    CPT_100A(name, panel, holes, scene) {
        let {W0, H0, thickness} = panel;
        let {H01, H02, bottomHoleRadius} = holes;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.FromHexString("#757575");

        let multiMat = new BABYLON.MultiMaterial("multiMat", scene);
        multiMat.subMaterials.push(mat, mat2, mat3);

        let tubeMesh = createTubeMesh(W0, W0, H0, thickness, scene);
        tubeMesh.rotation.x = -Math.PI/2;

        let originMesh = BABYLON.Mesh.MergeMeshes([tubeMesh], true, true, undefined, false, true);
        let cylinderMesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 5*W0, diameter: bottomHoleRadius}, scene);

        //** Holes
        let holeMeshes = [];

        // Side (of Tube)
        holeMeshes[0] = cylinderMesh.clone();
        holeMeshes[0].position.x = W0/2;
        holeMeshes[0].position.z = H01;

        holeMeshes[1] = cylinderMesh.clone();
        holeMeshes[1].position.x = W0/2;
        holeMeshes[1].position.z = H01 + H02;

        var newMeshCSG = BABYLON.CSG.FromMesh(originMesh);

        for(let i = 0; i < holeMeshes.length; i++) {
            let _meshCSG = BABYLON.CSG.FromMesh(holeMeshes[i]);
            newMeshCSG = newMeshCSG.subtract(_meshCSG);
        }

        let newMesh = newMeshCSG.toMesh(name, multiMat, scene, true);

        originMesh.dispose();
        cylinderMesh.dispose();

        for(let i = 0; i < holeMeshes.length; i++) {
            holeMeshes[i].dispose();
        }

        return newMesh;
    },
    CPT_125A(name, panel, holes, scene) {
        let {W0, H0, H1, H2, Wd, Hd, td, thickness} = panel;
        let {H01, H02, bottomHoleRadius} = holes;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.FromHexString("#C9C9C9");

        let multiMat = new BABYLON.MultiMaterial("multiMat", scene);
        multiMat.subMaterials.push(mat, mat2, mat3);

        //*** Tube Mesh
        let tubeMesh = createTubeMesh(W0, W0, H0, thickness);
        tubeMesh.rotation.x = -Math.PI/2;

        //*** Packer Mesh
        let packerParams = {width: Wd, height: Hd, thickness: td};
        let tubeParams = {width: W0, length: W0, height: H0};
        let offsetX = 0, offsetY = 0, offsetZ0 = H1, offsetZ1 = H2;

        let packerMeshes = createPackerMeshes(packerParams, tubeParams, offsetX, offsetY, offsetZ0, offsetZ1, mat3);

        let originMesh = BABYLON.Mesh.MergeMeshes([tubeMesh, ...packerMeshes], true, true, undefined, false, true);
        let cylinderMesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 5*W0, diameter: bottomHoleRadius}, scene);

        //*** Holes (in Tube)
        let holeMeshes = [];
        holeMeshes[0] = cylinderMesh.clone();
        holeMeshes[0].position.x = W0/2;
        holeMeshes[0].position.z = H01;

        holeMeshes[1] = cylinderMesh.clone();
        holeMeshes[1].position.x = W0/2;
        holeMeshes[1].position.z = H01 + H02;

        var newMeshCSG = BABYLON.CSG.FromMesh(originMesh);

        for(let i = 0; i < holeMeshes.length; i++) {
            let _meshCSG = BABYLON.CSG.FromMesh(holeMeshes[i]);
            newMeshCSG = newMeshCSG.subtract(_meshCSG);
        }

        let newMesh = newMeshCSG.toMesh(name, multiMat, scene, true);

        originMesh.dispose();
        cylinderMesh.dispose();

        for(let i = 0; i < holeMeshes.length; i++) {
            holeMeshes[i].dispose();
        }

        return newMesh;
    },
    CPB_100(name, panel, holes, scene) {
        let {W0, W1, W2, W3, H0, H1, angle, thickness0, thickness1, thickness2, length0, length1} = panel;
        let {radius} = holes;

        const Hx = H1 - ((W0 - 12)/2)*Math.tan(angle - Math.PI/2);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        let multiMat = new BABYLON.MultiMaterial("multiMat", scene);
        multiMat.subMaterials.push(mat, mat2);

        //*** Bottom Mesh
        let _bottomCoordinates = [];
        _bottomCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _bottomCoordinates[1] = new BABYLON.Vector3(_bottomCoordinates[0].x + W0, _bottomCoordinates[0].y, _bottomCoordinates[0].z);
        _bottomCoordinates[2] = new BABYLON.Vector3(_bottomCoordinates[1].x, _bottomCoordinates[1].y + length0, _bottomCoordinates[1].z);
        _bottomCoordinates[3] = new BABYLON.Vector3(_bottomCoordinates[2].x - W0, _bottomCoordinates[2].y, _bottomCoordinates[2].z);

        let bottomMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _bottomCoordinates, scene, earcut);
        let bottomMesh = bottomMeshBuilder.build(true, thickness0);
        bottomMesh.rotation.x = -Math.PI/2;
        bottomMesh.material = mat;

        //*** Tube Mesh
        let _outerTubeCoordinates = [];
        _outerTubeCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _outerTubeCoordinates[1] = new BABYLON.Vector3(_outerTubeCoordinates[0].x + W1, _outerTubeCoordinates[0].y, _outerTubeCoordinates[0].z);
        _outerTubeCoordinates[2] = new BABYLON.Vector3(_outerTubeCoordinates[1].x, _outerTubeCoordinates[1].y + W1, _outerTubeCoordinates[1].z);
        _outerTubeCoordinates[3] = new BABYLON.Vector3(_outerTubeCoordinates[2].x - W1, _outerTubeCoordinates[2].y, _outerTubeCoordinates[2].z);

        let outerTubeMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _outerTubeCoordinates, scene, earcut);
        let outerTubeMesh = outerTubeMeshBuilder.build(true, H0);

        let innerTubeMesh = outerTubeMesh.clone();
        innerTubeMesh.scaling = new BABYLON.Vector3((W1 - thickness1)/W1, 1, (W1 - thickness1)/W1);
        innerTubeMesh.position = new BABYLON.Vector3(thickness1/2, 0, thickness1/2);

        let outerTubeMeshCSG = BABYLON.CSG.FromMesh(outerTubeMesh);
        let innerTubeMeshCSG = BABYLON.CSG.FromMesh(innerTubeMesh);

        var tubeMeshCSG = outerTubeMeshCSG.subtract(innerTubeMeshCSG);
        let tubeMesh = tubeMeshCSG.toMesh(name, mat2, scene, true);
        tubeMesh.rotation.x = -Math.PI/2;
        tubeMesh.position.x = W2;
        tubeMesh.position.y = length1;
        tubeMesh.material = mat2;

        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(W3, 0, 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x, _panelCoordinates[0].y - Hx, _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3(_panelCoordinates[1].x + (W0 - 2*W3)/2, _panelCoordinates[1].y - (H1 - Hx), _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x + (W0 - 2*W3)/2, _panelCoordinates[2].y + (H1 - Hx), _panelCoordinates[2].z);
        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[3].x, _panelCoordinates[3].y + Hx, _panelCoordinates[3].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[4].x - thickness2, _panelCoordinates[4].y, _panelCoordinates[4].z);
        _panelCoordinates[6] = new BABYLON.Vector3(_panelCoordinates[3].x - thickness2, _panelCoordinates[3].y + thickness2*(1 - Math.tan(angle - Math.PI/2)), _panelCoordinates[5].z);
        _panelCoordinates[7] = new BABYLON.Vector3(_panelCoordinates[2].x, _panelCoordinates[2].y + thickness2, _panelCoordinates[2].z);
        _panelCoordinates[8] = new BABYLON.Vector3(_panelCoordinates[1].x + thickness2, _panelCoordinates[1].y + thickness2*(1 - Math.tan(angle - Math.PI/2)), _panelCoordinates[1].z);
        _panelCoordinates[9] = new BABYLON.Vector3(_panelCoordinates[0].x + thickness2, _panelCoordinates[0].y, _panelCoordinates[0].z);

        _panelCoordinates.push(_panelCoordinates[0]);

        const _shape = [
            ..._panelCoordinates
        ];

        const _path = [new BABYLON.Vector3(0, 0, 1), new BABYLON.Vector3(0, 0, length0)];

        const mainMesh = BABYLON.MeshBuilder.ExtrudeShape("main-shape", {shape: _shape, path: _path}, scene);
        mainMesh.rotation.x = Math.PI/2;
        mainMesh.position.y = length0;
        mainMesh.material = mat;

        let capMeshBuilder = new BABYLON.PolygonMeshBuilder("cap-mesh", _panelCoordinates, scene, earcut);
        let frontCapMesh = capMeshBuilder.build(true, 0.01);
        frontCapMesh.material = mat2;

        let backCapMesh = frontCapMesh.clone();
        backCapMesh.position.y = length0;
        backCapMesh.material = mat2;

        let originMesh = BABYLON.Mesh.MergeMeshes([bottomMesh, tubeMesh, mainMesh, frontCapMesh, backCapMesh], true, true, undefined, false, true);

        let cylinderMesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 2*W1, diameter: radius}, scene);

        //*** Holes (in Bottom)
        let holeMeshes = [];
        holeMeshes[0] = cylinderMesh.clone();
        holeMeshes[0].rotation.x = Math.PI/2;
        holeMeshes[0].position.x = W2 + W1/2;
        holeMeshes[0].position.y = length0/2;

        var newMeshCSG = BABYLON.CSG.FromMesh(originMesh);

        for(let i = 0; i < holeMeshes.length; i++) {
            let _meshCSG = BABYLON.CSG.FromMesh(holeMeshes[i]);
            newMeshCSG = newMeshCSG.subtract(_meshCSG);
        }

        let newMesh = newMeshCSG.toMesh(name, multiMat, scene, true);

        outerTubeMesh.dispose();
        innerTubeMesh.dispose();
        originMesh.dispose();
        cylinderMesh.dispose();

        for(let i = 0; i < holeMeshes.length; i++) {
            holeMeshes[i].dispose();
        }

        return newMesh;
    },
    CPB_100A(name, panel, holes, scene) {
        let {W0, W1, W2, H0, H1, angle, thickness0, thickness1, length0, length1} = panel;
        let {radius} = holes;

        const Hx = H1 - (W0/2)*Math.tan(angle - Math.PI/2);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        let multiMat = new BABYLON.MultiMaterial("multiMat", scene);
        multiMat.subMaterials.push(mat, mat2);

        //*** Tube Mesh
        let tubeMesh = createTubeMesh(W1, W1, H0, thickness0, scene);
        tubeMesh.rotation.x = -Math.PI/2;
        tubeMesh.position.x = W2;
        tubeMesh.position.y = length1;

        //*** Panel Mesh
        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(W0, 0, 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x - W0, _panelCoordinates[0].y, _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3(_panelCoordinates[1].x, _panelCoordinates[1].y - Hx, _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x + W0/2, _panelCoordinates[2].y - (H1 - Hx), _panelCoordinates[2].z);
        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[3].x + W0/2, _panelCoordinates[3].y + (H1 - Hx), _panelCoordinates[3].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[0].x, _panelCoordinates[0].y, _panelCoordinates[0].z);
        _panelCoordinates[6] = new BABYLON.Vector3(_panelCoordinates[0].x - thickness1, _panelCoordinates[0].y - thickness1, _panelCoordinates[0].z);

        _panelCoordinates[7] = new BABYLON.Vector3(_panelCoordinates[4].x - thickness1, _panelCoordinates[4].y + thickness1*(1 - Math.tan(angle - Math.PI/2)), _panelCoordinates[4].z);
        _panelCoordinates[8] = new BABYLON.Vector3(_panelCoordinates[3].x, _panelCoordinates[3].y + thickness1, _panelCoordinates[3].z);
        _panelCoordinates[9] = new BABYLON.Vector3(_panelCoordinates[2].x + thickness1, _panelCoordinates[2].y + thickness1*(1 - Math.tan(angle - Math.PI/2)), _panelCoordinates[2].z);
        _panelCoordinates[10] = new BABYLON.Vector3(_panelCoordinates[1].x + thickness1, _panelCoordinates[1].y - thickness1, _panelCoordinates[1].z);

       _panelCoordinates.push(_panelCoordinates[6]);

        const _shape = [
            ..._panelCoordinates
        ];

        const _path = [new BABYLON.Vector3(0, 0, 1), new BABYLON.Vector3(0, 0, length0)];

        const mainMesh = BABYLON.MeshBuilder.ExtrudeShape("main-shape", {shape: _shape, path: _path}, scene);
        mainMesh.rotation.x = Math.PI/2;
        mainMesh.position.y = length0;
        mainMesh.material = mat;

        let capMeshBuilder = new BABYLON.PolygonMeshBuilder("cap-mesh", _panelCoordinates, scene, earcut);
        let frontCapMesh = capMeshBuilder.build(true, 0.01);
        frontCapMesh.material = mat2;

        let backCapMesh = frontCapMesh.clone();
        backCapMesh.position.y = length0;
        backCapMesh.material = mat2;

        let originMesh = BABYLON.Mesh.MergeMeshes([tubeMesh, mainMesh, frontCapMesh, backCapMesh], true, true, undefined, false, true);
        let cylinderMesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 2*W1, diameter: radius}, scene);

        //*** Holes (in Bottom)
        let holeMeshes = [];
        holeMeshes[0] = cylinderMesh.clone();
        holeMeshes[0].rotation.x = Math.PI/2;
        holeMeshes[0].position.x = W2 + W1/2;
        holeMeshes[0].position.y = length0/2;

        var newMeshCSG = BABYLON.CSG.FromMesh(originMesh);

        for(let i = 0; i < holeMeshes.length; i++) {
            let _meshCSG = BABYLON.CSG.FromMesh(holeMeshes[i]);
            newMeshCSG = newMeshCSG.subtract(_meshCSG);
        }

        let newMesh = newMeshCSG.toMesh(name, multiMat, scene, true);

        originMesh.dispose();
        cylinderMesh.dispose();

        for(let i = 0; i < holeMeshes.length; i++) {
            holeMeshes[i].dispose();
        }

        return newMesh;
    },
    CPB_125(name, panel, holes, scene) {
        let {W0, W1, W2, H0, H1, H2, H3, Wd, Hd, td, angle, thickness0, thickness1, length0, length1} = panel;
        let {H01, H02, radius} = holes;

        const Hx = H1 - (W0/2)*Math.tan(angle - Math.PI/2);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.FromHexString("#C9C9C9");

        let multiMat = new BABYLON.MultiMaterial("multiMat", scene);
        multiMat.subMaterials.push(mat, mat2, mat3);

        //*** Tube Mesh
        let tubeMesh = createTubeMesh(W1, W1, H0, thickness0, scene);
        tubeMesh.rotation.x = -Math.PI/2;
        tubeMesh.position.x = W2;
        tubeMesh.position.y = length1;
        tubeMesh.material = mat2;

        //*** Panel Mesh
        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(W0, 0, 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x - W0, _panelCoordinates[0].y, _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3(_panelCoordinates[1].x, _panelCoordinates[1].y - Hx, _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x + W0/2, _panelCoordinates[2].y - (H1 - Hx), _panelCoordinates[2].z);
        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[3].x + W0/2, _panelCoordinates[3].y + (H1 - Hx), _panelCoordinates[3].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[0].x, _panelCoordinates[0].y, _panelCoordinates[0].z);
        _panelCoordinates[6] = new BABYLON.Vector3(_panelCoordinates[0].x - thickness1, _panelCoordinates[0].y - thickness1, _panelCoordinates[0].z);
        _panelCoordinates[7] = new BABYLON.Vector3(_panelCoordinates[4].x - thickness1, _panelCoordinates[4].y + thickness1*(1 - Math.tan(angle - Math.PI/2)), _panelCoordinates[4].z);
        _panelCoordinates[8] = new BABYLON.Vector3(_panelCoordinates[3].x, _panelCoordinates[3].y + thickness1, _panelCoordinates[3].z);
        _panelCoordinates[9] = new BABYLON.Vector3(_panelCoordinates[2].x + thickness1, _panelCoordinates[2].y + thickness1*(1 - Math.tan(angle - Math.PI/2)), _panelCoordinates[2].z);
        _panelCoordinates[10] = new BABYLON.Vector3(_panelCoordinates[1].x + thickness1, _panelCoordinates[1].y - thickness1, _panelCoordinates[1].z);

       _panelCoordinates.push(_panelCoordinates[6]);

        const _shape = [
            ..._panelCoordinates
        ];

        const _path = [new BABYLON.Vector3(0, 0, 1), new BABYLON.Vector3(0, 0, length0)];

        const mainMesh = BABYLON.MeshBuilder.ExtrudeShape("main-shape", {shape: _shape, path: _path}, scene);
        mainMesh.rotation.x = Math.PI/2;
        mainMesh.position.y = length0;
        mainMesh.material = mat;

        let capMeshBuilder = new BABYLON.PolygonMeshBuilder("cap-mesh", _panelCoordinates, scene, earcut);
        let frontCapMesh = capMeshBuilder.build(true, 0.01);
        frontCapMesh.material = mat2;

        let backCapMesh = frontCapMesh.clone();
        backCapMesh.position.y = length0;
        backCapMesh.material = mat2;

        //*** Packer Mesh
        let packerParams = {width: Wd, height: Hd, thickness: td};
        let tubeParams = {width: W1, length: W1, height: H0};
        let offsetX = W2, offsetY = length1, offsetZ0 = H2, offsetZ1 = H3;

        let packerMeshes = createPackerMeshes(packerParams, tubeParams, offsetX, offsetY, offsetZ0, offsetZ1, mat3);

        let originMesh = BABYLON.Mesh.MergeMeshes([tubeMesh, mainMesh, frontCapMesh, backCapMesh, ...packerMeshes], true, true, undefined, false, true);
        let cylinderMesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height: 2*W0, diameter: radius}, scene);

        //*** Holes (in Tube)
        let holeMeshes = [];
        holeMeshes[0] = cylinderMesh.clone();
        holeMeshes[0].position.x = W2 + W1/2;
        holeMeshes[0].position.z = H01;

        holeMeshes[1] = cylinderMesh.clone();
        holeMeshes[1].position.x = W2 + W1/2;
        holeMeshes[1].position.z = H01 + H02;

        var newMeshCSG = BABYLON.CSG.FromMesh(originMesh);

        for(let i = 0; i < holeMeshes.length; i++) {
            let _meshCSG = BABYLON.CSG.FromMesh(holeMeshes[i]);
            newMeshCSG = newMeshCSG.subtract(_meshCSG);
        }

        let newMesh = newMeshCSG.toMesh(name, multiMat, scene, true);

        originMesh.dispose();
        cylinderMesh.dispose();

        for(let i = 0; i < holeMeshes.length; i++) {
            holeMeshes[i].dispose();
        }

        return newMesh;
    },
}

export default BasePlateLibrary;