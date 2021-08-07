class Game extends Application {
  constructor(resolutionWidth, resolutionHeight, sizeMode) {
    super(resolutionWidth, resolutionHeight, sizeMode);
  }
}

window.addEventListener('load', async () => {
  let game = new Game(800, 800, SIZE_MODE_FIXED);
  requestAnimationFrame((ts) => { game.run(ts); });
});