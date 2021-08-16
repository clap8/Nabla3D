class Mesh extends Drawable {
  constructor(app) {
    super(app);
    this.texture = new Texture(app);
    this.aabb = new BoundingBox();
  }

  draw() {
    let gm = this.app.getGraphicsManager();
    gm.drawMesh(this.getModelMatrix(), this.vertexCount, this.vertices, this.textureCoords, this.normals, this.texture);
    gm.drawDebugBoundingBox(this.getModelMatrix(), this.aabb, [1.0, 1.0, 0.0]);
  }

  loadFromFile(path) {
    let json = JSON.parse(Filesystem.readFile(path));

    this.clearVertices();
    this.clearNormals();
    this.clearTextureCoords();

    for (let obj of json['Faces']) {
      for (let vertexIndice of obj['VertexIndices']) {
        let vx = json['Vertices'][vertexIndice][0];
        let vy = json['Vertices'][vertexIndice][1];
        let vz = json['Vertices'][vertexIndice][2];
        this.defineVertice(vx, vy, vz);
      }

      for (let normalIndice of obj['NormalIndices']) {
        let nx = json['Normals'][normalIndice][0];
        let ny = json['Normals'][normalIndice][1];
        let nz = json['Normals'][normalIndice][2];
        this.defineNormal(nx, ny, nz);
      }

      for (let textureIndice of obj['TextureIndices']) {
        let tu = json['TextureCoords'][textureIndice][0];
        let tv = json['TextureCoords'][textureIndice][1];
        this.defineTextureCoord(tu, tv);
      }
    }

    if (json['TextureFile']) {
      this.texture.loadFromFile(json['TextureFile']);
    }

    this.aabb = BoundingBox.createFromVertices(this.vertices);
  }

  getModelBoundingBox() {
    return this.aabb;
  }

  getBoundingBox() {
    return this.aabb.transform(this.getModelMatrix());
  }
}