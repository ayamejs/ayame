const { Client, Collection, Util: { mergeDefault } } = require("discord.js");
const { DefaultOptions } = require("./utils/constants.js");
const { dirname, join } = require("path");
const CommandStore = require("./structures/CommandStore.js");
const EventStore = require("./structures/EventStore.js");
const InhibitorStore = require("./structures/InhibitorStore.js");
const MonitorStore = require("./structures/MonitorStore.js");
const ArgumentStore = require("./structures/ArgumentStore.js");
const LocaleStore = require("./structures/LocaleStore");
const AyameConsole = require("./utils/AyameConsole.js");

/**
 * The extended discord.js client.
 */
class AyameClient extends Client {
  constructor(options = {}) {
    super(mergeDefault(DefaultOptions, options));

    this.console = options.console || new AyameConsole();

    this.userBaseDirectory = dirname(require.main.filename);

    // Stores.
    this.commands = new CommandStore(this);
    this.events = new EventStore(this);
    this.monitors = new MonitorStore(this);
    this.inhibitors = new InhibitorStore(this);
    this.arguments = new ArgumentStore(this);
    this.locales = new LocaleStore(this);
    
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
  }

  async getPrefix(msg) {
    if(typeof this.options.prefix === "function") return this.options.prefix(msg);
    if(typeof this.options.prefix === "string") return this.options.prefix;

    // Default prefix.
    return "!";
  }

  /**
   * Checks if the given user is an owner.
   * @param {UserResolveable} user - The user to check.
   */
  isOwner(user) {
    const id = this.users.resolveID(user);

    return Array.isArray(this.options.owner) ?
      this.options.owner.includes(id) :
      this.options.owner === id;
  }

  /**
   * Registers a new store to load from.
   * Must be called before client is logged in.
   * @param {Store} store - The store to register.
   */
  registerStore(store) {
    this.stores.set(store.name, store);
    return this;
  }

  async login(token) {
    await this.init();
    return super.login(token);
  }

  async init() {
    const loaded = await Promise.all(this.stores.map((store) => store.loadAll().then((size) => [size, store])));

    for(const store of loaded) this.emit("piecesLoaded", store[1].name, store[0]);
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
