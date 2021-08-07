class Drawable extends Base {
  constructor(app) {
    super(app);
    this.name = '';
    this.tags = [];
    this.visible = true;
    this.viewportIndexes = [0];
    this.vertices = [];
    this.normals = [];
    this.textureCoords = [];
    this.position = [0.0, 0.0, 0.0];
    this.rotation = [0.0, 0.0, 0.0];
    this.scale = [1.0, 1.0, 1.0];
    this.vertexCount = 0;
  }

  update() {
    // virtual method called during update phase !
  }

  draw() {
    // virtual method called during draw phase !
  }

  setName(name) {
    this.name = name;
  }

  setVisible(visible) {
    this.visible = visible;
  }

  setViewportIndexes(viewportIndexes) {
    this.viewportIndexes = viewportIndexes;
  }

  setPosition(x, y, z) {
    this.position[0] = x;
    this.position[1] = y;
    this.position[2] = z;
  }

  setRotation(x, y, z) {
    this.rotation[0] = x;
    this.rotation[1] = y;
    this.rotation[2] = z;
  }

  setScale(x, y, z) {
    this.scale[0] = x;
    this.scale[1] = y;
    this.scale[2] = z;
  }

  getName() {
    return this.name;
  }

  getVisible() {
    return this.visible;
  }

  getViewportIndexes() {
    return this.viewportIndexes;
  }

  hasViewport(viewportIndex) {
    return this.viewportIndexes.includes(viewportIndex);
  }

  getVertexCount() {
    return this.vertexCount;
  }

  getVertices() {
    return this.vertices;
  }

  getNormals() {
    return this.normals;
  }

  getTextureCoords() {
    return this.textureCoords;
  }

  getPosition() {
    return this.position;
  }

  getRotation() {
    return this.rotation;
  }

  getScale() {
    return this.scale;
  }

  getModelMatrix() {
    let matrix = Mat4.identity();
    matrix = Mat4.multiply(matrix, Mat4.translate(this.position[0], this.position[1], this.position[2]));
    matrix = Mat4.multiply(matrix, Mat4.rotateX(this.rotation[0])); // x -> y -> z
    matrix = Mat4.multiply(matrix, Mat4.rotateY(this.rotation[1]));
    matrix = Mat4.multiply(matrix, Mat4.rotateZ(this.rotation[2]));
    matrix = Mat4.multiply(matrix, Mat4.scale(this.scale[0], this.scale[1], this.scale[2]));
    return matrix;
  }

  addTag(tag) {
    this.tags.push(tag);
  }

  removeTag(tag) {
    this.tags.splice(this.tags.indexOf(tag), 1);
  }

  hasTag(tag) {
    return this.tags.includes(tag);
  }

  clearTags() {
    this.tags = [];
  }

  defineVertice(x, y, z) {
    this.vertexCount++;
    this.vertices.push(x, y, z);
  }

  defineNormal(x, y, z) {
    this.normals.push(x, y, z);
  }

  defineTextureCoord(u, v) {
    this.textureCoords.push(u, v);
  }

  clearVertices() {
    this.vertices = [];
    this.vertexCount = 0;
  }

  clearNormals() {
    this.normals = [];
  }

  clearTextureCoords() {
    this.textureCoords = [];
  }
}