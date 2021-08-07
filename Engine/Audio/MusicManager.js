class MusicManager extends Base {
  constructor(app) {
    super(app);
    this.player = new Audio();
    this.objectUrl = '';
  }

  loadFromFile(path) {
    let blob = Filesystem.readFileAsBlob(path, 'audio');
    this.objectUrl = URL.createObjectURL(blob);
    this.player.src = this.objectUrl;
  }

  loadFromBlob(blob) {
    this.objectUrl = URL.createObjectURL(blob);
    this.player.src = this.objectUrl;
  }

  clear() {
    this.player.pause();
    this.player.currentTime = 0;
    this.player.src = '';
    URL.revokeObjectURL(this.objectUrl);
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  stop() {
    this.player.pause();
    this.player.currentTime = 0;
  }

  setLoop(loop) {
    this.player.loop = loop ? true : false;
  }
}