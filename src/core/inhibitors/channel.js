const { Inhibitor } = require("ayame");

class ChannelInhibitor extends Inhibitor {
  async run(msg, command) {
    if(!command.channel) return;

    if(Array.isArray(command.channel) && !command.channel.includes(msg.channel.type))
      return msg.language.get("INHIBITOR_CHANNEL_ONLY", command.channel.join(", "));

    if(typeof command.channel === "string" && command.channel !== msg.channel.type)
      return msg.language.get("INHIBITOR_CHANNEL_ONLY", command.channel);
  }
}

module.exports = ChannelInhibitor;
