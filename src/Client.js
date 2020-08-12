const { Client, Collection, Util: { mergeDefault }, Permissions, User } = require("discord.js");
const { dirname, join } = require("path");

// structures
const CommandStore = require("./structures/CommandStore.js");
const EventStore = require("./structures/EventStore.js");
const InhibitorStore = require("./structures/InhibitorStore.js");
const MonitorStore = require("./structures/MonitorStore.js");
const ArgumentStore = require("./structures/ArgumentStore.js");
const LocaleStore = require("./structures/LocaleStore");

// util
const AyameConsole = require("./utils/AyameConsole.js");
const { DefaultOptions } = require("./utils/constants.js");
const ArgumentStore = require("./structures/ArgumentStore.js");
const LocaleStore = require("./structures/LocaleStore");

// plugins
const plugins = new Set();

class AyameClient extends Client {
  /**
 * Constructs the client.
 * @param {Options} [options = {}] Options to pass to the default client.
 */
  constructor(options = {}) {
    if (options && options.constructor !== Object) throw new TypeError('The provided client options must be an object.');
    options = mergeDefault(DefaultOptions, options)
    super(options);

    /**
     * The directory where all users files are stored at.
     */
    this.userBaseDirectory = dirname(require.main.filename);


    /**
     * The AyameConsole for this client.
     * @type {AyameConsole}
     */
    this.console = options.console || new AyameConsole(this.options.console);

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
     * This is where all arguments are stored.
     * @type {ArgumentStore}
     */
    this.arguments = new ArgumentStore(this);
    
    /**
     * This is where all locales are stored.
     * @type {LocaleStore}
     */
    this.locales = new LocaleStore(this);

    /**
     * Application information cached from oauth2 application.
     * @type {external:ClientApplication}
     */
    this.application = null;

    /**
		 * The regexp for a prefix mention
		 * @since 0.5.0
		 * @type {RegExp}
		 */
		this.mentionPrefix = null;
    
    /**
     * The registry for all stores.
     * @type {external:Collection}
     */
    this.stores = new Collection();
    
    this.registerStore(this.commands)
      .registerStore(this.events)
      .registerStore(this.monitors)
      .registerStore(this.inhibitors)
      .registerStore(this.arguments)
      .registerStore(this.locales);

    /**
     * The provider being used if any.
     * @type {?Provider}
     */
    this.provider = null;

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
   * Who are the owners for this bot?
   * @type {Set<User>}
   * @readonly
   */
  get owners() {
    const owners = new Set();
    for (const owner of this.options.owners) {
      const user = this.users.resolveID(owner);
      if (user) owners.add(user);
    }
    return owners;
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
	 * Uses discordjs to fetch the oauth application and cache it.
	 * @returns {external:ClientApplication}
	 */
	async fetchApplication() {
		this.application = await super.fetchApplication();
		return this.application;
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

  /**
   * Sets and initializes the given provider.
   */
  async setProvider(provider) {
    this.provider = provider;
    await this.provider.init();
    return provider;
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