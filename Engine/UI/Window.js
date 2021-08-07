class Window extends Component {
  constructor(app, options = {}) {
    super(app, options);
    this.uiManager = this.app.getUIManager();
  }

  delete() {
    this.hide();
    super.delete();
  }

  setWidth(width) {
    this.node.style.width = width + 'px';
  }

  setPosition(x = 0, y = 0) {
    this.node.style.left = x + 'px';
    this.node.style.top = y + 'px';
  }

  show() {
    this.uiManager.enableOverlayer(true);
    this.node.classList.add('Window--show');
  }

  hide() {
    this.uiManager.enableOverlayer(false);
    this.node.classList.remove('Window--show');
  }
}