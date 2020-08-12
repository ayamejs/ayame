const { Command } = require("ayame");

class Ping extends Command {
  constructor(...args) {
    super(...args, {
      description: "Pong! Checks Bot latency."
    });
  }

  async run(msg, args) { // eslint-disable-line no-unused-vars
    const sent = await msg.sendLocale("COMMAND_PING");
    const timeDiff = (sent.editedAt || sent.createdAt) - (msg.editedAt || msg.createdAt);
    return sent.edit(msg.locale.get("COMMAND_PING", timeDiff));
  }
}

module.exports = Ping;
