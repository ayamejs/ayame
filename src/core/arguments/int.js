const { Argument } = require("ayame");

class Integer extends Argument {
  constructor(...args) {
    super(...args);
  }

  async run(msg, arg, tag) {
    const number = parseInt(arg);
    if(!Number.isInteger(number)) throw `**${tag.name}** must be a valid number.`;
    return number;
  }
}

module.exports = Integer;
