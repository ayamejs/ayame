const { Event } = require("ayame");

class CommandInhibitedEvent extends Event {
  async run(ctx, command, err) {
    if(typeof err === "string") return ctx.send(err);
  }
}

module.exports = CommandInhibitedEvent;
