const Store = require("./Store.js");

module.exports = class InhibitorStore extends Store {
  constructor(client) {
    super(client, "inhibitors");
  }

  // Will reject the promise when any inhibitor blocks.
  // The resulting error is either a string to reply or no reason.
  async run(ctx, command) {
    // Run inhibitors until one of them inhibits.
    for(const inhibitor of this.values()) {
      const result = await inhibitor.run(ctx, command);
      if(result && typeof result === "string") throw result;
      if(result) throw undefined;
    }
  }
}


