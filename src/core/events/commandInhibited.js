const { Event } = require("ayame");

class CommandInhibitedEvent extends Event {
  async run(msg, command, err) {
    if(typeof err === "string") return msg.send(err);
  }
}

module.exports = CommandInhibitedEvent;
