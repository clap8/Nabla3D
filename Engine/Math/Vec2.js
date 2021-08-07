class Vec2 {
  static create(x = 0, y = 0) {
    return [x, y];
  }

  static length(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
  }

  static normalize(a) {
    let len = Vec2.length(a);
    if (len > 0) {
      let x = a[0] / len;
      let y = a[1] / len;
      return [x, y];
    }
    else {
      return [0, 0];
    }
  }

  static dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  }

  static add(a, b) {
    let x = a[0] + b[0];
    let y = a[1] + b[1];
    return [x, y];
  }

  static substract(a, b) {
    let x = a[0] - b[0];
    let y = a[1] - b[1];
    return [x, y];
  }

  static multiply(a, b) {
    let x = a[0] * b[0];
    let y = a[1] * b[1];
    return [x, y];
  }

  static scale(a, scale) {
    let x = a[0] * scale;
    let y = a[1] * scale;
    return [x, y];
  }

  static angle(a, b) {
    return Math.acos(Vec2.dot(a, b) / (Vec2.length(a) * Vec2.length(b)));
  }

  static atan2abs(a) {
    let angle = Math.atan2(a[1], a[0]);
    return (angle > 0) ? angle : (angle + Math.PI*2);
  }
}