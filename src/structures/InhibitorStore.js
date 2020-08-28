const Store = require("./Store.js");

class InhibitorStore extends Store {
  constructor(client) {
    super(client, "inhibitors");
  }

  async run(msg, command) {
    const promises = [];

    for(const inhibitor of this.values()) {
      if(inhibitor.enabled) promises.push(inhibitor._run(msg, command));
    }
    
    const result = (await Promise.all(promises)).filter(res => res);
    if(result.includes(true)) throw undefined;
    if(result.length) throw result;
  }
}

module.exports = InhibitorStore;
