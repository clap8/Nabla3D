class ScriptManager extends Base {
  constructor(app) {
    super(app);
    this.blocks = [];
    this.commandRegister = new Map();
    this.enabled = true;
    this.currentBlockId = '';
    this.currentCallStackIndex = 0;
    this.onBeforeBlockExec = (block) => {};
    this.onAfterBlockExec = (block) => {};
  }

  update() {
    if (!this.enabled) {
      return;
    }

    let currentBlock = this.blocks.find(block => block.id == this.currentBlockId);
    if (!currentBlock) {
      return;
    }

    if (this.currentCallStackIndex == currentBlock.callStack.length) {
      this.onAfterBlockExec(currentBlock);
      this.currentBlockId = '';
      this.currentCallStackIndex = 0;
      return;
    }

    if (this.currentCallStackIndex == 0) {
      this.onBeforeBlockExec(currentBlock);
    }

    let currentCall = currentBlock.callStack[this.currentCallStackIndex];
    let command = this.commandRegister.get(currentCall.name);
    if (!command) {
      throw new Error('ScriptManager::update: try to call an not existant command ' + currentCall.name + ' !');
    }

    let jumpto = command.call(this, ...currentCall.args);
    if (jumpto) {
      this.currentBlockId = jumpto;
      this.currentCallStackIndex = 0;
      return;
    }

    if (this.currentCallStackIndex < currentBlock.callStack.length) {
      this.currentCallStackIndex++;
    }
  }

  loadFromFile(path) {
    let json = JSON.parse(Filesystem.readFile(path));

    for (let objBlock of json) {
      let block = {};
      block.id = objBlock['Id'];
      block.description = objBlock['Description'];
      block.callStack = [];
      for (let objCall of objBlock['CallStack']) {
        let call = {};
        call.name = objCall['Name'];
        call.args = objCall['Args'];
        block.callStack.push(call);
      }

      this.blocks.push(block);
    }
  }

  registerCommand(key, commandFunc = () => {}) {
    if (this.commandRegister.has(key)) {
      throw new Error('ScriptManager::registerCommand: key already exist !')
    }
    
    this.commandRegister.set(key, commandFunc);
  }

  clearCommandRegister() {
    this.commandRegister = new Map();
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  jump(blockId) {
    this.currentBlockId = blockId;
    this.currentCallStackIndex = 0;
  }
}