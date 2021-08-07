class Collection extends Base {
  constructor(app) {
    super(app);
    this.array = [];
  }

  add(item) {
    this.array.push(item);
    this.emit('E_COLLECTION_ITEM_ADDED', { item: item, index: this.array.indexOf(item) });
  }

  remove(index) {
    let item = this.array[index];
    this.array.splice(index, 1);
    this.emit('E_COLLECTION_ITEM_REMOVED', { item: item, index: index });
  }

  get(index) {
    return this.array[index];
  }

  map(cb) {
    return this.array.map(cb);
  }

  length() {
    return this.array.length;
  }

  find(item) {
    return this.array.indexOf(item);
  }

  toArray() {
    return this.array.slice();
  }

  forEach(cb) {
    this.array.forEach(cb);
  }

  [Symbol.iterator]() {
    let currentIndex = 0;
    let array = this.array;
    return {
      next() {
        let isDone = currentIndex >= array.length;
        return {
          value: array[currentIndex++],
          done: isDone
        }
      }
    }
  }
}