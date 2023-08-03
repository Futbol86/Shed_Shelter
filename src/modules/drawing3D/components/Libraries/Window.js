import * as BABYLON from "babylonjs";
import earcut from "earcut";

let WindowLibrary = {
    Window(name, options, scene) {
        let {width, height, thickness, t, rotation, color="#31335F"} = options;

        let corners = [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(width, 0, 0),
            new BABYLON.Vector3(width, height, 0),
            new BABYLON.Vector3(0, height, 0),
        ];

        let leftGlassDoorCorners = [
            new BABYLON.Vector3(t, t, 0),
            new BABYLON.Vector3(width/2 - t/2, t, 0),
            new BABYLON.Vector3(width/2 - t/2, height - t, 0),
            new BABYLON.Vector3(t, height - t, 0),
        ];

        let rightGlassDoorCorners = [
            new BABYLON.Vector3(width/2 + t/2, t, 0),
            new BABYLON.Vector3(width - t, t, 0),
            new BABYLON.Vector3(width - t, height - t, 0),
            new BABYLON.Vector3(width/2 + t/2, height - t, 0),
        ];
    
        let holePoint1s = [], holePoint2s = [];
        holePoint1s.push(
            new BABYLON.Vector2(t, t),
            new BABYLON.Vector2(width/2 - t/2, t),
            new BABYLON.Vector2(width/2 - t/2, height - t),
            new BABYLON.Vector2(t, height - t),
        );

        holePoint2s.push(
            new BABYLON.Vector2(width/2 + t/2, t),
            new BABYLON.Vector2(width - t, t),
            new BABYLON.Vector2(width - t, height - t),
            new BABYLON.Vector2(width/2 + t/2, height - t),
        );
    
        let outerWindowBuilder = new BABYLON.PolygonMeshBuilder(name, corners, scene, earcut);
        outerWindowBuilder.addHole(holePoint1s);
        outerWindowBuilder.addHole(holePoint2s);

        let outerWindowMesh = outerWindowBuilder.build(null, thickness);
    
        let leftGlassDoorBuilder = new BABYLON.PolygonMeshBuilder("glass-door-left-mesh", leftGlassDoorCorners, scene, earcut);
        let leftGlassDoorMesh = leftGlassDoorBuilder.build(null, thickness);

        let rightGlassDoorBuilder = new BABYLON.PolygonMeshBuilder("glass-door-right-mesh", rightGlassDoorCorners, scene, earcut);
        let rightGlassDoorMesh = rightGlassDoorBuilder.build(null, thickness);

        let windowMat = new BABYLON.StandardMaterial("windowMat", scene);
        windowMat.diffuseColor = new BABYLON.Color3.FromHexString(color);

        let glassDoorMat = windowMat.clone('glass-door-mat');
        glassDoorMat.diffuseColor = new BABYLON.Color3.FromHexString("#E9E9E9");
        glassDoorMat.alpha = 0.4;

        outerWindowMesh.material = windowMat;
        leftGlassDoorMesh.material = glassDoorMat;
        rightGlassDoorMesh.material = glassDoorMat;
    
        let newMesh = BABYLON.Mesh.MergeMeshes([outerWindowMesh, leftGlassDoorMesh, rightGlassDoorMesh], true, true, undefined, false, true);
        newMesh.name = name;

        if(rotation) {
            newMesh.rotation = {x: rotation.x, y: rotation.y, z: rotation.z};
        }

        return newMesh;
    },
    BarnWindow(name, options, scene) {
        let {width, height, diameter, pitchs = [], rotation, color="#31335F"} = options;

        let W1 = width;
        let W2 = (W1/2)/(Math.cos(pitchs[1]));

        let Hx = width/2*Math.tan(pitchs[1]);
        let H1 = height - Hx;

        let W3 = Math.sqrt((W1/2)*(W1/2) + H1*H1);
        let angle = Math.acos((W1/2)/W3);

        let meshes = [];

        let barMat = new BABYLON.StandardMaterial("mat", scene);
        barMat.diffuseColor = new BABYLON.Color3.FromHexString(color);
        barMat.backFaceCulling = false;

        let glassDoorMat = new BABYLON.StandardMaterial("glass-door-mat", scene);
        glassDoorMat.diffuseColor = new BABYLON.Color3.FromHexString("#E9E9E9");
        glassDoorMat.alpha = 0.4;
        glassDoorMat.backFaceCulling = false;

        //**** bottom bar
        let mesh0 = BABYLON.MeshBuilder.CreateBox("mesh-0", {width: W1, height: diameter, depth: diameter}, scene);
        mesh0.setPivotMatrix(BABYLON.Matrix.Translation(W1/2, 0, 0), false);
        mesh0.material = barMat;

        meshes = [...meshes, mesh0];

        //*** left bars for skeleton window
        let mesh1 = BABYLON.MeshBuilder.CreateBox("mesh-1", {width: H1, height: diameter, depth: diameter}, scene);
        mesh1.position.x = -W1/2;
        mesh1.position.z = H1/2;
        mesh1.rotation.y = pitchs[0];
        mesh1.material = barMat;
        mesh1.parent = mesh0;

        meshes = [...meshes, mesh1];

        let mesh2 = BABYLON.MeshBuilder.CreateBox("mesh-2", {width: W2, height: diameter, depth: diameter}, scene);
        mesh2.setPivotMatrix(BABYLON.Matrix.Translation(W2/2, 0, 0), false);
        mesh2.position.x = -W1/2;
        mesh2.position.z = H1;
        mesh2.rotation.y = -pitchs[1];
        mesh2.material = barMat;
        mesh2.parent = mesh0;

        meshes = [...meshes, mesh2];

        let mesh3 = BABYLON.MeshBuilder.CreateBox("mesh-3", {width: W2, height: diameter, depth: diameter}, scene);
        mesh3.setPivotMatrix(BABYLON.Matrix.Translation(-W2/2, 0, 0), false);
        mesh3.position.x = W1/2;
        mesh3.position.z = H1;
        mesh3.rotation.y = pitchs[1];
        mesh3.material = barMat;
        mesh3.parent = mesh0;

        meshes = [...meshes, mesh3];

        let mesh4 = mesh1.clone("mesh-4");
        mesh4.position.x = W1/2;
        mesh4.material = barMat;
        mesh4.parent = mesh0;

        meshes = [...meshes, mesh4];

        let mesh5 = BABYLON.MeshBuilder.CreateBox("mesh-5", {width: W3, height: diameter, depth: diameter}, scene);
        mesh5.setPivotMatrix(BABYLON.Matrix.Translation(W3/2, 0, 0), false);
        mesh5.position.x = -W1/2;
        mesh5.position.z = H1;
        mesh5.rotation.y = angle;
        mesh5.material = barMat;
        mesh5.parent = mesh0;

        meshes = [...meshes, mesh5];

        let mesh6 = BABYLON.MeshBuilder.CreateBox("mesh-6", {width: W3, height: diameter, depth: diameter}, scene);
        mesh6.setPivotMatrix(BABYLON.Matrix.Translation(-W3/2, 0, 0), false);
        mesh6.position.x = W1/2;
        mesh6.position.z = H1;
        mesh6.rotation.y = -angle;
        mesh6.material = barMat;
        mesh6.parent = mesh0;

        meshes = [...meshes, mesh6];

        let mesh7 = BABYLON.MeshBuilder.CreateBox("mesh-7", {width: height, height: diameter, depth: diameter}, scene);
        mesh7.setPivotMatrix(BABYLON.Matrix.Translation(-height/2, 0, 0), false);
        mesh7.rotation.y = Math.PI/2;
        mesh7.material = barMat;
        mesh7.parent = mesh0;

        meshes = [...meshes, mesh7];

        // ** create new glass for window
        let glassDoorCorners = [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(0, H1, 0),
            new BABYLON.Vector3(W1/2, height, 0),
            new BABYLON.Vector3(W1, H1, 0),
            new BABYLON.Vector3(W1, 0, 0),
        ];

        let glassDoorBuilder = new BABYLON.PolygonMeshBuilder("glass-door-mesh", glassDoorCorners, scene, earcut);
        let glassDoorMesh = glassDoorBuilder.build(null, diameter);
        glassDoorMesh.position.x = -W1/2;
        glassDoorMesh.material = glassDoorMat;
        glassDoorMesh.parent = mesh0;

        meshes = [...meshes, glassDoorMesh];

        let newMesh = BABYLON.Mesh.MergeMeshes(meshes, true, true, undefined, false, true);
        newMesh.name = name;

        if(rotation) {
            newMesh.rotation = {x: rotation.x, y: rotation.y, z: rotation.z};
        }

        return newMesh;
    },
}

export default WindowLibrary;