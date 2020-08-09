const { Argument } = require("ayame");

class User extends Argument {
  constructor(...args) {
    super(...args);
    this.regex = /^(?:<@!?)?(\d{17,19})>?$/;
  }

  async run(msg, arg, tag) {
    if(this.regex.test(arg)) {
      return this.client.users.fetch(this.regex.exec(arg)[1])
        .catch(() => null);
    }

    throw `**${tag.name}** must be a valid user mention or ID.`;
  }
}

module.exports = User;
