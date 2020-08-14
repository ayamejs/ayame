
/**
 * Represents a settings entry.
 */
class Settings {
  /**
   * Constructs a new settings instance.
   * Warning: Not recommended to manually construct these.
   * They get constructed by their respective gateways.
   * @param {Gateway} gateway - The gateway for this entry.
   * @param {Object} data - The data for this entry.
   */
  constructor(gateway, data = {}) {

    /**
     * The gateway for this entry.
     * @type {Gateway}
     */
    this.gateway = gateway;

    /**
     * The entry ID of this settings.
     * @type {String}
     */
    this.id = data.id;

    this._data = data;
  }

  /**
   * Get a settings key.
   * @param {String} key - The key to get.
   * @param {any} defaultValue - The default value to return if not found.
   * @returns {?any}
   */
  get(key, defaultValue) {
    const value = this._data[key];
    return value == null ? defaultValue : value;
  }

  /**
   * Set a settings key.
   * @param {String} key - The key to set.
   * @param {any} value - The value to set.
   * @returns {Promise<Settings>}
   */
  async set(key, value) {
    await this.gateway.provider.set(this.gateway.table, this.id, key, value);
    this._data[key] = value;
    return this;
  }

  /**
   * Destroys this settings entry from the database.
   * @returns {Promise<void>}
   */
  destroy() {
    return this.gateway.provider.clear(this.table, this.id);
  }

  /**
   * Synchronize this entry with database.
   * @param {Boolean} [force=false] - Force a sync even if it's already synchronizing.
   * @returns {Promise<Settings>}
   */
  sync(force = false) {
    const sync = this.gateway.syncQueue.get(this.id);
    if(!force || sync) return sync || Promise.resolve(this);

    const promise = this.gateway.provider.get(this.gateway.table, this.id)
      .then((data) => {
        if(data) this._data = data;
        this.gateway.syncQueue.delete(this.id);
        return this;
      });

    this.gateway.syncQueue.set(this.id, promise);
    return promise;
  }

  toJSON() {
    return this._data;
  }

  toString() {
    return `(Settings:${this.gateway.table}:${this.id})`;
  }
}

module.exports = Settings;
