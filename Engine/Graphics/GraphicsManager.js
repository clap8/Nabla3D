class GraphicsManager extends Base {
  constructor(app) {
    super(app);
    this.canvas = document.getElementById('CANVAS');
    if (!this.canvas) {
      throw new Error('GraphicsManager::GraphicsManager: JS_CANVAS not found');
    }

    this.gl = this.canvas.getContext('webgl');
    if (!this.gl) {
      throw new Error('GraphicsManager::GraphicsManager: Your browser not support WebGL');
    }

    this.canvas.addEventListener('webglcontextlost', (event) => event.preventDefault(), false);
    this.meshShader = GraphicsManager.createShaderProgram(this.gl, MESH_VERTEX_SHADER, MESH_PIXEL_SHADER);
    this.debugShader = GraphicsManager.createShaderProgram(this.gl, DEBUG_VERTEX_SHADER, DEBUG_PIXEL_SHADER);
    this.viewports = [];
    this.showDebug = true;
  }

  update() {
    if (this.canvas.width != this.canvas.clientWidth || this.canvas.height != this.canvas.clientHeight) {
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientHeight;
    }
  }

  getWidth() {
    return this.canvas.clientWidth;
  }

  getHeight() {
    return this.canvas.clientHeight;
  }

  getGLContext() {
    return this.gl;
  }

  getViewports() {
    return this.viewports;
  }

  getViewport(index) {
    return this.viewports[index];
  }

  getNumViewports() {
    return this.viewports.length;
  }

  addViewport(viewport) {
    this.viewports.push(viewport);
  }

  removeViewport(viewport) {
    this.viewports.splice(this.viewports.indexOf(viewport), 1);
  }

  removeViewportAt(index) {
    this.viewports.splice(index, 1);
  }

  setShowDebug(showDebug) {
    this.showDebug = showDebug;
  }

  drawMesh(matrix, numVertices, vertices, textureCoords, normals, texture) {
    this.gl.useProgram(this.meshShader);
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.meshShader, 'u_model'), false, matrix);

    if (vertices) {
      let vertexBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
      this.gl.vertexAttribPointer(this.gl.getAttribLocation(this.meshShader, 'a_position'), 3, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(this.gl.getAttribLocation(this.meshShader, 'a_position'));
    }

    if (textureCoords) {
      let textureCoordsBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, textureCoordsBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoords), this.gl.STATIC_DRAW);
      this.gl.vertexAttribPointer(this.gl.getAttribLocation(this.meshShader, 'a_textureCoord'), 2, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(this.gl.getAttribLocation(this.meshShader, 'a_textureCoord'));
    }

    if (normals) {
      let normalBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, normalBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(normals), this.gl.STATIC_DRAW);
      this.gl.vertexAttribPointer(this.gl.getAttribLocation(this.meshShader, 'a_normal'), 3, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(this.gl.getAttribLocation(this.meshShader, 'a_normal'));
    }

    if (texture) {
      this.gl.bindTexture(this.gl.TEXTURE_2D, texture.getGLTexture());
      this.gl.uniform1i(this.gl.getUniformLocation(this.meshShader, 'u_texture'), 0);
    }

    this.gl.drawArrays(this.gl.TRIANGLES, 0, numVertices);
  }

  drawDebugSphere(matrix, radius, step, color) {
    if (!this.showDebug) {
      return;
    }

    this.gl.useProgram(this.debugShader);
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.debugShader, 'u_model'), false, matrix);

    let angleStep = (Math.PI * 0.5) / step;
    let vertices = [];
    let numVertices = 0;

    for (let i = step * -1; i <= step; i++) {
      let r = Math.cos(i * angleStep) * radius;
      let y = Math.sin(i * angleStep) * radius;
      for (let j = 0; j <= step * 4; j++) {
        let z = Math.sin(j * angleStep) * r;
        let x = Math.cos(j * angleStep) * Math.cos(i * angleStep) * radius;
        vertices.push(x, y, z);
        numVertices++;
      }
    }

    for (let i = step * -1; i <= step; i++) {
      for (let j = 0; j <= step * 4; j++) {
        let x = Math.cos(j * angleStep) * radius * Math.cos(i * angleStep);
        let y = Math.sin(j * angleStep) * radius;
        let z = Math.cos(j * angleStep) * radius * Math.sin(i * angleStep);
        vertices.push(x, y, z);
        numVertices++;
      }
    }

    let vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.gl.getAttribLocation(this.debugShader, 'a_position'), 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.gl.getAttribLocation(this.debugShader, 'a_position'));
    this.gl.uniform3fv(this.gl.getUniformLocation(this.debugShader, 'u_color'), color);
    this.gl.drawArrays(this.gl.LINE_STRIP, 0, numVertices);
  }

  drawDebugAxes(matrix, size) {
    if (!this.showDebug) {
      return;
    }

    this.gl.useProgram(this.debugShader);
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.debugShader, 'u_model'), false, matrix);

    let verticesX = [];
    verticesX.push(0, 0, 0);
    verticesX.push(1 * size, 0, 0);
    let vertexBufferX = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBufferX);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(verticesX), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.gl.getAttribLocation(this.debugShader, 'a_position'), 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.gl.getAttribLocation(this.debugShader, 'a_position'));
    this.gl.uniform3fv(this.gl.getUniformLocation(this.debugShader, 'u_color'), [1, 0, 0]);
    this.gl.drawArrays(this.gl.LINES, 0, 2);

    let verticesY = [];
    verticesY.push(0, 0, 0);
    verticesY.push(0, 1 * size, 0);
    let vertexBufferY = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBufferY);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(verticesY), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.gl.getAttribLocation(this.debugShader, 'a_position'), 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.gl.getAttribLocation(this.debugShader, 'a_position'));
    this.gl.uniform3fv(this.gl.getUniformLocation(this.debugShader, 'u_color'), [1, 1, 0]);
    this.gl.drawArrays(this.gl.LINES, 0, 2);

    let verticesZ = [];
    verticesZ.push(0, 0, 0);
    verticesZ.push(0, 0, 1 * size);
    let vertexBufferZ = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBufferZ);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(verticesZ), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.gl.getAttribLocation(this.debugShader, 'a_position'), 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.gl.getAttribLocation(this.debugShader, 'a_position'));
    this.gl.uniform3fv(this.gl.getUniformLocation(this.debugShader, 'u_color'), [0, 1, 1]);
    this.gl.drawArrays(this.gl.LINES, 0, 2);
  }

  drawDebugGrid(matrix, extend, spacing, color) {
    if (!this.showDebug) {
      return;
    }

    let nbCells = extend * 2;
    let gridSize = nbCells * spacing;
    let left = -gridSize * 0.5;
    let top = -gridSize * 0.5;
    let vertices = [];
    let numVertices = 0;

    for (let i = 0; i <= nbCells; i++) {
      let vLineFromX = left + (i * spacing);
      let vLineFromY = top;
      let vLineFromZ = 0;
      let vLineDestX = left + (i * spacing);
      let vLineDestY = top + gridSize;
      let vLineDestZ = 0;
      let hLineFromX = left;
      let hLineFromY = top + (i * spacing);
      let hLineFromZ = 0;
      let hLineDestX = left + gridSize;
      let hLineDestY = top + (i * spacing);
      let hLineDestZ = 0;
      vertices.push(vLineFromX, vLineFromY, vLineFromZ, vLineDestX, vLineDestY, vLineDestZ);
      vertices.push(hLineFromX, hLineFromY, hLineFromZ, hLineDestX, hLineDestY, hLineDestZ);
      numVertices += 4;
    }

    this.gl.useProgram(this.debugShader);
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.debugShader, 'u_model'), false, matrix);

    let vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.gl.getAttribLocation(this.debugShader, 'a_position'), 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.gl.getAttribLocation(this.debugShader, 'a_position'));

    if (color) {
      this.gl.uniform3fv(this.gl.getUniformLocation(this.debugShader, 'u_color'), color);
    }

    this.gl.drawArrays(this.gl.LINES, 0, numVertices);
  }

  drawDebugBoundingBox(matrix, aabb, color) {
    if (!this.showDebug) {
      return;
    }

    let a = [aabb.min[0], aabb.min[1], aabb.min[2]];
    let b = [aabb.max[0], aabb.min[1], aabb.min[2]];
    let c = [aabb.max[0], aabb.max[1], aabb.min[2]];
    let d = [aabb.min[0], aabb.max[1], aabb.min[2]];
    let e = [aabb.min[0], aabb.max[1], aabb.max[2]];
    let f = [aabb.max[0], aabb.max[1], aabb.max[2]];
    let g = [aabb.max[0], aabb.min[1], aabb.max[2]];
    let h = [aabb.min[0], aabb.min[1], aabb.max[2]];

    let vertices = [];
    vertices.push(...a, ...b, ...h, ...g);
    vertices.push(...d, ...c, ...e, ...f);
    vertices.push(...a, ...d, ...h, ...e);
    vertices.push(...b, ...c, ...g, ...f);
    vertices.push(...d, ...e, ...c, ...f);
    vertices.push(...a, ...h, ...b, ...g);

    this.gl.useProgram(this.debugShader);
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.debugShader, 'u_model'), false, matrix);

    let vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.gl.getAttribLocation(this.debugShader, 'a_position'), 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.gl.getAttribLocation(this.debugShader, 'a_position'));

    if (color) {
      this.gl.uniform3fv(this.gl.getUniformLocation(this.debugShader, 'u_color'), color);
    }

    this.gl.drawArrays(this.gl.LINES, 0, 24);
  }

  drawDebugBoundingCylinder(matrix, vaabc, step, color) {
    if (!this.showDebug) {
      return;
    }

    let angleStep = (Math.PI * 2) / step;
    let vertices = [];
    let numVertices = 0;

    for(let i = 0; i < step; i++) {
      let p0X = Math.cos(i * angleStep) * vaabc.radius;
      let p0Y = vaabc.y - (vaabc.height * 0.5);
      let p0Z = Math.sin(i * angleStep) * vaabc.radius;
      let p1X = Math.cos((i + 1) * angleStep) * vaabc.radius;
      let p1Y = vaabc.y - (vaabc.height * 0.5);
      let p1Z = Math.sin((i + 1) * angleStep) * vaabc.radius;
      vertices.push(p0X, p0Y, p0Z);
      vertices.push(p1X, p1Y, p1Z);
      numVertices += 2;
    }

    for(let i = 0; i < step; i++) {
      let p0X = Math.cos(i * angleStep) * vaabc.radius;
      let p0Y = vaabc.y + (vaabc.height * 0.5);
      let p0Z = Math.sin(i * angleStep) * vaabc.radius;
      let p1X = Math.cos((i + 1) * angleStep) * vaabc.radius;
      let p1Y = vaabc.y + (vaabc.height * 0.5);
      let p1Z = Math.sin((i + 1) * angleStep) * vaabc.radius;
      vertices.push(p0X, p0Y, p0Z);
      vertices.push(p1X, p1Y, p1Z);
      numVertices += 2;
    }

    this.gl.useProgram(this.debugShader);
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.debugShader, 'u_model'), false, matrix);

    let vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.gl.getAttribLocation(this.debugShader, 'a_position'), 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.gl.getAttribLocation(this.debugShader, 'a_position'));

    if (color) {
      this.gl.uniform3fv(this.gl.getUniformLocation(this.debugShader, 'u_color'), color);
    }

    this.gl.drawArrays(this.gl.LINES, 0, numVertices);
  }

  drawDebugLines(matrix, numVertices, vertices, color) {
    if (!this.showDebug) {
      return;
    }

    this.gl.useProgram(this.debugShader);
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.debugShader, 'u_model'), false, matrix);

    if (vertices) {
      let vertexBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
      this.gl.vertexAttribPointer(this.gl.getAttribLocation(this.debugShader, 'a_position'), 3, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(this.gl.getAttribLocation(this.debugShader, 'a_position'));
    }

    if (color) {
      this.gl.uniform3fv(this.gl.getUniformLocation(this.debugShader, 'u_color'), color);
    }

    this.gl.drawArrays(this.gl.LINES, 0, numVertices);
  }

  drawDebugPoints(matrix, numVertices, vertices, color) {
    if (!this.showDebug) {
      return;
    }

    this.gl.useProgram(this.debugShader);
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.debugShader, 'u_model'), false, matrix);

    if (vertices) {
      let vertexBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
      this.gl.vertexAttribPointer(this.gl.getAttribLocation(this.debugShader, 'a_position'), 3, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(this.gl.getAttribLocation(this.debugShader, 'a_position'));
    }

    if (color) {
      this.gl.uniform3fv(this.gl.getUniformLocation(this.debugShader, 'u_color'), color);
    }

    this.gl.drawArrays(this.gl.POINTS, 0, numVertices);
  }

  clearViewport(viewportIndex) {
    let viewport = this.viewports[viewportIndex];
    let viewportRect = viewport.getScreenRect();
    let projectionMatrix = viewport.getProjectionMatrix();
    let viewMatrix = viewport.getCameraViewMatrix();

    this.gl.viewport(viewportRect.x, viewportRect.y, viewportRect.width, viewportRect.height);
    this.gl.scissor(viewportRect.x, viewportRect.y, viewportRect.width, viewportRect.height);

    this.gl.enable(this.gl.SCISSOR_TEST);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.clearColor(viewport.backgroundColor[0], viewport.backgroundColor[1], viewport.backgroundColor[2], viewport.backgroundColor[3]);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.gl.useProgram(this.meshShader);
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.meshShader, 'u_projection'), false, projectionMatrix);
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.meshShader, 'u_view'), false, viewMatrix);

    this.gl.useProgram(this.debugShader);
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.debugShader, 'u_projection'), false, projectionMatrix);
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.debugShader, 'u_view'), false, viewMatrix);
  }

  static createShaderProgram(gl, vsSource, fsSource) {
    let vertexShader = GraphicsManager.createShader(gl, gl.VERTEX_SHADER, vsSource);
    let fragmentShader = GraphicsManager.createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      throw new Error('GraphicsManager::createShaderProgram: fail to init program shader' + gl.getProgramInfoLog(shaderProgram));
    }

    return shaderProgram;
  }

  static createShader(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      throw new Error('GraphicsManager::createShader: An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    }

    return shader;
  }
}