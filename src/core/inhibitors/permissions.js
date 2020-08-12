const { Inhibitor, Utils } = require("ayame");
const { Permissions } = require("discord.js");

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
      return msg.locale.get("INHIBITOR_PERMISSIONS_MISSING_USER", user, this.friendlyPerms);
    }

    // Now check if the bot has the permissions to perform the intended action.
    const bot = msg.channel.permissionsFor(this.client.user).missing(command.botPermissions);
    if(bot.length > 0) {
      return msg.locale.get("INHIBITOR_PERMISSIONS_MISSING_BOT", bot, this.friendlyPerms);
    }

    return false;
  }
}

module.exports = PermissionsInhibitor;
