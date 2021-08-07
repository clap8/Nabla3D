class Texture extends Base {
  constructor(app) {
    super(app);
    this.gl = this.app.getGraphicsManager().getGLContext();
    this.glTexture = this.gl.createTexture();
    this.width = 1;
    this.height = 1;
    this.mipmapping = false;
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.glTexture);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.width, this.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
  }

  loadFromFile(path) {
    let image = new Image();
    let data = Filesystem.readFile(path);
    let pathParts = path.split('.');
    let extension = pathParts[pathParts.length - 1];
    image.src = 'data:image/' + extension + ';base64,' + data.toString('base64');
    image.addEventListener('load', () => {
      this.width = image.width;
      this.height = image.height;  
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.glTexture);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
      if (this.mipmapping && IS_POWER_OF_2(this.width) && IS_POWER_OF_2(this.height)) {
        this.gl.generateMipmap(this.gl.TEXTURE_2D);
      }
      else {
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
      }
    });
  }

  getGLTexture() {
    return this.glTexture;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  setMipmapping(mipmapping) {
    this.mipmapping = mipmapping;
  }
}