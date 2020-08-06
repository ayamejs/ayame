const { Event } = require("ayame");

class MessageEvent extends Event {
  async run(old, msg) {
    if(old.content !== msg.content) return this.client.monitors.run(msg);
  }
}

module.exports = MessageEvent;
