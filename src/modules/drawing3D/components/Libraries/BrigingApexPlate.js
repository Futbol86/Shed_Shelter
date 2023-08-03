import * as BABYLON from "babylonjs";
import earcut from "earcut";

function createEllipse(_xCenter, _yCenter, _radiusX, _radiusY) {
    let _ellipsePoints = [];

    for(let theta = 0; theta <= 2*Math.PI; theta += 2*Math.PI/40) {
        let x = _xCenter + _radiusX*Math.cos(theta);
        let y = _yCenter + _radiusY*Math.sin(theta);

        _ellipsePoints.push(new BABYLON.Vector2(x, y));
    }

    return _ellipsePoints;
}

let BrigingApexPlateLibrary = {
    APBR(name, panel, holes, scene) {
        let {W0, angle, thickness, length} = panel;
        let {W01, W02, W03, W04, L01, radiusX, radiusY} = holes;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.Red();

        let multiMat = new BABYLON.MultiMaterial("multiMat", scene);
        multiMat.subMaterials.push(mat, mat2);

        let alpha = (Math.PI/2 - angle/2);

        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(-W0*Math.cos(alpha), -W0*Math.sin(alpha), 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x + W0*Math.cos(alpha), _panelCoordinates[0].y + W0*Math.sin(alpha), _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3(_panelCoordinates[1].x + W0*Math.cos(alpha), _panelCoordinates[1].y - W0*Math.sin(alpha), _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x - thickness*Math.sin(alpha), _panelCoordinates[2].y - thickness*Math.cos(alpha), _panelCoordinates[2].z);
        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[1].x, _panelCoordinates[1].y - thickness, _panelCoordinates[1].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[0].x + thickness*Math.sin(alpha), _panelCoordinates[0].y - thickness*Math.cos(alpha), _panelCoordinates[0].z);

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

        //*** Holes (create new Ellipse Tube mesh)
        let _newHoleCoords = createEllipse(0, 0, radiusX, radiusY);

        let _ellipsePanelCoordinates = [];

        for(let i = 0; i < _newHoleCoords.length; i++) {
            _ellipsePanelCoordinates.push(
                new BABYLON.Vector3(_newHoleCoords[i].x, _newHoleCoords[i].y, 0)
            )
        }

        const _ellipseShape = [..._ellipsePanelCoordinates];
        const _ellipsePath = [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, 0.0001)];

        const ellipseMesh = BABYLON.MeshBuilder.ExtrudeShape("main-shape", {shape: _ellipseShape, path: _ellipsePath}, scene);

        let holeMeshes = [];

        holeMeshes[0] = ellipseMesh.clone();
        holeMeshes[0].rotation.y = -alpha;
        holeMeshes[0].position.x = -(W0 - W01)*Math.cos(alpha);
        holeMeshes[0].position.y = L01;
        holeMeshes[0].position.z = -(W0 - W01)*Math.sin(alpha);

        holeMeshes[1] = ellipseMesh.clone();
        holeMeshes[1].rotation.y = -alpha;
        holeMeshes[1].position.x = -(W0 - W01 - W02)*Math.cos(alpha);
        holeMeshes[1].position.y = L01;
        holeMeshes[1].position.z = -(W0 - W01 - W02)*Math.sin(alpha);

        holeMeshes[2] = ellipseMesh.clone();
        holeMeshes[2].rotation.y = alpha;
        holeMeshes[2].position.x = (W0 - W01 - W02)*Math.cos(-alpha);
        holeMeshes[2].position.y = L01;
        holeMeshes[2].position.z = (W0 - W01 - W02)*Math.sin(-alpha);

        holeMeshes[3] = ellipseMesh.clone();
        holeMeshes[3].rotation.y = alpha;
        holeMeshes[3].position.x = (W0 - W01)*Math.cos(-alpha);
        holeMeshes[3].position.y = L01;
        holeMeshes[3].position.z = (W0 - W01)*Math.sin(-alpha);

        if(W03) {
            holeMeshes[4] = ellipseMesh.clone();
            holeMeshes[4].rotation.y = -alpha;
            holeMeshes[4].position.x = -(W0 - W01 - W02 - W03)*Math.cos(alpha);
            holeMeshes[4].position.y = L01;
            holeMeshes[4].position.z = -(W0 - W01 - W02 - W03)*Math.sin(alpha);

            holeMeshes[5] = ellipseMesh.clone();
            holeMeshes[5].rotation.y = alpha;
            holeMeshes[5].position.x = (W0 - W01 - W02 - W03)*Math.cos(-alpha);
            holeMeshes[5].position.y = L01;
            holeMeshes[5].position.z = (W0 - W01 - W02 - W03)*Math.sin(-alpha);
        }

        if(W04) {
            holeMeshes[6] = ellipseMesh.clone();
            holeMeshes[6].rotation.y = -alpha;
            holeMeshes[6].position.x = -(W0 - W01 - W02 - W03 - W04)*Math.cos(alpha);
            holeMeshes[6].position.y = L01;
            holeMeshes[6].position.z = -(W0 - W01 - W02 - W03 - W04)*Math.sin(alpha);

            holeMeshes[7] = ellipseMesh.clone();
            holeMeshes[7].rotation.y = alpha;
            holeMeshes[7].position.x = (W0 - W01 - W02 - W03 - W04)*Math.cos(-alpha);
            holeMeshes[7].position.y = L01;
            holeMeshes[7].position.z = (W0 - W01 - W02 - W03 - W04)*Math.sin(-alpha);
        }

        var newMeshCSG = BABYLON.CSG.FromMesh(originMesh);

        for(let i = 0; i < holeMeshes.length; i++) {
            let _meshCSG = BABYLON.CSG.FromMesh(holeMeshes[i]);
            newMeshCSG = newMeshCSG.subtract(_meshCSG);
        }

        let newMesh = newMeshCSG.toMesh(name, multiMat, scene, true);

        originMesh.dispose();
        ellipseMesh.dispose();

        for(let i = 0; i < holeMeshes.length; i++) {
            holeMeshes[i].dispose();
        }

        return newMesh;
    },
    APDBR(name, panel, holes, scene) {
        let {W0, angle, thickness, length} = panel;
        let {W01, W02, W03, W04, L01, L02, radiusX, radiusY} = holes;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A5A5A5");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.Red();

        let multiMat = new BABYLON.MultiMaterial("multiMat", scene);
        multiMat.subMaterials.push(mat, mat2);

        let alpha = (Math.PI/2 - angle/2);

        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(-W0*Math.cos(alpha), -W0*Math.sin(alpha), 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x + W0*Math.cos(alpha), _panelCoordinates[0].y + W0*Math.sin(alpha), _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3(_panelCoordinates[1].x + W0*Math.cos(alpha), _panelCoordinates[1].y - W0*Math.sin(alpha), _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x - thickness*Math.sin(alpha), _panelCoordinates[2].y - thickness*Math.cos(alpha), _panelCoordinates[2].z);
        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[1].x, _panelCoordinates[1].y - thickness, _panelCoordinates[1].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[0].x + thickness*Math.sin(alpha), _panelCoordinates[0].y - thickness*Math.cos(alpha), _panelCoordinates[0].z);

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

        //*** Holes (create new Ellipse Tube mesh)
        let _newHoleCoords = createEllipse(0, 0, radiusX, radiusY);

        let _ellipsePanelCoordinates = [];

        for(let i = 0; i < _newHoleCoords.length; i++) {
            _ellipsePanelCoordinates.push(
                new BABYLON.Vector3(_newHoleCoords[i].x, _newHoleCoords[i].y, 0)
            )
        }

        const _ellipseShape = [..._ellipsePanelCoordinates];
        const _ellipsePath = [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, 0.0001)];

        const ellipseMesh = BABYLON.MeshBuilder.ExtrudeShape("main-shape", {shape: _ellipseShape, path: _ellipsePath}, scene);

        let holeMeshes = [];
        // Row 1
        holeMeshes[0] = ellipseMesh.clone();
        holeMeshes[0].rotation.y = -alpha;
        holeMeshes[0].position.x = -(W0 - W01)*Math.cos(alpha);
        holeMeshes[0].position.y = L01;
        holeMeshes[0].position.z = -(W0 - W01)*Math.sin(alpha);

        holeMeshes[1] = ellipseMesh.clone();
        holeMeshes[1].rotation.y = -alpha;
        holeMeshes[1].position.x = -(W0 - W01 - W02)*Math.cos(alpha);
        holeMeshes[1].position.y = L01;
        holeMeshes[1].position.z = -(W0 - W01 - W02)*Math.sin(alpha);

        holeMeshes[2] = ellipseMesh.clone();
        holeMeshes[2].rotation.y = alpha;
        holeMeshes[2].position.x = (W0 - W01 - W02)*Math.cos(-alpha);
        holeMeshes[2].position.y = L01;
        holeMeshes[2].position.z = (W0 - W01 - W02)*Math.sin(-alpha);

        holeMeshes[3] = ellipseMesh.clone();
        holeMeshes[3].rotation.y = alpha;
        holeMeshes[3].position.x = (W0 - W01)*Math.cos(-alpha);
        holeMeshes[3].position.y = L01;
        holeMeshes[3].position.z = (W0 - W01)*Math.sin(-alpha);
        
        // Row 2
        holeMeshes[4] = ellipseMesh.clone();
        holeMeshes[4].rotation.y = -alpha;
        holeMeshes[4].position.x = -(W0 - W01)*Math.cos(alpha);
        holeMeshes[4].position.y = L01 + L02;
        holeMeshes[4].position.z = -(W0 - W01)*Math.sin(alpha);

        holeMeshes[5] = ellipseMesh.clone();
        holeMeshes[5].rotation.y = -alpha;
        holeMeshes[5].position.x = -(W0 - W01 - W02)*Math.cos(alpha);
        holeMeshes[5].position.y = L01 + L02;
        holeMeshes[5].position.z = -(W0 - W01 - W02)*Math.sin(alpha);

        holeMeshes[6] = ellipseMesh.clone();
        holeMeshes[6].rotation.y = alpha;
        holeMeshes[6].position.x = (W0 - W01 - W02)*Math.cos(-alpha);
        holeMeshes[6].position.y = L01 + L02;
        holeMeshes[6].position.z = (W0 - W01 - W02)*Math.sin(-alpha);

        holeMeshes[7] = ellipseMesh.clone();
        holeMeshes[7].rotation.y = alpha;
        holeMeshes[7].position.x = (W0 - W01)*Math.cos(-alpha);
        holeMeshes[7].position.y = L01 + L02;
        holeMeshes[7].position.z = (W0 - W01)*Math.sin(-alpha);

        if(W03) {
            holeMeshes[8] = ellipseMesh.clone();
            holeMeshes[8].rotation.y = -alpha;
            holeMeshes[8].position.x = -(W0 - W01 - W02 - W03)*Math.cos(alpha);
            holeMeshes[8].position.y = L01;
            holeMeshes[8].position.z = -(W0 - W01 - W02 - W03)*Math.sin(alpha);

            holeMeshes[9] = ellipseMesh.clone();
            holeMeshes[9].rotation.y = -alpha;
            holeMeshes[9].position.x = -(W0 - W01 - W02 - W03)*Math.cos(alpha);
            holeMeshes[9].position.y = L01 + L02;
            holeMeshes[9].position.z = -(W0 - W01 - W02 - W03)*Math.sin(alpha);

            holeMeshes[10] = ellipseMesh.clone();
            holeMeshes[10].rotation.y = alpha;
            holeMeshes[10].position.x = (W0 - W01 - W02 - W03)*Math.cos(-alpha);
            holeMeshes[10].position.y = L01;
            holeMeshes[10].position.z = (W0 - W01 - W02 - W03)*Math.sin(-alpha);

            holeMeshes[11] = ellipseMesh.clone();
            holeMeshes[11].rotation.y = alpha;
            holeMeshes[11].position.x = (W0 - W01 - W02 - W03)*Math.cos(-alpha);
            holeMeshes[11].position.y = L01 + L02;
            holeMeshes[11].position.z = (W0 - W01 - W02 - W03)*Math.sin(-alpha);
        }

        if(W04) {
            holeMeshes[12] = ellipseMesh.clone();
            holeMeshes[12].rotation.y = -alpha;
            holeMeshes[12].position.x = -(W0 - W01 - W02 - W03 - W04)*Math.cos(alpha);
            holeMeshes[12].position.y = L01;
            holeMeshes[12].position.z = -(W0 - W01 - W02 - W03 - W04)*Math.sin(alpha);

            holeMeshes[13] = ellipseMesh.clone();
            holeMeshes[13].rotation.y = -alpha;
            holeMeshes[13].position.x = -(W0 - W01 - W02 - W03 - W04)*Math.cos(alpha);
            holeMeshes[13].position.y = L01 + L02;
            holeMeshes[13].position.z = -(W0 - W01 - W02 - W03 - W04)*Math.sin(alpha);

            holeMeshes[14] = ellipseMesh.clone();
            holeMeshes[14].rotation.y = alpha;
            holeMeshes[14].position.x = (W0 - W01 - W02 - W03 - W04)*Math.cos(-alpha);
            holeMeshes[14].position.y = L01;
            holeMeshes[14].position.z = (W0 - W01 - W02 - W03 - W04)*Math.sin(-alpha);

            holeMeshes[15] = ellipseMesh.clone();
            holeMeshes[15].rotation.y = alpha;
            holeMeshes[15].position.x = (W0 - W01 - W02 - W03 - W04)*Math.cos(-alpha);
            holeMeshes[15].position.y = L01 + L02;
            holeMeshes[15].position.z = (W0 - W01 - W02 - W03 - W04)*Math.sin(-alpha);
        }

        var newMeshCSG = BABYLON.CSG.FromMesh(originMesh);

        for(let i = 0; i < holeMeshes.length; i++) {
            let _meshCSG = BABYLON.CSG.FromMesh(holeMeshes[i]);
            newMeshCSG = newMeshCSG.subtract(_meshCSG);
        }

        let newMesh = newMeshCSG.toMesh(name, multiMat, scene, true);

        originMesh.dispose();
        ellipseMesh.dispose();

        for(let i = 0; i < holeMeshes.length; i++) {
            holeMeshes[i].dispose();
        }

        return newMesh;
    }
}

export default BrigingApexPlateLibrary;