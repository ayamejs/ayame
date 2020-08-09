const { Inhibitor } = require("ayame");

class NSFWInhibitor extends Inhibitor {
  async run(msg, command) {
    if(command.nsfw && msg.guild && !msg.channel.nsfw)
      return "You may only run that command in an NSFW channel.";
  }
}

module.exports = NSFWInhibitor;
