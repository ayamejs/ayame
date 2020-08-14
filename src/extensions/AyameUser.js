const { Structures } = require("discord.js");

module.exports = Structures.extend("User", (User) => {

  /**
   * The extended AyameUser.
   * @extends User
   */
  class AyameUser extends User {
    constructor(...args) {
      super(...args);

      if(this.client.options.gateways.users) {
        this.settings = this.client.gateways.users.get(this.id, true);
      }
    }
  }

  return AyameUser;
});
