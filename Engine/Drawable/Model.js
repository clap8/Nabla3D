const MD2_ANORMS = [
  [-0.525731, 0.000000, 0.850651],
  [-0.442863, 0.238856, 0.864188],
  [-0.295242, 0.000000, 0.955423],
  [-0.309017, 0.500000, 0.809017],
  [-0.162460, 0.262866, 0.951056],
  [0.000000, 0.000000, 1.000000],
  [0.000000, 0.850651, 0.525731],
  [-0.147621, 0.716567, 0.681718],
  [0.147621, 0.716567, 0.681718],
  [0.000000, 0.525731, 0.850651],
  [0.309017, 0.500000, 0.809017],
  [0.525731, 0.000000, 0.850651],
  [0.295242, 0.000000, 0.955423],
  [0.442863, 0.238856, 0.864188],
  [0.162460, 0.262866, 0.951056],
  [-0.681718, 0.147621, 0.716567],
  [-0.809017, 0.309017, 0.500000],
  [-0.587785, 0.425325, 0.688191],
  [-0.850651, 0.525731, 0.000000],
  [-0.864188, 0.442863, 0.238856],
  [-0.716567, 0.681718, 0.147621],
  [-0.688191, 0.587785, 0.425325],
  [-0.500000, 0.809017, 0.309017],
  [-0.238856, 0.864188, 0.442863],
  [-0.425325, 0.688191, 0.587785],
  [-0.716567, 0.681718, -0.147621],
  [-0.500000, 0.809017, -0.309017],
  [-0.525731, 0.850651, 0.000000],
  [0.000000, 0.850651, -0.525731],
  [-0.238856, 0.864188, -0.442863],
  [0.000000, 0.955423, -0.295242],
  [-0.262866, 0.951056, -0.162460],
  [0.000000, 1.000000, 0.000000],
  [0.000000, 0.955423, 0.295242],
  [-0.262866, 0.951056, 0.162460],
  [0.238856, 0.864188, 0.442863],
  [0.262866, 0.951056, 0.162460],
  [0.500000, 0.809017, 0.309017],
  [0.238856, 0.864188, -0.442863],
  [0.262866, 0.951056, -0.162460],
  [0.500000, 0.809017, -0.309017],
  [0.850651, 0.525731, 0.000000],
  [0.716567, 0.681718, 0.147621],
  [0.716567, 0.681718, -0.147621],
  [0.525731, 0.850651, 0.000000],
  [0.425325, 0.688191, 0.587785],
  [0.864188, 0.442863, 0.238856],
  [0.688191, 0.587785, 0.425325],
  [0.809017, 0.309017, 0.500000],
  [0.681718, 0.147621, 0.716567],
  [0.587785, 0.425325, 0.688191],
  [0.955423, 0.295242, 0.000000],
  [1.000000, 0.000000, 0.000000],
  [0.951056, 0.162460, 0.262866],
  [0.850651, -0.525731, 0.000000],
  [0.955423, -0.295242, 0.000000],
  [0.864188, -0.442863, 0.238856],
  [0.951056, -0.162460, 0.262866],
  [0.809017, -0.309017, 0.500000],
  [0.681718, -0.147621, 0.716567],
  [0.850651, 0.000000, 0.525731],
  [0.864188, 0.442863, -0.238856],
  [0.809017, 0.309017, -0.500000],
  [0.951056, 0.162460, -0.262866],
  [0.525731, 0.000000, -0.850651],
  [0.681718, 0.147621, -0.716567],
  [0.681718, -0.147621, -0.716567],
  [0.850651, 0.000000, -0.525731],
  [0.809017, -0.309017, -0.500000],
  [0.864188, -0.442863, -0.238856],
  [0.951056, -0.162460, -0.262866],
  [0.147621, 0.716567, -0.681718],
  [0.309017, 0.500000, -0.809017],
  [0.425325, 0.688191, -0.587785],
  [0.442863, 0.238856, -0.864188],
  [0.587785, 0.425325, -0.688191],
  [0.688191, 0.587785, -0.425325],
  [-0.147621, 0.716567, -0.681718],
  [-0.309017, 0.500000, -0.809017],
  [0.000000, 0.525731, -0.850651],
  [-0.525731, 0.000000, -0.850651],
  [-0.442863, 0.238856, -0.864188],
  [-0.295242, 0.000000, -0.955423],
  [-0.162460, 0.262866, -0.951056],
  [0.000000, 0.000000, -1.000000],
  [0.295242, 0.000000, -0.955423],
  [0.162460, 0.262866, -0.951056],
  [-0.442863, -0.238856, -0.864188],
  [-0.309017, -0.500000, -0.809017],
  [-0.162460, -0.262866, -0.951056],
  [0.000000, -0.850651, -0.525731],
  [-0.147621, -0.716567, -0.681718],
  [0.147621, -0.716567, -0.681718],
  [0.000000, -0.525731, -0.850651],
  [0.309017, -0.500000, -0.809017],
  [0.442863, -0.238856, -0.864188],
  [0.162460, -0.262866, -0.951056],
  [0.238856, -0.864188, -0.442863],
  [0.500000, -0.809017, -0.309017],
  [0.425325, -0.688191, -0.587785],
  [0.716567, -0.681718, -0.147621],
  [0.688191, -0.587785, -0.425325],
  [0.587785, -0.425325, -0.688191],
  [0.000000, -0.955423, -0.295242],
  [0.000000, -1.000000, 0.000000],
  [0.262866, -0.951056, -0.162460],
  [0.000000, -0.850651, 0.525731],
  [0.000000, -0.955423, 0.295242],
  [0.238856, -0.864188, 0.442863],
  [0.262866, -0.951056, 0.162460],
  [0.500000, -0.809017, 0.309017],
  [0.716567, -0.681718, 0.147621],
  [0.525731, -0.850651, 0.000000],
  [-0.238856, -0.864188, -0.442863],
  [-0.500000, -0.809017, -0.309017],
  [-0.262866, -0.951056, -0.162460],
  [-0.850651, -0.525731, 0.000000],
  [-0.716567, -0.681718, -0.147621],
  [-0.716567, -0.681718, 0.147621],
  [-0.525731, -0.850651, 0.000000],
  [-0.500000, -0.809017, 0.309017],
  [-0.238856, -0.864188, 0.442863],
  [-0.262866, -0.951056, 0.162460],
  [-0.864188, -0.442863, 0.238856],
  [-0.809017, -0.309017, 0.500000],
  [-0.688191, -0.587785, 0.425325],
  [-0.681718, -0.147621, 0.716567],
  [-0.442863, -0.238856, 0.864188],
  [-0.587785, -0.425325, 0.688191],
  [-0.309017, -0.500000, 0.809017],
  [-0.147621, -0.716567, 0.681718],
  [-0.425325, -0.688191, 0.587785],
  [-0.162460, -0.262866, 0.951056],
  [0.442863, -0.238856, 0.864188],
  [0.162460, -0.262866, 0.951056],
  [0.309017, -0.500000, 0.809017],
  [0.147621, -0.716567, 0.681718],
  [0.000000, -0.525731, 0.850651],
  [0.425325, -0.688191, 0.587785],
  [0.587785, -0.425325, 0.688191],
  [0.688191, -0.587785, 0.425325],
  [-0.955423, 0.295242, 0.000000],
  [-0.951056, 0.162460, 0.262866],
  [-1.000000, 0.000000, 0.000000],
  [-0.850651, 0.000000, 0.525731],
  [-0.955423, -0.295242, 0.000000],
  [-0.951056, -0.162460, 0.262866],
  [-0.864188, 0.442863, -0.238856],
  [-0.951056, 0.162460, -0.262866],
  [-0.809017, 0.309017, -0.500000],
  [-0.864188, -0.442863, -0.238856],
  [-0.951056, -0.162460, -0.262866],
  [-0.809017, -0.309017, -0.500000],
  [-0.681718, 0.147621, -0.716567],
  [-0.681718, -0.147621, -0.716567],
  [-0.850651, 0.000000, -0.525731],
  [-0.688191, 0.587785, -0.425325],
  [-0.587785, 0.425325, -0.688191],
  [-0.425325, 0.688191, -0.587785],
  [-0.425325, -0.688191, -0.587785],
  [-0.587785, -0.425325, -0.688191],
  [-0.688191, -0.587785, -0.425325]
];

