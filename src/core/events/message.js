const { Event } = require("ayame");

class MessageEvent extends Event {
  async run(msg) {
    return this.client.monitors.run(msg);
  }
}

module.exports = MessageEvent;
