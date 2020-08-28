const { Event } = require("ayame");

class CommandUnknown extends Event {
  async run(msg, cmd) {
    // TODO: this is for debugging purposes only, we should fail silently in stable release.
    return msg.send(`Command **${cmd}** not found.`);
  }
}

module.exports = CommandUnknown;
