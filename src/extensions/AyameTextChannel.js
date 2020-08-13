const { Structures } = require("discord.js");

module.exports = Structures.extend("TextChannel", (TextChannel) => {
  /**
   * Ayame's extended TextChannel.
   * @extends TextChannel
   */
  class AyameTextChannel extends TextChannel {
    
    /**
     * Wether this channel is readable by the bot.
     * @type {Boolean}
     */
    get readable() {
      return this.permissionsFor(this.guild.me).has("VIEW_CHANNEL");
    }

    /**
     * Wether the bot can post in this channel.
     * @type {Boolean}
     */
    get postable() {
      return (this.readable && this.permissionsFor(this.guild.me).has("SEND_MESSAGES"));
    }
  }

  return AyameTextChannel;
});
