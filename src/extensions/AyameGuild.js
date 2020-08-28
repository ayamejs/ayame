const { Structures } = require("discord.js");

module.exports = Structures.extend("Guild", (Guild) => {
  class AyameGuild extends Guild {
    constructor(...args) {
      super(...args);

      this.settings = this.client.gateways.guilds.get(this.id, true);
    }
    
    get prefix() {
      return this.settings.get("prefix", this.client.options.prefix);
    }

    get language() {
      return this.client.languages.get(this.settings.get("language", this.client.options.defaultLanguage));
    }
  }

  return AyameGuild;
});
