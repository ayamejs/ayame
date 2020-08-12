const { Structures } = require("discord.js");
const SettingsHelper = require("../providers/SettingsHelper.js");

module.exports = Structures.extend("Guild", (Guild) => {
  class AyameGuild extends Guild {
    constructor(...args) {
      super(...args);

      this.settings = new SettingsHelper(this.client, this);
    }

    get locale() {
      return this.client.locales.get(this.settings.get("language", this.client.options.defaultLocale));
    }
  }

  return AyameGuild;
});
