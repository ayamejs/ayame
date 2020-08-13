const { Structures } = require("discord.js");

module.exports = Structures.extend("DMChannel", (DMChannel) => {
  /**
   * Ayame's extended DM Channel.
   * @extends DMChannel
   */
  class AyameDMChannel extends DMChannel {

    /**
     * Wether the channel is readable by the bot.
     * Always true, this is added to be consistent with text channels so type checks aren't be needed.
     * @type {Boolean}
     */
    get readable() {
      // DMs always readable.
      return true;
    }

    /**
     * Wether the bot can post in this channel.
     * Always true, this is added to be consistent with text channels so type checks aren't needed.
     * @type {Boolean}
     */
    get postable() {
      // DMs always postable, unless... blocked but that's another story.
      return true;
    }
  }

  return AyameDMChannel;
});
