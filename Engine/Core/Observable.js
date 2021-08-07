class Observable {
  constructor() {
    this.subscribers = {};
  }

  subscribe(ref, type, cb) {
    if (!type) {
      return;
    }
    if (!cb || typeof cb != 'function') {
      return;
    }

    if (!this.subscribers.hasOwnProperty(type)) {
      this.subscribers[type] = [];
    }

    this.subscribers[type].push({
      ref: ref,
      cb: cb
    });
  }

  unsubscribe(ref, type) {
    if (!this.subscribers.hasOwnProperty(type)) {
      return;
    }

    for (let subscriber of this.subscribers[type]) {
      if (subscriber.ref == ref) {
        this.subscribers[type].splice(this.subscribers[type].indexOf(subscriber), 1);
        return;
      }
    }
  }

  unsubscribeAll() {
    this.subscribers = [];
  }

  emit(type, data) {
    if (!type || type == '') {
      return;
    }
    if (!this.subscribers.hasOwnProperty(type)) {
      return;
    }

    for (let subscriber of this.subscribers[type].slice()) {
      subscriber.cb.call(subscriber.ref, data);
    }
  }

  static subscribeFrom(target, ref, type, cb) {
    if (!target) {
      return;
    }

    target.subscribe(ref, type, cb);
  }

  static unsubscribeFrom(target, ref, type) {
    if (!target) {
      return;
    }

    target.unsubscribe(ref, type);
  }

  static safeSubscribeFrom(target, ref, type, cb) {
    if (!target) {
      throw new Error('Observable::safeSubscribeFrom(): Target is undefined !');
    }

    target.subscribe(ref, type, cb);
  }

  static safeUnsubcribeFrom(target, ref, type, cb) {
    if (!target) {
      throw new Error('Observable::safeUnsubcribeFrom(): Target is undefined !');
    }

    target.subscribe(ref, type, cb);
  }
}