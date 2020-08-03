const { Structures } = require("discord.js");

module.exports = Structures.extend("DMChannel", (DMChannel) => class AyameDMChannel extends DMChannel {

  get readable() {
    // DMs always readable.
    return true;
  }

  get postable() {
    // DMs always postable, unless... blocked but that's another story.
    return true;
  }
});
