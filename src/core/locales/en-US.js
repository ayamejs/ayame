const { Locale } = require("ayame");

class EnUS extends Locale {

	constructor(...args) {
		super(...args, {
			name: "en-US"
		});
		this.strings = {
			KEY_NOT_FOUND: key => `${key} hasn't been translated to ${this.name} yet!`,
			COMMAND_PING: (timeDiff = undefined) => timeDiff ? [
				"**__Pong!__**",
				`🔂 **Latency**: ${timeDiff} ms`,
				`💟 **Heartbeat**: ${Math.round(this.client.ws.ping)} ms`
			] : "Pong!",
			COMMAND_EVAL_OUTPUT_TOO_LONG: key => `Output was to long so it was uploaded to hastebin https://hastebin.com/${key}.js`,
			COMMAND_EVAL_HASTE_FAILED: error => `I tried to upload the output to hastebin but encountered this error ${error.name}:${error.message}`,
			COMMAND_EVAL_FAILED: error => `The following error occured \`\`\`js\n${error.stack}\`\`\``,
			ARGUMENT_BAD_CHANNEL: tag => `**${tag.name}** must be a valid channel ID or mention.`,
			ARGUMENT_BAD_INTEGER: tag => `**${tag.name}** must be a valid number.`,
			ARGUMENT_BAD_MEMBER: tag => `**${tag.name}** must be a valid user mention or ID.`,
			ARGUMENT_BAD_OPTIONS: tag => `**${tag.name}** must be one of (${tag.options.join(", ")})`,
			ARGUMENT_OPTIONS_BAD_TYPE: option => `Invalid argument type **${option}**`,
			ARGUMENT_OPTIONS_NONE_MATCH: tag => `**${tag.name}** did not match one of the possible types (${tag.options.join(", ")})`,
			ARGUMENT_BAD_USER: tag => `**${tag.name}** must be a valid user mention or ID.`,
			EVENT_UNKNOWN_COMMAND: cmd => `Command "${cmd}" not found.`,
			INHIBITOR_CHANNEL_GUILD_ONLY: "You can only run this command in a guild channel.",
			INHIBITOR_CHANNEL_DM_ONLY: "You can only use this command in a DM channel.",
			INHIBITOR_COOLDOWN_ACTIVE: (cooldown, difference) => `You can run this command again after **${Math.round((cooldown - difference) / 1000)}** seconds.`,
			INHIBITOR_NSFW: "You may only run that command in an NSFW channel.",
			INHIBITOR_OWNER_ONLY: "That command can only be ran by a bot owner.",
			INHIBITOR_PERMISSIONS_MISSING_USER: (user, friendlyPerms) => `You do not have the following permission${user.length === 1 ? "" : "s"} to run this command: \`${user.map((p) => friendlyPerms[p]).join(", ")}\``,
			INHIBITOR_PERMISSIONS_MISSING_BOT: (bot, friendlyPerms) => `I need the following permission${bot.length === 1 ? "" : "s"} to do that: \`${bot.map((p) => friendlyPerms[p]).join(", ")}\``,
			PREFIX_REMINDER: prefix => `Hi! Run \`${prefix}help\` to get a list of commands you can use.`
		}
	}

}

module.exports = EnUS;