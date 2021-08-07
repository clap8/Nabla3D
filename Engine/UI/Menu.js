const MENU_AXIS_X = 1;
const MENU_AXIS_Y = 2;
const MENU_AUTOFOCUS = -1;
const MENU_NONEFOCUS = -2;

class Menu extends Component {
  constructor(app, options = {}) {
    super(app, options);
    this.axis = options.axis || MENU_AXIS_Y;
    this.multiple = options.multiple || false;
    this.focusedItem = null;
    this.selectedItems = [];
  }

  focus(focusIndex = MENU_AUTOFOCUS) {
    if (focusIndex == MENU_AUTOFOCUS && !this.focusedItem) {
      this.focusItem(0);
    }
    else if (focusIndex == MENU_AUTOFOCUS && this.focusedItem) {
      this.focusItem(this.getFocusedItemIndex());
    }
    else if (focusIndex >= 0) {
      this.focusItem(focusIndex);
    }

    super.focus();
  }

  getFocusedItemIndex() {
    return Array.from(this.node.children).indexOf(this.focusedItem);
  }

  getSelectedItemIndex() {
    return Array.from(this.node.children).indexOf(this.selectedItems[0]);
  }

  getSelectedItemIndexes() {
    return this.selectedItems.map((item) => Array.from(this.node.children).indexOf(item));
  }

  findItem(fields) {
    for (let i = 0; i < this.node.children.length; i++) {
      let match = true;
      for (let key in fields) {
        match = (this.node.children[i].dataset[key] == fields[key]) && match;
      }
      if (match) {
        return i;
      }
    }

    return -1;
  }

  addItem(htmlFrag, index = -1) {
    let tpl = document.createElement('template');
    tpl.innerHTML = htmlFrag;

    if (index == -1) {
      this.node.appendChild(tpl.content);
    }
    else {
      this.node.insertBefore(tpl.content, this.node.children[index]);
    }
  }

  removeItem(index) {
    let item = this.node.children[index];
    if (!item) {
      throw new Error('Menu::removeItem(): item not found !');
    }

    if (this.selectedItems.indexOf(item) != -1) {
      this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    }
    if (this.focusedItem == item) {
      this.focusedItem = null;
    }

    this.node.removeChild(item);
  }

  focusItem(index, preventScroll = false, emit = true) {
    let item = this.node.children[index];
    if (!item) {
      throw new Error('Menu::focusItem(): item not found !');
    }

    if (!preventScroll) {
      let rect = this.getViewRectItem(index);
      if (rect.top < 0) {
        this.node.scrollTop += rect.top;
      }
      if (rect.bottom > this.node.clientHeight) {
        this.node.scrollTop += rect.bottom - this.node.clientHeight;
      }
    }

    this.unfocusItem();
    item.classList.add(this.className + '-item--focused');
    this.focusedItem = item;

    if (emit) {
      this.emit('E_MENU_ITEM_FOCUSED', { item: item, index: index });
    }
  }

  unfocusItem(emit = true) {
    if (!this.focusedItem) {
      return;
    }

    this.focusedItem.classList.remove(this.className + '-item--focused');
    this.focusedItem = null;

    if (emit) {
      this.emit('E_MENU_ITEM_UNFOCUSED');
    }
  }

  selectItem(index, emit = true) {
    let item = this.node.children[index];
    if (!item) {
      throw new Error('Menu::selectItem(): item not found !');
    }

    if (this.multiple && this.selectedItems.indexOf(item) != -1) {
      this.unselectItem(index);
      return;
    }

    if (!this.multiple) {
      this.unselectItems();
    }

    item.classList.add(this.className + '-item--selected');
    this.selectedItems.push(item);

    if (emit) {
      this.emit('E_MENU_ITEM_SELECTED', { item: item, index: index });
    }
  }

  unselectItem(index, emit = true) {
    let item = this.node.children[index];
    if (!item) {
      throw new Error('Menu::unselectItem(): item not found !');
    }

    if (this.selectedItems.indexOf(item) == -1) {
      return;
    }

    item.classList.remove(this.className + '-item--selected');
    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);

    if (emit) {
      this.emit('E_MENU_ITEM_UNSELECTED', { item: item, index: index });
    }
  }

  unselectItems(emit = true) {
    this.selectedItems.forEach((item) => item.classList.remove(this.className + '-item--selected'));
    this.selectedItems = [];
    
    if (emit) {
      this.emit('E_MENU_UNSELECTED');
    }
  }

  clear() {
    this.node.innerHTML = '';
    this.focusedItem = null;
    this.selectedItems = [];
  }

  getViewRectItem(index) {
    let top = this.node.children[index].offsetTop - this.node.scrollTop;
    let bottom = top + this.node.children[index].offsetHeight;
    return { top, bottom };
  }

  onKeyDownOnce(data) {
    let focusedIndex = this.getFocusedItemIndex();
    if (data.key == KEY_CANCEL) {
      this.emit('E_CLOSED');
    }
    else if (data.key == KEY_ENTER && focusedIndex != -1) {
      this.selectItem(focusedIndex);
    }
    else if ((data.key == KEY_UP && this.axis == MENU_AXIS_Y) || (data.key == KEY_LEFT && this.axis == MENU_AXIS_X)) {
      let prevIndex = (focusedIndex - 1 < 0) ? this.node.children.length - 1 : focusedIndex - 1;
      this.focusItem(prevIndex);
    }
    else if ((data.key == KEY_DOWN && this.axis == MENU_AXIS_Y) || (data.key == KEY_RIGHT && this.axis == MENU_AXIS_X)) {
      let nextIndex = (focusedIndex + 1 > this.node.children.length - 1) ? 0 : focusedIndex + 1;
      this.focusItem(nextIndex);
    }
  }
}