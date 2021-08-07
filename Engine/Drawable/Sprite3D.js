class Sprite3D extends Drawable {
  constructor(app) {
    super(app);
    this.texture = new Texture(app);
    this.frames = [];
    this.animations = [];
    this.currentAnimationName = '';
    this.currentAnimationFrameIndex = 0;
    this.isLooped = false;
    this.timeElapsed = 0;
  }

  update() {
    let currentAnimation = this.animations.find(animation => animation.name == this.currentAnimationName);
    if (!currentAnimation) {
      return;
    }

    let currentFrame = this.frames.find(frame => frame.name == currentAnimation.frames[this.currentAnimationFrameIndex]);
    if (!currentFrame) {
      return;
    }

    this.clearVertices();
    this.clearTextureCoords();

    let max = Math.max(currentFrame.width, currentFrame.height);
    let normHalfX = (currentFrame.width / max) / 2;
    let normHalfY = (currentFrame.height / max) / 2;
    this.defineVertice(-normHalfX, +normHalfY, 0);
    this.defineVertice(-normHalfX, -normHalfY, 0);
    this.defineVertice(+normHalfX, -normHalfY, 0);
    this.defineVertice(+normHalfX, -normHalfY, 0);
    this.defineVertice(+normHalfX, +normHalfY, 0);
    this.defineVertice(-normHalfX, +normHalfY, 0);

    let ux = (currentFrame.x / this.texture.width);
    let uy = (currentFrame.y / this.texture.height);
    let vx = (currentFrame.x + currentFrame.width) / this.texture.width;
    let vy = (currentFrame.y + currentFrame.height) / this.texture.height;
    this.defineTextureCoord(ux, uy);
    this.defineTextureCoord(ux, vy);
    this.defineTextureCoord(vx, vy);
    this.defineTextureCoord(vx, vy);
    this.defineTextureCoord(vx, uy);
    this.defineTextureCoord(ux, uy);

    if (this.timeElapsed >= currentAnimation.frameDuration) {
      if (this.currentAnimationFrameIndex == currentAnimation.frames.length - 1) {
        this.currentAnimationFrameIndex = this.isLooped ? 0 : currentAnimation.frames.length - 1;
        this.timeElapsed = 0;
      }
      else {
        this.currentAnimationFrameIndex = this.currentAnimationFrameIndex + 1;
        this.timeElapsed = 0;
      }      
    }
    else {
      this.timeElapsed += this.app.getTimeStep();
    }
  }

  draw() {
    let gm = this.app.getGraphicsManager();
    gm.drawMesh(this.getModelMatrix(), this.vertexCount, this.vertices, this.textureCoords, null, this.texture);
  }

  play(animationName, isLooped) {
    let animation = this.animations.find(animation => animation.name == animationName);
    if (!animation) {
      throw new Error('Sprite3D::play: animation not found.');
    }

    this.currentAnimationName = animationName;
    this.currentAnimationFrameIndex = 0;
    this.isLooped = isLooped;
    this.timeElapsed = 0;
  }

  loadFromFile(path) {
    let json = JSON.parse(Filesystem.readFile(path));
    if (!json.hasOwnProperty('ImageFile')) {
      throw new Error('Sprite3D::loadFromFile(): Missing "ImageFile" property');
    }

    this.texture.loadFromFile(json['ImageFile']);

    this.frames = [];
    for (let obj of json['Frames']) {
      let frame = {};
      frame.name = obj['Name'];
      frame.x = obj['X'];
      frame.y = obj['Y'];
      frame.width = obj['Width'];
      frame.height = obj['Height'];
      this.frames.push(frame);
    }

    this.animations = [];
    for (let obj of json['Animations']) {
      let animation = {};
      animation.name = obj['Name'];
      animation.frames = obj['Frames'];
      animation.frameDuration = parseInt(obj['FrameDuration']);
      this.animations.push(animation);
    }

    this.currentAnimationName = '';
    this.currentAnimationIndex = 0;
    this.timeElapsed = 0;
  }
}