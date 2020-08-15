const { Collection } = require("discord.js");
const Settings = require("./Settings.js");
const Provider = require("../structures/Provider.js");

/**
 * A gateway manages storage for a single entity.
 */
class Gateway {
  /**
   * Constructs a new gateway.
   * @param {AyameClient} client - The client.
   * @param {String} table - The table for this gateway to manage.
   * @param {Provider} [provider=null] - The provider to use for this gateway. Null to use default.
   */
  constructor(client, table, provider = null) {

    /**
     * The Client.
     * @type {AyameClient}
     */
    this.client = client;

    /**
     * The table/collection this gateway manages.
     * @type {String}
     */
    this.table = table;

    /**
     * The provider name this gateway uses.
     * @type {Provider}
     */
    this.providerName = typeof provider === "string" ? provider : null;

    /**
     * The collection where the cache for this gateway is stored.
     * @type {Collection}
     */
    this.cache = client[table] && client[table].cache instanceof Map ? client[table].cache : new Collection();

    /**
     * Wether this gateway was synchronized.
     * @type {Boolean}
     */
    this.synced = false;

    /**
     * Promises queue for synchronizing entries.
     * @type {Collection<String, Promise<*>>}
     */
    this.syncQueue = new Collection();
  }

  get provider() {
    return this.providerName ? this.client.providers.get(this.providerName) : this.client.providers.default;
  }

  /**
   * Gets a gateway entry from the cache or creates one if asked.
   * @param {String} id - The ID of the entry.
   * @param {Boolean} [create=false] - Wether to create the entry if not found.
   */
  get(id, create = false) {
    const entry = this.cache.get(id);
    if(entry) return entry.settings;
    
    if(create) {
      const settings = new Settings(this, { id });
      if(this.synced) settings.sync(true).catch(err => this.client.emit("error", err));
      return settings;
    }
    
    return null;
  }
  
  async sync(keys = [...this.cache.keys()]) {
    if(Array.isArray(keys)) {
      if (!this.synced) this.synced = true;

      const entries = await this.provider.fetch(this.table, keys);

      for(const entry of entries) {
        if(!entry) continue;

        const cache = this.get(entry.id);
        if(cache) cache._data = entry;
      }

      return this;
    }
    
    const cache = this.get((keys && keys.id) || keys);
    return cache ? cache.sync(true) : null;
  }
}

module.exports = Gateway;
