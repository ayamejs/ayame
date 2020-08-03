const { Event } = require("ayame");

class MessageEvent extends Event {
  async run(msg) {
    console.log(msg.content);

    return this.client.monitors.run(msg);
  }
}

module.exports = MessageEvent;
