
module.exports = class Piece {
  constructor(client, store, file, options = {}) {
    this.client = client;
    this.store = store;
    this.file = file;
    this.name = options.name || file.name;
    this.enabled = typeof options.enabled !== "undefined" ? options.enabled : true;
  }

  get type() {
    return this.store.name.slice(0, -1);
  }

  async reload() {
    const reloaded = this.store.load(this.file.path);
    await reloaded.init();
    return reloaded;
  }

  disable() {
    this.enabled = false;
    return this;
  }

  enable() {
    this.enabled = true;
    return this;
  }

  unload() {
    return this.store.delete(this.name);
  }

  async init() {}
}


