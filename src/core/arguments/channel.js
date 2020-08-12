const { Argument } = require("ayame");

class Channel extends Argument {
  constructor(...args) {
    super(...args);
    this.regex = /^(?:<#)?(\d{17,19})>?$/;
  }

  async run(msg, arg, tag) {
    if(this.regex.test(arg)) {
      const channel = this.client.channels.fetch(this.regex.exec(arg)[1])
        .catch(() => null);

      if(channel) return channel;
    }

    if(this.store.get("user").regex.test(arg)) {
      const channel = this.client.users.fetch(this.store.get("user").regex.exec(arg)[1])
        .then(user => user.createDM())
        .catch(() => null);

      if(channel) return channel;
    }

    throw `**${tag.name}** must be a valid channel ID or mention.`;
  }
}

module.exports = Channel;
