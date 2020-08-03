const Store = require("./Store.js");

module.exports = class MonitorStore extends Store {
  constructor(client) {
    super(client, "monitors");
  }

  run(msg) {
    return Promise.all(this.map((monitor) => monitor._run(msg)));
  }
}

