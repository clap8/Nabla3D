class Serializer {
  static fromFile(object, path) {
    let json = JSON.parse(Filesystem.readFile(path));
    Serializer.fromJSON(object, json);
  }

	static fromJSON(object, json) {
    return object.fromJSON(json);
  }

	static toJSON(object) {
    return object.toJSON();
  }
};