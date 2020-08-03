const { Command } = require("ayame");

class Ping extends Command {
  constructor(...args) {
    super(...args, {
      description: "Pong! Checks Bot latency."
    });
  }

  async run(ctx, args) { // eslint-disable-line no-unused-vars
    const msg = await ctx.reply("Ping?");

    return msg.edit(`Pong! Latency **${msg.createdTimestamp - ctx.message.createdTimestamp} ms** API Latency **${this.client.ws.ping} ms**`);
  }
}

module.exports = Ping;
