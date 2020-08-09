const { Event } = require("ayame");

class EventError extends Event {
  async run(event, err) {
    this.client.emit("error", err);
  }
}

module.exports = EventError;
