const { Argument } = require("ayame");

class Member extends Argument {
  constructor(...args) {
    super(...args);
    this.regex = /^(?:<@!?)?(\d{17,19})>?$/;
  }

  async run(msg, arg, tag) {
    if(this.regex.test(arg)) {
      const member = msg.guild.members.fetch(this.regex.exec(arg)[1])
        .catch(() => null);

      if(member) return member;
    }

    throw `**${tag.name}** must be a valid user mention or ID.`;
  }
}

module.exports = Member;
