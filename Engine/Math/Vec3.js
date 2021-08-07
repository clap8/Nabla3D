const VEC3_UP = [0, 1, 0];
const VEC3_DOWN = [0, -1, 0];
const VEC3_LEFT = [-1, 0, 0];
const VEC3_RIGHT = [1, 0, 0];
const VEC3_FORWARD = [0, 0, -1];
const VEC3_BACKWARD = [0, 0, 1];

class Vec3 {
  static create(x = 0, y = 0, z = 0) {
    return [x, y, z];
  }

  static length(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
  }

  static normalize(a) {
    let len = Vec3.length(a);
    if (len > 0) {
      let x = a[0] / len;
      let y = a[1] / len;
      let z = a[2] / len;
      return [x, y, z];
    }
    else {
      return [0, 0, 0];
    }
  }

  static dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  static cross(a, b) {
    let x = a[1] * b[2] - a[2] * b[1];
    let y = a[2] * b[0] - a[0] * b[2];
    let z = a[0] * b[1] - a[1] * b[0];
    return [x, y, z];
  }

  static add(a, b) {
    let x = a[0] + b[0];
    let y = a[1] + b[1];
    let z = a[2] + b[2];
    return [x, y, z];
  }

  static substract(a, b) {
    let x = a[0] - b[0];
    let y = a[1] - b[1];
    let z = a[2] - b[2];
    return [x, y, z];
  }

  static multiply(a, b) {
    let x = a[0] * b[0];
    let y = a[1] * b[1];
    let z = a[2] * b[2];
    return [x, y, z];
  }

  static scale(a, scale) {
    let x = a[0] * scale;
    let y = a[1] * scale;
    let z = a[2] * scale;
    return [x, y, z];
  }
}