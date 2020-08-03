const { Collection } = require("discord.js");
const { join, relative, parse } = require("path");
const { walk } = require("../utils/Utils.js");

module.exports = class Store extends Collection {
  constructor(client, name) {
    super();

    this.client = client;
    this.name = name;
    this.directories = new Set();
  }

  registerDirectory(dir) {
    this.directories.add(join(dir, this.name));
    return this;
  }

  get userDirectory() {
    return join(this.client.userBaseDirectory, this.name);
  }

  set(piece) {
    const exists = this.get(piece.name);
    if(exists) this.delete(piece.name);
    super.set(piece.name, piece);
    return piece;
  }

  delete(key) {
    const exists = this.get(key);
    if(!exists) return false;
    return super.delete(key);
  }

  /**
   * Loads a single file.
   */
  load(dir, file) {
    const filepath = join(dir, file);

    const Piece = (mod => mod.default || mod)(require(filepath));
    
    if(typeof Piece !== "function" || typeof Piece.constructor !== "function")
      throw new TypeError(`The piece (${filepath}) does not export a class.`);
    
    const piece = this.set(new Piece(this.client, this, {
      path: file,
      name: parse(filepath).name
    }));
    
    delete require.cache[filepath];
    module.children.pop();
    return piece;
  }

  init() {
    return Promise.all(this.map((piece) => piece.enabled ? piece.init() : piece.unload()));
  }

  /**
   * Walks files and returns a promise that resolves with the amount of pieces loaded.
   */
  async loadFiles(dir) {
    const files = await walk(dir, {
      filter: (stats, file) => stats.isFile() && (file.endsWith(".js") || file.endsWith(".coffee"))
    }).catch(() => null);

    if(!files) return 0;

    for(const file of files.keys()) this.load(dir, relative(dir, file));

    return this.size;
  }

  async loadAll() {
    this.clear();

    for(const dir of this.directories) await this.loadFiles(dir);
    await this.loadFiles(this.userDirectory);

    return this.size;
  }
}


