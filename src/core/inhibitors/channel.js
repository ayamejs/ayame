const { Inhibitor } = require("ayame");

class ChannelInhibitor extends Inhibitor {
  async run(msg, command) {
    if(!command.channel) return;

    if(command.channel === "guild" && !msg.guild)
      return msg.locale.get("INHIBITOR_CHANNEL_GUILD_ONLY");
    
    if(command.channel === "dm" && msg.channel.type !== "dm")
      return msg.locale.get("INHIBITOR_CHANNEL_DM_ONLY");
  }
}

module.exports = ChannelInhibitor;
