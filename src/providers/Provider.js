
/**
 * Base provider, must be extended and implemented.
 */
class Provider {
  constructor() {

    /**
     * Cached entries.
     * @type {Map<string, Object>}
     */
    this.cache = new Map();
  }

  // TODO: Throw a not-implemented error.

  /**
   * Initializes the provider.
   * @abstract
   */
  init() {}

  /**
   * Fetches an entry directly from the database bypassing cache.
   * Can return a promise.
   * @param {String} id - The ID of the entry.
   * @param {Boolean} [cache=true] - Wether to cache the results.
   */
  fetch() {}

  /**
   * Gets a key or the default value if not found.
   * @param {String} id - ID of the entry.
   * @param {String} key - The key to get.
   * @param {any} [defaultValue] - A default value to return if not found.
   * @abstract
   */
  get() {}

  /**
   * Sets a key.
   * @param {String} id - ID of the entry.
   * @param {String} key - The key to set.
   * @param {any} value - The value to set.
   * @abstract
   */
  set() {}

  /**
   * Deletes a key.
   * @param {String} id - ID of the entry.
   * @param {String} key - The key to delete.
   * @abstract
   */
  delete() {}

  /**
   * Clears an entry from the database.
   * @param {String} id - ID of the entry.
   * @abstract
   */
  clear() {}

  /**
   * Shuts down the provider.
   */
  destroy() {}
}

module.exports = Provider;
