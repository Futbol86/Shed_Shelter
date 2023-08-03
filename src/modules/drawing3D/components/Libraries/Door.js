import * as BABYLON from "babylonjs";
import earcut from "earcut";
import BargeCappingLibrary from "./BargeCapping";

function createCircle(_xCenterCircle, _yCenterCircle, radius) {
    let step = 2*Math.PI/20;
    let _circlePoints = [];
    for(let theta = 0; theta < 2*Math.PI; theta += step) {
        let xCircle = _xCenterCircle + radius*Math.cos(theta);
        let yCircle = _yCenterCircle + radius*Math.sin(theta);

        _circlePoints.push(new BABYLON.Vector2(xCircle, yCircle));
    }

    return _circlePoints;
}

function MainAccessDoor(options, scene) {
    let {width, height, thickness, knobRadius} = options;

    let corners = [
        new BABYLON.Vector3(0, height, 0),
        new BABYLON.Vector3(0, 0, 0),
        new BABYLON.Vector3(width, 0, 0),
        new BABYLON.Vector3(width, height, 0),
    ];

    let circlePoints = [];

    let newCirclePoints = createCircle(0.9*width, 0.52*height, knobRadius);
    circlePoints.push(newCirclePoints);

    let polyTri = new BABYLON.PolygonMeshBuilder("main-access-door-mesh", corners, scene, earcut);
    for(let i = 0; i < circlePoints.length; i++) {
        polyTri.addHole(circlePoints[i]);
    }

    let polygon = polyTri.build(null, thickness);

    let mat = new BABYLON.StandardMaterial("mat", scene);
    mat.diffuseColor = new BABYLON.Color3.FromHexString("#C6C6C6");
    polygon.material = mat;

    return polygon;
}

function MainDoublePADoor(options, scene) {
    let {width, height, thickness, knobRadius} = options;
    let offset = 1.5;

    let corners = [
        new BABYLON.Vector3(0 + offset, height - offset, 0),
        new BABYLON.Vector3(offset, offset, 0),
        new BABYLON.Vector3(width/2 - offset, offset, 0),
        new BABYLON.Vector3(width/2 - offset, height - offset, 0),
    ];

    let circlePoints = [];

    let newCirclePoints = createCircle(0.2*width/2, 0.52*height, knobRadius);
    circlePoints.push(newCirclePoints);

    let leftDoorMeshBuilder = new BABYLON.PolygonMeshBuilder("left-main-door-mesh", corners, scene, earcut);
    let leftDoorMesh = leftDoorMeshBuilder.build(null, thickness);

    let rightDoorMeshBuilder = new BABYLON.PolygonMeshBuilder("right-main-door-mesh", corners, scene, earcut);
    for(let i = 0; i < circlePoints.length; i++) {
        rightDoorMeshBuilder.addHole(circlePoints[i]);
    }
    let rightDoorMesh = rightDoorMeshBuilder.build(null, thickness);
    rightDoorMesh.position.x += width/2;

    let mergedMesh = BABYLON.Mesh.MergeMeshes([leftDoorMesh, rightDoorMesh], true, true, undefined, true);
    return mergedMesh;
}

