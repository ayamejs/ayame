const { Client, Collection, Util: { mergeDefault } } = require("discord.js");
const { DefaultOptions } = require("./utils/constants.js");
const { dirname, join } = require("path");
const CommandStore = require("./structures/CommandStore.js");
const EventStore = require("./structures/EventStore.js");
const InhibitorStore = require("./structures/InhibitorStore.js");
const MonitorStore = require("./structures/MonitorStore.js");
const ArgumentStore = require("./structures/ArgumentStore.js");
const LanguageStore = require("./structures/LanguageStore");
const AyameConsole = require("./utils/AyameConsole.js");
const GatewayManager = require("./settings/GatewayManager.js");
const Gateway = require("./settings/Gateway.js");
const ProviderStore = require("./structures/ProviderStore.js");

const plugins = new Set();

/**
 * The extended discord.js client.
 */
class AyameClient extends Client {
  constructor(options = {}) {
    super(mergeDefault(DefaultOptions, options));

    this.console = options.console || new AyameConsole();

    this.userBaseDirectory = options.baseDirectory || dirname(require.main.filename);

    this.gateways = new GatewayManager(this);

    // Stores.
    this.commands = new CommandStore(this);
    this.events = new EventStore(this);
    this.monitors = new MonitorStore(this);
    this.inhibitors = new InhibitorStore(this);
    this.arguments = new ArgumentStore(this);
    this.languages = new LanguageStore(this);
    this.providers = new ProviderStore(this);
    
    this.stores = new Collection();
    
    this.registerStore(this.commands)
      .registerStore(this.events)
      .registerStore(this.monitors)
      .registerStore(this.inhibitors)
      .registerStore(this.arguments)
      .registerStore(this.languages)
      .registerStore(this.providers);

    // Initialize gateways.
    // Guilds is always available as it is needed for prefix/language
    // Other gateways are optional and can be disabled.
    // More gateways can be added manually.
    this.gateways.register(new Gateway(this, "guilds", this.options.gateways.guilds));
    
    if(this.options.gateways.users)
      this.gateways.register(new Gateway(this, "users", this.options.gateways.users));

    if(this.options.gateways.client)
      this.gateways.register(new Gateway(this, "clientStorage", this.options.gateways.client));

    for(const store of this.stores.values()) store.registerDirectory(join(__dirname, "core"));

    for(const plugin of plugins) plugin.call(this);
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
    // Load all pieces.
    await this.init();

    return super.login(token);
  }

  async init() {
    const loaded = await Promise.all(this.stores.map((store) => store.loadAll().then((size) => [size, store])));

    for(const store of loaded) this.emit("piecesLoaded", store[1].name, store[0]);

    await this.providers.init();
  }

  static use(plugin) {
    const func = plugin[this.plugin];
    if(typeof func !== "function") throw new TypeError("The given plugin does not export a plugin function.");
    plugins.add(func);
    return this;
  }
}

AyameClient.plugin = Symbol("AyamePlugin");

module.exports = AyameClient;
