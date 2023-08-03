import * as BABYLON from "babylonjs";
import earcut from "earcut";

function createPolygon(_radius) {
    const theta = 2*Math.PI/12;
        
    let _coordinates = [];
    _coordinates[0] = new BABYLON.Vector3(_radius * Math.cos(theta), 0, -(_radius * Math.sin(theta)));
    _coordinates[1] = new BABYLON.Vector3(_radius * Math.cos(theta), 0, _radius * Math.sin(theta));
    _coordinates[2] = new BABYLON.Vector3(0, 0, _radius);
    _coordinates[3] = new BABYLON.Vector3(-(_radius * Math.cos(theta)), 0, _radius * Math.sin(theta));
    _coordinates[4] = new BABYLON.Vector3(-(_radius * Math.cos(theta)), 0, -(_radius * Math.sin(theta)));
    _coordinates[5] = new BABYLON.Vector3(0, 0, -_radius);

    return _coordinates;
}

let BoltLibrary = {
    M16(options, scene) {
        let {r, height, color="#bdbdbd"} = options;

        let _headBoltCoordinates = createPolygon(r);
        let _nutBoltCoordinates = createPolygon(0.8*r);

        let headBoltMesh = BABYLON.MeshBuilder.ExtrudePolygon("m16-head-bolt-mesh", {shape: _headBoltCoordinates, holes: [], depth: 0.25*height, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene, earcut);
        headBoltMesh.position.y = 0.2*height;

        let bodyBoltMesh = BABYLON.MeshBuilder.CreateCylinder("m16-body-bolt-mesh", {height: height, diameter: r}, scene);
        bodyBoltMesh.position = new BABYLON.Vector3(0, -height/2, 0);
        bodyBoltMesh.parent = headBoltMesh;

        let nutBoltMesh = BABYLON.MeshBuilder.ExtrudePolygon("m16-nut-bolt-mesh", {shape: _nutBoltCoordinates, holes: [], depth: 0.2*height, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene, earcut);
        nutBoltMesh.position = new BABYLON.Vector3(0, -0.5*height, 0);
        nutBoltMesh.parent = headBoltMesh;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.backFaceCulling = false;
        mat.diffuseColor = new BABYLON.Color3.FromHexString(color);

        headBoltMesh.material = mat;

        let newMesh = BABYLON.Mesh.MergeMeshes([headBoltMesh, nutBoltMesh, bodyBoltMesh], true, true, undefined, false, true);

        headBoltMesh.dispose();
        nutBoltMesh.dispose();
        bodyBoltMesh.dispose();

        return newMesh;
    },
    M12(options, scene) {
        let {r, height, color="#bdbdbd"} = options;

        let _headBoltCoordinates = createPolygon(r);
        let _nutBoltCoordinates = createPolygon(0.8*r);

        let headBoltMesh = BABYLON.MeshBuilder.ExtrudePolygon("m12-head-bolt-mesh", {shape: _headBoltCoordinates, holes: [], depth: 0.25*height, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene, earcut);
        headBoltMesh.position.y = 0.2*height;

        let bodyBoltMesh = BABYLON.MeshBuilder.CreateCylinder("m12-body-bolt-mesh", {height: height, diameter: r}, scene);
        bodyBoltMesh.position = new BABYLON.Vector3(0, -height/2, 0);
        bodyBoltMesh.parent = headBoltMesh;

        let nutBoltMesh = BABYLON.MeshBuilder.ExtrudePolygon("m12-nut-bolt-mesh", {shape: _nutBoltCoordinates, holes: [], depth: 0.2*height, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene, earcut);
        
        nutBoltMesh.position = new BABYLON.Vector3(0, -0.5*height, 0);
        nutBoltMesh.parent = headBoltMesh;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString(color);

        headBoltMesh.material = mat;

        let newMesh = BABYLON.Mesh.MergeMeshes([headBoltMesh, bodyBoltMesh, nutBoltMesh], true, true, undefined, false, true);

        headBoltMesh.dispose();
        bodyBoltMesh.dispose();
        nutBoltMesh.dispose();

        return newMesh;
    }
}

export default BoltLibrary;