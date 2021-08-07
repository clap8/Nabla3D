let fs = require('fs');
main(process.argv.slice(2));

function main(argv) {
  let sourceFilename = argv[0];
  if (!sourceFilename) {
    throw new Error('Source filename obj missing !');
  }

  let targetFilename = argv[1];
  if (!targetFilename) {
    throw new Error('Target filename missing !');
  }

  let data = readOBJFile(sourceFilename);
  if (data.vertices.length == 0 || data.faces.length == 0) {
    throw new Error('Data empty from source file  !');
  }

  writeMAPFile(targetFilename, data);
  console.log('Fichier de sortie généré : ' + targetFilename);
}

function readOBJFile(filename) {
  let vertices = [[0, 0, 0]];
  let normals = [[0, 0, 0]];
  let textureCoords = [[0, 0]];
  let faces = [];

  // Parse sourceFile and store data in program.
  let data = fs.readFileSync(filename, 'ascii');
  let lines = data.split('\n');
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line === '' || line.startsWith('#')) {
      continue;
    }
    let m = /(\w*)(?: )*(.*)/.exec(line);
    if (!m) {
      continue;
    }

    let parts = line.split(/\s+/);
    let command = parts[0];
    let commandArgs = parts.slice(1);

    if (command == 'v') {
      if (commandArgs.length != 3) {
        throw new Error('Vertex command parser only support three components');
      }

      vertices.push(commandArgs.map(parseFloat));
    }
    else if (command == 'vn') {
      if (commandArgs.length != 3) {
        throw new Error('Normal command parser only support three components');
      }

      normals.push(commandArgs.map(parseFloat));
    }
    else if (command == 'vt') {
      if (commandArgs.length != 2) {
        throw new Error('Texture command parser only support two components');
      }

      textureCoords.push(commandArgs.map(parseFloat));
    }
    else if (command == 'f') {
      if (commandArgs.length != 3) {
        throw new Error('Face command parser only support three vertices group (triangulate face)');
      }

      let face = {};
      face.v = [];
      face.vt = [];
      face.vn = [];
      for (let commandArg of commandArgs) {
        let indexes = commandArg.split('/');
        if (indexes[0]) {
          let v = parseInt(indexes[0]);
          face.v.push(v);
        }
        if (indexes[1]) {
          let vt = parseInt(indexes[1]);
          face.vt.push(vt);
        }
        if (indexes[2]) {
          let vn = parseInt(indexes[2]);
          face.vn.push(vn);
        }
      }

      faces.push(face);
    }
  }

  return {
    vertices: vertices,
    textureCoords: textureCoords,
    normals: normals,
    faces: faces
  };
}

function writeMAPFile(filename, data) {
  fs.writeFileSync(filename, JSON.stringify({
    'Vertices': data.vertices.slice(1, data.vertices.length),
    'TextureCoords': data.textureCoords.slice(1, data.textureCoords.length),
    'Normals': data.normals.slice(1, data.normals.length),    
    'Faces': data.faces.slice(0, data.faces.length).map((face) => {
      return {
        'VertexIndices': [face.v[0] - 1, face.v[1] - 1, face.v[2] - 1],
        'TextureIndices': [face.vt[0] - 1, face.vt[1] - 1, face.vt[2] - 1],
        'NormalIndices': [face.vn[0] - 1, face.vn[1] - 1, face.vn[2] - 1]
      };
    }),
    'Texture': 'Atlas.png'
  }));
}