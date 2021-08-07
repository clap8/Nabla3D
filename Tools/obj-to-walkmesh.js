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

  writeWLKFile(targetFilename, data);
  console.log('Fichier de sortie généré : ' + targetFilename);
}

function readOBJFile(filename) {
  let vertices = [[0, 0, 0]];
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
    else if (command == 'f') {
      if (commandArgs.length != 3) {
        throw new Error('Face command parser only support three vertices group (triangulate face)');
      }

      let face = [];
      face.push(parseInt(commandArgs[0]));
      face.push(parseInt(commandArgs[1]));
      face.push(parseInt(commandArgs[2]));
      faces.push(face);
    }
  }

  return {
    vertices: vertices,
    faces: faces
  };
}

function writeWLKFile(filename, data) {
  fs.writeFileSync(filename, JSON.stringify({
    'Vertices': data.vertices.slice(1, data.vertices.length),
    'Sectors': data.faces.slice(0, data.faces.length).map((face, index) => {
      return {
        'Id': index,
        'VertexIndices': [face[0] - 1, face[1] - 1, face[2] - 1],
      };
    })
  }));
}