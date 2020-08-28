const Store = require("./Store.js");

class LanguageStore extends Store {
  constructor(client) {
    super(client, "languages");
  }

  get default() {
    return this.get(this.client.options.defaultLanguage);
  }
}

module.exports = LanguageStore;
