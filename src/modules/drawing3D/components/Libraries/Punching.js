import * as BABYLON from "babylonjs";
import earcut from "earcut";

let PunchingLibrary = {
    Web(name, params, webHoleCoordinates = [], scene) {
        let {width, length, thickness = 1, color = "#E1E1E1", radiusX = 1.8, radiusY = 2.2} = params;

        let corners = [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(width, 0, 0),
            new BABYLON.Vector3(width, length, 0),
            new BABYLON.Vector3(0, length, 0),
        ];

        function createEllipse(_xCenter, _yCenter, _radiusX, _radiusY) {
            let _ellipsePoints = [];

            for(let theta = 0; theta < 2*Math.PI; theta += 2*Math.PI/40) {
                let x = _xCenter + _radiusX*Math.sin(theta);
                let y = _yCenter + _radiusY*Math.cos(theta);

                _ellipsePoints.push(new BABYLON.Vector2(x, y));
            }
    
            return _ellipsePoints;
        }
    
        let ellipsePoints = [];

        for(let i = 0; i < webHoleCoordinates.length; i++) {
            let {coordinateX, coordinateY} = webHoleCoordinates[i];
            let newEllipsePoints = createEllipse(coordinateX, coordinateY, radiusX, radiusY);
            ellipsePoints.push(newEllipsePoints);
        }
    
        let polyTri = new BABYLON.PolygonMeshBuilder(name, corners, scene, earcut);
        for(let i = 0; i < ellipsePoints.length; i++) {
            polyTri.addHole(ellipsePoints[i]);
        }

        let polygon = polyTri.build(null, thickness);
        
        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.backFaceCulling = false;
        mat.diffuseColor = new BABYLON.Color3.FromHexString(color);

        polygon.material = mat;
        return polygon;
    },
    Flange(name, params, flangeHolePunchings = [], scene) {
        let {width, length, thickness = 1, color = "#E1E1E1", radiusX = 1.8, radiusY = 2.2} = params;

        let corners = [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(width, 0, 0),
            new BABYLON.Vector3(width, length, 0),
            new BABYLON.Vector3(0, length, 0),
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
    
        for(let i = 0; i < flangeHolePunchings.length; i++) {
            let {coordinateX, coordinateY} = flangeHolePunchings[i];
            let newEllipsePoints = createEllipse(coordinateX, coordinateY, radiusX, radiusY);
            ellipsePoints.push(newEllipsePoints);
        }
    
        let polyTri = new BABYLON.PolygonMeshBuilder(name, corners, scene, earcut);
        for(let i = 0; i < ellipsePoints.length; i++) {
            polyTri.addHole(ellipsePoints[i]);
        }
    
        let polygon = polyTri.build(null, thickness);
        
        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.backFaceCulling = false;
        mat.diffuseColor = new BABYLON.Color3.FromHexString(color);

        polygon.material = mat;
        return polygon;
    },
    CDoubleFlange(name, params, flangeHolePunchings = [], scene) {
        let {width, length, thickness = 1, foldDirection = "left", color = "#E1E1E1", radiusX = 1.8, radiusY = 2.2} = params;

        let corners = [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(width, 0, 0),
            new BABYLON.Vector3(width, length, 0),
            new BABYLON.Vector3(0, length, 0),
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
    
        for(let i = 0; i < flangeHolePunchings.length; i++) {
            let {coordinateX, coordinateY} = flangeHolePunchings[i];
            let newEllipsePoints = createEllipse(coordinateX, coordinateY, radiusX, radiusY);
            ellipsePoints.push(newEllipsePoints);
        }
    
        let polyTri = new BABYLON.PolygonMeshBuilder(name, corners, scene, earcut);
        for(let i = 0; i < ellipsePoints.length; i++) {
            polyTri.addHole(ellipsePoints[i]);
        }
    
        let mainMesh = polyTri.build(null, thickness);
        
        let foldCorners = [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(1/3*width, 0, 0),
            new BABYLON.Vector3(1/3*width, length, 0),
            new BABYLON.Vector3(0, length, 0),
        ];

        let foldMeshBuilder = new BABYLON.PolygonMeshBuilder("fold", foldCorners, scene, earcut);
        let foldMesh = foldMeshBuilder.build(null, thickness);
        
        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.backFaceCulling = false;
        mat.diffuseColor = new BABYLON.Color3.FromHexString(color);
      //  polygon.material = mat;

        foldMesh.position.x += width;
        foldMesh.rotation.z = foldDirection === "left" ? -Math.PI/2 : Math.PI/2;

        let foldMesh1 = foldMesh.clone("fold-mesh-1");
        foldMesh1.position.x -= width;

        let newMesh = BABYLON.Mesh.MergeMeshes([mainMesh, foldMesh, foldMesh1], true, true, undefined, true);
        newMesh.name = name;
        newMesh.material = mat;
        
        return newMesh;
    },
    ExtrudePanel(name, params, webHoleCoordinates = [], scene) {
        let {width, length, thickness = 1, alpha, beta, color = "#E1E1E1", radiusX = 1.8, radiusY = 2.2} = params;

        let corners = [
            new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(width, width/Math.tan(beta), 0),
            new BABYLON.Vector3(width, length - width/Math.tan(alpha), 0),
            new BABYLON.Vector3(0, length, 0),
        ];

        function createEllipse(_xCenter, _yCenter, _radiusX, _radiusY) {
            let _ellipsePoints = [];

            for(let theta = 0; theta < 2*Math.PI; theta += 2*Math.PI/40) {
                let x = _xCenter + _radiusX*Math.sin(theta);
                let y = _yCenter + _radiusY*Math.cos(theta);

                _ellipsePoints.push(new BABYLON.Vector2(x, y));
            }
    
            return _ellipsePoints;
        }
    
        let ellipsePoints = [];

        for(let i = 0; i < webHoleCoordinates.length; i++) {
            let {coordinateX, coordinateY} = webHoleCoordinates[i];
            let newEllipsePoints = createEllipse(coordinateX, coordinateY, radiusX, radiusY);
            ellipsePoints.push(newEllipsePoints);
        }
    
        let polyTri = new BABYLON.PolygonMeshBuilder(name, corners, scene, earcut);
        for(let i = 0; i < ellipsePoints.length; i++) {
            polyTri.addHole(ellipsePoints[i]);
        }

        let polygon = polyTri.build(null, thickness);
        
        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.backFaceCulling = false;
        mat.diffuseColor = new BABYLON.Color3.FromHexString(color);

        polygon.material = mat;
        return polygon;
    },
}

export default PunchingLibrary;