class Model extends Drawable {
  constructor(app) {
    super(app);
    this.onEnter = '';
    this.onLeave = '';
    this.onActionKey = '';
    this.verticesFrames = [];
    this.normalsFrames = [];
    this.textureCoordsFrames = [];
    this.texture = new Texture(app);
    this.animations = [];
    this.vaabc = new BoundingCylinder();
    this.currentAnimationName = '';
    this.isLooped = true;
    this.currentFrame = 0;
    this.frameProgress = 0;
  }

  update() {
    let currentAnimation = this.animations.find(animation => animation.name == this.currentAnimationName);
    if (!currentAnimation) {
      return;
    }

    this.clearVertices();
    this.clearNormals();
    this.clearTextureCoords();

    let interpolateFactor = this.frameProgress / currentAnimation.frameDuration;
    let nextFrame = 0;
    if (this.currentFrame == currentAnimation.endFrame) {
      nextFrame = this.isLooped ? currentAnimation.startFrame : currentAnimation.endFrame;
    }
    else {
      nextFrame = this.currentFrame + 1;
    }

    for (let i = 0; i < this.verticesFrames[this.currentFrame].length; i += 3) {
      let vax = this.verticesFrames[this.currentFrame][i + 0];
      let vay = this.verticesFrames[this.currentFrame][i + 1];
      let vaz = this.verticesFrames[this.currentFrame][i + 2];
      let vbx = this.verticesFrames[nextFrame][i + 0];
      let vby = this.verticesFrames[nextFrame][i + 1];
      let vbz = this.verticesFrames[nextFrame][i + 2];

      let vx = vax + ((vbx - vax) * interpolateFactor);
      let vy = vay + ((vby - vay) * interpolateFactor);
      let vz = vaz + ((vbz - vaz) * interpolateFactor);
      this.defineVertice(vx, vy, vz);
    }

    for (let i = 0; i < this.normalsFrames[this.currentFrame].length; i += 3) {
      let nax = this.normalsFrames[this.currentFrame][i + 0];
      let nay = this.normalsFrames[this.currentFrame][i + 1];
      let naz = this.normalsFrames[this.currentFrame][i + 2];
      let nbx = this.normalsFrames[nextFrame][i + 0];
      let nby = this.normalsFrames[nextFrame][i + 1];
      let nbz = this.normalsFrames[nextFrame][i + 2];

      let nx = nax + ((nbx - nax) * interpolateFactor);
      let ny = nay + ((nby - nay) * interpolateFactor);
      let nz = naz + ((nbz - naz) * interpolateFactor);
      this.defineNormal(nx, ny, nz);
    }

    for (let i = 0; i < this.textureCoordsFrames[this.currentFrame].length; i += 2) {
      let tu = this.textureCoordsFrames[this.currentFrame][i + 0];
      let tv = this.textureCoordsFrames[this.currentFrame][i + 1];
      this.defineTextureCoord(tu, tv);
    }

    if (interpolateFactor >= 1) {
      this.currentFrame = nextFrame;
      this.frameProgress = 0;
    }
    else {
      this.frameProgress += this.app.getTimeStep();
    }
  }

