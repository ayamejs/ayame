const { Event } = require("ayame");

class CommandUnknown extends Event {
  async run(msg, cmd) {
    return msg.channel.send(msg.locale.get("EVENT_UNKNOWN_COMMAND", cmd));
  }
}

module.exports = CommandUnknown;
