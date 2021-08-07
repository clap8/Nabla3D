const SIZE_MODE_FIT = 0;
const SIZE_MODE_ADJUST = 1;
const SIZE_MODE_FIXED = 2;

class Application extends Observable {
  constructor(resolutionWidth, resolutionHeight, sizeMode = SIZE_MODE_FIT) {
    super();

    this.container = document.getElementById('APP');
    if (!this.container) {
      throw new Error('Application::Application: APP element not found !');
    }

    this.stateManager = new StateManager(this);
    this.commandManager = new CommandManager(this);
    this.inputManager = new InputManager(this);
    this.graphicsManager = new GraphicsManager(this);
    this.graphicsManager.addViewport(new Viewport(this, 0, 0, 1, 1));
    this.sceneManager = new SceneManager(this);
    this.uiManager = new UIManager(this);
    this.musicManager = new MusicManager(this);
    this.soundManager = new SoundManager(this);
    this.scriptManager = new ScriptManager(this);

    this.timeStep = 0;
    this.timeStamp = 0;

    this.resolutionWidth = resolutionWidth;
    this.resolutionHeight = resolutionHeight;
    this.sizeMode = sizeMode;

    this.container.style.width = resolutionWidth + 'px';
    this.container.style.height = resolutionHeight + 'px';

    if (this.sizeMode == SIZE_MODE_FIT) {
      this.container.style.transform = 'scale(' + window.innerWidth / resolutionWidth + ',' + window.innerHeight / resolutionHeight + ')';
    }
    else if (this.sizeMode == SIZE_MODE_ADJUST) {
      this.container.style.transform = 'scale(' + Math.min(window.innerWidth / resolutionWidth, window.innerHeight / resolutionHeight) + ')';
    }
    else if (this.sizeMode == SIZE_MODE_FIXED) {
      this.container.style.transform = 'none';
      this.container.style.margin = '0 auto';
    }
  }

  getStateManager() {
    return this.stateManager;
  }

  getCommandManager() {
    return this.commandManager;
  }

  getInputManager() {
    return this.inputManager;
  }

  getUIManager() {
    return this.uiManager;
  }

  getGraphicsManager() {
    return this.graphicsManager;
  }

  getSceneManager() {
    return this.sceneManager;
  }

  getMusicManager() {
    return this.musicManager;
  }

  getSoundManager() {
    return this.soundManager;
  }

  getScriptManager() {
    return this.scriptManager;
  }

  getTimeStep() {
    return this.timeStep;
  }

  getTimeStamp() {
    return this.timeStamp;
  }

  run(timeStamp) {
    this.timeStep = Math.min(timeStamp - this.timeStamp, 100);
    this.timeStamp = timeStamp;

    let event;
    while(event = this.inputManager.pullEvents()) {
      this.stateManager.handleEvent(event);
    }

    this.graphicsManager.update();
    this.commandManager.update();
    this.scriptManager.update();
    this.uiManager.update();
    this.stateManager.update();
    this.sceneManager.update();

    requestAnimationFrame((timeStamp) => { this.run(timeStamp); });
  }
}