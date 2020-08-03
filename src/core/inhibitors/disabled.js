const { Inhibitor } = require("../..");

class DisabledInhibitor extends Inhibitor {
  async run(ctx, command) {
    if(!command.enabled && !this.client.isOwner(ctx.author))
      return "That command has been disabled by a bot owner.";
  }
}

module.exports = DisabledInhibitor;
