class SoundManager extends Base {
  constructor(app) {
    super(app);
    this.objectUrls = {};
  }

  loadFromFile(key, path) {
    let blob = Filesystem.readFileAsBlob(path, 'audio');
    let objectUrl = URL.createObjectURL(blob);

    if (this.objectUrls[key]) {
      throw new Error('SoundManager::loadFromPath(): The sound file is already loaded !');
    }

    this.objectUrls[key] = objectUrl;
  }

  loadFromBlob(key, blob) {
    let objectUrl = URL.createObjectURL(blob);

    if (this.objectUrls[key]) {
      throw new Error('SoundManager::loadFromBlob(): The sound file is already loaded !');
    }

    this.objectUrls[key] = URL.createObjectURL(objectUrl);
  }

  unload(key) {
    if (!this.objectUrls[key]) {
      throw new Error('SoundManager::unload(): The sound file doesn\'t exist, cannot unload !');
    }

    URL.revokeObjectURL(this.objectUrls[key]);
    delete this.objectUrls[key];
  }

  clear() {
    for (let objectUrl of Object.values(this.objectUrls)) {
      URL.revokeObjectURL(objectUrl);
    }

    this.objectUrls = {};
  }

  play(key) {
    let objectUrl = this.objectUrls[key];
    if (!objectUrl) {
      throw new Error('SoundManager::play(): The sound file doesn\'t exist, cannot play !');
    }

    let player = new Audio(objectUrl);
    player.play();
  }
}