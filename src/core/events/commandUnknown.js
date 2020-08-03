const { Event } = require("ayame");

class CommandUnknown extends Event {
  async run(msg, cmd) {
    return msg.channel.send(`Command "${cmd}" not found.`);
  }
}

module.exports = CommandUnknown;
