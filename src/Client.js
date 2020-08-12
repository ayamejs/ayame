const { Client, Collection, Util: { mergeDefault }, Permissions } = require("discord.js");
const { dirname, join } = require("path");

// structures
const CommandStore = require("./structures/CommandStore.js");
const EventStore = require("./structures/EventStore.js");
const InhibitorStore = require("./structures/InhibitorStore.js");
const MonitorStore = require("./structures/MonitorStore.js");

// util
const AyameConsole = require("./utils/AyameConsole.js");
const { DefaultOptions } = require("./utils/constants.js");

// plugins
const plugins = new Set();

class AyameClient extends Client {
  /**
 * Constructs the client.
 * @param {Options} [options = {}] Options to pass to the default client.
 */
  constructor(options = {}) {
    super(mergeDefault(DefaultOptions, options));

    /**
     * The AyameConsole for this client.
     * @type {AyameConsole}
     */
    this.console = options.console || new AyameConsole(this.options.console);

    /**
     * The directory where all users files are stored at.
     */
    this.userBaseDirectory = dirname(require.main.filename);

    /**
     * This is where all commands are stored.
     * @type {CommandStore}
     */
    this.commands = new CommandStore(this);

    /**
     * This is where all events are stored.
     * @type {EventStore}
     */
    this.events = new EventStore(this);

    /**
     * This is where all monitors are stored.
     * @type {MonitorStore}
     */
    this.monitors = new MonitorStore(this);

    /**
     * This is where all inhibitors are stored.
     * @type {InhibitorStore}
     */
    this.inhibitors = new InhibitorStore(this);
    
    /**
     * The registry for all stores.
     * @type {external:Collection}
     */
    this.stores = new Collection();
    
    this.registerStore(this.commands)
      .registerStore(this.events)
      .registerStore(this.monitors)
      .registerStore(this.inhibitors);

    for(const store of this.stores.values()) store.registerDirectory(join(__dirname, "core"));
    for(const plugin of plugins) plugin.call(this);
  }

  /**
   * Use function or string to resolve the current prefix.
   * @param {Message} msg The message to check against.
   * @returns {String}
   */

  async getPrefix(msg) {
    if(typeof this.options.prefix === "function") return this.options.prefix(msg);
    if(typeof this.options.prefix === "string") return this.options.prefix;

    // Default prefix.
    return "!";
  }

  /**
   * Checks if the given user is an owner.
   * @param {string} user A resolvable snowflake user id.
   * @returns Boolean
   */
  isOwner(user) {
    const id = this.users.resolveID(user);

    return Array.isArray(this.options.owner) ?
      this.options.owner.includes(id) :
      this.options.owner === id;
  }

  /**
   * Registers a custom store to this client.
   * @param {Store} store The store that your base will be stored in.
   * @returns {this} 
   * @chainable
   */
  registerStore(store) {
    this.stores.set(store.name, store);
    return this;
  }

  /**
	 * Un-registers a custom store from the client
	 * @param {Store} store The store that your base will be stored in.
	 * @returns {this}
	 * @chainable
	 */
	unregisterStore(store) {
		this.pieceStores.delete(store);
		return this;
	}

  /**
   * You use this to login into Discord with your bot.
   * @param {string} token Your discord bot's token.
   * @returns {string}
   */
  async login(token) {
    const loaded = await Promise.all(this.stores.map((store) => store.loadAll().then((size) => [size, store])));
    for(const store of loaded) this.emit("piecesLoaded", store[1].name, store[0]);
    return super.login(token);
  }

  /**
   * Uses a plugin module in AyameClient.
   * @param {Object} plugin The module of the plugin we're using.
   * @returns {this}
   * @chainable
   */
  static use(plugin) {
    const plugin = mod[this.plugin];
    if (typeof plugin !== 'function') throw new TypeError('The provided module does not include a plugin function.');
    plugins.add(plugin);
    return this;
  }
}

module.exports = AyameClient;

/**
 * The base permissions that are required by discord (somewhere). [VIEW_CHANNEL, SEND_MESSAGES]
 * @type {Permissions}
 */
AyameClient.basePermissions = new Permissions(3072);

/**
 * The plugin symbol to be used in external packages.
 * @type {Symbol}
 */
AyameClient.plugin = Symbol('AyamePlugin');