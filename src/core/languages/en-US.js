const { Language } = require("ayame");

class English extends Language {

  constructor(...args) {
    super(...args);

    this.strings = {
      COMMAND_PING: (timeDiff) => timeDiff ? [
        "**__Pong!__**",
        `🔂 **Latency**: ${timeDiff} ms`,
        `💟 **Heartbeat**: ${Math.round(this.client.ws.ping)} ms`
      ] : "Pong!",
      COMMAND_EVAL_OUTPUT_TOO_LONG: key => `Output was to long so it was uploaded to hastebin https://hastebin.com/${key}.js`,
      COMMAND_EVAL_HASTE_FAILED: error => `I tried to upload the output to hastebin but encountered this error ${error.name}:${error.message}`,
      COMMAND_EVAL_FAILED: error => `The following error occured \`\`\`js\n${error.stack}\`\`\``,
      COMMAND_RELOAD_SUCCESS: piece => `Successfully reloaded the ${piece.store.name} **${piece.name}**`,
      ARGUMENT_BAD_CHANNEL: tag => `**${tag.name}** must be a valid channel ID or mention.`,
      ARGUMENT_BAD_INTEGER: tag => `**${tag.name}** must be a valid number.`,
      ARGUMENT_BAD_MEMBER: tag => `**${tag.name}** must be a valid user mention or ID.`,
      ARGUMENT_BAD_PIECE: tag => `**${tag.name}** must be a valid piece name.`,
      ARGUMENT_BAD_OPTIONS: tag => `**${tag.name}** must be one of (${tag.options.join(", ")})`,
      ARGUMENT_OPTIONS_BAD_TYPE: option => `Invalid argument type **${option}**`,
      ARGUMENT_OPTIONS_NONE_MATCH: tag => `**${tag.name}** did not match one of the possible types (${tag.options.join(", ")})`,
      ARGUMENT_BAD_USER: tag => `**${tag.name}** must be a valid user mention or ID.`,
      INHIBITOR_CHANNEL_ONLY: channels => `You can only run this command in ${channels} channels.`,
      INHIBITOR_COOLDOWN_ACTIVE: (seconds) => `You can run this command again after **${seconds}** seconds.`,
      INHIBITOR_NSFW: "You may only run that command in an NSFW channel.",
      INHIBITOR_OWNER_ONLY: "That command can only be ran by a bot owner.",
      INHIBITOR_PERMISSIONS_MISSING_USER: (user, friendlyPerms) => `You do not have the following permission${user.length === 1 ? "" : "s"} to run this command: \`${user.map((p) => friendlyPerms[p]).join(", ")}\``,
      INHIBITOR_PERMISSIONS_MISSING_BOT: (bot, friendlyPerms) => `I need the following permission${bot.length === 1 ? "" : "s"} to do that: \`${bot.map((p) => friendlyPerms[p]).join(", ")}\``,
      PREFIX_REMINDER: prefix => `Hi! Run \`${prefix}help\` to get a list of commands you can use.`
    };
  }
}

module.exports = English;
