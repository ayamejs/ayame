const { Collection } = require("discord.js");
const { join, relative, parse } = require("path");
const { walk } = require("../utils/Utils.js");

/**
 * The base store.
 * @extends Collection
 */
class Store extends Collection {
  /**
   * Constructs a new store.
   * @param {AyameClient} client - The client.
   * @param {String} name - The plural name of this store.
   */
  constructor(client, name) {
    super();

    /**
     * The client.
     * @type {AyameClient}
     */
    this.client = client;

    /**
     * The plural name of this store.
     * @type {String}
     */
    this.name = name;

    /**
     * Directories to load from.
     * @type {Set<String>}
     */
    this.directories = new Set();
  }

  /**
   * Registers a new directory to load from.
   * @param {String} dir - The directory.
   */
  registerDirectory(dir) {
    this.directories.add(join(dir, this.name));
    return this;
  }

  /**
   * The user directory to this store.
   * @type {String}
   */
  get userDirectory() {
    return join(this.client.userBaseDirectory, this.name);
  }

  /**
   * Adds a piece to this store.
   * @param {Piece} piece - The piece to load.
   * @returns {Piece}
   */
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
   * @param {String} dir - The directory.
   * @param {String} file - The file.
   * @returns {Piece}
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

  /**
   * Initializes all pieces calling their init() method.
   * @returns {Promise<*>}
   */
  init() {
    return Promise.all(this.map((piece) => piece.enabled ? piece.init() : piece.unload()));
  }

  /**
   * Walks files and returns a promise that resolves with the amount of pieces loaded.
   * @param {String} dir - The directory to load from.
   * @returns {Promise<Number>} The amount of pieces loaded.
   */
  async loadFiles(dir) {
    const files = await walk(dir, {
      // Make it easy for CoffeeScript users to use this framework.
      // If they load the coffeescript/register module it allows require()ing .coffee files.
      // so we'll assume they are using it and allow .coffee files.
      filter: (stats, file) => stats.isFile() && (file.endsWith(".js") || file.endsWith(".coffee"))
    }).catch(() => null);

    if(!files) return 0;

    for(const file of files.keys()) this.load(dir, relative(dir, file));

    return this.size;
  }

  /**
   * Loads all pieces.
   * @returns {Promise<Number>} The amount of pieces loaded.
   */
  async loadAll() {
    this.clear();

    for(const dir of this.directories) await this.loadFiles(dir);
    await this.loadFiles(this.userDirectory);

    return this.size;
  }
}

module.exports = Store;
