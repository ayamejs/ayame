const Store = require("./Store.js");

class InhibitorStore extends Store {
  constructor(client) {
    super(client, "inhibitors");
  }

  // Will reject the promise when any inhibitor blocks.
  // The resulting error is either a string to reply or no reason.
  async run(msg, command) {
    // Run inhibitors until one of them inhibits.
    for(const inhibitor of this.values()) {
      const result = await inhibitor.run(msg, command);
      if(result && typeof result === "string") throw result;
      if(result) throw undefined;
    }
  }
}

module.exports = InhibitorStore;
