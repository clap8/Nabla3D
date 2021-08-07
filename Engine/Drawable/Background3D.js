class Background3D extends Drawable {
  constructor(app) {
    super(app);
    this.texture = new Texture(app);
  }

  draw() {
    let gm = this.app.getGraphicsManager();
    gm.drawMesh(this.getModelMatrix(), this.vertexCount, this.vertices, this.textureCoords, null, this.texture);
  }

  loadFromFile(path) {
    this.texture.loadFromFile(path);

    this.clearVertices();
    this.clearTextureCoords();

    let max = Math.max(this.texture.width, this.texture.height);
    let normHalfX = (this.texture.width / max) / 2;
    let normHalfY = (this.texture.height / max) / 2;
    this.defineVertice(-normHalfX, +normHalfY, 0);
    this.defineVertice(-normHalfX, -normHalfY, 0);
    this.defineVertice(+normHalfX, -normHalfY, 0);
    this.defineVertice(+normHalfX, -normHalfY, 0);
    this.defineVertice(+normHalfX, +normHalfY, 0);
    this.defineVertice(-normHalfX, +normHalfY, 0);

    this.defineTextureCoord(0, 0);
    this.defineTextureCoord(0, 1);
    this.defineTextureCoord(1, 1);
    this.defineTextureCoord(1, 1);
    this.defineTextureCoord(1, 0);
    this.defineTextureCoord(0, 0);
  }
}