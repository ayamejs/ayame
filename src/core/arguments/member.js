const { Argument } = require("ayame");

class Member extends Argument {
  constructor(...args) {
    super(...args);
    this.regex = /^(?:<@!?)?(\d{17,19})>?$/;
  }

  async run(msg, arg) {
    if(this.regex.test(arg)) {
      const member = msg.guild.members.fetch(this.regex.exec(arg)[1])
        .catch(() => null);

      if(member) return member;
    }

    throw msg.language.get("ARGUMENT_BAD_MEMBER");
  }
}

module.exports = Member;
