const { Inhibitor } = require("ayame");

class ChannelInhibitor extends Inhibitor {
  async run(msg, command) {
    if(!command.channel) return;

    if(command.channel === "guild" && !msg.guild)
      return "You can only run this command in a guild channel.";
    
    if(command.channel === "dm" && msg.channel.type !== "dm")
      return "You can only use this command in a DM channel.";

    return `Command **${command.name}** has an invalid "channel" value: ${command.channel}`;
  }
}

module.exports = ChannelInhibitor;
