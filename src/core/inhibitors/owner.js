const { Inhibitor } = require("../..");

class OwnerInhibitor extends Inhibitor {
  async run(ctx, command) {
    if(command.ownerOnly && !this.client.isOwner(ctx.author))
      return "That command can only be ran by a bot owner.";
  }
}

module.exports = OwnerInhibitor;
