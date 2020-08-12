
/**
 * Wraps a provider and gives access to easier to call methods reducing the need of providing IDs.
 */
class SettingsHelper {
  /**
   * @param {AyameClient} - The client.
   * @param {String|any} entity - The entity to wrap. Either a string or an object with .id
   * @param {String} [property="provider"] - The client property that holds the provider.
   */
  constructor(client, entity, property = "provider") {

    /**
     * The Client.
     * @type {AyameClient}
     */
    this.client = client;

    /**
     * The entity being wrapped.
     * @type {String|any}
     */
    this.entity = entity;

    /**
     * The client property that holds the provider.
     * @type {String}
     */
    this.property = property;
  }

  /**
   * The ID of the entity used for the calls.
   */
  get id() {
    return this.entity && this.entity.id ? this.entity.id : this.entity;
  }

  get provider() {
    return this.client[this.property];
  }

  /**
   * Refetch this entity, used as a means to synchronize data changes.
   * @param {Boolean} [cache=true] - Wether to update the cache with the results.
   */
  fetch(cache = true) {
    if(!this.provider) throw new Error("Provider not set.");
    return this.provider.fetch(this.id, cache);
  }

  get(key, defaultValue) {
    // Allow the framework to internally access some guild settings.
    // If the user did not set a provider allow the defaults to pass through.
    if(!this.provider) return defaultValue;
    return this.provider.get(this.id, key, defaultValue);
  }

  set(key, value) {
    if(!this.provider) throw new Error("Provider not set.");
    return this.provider.set(this.id, key, value);
  }

  delete(key) {
    if(!this.provider) throw new Error("Provider not set.");
    return this.provider.delete(this.id, key);
  }

  clear() {
    if(!this.provider) throw new Error("Provider not set.");
    return this.provider.clear(this.id);
  }
}

module.exports = SettingsHelper;
