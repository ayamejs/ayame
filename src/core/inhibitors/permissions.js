const { Inhibitor } = require("../..");
const { Permissions } = require("discord.js");
const { Utils } = require("../..");

class PermissionsInhibitor extends Inhibitor {
  constructor(...args) {
    super(...args);
    this.friendlyPerms = Object.keys(Permissions.FLAGS).reduce((obj, key) => {
      obj[key] = Utils.toProperCase(key.split("_").join(" "));
      return obj;
    }, {});
  }

  async run(msg, command) {
    if(msg.channel.type !== "text") return false; // No permissions in DMs.

    // Check if user has permissions to run the command. Owner gets a bypass.
    const user = this.client.isOwner(msg.author) ? [] :
      msg.channel.permissionsFor(msg.author).missing(command.userPermissions);

    if(user.length > 0) {
      return `You do not have the following permission${user.length === 1 ? "" : "s"} to run this command: \`${
        user.map((p) => this.friendlyPerms[p]).join(", ")}\``;
    }

    // Now check if the bot has the permissions to perform the intended action.
    const bot = msg.channel.permissionsFor(this.client.user).missing(command.botPermissions);
    if(bot.length > 0) {
      return `I need the following permission${bot.length === 1 ? "" : "s"} to do that: \`${
        bot.map((p) => this.friendlyPerms[p]).join(", ")}\``;
    }

    return false;
  }
}

module.exports = PermissionsInhibitor;
