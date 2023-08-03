import * as BABYLON from "babylonjs";
import earcut from "earcut";

let StramitLibrary = {
    CSection(name, params, scene) {
        let {length, D, B, L, t, color= "#838383"} = params; //C0C0C0
        t = 1.5;
        let positions = [], indices = [], colors = [], uvs = [];
        let _frontCoordinates = [], _backCoordinates = [];

        _frontCoordinates[0] = new BABYLON.Vector3((B - 2*t)/2, (D/2 - L), 0);
        _frontCoordinates[1] = new BABYLON.Vector3(_frontCoordinates[0].x, _frontCoordinates[0].y + (L - t), _frontCoordinates[0].z);
        _frontCoordinates[2] = new BABYLON.Vector3(_frontCoordinates[1].x - (B - 2*t), _frontCoordinates[1].y, _frontCoordinates[1].z);
        _frontCoordinates[3] = new BABYLON.Vector3(_frontCoordinates[2].x, _frontCoordinates[2].y - (D - 2*t), _frontCoordinates[2].z);
        _frontCoordinates[4] = new BABYLON.Vector3(_frontCoordinates[3].x + (B - 2*t), _frontCoordinates[3].y, _frontCoordinates[3].z);
        _frontCoordinates[5] = new BABYLON.Vector3(_frontCoordinates[4].x, _frontCoordinates[4].y + (L - t), _frontCoordinates[4].z);

        _frontCoordinates[6] = new BABYLON.Vector3(_frontCoordinates[0].x + t, _frontCoordinates[0].y, _frontCoordinates[0].z);
        _frontCoordinates[7] = new BABYLON.Vector3(_frontCoordinates[6].x, _frontCoordinates[6].y + L, _frontCoordinates[6].z);
        _frontCoordinates[8] = new BABYLON.Vector3(_frontCoordinates[7].x - B, _frontCoordinates[7].y, _frontCoordinates[7].z);
        _frontCoordinates[9] = new BABYLON.Vector3(_frontCoordinates[8].x, _frontCoordinates[8].y - D, _frontCoordinates[8].z);
        _frontCoordinates[10] = new BABYLON.Vector3(_frontCoordinates[9].x + B, _frontCoordinates[9].y, _frontCoordinates[9].z);
        _frontCoordinates[11] = new BABYLON.Vector3(_frontCoordinates[10].x, _frontCoordinates[10].y + L, _frontCoordinates[10].z);

        for(let i = 0; i < _frontCoordinates.length; i++) {
            _backCoordinates[i] = new BABYLON.Vector3(_frontCoordinates[i].x, _frontCoordinates[i].y, _frontCoordinates[i].z + length);
        }

        for(let i = 0; i < _frontCoordinates.length; i++) {
            positions.push(_frontCoordinates[i].x, _frontCoordinates[i].y, _frontCoordinates[i].z);
            uvs.push(0, 0);
        }

        for(let i = 0; i < _backCoordinates.length; i++) {
            positions.push(_backCoordinates[i].x, _backCoordinates[i].y, _backCoordinates[i].z);
            uvs.push(0, 0);
        }

        let mesh = new BABYLON.Mesh(name, scene);
        let normals = [];

        let vertexData = new BABYLON.VertexData();
        BABYLON.VertexData.ComputeNormals(positions, indices, normals, colors);

        vertexData.positions = positions;
        vertexData.indices = indices;
        vertexData.normals = normals;
        vertexData.uvs = uvs;
        vertexData.applyToMesh(mesh);

        return mesh;
    },
    DoubleCSection(name, params, scene) {
        let {length, D, B, L, t, color= "#838383"} = params;
        t = 1.5;
        let positions = [], indices = [], colors = [], uvs = [];
        let _frontCoordinates = [], _backCoordinates = [];

        _frontCoordinates[0] = new BABYLON.Vector3((B - 2*t)/2, (D/2 - L), 0);
        _frontCoordinates[1] = new BABYLON.Vector3(_frontCoordinates[0].x, _frontCoordinates[0].y + (L - t), _frontCoordinates[0].z);
        _frontCoordinates[2] = new BABYLON.Vector3(_frontCoordinates[1].x - (B - 2*t), _frontCoordinates[1].y, _frontCoordinates[1].z);
        _frontCoordinates[3] = new BABYLON.Vector3(_frontCoordinates[2].x, _frontCoordinates[2].y - (D - 2*t), _frontCoordinates[2].z);
        _frontCoordinates[4] = new BABYLON.Vector3(_frontCoordinates[3].x + (B - 2*t), _frontCoordinates[3].y, _frontCoordinates[3].z);
        _frontCoordinates[5] = new BABYLON.Vector3(_frontCoordinates[4].x, _frontCoordinates[4].y + (L - t), _frontCoordinates[4].z);

        _frontCoordinates[6] = new BABYLON.Vector3(_frontCoordinates[0].x + t, _frontCoordinates[0].y, _frontCoordinates[0].z);
        _frontCoordinates[7] = new BABYLON.Vector3(_frontCoordinates[6].x, _frontCoordinates[6].y + L, _frontCoordinates[6].z);
        _frontCoordinates[8] = new BABYLON.Vector3(_frontCoordinates[7].x - B, _frontCoordinates[7].y, _frontCoordinates[7].z);
        _frontCoordinates[9] = new BABYLON.Vector3(_frontCoordinates[8].x, _frontCoordinates[8].y - D, _frontCoordinates[8].z);
        _frontCoordinates[10] = new BABYLON.Vector3(_frontCoordinates[9].x + B, _frontCoordinates[9].y, _frontCoordinates[9].z);
        _frontCoordinates[11] = new BABYLON.Vector3(_frontCoordinates[10].x, _frontCoordinates[10].y + L, _frontCoordinates[10].z);

        let mesh = new BABYLON.Mesh(name, scene);
        let normals = [];

        let vertexData = new BABYLON.VertexData();
        BABYLON.VertexData.ComputeNormals(positions, indices, normals, colors);

        vertexData.positions = positions;
        vertexData.indices = indices;
        vertexData.normals = normals;
        vertexData.uvs = uvs;
        vertexData.applyToMesh(mesh);

        return mesh;
    },
    ZSection(name, params, scene) {
        const {length, D, E, F, L, t, color="#E1E1E1"} = params;

        let positions = [], indices = [], colors = [], uvs = [];
        let _frontCoordinates = [], _backCoordinates = [];

        _frontCoordinates[0] = new BABYLON.Vector3(-F, (D/2 -L), 0);
        _frontCoordinates[1] = new BABYLON.Vector3(_frontCoordinates[0].x, _frontCoordinates[0].y + (L -t), _frontCoordinates[0].z);
        _frontCoordinates[2] = new BABYLON.Vector3(_frontCoordinates[1].x + (F - 2*t), _frontCoordinates[1].y , _frontCoordinates[1].z);
        _frontCoordinates[3] = new BABYLON.Vector3(_frontCoordinates[2].x, _frontCoordinates[2].y - (D - t), _frontCoordinates[2].z);
        _frontCoordinates[4] = new BABYLON.Vector3(_frontCoordinates[3].x + E, _frontCoordinates[3].y, _frontCoordinates[3].z);
        _frontCoordinates[5] = new BABYLON.Vector3(_frontCoordinates[4].x, _frontCoordinates[4].y + L, _frontCoordinates[4].z);

        _frontCoordinates[6] = new BABYLON.Vector3(_frontCoordinates[0].x - t, _frontCoordinates[0].y, _frontCoordinates[0].z);
        _frontCoordinates[7] = new BABYLON.Vector3(_frontCoordinates[6].x, _frontCoordinates[6].y + L, _frontCoordinates[6].z);
        _frontCoordinates[8] = new BABYLON.Vector3(_frontCoordinates[7].x + F, _frontCoordinates[7].y, _frontCoordinates[7].z);
        _frontCoordinates[9] = new BABYLON.Vector3(_frontCoordinates[8].x, _frontCoordinates[8].y - (D - t), _frontCoordinates[8].z);
        _frontCoordinates[10] = new BABYLON.Vector3(_frontCoordinates[9].x + (E - 2*t), _frontCoordinates[9].y, _frontCoordinates[9].z);
        _frontCoordinates[11] = new BABYLON.Vector3(_frontCoordinates[10].x, _frontCoordinates[10].y + (L - t), _frontCoordinates[10].z);

        for(let i = 0; i < _frontCoordinates.length; i++) {
            _backCoordinates[i] = new BABYLON.Vector3(_frontCoordinates[i].x, _frontCoordinates[i].y, _frontCoordinates[i].z + length);
        }

        for(let i = 0; i < _frontCoordinates.length; i++) {
            positions.push(_frontCoordinates[i].x, _frontCoordinates[i].y, _frontCoordinates[i].z);
            uvs.push(0.5, 0.5);
        }

        for(let i = 0; i < _backCoordinates.length; i++) {
            positions.push(_backCoordinates[i].x, _backCoordinates[i].y, _backCoordinates[i].z);
            uvs.push(0.5, 0.5);
        }    

        let mesh = new BABYLON.Mesh(name, scene);
        let normals = [];

        let vertexData = new BABYLON.VertexData();
        BABYLON.VertexData.ComputeNormals(positions, indices, normals, colors);

        vertexData.positions = positions;
        vertexData.indices = indices;
        vertexData.normals = normals;
        vertexData.uvs = uvs;
        vertexData.applyToMesh(mesh);

        return mesh;
    },
    TSSection(name, params, scene) {
        const {width, length, height, tLow, tHeight, thickness, color="#ACACA8"} = params;
        let tRise = (width - tHeight - 2*tLow)/2;
        let positions = [], indices = [], colors = [], uvs = [];
        let _frontCoordinates = [], _backCoordinates = [];

        _frontCoordinates[0] = new BABYLON.Vector3(-width/2, -height/2, 0);
        _frontCoordinates[1] = new BABYLON.Vector3(_frontCoordinates[0].x + tLow, _frontCoordinates[0].y, _frontCoordinates[0].z);
        _frontCoordinates[2] = new BABYLON.Vector3(_frontCoordinates[1].x + tRise, _frontCoordinates[1].y + height , _frontCoordinates[1].z);
        _frontCoordinates[3] = new BABYLON.Vector3(_frontCoordinates[2].x + tHeight, _frontCoordinates[2].y, _frontCoordinates[2].z);
        _frontCoordinates[4] = new BABYLON.Vector3(_frontCoordinates[3].x + tRise, _frontCoordinates[3].y - height, _frontCoordinates[3].z);
        _frontCoordinates[5] = new BABYLON.Vector3(_frontCoordinates[4].x + tLow, _frontCoordinates[4].y, _frontCoordinates[4].z);
 
        _frontCoordinates[6] = new BABYLON.Vector3(_frontCoordinates[0].x, _frontCoordinates[0].y + thickness, _frontCoordinates[0].z);
        _frontCoordinates[7] = new BABYLON.Vector3(_frontCoordinates[1].x - thickness, _frontCoordinates[1].y + thickness, _frontCoordinates[1].z);
        _frontCoordinates[8] = new BABYLON.Vector3(_frontCoordinates[2].x - thickness, _frontCoordinates[2].y + thickness, _frontCoordinates[2].z);
        _frontCoordinates[9] = new BABYLON.Vector3(_frontCoordinates[3].x + thickness, _frontCoordinates[3].y + thickness, _frontCoordinates[3].z);
        _frontCoordinates[10] = new BABYLON.Vector3(_frontCoordinates[4].x + thickness, _frontCoordinates[4].y + thickness, _frontCoordinates[4].z);
        _frontCoordinates[11] = new BABYLON.Vector3(_frontCoordinates[5].x, _frontCoordinates[5].y + thickness, _frontCoordinates[5].z);

        for(let i = 0; i < _frontCoordinates.length; i++) {
            _backCoordinates[i] = new BABYLON.Vector3(_frontCoordinates[i].x, _frontCoordinates[i].y, _frontCoordinates[i].z + length);
        }

        for(let i = 0; i < _frontCoordinates.length; i++) {
            positions.push(_frontCoordinates[i].x, _frontCoordinates[i].y, _frontCoordinates[i].z);
            uvs.push(0.5, 0.5);
        }

        for(let i = 0; i < _backCoordinates.length; i++) {
            positions.push(_backCoordinates[i].x, _backCoordinates[i].y, _backCoordinates[i].z);
            uvs.push(0.5, 0.5);
        }    

        // front side
        indices.push(
            0, 1, 7, 0, 7, 6,
            1, 2, 8, 1, 8, 7,
            2, 3, 9, 2, 9, 8,
            3, 4, 10, 3, 10, 9,
            4, 5, 11, 4, 11, 10
        );

        // inner side
        indices.push(
            2, 3, 15, 2, 15, 14,
        );

        // outer side
        indices.push(
            8, 9, 21, 8, 21, 20,
        );

        // left side
        indices.push(
            0, 6, 18, 0, 18, 12,
        ); 
        
        // right side
        indices.push(
            5, 11, 23, 5, 23, 17,
        );  

        // back side
        indices.push(
            12, 13, 19, 12, 19, 18,
            13, 14, 20, 13, 20, 19,
            14, 15, 21, 14, 21, 20,
            15, 16, 22, 15, 22, 21,
            16, 17, 23, 16, 23, 22
        );

        let mesh = new BABYLON.Mesh(name, scene);
        let normals = [];

        let vertexData = new BABYLON.VertexData();
        BABYLON.VertexData.ComputeNormals(positions, indices, normals, colors);

        vertexData.positions = positions;
        vertexData.indices = indices;
        vertexData.normals = normals;
        vertexData.uvs = uvs;
        vertexData.applyToMesh(mesh);

        return mesh;
    },
    ExtrudeCSection(name, params, scene) {
        let {L, W, depth, alpha, beta, color= "#838383"} = params; //C0C0C0

        let positions = [], indices = [], colors = [], uvs = [];
        let _mainCoordinates = [];

        _mainCoordinates[0] = new BABYLON.Vector3(0, 0, 0);
        _mainCoordinates[1] = new BABYLON.Vector3(_mainCoordinates[0].x + W, _mainCoordinates[0].y + W/Math.tan(beta), _mainCoordinates[0].z);
        _mainCoordinates[2] = new BABYLON.Vector3(_mainCoordinates[1].x, _mainCoordinates[1].y + (L - W/Math.tan(alpha) - W/Math.tan(beta)), _mainCoordinates[1].z);
        _mainCoordinates[3] = new BABYLON.Vector3(_mainCoordinates[2].x - W, _mainCoordinates[2].y + W/Math.tan(alpha), _mainCoordinates[2].z);

        for(let i = 0; i < _mainCoordinates.length; i++) {
            positions.push(_mainCoordinates[i].x, _mainCoordinates[i].y, _mainCoordinates[i].z);
            uvs.push(0, 0);
        }

        indices.push(
            0, 1, 2, 0, 2, 3
        );

        let mesh = new BABYLON.Mesh(name, scene);
        let normals = [];

        let vertexData = new BABYLON.VertexData();
        BABYLON.VertexData.ComputeNormals(positions, indices, normals, colors);

        vertexData.positions = positions;
        vertexData.indices = indices;
        vertexData.normals = normals;
        vertexData.uvs = uvs;

        vertexData.applyToMesh(mesh);

        return mesh;
    },
}

export default StramitLibrary;
