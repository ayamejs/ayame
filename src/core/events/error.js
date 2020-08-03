const { Event } = require("ayame");

class ErrorEvent extends Event {
  async run(err) {
    this.client.console.error(err);
  }
}

module.exports = ErrorEvent;
