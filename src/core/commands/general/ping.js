const { Command } = require("ayame");

class Ping extends Command {
  constructor(...args) {
    super(...args, {
      description: "Pong! Checks Bot latency."
    });
  }

  async run(msg, args) { // eslint-disable-line no-unused-vars
    const sent = await msg.send("Pong!");
    const timeDiff = (sent.editedAt || sent.createdAt) - (msg.editedAt || msg.createdAt);

    return sent.edit([
      "**__Pong!__**",
      `🔂 **Latency**: ${timeDiff} ms`,
      `💟 **Heartbeat**: ${Math.round(this.client.ws.ping)} ms`
    ]);
  }
}

module.exports = Ping;
