import * as BABYLON from "babylonjs";
import earcut from "earcut";

let RoofLibrary = {
    SkyLightMesh(name, options, scene) {
        let {width, height, thickness, t, color="#31335F"} = options;

        let outerCorners = [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(width, 0, 0),
            new BABYLON.Vector3(width, height, 0),
            new BABYLON.Vector3(0, height, 0),
        ];

        let innerCorners = [
            new BABYLON.Vector3(t, t, 0),
            new BABYLON.Vector3(width - t, t, 0),
            new BABYLON.Vector3(width - t, height - t, 0),
            new BABYLON.Vector3(t, height - t, 0),
        ];

        let holePoint1s = [];
        holePoint1s.push(
            new BABYLON.Vector2(t, t),
            new BABYLON.Vector2(width - t, t),
            new BABYLON.Vector2(width - t, height - t),
            new BABYLON.Vector2(t, height - t),
        );
    
        let outerMeshBuilder = new BABYLON.PolygonMeshBuilder("outer-mesh", outerCorners, scene, earcut);
        outerMeshBuilder.addHole(holePoint1s);
        let outerMesh = outerMeshBuilder.build(null, thickness);
    
        let innerMeshBuilder = new BABYLON.PolygonMeshBuilder("inner-mesh", innerCorners, scene, earcut);
        let innerMesh = innerMeshBuilder.build(null, thickness);

        let outerMat = new BABYLON.StandardMaterial("outer-mat", scene);
        outerMat.diffuseColor = new BABYLON.Color3.FromHexString(color);

        let innerMat = outerMat.clone('inner-mat');
        innerMat.diffuseColor = new BABYLON.Color3.FromHexString("#E9E9E9");
        innerMat.alpha = 0.4;

        outerMesh.material = outerMat;
        innerMesh.material = innerMat;
    
        let newMesh = BABYLON.Mesh.MergeMeshes([outerMesh, innerMesh], true, true, undefined, false, true);
        newMesh.name = name;
        
        return newMesh;
    }
}

export default RoofLibrary;