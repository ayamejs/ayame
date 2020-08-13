const Store = require("./Store.js");
const { Collection } = require("discord.js");

/**
 * The store that holds commands.
 * @extends Store
 */
class CommandStore extends Store {
  /**
   * @param {AyameClient} client
   */
  constructor(client) {
    super(client, "commands");

    /**
     * Command aliases.
     * @type {Collection<String, Command>}
     */
    this.aliases = new Collection();

    /**
     * Counter of how many commands are ran.
     * @type {Number}
     */
    this.ran = 0;
  }

  get(name) {
    return super.get(name) || this.aliases.get(name);
  }

  has(name) {
    return super.has(name) || this.aliases.has(name);
  }

  set(command) {
    super.set(command);

    if(command.aliases.length) {
      for(const alias of command.aliases) {
        this.aliases.set(alias, command);
      }
    }

    return command;
  }

  delete(name) {
    const command = this.get(name);
    if(!command) return false;

    if(command.aliases.length) {
      for(const alias of command.aliases) {
        this.aliases.delete(alias);
      }
    }

    return super.delete(name);
  }

  clear() {
    super.clear();
    this.aliases.clear();
  }

  /**
   * Return list of usable commands in context of the given message.
   * @param {Message} msg - The message context.
   */
  usableCommands(msg) {
    return this.array().filter((command) => {
      // Skip disabled commands.
      if(!command.enabled) return false;
      // Skip owner commands.
      if(command.ownerOnly && !this.client.options.owners.includes(msg.author.id)) return false;
      // Skip guild only commands.
      if(!msg.guild && command.guildOnly) return false;
      // Skip commands that the user does not have permissions to run.
      if(msg.guild && !msg.channel.permissionsFor(msg.author).has(command.userPermissions)) return false;
      // Skip NSFW commands.
      if(command.nsfw && !msg.channel.nsfw) return false;
      return true;
    });
  }
}

module.exports = CommandStore;
