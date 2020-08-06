const { Event } = require("ayame");

class CommandErrorEvent extends Event {
  async run(msg, err) {
    console.log("cmd err ran");
    this.client.emit("error", err);
  }
}

module.exports = CommandErrorEvent;
