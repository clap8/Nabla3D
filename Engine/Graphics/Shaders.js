const MESH_VERTEX_SHADER = `
  uniform mat4 u_model;
  uniform mat4 u_view;
  uniform mat4 u_projection;
  attribute vec4 a_position;
  attribute vec3 a_normal;
  attribute vec2 a_textureCoord;
  varying vec2 v_textureCoord;

  void main() {
    gl_Position = u_projection * u_view * u_model * a_position;
    a_normal;
    v_textureCoord = a_textureCoord;
  }
`;

const MESH_PIXEL_SHADER = `
  precision mediump float;
  varying vec2 v_textureCoord;
  uniform sampler2D u_texture;

  void main() {
    gl_FragColor = texture2D(u_texture, v_textureCoord);
  }
`;

const DEBUG_VERTEX_SHADER = `
  uniform mat4 u_model;
  uniform mat4 u_view;
  uniform mat4 u_projection;
  attribute vec4 a_position;

  void main() {
    gl_Position = u_projection * u_view * u_model * a_position;
    gl_PointSize = 5.0;
  }
`;

const DEBUG_PIXEL_SHADER = `
  precision mediump float;
  uniform vec3 u_color;

  void main() {
    gl_FragColor = vec4(u_color, 1);
  }
`;

const TEXTURE_VERTEX_SHADER = `
  uniform float u_viewportWidth;
  uniform float u_viewportHeight;
  uniform mat3 u_model;
  attribute vec2 a_position;
  attribute vec2 a_textureCoord;
  varying vec2 v_textureCoord;

  void main() {
    vec3 position = u_model * vec3(a_position, 1);
    position.x = ((position.x / u_viewportWidth) * 2.0) - 1.0;
    position.y = ((position.y / u_viewportHeight) * 2.0) - 1.0;

    gl_Position = vec4(position.x, position.y, 0, 1);
    v_textureCoord = a_textureCoord;
  }
`;

const TEXTURE_PIXEL_SHADER = `
  precision mediump float;
  uniform vec3 u_color;
  uniform sampler2D u_texture;
  varying vec2 v_textureCoord;

  void main() {
    gl_FragColor = vec4(u_color, 1.0) * texture2D(u_texture, v_textureCoord);
  }
`;