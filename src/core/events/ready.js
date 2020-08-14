const { Event } = require("ayame");
const { Team } = require("discord.js");

class ReadyEvent extends Event {

  async run() {
    if(!this.client.options.owner) {
      const { owner } = await this.client.fetchApplication();

      if(owner instanceof Team) {
        this.client.options.owner = [...owner.members.keys()];
      } else {
        this.client.options.owner = owner.id;
      }
    }

    // Add the users gateway if requested.
    if(this.client.options.gateways.client) {
      this.client.settings = this.client.gateways.clientStorage.get(this.client.user.id, true);
      this.client.gateways.clientStorage.cache.set(this.client.user.id, this.client);
    }

    // Initialize providers first.
    await this.client.providers.init();
    // Synchronize settings before initializing other stores.
    await this.client.gateways.syncAll();

    // Initialize the remaining stores.
    await Promise.all(this.client.stores
      .filter(store => store.name !== "providers")
      .map(store => store.init()));

    this.client.emit("ayameReady");
  }
}

module.exports = ReadyEvent;
