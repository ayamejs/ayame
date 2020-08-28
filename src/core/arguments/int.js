const { Argument } = require("ayame");

class Integer extends Argument {
  constructor(...args) {
    super(...args);
  }

  async run(msg, arg) {
    const number = parseInt(arg);
    if(!Number.isInteger(number)) throw msg.language.get("ARGUMENT_BAD_INTEGER");
    return number;
  }
}

module.exports = Integer;
