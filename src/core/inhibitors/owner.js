const { Inhibitor } = require("ayame");

class OwnerInhibitor extends Inhibitor {
  async run(msg, command) {
    if(command.ownerOnly && !this.client.owners.has(msg.author))
      return msg.locale.get("INHIBITOR_OWNER_ONLY");
  }
}

module.exports = OwnerInhibitor;