let DoorLibrary = {
    DoorJamb(name, options, scene) {
        let {width, length, height, color = "#6D6D6F"} = options;

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

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString(color);
        mat.backFaceCulling = false;
        mesh.material = mat;
        
        return mesh;
    },
    AccessDoor(name, params, scene) {
        let {width, height, W1, W2, thickness, innerColor="#A5A08C", sideRailColor="#003C5F", topRailColor="#003C5F", rotation} = params;
        let knobRadius = width/20;
        let meshes = [];
        let sphereDiameter = 2.5*knobRadius;
        let cylinderHeight = 2*knobRadius;

        let accessDoorMesh = MainAccessDoor({width, height, thickness: 4, knobRadius}, scene);
        accessDoorMesh.position = new BABYLON.Vector3(W1, thickness, 0);

        let topHingeMesh = new BABYLON.MeshBuilder.CreateCapsule("top-hinge", {
            subdivisions: 20, height: height/10, radius: width/40
        }, scene);
        topHingeMesh.rotation.x = Math.PI/2;
        topHingeMesh.position = new BABYLON.Vector3(W1, 0, 0.88*height);

        let bottomHingeMesh = new BABYLON.MeshBuilder.CreateCapsule("bottom-hinge", {
            subdivisions: 20, height: height/10, radius: width/40
        }, scene);
        bottomHingeMesh.rotation.x = Math.PI/2;
        bottomHingeMesh.position = new BABYLON.Vector3(W1, 0, 0.12*height);

        let knobSphereMesh = BABYLON.MeshBuilder.CreateSphere("sphere", {
            diameterX: sphereDiameter, diameterY: sphereDiameter, diameterZ: sphereDiameter/2.5
        }, scene);
        knobSphereMesh.parent = accessDoorMesh;
        knobSphereMesh.position = new BABYLON.Vector3(0.9*width, -2*knobRadius, 0.52*height);
        knobSphereMesh.rotation.x = Math.PI/2;     

        let knobCylinderMesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {
            height: cylinderHeight, diameter: 2*knobRadius
        }, scene);
        knobCylinderMesh.position = new BABYLON.Vector3(0, 0, -cylinderHeight/2);
        knobCylinderMesh.rotation.x = Math.PI/2;
        knobCylinderMesh.parent = knobSphereMesh;

        let newLeftRailMesh = BargeCappingLibrary.StandardBargeCapping("left-rail", {
            W1: W2, W2: W1, length: height, thickness, angle: Math.PI/2, 
            rotation: {x: 0, y: 0, z: 0}, color: sideRailColor
        }, scene);  
        newLeftRailMesh.rotation.z = Math.PI/2;
        newLeftRailMesh.position = new BABYLON.Vector3(W1, 0, 0);

        let newRightRailMesh = BargeCappingLibrary.StandardBargeCapping("right-rail", {
            W1, W2, length: height, thickness, angle: Math.PI/2, 
            rotation: {x: 0, y: 0, z: 0}, color: sideRailColor
        }, scene);  
        newRightRailMesh.position = new BABYLON.Vector3(width + W1, thickness, 0);

        let newTopRailMesh = BargeCappingLibrary.StandardBargeCapping("top-rail", {
            W1, W2, length: width + 2*W1, thickness, angle: Math.PI/2, 
            rotation: {x: 0, y: 0, z: 0}, color: topRailColor
        }, scene);
        newTopRailMesh.position = new BABYLON.Vector3(0, thickness, height + W1);
        newTopRailMesh.rotation.y = Math.PI/2;

        meshes = [
            accessDoorMesh, newLeftRailMesh, newRightRailMesh, newTopRailMesh, 
            topHingeMesh, bottomHingeMesh, knobSphereMesh, knobCylinderMesh
        ];

        let newMesh = BABYLON.Mesh.MergeMeshes(meshes, true, true, undefined, true);
        newMesh.name = name;
 
        if(rotation) {
            newMesh.rotation = {x: rotation.x, y: rotation.y, z: rotation.z};
        }

        // Material
        let accessDoorMat           = new BABYLON.StandardMaterial("access-door-mat", scene);
        accessDoorMat.diffuseColor  = new BABYLON.Color3.FromHexString(innerColor);

        let sideRailMat             = new BABYLON.StandardMaterial("side-rail-mat", scene);
        sideRailMat.diffuseColor    = new BABYLON.Color3.FromHexString(sideRailColor);

        let topRailMat              = new BABYLON.StandardMaterial("top-rail-mat", scene);
        topRailMat.diffuseColor     = new BABYLON.Color3.FromHexString(topRailColor);

        let hingeMat                = new BABYLON.StandardMaterial("hinge-mat", scene);
        hingeMat.diffuseColor       = new BABYLON.Color3.FromHexString("#696969");

        let knobMat                 = new BABYLON.StandardMaterial("knob-mat", scene);
        knobMat.diffuseColor        = new BABYLON.Color3.FromHexString("#795548");

        let multiMat          = new BABYLON.MultiMaterial('multi', scene);
        multiMat.subMaterials = [accessDoorMat, sideRailMat, sideRailMat, topRailMat, hingeMat, hingeMat, knobMat, knobMat];
        
        newMesh.material = multiMat;

        for(let i = 0; i < newMesh.subMeshes.length; i++) {
            newMesh.subMeshes[i].materialIndex = i;
        }

        return newMesh;
    },
    AccessDoublePADoor(name, params, scene) {
        let {width, height, W1, W2, thickness, innerColor="#A5A08C", sideRailColor="#003C5F", topRailColor="#003C5F", rotation} = params;
        let knobRadius = width/20;
        let sphereDiameter = 2.5*knobRadius;
        let cylinderHeight = 2*knobRadius;

        let accessDoorMesh = MainDoublePADoor({width, height, thickness: 4, knobRadius}, scene);
        accessDoorMesh.position = new BABYLON.Vector3(W1, thickness, 0);

        let leftTopHingeMesh = new BABYLON.MeshBuilder.CreateCapsule("top-hinge", {
            subdivisions: 20, height: height/10, radius: width/40
        }, scene);
        leftTopHingeMesh.rotation.x = Math.PI/2;
        leftTopHingeMesh.position = new BABYLON.Vector3(W1, 0, 0.88*height);

        let rightTopHingeMesh = leftTopHingeMesh.clone();
        rightTopHingeMesh.position = new BABYLON.Vector3(width + W1, 0, 0.88*height);

        let leftBottomHingeMesh = new BABYLON.MeshBuilder.CreateCapsule("bottom-hinge", {
            subdivisions: 20, height: height/10, radius: width/40
        }, scene);
        leftBottomHingeMesh.rotation.x = Math.PI/2;
        leftBottomHingeMesh.position = new BABYLON.Vector3(W1, 0, 0.12*height);

        let rightBottomHingeMesh = leftBottomHingeMesh.clone();
        rightBottomHingeMesh.position = new BABYLON.Vector3(width + W1, 0, 0.12*height);

        let knobSphereMesh = BABYLON.MeshBuilder.CreateSphere("sphere", {
            diameterX: sphereDiameter, diameterY: sphereDiameter, diameterZ: sphereDiameter/2.5
        }, scene);
        knobSphereMesh.parent = accessDoorMesh;
        knobSphereMesh.position = new BABYLON.Vector3(0.6*width, -2*knobRadius, 0.52*height);
        knobSphereMesh.rotation.x = Math.PI/2;     

        let knobCylinderMesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {
            height: cylinderHeight, diameter: 2*knobRadius
        }, scene);
        knobCylinderMesh.position = new BABYLON.Vector3(0, 0, -cylinderHeight/2);
        knobCylinderMesh.rotation.x = Math.PI/2;
        knobCylinderMesh.parent = knobSphereMesh;

        let newLeftRailMesh = BargeCappingLibrary.StandardBargeCapping("left-rail", {
            W1: W2, W2: W1, length: height, thickness, angle: Math.PI/2, 
            rotation: {x: 0, y: 0, z: 0}, color: sideRailColor
        }, scene);  
        newLeftRailMesh.rotation.z = Math.PI/2;
        newLeftRailMesh.position = new BABYLON.Vector3(W1, 0, 0);

        let newRightRailMesh = BargeCappingLibrary.StandardBargeCapping("right-rail",{
            W1, W2, length: height, thickness, angle: Math.PI/2, 
            rotation: {x: 0, y: 0, z: 0}, color: sideRailColor
        }, scene);  
        newRightRailMesh.position = new BABYLON.Vector3(width + W1, thickness, 0);

        let newTopRailMesh = BargeCappingLibrary.StandardBargeCapping("top-rail",{
            W1, W2, length: width + 2*W1, thickness, angle: Math.PI/2, 
            rotation: {x: 0, y: 0, z: 0}, color: topRailColor
        }, scene);
        newTopRailMesh.position = new BABYLON.Vector3(0, thickness, height + W1);
        newTopRailMesh.rotation.y = Math.PI/2;

        let meshes = [
            accessDoorMesh, newLeftRailMesh, newRightRailMesh, newTopRailMesh, 
            leftTopHingeMesh, rightTopHingeMesh, leftBottomHingeMesh, rightBottomHingeMesh, knobSphereMesh, knobCylinderMesh
        ];
        
        let newMesh = BABYLON.Mesh.MergeMeshes(meshes, true, true, undefined, true);
        newMesh.name = name;
 
        if(rotation) {
            newMesh.rotation = {x: rotation.x, y: rotation.y, z: rotation.z};
        }

        // Material
        let accessDoorMat           = new BABYLON.StandardMaterial("access-door-mat", scene);
        accessDoorMat.diffuseColor  = new BABYLON.Color3.FromHexString(innerColor);

        let sideRailMat             = new BABYLON.StandardMaterial("side-rail-mat", scene);
        sideRailMat.diffuseColor    = new BABYLON.Color3.FromHexString(sideRailColor);

        let topRailMat              = new BABYLON.StandardMaterial("top-rail-mat", scene);
        topRailMat.diffuseColor     = new BABYLON.Color3.FromHexString(topRailColor);

        let hingeMat                = new BABYLON.StandardMaterial("hinge-mat", scene);
        hingeMat.diffuseColor       = new BABYLON.Color3.FromHexString("#696969");

        let knobMat                 = new BABYLON.StandardMaterial("knob-mat", scene);
        knobMat.diffuseColor        = new BABYLON.Color3.FromHexString("#795548");

        let multiMat = new BABYLON.MultiMaterial('multi', scene);
        multiMat.subMaterials= [
            accessDoorMat, sideRailMat, sideRailMat, topRailMat, hingeMat, hingeMat, hingeMat, hingeMat, knobMat, knobMat
        ];
        
        newMesh.material = multiMat;

        for(let i = 0; i < newMesh.subMeshes.length; i++) {
            newMesh.subMeshes[i].materialIndex = i;
        }

        return newMesh;
    },
    RollerDoor(name, params, scene) {
        let {width, height, W1, W2, W3, thickness, rotation, sideRailColor = "#003C5F", topRailColor = "#003C5F", hasRollerDoor = true} = params;
        let meshes = [];

        // if(hasRollerDoor) {
            let _rollerDoorCoordinates = [];

            _rollerDoorCoordinates[0] = new BABYLON.Vector3(W1, 0, 0);
            _rollerDoorCoordinates[1] = new BABYLON.Vector3(_rollerDoorCoordinates[0].x + width, _rollerDoorCoordinates[0].y, _rollerDoorCoordinates[0].z);
            _rollerDoorCoordinates[2] = new BABYLON.Vector3(_rollerDoorCoordinates[1].x, _rollerDoorCoordinates[1].y + height, _rollerDoorCoordinates[1].z);
            _rollerDoorCoordinates[3] = new BABYLON.Vector3(_rollerDoorCoordinates[2].x - width, _rollerDoorCoordinates[2].y, _rollerDoorCoordinates[2].z);

            const HOLE_WIDTH = width/5, HOLE_HIGHT = height/40, HOLE_HIGHT_OFFSET = height/10;

            let holePoints = [
                {x: (width - HOLE_WIDTH)/2 + W1, y: (height - HOLE_HIGHT)/2 - HOLE_HIGHT_OFFSET}, 
                {x: (width - HOLE_WIDTH)/2 + HOLE_WIDTH + W1, y: (height - HOLE_HIGHT)/2 - HOLE_HIGHT_OFFSET}, 
                {x: (width - HOLE_WIDTH)/2 + HOLE_WIDTH + W1, y: (height - HOLE_HIGHT)/2 + HOLE_HIGHT - HOLE_HIGHT_OFFSET}, 
                {x: (width - HOLE_WIDTH)/2 + W1, y: (height - HOLE_HIGHT)/2 + HOLE_HIGHT - HOLE_HIGHT_OFFSET}
            ];

            let rollerDoorMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _rollerDoorCoordinates, scene, earcut);
            rollerDoorMeshBuilder.addHole(holePoints);
            let newRollerDoorlMesh = rollerDoorMeshBuilder.build(true, thickness);
            newRollerDoorlMesh.position = new BABYLON.Vector3(0, W2, 0);

            let winchDiameter = height/10;
            let winchMesh = BABYLON.MeshBuilder.CreateCylinder("winch", {diameter: winchDiameter, height: width}, scene);
            winchMesh.rotation.z = Math.PI/2;
            winchMesh.position = new BABYLON.Vector3(width/2 + W1, winchDiameter/2, height);
            winchMesh.parent = newRollerDoorlMesh;

            meshes = [...meshes, newRollerDoorlMesh, winchMesh];
        // }

        let newLeftRailMesh = BargeCappingLibrary.ThreePanelBargeCapping("left-rail",{W1: W3, W2, W3: W1, length: height, thickness, angle: Math.PI/2, rotation: {x: 0, y: 0, z: 0}, color: "#003C5F"}, scene);  
        newLeftRailMesh.rotation.z = Math.PI;
        newLeftRailMesh.position = new BABYLON.Vector3(W1, W2, 0);

        let newRightRailMesh = BargeCappingLibrary.ThreePanelBargeCapping("right-rail",{W1, W2, W3, length: height, thickness, angle: Math.PI/2, rotation: {x: 0, y: 0, z: 0}, color: "#003C5F"}, scene);  
        newRightRailMesh.position = new BABYLON.Vector3(width + W1, thickness, 0);
        newRightRailMesh.rotation.z = 0;

        let newTopRailMesh = BargeCappingLibrary.ThreePanelBargeCapping("top-rail",{W1: W3, W2, W3: W1, length: width + 2*W1, thickness, angle: Math.PI/2, rotation: {x: 0, y: 0, z: 0}, color: "#003C5F"}, scene);  
        newTopRailMesh.position = new BABYLON.Vector3(0, W2, height);
        newTopRailMesh.rotation.y = Math.PI/2;
        newTopRailMesh.rotation.z = Math.PI;
        
        meshes = [...meshes, newLeftRailMesh, newRightRailMesh, newTopRailMesh];

        let newMesh = BABYLON.Mesh.MergeMeshes(meshes, true, true, undefined, true);
        newMesh.name = name;

        for(let i = 0; i < meshes.length; i++) {
            meshes[i].dispose();
        }

        if(rotation)
            newMesh.rotation = {x: rotation.x, y: rotation.y, z: rotation.z};

        // Material
        let multiMat = new BABYLON.MultiMaterial('multi', scene);

        //if(hasRollerDoor) {
            let mainDoorMat = new BABYLON.StandardMaterial("outer-mat", scene);
            mainDoorMat.alpha = hasRollerDoor ? 1 : 0.01;
            mainDoorMat.diffuseTexture = new BABYLON.Texture("/assets/textures/easy_clad/0D3146.bmp");
            mainDoorMat.diffuseTexture.vScale = 8;
            mainDoorMat.backFaceCulling = false;

            let winchMat = new BABYLON.StandardMaterial("winch-mat", scene);
            winchMat.alpha = hasRollerDoor ? 1 : 0.01;
            winchMat.diffuseTexture = new BABYLON.Texture("/assets/textures/kliplok_700/0D3146.bmp");
            winchMat.diffuseTexture.uScale = 4;
            winchMat.backFaceCulling = false;

            multiMat.subMaterials = [...multiMat.subMaterials, mainDoorMat, winchMat];
            multiMat.hasRollerDoor = hasRollerDoor;
        //}
    
        let sideRailMat = new BABYLON.StandardMaterial("side-rail-mat", scene);
        sideRailMat.diffuseColor = new BABYLON.Color3.FromHexString(sideRailColor);
        sideRailMat.backFaceCulling = false;

        let topRailMat = new BABYLON.StandardMaterial("top-rail-mat", scene);
        topRailMat.diffuseColor = new BABYLON.Color3.FromHexString(topRailColor);
        topRailMat.backFaceCulling = false;

        multiMat.subMaterials = [...multiMat.subMaterials, sideRailMat, sideRailMat, topRailMat];

        newMesh.material = multiMat;

        for(let i = 0; i < newMesh.subMeshes.length; i++) {
            newMesh.subMeshes[i].materialIndex = i;
        }

        return newMesh;
    },
}

export default DoorLibrary;