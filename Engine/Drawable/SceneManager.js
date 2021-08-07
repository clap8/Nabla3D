class SceneManager extends Base {
  constructor(app) {
    super(app);
    this.graphicsManager = this.app.getGraphicsManager();
    this.drawables = [];
  }

  update() {
    for (let drawable of this.drawables) {
      drawable.update();
    }

    for (let i = 0; i < this.graphicsManager.getNumViewports(); i++) {
      this.graphicsManager.clearViewport(i);
      for (let drawable of this.drawables) {
        if (!drawable.visible) continue;
        if (!drawable.hasViewport(i)) continue;
        drawable.draw(i);
      }
    }
  }

  addDrawable(drawable) {
    this.drawables.push(drawable);
  }

  removeDrawable(drawable) {
    this.drawables.splice(this.drawables.indexOf(drawable), 1);
  }

  removeDrawableBy(cb) {
    let removed = [];
    for (let drawable of this.drawables) {
      if (cb && cb(drawable)) {
        removed.push(drawable);
        this.drawables.splice(this.drawables.indexOf(drawable), 1);
      }
    }

    return removed;
  }

  findByName(name) {
    return this.drawables.find(drawable => drawable.getName() == name);
  }

  findByTag(tag) {
    return this.drawables.find(drawable => drawable.hasTag(tag));
  }

  findBy(cb) {
    let matching = [];
    for (let drawable of this.drawables) {
      if (cb && cb(drawable)) {
        matching.push(drawable);
      }
    }

    return matching;
  }

  clear() {
    this.drawables = [];
  }
}