class Walkmesh extends Drawable {
  constructor(app) {
    super(app);
    this.sectors = [];
  }

  draw() {
    let gm = this.app.getGraphicsManager();
    gm.drawDebugLines(this.getModelMatrix(), this.vertexCount, this.vertices, [1.0, 0.0, 0.5]);
  }

  loadFromFile(path) {
    let json = JSON.parse(Filesystem.readFile(path));
    
    this.clearVertices();

    let vertices = [];
    for (let arr of json['Vertices']) {
      vertices.push([arr[0], arr[1], arr[2]]);
    }

    this.sectors = [];
    for (let obj of json['Sectors']) {
      let sector = new WalkmeshSector();
      sector.id = obj['Id'];
      sector.vertices[0] = vertices[obj['VertexIndices'][0]];
      sector.vertices[1] = vertices[obj['VertexIndices'][1]];
      sector.vertices[2] = vertices[obj['VertexIndices'][2]];
      this.defineVertice(sector.vertices[0][0], sector.vertices[0][1], sector.vertices[0][2]);
      this.defineVertice(sector.vertices[1][0], sector.vertices[1][1], sector.vertices[1][2]);
      this.defineVertice(sector.vertices[0][0], sector.vertices[0][1], sector.vertices[0][2]);
      this.defineVertice(sector.vertices[2][0], sector.vertices[2][1], sector.vertices[2][2]);
      this.defineVertice(sector.vertices[1][0], sector.vertices[1][1], sector.vertices[1][2]);
      this.defineVertice(sector.vertices[2][0], sector.vertices[2][1], sector.vertices[2][2]);
      this.sectors.push(sector);
    }
  }

  getElevationAt(x, z) {
    for (let sector of this.sectors) {
      let minX = Math.min(sector.vertices[0][0], sector.vertices[1][0], sector.vertices[2][0]);
      let minZ = Math.min(sector.vertices[0][2], sector.vertices[1][2], sector.vertices[2][2]);
      let maxX = Math.max(sector.vertices[0][0], sector.vertices[1][0], sector.vertices[2][0]);
      let maxZ = Math.max(sector.vertices[0][2], sector.vertices[1][2], sector.vertices[2][2]);
      if (x < minX || x > maxX || z < minZ || z > maxZ) {
        continue;
      }

      let elevation = sector.getElevationAt(x, z);
      if (elevation != Infinity) {
        return elevation;
      }
    }

    return Infinity;
  }
}

class WalkmeshSector {
  constructor() {
    this.id = '';
    this.vertices = [];
  }

  getWeightsAt(x, z) {
    let f = [x, 0, z];
    let a = this.vertices[0];
    let b = this.vertices[1];
    let c = this.vertices[2];

    let vecteurAB = Vec3.create(b[0] - a[0], 0, b[2] - a[2]);
    let vecteurAC = Vec3.create(c[0] - a[0], 0, c[2] - a[2]);
    let vecteurFA = Vec3.create(a[0] - f[0], 0, a[2] - f[2]);
    let vecteurFB = Vec3.create(b[0] - f[0], 0, b[2] - f[2]);
    let vecteurFC = Vec3.create(c[0] - f[0], 0, c[2] - f[2]);
    let area = Vec3.length(Vec3.cross(vecteurAB, vecteurAC));

    let wa = Vec3.length(Vec3.cross(vecteurFB, vecteurFC)) / area;
    let wb = Vec3.length(Vec3.cross(vecteurFA, vecteurFC)) / area;
    let wc = Vec3.length(Vec3.cross(vecteurFA, vecteurFB)) / area;

    if ((Math.round((wa + wb + wc) * 1e2) / 1e2) > 1) {
      wa = -1; wb = -1; wc = -1;
    }

    return { wa, wb, wc };
  }

  getElevationAt(x, z) {
    let a = this.vertices[0];
    let b = this.vertices[1];
    let c = this.vertices[2];

    let weights = this.getWeightsAt(x, z);
    if (weights.wa == -1 || weights.wb == -1 || weights.wc == -1) return Infinity;

    // pour finir, nous déterminons la coordonnée 'y' grâce aux poids precedemment trouvés.
    // celà est possible car : wa*HA + wb*HB = 0 et wa+wb*GH + wc*GC = 0.
    let vert = a[1] + ((b[1] - a[1]) * (weights.wb / (weights.wa + weights.wb)));
    let elev = vert + ((c[1] - vert) * (weights.wc / (weights.wa + weights.wb + weights.wc)));

    return elev;
  }
}