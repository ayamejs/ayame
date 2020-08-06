const { Inhibitor } = require("../..");

class GuildInhibitor extends Inhibitor {
  async run(msg, command) {
    if(command.guildOnly && !msg.guild)
      return "You can only run this command in a guild channel.";
  }
}

module.exports = GuildInhibitor;
