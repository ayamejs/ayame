const { Event } = require("ayame");

class CommandErrorEvent extends Event {
  async run(err) {
    this.client.emit("error", err);
  }
}

module.exports = CommandErrorEvent;
