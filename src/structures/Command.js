const { Permissions } = require("discord.js");
const Piece = require("./Piece.js");
const path = require("path");
const Utils = require("../utils/Utils.js");
const usage = require("@ayamejs/usage");

/**
 * Command represents a runnable command.
 */
class Command extends Piece {
  constructor(client, store, file, options = {}) {
    super(client, store, file, options);

    /**
     * The command description.
     * @type {String}
     */
    this.description = options.description || "No Description Provided.";

    /**
     * An extended help message for this command.
     * @type {String}
     */
    this.extendedHelp = options.extendedHelp || "No extended help provided.";

    /**
     * Wether this command can only be used by the bot owner(s)
     * @type {Boolean}
     */
    this.ownerOnly = options.ownerOnly || false;

    /**
     * Command aliases.
     * @type {String[]}
     */
    this.aliases = options.aliases || [];

    /**
     * Command cooldown in seconds.
     * @type {Number}
     */
    this.cooldown = options.cooldown || 0;

    /**
     * Wether this command can only be used in NSFW-enabled channels.
     * @type {Boolean}
     */
    this.nsfw = options.nsfw || false;
    
    /**
     * The category this command belongs to.
     * @type {String}
     */
    this.category = options.category || Utils.toProperCase(file.path.split(path.sep)[0]) || "General";

    /**
     * If given, the restricted channel this command can only be used in.
     * @type {?String}
     */
    this.channel = options.channel || null;

    /**
     * Wether this command is hidden.
     * @type {Boolean}
     */
    this.hidden = options.hidden || false;

    // Cache the parsed usage.
    this.usage = options.usage ? {
      raw: options.usage,
      parsed: usage.parse(options.usage)
    } : null;

    // Permissions
    this.botPermissions = new Permissions(options.botPermissions || []).freeze();
    this.userPermissions = new Permissions(options.userPermissions || []).freeze();
  }

  async _run(msg, args) {
    try {
      // Run the check function first.
      const check = await this.check(msg, args);

      // If the value is falsy, silently fail.
      if(!check) return;

      // If the value is a string reply it to the user.
      if(typeof check === "string") return msg.send(check);

      // Run the command.
      const results = await this.run(msg, args);

      // If the results is a string reply it to the user.
      if(typeof results === "string") return msg.send(results);
    } catch(err) {
      if(typeof err === "string") return msg.send(err);

      // Forward errors to commandError event.
      this.client.emit("commandError", msg, err);
    }
  }
 
  /**
   * Executed before the command is ran.
   * The return value can be either true/false or a string.
   * Incase of false the command won't run.
   * Incase of string the command won't run but the string is sent to the channel.
   * Incase of true the command is ran as normal.
   *
   * @returns {Boolean}
   * @abstract
   */
  async check(msg, args) { // eslint-disable-line no-unused-vars
    return true;
  }

  /**
   * The actual command implementation, must be implemented in a subclass.
   * @abstract
   */
  async run(msg, args) { // eslint-disable-line no-unused-vars
    return msg.send(`Command **${this.name}** (${this.file.path}) does not provide a \`run()\` implementation.`);
  }
}

module.exports = Command;
