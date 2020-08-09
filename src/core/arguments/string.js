const { Argument } = require("ayame");

class StringArg extends Argument {
  constructor(...args) {
    super(...args);
  }

  async run(msg, arg, tag) {
    return arg;
  }
}

module.exports = StringArg;
