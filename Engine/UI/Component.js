class Component extends Base {
  constructor(app, options = {}) {
    super(app);
    this.id = '';
    this.focused = false;
    this.className = options.className || '';
    this.template = options.template || '';
    this.node = document.createElement('div');
    this.node.className = this.className;
    this.node.innerHTML = this.template;
    this.inputManager = this.app.getInputManager();
  }

  update() {
    // virtual method called during update phase !
  }

  delete() {
    Base.unsubscribeFrom(this.inputManager, this, 'E_KEYDOWN');
    Base.unsubscribeFrom(this.inputManager, this, 'E_KEYDOWN_ONCE');
    this.node.remove();
    this.node = null;
  }

  setId(id) {
    this.id = id;
  }

  focus() {
    Base.subscribeFrom(this.inputManager, this, 'E_KEYDOWN', this.onKeyDown);
    Base.subscribeFrom(this.inputManager, this, 'E_KEYDOWN_ONCE', this.onKeyDownOnce);
    this.node.classList.add('focused');
    this.focused = true;
    this.emit('E_FOCUSED');
  }

  unfocus() {
    Base.unsubscribeFrom(this.inputManager, this, 'E_KEYDOWN');
    Base.unsubscribeFrom(this.inputManager, this, 'E_KEYDOWN_ONCE');
    this.node.classList.remove('focused');
    this.focused = false;
    this.emit('E_UNFOCUSED');
  }

  show() {
    this.node.classList.remove('u-hidden');
  }

  hide() {
    this.node.classList.add('u-hidden');
  }

  isVisible() {
    return this.node.style.display != 'none';
  }

  onKeyDown(data) {
    // virtual method called during keydown event !
  }

  onKeyDownOnce(data) {
    // virtual method called during keydown once event !
  }
}