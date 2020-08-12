const { Inhibitor } = require("ayame");

class OwnerInhibitor extends Inhibitor {
  async run(msg, command) {
    if(command.ownerOnly && !this.client.isOwner(msg.author))
      return "That command can only be ran by a bot owner.";
  }
}

module.exports = OwnerInhibitor;
