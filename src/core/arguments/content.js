const { Argument } = require("ayame");

class Content extends Argument {
  constructor(...args) {
    super(...args);
  }

  async run(msg) {
    return msg.rawArgs;
  }
}

module.exports = Content;
