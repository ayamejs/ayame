const { Event } = require("ayame");

class ReadyEvent extends Event {
  async run() {
    if(!this.client.options.owner) {
      const { owner } = await this.client.fetchApplication();
      this.client.options.owner = owner.id;
    }

    // Initialize all stores.
    await Promise.all(this.client.stores.map((store) => store.init()));

    this.client.emit("ayameReady");

    // TODO: this is temporary testing.
    console.log("Ready!");
  }
}

module.exports = ReadyEvent;
