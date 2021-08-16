class Box extends Drawable {
  constructor(app) {
    super(app);
    this.texture = new Texture(app);

    this.defineVertice(-1,  1,  1);
    this.defineVertice(-1, -1,  1);
    this.defineVertice( 1, -1,  1);
    this.defineVertice(-1,  1,  1);
    this.defineVertice( 1, -1,  1);
    this.defineVertice( 1,  1,  1);
    this.defineVertice(-1,  1,  1);
    this.defineVertice( 1,  1,  1);
    this.defineVertice( 1,  1, -1);
    this.defineVertice(-1,  1,  1);
    this.defineVertice( 1,  1, -1);
    this.defineVertice(-1,  1, -1);
    this.defineVertice( 1,  1,  1);
    this.defineVertice( 1, -1,  1);
    this.defineVertice( 1, -1, -1);
    this.defineVertice( 1,  1,  1);
    this.defineVertice( 1, -1, -1);
    this.defineVertice( 1,  1, -1);
    this.defineVertice(-1,  1,  1);
    this.defineVertice(-1, -1, -1);
    this.defineVertice(-1, -1,  1);
    this.defineVertice(-1,  1,  1);
    this.defineVertice(-1,  1, -1);
    this.defineVertice(-1, -1, -1);
    this.defineVertice(-1, -1,  1);
    this.defineVertice(-1, -1, -1);
    this.defineVertice( 1, -1, -1);
    this.defineVertice(-1, -1,  1);
    this.defineVertice( 1, -1, -1);
    this.defineVertice( 1, -1,  1);
    this.defineVertice(-1,  1, -1);
    this.defineVertice( 1, -1, -1);
    this.defineVertice(-1, -1, -1);
    this.defineVertice(-1,  1, -1);
    this.defineVertice( 1,  1, -1);
    this.defineVertice( 1, -1, -1);
  }

  draw() {
    let gm = this.app.getGraphicsManager();
    gm.drawMesh(this.getModelMatrix(), this.vertexCount, this.vertices, null, null, this.texture);
  }
}