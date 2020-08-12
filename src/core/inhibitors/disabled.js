const { Inhibitor } = require("ayame");

class DisabledInhibitor extends Inhibitor {
  async run(msg, command) {
    if(!command.enabled && !this.client.owners.has(msg.author))
      return "That command has been disabled by a bot owner.";
  }
}

module.exports = DisabledInhibitor;
