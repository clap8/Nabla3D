class UIManager extends Base {
  constructor(app) {
    super(app);
    this.focusedComponent = null;
    this.components = [];

    this.root = document.getElementById('UI_ROOT');
    if (!this.root) {
      throw new Error('UIManager::UIManager: UI_ROOT element not found !');
    }

    this.fadeLayer = document.getElementById('UI_FADELAYER');
    if (!this.fadeLayer) {
      throw new Error('UIManager::UIManager: UI_FADELAYER element not found !');
    }

    this.overLayer = document.getElementById('UI_OVERLAYER');
    if (!this.overLayer) {
      throw new Error('UIManager::UIManager: UI_OVERLAYER element not found !');
    }
  }

  update() {
    for (let component of this.components) {
      component.update();
    }
  }

  focus(component) {
    if (this.focusedComponent) {
      this.focusedComponent.unfocus();
    }

    component.focus();
    this.focusedComponent = component;
    this.emit('E_FOCUSED', { component: component });
  }

  unfocus() {
    if (!this.focusedComponent) {
      return;
    }

    this.focusedComponent.unfocus();
    this.focusedComponent = null;
    this.emit('E_UNFOCUSED');
  }

  addNode(node, styles = '') {
    node.style.cssText += styles;
    this.root.appendChild(node);
  }

  removeNode(node) {
    this.root.removeChild(node);
  }

  addComponent(component, styles = '') {
    component.node.style.cssText += styles;
    this.root.appendChild(component.node);
    this.components.push(component);
    return component;
  }

  removeComponent(component) {
    let index = this.components.indexOf(component);
    if (index == -1) {
      throw new Error('UIManager::removeComponent: fail to remove component !');
    }

    if (this.components[index] == this.focusedComponent) {
      this.unfocus();
    }

    this.components[index].delete();
    this.components.splice(index, 1);
    return true;
  }

  removeComponentBy(cb) {
    for (let component of this.components) {
      if (cb && cb(component)) {
        this.removeComponent(component);
      }
    }
  }

  clear() {
    this.root.innerHTML = '';
    this.focusedComponent = null;

    while (this.components.length > 0) {
      let component = this.components.pop();
      component.delete();
    }
  }

  enableOverlayer(enable) {
    this.overLayer.style.opacity = (enable) ? '1' : '0';
  }

  fadeIn(delay, ms, transitionTimingFunction = 'linear', cb = () => {}) {
    this.fadeLayer.style.transitionDuration = ms + 'ms';
    this.fadeLayer.style.transitionDelay = delay + 'ms';
    this.fadeLayer.style.transitionTimingFunction = transitionTimingFunction;
    this.fadeLayer.style.opacity = 1;
    setTimeout(() => { cb(); }, delay + ms);
  }

  fadeOut(delay, ms, transitionTimingFunction = 'linear', cb = () => {}) {
    this.fadeLayer.style.transitionDuration = ms + 'ms';
    this.fadeLayer.style.transitionDelay = delay + 'ms';
    this.fadeLayer.style.transitionTimingFunction = transitionTimingFunction;
    this.fadeLayer.style.opacity = 0;
    setTimeout(() => { cb(); }, delay + ms);
  }
}