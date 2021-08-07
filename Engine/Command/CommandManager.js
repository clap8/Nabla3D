class CommandManager extends Base {
  constructor(app) {
    super(app);
    this.commands = [];
  }

  update() {
    while (this.commands.length > 0) {
      let lastCommand = this.commands.pop();
      lastCommand.exec();
    }
  }

  request(command) {
    if (!command instanceof Command) {
      throw new Error('You try to push a non-command class');
    }

    this.commands.push(command);
  }
}