class Mover extends Drawable {
  constructor(app) {
    super(app);
    this.points = [];
    this.speed = 1;
    this.drawable = null;
    this.currentPointIndex = 0;
  }

  draw() {
    let gm = this.app.getGraphicsManager();
    gm.drawDebugLines(this.getModelMatrix(), this.vertexCount, this.vertices, [0.0, 1.0, 0.0]);
  }

  update() {
    if (this.points.length < 2) {
      return;
    }
    if (!this.drawable) {
      return;
    }
    if (this.currentPointIndex == 0) {
      return;
    }

    let direction = Vec3.substract(this.points[this.currentPointIndex], this.drawable.position);
    let translation = Vec3.scale(Vec3.normalize(direction), this.speed * this.app.getTimeStepAsSeconds());
    let nextPosition = Vec3.add(this.drawable.position, translation);
    this.drawable.setPosition(nextPosition[0], nextPosition[1], nextPosition[2]);
    this.drawable.setRotation(0, Vec2.atan2abs([direction[0], direction[2]]), 0);

    if (Vec3.length(direction) < 0.1) {
      if (this.currentPointIndex == this.points.length - 1) {
        if (Vec3.isEqual(this.points[this.currentPointIndex], this.points[0])) {
          this.currentPointIndex = 1;
          this.drawable.setPosition(this.points[0][0], this.points[0][1], this.points[0][2]);
        }
        else {
          this.currentPointIndex = 0;
          this.emit('E_DESTINATION_REACHED');
        }
      }
      else {
        this.currentPointIndex = this.currentPointIndex + 1;
      }
    }
  }

  setPoints(points) {
    this.clearVertices();
    for (let i = 1; i < points.length; i++) {
      this.defineVertice(points[i - 1][0], points[i - 1][1], points[i - 1][2]);
      this.defineVertice(points[i][0], points[i][1], points[i][2]);
    }

    this.points = points;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setDrawable(drawable) {
    this.drawable = drawable;
  }

  play() {
    if (this.points.length < 2) {
      throw new Error('Mover::play: points is not defined.');
    }
    if (!this.drawable) {
      throw new Error('Mover::play: drawable is not defined.');
    }

    this.drawable.setPosition(this.points[0][0], this.points[0][1], this.points[0][2]);
    this.currentPointIndex = 1;
  }
}