class BoundingCylinder { // VAABC => VERTICAL-AXIS-ALIGNED-BOUNDING-CYLINDER
  constructor(x = 0, y = 0, z = 0, radius = 1, height = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius = radius;
    this.height = height;
  }

  getCenter() {
    return [this.x, this.y, this.z];
  }

  getRadius() {
    return this.radius;
  }

  getHeight() {
    return this.height;
  }

  transform(translateX = 0, translateY = 0, translateZ = 0, scaleX = 1, scaleY = 1, scaleZ = 1) {
    let newCenterX = this.x + translateX;
    let newCenterY = this.y + translateY;
    let newCenterZ = this.z + translateZ;
    let newRadius = this.radius * Math.max(scaleX, scaleZ);
    let newHeight = this.height * scaleY;
    return new BoundingCylinder(newCenterX, newCenterY, newCenterZ, newRadius, newHeight);
  }

  isPointInside(x, y, z) {
    let distance = Math.sqrt((x - this.x) * (x - this.x) + (z - this.z) * (z - this.z));
    return (distance <= this.radius) && (y >= (this.y - this.height * 0.5) && y <= (this.y + this.height * 0.5));
  }

  intersectBoundingCylinder(boundingCylinder) {
    let distance = Math.sqrt((boundingCylinder.x - this.x) * (boundingCylinder.x - this.x) + (boundingCylinder.z - this.z) * (boundingCylinder.z - this.z));
    let maxY = this.y + (this.height * 0.5);
    let minY = this.y - (this.height * 0.5);
    let otherMaxY = boundingCylinder.y + (boundingCylinder.height * 0.5);
    let otherMinY = boundingCylinder.y - (boundingCylinder.height * 0.5);
    return distance <= this.radius + boundingCylinder.radius && maxY >= otherMinY && minY <= otherMaxY;
  }

  static createFromVertices(vertices) {
    let min = vertices.slice(0, 3);
    let max = vertices.slice(0, 3);
    for (let i = 0; i < vertices.length; i += 3) {
      for (let j = 0; j < 3; j++) {
        let v = vertices[i + j];
        min[j] = Math.min(v, min[j]);
        max[j] = Math.max(v, max[j]);
      }
    }

    let w = max[0] - min[0];
    let h = max[1] - min[1];
    let d = max[2] - min[2];
    let x = min[0] + (w * 0.5);
    let y = min[1] + (h * 0.5);
    let z = min[2] + (d * 0.5);
    let radius = Math.sqrt((w * w) + (d * d)) * 0.5;

    return new BoundingCylinder(x, y, z, radius, h);
  }
}