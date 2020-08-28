const Store = require("./Store.js");

class ProviderStore extends Store {
  constructor(client) {
    super(client, "providers");
  }

  get default() {
    return this.get(this.client.options.providers.default);
  }

  shutdown() {
    return Promise.all(this.map(provider => provider.shutdown()));
  }
}

module.exports = ProviderStore;
