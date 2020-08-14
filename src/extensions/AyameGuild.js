const { Structures } = require("discord.js");

module.exports = Structures.extend("Guild", (Guild) => {
  class AyameGuild extends Guild {
    constructor(...args) {
      super(...args);

      this.settings = this.client.gateways.guilds.get(this.id, true);
    }

    get locale() {
      return this.client.locales.get(this.settings.get("language", this.client.options.defaultLocale));
    }
  }

  return AyameGuild;
});
