const { Event } = require("ayame");

class MonitorErrorEvent extends Event {
  async run(err) {
    this.client.emit("error", err);
  }
}

module.exports = MonitorErrorEvent;
