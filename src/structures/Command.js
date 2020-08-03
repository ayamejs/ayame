const { Permissions } = require("discord.js");
const Piece = require("./Piece.js");
const path = require("path");
const Utils = require("../utils/Utils.js");

module.exports = class Command extends Piece {
  constructor(client, store, file, options = {}) {
    super(client, store, file, options);

    this.description = options.description || "No Description Provided.";
    this.extendedHelp = options.extendedHelp || "No extended help provided.";
    this.ownerOnly = options.ownerOnly || false;
    this.aliases = options.aliases || [];
    this.cooldown = options.cooldown || 0;
    this.nsfw = options.nsfw || false;
    // File path is like general/ping.js we split by / and take general title-cased if not provided.
    this.category = options.category || Utils.toProperCase(file.path.split(path.sep)[0]) || "General";
    this.guildOnly = options.guildOnly || false;
    this.hidden = options.hidden || false;
    this.usage = options.usage || this.name;

    // Permissions
    this.botPermissions = new Permissions(options.botPermissions || []).freeze();
    this.userPermissions = new Permissions(options.userPermissions || []).freeze();
  }

  async _run(ctx, args) {
    try {
      // Run the check function first.
      const check = await this.check(ctx, args);

      // If the value is falsy, silently fail.
      if(!check) return;

      // If the value is a string reply it to the user.
      if(typeof check === "string") return ctx.reply(check);

      // Run the command.
      const results = await this.run(ctx, args);

      // If the results is a string reply it to the user.
      if(typeof results === "string") return ctx.reply(results);
    } catch(err) {
      if(typeof err === "string") return ctx.reply(err);

      // Forward errors to commandError event.
      this.client.emit("commandError", ctx, err);
    }
  }

  /**
   * Verifies that a user is given.
   */
  async verifyUser(ctx, user, defaultToAuthor = false) {
    if(!user && defaultToAuthor) return ctx.author;
    if(!user) throw "What do you expect me to do without a user mention or an ID?";
    const match = /^(?:<@!?)?(\d{17,19})>?$/.exec(user);
    if(!match) throw "Baka! That's not a user mention or an ID. What were you trying to do?";
    user = await this.client.users.fetch(match[1]).catch(() => null);
    // We will assume they gave IDs as mentions are highly unlikely to fail.
    if(!user) throw "I couldn't find that user! Make sure the ID is correct.";
    return user;
  }

  /**
   * Verifies that a member is given.
   */
  async verifyMember(ctx, member, defaultToAuthor = false) {
    const user = await this.verifyUser(ctx, member, defaultToAuthor);
    return ctx.guild.members.fetch(user);
  }

  async verifyChannel(ctx, channel, defaultToCurrent = false) {
    if(!channel && defaultToCurrent) return ctx.channel;
    if(!channel) throw "You need to mention a channel or provide an ID.";

    const match = /^(?:<#)?(\d{17,19})>?$/.exec(channel);
    if(!match) throw "Invalid channel, must be a mention or an ID.";

    const chan = await this.client.channels.fetch(match[1]).catch(() => null);
    if(!chan) throw "I could not find that channel.";

    return chan;
  }

  verifyRole(ctx, rolename, optional = false) {
    if(!rolename && optional) return null;
    if(!rolename) throw "Baka! You must provide a role name or ID.";
    rolename = rolename.toLowerCase();

    // We check by ID or name. Nobody mentions roles for an argument.
    const role = ctx.guild.roles.cache.find((role) => (role.id === rolename) || (role.name.toLowerCase() === rolename));
    if(!role) throw "That role does not exist.";

    return role;
  }

  verifyInt(num, def) {
    if(typeof def === "number" && !num) return def;
    const parsed = parseInt(num);
    if(isNaN(parsed)) throw "Baka! You must provide a valid number.";
    return parsed;
  }

  /**
   * Executed before the command is ran.
   * The return value can be either true/false or a string.
   * Incase of false the command won't run.
   * Incase of string the command won't run but the string is sent to the channel.
   * Incase of true the command is ran as normal.
   */
  async check(ctx, args) { // eslint-disable-line no-unused-vars
    return true;
  }

  /**
   * The actual command implementation, must be implemented in a subclass.
   */
  async run(ctx, args) { // eslint-disable-line no-unused-vars
    return ctx.reply(`${this.constructor.name} does not provide a \`run()\` implementation.`);
  } 
}


