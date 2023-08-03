import * as BABYLON from "babylonjs";
import earcut from "earcut";

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

let AwningLibrary = {
    DAB(name, panel, holes, scene) {
        let { W0, W1, H0, angle, thickness } = panel;
        let { WA01, WA02, WB01, WB02, HA01, HA02, HA03, HA04, HA05, HB01, HB02, radiusAX, radiusAY, radiusBX, radiusBY } = holes;

        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x + W0, _panelCoordinates[0].y, _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3( _panelCoordinates[1].x + W1*Math.cos(angle), _panelCoordinates[1].y - W1*Math.sin(angle), _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x + H0*Math.sin(angle), _panelCoordinates[2].y + H0*Math.cos(angle), _panelCoordinates[2].z);
        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[1].x, _panelCoordinates[1].y + H0, _panelCoordinates[1].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[4].x - W0, _panelCoordinates[4].y, _panelCoordinates[4].z);

        let panelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _panelCoordinates, scene, earcut);

        // Panel A Holes
        let panelAHoles = [
            {x: WA01, y: HA01},
            {x: WA01, y: HA01 + HA02},
            {x: WA01, y: HA01 + HA02 + HA03},
            {x: WA01, y: HA01 + HA02 + HA03 + HA04},
            {x: WA01, y: HA01 + HA02 + HA03 + HA04 + HA05},

            {x: WA01 + WA02, y: HA01},
            {x: WA01 + WA02, y: HA01 + HA02},
            {x: WA01 + WA02, y: HA01 + HA02 + HA03},
            {x: WA01 + WA02, y: HA01 + HA02 + HA03 + HA04},
            {x: WA01 + WA02, y: HA01 + HA02 + HA03 + HA04 + HA05},
        ];

        let _panelAHoleCoords = [];

        for(let h = 0; h < panelAHoles.length; h++) {
            let {x, y} = panelAHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusAX, radiusAY);
            _panelAHoleCoords.push(_newHoleCoord);
        }

        for(let i = 0; i < _panelAHoleCoords.length; i++) {
            panelMeshBuilder.addHole(_panelAHoleCoords[i]);
        }

        // Panel B Holes
        let panelBHoles = [
            {x: W0 + W1*Math.cos(angle) + HB01*Math.sin(angle) - WB01*Math.cos(angle), y: -W1*Math.sin(angle) + HB01*Math.cos(angle) + WB01*Math.sin(angle)},
            {x: W0 + W1*Math.cos(angle) + (HB01 + HB02)*Math.sin(angle) - WB01*Math.cos(angle), y: -W1*Math.sin(angle) + (HB01 + HB02)*Math.cos(angle) + WB01*Math.sin(angle)},

            {x: W0 + W1*Math.cos(angle) + HB01*Math.sin(angle) - (WB01 + WB02)*Math.cos(angle), y: -W1*Math.sin(angle) + HB01*Math.cos(angle) + (WB01 + WB02)*Math.sin(angle)},
            {x: W0 + W1*Math.cos(angle) + (HB01 + HB02)*Math.sin(angle) - (WB01 + WB02)*Math.cos(angle), y: -W1*Math.sin(angle) + (HB01 + HB02)*Math.cos(angle) + (WB01 + WB02)*Math.sin(angle)},
        ];

        let _panelBHoleCoords = [];

        for(let h = 0; h < panelBHoles.length; h++) {
            let {x, y} = panelBHoles[h];

            let _newHoleCoord = createSquashEllipse(x, y, -angle, radiusBX, radiusBY);
            _panelBHoleCoords.push(_newHoleCoord);
        }

        for(let i = 0; i < _panelBHoleCoords.length; i++) {
            panelMeshBuilder.addHole(_panelBHoleCoords[i]);
        }

        let newMesh = panelMeshBuilder.build(true, thickness);

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        newMesh.material = mat;
        newMesh.name = name;
        return newMesh;
    },
    IAB(name, direction = "LH", panel, holes, scene) {
        let { W0, W1, W2, H0, H1, angle, thickness } = panel;
        let { WA01, WB01, WB02, HA01, HA02, HA03, HB01, HB02, radiusAX, radiusAY, radiusBX, radiusBY } = holes;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        //******** */ PanelA
        let _panelACoordinates = [];
        _panelACoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _panelACoordinates[1] = new BABYLON.Vector3(_panelACoordinates[0].x - W0, _panelACoordinates[0].y, _panelACoordinates[0].z);
        _panelACoordinates[2] = new BABYLON.Vector3( _panelACoordinates[1].x, _panelACoordinates[1].y + H0, _panelACoordinates[1].z);
        _panelACoordinates[3] = new BABYLON.Vector3(_panelACoordinates[2].x + W0, _panelACoordinates[2].y, _panelACoordinates[2].z);

        let panelAMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _panelACoordinates, scene, earcut);

        // Holes
        let panelAHoles = [
            {x: -WA01, y: HA01},
            {x: -WA01, y: HA01 + HA02},
            {x: -WA01, y: HA01 + HA02 + HA03},
        ];
     
        let _panelAHoleCoords = [];

        for(let h = 0; h < panelAHoles.length; h++) {
            let {x, y} = panelAHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusAX, radiusAY);
            _panelAHoleCoords.push(_newHoleCoord);
        }

        for(let i = 0; i < _panelAHoleCoords.length; i++) {
            panelAMeshBuilder.addHole(_panelAHoleCoords[i]);
        }

        let panelAMesh = panelAMeshBuilder.build(true, thickness);
        panelAMesh.rotation.z = -Math.PI/2;
        panelAMesh.material = mat;

        //*********** */ Panel B
        let _panelBCoordinates = [];
        _panelBCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _panelBCoordinates[1] = new BABYLON.Vector3( _panelBCoordinates[0].x + W2, _panelBCoordinates[0].y, _panelBCoordinates[0].z);
        _panelBCoordinates[2] = new BABYLON.Vector3( _panelBCoordinates[1].x + W1*Math.cos(angle), _panelBCoordinates[1].y - W1*Math.sin(angle), _panelBCoordinates[1].z);
        _panelBCoordinates[3] = new BABYLON.Vector3(_panelBCoordinates[2].x + H1*Math.sin(angle), _panelBCoordinates[2].y + H1*Math.cos(angle), _panelBCoordinates[2].z);
        _panelBCoordinates[4] = new BABYLON.Vector3(_panelBCoordinates[0].x, _panelBCoordinates[0].y + H0, _panelBCoordinates[0].z);

        let panelBMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _panelBCoordinates, scene, earcut);

        // Holes
        let panelBHoles = [
            {x: W2 + W1*Math.cos(angle) + HB01*Math.sin(angle) - WB01*Math.cos(angle), y: -W1*Math.sin(angle) + HB01*Math.cos(angle) + WB01*Math.sin(angle)},
            {x: W2 + W1*Math.cos(angle) + (HB01 + HB02)*Math.sin(angle) - WB01*Math.cos(angle), y: -W1*Math.sin(angle) + (HB01 + HB02)*Math.cos(angle) + WB01*Math.sin(angle)},

            {x: W2 + W1*Math.cos(angle) + HB01*Math.sin(angle) - (WB01 + WB02)*Math.cos(angle), y: -W1*Math.sin(angle) + HB01*Math.cos(angle) + (WB01 + WB02)*Math.sin(angle)},
            {x: W2 + W1*Math.cos(angle) + (HB01 + HB02)*Math.sin(angle) - (WB01 + WB02)*Math.cos(angle), y: -W1*Math.sin(angle) + (HB01 + HB02)*Math.cos(angle) + (WB01 + WB02)*Math.sin(angle)},
        ];

        let _panelBHoleCoords = [];

        for(let h = 0; h < panelBHoles.length; h++) {
            let {x, y} = panelBHoles[h];

            let _newHoleCoord = createSquashEllipse(x, y, -angle, radiusBX, radiusBY);
            _panelBHoleCoords.push(_newHoleCoord);
        }

        for(let i = 0; i < _panelBHoleCoords.length; i++) {
            panelBMeshBuilder.addHole(_panelBHoleCoords[i]);
        }

        let panelBMesh = panelBMeshBuilder.build(true, thickness);
        panelBMesh.material = mat;

        if(direction === "LH") {
            panelBMesh.rotation.z = Math.PI;
            panelBMesh.position.x -= thickness;
        } else {
            panelBMesh.position.y += thickness;
        }

        let newMesh = BABYLON.Mesh.MergeMeshes([panelAMesh, panelBMesh], true, true, undefined, false, true);
        newMesh.name = name;
        return newMesh;
    },
    IAB2(name, panel, holes, scene) {
        let { W0, W1, W2, H0, H1, angle, thickness } = panel;
        let { WA01, WB01, WB02, HA01, HA02, HB01, HB02, radiusAX, radiusAY, radiusBX, radiusBY } = holes;

        let mat = new BABYLON.StandardMaterial("mat", scene);
        mat.diffuseColor = new BABYLON.Color3.FromHexString("#9B9B9B");
        mat.backFaceCulling = false;

        let _panelCoordinates = [];
        _panelCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _panelCoordinates[1] = new BABYLON.Vector3(_panelCoordinates[0].x - W0, _panelCoordinates[0].y, _panelCoordinates[0].z);
        _panelCoordinates[2] = new BABYLON.Vector3( _panelCoordinates[1].x - W1*Math.cos(angle), _panelCoordinates[1].y - W1*Math.sin(angle), _panelCoordinates[1].z);
        _panelCoordinates[3] = new BABYLON.Vector3(_panelCoordinates[2].x - H1*Math.sin(angle), _panelCoordinates[2].y + H1*Math.cos(angle), _panelCoordinates[2].z);
        _panelCoordinates[5] = new BABYLON.Vector3(_panelCoordinates[0].x, _panelCoordinates[0].y + H0, _panelCoordinates[0].z);
        _panelCoordinates[4] = new BABYLON.Vector3(_panelCoordinates[5].x - W2, _panelCoordinates[5].y, _panelCoordinates[5].z);

        let panelMeshBuilder = new BABYLON.PolygonMeshBuilder(name, _panelCoordinates, scene, earcut);

        // Panel A Holes
        let panelAHoles = [
            {x: -WA01, y: HA01},
            {x: -WA01, y: HA01 + HA02}
        ];
     
        let _panelAHoleCoords = [];

        for(let h = 0; h < panelAHoles.length; h++) {
            let {x, y} = panelAHoles[h];

            let _newHoleCoord = createEllipse(x, y, radiusAX, radiusAY);
            _panelAHoleCoords.push(_newHoleCoord);
        }

        for(let i = 0; i < _panelAHoleCoords.length; i++) {
            panelMeshBuilder.addHole(_panelAHoleCoords[i]);
        }

        // Panel B Holes
        let panelBHoles = [
            {x: -(W0 + W1*Math.cos(angle) + HB01*Math.sin(angle) - WB01*Math.cos(angle)), y: -W1*Math.sin(angle) + HB01*Math.cos(angle) + WB01*Math.sin(angle)},
            {x: -(W0 + W1*Math.cos(angle) + (HB01 + HB02)*Math.sin(angle) - WB01*Math.cos(angle)), y: -W1*Math.sin(angle) + (HB01 + HB02)*Math.cos(angle) + WB01*Math.sin(angle)},

            {x: -(W0 + W1*Math.cos(angle) + HB01*Math.sin(angle) - (WB01 + WB02)*Math.cos(angle)), y: -W1*Math.sin(angle) + HB01*Math.cos(angle) + (WB01 + WB02)*Math.sin(angle)},
            {x: -(W0 + W1*Math.cos(angle) + (HB01 + HB02)*Math.sin(angle) - (WB01 + WB02)*Math.cos(angle)), y: -W1*Math.sin(angle) + (HB01 + HB02)*Math.cos(angle) + (WB01 + WB02)*Math.sin(angle)},
        ];

        let _panelBHoleCoords = [];

        for(let h = 0; h < panelBHoles.length; h++) {
            let {x, y} = panelBHoles[h];

            let _newHoleCoord = createSquashEllipse(x, y, angle, radiusBX, radiusBY);
            _panelBHoleCoords.push(_newHoleCoord);
        }

        for(let i = 0; i < _panelBHoleCoords.length; i++) {
            panelMeshBuilder.addHole(_panelBHoleCoords[i]);
        }

        let newMesh = panelMeshBuilder.build(true, thickness);
        newMesh.name = name;
        newMesh.material = mat;
        return newMesh;
    },
}

export default AwningLibrary;