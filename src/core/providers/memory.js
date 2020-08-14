const { Provider } = require("ayame");

class MemoryProvider extends Provider {
  constructor(...args) {
    super(...args);

    this.tables = new Map();
  }

  fetch(table, keys = []) {
    if(keys.length) return (this.tables.get(table) || []).filter(doc => keys.includes(doc.id));
    return (this.tables.get(table) || []);
  }

  get(table, id) {
    return (this.tables.get(table) || []).find(doc => doc.id === id);
  }

  set(table, id, key, value) {
    if(!this.tables.has(table)) this.tables.set(table, []);

    const entry = this.tables.get(table).find(doc => doc.id === id);

    if(entry) {
      entry[key] = value;
    } else {
      this.tables.get(table).push({ id, [key]: value });
    }
  }

  clear(table, id) {
    const entries = this.tables.get(table) || [];
    return entries.splice(entries.findIndex(doc => doc.id === id), 1);
  }

  destroy() {
    return this.tables.clear();
  }
}

module.exports = MemoryProvider;
