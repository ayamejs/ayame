const { Inhibitor } = require("ayame");

class NSFWInhibitor extends Inhibitor {
  async run(msg, command) {
    if(command.nsfw && msg.guild && !msg.channel.nsfw)
      return msg.language.get("INHIBITOR_NSFW");
  }
}

module.exports = NSFWInhibitor;
