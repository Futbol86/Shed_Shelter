import * as BABYLON from "babylonjs";
import earcut from "earcut";

let BackgroundLibrary = {
    SkyBox(scene) {
        let skyBoxMesh = BABYLON.MeshBuilder.CreateBox("skybox", {size: 24000}, scene);
        skyBoxMesh.rotation.x = Math.PI/2;

        let skyBoxMaterial = new BABYLON.StandardMaterial("mat", scene);
        skyBoxMaterial.backFaceCulling = false;
        skyBoxMaterial.reflectionTexture = new BABYLON.CubeTexture("/assets/textures/TropicalSunnyDay", scene);
        skyBoxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyBoxMaterial.reflectionTexture.optimizeUVAllocation = true;
        skyBoxMaterial.diffuseColor =  new BABYLON.Color3(0, 0, 0);
        skyBoxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyBoxMaterial.disableLighting = true;
        skyBoxMesh.material = skyBoxMaterial;

        return skyBoxMesh
    },
    Ground(width, height, scene) {
        let groundMesh = BABYLON.MeshBuilder.CreateGround("ground", {
            width: width, height: height, subdivisions: 1, updatable: false
        }, scene);
        groundMesh.rotation.x = Math.PI/2;
        
        
        let mat = new BABYLON.StandardMaterial("ground-mat", scene);
        mat.diffuseTexture = new BABYLON.Texture(
            "/assets/grass.jpg",
            scene
        );
        // mat.diffuseTexture.optimizeUVAllocation = true;
        // mat.diffuseColor = new BABYLON.Color3.FromHexString("#56B33A");
        // mat.alpha = 0.9;

        groundMesh.material = mat;
        return groundMesh;
    },
    Floor(params, scene) {
        let {span, length, height} = params;
        let _coordinates = [];

        _coordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _coordinates[1] = new BABYLON.Vector3(_coordinates[0].x + span, _coordinates[0].y, _coordinates[0].z);
        _coordinates[2] = new BABYLON.Vector3(_coordinates[1].x, _coordinates[1].y + length, _coordinates[1].z);
        _coordinates[3] = new BABYLON.Vector3(_coordinates[2].x - span, _coordinates[2].y, _coordinates[2].z);

        let floorMeshBuilder = new BABYLON.PolygonMeshBuilder("floor", _coordinates, scene, earcut);
        let floorMesh = floorMeshBuilder.build(true, height);

        let mat = new BABYLON.StandardMaterial("floor-mat", scene);
        mat.diffuseTexture = new BABYLON.Texture("/assets/textures/floor.png"); 
        mat.diffuseTexture.optimizeUVAllocation = true;
        mat.backFaceCulling = false;

        floorMesh.material = mat;
        floorMesh.position = new BABYLON.Vector3(0, 0, 1);

        return floorMesh;
    },
    HighlightMesh(params, scene) {
        let {_coordinates, thickness, color="#00ADEC",} = params;
        let _outerCoordinates = [], _innerCoordinates = [], holePoints = [];

        _coordinates.map(item => {
            _outerCoordinates.push(new BABYLON.Vector3(item.x, item.y, 0));
        })

        let angle = 0;
        let direction = 0;
        let line = BABYLON.Vector3.Zero();
        _outerCoordinates[1].subtractToRef(_outerCoordinates[0], line);
        let nextLine = BABYLON.Vector3.Zero();
        _outerCoordinates[2].subtractToRef(_outerCoordinates[1], nextLine);
        
        let nbOuterCoordinates = _outerCoordinates.length;

        for(let w = 0; w < nbOuterCoordinates; w++) {
            angle = Math.PI - Math.acos(BABYLON.Vector3.Dot(nextLine, line)/(line.length() * nextLine.length()));

            direction = BABYLON.Vector3.Cross(nextLine, line).normalize().z;
            let lineNormal = new BABYLON.Vector3(-1*line.y, line.x, 0).normalize();

            line.normalize();
            _innerCoordinates[(w+1)%nbOuterCoordinates] = _outerCoordinates[(w+1)%nbOuterCoordinates].add(lineNormal.scale(thickness)).add(line.scale(direction*thickness/Math.tan(angle/2)));

            line = nextLine.clone();
            _outerCoordinates[(w + 3)%nbOuterCoordinates].subtractToRef(_outerCoordinates[(w + 2)%nbOuterCoordinates], nextLine);
        }

        _innerCoordinates.map(item => {
            holePoints.push(new BABYLON.Vector2(item.x, item.y));
        });

        let outerMeshBuilder = new BABYLON.PolygonMeshBuilder("outer-mesh", _outerCoordinates, scene, earcut);
        outerMeshBuilder.addHole(holePoints);
        let innerMeshBuilder = new BABYLON.PolygonMeshBuilder("inner-mesh", _innerCoordinates, scene, earcut);
    
        let outerMesh = outerMeshBuilder.build(true, 0.2);
        let innerMesh = innerMeshBuilder.build(null, 0.2);

        let outerMat = new BABYLON.StandardMaterial("mat", scene);
        outerMat.diffuseColor = new BABYLON.Color3.FromHexString(color);
        outerMat.backFaceCulling = false;

        let innerMat = outerMat.clone();
        innerMat.alpha = 0.3;

        outerMesh.material = outerMat;
        innerMesh.material = innerMat;

        let newMesh = BABYLON.Mesh.MergeMeshes([outerMesh, innerMesh], true, true, undefined, false, true);

        outerMesh.dispose();
        innerMesh.dispose();

        return newMesh;
    }
}

export default BackgroundLibrary;