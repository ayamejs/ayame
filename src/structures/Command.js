const { Permissions } = require("discord.js");
const Piece = require("./Piece.js");
const path = require("path");
const Utils = require("../utils/Utils.js");
const usageParser = require("@ayamejs/usage");

/**
 * @typedef {Object} CommandOptions
 * @property {String} [name=file.name] - Command's name.
 * @property {String} [description] - Short description for the command.
 * @property {String} [extendedHelp] - An extended help message.
 * @property {Boolean} [ownerOnly=false] - Wether to restrict this command to bot owners only.
 * @property {Array<String>} [aliases] - Aliases for this command.
 * @property {Number} [cooldown=0] - Cooldown in seconds.
 * @property {Boolean} [nsfw=false] - Wether to restrict this command to NSFW channels only.
 * @property {Boolean} [quotes=true] - Wether to parse quoted arguments.
 * @property {String} [category] - The category the command belongs to.
 * @property {String} [channel=null] - The channel to restrict this command to. ('guild' or 'dm')
 * @property {Boolean} [hidden=false] - Wether to mark this command as hidden.
 * @property {String} [seperator=" "] - Seperator character to split arguments on.
 * @property {String} [usage] - The usage string describing the arguments.
 * @property {Permissions} [botPermissions] - The permissions the bot needs to perform this command.
 * @property {Permissions} [userPermissions] - The permissions the user needs to run this command.
 */

/**
 * Command represents a runnable command.
 * @extends Piece
 */
class Command extends Piece {

  /**
   * Constructs a new command.
   * @param {AyameClient} client - The Discord client.
   * @param {Store} store - The store this command belongs to.
   * @param {Object} file - File path information.
   * @param {CommandOptions} [options] - Command options.
   */
  constructor(client, store, file, options = {}) {
    super(client, store, file, options);

    const {
      description = "No Description Provided.",
      extendedHelp = "No extended help provided.",
      ownerOnly = false,
      aliases = [],
      cooldown = 0,
      nsfw = false,
      quotes = true,
      category = Utils.toProperCase(file.path.split(path.sep)[0]) || "General",
      channel = null,
      hidden = false,
      seperator = " ",
      usage = null,
      botPermissions = [],
      userPermissions = [],
      ...extra
    } = options;

    /**
     * The command description.
     * @type {String}
     */
    this.description = description;

    /**
     * An extended help message for this command.
     * @type {String}
     */
    this.extendedHelp = extendedHelp;

    /**
     * Wether this command can only be used by the bot owner(s)
     * @type {Boolean}
     */
    this.ownerOnly = ownerOnly;

    /**
     * Command aliases.
     * @type {String[]}
     */
    this.aliases = aliases;

    /**
     * Command cooldown in seconds.
     * @type {Number}
     */
    this.cooldown = cooldown;

    /**
     * Wether this command can only be used in NSFW-enabled channels.
     * @type {Boolean}
     */
    this.nsfw = nsfw;

    /**
     * Wether to parse quotes.
     * @type {Boolean}
     */
    this.quotes = quotes;
    
    /**
     * The category this command belongs to.
     * @type {String}
     */
    this.category = category;

    /**
     * If given, the restricted channel this command can only be used in.
     * @type {?String}
     */
    this.channel = channel;

    /**
     * Wether this command is hidden.
     * @type {Boolean}
     */
    this.hidden = hidden;

    /**
     * Argument seperator.
     * @type {String}
     */
    this.seperator = seperator;

    // Cache the parsed usage.
    this.usage = usage ? {
      raw: usage,
      parsed: usageParser.parse(usage)
    } : null;

    /**
     * The permissions the bot needs in order to perform the command.
     * @type {Permissions}
     */
    this.botPermissions = new Permissions(botPermissions).freeze();

    /**
     * The permissions the user needs to execute this command.
     * @type {Permissions}
     */
    this.userPermissions = new Permissions(userPermissions).freeze();

    /**
     * Extra custom command options.
     * @type {Object}
     */
    this.extra = extra;
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
   * @param {Message} message - The message.
   * @param {Object} args - The parsed arguments.
   * @returns {Boolean}
   * @abstract
   */
  async check(msg, args) { // eslint-disable-line no-unused-vars
    return true;
  }

  /**
   * The actual command implementation, must be implemented in a subclass.
   * @param {Message} message - The message.
   * @param {Object} args - The parsed arguments.
   * @abstract
   */
  async run(msg, args) { // eslint-disable-line no-unused-vars
    return msg.send(`Command **${this.name}** (${this.file.path}) does not provide a \`run()\` implementation.`);
  }
}

module.exports = Command;
