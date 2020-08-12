const Provider = require("./Provider.js");

class MongoDBProvider extends Provider {
  constructor(db, collection) {
    super();

    /**
     * The MongoDB database.
     */
    this.db = db;

    /**
     * The collection this provider is handling.
     * @type {String}
     */
    this.collection = collection;
  }

  fetch(id, cache = true) {
    return this.db.collection(this.collection).findOne({ id })
      .then((doc) => {
        if(doc && cache) this.cache.set(doc.id, doc);
        return doc;
      });
  }

  get(id, key, defaultValue) {
    if(this.cache.has(id)) {
      const value = this.cache.get(id)[key];
      return value == null ? defaultValue : value;
    }

    return defaultValue;
  }
  
  set(id, key, value) {
    const cache = this.cache.get(id) || {};
    cache[key] = value;
    this.cache.set(id, cache);

    return this.db.collection(this.collection).update({ id }, { $set: { [key]: value } }, { upsert: true });
  }

  delete() {
    // TODO: Never had to delete a key before, find out how it's done lmao.
  }

  clear(id) {
    return this.db.collection(this.collection).deleteOne({ id });
  }

  destroy() {
    // TODO: lol.
  }
}

module.exports = MongoDBProvider;
