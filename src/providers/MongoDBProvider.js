const Provider = require("../structures/Provider.js");

class MongoDBProvider extends Provider {
  constructor(db) {
    super();

    /**
     * The MongoDB database.
     */
    this.db = db;
  }

  init() {
    // TODO: connect.
    // Actually have to get this out of here. Put it in seperate modules/some pieces repo etc.
    // It will need to depend on mongodb package.
  }

  fetch(table, keys = []) {
    if(keys.length) {
      return this.db.collection(table).find({ id: { $in: keys } }, { projection: { _id: 0 } }).toArray();
    }

    return this.db.collection(table).find({}, { projection: { _id: 0 } }).toArray();
  }

  get(table, id) {
    return this.db.collection(table).findOne({ id }, { projection: { _id: 0 } });
  }
  
  set(table, id, key, value) {
    return this.db.collection(table).update({ id }, { $set: { [key]: value } }, { upsert: true });
  }

  clear(table, id) {
    return this.db.collection(table).deleteOne({ id });
  }

  shutdown() {
    // TODO: imaginary client until we add connection logic.
    return this.client.close();
  }
}

module.exports = MongoDBProvider;
