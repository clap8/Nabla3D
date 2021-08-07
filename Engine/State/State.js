class State extends Base {
  constructor(app) {
    super(app);
    this.stateManager = this.app.getStateManager();
    this.graphicsManager = this.app.getGraphicsManager();
    this.sceneManager = this.app.getSceneManager();
    this.uiManager = this.app.getUIManager();
    this.musicManager = this.app.getMusicManager();
    this.soundManager = this.app.getSoundManager();
    this.commandManager = this.app.getCommandManager();
    this.inputManager = this.app.getInputManager();
    this.scriptManager = this.app.getScriptManager();
    this.blocking = true;
  }

  setBlocking(blocking) {
    this.blocking = blocking;
  }

  onEnter() {
    // virtual method called during enter phase !
  }

  onExit() {
    // virtual method called during exit phase !
  }

  onBringToFront() {
    // virtual method called when get the top state level !
  }

  onBringToBack() {
    // virtual method called when lost the top state level !
  }

  onEvent(event) {
    // virtual method called during event pulling phase !
  }

  onUpdate() {
    // virtual method called during update phase !
  }
}