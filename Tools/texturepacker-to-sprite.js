let fs = require('fs');
main(process.argv.slice(2));

function main(argv) {
  let sourceFilename = argv[0];
  if (!sourceFilename) {
    throw new Error('Source filename texture packer json file missing !');
  }

  let targetFilename = argv[1];
  if (!targetFilename) {
    throw new Error('Target filename missing !');
  }

  writeSpriteFile(targetFilename, readTexturePackerFile(sourceFilename));
  console.log('Fichier de sortie généré : ' + targetFilename);
}

function readTexturePackerFile(filename) {
  return JSON.parse(fs.readFileSync(filename, 'ascii'));
}

function writeSpriteFile(filename, data) {
  fs.writeFileSync(filename, JSON.stringify({
    'ImageFile': data['meta']['image'],
    'Frames': data['frames'].map((obj) => {
      return {
        'Name': obj['filename'],
        'X': obj['frame']['x'],
        'Y': obj['frame']['y'],
        'Width': obj['frame']['w'],
        'Height': obj['frame']['h'],
      }
    }),
    'Animations': []
  }));
}