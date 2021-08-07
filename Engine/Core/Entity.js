class Entity extends Base {
  constructor(app, data) {
    super(app);
    this.id = '';

    if (!data.hasOwnProperty('Id')) {
      return;
    }

    this.id = data['Id'];
  }

  fromJSON(json) {
    // virtual method called during deserialize phase !
  }

	toJSON() {
    // virtual method called during serialize phase !
  }
}