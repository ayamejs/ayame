const Provider = require("./Provider.js");

/**
 * An in-memory store provider.
 * Only meant for testing purposes, please use a persistent provider in production.
 */
class MemoryProvider extends Provider {

  fetch(id) {
    // There is no main data source, the cache is our whole store.
    return this.cache.get(id);
  }

  get(id, key, defaultValue) {
    if(this.cache.has(id)) {
      const value = this.cache.get(id)[key];
      return value == null ? defaultValue : value;
    }

    return defaultValue;
  }

  set(id, key, value) {
    const doc = this.cache.get(id) || { id };
    doc[key] = value;
    this.cache.set(doc.id, doc);
  }

  delete(id, key) {
    if(this.cache.has(id)) {
      delete this.cache.get(id)[key];
    }
  }

  clear(id) {
    return this.cache.delete(id);
  }

  destroy() {
    return this.cache.clear();
  }
}

module.exports = MemoryProvider;
