class Trigger extends Drawable {
  constructor(app) {
    super(app);
    this.radius = 1;
    this.height = 1;
    this.onEnter = '';
    this.onLeave = '';
    this.onActionKey = '';
    this.vaabc = new BoundingCylinder(0, 0, 0, this.radius, this.height);
  }

  draw() {
    let gm = this.app.getGraphicsManager();
    gm.drawDebugBoundingCylinder(this.getModelMatrix(), this.vaabc, 8, [0, 0, 1]);
  }

  setRadius(radius) {
    this.radius = radius;
    this.vaabc = new BoundingCylinder(0, 0, 0, this.radius, this.height);
  }

  setHeight(height) {
    this.height = height;
    this.vaabc = new BoundingCylinder(0, 0, 0, this.radius, this.height);
  }

  setOnEnter(onEnter) {
    this.onEnter = onEnter;
  }

  setOnLeave(onLeave) {
    this.onLeave = onLeave;
  }

  setOnActionKey(onActionKey) {
    this.onActionKey = onActionKey;
  }

  getOnEnter() {
    return this.onEnter;
  }

  getOnLeave() {
    return this.onLeave;
  }

  getOnActionKey() {
    return this.onActionKey;
  }

  getModelBoundingCylinder() {
    return this.vaabc;
  }

  getBoundingCylinder() {
    return this.vaabc.transform(this.position[0], this.position[1], this.position[2], this.scale[0], this.scale[1], this.scale[2]);
  }
}