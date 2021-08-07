let fs = require('fs');

class Filesystem {
  static readFile(path, encoding) {
    return fs.readFileSync(path, { encoding: encoding });
  }

  static readFileAsBlob(path, type) {
    let data = fs.readFileSync(path);
    let arraybuffer = Uint8Array.from(data).buffer;
    let pathParts = path.split('.');
    let extension = pathParts[pathParts.length - 1];

    return new Blob([arraybuffer], { type: type + '/' + extension });
  }

  static writeFile(path, data, encoding) {
    fs.writeFileSync(path, data, { encoding: encoding });
  }

  static deleteFile(path) {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
    else {
      throw new Error('Filesystem::deleteFile(): The file ' + path + ' doesn\'t exist, cannot delete')
    }
  }

  static isFile(path) {
    return fs.statSync(path).isFile();
  }

  static isDirectory(path) {
    return fs.statSync(path).isDirectory();
  }
}