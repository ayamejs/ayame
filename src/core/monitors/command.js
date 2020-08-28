const { Monitor, Utils } = require("ayame");

// Taken from klasa https://github.com/dirigeants/klasa
/* eslint-disable-next-line quotes */
const quotes = ['"', "'", '“”', '‘’'];
const flagRegex = new RegExp(`(?:--|—)(\\w[\\w-]+)(?:=(?:${quotes.map((qu) => `[${qu}]((?:[^${qu}\\\\]|\\\\.)*)[${qu}]`).join("|")}|([\\w<>@#&!-]+)))?`, "g");
const delim = new RegExp("(\\s)(?:\\s)+");

class CommandHandler extends Monitor {
  constructor(...args) {
    super(...args);
    this.ignoreEdits = !this.client.options.commandEditing;
  }

  getFlags(content) {
    const flags = {};
    content = content.replace(flagRegex, (match, fl, ...quote) => {
      flags[fl] = (quote.slice(0, -2).find((el) => el) || fl).replace(/\\/g, "");
      return "";
    }).replace(delim, "$1");

    return { content, flags };
  }
 
  async check(msg) {
    return msg.channel.postable && (!msg.author.bot && !msg.webhookID);
  }

  async run(msg) {
    console.log(`monitor ran by ${msg.author.tag}`);
    // Ensure the bot itself is in the member cache.
    if(msg.guild && !msg.guild.me) await msg.guild.members.fetch(this.client.user);

    const prefix = msg.guild ? msg.guild.prefix : this.client.options.prefix;
    console.log(`prefix ${prefix}`);

    // Check for @mention only.
    if(msg.content === this.client.user.toString() || (msg.guild && msg.content === msg.guild.me.toString()))
      return msg.sendLocale("PREFIX_REMINDER", [prefix]);

    const prefixMatch = new RegExp(`^<@!?${this.client.user.id}> |^${Utils.escapeRegex(prefix)}`, "i")
      .exec(msg.content);

    if(!prefixMatch) return;

    console.log("parsing flags");

    // Parse flags.
    const { content, flags } = this.getFlags(msg.content);

    // Grab the command and the arguments.
    const args = content.slice(prefixMatch[0].length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const command = this.client.commands.get(cmd);

    // Handle unknown commands in a seperate event.
    if(!command) return this.client.emit("commandUnknown", msg, cmd);

    // Initialize message.
    msg.prefix = prefixMatch[0];
    msg.alias = cmd;
    msg.command = command;
    msg.commandFlags = flags;
    msg.parsedContent = content;

    try {
      console.log("running inhibitors.");
      await this.client.inhibitors.run(msg, command);
    } catch(err) {
      console.log(`failed with ${err}`);
      this.client.emit("commandInhibited", msg, command, err);
      return; // Do not run the command.
    }

    try {
      await this.client.arguments.run(msg);
    } catch(err) {
      if(typeof err === "string") return msg.send(err);
      console.error(`Arg parse: ${err}`);
      throw err;
    }

    console.log(`running cmd ${command.name}`);

    // Increment the counter.
    this.client.commands.ran++;
    // Start typing and run the command and then stop typing.
    if(this.client.options.commandTyping) msg.channel.startTyping();

    return command._run(msg, msg.args)
      .then(() => {
        if(this.client.options.commandTyping) return msg.channel.stopTyping();
      });
  }
}

module.exports = CommandHandler;
