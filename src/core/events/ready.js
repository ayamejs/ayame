const { Event, Utils } = require("ayame");
const { Team } = require("discord.js");

let retries = 0;

class ReadyEvent extends Event {
  async run() {
    try {
      await this.client.fetchApplication();
    } catch (error) {
      if (++retries === 3) return process.exit();
      this.client.emit('warning', `Unable to fetch the application details, going to wait 5 seconds and retry. [Retries Left: ${retries - 3}`);
      await Utils.sleep(5000);
      return this.run();
    }

    // Automagically add application owners as bot owners. This method adds to whatever is configured to options.owners to allow non-application owners access if need be.
    if (!this.client.options.owners.length) {
      if (this.client.application.owner instanceof Team) this.client.options.owners.push(...this.client.application.owner.members.keys());
      else this.client.options.owners.push(this.client.application.owner.id);
    }

    // Initialize all stores.
    await Promise.all(this.client.stores.map((store) => store.init()));

    if (this.client.options.readyMessage !== null) {
      this.client.emit('log', typeof this.client.options.readyMessage) === 'function' ? this.client.options.readyMessage(this.client) : this.client.options.readyMessage;
    }

    return this.client.emit("ayameReady");
  }
}

module.exports = ReadyEvent;
