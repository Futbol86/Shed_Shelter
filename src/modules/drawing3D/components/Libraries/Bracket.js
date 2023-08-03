import * as BABYLON from "babylonjs";
import earcut from "earcut";

function CastInBracket(options, scene) {
    let {width, length, thickness, holes} = options;

    let corners = [
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(0, -length, 0),
        new BABYLON.Vector3(width, -length, 0),
        new BABYLON.Vector3(width, 0, 0),
    ];

    function createEllipse(_xCenter, _yCenter, _radiusX, _radiusY) {
        let _ellipsePoints = [];

        for(let theta = 0; theta < 2*Math.PI; theta += 2*Math.PI/40) {
            let x = _xCenter + _radiusX*Math.cos(theta);
            let y = _yCenter + _radiusY*Math.sin(theta);

            _ellipsePoints.push(new BABYLON.Vector2(x, y));
        }

        return _ellipsePoints;
    }

    let ellipsePoints = [];

    for(let h = 0; h < holes.length; h++) {
        let {x, y, radiusX, radiusY} = holes[h];
        let newEllipsePoints = createEllipse(x, y, radiusX, radiusY);
        ellipsePoints.push(newEllipsePoints);
    }

    let polyTri = new BABYLON.PolygonMeshBuilder("polytri", corners, scene, earcut);
    
    for(let i = 0; i < ellipsePoints.length; i++) {
        polyTri.addHole(ellipsePoints[i]);
    }

    let polygon = polyTri.build(null, thickness);

    let mat = new BABYLON.StandardMaterial("mat", scene);
    mat.diffuseColor = new BABYLON.Color3.FromHexString("#C6C6C6");
    polygon.material = mat;

    return polygon;
}

function createEllipse(_xCenter, _yCenter, _radiusX, _radiusY) {
    let _ellipsePoints = [];

    for(let theta = 0; theta < 2*Math.PI; theta += 2*Math.PI/20) {
        let x = _xCenter + _radiusX*Math.cos(theta);
        let y = _yCenter + _radiusY*Math.sin(theta);

        _ellipsePoints.push(new BABYLON.Vector2(x, y));
    }

    return _ellipsePoints;
}


function createSquashEllipse(_xCenter, _yCenter, rotateAngle, _radiusX, _radiusY) {
    let _ellipsePoints = [];

    for(let theta = 0; theta < 2*Math.PI; theta += 2*Math.PI/20) {
        let x = _xCenter + _radiusX*Math.cos(theta)*Math.cos(rotateAngle) - _radiusY*Math.sin(theta)*Math.sin(rotateAngle);
        let y = _yCenter + _radiusX*Math.cos(theta)*Math.sin(rotateAngle) + _radiusY*Math.sin(theta)*Math.cos(rotateAngle);

        _ellipsePoints.push(new BABYLON.Vector2(x, y));
    }

    return _ellipsePoints;
}