  draw() {
    let gm = this.app.getGraphicsManager();
    gm.drawMesh(this.getModelMatrix(), this.vertexCount, this.vertices, this.textureCoords, this.normals, this.texture);
    gm.drawDebugBoundingCylinder(this.getModelMatrix(), this.vaabc, 8, [1.0, 1.0, 0.0]);
  }

  loadFromFile(path) {
    let json = JSON.parse(Filesystem.readFile(path));
    if (!json.hasOwnProperty('MD2File')) {
      throw new Error('Model::loadFromFile(): Missing "MD2File" property');
    }

    this.verticesFrames = [];
    this.normalsFrames = [];
    this.textureCoordsFrames = [];

    let md2 = this.getFileMD2Data(json['MD2File']);
    for (let frame of md2.frames) {
      let verticesFrame = [];
      let normalsFrame = [];
      let textureCoordsFrame = [];
      for (let i = 0; i < md2.header.numTriangles; i++) {
        for (let j = 0; j < 3; j++) {
          let vertex = frame.vertices[md2.triangles[i].vertexIndexes[j]];
          let normal = MD2_ANORMS[vertex.normalIndex];

          let vx = vertex.position[0];
          let vy = vertex.position[2];
          let vz = vertex.position[1];
          verticesFrame.push(vx, vy, vz);

          let nx = normal[0];
          let ny = normal[2];
          let nz = normal[1];
          normalsFrame.push(nx, ny, nz);

          let tu = md2.uvs[md2.triangles[i].uvIndexes[j]].u;
          let tv = md2.uvs[md2.triangles[i].uvIndexes[j]].v;
          textureCoordsFrame.push(tu, tv);
        }
      }

      this.verticesFrames.push(verticesFrame);
      this.normalsFrames.push(normalsFrame);
      this.textureCoordsFrames.push(textureCoordsFrame);
    }

    this.animations = [];
    for (let obj of json['Animations']) {
      let animation = {};
      animation.name = obj['Name'];
      animation.startFrame = parseInt(obj['StartFrame']);
      animation.endFrame = parseInt(obj['EndFrame']);
      animation.frameDuration = parseInt(obj['FrameDuration']);
      this.animations.push(animation);
    }

    if (json['TextureFile']) {
      this.texture.loadFromFile(json['TextureFile']);
    }

    this.vaabc = BoundingCylinder.createFromVertices(this.verticesFrames[0]);
    this.currentAnimationName = '';
    this.isLooped = true;
    this.currentFrame = 0;
    this.frameProgress = 0;
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

  play(animationName, isLooped) {
    if (animationName == this.currentAnimationName) {
      return;
    }

    let animation = this.animations.find(animation => animation.name == animationName);
    if (!animation) {
      throw new Error('Model::play: animation not found !');
    }

    this.currentAnimationName = animationName;
    this.isLooped = isLooped;
    this.currentFrame = animation.startFrame;
    this.frameProgress = 0;
  }

  getFileMD2Data(path) {
    let md2 = Filesystem.readFile(path);
    let bufMD2 = md2.buffer.slice(0, md2.byteLength);
    let offset = 0;

    let header = {};
    header.ident = new Uint32Array(bufMD2, offset, 1)[0]; offset += 4;
    header.version = new Uint32Array(bufMD2, offset, 1)[0]; offset += 4;
    header.skinWidth = new Uint32Array(bufMD2, offset, 1)[0]; offset += 4;
    header.skinHeight = new Uint32Array(bufMD2, offset, 1)[0]; offset += 4;
    header.frameSize = new Uint32Array(bufMD2, offset, 1)[0]; offset += 4;
    header.numSkins = new Uint32Array(bufMD2, offset, 1)[0]; offset += 4;
    header.numVertices = new Uint32Array(bufMD2, offset, 1)[0]; offset += 4;
    header.numUVS = new Uint32Array(bufMD2, offset, 1)[0]; offset += 4;
    header.numTriangles = new Uint32Array(bufMD2, offset, 1)[0]; offset += 4;
    header.numGLCommands = new Uint32Array(bufMD2, offset, 1)[0]; offset += 4;
    header.numFrames = new Uint32Array(bufMD2, offset, 1)[0]; offset += 4;
    header.offsetSkins = new Uint32Array(bufMD2, offset, 1)[0]; offset += 4;
    header.offsetUVS = new Uint32Array(bufMD2, offset, 1)[0]; offset += 4;
    header.offsetTriangles = new Uint32Array(bufMD2, offset, 1)[0]; offset += 4;
    header.offsetFrames = new Uint32Array(bufMD2, offset, 1)[0]; offset += 4;
    header.offsetGLCommands = new Uint32Array(bufMD2, offset, 1)[0]; offset += 4;
    header.offsetEnd = new Uint32Array(bufMD2, offset, 1)[0];
    if (header.ident != 844121161 || header.version != 8) {
      throw new Error('Model::loadFromFile(): MD2 header is not valid !');
    }

    let skins = [];
    offset = header.offsetSkins;
    for (let i = 0; i < header.numSkins; i++) {
      let skin = {};
      skin.name = String.fromCharCode(...new Uint8Array(bufMD2, offset, 64)); offset += 64;
      skins.push(skin);
    }

    let uvs = [];
    offset = header.offsetUVS;
    for (let i = 0; i < header.numUVS; i++) {
      let uv = {};
      uv.u = new Uint16Array(bufMD2, offset, 1)[0]; offset += 2;
      uv.u = uv.u / header.skinWidth;
      uv.v = new Uint16Array(bufMD2, offset, 1)[0]; offset += 2;
      uv.v = uv.v / header.skinHeight;
      uvs.push(uv);
    }

    let triangles = [];
    offset = header.offsetTriangles;
    for (let i = 0; i < header.numTriangles; i++) {
      let triangle = {};
      triangle.vertexIndexes = new Uint16Array(bufMD2, offset, 3); offset += 6;
      triangle.uvIndexes = new Uint16Array(bufMD2, offset, 3); offset += 6;
      triangles.push(triangle);
    }

    let frames = [];
    offset = header.offsetFrames;
    for (let i = 0; i < header.numFrames; i++) {
      let frame = {};
      frame.scale = new Float32Array(bufMD2, offset, 3); offset += 12;
      frame.translate = new Float32Array(bufMD2, offset, 3); offset += 12;
      frame.name = String.fromCharCode(...new Uint8Array(bufMD2, offset, 16)); offset += 16;
      frame.vertices = [];
      for (let j = 0; j < header.numVertices; j++) {
        let position = Float32Array.from(new Uint8Array(bufMD2, offset, 3)); offset += 3;
        let vertex = {};
        vertex.position = [];
        vertex.position[0] = (position[0] * frame.scale[0]) + frame.translate[0];
        vertex.position[1] = (position[1] * frame.scale[1]) + frame.translate[1];
        vertex.position[2] = (position[2] * frame.scale[2]) + frame.translate[2];
        vertex.normalIndex = new Uint8Array(bufMD2, offset, 1); offset += 1;
        frame.vertices.push(vertex);
      }

      frames.push(frame);
    }

    return { header, skins, uvs, triangles, frames };
  }
}