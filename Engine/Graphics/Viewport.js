class Viewport extends Base {
  constructor(app, x, y, width, height) {
    super(app);
    this.graphicsManager = this.app.getGraphicsManager();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.backgroundColor = [0.0, 0.0, 0.0, 1.0];
    this.cameraMatrix = Mat4.identity();
    this.projectionMode = 'PROJECTION_PERSPECTIVE';
    this.perspectiveFovy = Math.PI / 4;
    this.perspectiveNear = 2;
    this.perspectiveFar = 2000;
    this.orthographicDepth = 700;
  }

  setBackgroundColor(r, g, b, a) {
    this.backgroundColor[0] = r;
    this.backgroundColor[1] = g;
    this.backgroundColor[2] = b;
    this.backgroundColor[3] = a;
  }

  setCameraMatrix(cameraMatrix) {
    this.cameraMatrix = cameraMatrix;
  }

  setProjectionMode(projectionMode) {
    this.projectionMode = projectionMode;
  }

  setPerspectiveFovy(perspectiveFovy) {
    this.perspectiveFovy = perspectiveFovy;
  }

  setPerspectiveNear(perspectiveNear) {
    this.perspectiveNear = perspectiveNear;
  }

  setPerspectiveFar(perspectiveFar) {
    this.perspectiveFar = perspectiveFar;
  }

  setOrthographicDepth(orthographicDepth) {
    this.orthographicDepth = orthographicDepth;
  }

  getCameraMatrix() {
    return this.cameraMatrix.slice();
  }

  getCameraViewMatrix() {
    return Mat4.invert(this.cameraMatrix);
  }

  getProjectionMatrix() {
    let screenRect = this.getScreenRect();
    if (this.projectionMode == 'PROJECTION_ORTHOGRAPHIC') {
      return Mat4.orthographic(screenRect.width, screenRect.height, this.orthographicDepth);
    }
    else {
      return Mat4.perspective(this.perspectiveFovy, screenRect.width / screenRect.height, this.perspectiveNear, this.perspectiveFar);
    }
  }

  getScreenRect() {
    return {
      x: this.graphicsManager.getWidth() * this.x,
      y: this.graphicsManager.getHeight() * this.y,
      width: this.graphicsManager.getWidth() * this.width,
      height: this.graphicsManager.getHeight() * this.height
    }
  }
}