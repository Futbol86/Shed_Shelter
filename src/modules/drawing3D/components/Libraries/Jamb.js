import * as BABYLON from "babylonjs";
import earcut from "earcut";

function createVec3Arc({_xCenter, _yCenter, _radiusX, _radiusY, _fromAngle, _toAngle}) {
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

function createVec2Arc({_xCenter, _yCenter, _radiusX, _radiusY, _fromAngle, _toAngle}) {
    let _ellipsePoints = [];

    if(_fromAngle <= _toAngle) {
        for(let theta = _fromAngle; theta <= _toAngle; theta += Math.PI/10) {
            let x = _xCenter + _radiusX*Math.cos(theta);
            let y = _yCenter + _radiusY*Math.sin(theta);

            _ellipsePoints.push(new BABYLON.Vector2(x, y));
        }
    } else {
        for(let theta = _fromAngle; theta >= _toAngle; theta -= Math.PI/10) {
            let x = _xCenter + _radiusX*Math.cos(theta);
            let y = _yCenter + _radiusY*Math.sin(theta);

            _ellipsePoints.push(new BABYLON.Vector2(x, y));
        }
    }

    return _ellipsePoints;
}

let JambLibrary = {
    BasicJamb(name, options, scene) {
        let {width, length, height, rotation, color = "#6D6D6F"} = options;

        let boottomCoordinates = [], topCoordinates = [];
        let positions = [], indices = [], colors = [], normals = [];

        boottomCoordinates = [
            new BABYLON.Vector3(0, 0, 0),   
            new BABYLON.Vector3(width, 0, 0),
            new BABYLON.Vector3(width, length, 0),      
            new BABYLON.Vector3(0,  length, 0),
        ];

        for(let i = 0; i < boottomCoordinates.length; i++) {
            topCoordinates.push(new BABYLON.Vector3(boottomCoordinates[i].x, boottomCoordinates[i].y, boottomCoordinates[i].z + height))
        }
     
        for(let i = 0; i < boottomCoordinates.length; i++) {
            positions.push(boottomCoordinates[i].x, boottomCoordinates[i].y, boottomCoordinates[i].z)
        }

        for(let i = 0; i < topCoordinates.length; i++) {
            positions.push(topCoordinates[i].x, topCoordinates[i].y, topCoordinates[i].z)
        }

        // base
        indices.push(0, 1, 2, 0, 2, 3);

        // top
        indices.push(4, 5, 6, 4, 6, 7);

        // left
        indices.push(0, 3, 7, 0, 4, 7);

        // right
        indices.push(1, 6, 2, 1, 5, 6);

        // front
        indices.push(0, 5, 1, 0, 4, 5);

        // back
        indices.push(3, 6, 2, 3, 7, 6);

        for(let i = 0; i < positions.length; i += 3) {
            colors.push(
                (Math.floor(Math.random() * (208 - 174)) + 174)/255, 
                (Math.floor(Math.random() * (208 - 174)) + 174)/255, 
                (Math.floor(Math.random() * (208 - 174)) + 174)/255,
                1
            )
        }

        let mesh = new BABYLON.Mesh(name, scene);
        let vertexData = new BABYLON.VertexData();
        BABYLON.VertexData.ComputeNormals(positions, indices, normals, colors);
        BABYLON.VertexData._ComputeSides(BABYLON.Mesh.FRONTSIDE, positions, indices, normals);

        vertexData.positions = positions;
        vertexData.indices = indices;
        vertexData.normals = normals;
        vertexData.colors = colors;

        vertexData.applyToMesh(mesh);
        mesh.rotation = {x: rotation.x, y: rotation.y, z: rotation.z};

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString(color);
        mat.backFaceCulling = false;
        mesh.material = mat;
        
        return mesh;
    },
    ExtrudeBoxJamb(name, params, scene) {
        let {width, length, thickness, outerColor="#436D9E", innerColor="#539AEC"} = params;
        let innerScaling = (width - thickness)/width;
        let _outerCoordinates = [];

        _outerCoordinates = [
            new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(width, 0, 0), new BABYLON.Vector3(width, width, 0), new BABYLON.Vector3(0, width, 0)
        ];

        let outerMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _outerCoordinates, scene, earcut);
        let outerMesh = outerMeshBuilder.build(true, length);
        let innerMesh = outerMesh.clone();

        innerMesh.scaling = new BABYLON.Vector3(innerScaling, 1, innerScaling);
        innerMesh.position = new BABYLON.Vector3(thickness/2, 0, thickness/2);

        let outerMat = new BABYLON.StandardMaterial("mat", scene);
        outerMat.diffuseColor = new BABYLON.Color3.FromHexString(outerColor);
        outerMat.backFaceCulling = false;

        let innerMat = outerMat.clone();
        innerMat.diffuseColor = new BABYLON.Color3.FromHexString(innerColor); 

        let multiMat = new BABYLON.MultiMaterial("multiMat", scene);
        multiMat.subMaterials.push(outerMat, innerMat);

        let outerMeshCSG = BABYLON.CSG.FromMesh(outerMesh);
        let innerMeshCSG = BABYLON.CSG.FromMesh(innerMesh);
        
        var newMeshCSG = outerMeshCSG.subtract(innerMeshCSG);
        let newMesh = newMeshCSG.toMesh(name, multiMat, scene, true);

        outerMesh.dispose();
        innerMesh.dispose();

        return newMesh;
    },
    ExtrudeBoxJamb2(name, params, scene) {
        let {width, length, thickness, R, outerColor="#436D9E", innerColor="#539AEC"} = params;
        let _outerCoordinates = [];

        let _firstArcCoordinates  = createVec3Arc({_xCenter: R, _yCenter: R, _radiusX: R, _radiusY: R, _fromAngle: Math.PI, _toAngle: Math.PI + Math.PI/2});
        let _secondArcCoordinates = createVec3Arc({_xCenter: width - R, _yCenter: R, _radiusX: R, _radiusY: R, _fromAngle: -Math.PI/2, _toAngle: 0});
        let _thirdArcCoordinates  = createVec3Arc({_xCenter: width - R, _yCenter: width - R, _radiusX: R, _radiusY: R, _fromAngle: 0, _toAngle: Math.PI/2});
        let _fourthArcCoordinates = createVec3Arc({_xCenter: R, _yCenter: width - R, _radiusX: R, _radiusY: R, _fromAngle: Math.PI/2, _toAngle: Math.PI});

        _outerCoordinates = [
            ..._firstArcCoordinates, 
            ..._secondArcCoordinates,  
            ..._thirdArcCoordinates, 
            ..._fourthArcCoordinates, 
        ]

        let panelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _outerCoordinates, scene, earcut);

        let _panelHoles = [
            [
                ...createVec2Arc({_xCenter: R, _yCenter: R, _radiusX: R - thickness, _radiusY: R - thickness, _fromAngle: Math.PI, _toAngle: Math.PI + Math.PI/2}),
                ...createVec2Arc({_xCenter: width - R, _yCenter: R, _radiusX: R - thickness, _radiusY: R - thickness, _fromAngle: -Math.PI/2, _toAngle: 0}),
                ...createVec2Arc({_xCenter: width - R, _yCenter: width - R, _radiusX: R - thickness, _radiusY: R - thickness, _fromAngle: 0, _toAngle: Math.PI/2}),
                ...createVec2Arc({_xCenter: R, _yCenter: width - R, _radiusX: R - thickness, _radiusY: R - thickness, _fromAngle: Math.PI/2, _toAngle: Math.PI}),
            ],
        ];

        for(let i = 0; i < _panelHoles.length; i++) {
            panelMeshBuilder.addHole(_panelHoles[i]);
        }

        let newMesh = panelMeshBuilder.build(true, length);

        // create outer edge for mesh
        let x0_outer = R - R*Math.cos(Math.PI/4);
        let y0_outer = R - R*Math.sin(Math.PI/4);

        let x1_outer = (width - R) + R*Math.cos(Math.PI/4);
        let y1_outer = R - R*Math.sin(Math.PI/4);
        
        let x2_outer = (width - R) + R*Math.cos(Math.PI/4);
        let y2_outer = (width - R) + R*Math.sin(Math.PI/4);

        let x3_outer = R - R*Math.cos(Math.PI/4);
        let y3_outer = (width - R) + R*Math.sin(Math.PI/4);

        const line0_outer = BABYLON.MeshBuilder.CreateLines("line0_outer", {points: [new BABYLON.Vector3(x0_outer, 0, y0_outer), new BABYLON.Vector3(x0_outer, -length, y0_outer)]}, scene);
        const line1_outer = BABYLON.MeshBuilder.CreateLines("line1_outer", {points: [new BABYLON.Vector3(x1_outer, 0, y1_outer), new BABYLON.Vector3(x1_outer, -length, y1_outer)]}, scene);
        const line2_outer = BABYLON.MeshBuilder.CreateLines("line2_outer", {points: [new BABYLON.Vector3(x2_outer, 0, y2_outer), new BABYLON.Vector3(x2_outer, -length, y2_outer)]}, scene);
        const line3_outer = BABYLON.MeshBuilder.CreateLines("line3_outer", {points: [new BABYLON.Vector3(x3_outer, 0, y3_outer), new BABYLON.Vector3(x3_outer, -length, y3_outer)]}, scene);
        
        let line_outers = [line0_outer, line1_outer, line2_outer, line3_outer];

        // create inner edge for mesh
        let x0_inner = R - (R - thickness)*Math.cos(Math.PI/4);
        let y0_inner = R - (R - thickness)*Math.sin(Math.PI/4);

        let x1_inner  = (width - R) + (R - thickness)*Math.cos(Math.PI/4);
        let y1_inner  = R - (R - thickness)*Math.sin(Math.PI/4);
        
        let x2_inner  = (width - R) + (R - thickness)*Math.cos(Math.PI/4);
        let y2_inner  = (width - R) + (R - thickness)*Math.sin(Math.PI/4);

        let x3_inner  = R - (R - thickness)*Math.cos(Math.PI/4);
        let y3_inner  = (width - R) + (R - thickness)*Math.sin(Math.PI/4);

        const line0_inner = BABYLON.MeshBuilder.CreateLines("line0_inner", {points: [new BABYLON.Vector3(x0_inner, 0, y0_inner), new BABYLON.Vector3(x0_inner, -length, y0_inner)]}, scene);
        const line1_inner  = BABYLON.MeshBuilder.CreateLines("line1", {points: [new BABYLON.Vector3(x1_inner , 0, y1_inner ), new BABYLON.Vector3(x1_inner , -length, y1_inner )]}, scene);
        const line2_inner  = BABYLON.MeshBuilder.CreateLines("line2", {points: [new BABYLON.Vector3(x2_inner , 0, y2_inner ), new BABYLON.Vector3(x2_inner , -length, y2_inner )]}, scene);
        const line3_inner  = BABYLON.MeshBuilder.CreateLines("line3", {points: [new BABYLON.Vector3(x3_inner , 0, y3_inner ), new BABYLON.Vector3(x3_inner , -length, y3_inner )]}, scene);

        let line_inners = [line0_inner, line1_inner, line2_inner, line3_inner];

        let hiddenMat = new BABYLON.StandardMaterial("hidden-mat");
        hiddenMat.backFaceCulling = false;
        hiddenMat.alpha = 0;

        [...line_outers, ...line_inners].map(item => {
            item.material = hiddenMat;
            item.parent = newMesh;
        });

        return newMesh;
    }
}

export default JambLibrary;