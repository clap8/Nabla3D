class Spawn extends Drawable {
  constructor(app) {
    super(app);
    this.direction = Vec2.create(0, 0);
    this.radius = 1;
  }

  draw() {
    let gm = this.app.getGraphicsManager();
    gm.drawDebugSphere(this.getModelMatrix(), this.radius, 2, [1, 0, 1]);
  }

  setDirection(direction) {
    this.direction = direction;
  }

  setRadius(radius) {
    this.radius = radius;
  }

  getDirection() {
    return this.direction;
  }

  getRadius() {
    return this.radius;
  }
}