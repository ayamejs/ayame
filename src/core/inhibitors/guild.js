const { Inhibitor } = require("../..");

class GuildInhibitor extends Inhibitor {
  async run(ctx, command) {
    if(command.guildOnly && !ctx.guild)
      return "You can only run this command in a guild channel.";
  }
}

module.exports = GuildInhibitor;
