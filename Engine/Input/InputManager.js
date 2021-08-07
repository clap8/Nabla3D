class InputManager extends Base {
  constructor(app) {
    super(app);
    this.keymap = {};
    this.isKeyDown = false;
    this.isMouseDown = false;
    this.isMouseDrag = false;
    this.eventQueue = [];

    this.handleKeyDownCb = this.handleKeyDown.bind(this);
    document.addEventListener('keydown', this.handleKeyDownCb);

    this.handleKeyUpCb = this.handleKeyUp.bind(this);
    document.addEventListener('keyup', this.handleKeyUpCb);

    this.handleMouseDownCb = this.handleMouseDown.bind(this);
    document.addEventListener('mousedown', this.handleMouseDownCb);

    this.handleMouseMoveCb = this.handleMouseMove.bind(this);
    document.addEventListener('mousemove', this.handleMouseMoveCb);

    this.handleMouseUpCb = this.handleMouseUp.bind(this);
    document.addEventListener('mouseup', this.handleMouseUpCb);
  }

  pullEvents() {
    return this.eventQueue.pop();
  }

  isKeyPressed(key) {
    return this.keymap[key];
  }

  handleKeyDown(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    if (!this.isKeyDown) {
      this.eventQueue.push({ type: 'KEYDOWN_ONCE', key: e.which });
      this.emit('E_KEYDOWN_ONCE', { key: e.which });
    }

    this.isKeyDown = true;
    this.keymap[e.which] = true;
    this.eventQueue.push({ type: 'KEYDOWN', key: e.which });
    this.emit('E_KEYDOWN', { key: e.which });
  }

  handleKeyUp(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    this.isKeyDown = false;
    this.keymap[e.which] = false;
    this.eventQueue.push({ type: 'KEYUP', key: e.which });
    this.emit('E_KEYUP', { key: e.which });
  }

  handleMouseDown(e) {
    this.isMouseDown = true;
    this.eventQueue.push({ type: 'MOUSEBUTTONDOWN', position: [e.clientX, e.clientY] });
    this.emit('E_MOUSEBUTTONDOWN', { position: [e.clientX, e.clientY] });
  }

  handleMouseMove(e) {
    if (this.isMouseDown) {
      this.isMouseDrag = true;
      this.eventQueue.push({ type: 'MOUSEDRAG', position: [e.clientX, e.clientY] });
      this.emit('E_MOUSEDRAG', { position: [e.clientX, e.clientY] });
    }

    this.eventQueue.push({ type: 'MOUSEMOVE', position: [e.clientX, e.clientY] });
    this.emit('E_MOUSEMOVE', { position: [e.clientX, e.clientY] });
  }

  handleMouseUp(e) {
    if (this.isMouseDrag) {
      this.isMouseDrag = false;
      this.eventQueue.push({ type: 'MOUSEDROP', position: [e.clientX, e.clientY] });
      this.emit('E_MOUSEDROP', { position: [e.clientX, e.clientY] });
    }

    this.isMouseDown = false;
    this.eventQueue.push({ type: 'MOUSEBUTTONUP', position: [e.clientX, e.clientY] });
    this.emit('E_MOUSEBUTTONUP', { position: [e.clientX, e.clientY] });
  }
}