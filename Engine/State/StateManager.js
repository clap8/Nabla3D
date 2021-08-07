// @NOTA BENE:
// Il est important de savoir pourquoi le changement d'état se fait de façon asynchrone.
// En effet, imaginez que le changement d'état ai lieu au milieu de la phase d'update.
// Dans ce cas, le programme continuerai sa phase d'update sur un objet-état qui est déjà supprimé.

class StateManager extends Base {
  constructor(app) {
    super(app);
    this.requests = [];
    this.stack = [];
  }

  handleEvent(event) {
    for (let i = this.stack.length - 1; i >= 0; i--) {
      this.stack[i].onEvent(event);
      if (this.stack[i].blocking) {
        return;
      }
    }
  }

  update() {
    while (this.requests.length > 0) {
      let request = this.requests.pop();
      request();
    }

    for (let i = this.stack.length - 1; i >= 0; i--) {
      this.stack[i].onUpdate();
      if (this.stack[i].blocking) {
        return;
      }
    }
  }

  requestPushState(newTopState, args = {}) {
    this.requests.push(() => {
      if (!newTopState instanceof State) {
        throw new Error('StateManager::requestPushState(): You try to push a non-state object');
      }
      if (this.stack.indexOf(newTopState) != -1) {
        throw new Error('StateManager::requestPushState(): You try to push an existing state to the stack !');
      }

      let topState = this.stack[this.stack.length - 1];
      topState.onBringToBack(newTopState);

      newTopState.onEnter(args);
      this.stack.push(newTopState);
    });
  }

  requestSetState(state, args = {}) {
    this.requests.push(() => {
      this.stack.forEach((state) => state.onExit());
      this.stack = [];
      state.onEnter(args);
      this.stack.push(state);
    });
  }

  requestPopState() {
    this.requests.push(() => {
      if (this.stack.length == 0) {
        throw new Error('StateManager::requestPopState: You try to pop an empty state stack !');
      }

      let topState = this.stack[this.stack.length - 1];
      topState.onExit();
      this.stack.pop();

      let newTopState = this.stack[this.stack.length - 1];
      newTopState.onBringToFront(topState);
    });
  }
}