let BracketLibrary = {
    bracketBase(params, holePositions = [], scene) {
        let {depth, L1, L2, D, t, color="#424242"} = params;

        let positions = [], indices = [], colors = [];
        let nbLength = 0;
        let _frontCoordinates = [], _backCoordinates = [];

        _frontCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _frontCoordinates[1] = new BABYLON.Vector3(_frontCoordinates[0].x, _frontCoordinates[0].y, _frontCoordinates[0].z - L1);
        _frontCoordinates[2] = new BABYLON.Vector3(_frontCoordinates[1].x + (D/2), _frontCoordinates[1].y, _frontCoordinates[1].z - L2);
        _frontCoordinates[3] = new BABYLON.Vector3(_frontCoordinates[2].x + (D/2), _frontCoordinates[2].y, _frontCoordinates[2].z + L2);
        _frontCoordinates[4] = new BABYLON.Vector3(_frontCoordinates[3].x, _frontCoordinates[3].y, _frontCoordinates[3].z + L1);
        
        _frontCoordinates[5] = new BABYLON.Vector3(_frontCoordinates[0].x + t, _frontCoordinates[0].y, _frontCoordinates[0].z);
        _frontCoordinates[6] = new BABYLON.Vector3(_frontCoordinates[5].x, _frontCoordinates[5].y, _frontCoordinates[5].z - L1);
        _frontCoordinates[7] = new BABYLON.Vector3(_frontCoordinates[6].x + (D/2 - t), _frontCoordinates[6].y, _frontCoordinates[6].z - (L2 - t));
        _frontCoordinates[8] = new BABYLON.Vector3(_frontCoordinates[7].x + (D/2 - t), _frontCoordinates[7].y, _frontCoordinates[7].z + (L2 - t));
        _frontCoordinates[9] = new BABYLON.Vector3(_frontCoordinates[8].x, _frontCoordinates[8].y, _frontCoordinates[8].z + D);

        for(let i = 0; i < _frontCoordinates.length; i++) {
            _backCoordinates[i] = new BABYLON.Vector3(_frontCoordinates[i].x, _frontCoordinates[i].y + depth, _frontCoordinates[i].z);
        }

        for(let i = 0; i < _frontCoordinates.length; i++) {
            positions.push(_frontCoordinates[i].x, _frontCoordinates[i].y, _frontCoordinates[i].z);
        }

        for(let i = 0; i < _backCoordinates.length; i++) {
            positions.push(_backCoordinates[i].x, _backCoordinates[i].y, _backCoordinates[i].z);
        }    

        nbLength = _frontCoordinates.length;

        // Front Side
        for(let i = 1; i < 3; i++) {
            indices.push(
                i%nbLength, (i + 5)%nbLength, (i + 6)%nbLength, 
                i%nbLength, (i + 6)%nbLength, (i + 1)%nbLength, 
            );
        }

        // Outer Side
        for(let i = 1; i < 3; i++) {
            indices.push(
                i%nbLength, i%nbLength + nbLength, (i + 1)%nbLength + nbLength, 
                i%nbLength, (i + 1)%nbLength + nbLength, (i + 1)%nbLength, 
            );
        }

        // Inner Side
        for(let i = 1; i < 3; i++) {
            indices.push(
                (i + 5)%nbLength, (i + 5)%nbLength + nbLength, (i + 6)%nbLength + nbLength, 
                (i + 5)%nbLength, (i + 6)%nbLength + nbLength, (i + 6)%nbLength, 
            );
        }

        // Back Side
        for(let i = 1; i < 3; i++) {
             indices.push(
                 i%nbLength + nbLength, (i + 5)%nbLength + nbLength, (i + 6)%nbLength + nbLength, 
                 i%nbLength + nbLength, (i + 6)%nbLength + nbLength, (i + 1)%nbLength + nbLength, 
             );
        }

        let mesh = new BABYLON.Mesh("bracket-mesh", scene);
        let normals = [];

        let vertexData = new BABYLON.VertexData();
        BABYLON.VertexData.ComputeNormals(positions, indices, normals, colors);

        vertexData.positions = positions;
        vertexData.indices = indices;
        vertexData.normals = normals;

        vertexData.applyToMesh(mesh);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString(color);
        mat.backFaceCulling = false;
        mesh.material = mat;

        let holes = [];

        if(holePositions.length >= 4) {
            holes = [
                {x: depth/2, y: -holePositions[0], radiusX: 18/10, radiusY: 18/10},
                {x: depth/2, y: -holePositions[1], radiusX: 18/10, radiusY: 18/10},
                {x: depth/2, y: -holePositions[2], radiusX: 18/10, radiusY: 18/10},
                {x: depth/2, y: -holePositions[3], radiusX: 18/10, radiusY: 18/10},
            ];
        }

        let plateRight = CastInBracket({width: depth, length: L1, thickness: t, holes: holes}, scene);
        plateRight.rotation.z = Math.PI/2; 
        plateRight.material = mat;
        plateRight.parent = mesh;

        let plateLeft = CastInBracket({width: depth, length: L1, thickness: t, holes: holes}, scene);
        plateLeft.position = new BABYLON.Vector3(D - t, 0, 0);
        plateLeft.rotation.z = Math.PI/2;
        plateLeft.material = mat;
        plateLeft.parent = mesh;
        
        return mesh;
    }, 
    GPB(name, direction, panel, holes, scene) {
        let {W0, W1, H0, angle, thickness = 5} = panel;
        let { W01, W02, W03, H01, H02, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x, _firstPanelCoordinates[1].y + H0, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x - W0, _firstPanelCoordinates[2].y, _firstPanelCoordinates[2].z);
        
        let firstPanelHoles = [];

        firstPanelHoles = [
            ...firstPanelHoles,
            {x: W01, y: H01}, 
            {x: W01, y: H01 + H02}, 
            {x: W01 + W02, y: H01}, 
            {x: W01 + W02, y: H01 + H02}, 
        ];

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x + W1, _secondPanelCoordinates[0].y, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x, _secondPanelCoordinates[1].y + H0, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x - W1, _secondPanelCoordinates[2].y, _secondPanelCoordinates[2].z);

        let secondPanelHoles = [];

        secondPanelHoles = [
            ...secondPanelHoles,
            {x: W03, y: H01}, 
            {x: W03, y: H01 + H02},
        ];

        let _secondPanelHoleCoords = [];

        for(let h = 0; h < secondPanelHoles.length; h++) {
            let {x, y} = secondPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _secondPanelHoleCoords.push(_newHoleCoord);
        }

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        for(let i = 0; i < _secondPanelHoleCoords.length; i++) {
            secondPanelMeshBuilder.addHole(_secondPanelHoleCoords[i]);
        }
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.rotation.z = angle;

        if(direction === "RH") {
            secondPanelMesh.position = new BABYLON.Vector3(W0, 0, 0);
            secondPanelMesh.rotation.z = Math.PI - angle;
        }

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;
        newMesh.rotation.x = Math.PI/2;
        newMesh.rotation.y = Math.PI;

        return newMesh;
    },

    GPB_B2(name, direction, panel, holes, scene) {
        let {W0, W1, W2, Wd, H0, H1, Hd, angle, thickness} = panel;
        let { W01, W02, W03, W04, H01, H02, H03, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x, _firstPanelCoordinates[0].y + H0, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x - (W0 - (Wd + W2)), _firstPanelCoordinates[1].y, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x, _firstPanelCoordinates[2].y - Hd, _firstPanelCoordinates[2].z);
        _firstPanelCoordinates[4] = new BABYLON.Vector3(_firstPanelCoordinates[3].x - Wd, _firstPanelCoordinates[3].y, _firstPanelCoordinates[3].z);
        _firstPanelCoordinates[5] = new BABYLON.Vector3(_firstPanelCoordinates[4].x, _firstPanelCoordinates[4].y + Hd, _firstPanelCoordinates[4].z);
        _firstPanelCoordinates[6] = new BABYLON.Vector3(_firstPanelCoordinates[5].x - W2, _firstPanelCoordinates[5].y, _firstPanelCoordinates[5].z);

        _firstPanelCoordinates[7] = new BABYLON.Vector3(_firstPanelCoordinates[6].x, _firstPanelCoordinates[6].y - H0, _firstPanelCoordinates[6].z);
        _firstPanelCoordinates[8] = new BABYLON.Vector3(_firstPanelCoordinates[7].x + W2, _firstPanelCoordinates[7].y, _firstPanelCoordinates[7].z);
        _firstPanelCoordinates[9] = new BABYLON.Vector3(_firstPanelCoordinates[8].x, _firstPanelCoordinates[8].y + Hd, _firstPanelCoordinates[8].z);
        _firstPanelCoordinates[10] = new BABYLON.Vector3(_firstPanelCoordinates[9].x + Wd, _firstPanelCoordinates[9].y, _firstPanelCoordinates[9].z);
        _firstPanelCoordinates[11] = new BABYLON.Vector3(_firstPanelCoordinates[10].x, _firstPanelCoordinates[10].y - Hd, _firstPanelCoordinates[10].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            ...firstPanelHoles,
            {x: -W01, y: H01}, 
            {x: -W01, y: H01 + H02}, 
            {x: -(W01 + W02), y: H01}, 
            {x: -(W01 + W02), y: H01 + H02}, 
        ];

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y - (H1 - H0), _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x + W1, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y + H1, _secondPanelCoordinates[2].z);
        _secondPanelCoordinates[4] = new BABYLON.Vector3(_secondPanelCoordinates[3].x - W1, _secondPanelCoordinates[3].y, _secondPanelCoordinates[3].z);

        let secondPanelHoles = [];

        secondPanelHoles = [
            ...secondPanelHoles,
            {x: W03, y: (H01 + H02)}, 
            {x: W03 + W04, y: -(H03 - (H01 + H02))},
        ];

        let _secondPanelHoleCoords = [];

        for(let h = 0; h < secondPanelHoles.length; h++) {
            let {x, y} = secondPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _secondPanelHoleCoords.push(_newHoleCoord);
        }

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        for(let i = 0; i < _secondPanelHoleCoords.length; i++) {
            secondPanelMeshBuilder.addHole(_secondPanelHoleCoords[i]);
        }

        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.rotation.z = angle;

        if(direction === "RH") {
            secondPanelMesh.position = new BABYLON.Vector3(-W0, 0, 0);
            secondPanelMesh.rotation.z = Math.PI - angle;
        }

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;
        newMesh.rotation.x = -Math.PI/2;

        return newMesh;
    },

    GPB_B3(name, panel, holes, scene) {
        let {W0, H0, H1, angle, thickness,} = panel;
        let { W01, W02, H01, H02, H03, H04, H05, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x, _firstPanelCoordinates[1].y + H0, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x - W0, _firstPanelCoordinates[2].y, _firstPanelCoordinates[2].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            ...firstPanelHoles,
            {x: W01, y: H0 - (H01 + H02)}, 
            {x: W01, y: H0 - H01}, 
            {x: W01 + W02, y: H0 - (H01 + H02)}, 
            {x: W01 + W02, y: H0 - H01}, 
        ];

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x + W0, _secondPanelCoordinates[0].y, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x, _secondPanelCoordinates[1].y - H1, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x - W0, _secondPanelCoordinates[2].y, _secondPanelCoordinates[2].z);

        const H031 = H03 - (H0 - (H01 + H02));

        let secondPanelHoles = [];

        secondPanelHoles = [
            ...secondPanelHoles,
            {x: W01, y: -H031}, 
            {x: W01 + W02, y: -H031}, 
            {x: W01, y: -(H031 + H04)}, 
            {x: W01 + W02, y: -(H031 + H04)}, 
            {x: W01, y: -(H031 + H04 + H05)}, 
            {x: W01 + W02, y: -(H031 + H04 + H05)}, 
        ];

        let _secondPanelHoleCoords = [];

        for(let h = 0; h < secondPanelHoles.length; h++) {
            let {x, y} = secondPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _secondPanelHoleCoords.push(_newHoleCoord);
        }

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        for(let i = 0; i < _secondPanelHoleCoords.length; i++) {
            secondPanelMeshBuilder.addHole(_secondPanelHoleCoords[i]);
        }
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.rotation.x = Math.PI - angle;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;
        newMesh.rotation.z = Math.PI/2;

        return newMesh;
    },

    GPB_B4(name, panel, holes, scene) {
        let {W0, H0, H1, angle, thickness,} = panel;
        let { W01, W02, H01, H02, H03, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x, _firstPanelCoordinates[1].y + H0, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x - W0, _firstPanelCoordinates[2].y, _firstPanelCoordinates[2].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            ...firstPanelHoles,
            {x: W01, y: H0 - H01}, 
            {x: W01 + W02, y: H0 - H01}, 
        ];

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x + W0, _secondPanelCoordinates[0].y, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x, _secondPanelCoordinates[1].y - H1, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x - W0, _secondPanelCoordinates[2].y, _secondPanelCoordinates[2].z);

        const H021 = H02 - (H0 - H01);

        let secondPanelHoles = [];

        secondPanelHoles = [
            ...secondPanelHoles,
            {x: W01, y: -H021}, 
            {x: W01 + W02, y: -H021}, 
            {x: W01, y: -(H021 + H03)}, 
            {x: W01 + W02, y: -(H021 + H03)}, 
        ];

        let _secondPanelHoleCoords = [];

        for(let h = 0; h < secondPanelHoles.length; h++) {
            let {x, y} = secondPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _secondPanelHoleCoords.push(_newHoleCoord);
        }

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        for(let i = 0; i < _secondPanelHoleCoords.length; i++) {
            secondPanelMeshBuilder.addHole(_secondPanelHoleCoords[i]);
        }
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.rotation.x = Math.PI - angle;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;
        newMesh.rotation.z = Math.PI/2;

        return newMesh;
    },

    BP(name, panel, holes, scene) {
        let { W0, H0, H1, angle, thickness } = panel;
        let { W01, H01, H02, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x, _firstPanelCoordinates[1].y + H0, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x - W0, _firstPanelCoordinates[2].y, _firstPanelCoordinates[2].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            ...firstPanelHoles,
            {x: W01, y: H0 - H01}, 
        ];

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x + W0, _secondPanelCoordinates[0].y, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x, _secondPanelCoordinates[1].y - H1, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x - W0, _secondPanelCoordinates[2].y, _secondPanelCoordinates[2].z);

        const H021 = H02 - (H0 - H01);

        let secondPanelHoles = [];

        secondPanelHoles = [
            ...secondPanelHoles,
            {x: W01, y: -H021},
        ];

        let _secondPanelHoleCoords = [];

        for(let h = 0; h < secondPanelHoles.length; h++) {
            let {x, y} = secondPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _secondPanelHoleCoords.push(_newHoleCoord);
        }

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        for(let i = 0; i < _secondPanelHoleCoords.length; i++) {
            secondPanelMeshBuilder.addHole(_secondPanelHoleCoords[i]);
        }
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.rotation.x = Math.PI - angle;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;
        newMesh.rotation.z = Math.PI/2;

        return newMesh;
    },

    FSP(name, panel, holes, scene) {
        let { W0, H0, thickness } = panel;
        let { W01, W02, W03, H01, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x, _firstPanelCoordinates[1].y + H0, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x - W0, _firstPanelCoordinates[2].y, _firstPanelCoordinates[2].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            ...firstPanelHoles,
            {x: W01, y: H0 - H01}, 
            {x: W01 + W02, y: H0 - H01}, 
            {x: W01 + W02 + W03, y: H0 - H01}, 
        ];

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        firstPanelMesh.material = mat;

        return firstPanelMesh;
    },

    BRK_EP1(name, panel, holes, scene) {
        let { W0, W1, H0, angle, thickness } = panel;
        let { W01, W02, W03, H01, H02, H03, H04, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x, _firstPanelCoordinates[0].y + H0, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x - W0, _firstPanelCoordinates[1].y, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x, _firstPanelCoordinates[2].y - H0, _firstPanelCoordinates[2].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            ...firstPanelHoles,
            {x: -(W0 - W01), y: H0 - (H01 + H02)}, 
            {x: -(W0 - W01), y: H0 - H01}, 
        ];

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H0, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x + W1, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H0, _secondPanelCoordinates[2].z);

        let secondPanelHoles = [];

        secondPanelHoles = [
            ...secondPanelHoles,
            {x: W1 - (W02 + W03), y: H0 - (H03 + H04)},
            {x: W1 - W03, y: H0 - (H03 + H04)},
            {x: W1 - (W02 + W03), y: H0 - H03},
            {x: W1 - W03, y: H0 - H03},
        ];

        let _secondPanelHoleCoords = [];

        for(let h = 0; h < secondPanelHoles.length; h++) {
            let {x, y} = secondPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _secondPanelHoleCoords.push(_newHoleCoord);
        }

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        for(let i = 0; i < _secondPanelHoleCoords.length; i++) {
            secondPanelMeshBuilder.addHole(_secondPanelHoleCoords[i]);
        }
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.rotation.z = Math.PI - angle;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;
        newMesh.rotation.x = -Math.PI/2;

        return newMesh;
    },

    BRK_EP2(name, panel, holes, scene) {
        let { W0, W1, H0, angle, thickness } = panel;
        let { W01, W02, W03, H01, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x, _firstPanelCoordinates[0].y + H0, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x - W0, _firstPanelCoordinates[1].y, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x, _firstPanelCoordinates[2].y - H0, _firstPanelCoordinates[2].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            ...firstPanelHoles,
            {x: -(W0 - W01), y: H0 - H01},
        ];

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H0, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x + W1, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H0, _secondPanelCoordinates[2].z);

        let secondPanelHoles = [];

        secondPanelHoles = [
            ...secondPanelHoles,
            {x: W1 - (W02 + W03), y: H0 - H01},
            {x: W1 - W03, y: H0 - H01},
        ];

        let _secondPanelHoleCoords = [];

        for(let h = 0; h < secondPanelHoles.length; h++) {
            let {x, y} = secondPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _secondPanelHoleCoords.push(_newHoleCoord);
        }

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        for(let i = 0; i < _secondPanelHoleCoords.length; i++) {
            secondPanelMeshBuilder.addHole(_secondPanelHoleCoords[i]);
        }
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.rotation.z = Math.PI - angle;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;
        newMesh.rotation.x = -Math.PI/2;

        return newMesh;
    },

    ZFB(name, panel, scene) {
        let { W0, W1, Wd, H0, angle, thickness } = panel;

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x - W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x, _firstPanelCoordinates[1].y + H0, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x + W0, _firstPanelCoordinates[2].y, _firstPanelCoordinates[2].z);

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);
        firstPanelMesh.rotation.z = -angle;

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x + W1, _secondPanelCoordinates[0].y, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x, _secondPanelCoordinates[1].y + H0, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x - W1, _secondPanelCoordinates[2].y, _secondPanelCoordinates[2].z);

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);

        let thirdPanelMesh = firstPanelMesh.clone();
        thirdPanelMesh.position.x = W1;
        thirdPanelMesh.position.y = -thickness;
        thirdPanelMesh.rotation.z = -Math.PI/2 - angle;

        let _fourthPanelCoordinates = [];
        _fourthPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _fourthPanelCoordinates[1] = new BABYLON.Vector3(_fourthPanelCoordinates[0].x + Wd, _fourthPanelCoordinates[0].y, _fourthPanelCoordinates[0].z);
        _fourthPanelCoordinates[2] = new BABYLON.Vector3(_fourthPanelCoordinates[1].x, _fourthPanelCoordinates[1].y + H0, _fourthPanelCoordinates[1].z);
        _fourthPanelCoordinates[3] = new BABYLON.Vector3(_fourthPanelCoordinates[2].x - Wd, _fourthPanelCoordinates[2].y, _fourthPanelCoordinates[2].z);

        let fourthPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _fourthPanelCoordinates, scene, earcut);
        let fourthPanelMesh = fourthPanelMeshBuilder.build(true, thickness);
        fourthPanelMesh.position.x = -(W0*Math.sin(angle) + Wd);
        fourthPanelMesh.position.y = W0*Math.cos(angle);

        let fifthPanelMesh = fourthPanelMesh.clone();
        fifthPanelMesh.position.x = W1 + W0*Math.sin(angle);
        fifthPanelMesh.position.y = W0*Math.cos(angle);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;
        thirdPanelMesh.material = mat;
        fourthPanelMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh, thirdPanelMesh, fourthPanelMesh, fifthPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;
        newMesh.rotation.x = Math.PI/2;

        return newMesh;
    },

    CFB(name, panel, scene) {
        let { W0, W1, H0, angle1, angle2, thickness } = panel;

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x, _firstPanelCoordinates[1].y + H0, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x - W0, _firstPanelCoordinates[2].y, _firstPanelCoordinates[2].z);

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x + W1, _secondPanelCoordinates[0].y, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x, _secondPanelCoordinates[1].y + H0, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x - W1, _secondPanelCoordinates[2].y, _secondPanelCoordinates[2].z);

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.position.x = W0;
        secondPanelMesh.rotation.z = Math.PI - angle1;

        let thirdPanelMesh = firstPanelMesh.clone();
        thirdPanelMesh.position.x = W0 + W1*Math.sin(angle1 - Math.PI/2);
        thirdPanelMesh.position.y = W1*Math.cos(angle1 - Math.PI/2);
        thirdPanelMesh.rotation.z = -(Math.PI/2 - (angle2 - (angle1 - Math.PI/2)));

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;
        thirdPanelMesh.material = mat;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh, thirdPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;
        newMesh.rotation.x = -Math.PI/2;

        return newMesh;
    },

    CBG(name, panel, scene) {
        let { W0, W1, H0, angle1, angle2, thickness } = panel;

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x, _firstPanelCoordinates[1].y + H0, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x - W0, _firstPanelCoordinates[2].y, _firstPanelCoordinates[2].z);

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x + W1, _secondPanelCoordinates[0].y, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x, _secondPanelCoordinates[1].y + H0, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x - W1, _secondPanelCoordinates[2].y, _secondPanelCoordinates[2].z);

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.position.x = W0;
        secondPanelMesh.rotation.z = -(Math.PI - angle1);

        let thirdPanelMesh = firstPanelMesh.clone();
        thirdPanelMesh.position.x = W0 + W1*Math.cos(Math.PI - angle1);
        thirdPanelMesh.position.y = -W1*Math.sin(Math.PI - angle1);
        thirdPanelMesh.rotation.z = -(Math.PI - angle2);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;
        thirdPanelMesh.material = mat;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh, thirdPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;
        newMesh.rotation.x = -Math.PI/2;

        return newMesh;
    },

    BKB(name, direction, panel, holes, scene) {
        let { W0, W1, W2, H0, H1, H2, angle1, angle2, thickness } = panel;
        let { W01, W11, W12, H01, H02, H11, H12, rotateAngle, radiusX, radiusY } = holes;
        const H121 = H1 - (H11 + H12);

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x, _firstPanelCoordinates[1].y + H0, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x - W0, _firstPanelCoordinates[2].y, _firstPanelCoordinates[2].z);
        _firstPanelCoordinates[4] = new BABYLON.Vector3(
            _firstPanelCoordinates[3].x - H1*Math.sin(angle2 - Math.PI/2), 
            _firstPanelCoordinates[3].y + H1*Math.cos(angle2 - Math.PI/2), 
            _firstPanelCoordinates[3].z
        );
        _firstPanelCoordinates[5] = new BABYLON.Vector3(
            _firstPanelCoordinates[0].x - H2*Math.sin(angle2 - Math.PI/2), 
            _firstPanelCoordinates[0].y + H2*Math.cos(angle2 - Math.PI/2), 
            _firstPanelCoordinates[0].z
        );

        let firstPanelEllipseHoles = [
            {x: (W0 - W01), y: H01}, 
            {x: (W0 - W01), y: H01 + H02}, 
            {x: (W0 - W01), y: H01 + 2*H02},
        ];

        let firstPanelSquashEllipseHoles = [
            {
                x: -(H121*Math.sin(angle2 - Math.PI/2) + W11*Math.cos(angle2 - Math.PI/2)), 
                y: H0 + H121*Math.cos(angle2 - Math.PI/2) - W11*Math.sin(angle2 - Math.PI/2), 
            },
            {
                x: -((H121 + H12)*Math.sin(angle2 - Math.PI/2) + W11*Math.cos(angle2 - Math.PI/2)), 
                y: H0 + (H121 + H12)*Math.cos(angle2 - Math.PI/2) - W11*Math.sin(angle2 - Math.PI/2), 
            },
            {
                x: -(H121*Math.sin(angle2 - Math.PI/2) + (W11 + W12)*Math.cos(angle2 - Math.PI/2)), 
                y: H0 + H121*Math.cos(angle2 - Math.PI/2) - (W11 + W12)*Math.sin(angle2 - Math.PI/2), 
            },
            {
                x: -((H121 + H12)*Math.sin(angle2 - Math.PI/2) + (W11 + W12)*Math.cos(angle2 - Math.PI/2)), 
                y: H0 + (H121 + H12)*Math.cos(angle2 - Math.PI/2) - (W11 + W12)*Math.sin(angle2 - Math.PI/2), 
            },
        ];

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelEllipseHoles.length; h++) {
            let {x, y} = firstPanelEllipseHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        for(let h = 0; h < firstPanelSquashEllipseHoles.length; h++) {
            let {x, y} = firstPanelSquashEllipseHoles[h];

            let _newHoleCoord = createSquashEllipse(x, y, rotateAngle, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H2, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x + W2, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H2, _secondPanelCoordinates[2].z);

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.rotation.y = -(angle2 - Math.PI/2);
        secondPanelMesh.rotation.z = -angle1;

        if(direction === "RH") {
            firstPanelMesh.rotation.z = Math.PI;
            secondPanelMesh.rotation.y = (angle2 - Math.PI/2);
        }

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;

        return newMesh;
    },

    TKB(name, direction, panel, holes, scene) {
        let { W0, W1, W2, H0, H1, H2, angle1, angle2, thickness } = panel;
        let { W01, W02, W11, H01, H02, H11, H12, rotateAngle, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x, _firstPanelCoordinates[1].y + H0, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(
            _firstPanelCoordinates[2].x + W1*Math.cos(angle2 - Math.PI/2), 
            _firstPanelCoordinates[2].y + W1*Math.sin(angle2 - Math.PI/2), 
            _firstPanelCoordinates[2].z
        );
        _firstPanelCoordinates[4] = new BABYLON.Vector3(
            _firstPanelCoordinates[3].x - H1*Math.sin(angle2 - Math.PI/2), 
            _firstPanelCoordinates[3].y + H1*Math.cos(angle2 - Math.PI/2), 
            _firstPanelCoordinates[3].z
        );
        _firstPanelCoordinates[5] = new BABYLON.Vector3(
            _firstPanelCoordinates[0].x, 
            _firstPanelCoordinates[0].y + H2, 
            _firstPanelCoordinates[0].z
        );

        let firstPanelEllipseHoles = [
            {x: W01, y: H01}, 
            {x: W01 + W02, y: H01}, 
            {x: W01, y: H01 + H02}, 
            {x: W01 + W02, y: H01 + H02}, 
        ];

        let firstPanelSquashEllipseHoles = [
            {
                x: W0 + W1*Math.cos(angle2 - Math.PI/2) -(H11*Math.sin(angle2 - Math.PI/2) + W11*Math.cos(angle2 - Math.PI/2)), 
                y: H0 + W1*Math.sin(angle2 - Math.PI/2) + H11*Math.cos(angle2 - Math.PI/2) - W11*Math.sin(angle2 - Math.PI/2), 
            },
            {
                x: W0 + W1*Math.cos(angle2 - Math.PI/2) -((H11 + H12)*Math.sin(angle2 - Math.PI/2) + W11*Math.cos(angle2 - Math.PI/2)), 
                y: H0 + W1*Math.sin(angle2 - Math.PI/2) + (H11 + H12)*Math.cos(angle2 - Math.PI/2) - W11*Math.sin(angle2 - Math.PI/2), 
            },
            {
                x: W0 + W1*Math.cos(angle2 - Math.PI/2) -((H11 + 2*H12)*Math.sin(angle2 - Math.PI/2) + W11*Math.cos(angle2 - Math.PI/2)), 
                y: H0 + W1*Math.sin(angle2 - Math.PI/2) + (H11 + 2*H12)*Math.cos(angle2 - Math.PI/2) - W11*Math.sin(angle2 - Math.PI/2), 
            },
        ];

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelEllipseHoles.length; h++) {
            let {x, y} = firstPanelEllipseHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        for(let h = 0; h < firstPanelSquashEllipseHoles.length; h++) {
            let {x, y} = firstPanelSquashEllipseHoles[h];

            let _newHoleCoord = createSquashEllipse(x, y, rotateAngle, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H2, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x + W2, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H2, _secondPanelCoordinates[2].z);

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.rotation.z = -angle1;

        if(direction === "RH") {
            firstPanelMesh.rotation.z = Math.PI;
        }

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;

        return newMesh;
    },

    RDC200(name, direction, panel, holes, scene) {
        let { W0, W1, W2, H0, H1, angle1, angle2, thickness } = panel;
        let { W01, W21, H01, H02, H11, H12, radiusX1, radiusY1, radiusX2, radiusY2 } = holes;

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(
            _firstPanelCoordinates[1].x - H1*Math.sin(angle2 - Math.PI/2), 
            _firstPanelCoordinates[1].y + H1*Math.cos(angle2 - Math.PI/2), 
            _firstPanelCoordinates[1].z
        );
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x - W1, _firstPanelCoordinates[2].y, _firstPanelCoordinates[2].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            ...firstPanelHoles,
            {x: W01, y: H0 - (H01 + H02)}, 
            {x: W01, y: H0 - H01},
        ];

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX1, radiusY1);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H1, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x + W2, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H1, _secondPanelCoordinates[2].z);

        let secondPanelHoles = [];

        secondPanelHoles = [
            ...secondPanelHoles,
            {x: W21, y: H11},
            {x: W21, y: H11 + H12},
            {x: W21, y: H11 + 2*H12},
            {x: W21, y: H11 + 3*H12},
        ];

        let _secondPanelHoleCoords = [];

        for(let h = 0; h < secondPanelHoles.length; h++) {
            let {x, y} = secondPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX2, radiusY2);
            _secondPanelHoleCoords.push(_newHoleCoord);
        }

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        for(let i = 0; i < _secondPanelHoleCoords.length; i++) {
            secondPanelMeshBuilder.addHole(_secondPanelHoleCoords[i]);
        }
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);

        secondPanelMesh.position.x = W0;
        secondPanelMesh.rotation.y = -(angle2 - Math.PI/2);
        secondPanelMesh.rotation.z = -angle1;

        if(direction === "RH") {
            firstPanelMesh.rotation.z = Math.PI;
            secondPanelMesh.position.x = -W0;
            secondPanelMesh.rotation.y = (angle2 - Math.PI/2);
        }

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;

        return newMesh;
    },

    CRWS(name, panel, holes, scene) {
        let { W0, H0, H1, angle, thickness } = panel;
        let { W01, W02, W03, W04, W05, W06, H01, H02, H03, radiusX1, radiusY1, radiusX2, radiusY2 } = holes;

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3( _firstPanelCoordinates[1].x, _firstPanelCoordinates[1].y + H1, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x - W0, _firstPanelCoordinates[2].y, _firstPanelCoordinates[2].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            ...firstPanelHoles,
            {x: W01, y: H02},
            {x: W01 + W02, y: H02},
            {x: W01 + W02 + W03, y: H02},
            {x: W01 + W02 + W03 + W04, y: H02},
            {x: W01 + W02 + W03 + W04 + W05, y: H02},

            {x: W01, y: H02 + H03},
            {x: W01 + W02, y: H02 + H03},
            {x: W01 + W02 + W03, y: H02 + H03},
            {x: W01 + W02 + W03 + W04, y: H02 + H03},
            {x: W01 + W02 + W03 + W04 + W05, y: H02 + H03},
        ];

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX1, radiusY1);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H0, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x + W0, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H0, _secondPanelCoordinates[2].z);

        let secondPanelHoles = [];

        secondPanelHoles = [
            ...secondPanelHoles,
            {x: W01, y: H01},
            {x: W01 + W02 + W03 + W06, y: H01},
            {x: W01 + W02 + W03 + W04 + W05, y: H01},
        ];

        let _secondPanelHoleCoords = [];

        for(let h = 0; h < secondPanelHoles.length; h++) {
            let {x, y} = secondPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX2, radiusY2);
            _secondPanelHoleCoords.push(_newHoleCoord);
        }

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        for(let i = 0; i < _secondPanelHoleCoords.length; i++) {
            secondPanelMeshBuilder.addHole(_secondPanelHoleCoords[i]);
        }
        
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.rotation.x = -angle;

        let thirdPanelMesh = secondPanelMesh.clone();
        thirdPanelMesh.position.z = H1;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh, thirdPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;

        return newMesh;
    },

    CTB(name, direction, panel, holes, scene) {
        let { W0, W1, H0, H1, H2, angle, angle2, thickness } = panel;
        let { W01, W02, W03, W04, W05, W06, W07, H01, H02, H03, H04, H05, H06, rotateAngle, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3( _firstPanelCoordinates[1].x, _firstPanelCoordinates[1].y + H1 + H2, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x - W1, _firstPanelCoordinates[2].y, _firstPanelCoordinates[2].z);
        _firstPanelCoordinates[4] = new BABYLON.Vector3(
            _firstPanelCoordinates[3].x - H1/Math.tan(angle2 - Math.PI/2), 
            _firstPanelCoordinates[3].y - H1, 
            _firstPanelCoordinates[3].z
        );

        let firstPanelEllipseHoles = [
            {x: W0 - W01, y: H01},
            {x: W0 - (W01 + W02), y: H01},
            {x: W0 - (W01 + W02 + W03), y: H01},
            {x: W0 - W01, y: H01 + H02},
            {x: W0 - (W01 + W02), y: H01 + H02},
            {x: W0 - (W01 + W02 + W03), y: H01 + H02},
        ];

        let firstPanelSquashEllipseHoles = [
            {x: W0 - (W1 + W04), y: (H03 + H04 + H05 + H06)},
            {x: W0 - (W1 + W04 + W05), y: (H03 + H04 + H05)},
            {x: W0 - (W1 + W04 + W05 + W06), y: (H03 + H04)},
            {x: W0 - (W1 + W04 + W05 + W06 + W07), y: H03},
        ];

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelEllipseHoles.length; h++) {
            let {x, y} = firstPanelEllipseHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        for(let h = 0; h < firstPanelSquashEllipseHoles.length; h++) {
            let {x, y} = firstPanelSquashEllipseHoles[h];

            let _newHoleCoord = createSquashEllipse(x, y, rotateAngle, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H0, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x + W0, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H0, _secondPanelCoordinates[2].z);

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.rotation.x = angle;

        if(direction === "RH") {
            firstPanelMesh.rotation.z = Math.PI;
            secondPanelMesh.rotation.y = Math.PI;
        }

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;

        return newMesh;
    },

    // ******** APEX AND KNEE PLATE
    NSZAP(name, panel, holes, scene) {
        let { W0, H0, H1, H2, H3, angle, thickness = 5 } = panel;
        let { holeNum = 3, W01, W02, H01, H02, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x, _firstPanelCoordinates[0].y - H0, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x + W0, _firstPanelCoordinates[1].y, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x, _firstPanelCoordinates[2].y + H0, _firstPanelCoordinates[2].z);

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);
        firstPanelMesh.rotation.x = Math.PI/2;

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x + W0, _secondPanelCoordinates[0].y, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x, _secondPanelCoordinates[1].y + H1, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x - W0, _secondPanelCoordinates[2].y, _secondPanelCoordinates[2].z);

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.position = new BABYLON.Vector3(0, 0, -H1);

        let _thirdPanelCoordinates = [];
        _thirdPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _thirdPanelCoordinates[1] = new BABYLON.Vector3(_thirdPanelCoordinates[0].x + W0, _thirdPanelCoordinates[0].y, _thirdPanelCoordinates[0].z);
        _thirdPanelCoordinates[2] = new BABYLON.Vector3(_thirdPanelCoordinates[1].x + H2*Math.sin(angle), _thirdPanelCoordinates[1].y + H2*Math.cos(angle), _thirdPanelCoordinates[1].z);
        _thirdPanelCoordinates[3] = new BABYLON.Vector3(_thirdPanelCoordinates[0].x + W0/2, _thirdPanelCoordinates[0].y + H3, _thirdPanelCoordinates[0].z);
        _thirdPanelCoordinates[4] = new BABYLON.Vector3(_thirdPanelCoordinates[0].x - H2*Math.sin(angle), _thirdPanelCoordinates[0].y + H2*Math.cos(angle), _thirdPanelCoordinates[0].z);

        let thirdPanelHoles = [];

        // LEFT
        thirdPanelHoles = [
            ...thirdPanelHoles,
            {
                x: W01*Math.cos(angle) - H01*Math.sin(angle), 
                y: W01*Math.sin(angle) + H01*Math.cos(angle), 
            },
            {
                x: (W01 + W02)*Math.cos(angle) - H01*Math.sin(angle), 
                y: (W01 + W02)*Math.sin(angle) + H01*Math.cos(angle), 
            },
            {
                x: (W01 + 2*W02)*Math.cos(angle) - H01*Math.sin(angle), 
                y: (W01 + 2*W02)*Math.sin(angle) + H01*Math.cos(angle), 
            },
        ];

        if(holeNum === 4) {
            thirdPanelHoles = [
                ...thirdPanelHoles, 
                {
                    x: (W01 + 3*W02)*Math.cos(angle) - H01*Math.sin(angle), 
                    y: (W01 + 3*W02)*Math.sin(angle) + H01*Math.cos(angle), 
                },
            ]
        }

        thirdPanelHoles = [
            ...thirdPanelHoles,
            {
                x: W01*Math.cos(angle) - (H01 + H02)*Math.sin(angle), 
                y: W01*Math.sin(angle) + (H01 + H02)*Math.cos(angle), 
            },
            {
                x: (W01 + W02)*Math.cos(angle) - (H01 + H02)*Math.sin(angle), 
                y: (W01 + W02)*Math.sin(angle) + (H01 + H02)*Math.cos(angle), 
            },
            {
                x: (W01 + 2*W02)*Math.cos(angle) - (H01 + H02)*Math.sin(angle), 
                y: (W01 + 2*W02)*Math.sin(angle) + (H01 + H02)*Math.cos(angle), 
            },
        ];

        if(holeNum === 4) {
            thirdPanelHoles = [
                ...thirdPanelHoles, 
                {
                    x: (W01 + 3*W02)*Math.cos(angle) - (H01 + H02)*Math.sin(angle), 
                    y: (W01 + 3*W02)*Math.sin(angle) + (H01 + H02)*Math.cos(angle), 
                },
            ]
        }

        // RIGHT
        thirdPanelHoles = [
            ...thirdPanelHoles,       
            {
                x: W0 - (W01*Math.cos(angle) - H01*Math.sin(angle)), 
                y: W01*Math.sin(angle) + H01*Math.cos(angle), 
            },
            {
                x: W0 - ((W01 + W02)*Math.cos(angle) - H01*Math.sin(angle)), 
                y: (W01 + W02)*Math.sin(angle) + H01*Math.cos(angle), 
            },
            {
                x: W0 - ((W01 + 2*W02)*Math.cos(angle) - H01*Math.sin(angle)), 
                y: (W01 + 2*W02)*Math.sin(angle) + H01*Math.cos(angle), 
            },
        ];

        if(holeNum === 4) {
            thirdPanelHoles = [
                ...thirdPanelHoles, 
                {
                    x: W0 - ((W01 + 3*W02)*Math.cos(angle) - H01*Math.sin(angle)), 
                    y: (W01 + 3*W02)*Math.sin(angle) + H01*Math.cos(angle), 
                },
            ]
        }

        thirdPanelHoles = [
            ...thirdPanelHoles,
            {
                x: W0 - (W01*Math.cos(angle) - (H01 + H02)*Math.sin(angle)), 
                y: W01*Math.sin(angle) + (H01 + H02)*Math.cos(angle), 
            },
            {
                x: W0 - ((W01 + W02)*Math.cos(angle) - (H01 + H02)*Math.sin(angle)), 
                y: (W01 + W02)*Math.sin(angle) + (H01 + H02)*Math.cos(angle), 
            },
            {
                x: W0 - ((W01 + 2*W02)*Math.cos(angle) - (H01 + H02)*Math.sin(angle)), 
                y: (W01 + 2*W02)*Math.sin(angle) + (H01 + H02)*Math.cos(angle), 
            },
        ];

        if(holeNum === 4) {
            thirdPanelHoles = [
                ...thirdPanelHoles, 
                {
                    x: W0 - ((W01 + 3*W02)*Math.cos(angle) - (H01 + H02)*Math.sin(angle)), 
                    y: (W01 + 3*W02)*Math.sin(angle) + (H01 + H02)*Math.cos(angle), 
                },
            ]
        }


        let _thirdPanelHoleCoords = [];

        for(let h = 0; h < thirdPanelHoles.length; h++) {
            let {x, y} = thirdPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _thirdPanelHoleCoords.push(_newHoleCoord);
        }

        let thirdPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _thirdPanelCoordinates, scene, earcut);
        for(let i = 0; i < _thirdPanelHoleCoords.length; i++) {
            thirdPanelMeshBuilder.addHole(_thirdPanelHoleCoords[i]);
        }

        let thirdPanelMesh = thirdPanelMeshBuilder.build(true, thickness);
        thirdPanelMesh.position = new BABYLON.Vector3(0, 0, -H1);
        thirdPanelMesh.rotation.x = -Math.PI/2;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat2;
        secondPanelMesh.material = mat;
        thirdPanelMesh.material = mat3;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh, thirdPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;
        newMesh.rotation.x = Math.PI/2;

        return newMesh;
    },
     // CARPORT GABLE
    // KNEE PLATE\CARPORT\GABLE\CEE SECTION\3 Deg
    NSCKP(name, direction, panel, holes, scene) {
        let { W0, W1, W2, W3, H0, H1, H2, H3, angle, thickness = 10 } = panel;
        let { holeNum = 3, W11, W12, H01, H02, H21, H22, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];

        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x, _firstPanelCoordinates[0].y + H0 + H1, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x + W1*Math.cos(angle), _firstPanelCoordinates[1].y + W1*Math.sin(angle), _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x + H2*Math.sin(angle), _firstPanelCoordinates[2].y - H2*Math.cos(angle), _firstPanelCoordinates[2].z);
        _firstPanelCoordinates[5] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[4] = new BABYLON.Vector3(_firstPanelCoordinates[5].x, _firstPanelCoordinates[5].y + H3, _firstPanelCoordinates[5].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            {x: W0/2, y: H01}, 
            {x: W0/2, y: H01 + H02}, 
            {x: W0/2, y: H01 + 2*H02}
        ];

        if(holeNum === 4) {
            firstPanelHoles = [...firstPanelHoles, {x: W0/2, y: H01 + 3*H02}]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1*Math.cos(angle) - W11*Math.cos(angle) + H21*Math.sin(angle) , 
                y: (H0 + H1) + W1*Math.sin(angle) - W11*Math.sin(angle) - H21*Math.cos(angle), 
            },
            {
                x: W1*Math.cos(angle) - (W11 + W12)*Math.cos(angle) + H21*Math.sin(angle) , 
                y: (H0 + H1) + W1*Math.sin(angle) - (W11 + W12)*Math.sin(angle) - H21*Math.cos(angle), 
            },
            {
                x: W1*Math.cos(angle) - (W11 + 2*W12)*Math.cos(angle) + H21*Math.sin(angle) , 
                y: (H0 + H1) + W1*Math.sin(angle) - (W11 + 2*W12)*Math.sin(angle) - H21*Math.cos(angle), 
            },
        ];

        // holeNum: total holes on panel
        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1*Math.cos(angle) - (W11 + 3*W12)*Math.cos(angle) + H21*Math.sin(angle) , 
                    y: (H0 + H1) + W1*Math.sin(angle) - (W11 + 3*W12)*Math.sin(angle) - H21*Math.cos(angle), 
                },
            ]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1*Math.cos(angle) - W11*Math.cos(angle) + (H21 + H22)*Math.sin(angle) , 
                y: (H0 + H1) + W1*Math.sin(angle) - W11*Math.sin(angle) - (H21 + H22)*Math.cos(angle), 
            },
            {
                x: W1*Math.cos(angle) - (W11 + W12)*Math.cos(angle) + (H21 + H22)*Math.sin(angle) , 
                y: (H0 + H1) + W1*Math.sin(angle) - (W11 + W12)*Math.sin(angle) - (H21 + H22)*Math.cos(angle), 
            },
            {
                x: W1*Math.cos(angle) - (W11 + 2*W12)*Math.cos(angle) + (H21 + H22)*Math.sin(angle) , 
                y: (H0 + H1) + W1*Math.sin(angle) - (W11 + 2*W12)*Math.sin(angle) - (H21 + H22)*Math.cos(angle), 
            },
        ];

        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1*Math.cos(angle) - (W11 + 3*W12)*Math.cos(angle) + (H21 + H22)*Math.sin(angle) , 
                    y: (H0 + H1) + W1*Math.sin(angle) - (W11 + 3*W12)*Math.sin(angle) - (H21 + H22)*Math.cos(angle), 
                },
            ]
        }

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }

        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H0, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x - W2, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H0, _secondPanelCoordinates[2].z);

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.parent = firstPanelMesh;
        secondPanelMesh.rotation.z = Math.PI/2;
        secondPanelMesh.position = new BABYLON.Vector3(0, -thickness, 0);

        let distanceOfBetweenPoints = BABYLON.Vector3.Distance(_firstPanelCoordinates[3], _firstPanelCoordinates[4]);

        let _thirdPanelCoordinates = [];
        _thirdPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _thirdPanelCoordinates[1] = new BABYLON.Vector3(_thirdPanelCoordinates[0].x, _thirdPanelCoordinates[0].y + distanceOfBetweenPoints, _thirdPanelCoordinates[0].z);
        _thirdPanelCoordinates[2] = new BABYLON.Vector3(_thirdPanelCoordinates[1].x - W3, _thirdPanelCoordinates[1].y, _thirdPanelCoordinates[1].z);
        _thirdPanelCoordinates[3] = new BABYLON.Vector3(_thirdPanelCoordinates[2].x, _thirdPanelCoordinates[2].y - distanceOfBetweenPoints, _thirdPanelCoordinates[2].z);
 
        let v1 = _firstPanelCoordinates[3].subtract(_firstPanelCoordinates[4]);
        v1.normalize();
        let v2 = _firstPanelCoordinates[4].subtract(_firstPanelCoordinates[5]);
        v2.normalize();

        let angle2 = BABYLON.Vector3.Dot(v1, v2);
        angle2 = Math.acos(angle2);

        let thirdPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _thirdPanelCoordinates, scene, earcut);
        let thirdPanelMesh = thirdPanelMeshBuilder.build(true, thickness);
        thirdPanelMesh.parent = firstPanelMesh;
        thirdPanelMesh.rotation.z = Math.PI/2;
        thirdPanelMesh.rotation.y = angle2;
        thirdPanelMesh.position = new BABYLON.Vector3(W0, -thickness, H3);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;
        thirdPanelMesh.material = mat3;

        if(direction === "RH") {
            secondPanelMesh.rotation.z = -Math.PI/2;
            thirdPanelMesh.rotation.z = -Math.PI/2;
        }

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh, thirdPanelMesh], true, true, undefined, false, true);
        newMesh.name = name; 

        if(direction === "RH") {
            newMesh.rotation.z = -Math.PI;
        }

        return newMesh;
    },

    NSKP(name, direction, panel, holes, scene) {
        let { W0, W1, W2, W3, H0, H1, H2, H3, angle, thickness = 10 } = panel;
        let { holeNum = 3, W11, W12, W21, H01, H02, H03, H04, H21, H22, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];

        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x, _firstPanelCoordinates[0].y + H0, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x + W1, _firstPanelCoordinates[1].y + H1, _firstPanelCoordinates[1].z);
        
        _firstPanelCoordinates[3] = new BABYLON.Vector3( _firstPanelCoordinates[2].x + H2*Math.sin(angle), _firstPanelCoordinates[2].y - H2*Math.cos(angle), _firstPanelCoordinates[2].z); 
        _firstPanelCoordinates[5] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[4] = new BABYLON.Vector3(_firstPanelCoordinates[5].x, _firstPanelCoordinates[5].y + H3, _firstPanelCoordinates[5].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            {x: W0/2, y: H01}, 
            {x: W0/2, y: H01 + H02}, 
            {x: W0/2, y: H01 + 2*H02}
        ];

        if(holeNum === 4) {
            firstPanelHoles = [...firstPanelHoles, {x: W0/2, y: H01 + 3*H02}]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 - W11*Math.cos(angle) + H21*Math.sin(angle), 
                y: (H0 + H1) - W11*Math.sin(angle) - H21*Math.cos(angle), 
            },
            {
                x: W1 - (W11 + W12)*Math.cos(angle) + H21*Math.sin(angle), 
                y: (H0 + H1) - (W11 + W12)*Math.sin(angle) - H21*Math.cos(angle), 
            },
            {
                x: W1 - (W11 + 2*W12)*Math.cos(angle) + H21*Math.sin(angle), 
                y: (H0 + H1) - (W11 + 2*W12)*Math.sin(angle) - H21*Math.cos(angle), 
            },
        ];

        // holeNum: total holes on panel
        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 - (W11 + 3*W12)*Math.cos(angle) + H21*Math.sin(angle), 
                    y: (H0 + H1) - (W11 + 3*W12)*Math.sin(angle) - H21*Math.cos(angle), 
                },
            ]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 - W11*Math.cos(angle) + (H21 + H22)*Math.sin(angle), 
                y: (H0 + H1) - W11*Math.sin(angle) - (H21 + H22)*Math.cos(angle), 
            },
            {
                x: W1 - (W11 + W12)*Math.cos(angle) + (H21 + H22)*Math.sin(angle), 
                y: (H0 + H1) - (W11 + W12)*Math.sin(angle) - (H21 + H22)*Math.cos(angle), 
            },
            {
                x: W1 - (W11 + 2*W12)*Math.cos(angle) + (H21 + H22)*Math.sin(angle), 
                y: (H0 + H1) - (W11 + 2*W12)*Math.sin(angle) - (H21 + H22)*Math.cos(angle), 
            },
        ];

        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 - (W11 + 3*W12)*Math.cos(angle) + (H21 + H22)*Math.sin(angle), 
                    y: (H0 + H1) - (W11 + 3*W12)*Math.sin(angle) - (H21 + H22)*Math.cos(angle), 
                },
            ]
        }

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }

        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H0, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x - W2, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H0, _secondPanelCoordinates[2].z);

        let secondPanelHoles = [];
        let _secondPanelHoleCoords = [];

        secondPanelHoles = [
            {x: -W21, y: (H0 - H04)}, 
            {x: -W21, y: (H0 - (H03 + H04))},
        ];

        for(let h = 0; h < secondPanelHoles.length; h++) {
            let {x, y} = secondPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _secondPanelHoleCoords.push(_newHoleCoord);
        }

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        for(let i = 0; i < _secondPanelHoleCoords.length; i++) {
            secondPanelMeshBuilder.addHole(_secondPanelHoleCoords[i]);
        }

        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.parent = firstPanelMesh;
        secondPanelMesh.rotation.z = Math.PI/2;
        secondPanelMesh.position = new BABYLON.Vector3(0, -thickness, 0);

        let distanceOfBetweenPoints = BABYLON.Vector3.Distance(_firstPanelCoordinates[3], _firstPanelCoordinates[4]);

        let _thirdPanelCoordinates = [];
        _thirdPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _thirdPanelCoordinates[1] = new BABYLON.Vector3(_thirdPanelCoordinates[0].x, _thirdPanelCoordinates[0].y + distanceOfBetweenPoints, _thirdPanelCoordinates[0].z);
        _thirdPanelCoordinates[2] = new BABYLON.Vector3(_thirdPanelCoordinates[1].x - W3, _thirdPanelCoordinates[1].y, _thirdPanelCoordinates[1].z);
        _thirdPanelCoordinates[3] = new BABYLON.Vector3(_thirdPanelCoordinates[2].x, _thirdPanelCoordinates[2].y - distanceOfBetweenPoints, _thirdPanelCoordinates[2].z);
 
        let v1 = _firstPanelCoordinates[3].subtract(_firstPanelCoordinates[4]);
        v1.normalize();
        let v2 = _firstPanelCoordinates[4].subtract(_firstPanelCoordinates[5]);
        v2.normalize();

        let angle3 = BABYLON.Vector3.Dot(v1, v2);
        angle3 = Math.acos(angle3);

        let thirdPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _thirdPanelCoordinates, scene, earcut);
        let thirdPanelMesh = thirdPanelMeshBuilder.build(true, thickness);
        thirdPanelMesh.parent = firstPanelMesh;
        thirdPanelMesh.rotation.z = Math.PI/2;
        thirdPanelMesh.rotation.y = angle3;
        thirdPanelMesh.position = new BABYLON.Vector3(W0, -thickness, H3);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;
        thirdPanelMesh.material = mat3;

        if(direction === "RH") {
            secondPanelMesh.rotation.z = -Math.PI/2;
            thirdPanelMesh.rotation.z = -Math.PI/2;
        }

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh, thirdPanelMesh], true, true, undefined, false, true);
        newMesh.name = name; 

        if(direction === "RH") {
            newMesh.rotation.z = -Math.PI;
        }

        return newMesh;
    },

    NSCKP_SKILLION(name, direction, panel, holes, scene) {
        let { W0, W1, W2, W3, H0, H1, angle, thickness = 10 } = panel;
        let { holeNum = 3, W11, W12, H01, H02, H11, H12, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];

        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x, _firstPanelCoordinates[0].y + H0, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x + W1*Math.cos(angle), _firstPanelCoordinates[1].y + W1*Math.sin(angle), _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x + H1*Math.sin(angle), _firstPanelCoordinates[2].y - H1*Math.cos(angle), _firstPanelCoordinates[2].z);
        _firstPanelCoordinates[4] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            {x: W0/2, y: H01}, 
            {x: W0/2, y: H01 + H02}, 
            {x: W0/2, y: H01 + 2*H02}
        ];

        if(holeNum === 4) {
            firstPanelHoles = [...firstPanelHoles, {x: W0/2, y: H01 + 3*H02}]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1*Math.cos(angle) - W11*Math.cos(angle) + H11*Math.sin(angle) , 
                y: H0 + W1*Math.sin(angle) - W11*Math.sin(angle) - H11*Math.cos(angle), 
            },
            {
                x: W1*Math.cos(angle) - (W11 + W12)*Math.cos(angle) + H11*Math.sin(angle) , 
                y: H0 + W1*Math.sin(angle) - (W11 + W12)*Math.sin(angle) - H11*Math.cos(angle), 
            },
            {
                x: W1*Math.cos(angle) - (W11 + 2*W12)*Math.cos(angle) + H11*Math.sin(angle) , 
                y: H0 + W1*Math.sin(angle) - (W11 + 2*W12)*Math.sin(angle) - H11*Math.cos(angle), 
            },
        ];

        // holeNum: total holes on panel
        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1*Math.cos(angle) - (W11 + 3*W12)*Math.cos(angle) + H11*Math.sin(angle) , 
                    y: H0 + W1*Math.sin(angle) - (W11 + 3*W12)*Math.sin(angle) - H11*Math.cos(angle), 
                },
            ]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1*Math.cos(angle) - W11*Math.cos(angle) + (H11 + H12)*Math.sin(angle) , 
                y: H0 + W1*Math.sin(angle) - W11*Math.sin(angle) - (H11 + H12)*Math.cos(angle), 
            },
            {
                x: W1*Math.cos(angle) - (W11 + W12)*Math.cos(angle) + (H11 + H12)*Math.sin(angle) , 
                y: H0 + W1*Math.sin(angle) - (W11 + W12)*Math.sin(angle) - (H11 + H12)*Math.cos(angle), 
            },
            {
                x: W1*Math.cos(angle) - (W11 + 2*W12)*Math.cos(angle) + (H11 + H12)*Math.sin(angle) , 
                y: H0 + W1*Math.sin(angle) - (W11 + 2*W12)*Math.sin(angle) - (H11 + H12)*Math.cos(angle), 
            },
        ];

        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1*Math.cos(angle) - (W11 + 3*W12)*Math.cos(angle) + (H11 + H12)*Math.sin(angle) , 
                    y: H0 + W1*Math.sin(angle) - (W11 + 3*W12)*Math.sin(angle) - (H11 + H12)*Math.cos(angle), 
                },
            ]
        }

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }

        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H0, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x - W2, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H0, _secondPanelCoordinates[2].z);

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.parent = firstPanelMesh;
        secondPanelMesh.rotation.z = Math.PI/2;
        secondPanelMesh.position = new BABYLON.Vector3(0, -thickness, 0);

        let distanceOfBetweenPoints = BABYLON.Vector3.Distance(_firstPanelCoordinates[3], _firstPanelCoordinates[4]);

        let _thirdPanelCoordinates = [];
        _thirdPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _thirdPanelCoordinates[1] = new BABYLON.Vector3(_thirdPanelCoordinates[0].x, _thirdPanelCoordinates[0].y + distanceOfBetweenPoints, _thirdPanelCoordinates[0].z);
        _thirdPanelCoordinates[2] = new BABYLON.Vector3(_thirdPanelCoordinates[1].x - W3, _thirdPanelCoordinates[1].y, _thirdPanelCoordinates[1].z);
        _thirdPanelCoordinates[3] = new BABYLON.Vector3(_thirdPanelCoordinates[2].x, _thirdPanelCoordinates[2].y - distanceOfBetweenPoints, _thirdPanelCoordinates[2].z);
 
        let v1 = _firstPanelCoordinates[3].subtract(_firstPanelCoordinates[4]);
        v1.normalize();
        let v2 = _firstPanelCoordinates[4].subtract(_firstPanelCoordinates[0]);
        v2.normalize();

        let angle2 = BABYLON.Vector3.Dot(v1, BABYLON.Axis.Y);
        angle2 = Math.acos(angle2);

        let thirdPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _thirdPanelCoordinates, scene, earcut);
        let thirdPanelMesh = thirdPanelMeshBuilder.build(true, thickness);
        thirdPanelMesh.parent = firstPanelMesh;
        thirdPanelMesh.rotation.z = Math.PI/2;
        thirdPanelMesh.rotation.y = angle2;
        thirdPanelMesh.position = new BABYLON.Vector3(W0, -thickness, 0);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;
        thirdPanelMesh.material = mat3;

        if(direction === "RH") {
            secondPanelMesh.rotation.z = -Math.PI/2;
            thirdPanelMesh.rotation.z = -Math.PI/2;
        }

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh, thirdPanelMesh], true, true, undefined, false, true);
        newMesh.name = name; 

        if(direction === "RH") {
            newMesh.rotation.z = -Math.PI;
        }

        return newMesh;
    },

    NSCKP_DEC_SKILLION(name, direction, panel, holes, scene) {
        let { W0, W1, W2, W3, H0, H1, angle, thickness = 10 } = panel;
        let { holeNum = 3, W11, W12, H01, H02, H11, H12, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];

        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x, _firstPanelCoordinates[0].y + H0, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x + W1*Math.cos(angle), _firstPanelCoordinates[1].y - W1*Math.sin(angle), _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x - H1*Math.sin(angle), _firstPanelCoordinates[2].y - H1*Math.cos(angle), _firstPanelCoordinates[2].z);
        _firstPanelCoordinates[4] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            {x: W0/2, y: H01}, 
            {x: W0/2, y: H01 + H02}, 
            {x: W0/2, y: H01 + 2*H02}
        ];

        if(holeNum === 4) {
            firstPanelHoles = [...firstPanelHoles, {x: W0/2, y: H01 + 3*H02}]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1*Math.cos(angle) - W11*Math.cos(angle) - H11*Math.sin(angle) , 
                y: H0 - W1*Math.sin(angle) - (H11*Math.cos(angle) - W11*Math.sin(angle)), 
            },
            {
                x: W1*Math.cos(angle) - (W11 + W12)*Math.cos(angle) - H11*Math.sin(angle) , 
                y: H0 - W1*Math.sin(angle) - (H11*Math.cos(angle) - (W11 + W12)*Math.sin(angle)),
            },
            {
                x: W1*Math.cos(angle) - (W11 + 2*W12)*Math.cos(angle) - H11*Math.sin(angle) , 
                y: H0 - W1*Math.sin(angle) - (H11*Math.cos(angle) - (W11 + 2*W12)*Math.sin(angle)),
            },
        ];

        // holeNum: total holes on panel
        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1*Math.cos(angle) - (W11 + 3*W12)*Math.cos(angle) - H11*Math.sin(angle) , 
                    y: H0 - W1*Math.sin(angle) - (H11*Math.cos(angle) - (W11 + 3*W12)*Math.sin(angle)),
                },
            ]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1*Math.cos(angle) - W11*Math.cos(angle) - (H11 + H12)*Math.sin(angle) , 
                y: H0 - W1*Math.sin(angle) - ((H11 + H12)*Math.cos(angle) - W11*Math.sin(angle)),
            },
            {
                x: W1*Math.cos(angle) - (W11 + W12)*Math.cos(angle) - (H11 + H12)*Math.sin(angle) , 
                y: H0 - W1*Math.sin(angle) - ((H11 + H12)*Math.cos(angle) - (W11 + W12)*Math.sin(angle)),
            },
            {
                x: W1*Math.cos(angle) - (W11 + 2*W12)*Math.cos(angle) - (H11 + H12)*Math.sin(angle) , 
                y: H0 - W1*Math.sin(angle) - ((H11 + H12)*Math.cos(angle) - (W11 + 2*W12)*Math.sin(angle)),
            },
        ];

        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1*Math.cos(angle) - (W11 + 3*W12)*Math.cos(angle) - (H11 + H12)*Math.sin(angle) , 
                    y: H0 - W1*Math.sin(angle) - ((H11 + H12)*Math.cos(angle) - (W11 + 3*W12)*Math.sin(angle)), 
                },
            ]
        }

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }

        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H0, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x - W2, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H0, _secondPanelCoordinates[2].z);

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.parent = firstPanelMesh;
        secondPanelMesh.rotation.z = Math.PI/2;
        secondPanelMesh.position = new BABYLON.Vector3(0, -thickness, 0);

        let distanceOfBetweenPoints = BABYLON.Vector3.Distance(_firstPanelCoordinates[3], _firstPanelCoordinates[4]);

        let _thirdPanelCoordinates = [];
        _thirdPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _thirdPanelCoordinates[1] = new BABYLON.Vector3(_thirdPanelCoordinates[0].x, _thirdPanelCoordinates[0].y + distanceOfBetweenPoints, _thirdPanelCoordinates[0].z);
        _thirdPanelCoordinates[2] = new BABYLON.Vector3(_thirdPanelCoordinates[1].x - W3, _thirdPanelCoordinates[1].y, _thirdPanelCoordinates[1].z);
        _thirdPanelCoordinates[3] = new BABYLON.Vector3(_thirdPanelCoordinates[2].x, _thirdPanelCoordinates[2].y - distanceOfBetweenPoints, _thirdPanelCoordinates[2].z);
 
        let v1 = _firstPanelCoordinates[3].subtract(_firstPanelCoordinates[4]);
        v1.normalize();
        let v2 = _firstPanelCoordinates[4].subtract(_firstPanelCoordinates[0]);
        v2.normalize();

        let angle2 = BABYLON.Vector3.Dot(v1, BABYLON.Axis.Y);
        angle2 = Math.acos(angle2);

        let thirdPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _thirdPanelCoordinates, scene, earcut);
        let thirdPanelMesh = thirdPanelMeshBuilder.build(true, thickness);
        thirdPanelMesh.parent = firstPanelMesh;
        thirdPanelMesh.rotation.z = Math.PI/2;
        thirdPanelMesh.rotation.y = angle2;
        thirdPanelMesh.position = new BABYLON.Vector3(W0, -thickness, 0);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;
        thirdPanelMesh.material = mat3;

        if(direction === "RH") {
            secondPanelMesh.rotation.z = -Math.PI/2;
            thirdPanelMesh.rotation.z = -Math.PI/2;
        }

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh, thirdPanelMesh], true, true, undefined, false, true);
        newMesh.name = name; 

        if(direction === "RH") {
            newMesh.rotation.z = -Math.PI;
        }

        return newMesh;
    },

    NSKP_SKILLION(name, direction, panel, holes, scene) {
        let { W0, W1, W2, W3, H0, H1, angle, thickness = 10 } = panel;
        let { holeNum = 3, W11, W12, H01, H02, H11, H12, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];

        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x, _firstPanelCoordinates[0].y + H0, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x + W1, _firstPanelCoordinates[1].y, _firstPanelCoordinates[1].z);
        
        _firstPanelCoordinates[3] = new BABYLON.Vector3( _firstPanelCoordinates[2].x + H1*Math.sin(angle), _firstPanelCoordinates[2].y - H1*Math.cos(angle), _firstPanelCoordinates[2].z); 
        _firstPanelCoordinates[4] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            {x: W0/2, y: H01}, 
            {x: W0/2, y: H01 + H02}, 
            {x: W0/2, y: H01 + 2*H02}
        ];

        if(holeNum === 4) {
            firstPanelHoles = [...firstPanelHoles, {x: W0/2, y: H01 + 3*H02}]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 + H11*Math.sin(angle) - W11*Math.cos(angle), 
                y: H0 - H11*Math.cos(angle) - W11*Math.sin(angle), 
            },
            {
                x: W1 + H11*Math.sin(angle) - (W11 + W12)*Math.cos(angle), 
                y: H0 - H11*Math.cos(angle) - (W11 + W12)*Math.sin(angle), 
            },
            {
                x: W1 + H11*Math.sin(angle) - (W11 + 2*W12)*Math.cos(angle), 
                y: H0 - H11*Math.cos(angle) - (W11 + 2*W12)*Math.sin(angle), 
            },
        ];

        // holeNum: total holes on panel
        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 + H11*Math.sin(angle) - (W11 + 3*W12)*Math.cos(angle), 
                    y: H0 - H11*Math.cos(angle) - (W11 + 3*W12)*Math.sin(angle),  
                },
            ]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 + (H11 + H12)*Math.sin(angle) - W11*Math.cos(angle), 
                y: H0 - (H11 + H12)*Math.cos(angle) - W11*Math.sin(angle), 
            },
            {
                x: W1 + (H11 + H12)*Math.sin(angle) - (W11 + W12)*Math.cos(angle), 
                y: H0 - (H11 + H12)*Math.cos(angle) - (W11 + W12)*Math.sin(angle),
            },
            {
                x: W1 + (H11 + H12)*Math.sin(angle) - (W11 + 2*W12)*Math.cos(angle), 
                y: H0 - (H11 + H12)*Math.cos(angle) - (W11 + 2*W12)*Math.sin(angle), 
            },
        ];

        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 + (H11 + H12)*Math.sin(angle) - (W11 + 3*W12)*Math.cos(angle), 
                    y: H0 - (H11 + H12)*Math.cos(angle) - (W11 + 3*W12)*Math.sin(angle),
                },
            ]
        }

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }

        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H0, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x - W2, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H0, _secondPanelCoordinates[2].z);

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);

        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.parent = firstPanelMesh;
        secondPanelMesh.rotation.z = Math.PI/2;
        secondPanelMesh.position = new BABYLON.Vector3(0, -thickness, 0);

        let distanceOfBetweenPoints = BABYLON.Vector3.Distance(_firstPanelCoordinates[3], _firstPanelCoordinates[4]);

        let _thirdPanelCoordinates = [];
        _thirdPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _thirdPanelCoordinates[1] = new BABYLON.Vector3(_thirdPanelCoordinates[0].x, _thirdPanelCoordinates[0].y + distanceOfBetweenPoints, _thirdPanelCoordinates[0].z);
        _thirdPanelCoordinates[2] = new BABYLON.Vector3(_thirdPanelCoordinates[1].x - W3, _thirdPanelCoordinates[1].y, _thirdPanelCoordinates[1].z);
        _thirdPanelCoordinates[3] = new BABYLON.Vector3(_thirdPanelCoordinates[2].x, _thirdPanelCoordinates[2].y - distanceOfBetweenPoints, _thirdPanelCoordinates[2].z);
 
        let v1 = _firstPanelCoordinates[3].subtract(_firstPanelCoordinates[4]);
        v1.normalize();

        let angle3 = BABYLON.Vector3.Dot(v1, BABYLON.Axis.Y);
        angle3 = Math.acos(angle3);

        let thirdPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _thirdPanelCoordinates, scene, earcut);
        let thirdPanelMesh = thirdPanelMeshBuilder.build(true, thickness);
        thirdPanelMesh.parent = firstPanelMesh;
        thirdPanelMesh.rotation.z = Math.PI/2;
        thirdPanelMesh.rotation.y = angle3;
        thirdPanelMesh.position = new BABYLON.Vector3(W0, -thickness, 0);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;
        thirdPanelMesh.material = mat3;

        if(direction === "RH") {
            secondPanelMesh.rotation.z = -Math.PI/2;
            thirdPanelMesh.rotation.z = -Math.PI/2;
        }

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh, thirdPanelMesh], true, true, undefined, false, true);
        newMesh.name = name; 

        if(direction === "RH") {
            newMesh.rotation.z = -Math.PI;
        }

        return newMesh;
    },

    NSKP_DEC_SKILLION(name, direction, panel, holes, scene) {
        let { W0, W1, W2, W3, W4, H0, H1, angle, thickness = 10 } = panel;
        let { holeNum = 3, W11, W12, H01, H02, H11, H12, radiusX, radiusY } = holes;

        // angle between W1 & W4
        let angle14 = Math.acos((W4 - W2)/W1);

        let _firstPanelCoordinates = [];

        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x, _firstPanelCoordinates[0].y + H0, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x + (W4 - W2), _firstPanelCoordinates[1].y - W1*Math.sin(angle14), _firstPanelCoordinates[1].z);
        
        _firstPanelCoordinates[3] = new BABYLON.Vector3( _firstPanelCoordinates[2].x - H1*Math.sin(angle), _firstPanelCoordinates[2].y - H1*Math.cos(angle), _firstPanelCoordinates[2].z); 
        _firstPanelCoordinates[4] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            {x: W0/2, y: H01}, 
            {x: W0/2, y: H01 + H02}, 
            {x: W0/2, y: H01 + 2*H02}
        ];

        if(holeNum === 4) {
            firstPanelHoles = [...firstPanelHoles, {x: W0/2, y: H01 + 3*H02}]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: (W4 - W2) - W11*Math.cos(angle) - H11*Math.sin(angle) , 
                y: H0 - W1*Math.sin(angle14) - H11*Math.cos(angle) + W11*Math.sin(angle), 
            },
            {
                x: (W4 - W2) - (W11 + W12)*Math.cos(angle) - H11*Math.sin(angle) , 
                y: H0 - W1*Math.sin(angle14) - H11*Math.cos(angle) + (W11 + W12)*Math.sin(angle), 
            },
            {
                x: (W4 - W2) - (W11 + 2*W12)*Math.cos(angle) - H11*Math.sin(angle) , 
                y: H0 - W1*Math.sin(angle14) - H11*Math.cos(angle) + (W11 + 2*W12)*Math.sin(angle),
            },
        ];

        // holeNum: total holes on panel
        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: (W4 - W2) - (W11 + 3*W12)*Math.cos(angle) - H11*Math.sin(angle) , 
                    y: H0 - W1*Math.sin(angle14) - H11*Math.cos(angle) + (W11 + 3*W12)*Math.sin(angle),
                },
            ]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: (W4 - W2) - W11*Math.cos(angle) - (H11 + H12)*Math.sin(angle) , 
                y: H0 - W1*Math.sin(angle14) - (H11 + H12)*Math.cos(angle) + W11*Math.sin(angle), 
            },
            {
                x: (W4 - W2) - (W11 + W12)*Math.cos(angle) - (H11 + H12)*Math.sin(angle) , 
                y: H0 - W1*Math.sin(angle14) - (H11 + H12)*Math.cos(angle) + (W11 + W12)*Math.sin(angle), 
            },
            {
                x: (W4 - W2) - (W11 + 2*W12)*Math.cos(angle) - (H11 + H12)*Math.sin(angle) , 
                y: H0 - W1*Math.sin(angle14) - (H11 + H12)*Math.cos(angle) + (W11 + 2*W12)*Math.sin(angle),
            },
        ];

        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: (W4 - W2) - (W11 + 3*W12)*Math.cos(angle) - (H11 + H12)*Math.sin(angle) , 
                    y: H0 - W1*Math.sin(angle14) - (H11 + H12)*Math.cos(angle) + (W11 + 3*W12)*Math.sin(angle),
                },
            ]
        }

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }

        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H0, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x - W2, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H0, _secondPanelCoordinates[2].z);

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);

        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.parent = firstPanelMesh;
        secondPanelMesh.rotation.z = Math.PI/2;
        secondPanelMesh.position = new BABYLON.Vector3(0, -thickness, 0);

        let distanceOfBetweenPoints = BABYLON.Vector3.Distance(_firstPanelCoordinates[3], _firstPanelCoordinates[4]);

        let _thirdPanelCoordinates = [];
        _thirdPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _thirdPanelCoordinates[1] = new BABYLON.Vector3(_thirdPanelCoordinates[0].x, _thirdPanelCoordinates[0].y + distanceOfBetweenPoints, _thirdPanelCoordinates[0].z);
        _thirdPanelCoordinates[2] = new BABYLON.Vector3(_thirdPanelCoordinates[1].x - W3, _thirdPanelCoordinates[1].y, _thirdPanelCoordinates[1].z);
        _thirdPanelCoordinates[3] = new BABYLON.Vector3(_thirdPanelCoordinates[2].x, _thirdPanelCoordinates[2].y - distanceOfBetweenPoints, _thirdPanelCoordinates[2].z);
 
        let v1 = _firstPanelCoordinates[3].subtract(_firstPanelCoordinates[4]);
        v1.normalize();

        let angle3 = BABYLON.Vector3.Dot(v1, BABYLON.Axis.Y);
        angle3 = Math.acos(angle3);

        let thirdPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _thirdPanelCoordinates, scene, earcut);
        let thirdPanelMesh = thirdPanelMeshBuilder.build(true, thickness);
        thirdPanelMesh.parent = firstPanelMesh;
        thirdPanelMesh.rotation.z = Math.PI/2;
        thirdPanelMesh.rotation.y = angle3;
        thirdPanelMesh.position = new BABYLON.Vector3(W0, -thickness, 0);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;
        thirdPanelMesh.material = mat3;

        if(direction === "RH") {
            secondPanelMesh.rotation.z = -Math.PI/2;
            thirdPanelMesh.rotation.z = -Math.PI/2;
        }

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh, thirdPanelMesh], true, true, undefined, false, true);
        newMesh.name = name; 

        if(direction === "RH") {
            newMesh.rotation.z = -Math.PI;
        }

        return newMesh;
    },

    // FRAME Tophat
    NSTKP(name, direction, panel, holes, scene) {
        let { W0, W1, W2, W3, H0, H1, H2, H3, angle, thickness = 10 } = panel;
        let { holeNum = 3, W01, W02, W11, W12, H01, H02, H11, H12, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];

        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x, _firstPanelCoordinates[0].y + H0, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x + W1, _firstPanelCoordinates[1].y + H1, _firstPanelCoordinates[1].z);
        
        _firstPanelCoordinates[3] = new BABYLON.Vector3( _firstPanelCoordinates[2].x + H2*Math.sin(angle), _firstPanelCoordinates[2].y - H2*Math.cos(angle), _firstPanelCoordinates[2].z); 
        _firstPanelCoordinates[5] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[4] = new BABYLON.Vector3(_firstPanelCoordinates[5].x, _firstPanelCoordinates[5].y + H3, _firstPanelCoordinates[5].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            {x: W01, y: H01}, 
            {x: W01, y: H01 + H02}, 
            {x: W01, y: H01 + 2*H02},
            {x: W01 + W02, y: H01}, 
            {x: W01 + W02, y: H01 + H02}, 
            {x: W01 + W02, y: H01 + 2*H02}
        ];

        if(holeNum === 4) {
            firstPanelHoles = [...firstPanelHoles, { x: W01, y: H01 + 3*H02 }, { x: W01 + W02, y: H01 + 3*H02 },]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 + H11*Math.sin(angle) - W11*Math.cos(angle), 
                y: (H0 + H1) - H11*Math.cos(angle) - W11*Math.sin(angle), 
            },
            {
                x: W1 + H11*Math.sin(angle) - (W11 + W12)*Math.cos(angle), 
                y: (H0 + H1) - H11*Math.cos(angle) - (W11 + W12)*Math.sin(angle), 
            },
            {
                x: W1 + H11*Math.sin(angle) - (W11 + 2*W12)*Math.cos(angle), 
                y: (H0 + H1) - H11*Math.cos(angle) - (W11 + 2*W12)*Math.sin(angle), 
            },
        ];

        // holeNum: total holes on panel
        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 + H11*Math.sin(angle) - (W11 + 3*W12)*Math.cos(angle), 
                    y: (H0 + H1) - H11*Math.cos(angle) - (W11 + 3*W12)*Math.sin(angle),
                },
            ]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 + (H11 + H12)*Math.sin(angle) - W11*Math.cos(angle), 
                y: (H0 + H1) - (H11 + H12)*Math.cos(angle) - W11*Math.sin(angle), 
            },
            {
                x: W1 + (H11 + H12)*Math.sin(angle) - (W11 + W12)*Math.cos(angle), 
                y: (H0 + H1) - (H11 + H12)*Math.cos(angle) - (W11 + W12)*Math.sin(angle),
            },
            {
                x: W1 + (H11 + H12)*Math.sin(angle) - (W11 + 2*W12)*Math.cos(angle), 
                y: (H0 + H1) - (H11 + H12)*Math.cos(angle) - (W11 + 2*W12)*Math.sin(angle), 
            },
        ];

        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 + (H11 + H12)*Math.sin(angle) - (W11 + 3*W12)*Math.cos(angle), 
                    y: (H0 + H1) - (H11 + H12)*Math.cos(angle) - (W11 + 3*W12)*Math.sin(angle),
                },
            ]
        }

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }

        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H0, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x - W2, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H0, _secondPanelCoordinates[2].z);

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);

        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.parent = firstPanelMesh;
        secondPanelMesh.rotation.z = Math.PI/2;
        secondPanelMesh.position = new BABYLON.Vector3(0, -thickness, 0);

        let distanceOfBetweenPoints = BABYLON.Vector3.Distance(_firstPanelCoordinates[3], _firstPanelCoordinates[4]);

        let _thirdPanelCoordinates = [];
        _thirdPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _thirdPanelCoordinates[1] = new BABYLON.Vector3(_thirdPanelCoordinates[0].x, _thirdPanelCoordinates[0].y + distanceOfBetweenPoints, _thirdPanelCoordinates[0].z);
        _thirdPanelCoordinates[2] = new BABYLON.Vector3(_thirdPanelCoordinates[1].x - W3, _thirdPanelCoordinates[1].y, _thirdPanelCoordinates[1].z);
        _thirdPanelCoordinates[3] = new BABYLON.Vector3(_thirdPanelCoordinates[2].x, _thirdPanelCoordinates[2].y - distanceOfBetweenPoints, _thirdPanelCoordinates[2].z);
 
        let v1 = _firstPanelCoordinates[3].subtract(_firstPanelCoordinates[4]);
        v1.normalize();
        let v2 = _firstPanelCoordinates[4].subtract(_firstPanelCoordinates[5]);
        v2.normalize();

        let angle3 = BABYLON.Vector3.Dot(v1, v2);
        angle3 = Math.acos(angle3);

        let thirdPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _thirdPanelCoordinates, scene, earcut);
        let thirdPanelMesh = thirdPanelMeshBuilder.build(true, thickness);
        thirdPanelMesh.parent = firstPanelMesh;
        thirdPanelMesh.rotation.z = Math.PI/2;
        thirdPanelMesh.rotation.y = angle3;
        thirdPanelMesh.position = new BABYLON.Vector3(W0, -thickness, H3);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;
        thirdPanelMesh.material = mat3;

        if(direction === "RH") {
            secondPanelMesh.rotation.z = -Math.PI/2;
            thirdPanelMesh.rotation.z = -Math.PI/2;
        }

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh, thirdPanelMesh], true, true, undefined, false, true);
        newMesh.name = name; 

        if(direction === "RH") {
            newMesh.rotation.z = -Math.PI;
        }

        return newMesh;
    },

    NSTKP_DEC(name, direction, panel, holes, scene) {
        let { W0, W1, W2, W3, H0, H1, H2, angle, angle2, thickness = 10 } = panel;
        let { holeNum = 3, holeRow = 2, W01, W02, W11, W12, H01, H02, H11, H12, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];

        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x, _firstPanelCoordinates[0].y + H0, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x + W1, _firstPanelCoordinates[1].y - W1*Math.tan(Math.PI - angle2), _firstPanelCoordinates[1].z);
        
        _firstPanelCoordinates[3] = new BABYLON.Vector3( _firstPanelCoordinates[2].x - H1*Math.sin(angle), _firstPanelCoordinates[2].y - H1*Math.cos(angle), _firstPanelCoordinates[2].z); 
        _firstPanelCoordinates[5] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[4] = new BABYLON.Vector3(_firstPanelCoordinates[5].x, _firstPanelCoordinates[5].y + H2, _firstPanelCoordinates[5].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            {x: W01, y: H01}, 
            {x: W01, y: H01 + H02}, 
            {x: W01, y: H01 + 2*H02},
            {x: W01 + W02, y: H01}, 
            {x: W01 + W02, y: H01 + H02}, 
            {x: W01 + W02, y: H01 + 2*H02}
        ];

        if(holeRow === 3) {
            firstPanelHoles = [
                ...firstPanelHoles,             
                {x: W01 + 2*W02, y: H01}, 
                {x: W01 + 2*W02, y: H01 + H02}, 
                {x: W01 + 2*W02, y: H01 + 2*H02},
            ]
        }

        if(holeNum === 4) {
            firstPanelHoles = [...firstPanelHoles, { x: W01, y: H01 + 3*H02 }, { x: W01 + W02, y: H01 + 3*H02 },]

            if(holeRow === 3) {
                firstPanelHoles = [...firstPanelHoles, { x: W01 + 2*W02, y: H01 + 3*H02 },]
            }
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 - H11*Math.sin(angle) - W11*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - H11*Math.cos(angle) + W11*Math.sin(angle), 
            },
            {
                x: W1 - H11*Math.sin(angle) - (W11 + W12)*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - H11*Math.cos(angle) + (W11 + W12)*Math.sin(angle), 
            },
            {
                x: W1 - H11*Math.sin(angle) - (W11 + 2*W12)*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - H11*Math.cos(angle) + (W11 + 2*W12)*Math.sin(angle), 
            },
        ];

        // holeNum: total holes on panel
        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 - H11*Math.sin(angle) - (W11 + 3*W12)*Math.cos(angle), 
                    y: (H0 - W1*Math.tan(Math.PI - angle2)) - H11*Math.cos(angle) + (W11 + 3*W12)*Math.sin(angle), 
                },
            ]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 - (H11 + H12)*Math.sin(angle) - W11*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + H12)*Math.cos(angle) + W11*Math.sin(angle), 
            },
            {
                x: W1 - (H11 + H12)*Math.sin(angle) - (W11 + W12)*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + H12)*Math.cos(angle) + (W11 + W12)*Math.sin(angle), 
            },
            {
                x: W1 - (H11 + H12)*Math.sin(angle) - (W11 + 2*W12)*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + H12)*Math.cos(angle) + (W11 + 2*W12)*Math.sin(angle), 
            },
        ];
        
        if(holeRow === 3) {
            firstPanelHoles = [
                ...firstPanelHoles,             
                {
                    x: W1 - (H11 + 2*H12)*Math.sin(angle) - W11*Math.cos(angle), 
                    y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + 2*H12)*Math.cos(angle) + W11*Math.sin(angle), 
                },
                {
                    x: W1 - (H11 + 2*H12)*Math.sin(angle) - (W11 + W12)*Math.cos(angle), 
                    y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + 2*H12)*Math.cos(angle) + (W11 + W12)*Math.sin(angle), 
                },
                {
                    x: W1 - (H11 + 2*H12)*Math.sin(angle) - (W11 + 2*W12)*Math.cos(angle), 
                    y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + 2*H12)*Math.cos(angle) + (W11 + 2*W12)*Math.sin(angle), 
                },
            ]
        }

        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 - (H11 + H12)*Math.sin(angle) - (W11 + 3*W12)*Math.cos(angle), 
                    y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + H12)*Math.cos(angle) + (W11 + 3*W12)*Math.sin(angle), 
                },
            ]

            if(holeRow === 3) {
                firstPanelHoles = [
                    ...firstPanelHoles, 
                    {
                        x: W1 - (H11 + 2*H12)*Math.sin(angle) - (W11 + 3*W12)*Math.cos(angle), 
                        y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + 2*H12)*Math.cos(angle) + (W11 + 3*W12)*Math.sin(angle), 
                    },
                ]
            }
        }

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }

        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H0, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x - W2, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H0, _secondPanelCoordinates[2].z);

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);

        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.parent = firstPanelMesh;
        secondPanelMesh.rotation.z = Math.PI/2;
        secondPanelMesh.position = new BABYLON.Vector3(0, -thickness, 0);

        let distanceOfBetweenPoints = BABYLON.Vector3.Distance(_firstPanelCoordinates[3], _firstPanelCoordinates[4]);

        let _thirdPanelCoordinates = [];
        _thirdPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _thirdPanelCoordinates[1] = new BABYLON.Vector3(_thirdPanelCoordinates[0].x, _thirdPanelCoordinates[0].y + distanceOfBetweenPoints, _thirdPanelCoordinates[0].z);
        _thirdPanelCoordinates[2] = new BABYLON.Vector3(_thirdPanelCoordinates[1].x - W3, _thirdPanelCoordinates[1].y, _thirdPanelCoordinates[1].z);
        _thirdPanelCoordinates[3] = new BABYLON.Vector3(_thirdPanelCoordinates[2].x, _thirdPanelCoordinates[2].y - distanceOfBetweenPoints, _thirdPanelCoordinates[2].z);
 
        let v1 = _firstPanelCoordinates[3].subtract(_firstPanelCoordinates[4]);
        v1.normalize();
        let v2 = _firstPanelCoordinates[4].subtract(_firstPanelCoordinates[5]);
        v2.normalize();

        let angle3 = H2 > 0 ? BABYLON.Vector3.Dot(v1, v2) : BABYLON.Vector3.Dot(v1, BABYLON.Axis.Y);
        angle3 = Math.acos(angle3);

        let thirdPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _thirdPanelCoordinates, scene, earcut);
        let thirdPanelMesh = thirdPanelMeshBuilder.build(true, thickness);
        thirdPanelMesh.parent = firstPanelMesh;
        thirdPanelMesh.rotation.z = Math.PI/2;
        thirdPanelMesh.rotation.y = angle3;
        thirdPanelMesh.position = new BABYLON.Vector3(W0, -thickness, H2);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;
        thirdPanelMesh.material = mat3;

        if(direction === "RH") {
            secondPanelMesh.rotation.z = -Math.PI/2;
            thirdPanelMesh.rotation.z = -Math.PI/2;
        }

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh, thirdPanelMesh], true, true, undefined, false, true);
        newMesh.name = name; 

        if(direction === "RH") {
            newMesh.rotation.z = -Math.PI;
        }

        return newMesh;
    },

    NSZKP(name, direction, panel, holes, scene) {
        let { W0, W1, W2, W3, H0, H1, H2, H3, angle, thickness = 10 } = panel;
        let { holeNum = 3, W01, W02, W11, W12, W21, H01, H02, H03, H04, H05, H06, H07, H11, H12, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];

        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x, _firstPanelCoordinates[0].y + H0, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x + W1, _firstPanelCoordinates[1].y + H1, _firstPanelCoordinates[1].z);
        
        _firstPanelCoordinates[3] = new BABYLON.Vector3( _firstPanelCoordinates[2].x + H2*Math.sin(angle), _firstPanelCoordinates[2].y - H2*Math.cos(angle), _firstPanelCoordinates[2].z); 
        _firstPanelCoordinates[5] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[4] = new BABYLON.Vector3(_firstPanelCoordinates[5].x, _firstPanelCoordinates[5].y + H3, _firstPanelCoordinates[5].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            {x: W01, y: H01}, 
            {x: W01, y: H01 + H02}, 
            {x: W01, y: H01 + 2*H02},
            {x: W01 + W02, y: H01}, 
            {x: W01 + W02, y: H01 + H02}, 
            {x: W01 + W02, y: H01 + 2*H02}
        ];

        if(holeNum === 4) {
            firstPanelHoles = [...firstPanelHoles, { x: W01, y: H01 + 3*H02 }, { x: W01 + W02, y: H01 + 3*H02 },]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 + H11*Math.sin(angle) - W11*Math.cos(angle), 
                y: (H0 + H1) - H11*Math.cos(angle) - W11*Math.sin(angle), 
            },
            {
                x: W1 + H11*Math.sin(angle) - (W11 + W12)*Math.cos(angle), 
                y: (H0 + H1) - H11*Math.cos(angle) - (W11 + W12)*Math.sin(angle), 
            },
            {
                x: W1 + H11*Math.sin(angle) - (W11 + 2*W12)*Math.cos(angle), 
                y: (H0 + H1) - H11*Math.cos(angle) - (W11 + 2*W12)*Math.sin(angle), 
            },
        ];

        // holeNum: total holes on panel
        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 + H11*Math.sin(angle) - (W11 + 3*W12)*Math.cos(angle), 
                    y: (H0 + H1) - H11*Math.cos(angle) - (W11 + 3*W12)*Math.sin(angle),
                },
            ]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 + (H11 + H12)*Math.sin(angle) - W11*Math.cos(angle), 
                y: (H0 + H1) - (H11 + H12)*Math.cos(angle) - W11*Math.sin(angle), 
            },
            {
                x: W1 + (H11 + H12)*Math.sin(angle) - (W11 + W12)*Math.cos(angle), 
                y: (H0 + H1) - (H11 + H12)*Math.cos(angle) - (W11 + W12)*Math.sin(angle),
            },
            {
                x: W1 + (H11 + H12)*Math.sin(angle) - (W11 + 2*W12)*Math.cos(angle), 
                y: (H0 + H1) - (H11 + H12)*Math.cos(angle) - (W11 + 2*W12)*Math.sin(angle), 
            },
        ];

        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 + (H11 + H12)*Math.sin(angle) - (W11 + 3*W12)*Math.cos(angle), 
                    y: (H0 + H1) - (H11 + H12)*Math.cos(angle) - (W11 + 3*W12)*Math.sin(angle),
                },
            ]
        }

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }

        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H0, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x - W2, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H0, _secondPanelCoordinates[2].z);

        let secondPanelHoles = [];
        let _secondPanelHoleCoords = [];

        secondPanelHoles = [
            {x: -W21, y: H03}, 
            {x: -W21, y: H03 + H04},
            {x: -W21, y: H03 + H04 + H05},
            {x: -W21, y: H03 + H04 + H05 + H06},
            {x: -W21, y: H03 + H04 + H05 + H06 + H07},
        ];

        for(let h = 0; h < secondPanelHoles.length; h++) {
            let {x, y} = secondPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _secondPanelHoleCoords.push(_newHoleCoord);
        }

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        for(let i = 0; i < _secondPanelHoleCoords.length; i++) {
            secondPanelMeshBuilder.addHole(_secondPanelHoleCoords[i]);
        }

        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.parent = firstPanelMesh;
        secondPanelMesh.rotation.z = Math.PI/2;
        secondPanelMesh.position = new BABYLON.Vector3(0, -thickness, 0);

        let distanceOfBetweenPoints = BABYLON.Vector3.Distance(_firstPanelCoordinates[3], _firstPanelCoordinates[4]);

        let _thirdPanelCoordinates = [];
        _thirdPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _thirdPanelCoordinates[1] = new BABYLON.Vector3(_thirdPanelCoordinates[0].x, _thirdPanelCoordinates[0].y + distanceOfBetweenPoints, _thirdPanelCoordinates[0].z);
        _thirdPanelCoordinates[2] = new BABYLON.Vector3(_thirdPanelCoordinates[1].x - W3, _thirdPanelCoordinates[1].y, _thirdPanelCoordinates[1].z);
        _thirdPanelCoordinates[3] = new BABYLON.Vector3(_thirdPanelCoordinates[2].x, _thirdPanelCoordinates[2].y - distanceOfBetweenPoints, _thirdPanelCoordinates[2].z);
 
        let v1 = _firstPanelCoordinates[3].subtract(_firstPanelCoordinates[4]);
        v1.normalize();
        let v2 = _firstPanelCoordinates[4].subtract(_firstPanelCoordinates[5]);
        v2.normalize();

        let angle3 = BABYLON.Vector3.Dot(v1, v2);
        angle3 = Math.acos(angle3);

        let thirdPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _thirdPanelCoordinates, scene, earcut);
        let thirdPanelMesh = thirdPanelMeshBuilder.build(true, thickness);
        thirdPanelMesh.parent = firstPanelMesh;
        thirdPanelMesh.rotation.z = Math.PI/2;
        thirdPanelMesh.rotation.y = angle3;
        thirdPanelMesh.position = new BABYLON.Vector3(W0, -thickness, H3);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;
        thirdPanelMesh.material = mat3;

        if(direction === "RH") {
            secondPanelMesh.rotation.z = -Math.PI/2;
            thirdPanelMesh.rotation.z = -Math.PI/2;
        }

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh, thirdPanelMesh], true, true, undefined, false, true);
        newMesh.name = name; 

        if(direction === "RH") {
            newMesh.rotation.z = -Math.PI;
        }

        return newMesh;
    },

    NSZKP_DEC(name, direction, panel, holes, scene) {
        let { W0, W1, W2, W3, H0, H1, H2, angle, angle2, thickness = 10 } = panel;
        let { holeNum = 3, W01, W02, W11, W12, W21, H01, H02, H03, H04, H05, H06, H07, H08, H11, H12, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];

        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x, _firstPanelCoordinates[0].y + H0, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x + W1, _firstPanelCoordinates[1].y - W1*Math.tan(Math.PI - angle2), _firstPanelCoordinates[1].z);
        
        _firstPanelCoordinates[3] = new BABYLON.Vector3( _firstPanelCoordinates[2].x - H1*Math.sin(angle), _firstPanelCoordinates[2].y - H1*Math.cos(angle), _firstPanelCoordinates[2].z); 
        _firstPanelCoordinates[5] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[4] = new BABYLON.Vector3(_firstPanelCoordinates[5].x, _firstPanelCoordinates[5].y + H2, _firstPanelCoordinates[5].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            {x: W01, y: H01}, 
            {x: W01, y: H01 + H02}, 
            {x: W01, y: H01 + 2*H02},
            {x: W01 + W02, y: H01}, 
            {x: W01 + W02, y: H01 + H02}, 
            {x: W01 + W02, y: H01 + 2*H02}
        ];

        if(holeNum === 4) {
            firstPanelHoles = [...firstPanelHoles, { x: W01, y: H01 + 3*H02 }, { x: W01 + W02, y: H01 + 3*H02 },]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 - H11*Math.sin(angle) - W11*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - H11*Math.cos(angle) + W11*Math.sin(angle), 
            },
            {
                x: W1 - H11*Math.sin(angle) - (W11 + W12)*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - H11*Math.cos(angle) + (W11 + W12)*Math.sin(angle), 
            },
            {
                x: W1 - H11*Math.sin(angle) - (W11 + 2*W12)*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - H11*Math.cos(angle) + (W11 + 2*W12)*Math.sin(angle), 
            },
        ];

        // holeNum: total holes on panel
        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 - H11*Math.sin(angle) - (W11 + 3*W12)*Math.cos(angle), 
                    y: (H0 - W1*Math.tan(Math.PI - angle2)) - H11*Math.cos(angle) + (W11 + 3*W12)*Math.sin(angle), 
                },
            ]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 - (H11 + H12)*Math.sin(angle) - W11*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + H12)*Math.cos(angle) + W11*Math.sin(angle), 
            },
            {
                x: W1 - (H11 + H12)*Math.sin(angle) - (W11 + W12)*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + H12)*Math.cos(angle) + (W11 + W12)*Math.sin(angle), 
            },
            {
                x: W1 - (H11 + H12)*Math.sin(angle) - (W11 + 2*W12)*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + H12)*Math.cos(angle) + (W11 + 2*W12)*Math.sin(angle), 
            },
        ];

        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 - (H11 + H12)*Math.sin(angle) - (W11 + 3*W12)*Math.cos(angle), 
                    y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + H12)*Math.cos(angle) + (W11 + 3*W12)*Math.sin(angle), 
                },
            ]
        }

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }

        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H0, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x - W2, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H0, _secondPanelCoordinates[2].z);

        let secondPanelHoles = [];
        let _secondPanelHoleCoords = [];

        secondPanelHoles = [
            {x: -W21, y: H03}, 
            {x: -W21, y: H03 + H04},
            {x: -W21, y: H03 + H04 + H05},
            {x: -W21, y: H03 + H04 + H05 + H06},
            {x: -W21, y: H03 + H04 + H05 + H06 + H07},
            {x: -W21, y: H03 + H04 + H05 + H06 + H07 + H08},
        ];

        for(let h = 0; h < secondPanelHoles.length; h++) {
            let {x, y} = secondPanelHoles[h];

            if(x > 0 || y > 0) {
                let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
                _secondPanelHoleCoords.push(_newHoleCoord);
            }
        }

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        for(let i = 0; i < _secondPanelHoleCoords.length; i++) {
            secondPanelMeshBuilder.addHole(_secondPanelHoleCoords[i]);
        }

        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.parent = firstPanelMesh;
        secondPanelMesh.rotation.z = Math.PI/2;
        secondPanelMesh.position = new BABYLON.Vector3(0, -thickness, 0);

        let distanceOfBetweenPoints = BABYLON.Vector3.Distance(_firstPanelCoordinates[3], _firstPanelCoordinates[4]);

        let _thirdPanelCoordinates = [];
        _thirdPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _thirdPanelCoordinates[1] = new BABYLON.Vector3(_thirdPanelCoordinates[0].x, _thirdPanelCoordinates[0].y + distanceOfBetweenPoints, _thirdPanelCoordinates[0].z);
        _thirdPanelCoordinates[2] = new BABYLON.Vector3(_thirdPanelCoordinates[1].x - W3, _thirdPanelCoordinates[1].y, _thirdPanelCoordinates[1].z);
        _thirdPanelCoordinates[3] = new BABYLON.Vector3(_thirdPanelCoordinates[2].x, _thirdPanelCoordinates[2].y - distanceOfBetweenPoints, _thirdPanelCoordinates[2].z);
 
        let v1 = _firstPanelCoordinates[3].subtract(_firstPanelCoordinates[4]);
        v1.normalize();
        let v2 = _firstPanelCoordinates[4].subtract(_firstPanelCoordinates[5]);
        v2.normalize();

        let angle3 = H2 > 0 ? BABYLON.Vector3.Dot(v1, v2) : BABYLON.Vector3.Dot(v1, BABYLON.Axis.Y);
        angle3 = Math.acos(angle3);

        let thirdPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _thirdPanelCoordinates, scene, earcut);
        let thirdPanelMesh = thirdPanelMeshBuilder.build(true, thickness);
        thirdPanelMesh.parent = firstPanelMesh;
        thirdPanelMesh.rotation.z = Math.PI/2;
        thirdPanelMesh.rotation.y = angle3;
        thirdPanelMesh.position = new BABYLON.Vector3(W0, -thickness, H2);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;
        thirdPanelMesh.material = mat3;

        if(direction === "RH") {
            secondPanelMesh.rotation.z = -Math.PI/2;
            thirdPanelMesh.rotation.z = -Math.PI/2;
        }

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh, thirdPanelMesh], true, true, undefined, false, true);
        newMesh.name = name; 

        if(direction === "RH") {
            newMesh.rotation.z = -Math.PI;
        }

        return newMesh;
    },

    NSTRKP(name, direction, panel, holes, scene) {
        let { W0, W1, W2, H0, H1, H2, H3, angle, thickness = 10 } = panel;
        let { holeNum = 3, W01, W02, W11, W12, H01, H02, H11, H12, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];

        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x, _firstPanelCoordinates[0].y + H0, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x + W1, _firstPanelCoordinates[1].y + H1, _firstPanelCoordinates[1].z);
        
        _firstPanelCoordinates[3] = new BABYLON.Vector3( _firstPanelCoordinates[2].x + H2*Math.sin(angle), _firstPanelCoordinates[2].y - H2*Math.cos(angle), _firstPanelCoordinates[2].z); 
        _firstPanelCoordinates[5] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[4] = new BABYLON.Vector3(_firstPanelCoordinates[5].x, _firstPanelCoordinates[5].y + H3, _firstPanelCoordinates[5].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            {x: W01, y: H01}, 
            {x: W01, y: H01 + H02}, 
            {x: W01, y: H01 + 2*H02},
            {x: W01 + W02, y: H01}, 
            {x: W01 + W02, y: H01 + H02}, 
            {x: W01 + W02, y: H01 + 2*H02}
        ];

        if(holeNum === 4) {
            firstPanelHoles = [...firstPanelHoles, { x: W01, y: H01 + 3*H02 }, { x: W01 + W02, y: H01 + 3*H02 },]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 + H11*Math.sin(angle) - W11*Math.cos(angle), 
                y: (H0 + H1) - H11*Math.cos(angle) - W11*Math.sin(angle), 
            },
            {
                x: W1 + H11*Math.sin(angle) - (W11 + W12)*Math.cos(angle), 
                y: (H0 + H1) - H11*Math.cos(angle) - (W11 + W12)*Math.sin(angle), 
            },
            {
                x: W1 + H11*Math.sin(angle) - (W11 + 2*W12)*Math.cos(angle), 
                y: (H0 + H1) - H11*Math.cos(angle) - (W11 + 2*W12)*Math.sin(angle), 
            },
        ];

        // holeNum: total holes on panel
        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 + H11*Math.sin(angle) - (W11 + 3*W12)*Math.cos(angle), 
                    y: (H0 + H1) - H11*Math.cos(angle) - (W11 + 3*W12)*Math.sin(angle),
                },
            ]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 + (H11 + H12)*Math.sin(angle) - W11*Math.cos(angle), 
                y: (H0 + H1) - (H11 + H12)*Math.cos(angle) - W11*Math.sin(angle), 
            },
            {
                x: W1 + (H11 + H12)*Math.sin(angle) - (W11 + W12)*Math.cos(angle), 
                y: (H0 + H1) - (H11 + H12)*Math.cos(angle) - (W11 + W12)*Math.sin(angle),
            },
            {
                x: W1 + (H11 + H12)*Math.sin(angle) - (W11 + 2*W12)*Math.cos(angle), 
                y: (H0 + H1) - (H11 + H12)*Math.cos(angle) - (W11 + 2*W12)*Math.sin(angle), 
            },
        ];

        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 + (H11 + H12)*Math.sin(angle) - (W11 + 3*W12)*Math.cos(angle), 
                    y: (H0 + H1) - (H11 + H12)*Math.cos(angle) - (W11 + 3*W12)*Math.sin(angle),
                },
            ]
        }

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }

        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H0, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x - W2, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H0, _secondPanelCoordinates[2].z);

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);

        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.parent = firstPanelMesh;
        secondPanelMesh.rotation.z = Math.PI/2;
        secondPanelMesh.position = new BABYLON.Vector3(0, -thickness, 0);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;

        if(direction === "RH") {
            secondPanelMesh.rotation.z = -Math.PI/2;
        }

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh], true, true, undefined, false, true);
        newMesh.name = name; 

        if(direction === "RH") {
            newMesh.rotation.z = -Math.PI;
        }

        return newMesh;
    },

    NSTRKP_DEC(name, direction, panel, holes, scene) {
        let { W0, W1, W2, H0, H1, H2, angle, angle2, thickness = 10 } = panel;
        let { holeNum = 3, W01, W02, W11, W12, H01, H02, H11, H12, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];

        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x, _firstPanelCoordinates[0].y + H0, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x + W1, _firstPanelCoordinates[1].y - W1*Math.tan(Math.PI - angle2), _firstPanelCoordinates[1].z);
        
        _firstPanelCoordinates[3] = new BABYLON.Vector3( _firstPanelCoordinates[2].x - H1*Math.sin(angle), _firstPanelCoordinates[2].y - H1*Math.cos(angle), _firstPanelCoordinates[2].z); 
        _firstPanelCoordinates[5] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[4] = new BABYLON.Vector3(_firstPanelCoordinates[5].x, _firstPanelCoordinates[5].y + H2, _firstPanelCoordinates[5].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            {x: W01, y: H01}, 
            {x: W01, y: H01 + H02}, 
            {x: W01, y: H01 + 2*H02},
            {x: W01 + W02, y: H01}, 
            {x: W01 + W02, y: H01 + H02}, 
            {x: W01 + W02, y: H01 + 2*H02}
        ];

        if(holeNum === 4) {
            firstPanelHoles = [...firstPanelHoles, { x: W01, y: H01 + 3*H02 }, { x: W01 + W02, y: H01 + 3*H02 },]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 - H11*Math.sin(angle) - W11*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - H11*Math.cos(angle) + W11*Math.sin(angle), 
            },
            {
                x: W1 - H11*Math.sin(angle) - (W11 + W12)*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - H11*Math.cos(angle) + (W11 + W12)*Math.sin(angle), 
            },
            {
                x: W1 - H11*Math.sin(angle) - (W11 + 2*W12)*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - H11*Math.cos(angle) + (W11 + 2*W12)*Math.sin(angle), 
            },
        ];

        // holeNum: total holes on panel
        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 - H11*Math.sin(angle) - (W11 + 3*W12)*Math.cos(angle), 
                    y: (H0 - W1*Math.tan(Math.PI - angle2)) - H11*Math.cos(angle) + (W11 + 3*W12)*Math.sin(angle), 
                },
            ]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 - (H11 + H12)*Math.sin(angle) - W11*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + H12)*Math.cos(angle) + W11*Math.sin(angle), 
            },
            {
                x: W1 - (H11 + H12)*Math.sin(angle) - (W11 + W12)*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + H12)*Math.cos(angle) + (W11 + W12)*Math.sin(angle), 
            },
            {
                x: W1 - (H11 + H12)*Math.sin(angle) - (W11 + 2*W12)*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + H12)*Math.cos(angle) + (W11 + 2*W12)*Math.sin(angle), 
            },
        ];

        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 - (H11 + H12)*Math.sin(angle) - (W11 + 3*W12)*Math.cos(angle), 
                    y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + H12)*Math.cos(angle) + (W11 + 3*W12)*Math.sin(angle), 
                },
            ]
        }

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }

        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H0, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x - W2, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H0, _secondPanelCoordinates[2].z);

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);

        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.parent = firstPanelMesh;
        secondPanelMesh.rotation.z = Math.PI/2;
        secondPanelMesh.position = new BABYLON.Vector3(0, -thickness, 0);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;

        if(direction === "RH") {
            secondPanelMesh.rotation.z = -Math.PI/2;
        }

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh], true, true, undefined, false, true);
        newMesh.name = name; 

        if(direction === "RH") {
            newMesh.rotation.z = -Math.PI;
        }

        return newMesh;
    },  

    NSZRKP(name, direction, panel, holes, scene) {
        let { W0, W1, W2, H0, H1, H2, angle, thickness = 10 } = panel;
        let { holeNum = 3, W01, W02, W11, W12, W21, H01, H02, H03, H04, H05, H06, H07, H11, H12, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];

        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x, _firstPanelCoordinates[0].y + H0, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x + W1, _firstPanelCoordinates[1].y + H1, _firstPanelCoordinates[1].z);
        
        _firstPanelCoordinates[3] = new BABYLON.Vector3( _firstPanelCoordinates[2].x + H2*Math.sin(angle), _firstPanelCoordinates[2].y - H2*Math.cos(angle), _firstPanelCoordinates[2].z); 
        _firstPanelCoordinates[5] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[4] = new BABYLON.Vector3(
            _firstPanelCoordinates[5].x, 
            _firstPanelCoordinates[5].y + _firstPanelCoordinates[3].y - (_firstPanelCoordinates[3].x - W0)*Math.tan(angle), 
            _firstPanelCoordinates[5].z
        );

        let firstPanelHoles = [];

        firstPanelHoles = [
            {x: W01, y: H01}, 
            {x: W01, y: H01 + H02}, 
            {x: W01, y: H01 + 2*H02},
            {x: W01 + W02, y: H01}, 
            {x: W01 + W02, y: H01 + H02}, 
            {x: W01 + W02, y: H01 + 2*H02}
        ];

        if(holeNum === 4) {
            firstPanelHoles = [...firstPanelHoles, { x: W01, y: H01 + 3*H02 }, { x: W01 + W02, y: H01 + 3*H02 },]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 + H11*Math.sin(angle) - W11*Math.cos(angle), 
                y: (H0 + H1) - H11*Math.cos(angle) - W11*Math.sin(angle), 
            },
            {
                x: W1 + H11*Math.sin(angle) - (W11 + W12)*Math.cos(angle), 
                y: (H0 + H1) - H11*Math.cos(angle) - (W11 + W12)*Math.sin(angle), 
            },
            {
                x: W1 + H11*Math.sin(angle) - (W11 + 2*W12)*Math.cos(angle), 
                y: (H0 + H1) - H11*Math.cos(angle) - (W11 + 2*W12)*Math.sin(angle), 
            },
        ];

        // holeNum: total holes on panel
        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 + H11*Math.sin(angle) - (W11 + 3*W12)*Math.cos(angle), 
                    y: (H0 + H1) - H11*Math.cos(angle) - (W11 + 3*W12)*Math.sin(angle),
                },
            ]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 + (H11 + H12)*Math.sin(angle) - W11*Math.cos(angle), 
                y: (H0 + H1) - (H11 + H12)*Math.cos(angle) - W11*Math.sin(angle), 
            },
            {
                x: W1 + (H11 + H12)*Math.sin(angle) - (W11 + W12)*Math.cos(angle), 
                y: (H0 + H1) - (H11 + H12)*Math.cos(angle) - (W11 + W12)*Math.sin(angle),
            },
            {
                x: W1 + (H11 + H12)*Math.sin(angle) - (W11 + 2*W12)*Math.cos(angle), 
                y: (H0 + H1) - (H11 + H12)*Math.cos(angle) - (W11 + 2*W12)*Math.sin(angle), 
            },
        ];

        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 + (H11 + H12)*Math.sin(angle) - (W11 + 3*W12)*Math.cos(angle), 
                    y: (H0 + H1) - (H11 + H12)*Math.cos(angle) - (W11 + 3*W12)*Math.sin(angle),
                },
            ]
        }

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }

        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H0, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x - W2, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H0, _secondPanelCoordinates[2].z);

        let secondPanelHoles = [];
        let _secondPanelHoleCoords = [];

        secondPanelHoles = [
            {x: -W21, y: H03}, 
            {x: -W21, y: H03 + H04},
            {x: -W21, y: H03 + H04 + H05},
            {x: -W21, y: H03 + H04 + H05 + H06},
            {x: -W21, y: H03 + H04 + H05 + H06 + H07},
        ];

        for(let h = 0; h < secondPanelHoles.length; h++) {
            let {x, y} = secondPanelHoles[h];

            if(x > 0 || y > 0) {
                let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
                _secondPanelHoleCoords.push(_newHoleCoord);
            }
        }

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        for(let i = 0; i < _secondPanelHoleCoords.length; i++) {
            secondPanelMeshBuilder.addHole(_secondPanelHoleCoords[i]);
        }

        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.parent = firstPanelMesh;
        secondPanelMesh.rotation.z = Math.PI/2;
        secondPanelMesh.position = new BABYLON.Vector3(0, -thickness, 0);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;

        if(direction === "RH") {
            secondPanelMesh.rotation.z = -Math.PI/2;
        }

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh], true, true, undefined, false, true);
        newMesh.name = name; 

        if(direction === "RH") {
            newMesh.rotation.z = -Math.PI;
        }

        return newMesh;
    },

    NSZRKP_DEC(name, direction, panel, holes, scene) {
        let { W0, W1, W2, H0, H1, angle, angle2, thickness = 10 } = panel;
        let { holeNum = 3, W01, W02, W11, W12, W21, H01, H02, H03, H04, H05, H06, H07, H08, H11, H12, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];

        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x, _firstPanelCoordinates[0].y + H0, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x + W1, _firstPanelCoordinates[1].y - W1*Math.tan(Math.PI - angle2), _firstPanelCoordinates[1].z);
        
        _firstPanelCoordinates[3] = new BABYLON.Vector3( _firstPanelCoordinates[2].x - H1*Math.sin(angle), _firstPanelCoordinates[2].y - H1*Math.cos(angle), _firstPanelCoordinates[2].z); 
        _firstPanelCoordinates[5] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[4] = new BABYLON.Vector3(
            _firstPanelCoordinates[5].x, 
            _firstPanelCoordinates[5].y + _firstPanelCoordinates[3].y + (_firstPanelCoordinates[3].x - W0)*Math.tan(angle), 
            _firstPanelCoordinates[5].z
        );

        let firstPanelHoles = [];

        firstPanelHoles = [
            {x: W01, y: H01}, 
            {x: W01, y: H01 + H02}, 
            {x: W01, y: H01 + 2*H02},
            {x: W01 + W02, y: H01}, 
            {x: W01 + W02, y: H01 + H02}, 
            {x: W01 + W02, y: H01 + 2*H02}
        ];

        if(holeNum === 4) {
            firstPanelHoles = [...firstPanelHoles, { x: W01, y: H01 + 3*H02 }, { x: W01 + W02, y: H01 + 3*H02 },]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 - H11*Math.sin(angle) - W11*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - H11*Math.cos(angle) + W11*Math.sin(angle), 
            },
            {
                x: W1 - H11*Math.sin(angle) - (W11 + W12)*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - H11*Math.cos(angle) + (W11 + W12)*Math.sin(angle), 
            },
            {
                x: W1 - H11*Math.sin(angle) - (W11 + 2*W12)*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - H11*Math.cos(angle) + (W11 + 2*W12)*Math.sin(angle), 
            },
        ];

        // holeNum: total holes on panel
        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 - H11*Math.sin(angle) - (W11 + 3*W12)*Math.cos(angle), 
                    y: (H0 - W1*Math.tan(Math.PI - angle2)) - H11*Math.cos(angle) + (W11 + 3*W12)*Math.sin(angle), 
                },
            ]
        }

        firstPanelHoles = [
            ...firstPanelHoles,
            {
                x: W1 - (H11 + H12)*Math.sin(angle) - W11*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + H12)*Math.cos(angle) + W11*Math.sin(angle), 
            },
            {
                x: W1 - (H11 + H12)*Math.sin(angle) - (W11 + W12)*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + H12)*Math.cos(angle) + (W11 + W12)*Math.sin(angle), 
            },
            {
                x: W1 - (H11 + H12)*Math.sin(angle) - (W11 + 2*W12)*Math.cos(angle), 
                y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + H12)*Math.cos(angle) + (W11 + 2*W12)*Math.sin(angle), 
            },
        ];

        if(holeNum === 4) {
            firstPanelHoles = [
                ...firstPanelHoles, 
                {
                    x: W1 - (H11 + H12)*Math.sin(angle) - (W11 + 3*W12)*Math.cos(angle), 
                    y: (H0 - W1*Math.tan(Math.PI - angle2)) - (H11 + H12)*Math.cos(angle) + (W11 + 3*W12)*Math.sin(angle), 
                },
            ]
        }

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }

        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H0, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x - W2, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H0, _secondPanelCoordinates[2].z);

        let secondPanelHoles = [];
        let _secondPanelHoleCoords = [];

        secondPanelHoles = [
            {x: -W21, y: H03}, 
            {x: -W21, y: H03 + H04},
            {x: -W21, y: H03 + H04 + H05},
            {x: -W21, y: H03 + H04 + H05 + H06},
            {x: -W21, y: H03 + H04 + H05 + H06 + H07},
            {x: -W21, y: H03 + H04 + H05 + H06 + H07 + H08},
        ];

        for(let h = 0; h < secondPanelHoles.length; h++) {
            let {x, y} = secondPanelHoles[h];

            if(x > 0 || y > 0) {
                let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
                _secondPanelHoleCoords.push(_newHoleCoord);
            }
        }

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        for(let i = 0; i < _secondPanelHoleCoords.length; i++) {
            secondPanelMeshBuilder.addHole(_secondPanelHoleCoords[i]);
        }

        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.parent = firstPanelMesh;
        secondPanelMesh.rotation.z = Math.PI/2;
        secondPanelMesh.position = new BABYLON.Vector3(0, -thickness, 0);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;

        if(direction === "RH") {
            secondPanelMesh.rotation.z = -Math.PI/2;
        }

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh], true, true, undefined, false, true);
        newMesh.name = name; 

        if(direction === "RH") {
            newMesh.rotation.z = -Math.PI;
        }

        return newMesh;
    },

    LDB(name, panel, holes, scene) {
        let { W0, W1, W2, H0, H1, angle, thickness } = panel;
        let { H01, H02, H03, H04, H05, H06, H07, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x, _firstPanelCoordinates[1].y + H0, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x - W0, _firstPanelCoordinates[2].y, _firstPanelCoordinates[2].z);

        let firstPanelHoles = [
            {x: W0/2, y: H01}, 
            {x: W0/2, y: H01 + H02}, 
            {x: W0/2, y: H01 + H02 + H03}, 
            {x: W0/2, y: H01 + H02 + H03 + H04}, 
            {x: W0/2, y: H01 + H02 + H03 + H04 + H05}, 
            {x: W0/2, y: H01 + H02 + H03 + H04 + H05 + H06},
            {x: W0/2, y: H01 + H02 + H03 + H04 + H05 + H06 + H07},

        ];

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x + W1, _secondPanelCoordinates[0].y, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x, _secondPanelCoordinates[1].y + H0, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x - W1, _secondPanelCoordinates[2].y, _secondPanelCoordinates[2].z);

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.position.x = W0;
        secondPanelMesh.position.y -= thickness;
        secondPanelMesh.rotation.z = angle;

        let _thirdPanelCoordinates = [];
        _thirdPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _thirdPanelCoordinates[1] = new BABYLON.Vector3(_thirdPanelCoordinates[0].x + W2, _thirdPanelCoordinates[0].y, _thirdPanelCoordinates[0].z);
        _thirdPanelCoordinates[2] = new BABYLON.Vector3(_thirdPanelCoordinates[1].x, _thirdPanelCoordinates[1].y + H0, _thirdPanelCoordinates[1].z);
        _thirdPanelCoordinates[3] = new BABYLON.Vector3(_thirdPanelCoordinates[2].x - W2, _thirdPanelCoordinates[2].y, _thirdPanelCoordinates[2].z);

        let thirdPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _thirdPanelCoordinates, scene, earcut);
        let thirdPanelMesh = thirdPanelMeshBuilder.build(true, thickness);
        thirdPanelMesh.position.x = W0;
        thirdPanelMesh.position.y = H1 - thickness;

        let fourthPanelMesh = secondPanelMesh.clone("fourth-panel");
        fourthPanelMesh.position.x = W0 + W2 - thickness;

        let fifthPanelMesh = firstPanelMesh.clone("fifth-panel");
        fifthPanelMesh.position.x = W0 + W2;
        
        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;
        thirdPanelMesh.material = mat;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh, thirdPanelMesh, fourthPanelMesh, fifthPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;
        newMesh.rotation.x = Math.PI/2;

        return newMesh;
    },
    LSB(name, direction = "LH", panel, holes, scene) {
        let { W0, H0, H1, angle1, angle2, thickness } = panel;
        let { W01, W02, W03, W04, H01, H11, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3( _firstPanelCoordinates[1].x, _firstPanelCoordinates[1].y + H0, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x - W0, _firstPanelCoordinates[2].y, _firstPanelCoordinates[2].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            ...firstPanelHoles,
            {x: W01, y: H0 - H01},
            {x: W01 + W02, y: H0 - H01},
            {x: W01 + 2*W02, y: H0 - H01},
            {x: W01 + 3*W02, y: H0 - H01},
        ];

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x + W0, _secondPanelCoordinates[0].y, _secondPanelCoordinates[0].z);
        if(direction === "LH") {
            _secondPanelCoordinates[2] = new BABYLON.Vector3(
                _secondPanelCoordinates[1].x - H1*Math.tan(angle2 - Math.PI/2), 
                _secondPanelCoordinates[1].y + H1, 
                _secondPanelCoordinates[1].z
            );
        } else {
            _secondPanelCoordinates[2] = new BABYLON.Vector3(
                _secondPanelCoordinates[1].x + H1*Math.tan(angle2 - Math.PI/2), 
                _secondPanelCoordinates[1].y + H1, 
                _secondPanelCoordinates[1].z
            );
        }
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x - W0, _secondPanelCoordinates[2].y, _secondPanelCoordinates[2].z);

        let secondPanelHoles = [];

        if(direction === "LH") {
            secondPanelHoles = [
                ...secondPanelHoles,
                {x: W03 - H1*Math.tan(angle2 - Math.PI/2), y: H11},
                {x: W03 + W04 - H1*Math.tan(angle2 - Math.PI/2), y: H11},
                {x: W03 + 2*W04 - H1*Math.tan(angle2 - Math.PI/2), y: H11},
                {x: W03 + 3*W04 - H1*Math.tan(angle2 - Math.PI/2), y: H11},
            ];
        } else {
            secondPanelHoles = [
                ...secondPanelHoles,
                {x: W03 , y: H11},
                {x: W03 + W04, y: H11},
                {x: W03 + 2*W04, y: H11},
                {x: W03 + 3*W04, y: H11},
            ];
        }

        let _secondPanelHoleCoords = [];

        for(let h = 0; h < secondPanelHoles.length; h++) {
            let {x, y} = secondPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _secondPanelHoleCoords.push(_newHoleCoord);
        }

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        for(let i = 0; i < _secondPanelHoleCoords.length; i++) {
            secondPanelMeshBuilder.addHole(_secondPanelHoleCoords[i]);
        }      
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.rotation.x = angle1;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;

        return newMesh;
    },
    LSB2(name, direction = "LH", panel, holes, scene) {
        let { W0, H0, H1, angle1, angle2, thickness } = panel;
        let { W01, W02, W03, W04, H01, H11, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];
        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3( _firstPanelCoordinates[1].x, _firstPanelCoordinates[1].y + H0, _firstPanelCoordinates[1].z);
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x - W0, _firstPanelCoordinates[2].y, _firstPanelCoordinates[2].z);

        let firstPanelHoles = [];

        firstPanelHoles = [
            ...firstPanelHoles,
            {x: W01, y: H0 - H01},
            {x: W01 + W02, y: H0 - H01},
            {x: W01 + 2*W02, y: H0 - H01},
            {x: W01 + 3*W02, y: H0 - H01},
        ];

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x + W0, _secondPanelCoordinates[0].y, _secondPanelCoordinates[0].z);
        if(direction === "LH") {
            _secondPanelCoordinates[2] = new BABYLON.Vector3(
                _secondPanelCoordinates[1].x + H1*Math.tan(angle2 - Math.PI/2), 
                _secondPanelCoordinates[1].y + H1, 
                _secondPanelCoordinates[1].z
            );
        } else {
            _secondPanelCoordinates[2] = new BABYLON.Vector3(
                _secondPanelCoordinates[1].x - H1*Math.tan(angle2 - Math.PI/2), 
                _secondPanelCoordinates[1].y + H1, 
                _secondPanelCoordinates[1].z
            );
        }
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x - W0, _secondPanelCoordinates[2].y, _secondPanelCoordinates[2].z);

        let secondPanelHoles = [];

        if(direction === "LH") {
            secondPanelHoles = [
                {x: W03 , y: H11},
                {x: W03 + W04, y: H11},
                {x: W03 + 2*W04, y: H11},
                {x: W03 + 3*W04, y: H11},
            ];
        } else {
            secondPanelHoles = [
                {x: W03 - H1*Math.tan(angle2 - Math.PI/2), y: H11},
                {x: W03 + W04 - H1*Math.tan(angle2 - Math.PI/2), y: H11},
                {x: W03 + 2*W04 - H1*Math.tan(angle2 - Math.PI/2), y: H11},
                {x: W03 + 3*W04 - H1*Math.tan(angle2 - Math.PI/2), y: H11},
            ];
        }

        let _secondPanelHoleCoords = [];

        for(let h = 0; h < secondPanelHoles.length; h++) {
            let {x, y} = secondPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _secondPanelHoleCoords.push(_newHoleCoord);
        }

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);
        for(let i = 0; i < _secondPanelHoleCoords.length; i++) {
            secondPanelMeshBuilder.addHole(_secondPanelHoleCoords[i]);
        }      
        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);
        secondPanelMesh.rotation.x = angle1;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;

        return newMesh;
    },
    CPLKB(name, panel, holes, scene) {
        let { W0, W1, W2, H0, H1, H2, angle, thickness = 10 } = panel;
        let { W01, W02, W03, H01, H02, H03, radiusX, radiusY } = holes;

        let _firstPanelCoordinates = [];

        _firstPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _firstPanelCoordinates[1] = new BABYLON.Vector3(_firstPanelCoordinates[0].x, _firstPanelCoordinates[0].y + H0, _firstPanelCoordinates[0].z);
        _firstPanelCoordinates[2] = new BABYLON.Vector3(_firstPanelCoordinates[1].x + W0, _firstPanelCoordinates[1].y, _firstPanelCoordinates[1].z);
        
        _firstPanelCoordinates[3] = new BABYLON.Vector3(_firstPanelCoordinates[2].x, _firstPanelCoordinates[2].y + (H1 - H0), _firstPanelCoordinates[2].z); 
        _firstPanelCoordinates[4] = new BABYLON.Vector3(_firstPanelCoordinates[3].x + (W1 - W0), _firstPanelCoordinates[3].y, _firstPanelCoordinates[3].z);
        _firstPanelCoordinates[5] = new BABYLON.Vector3(_firstPanelCoordinates[4].x, _firstPanelCoordinates[4].y - (H1 - H0), _firstPanelCoordinates[4].z);
        _firstPanelCoordinates[6] = new BABYLON.Vector3(_firstPanelCoordinates[0].x + W0, _firstPanelCoordinates[0].y, _firstPanelCoordinates[0].z);

        let firstPanelHoles = [
            {x: W01, y: H01}, 
            {x: W01, y: H01 + H02}, 
            {x: W01, y: H01 + 2*H02},
            {x: W01, y: H01 + 3*H02},
            {x: W01, y: H01 + 4*H02},
        ];

        firstPanelHoles = [
            ...firstPanelHoles,
            {x: W0 + W02, y: H1 - H03}, 
            {x: W0 + W02 + W03, y: H1 - H03}, 
            {x: W0 + W02 + 2*W03, y: H1 - H03}, 
            {x: W0 + W02 + 3*W03, y: H1 - H03}, 
            {x: W0 + W02 + 4*W03, y: H1 - H03}, 
        ];

        let _firstPanelHoleCoords = [];

        for(let h = 0; h < firstPanelHoles.length; h++) {
            let {x, y} = firstPanelHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusX, radiusY);
            _firstPanelHoleCoords.push(_newHoleCoord);
        }

        let firstPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _firstPanelCoordinates, scene, earcut);
        for(let i = 0; i < _firstPanelHoleCoords.length; i++) {
            firstPanelMeshBuilder.addHole(_firstPanelHoleCoords[i]);
        }
        let firstPanelMesh = firstPanelMeshBuilder.build(true, thickness);

        let _secondPanelCoordinates = [];
        _secondPanelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _secondPanelCoordinates[1] = new BABYLON.Vector3(_secondPanelCoordinates[0].x, _secondPanelCoordinates[0].y + H2, _secondPanelCoordinates[0].z);
        _secondPanelCoordinates[2] = new BABYLON.Vector3(_secondPanelCoordinates[1].x - W2, _secondPanelCoordinates[1].y, _secondPanelCoordinates[1].z);
        _secondPanelCoordinates[3] = new BABYLON.Vector3(_secondPanelCoordinates[2].x, _secondPanelCoordinates[2].y - H2, _secondPanelCoordinates[2].z);

        let secondPanelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _secondPanelCoordinates, scene, earcut);

        let secondPanelMesh = secondPanelMeshBuilder.build(true, thickness);

        let v1 = _firstPanelCoordinates[5].subtract(_firstPanelCoordinates[6]);
        v1.normalize();

        let angle2 = BABYLON.Vector3.Dot(v1, BABYLON.Axis.X);
        angle2 = Math.acos(angle2);

        secondPanelMesh.position.x += W0;
        secondPanelMesh.rotation.z = Math.PI/2;
        secondPanelMesh.rotation.y = angle2;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let mat2 = mat.clone();
        mat2.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        let mat3 = mat.clone();
        mat3.diffuseColor = new BABYLON.Color3.FromHexString("#A4A4A4");

        firstPanelMesh.material = mat;
        secondPanelMesh.material = mat2;

        let newMesh = BABYLON.Mesh.MergeMeshes([firstPanelMesh, secondPanelMesh], true, true, undefined, false, true);
        newMesh.name = name;

        return newMesh;
    },
}

export default BracketLibrary;