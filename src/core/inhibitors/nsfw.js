const { Inhibitor } = require("../..");

class NSFWInhibitor extends Inhibitor {
  async run(ctx, command) {
    if(command.nsfw && !ctx.channel.nsfw && ctx.guild)
      return "You may only run that command in an NSFW channel.";
  }
}

module.exports = NSFWInhibitor;
