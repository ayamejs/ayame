const { Argument } = require("ayame");

class Options extends Argument {
  constructor(...args) {
    super(...args);
  }

  async run(msg, arg, tag) {
    if(tag.literal) {
      const input = arg.toLowerCase();

      if(!tag.options.includes(input))
        throw `**${tag.name}** must be one of (${tag.options.join(", ")})`;

      return input;
    }

    for(const option of tag.options) {
      const argument = this.store.get(option);
      if(!arg) throw `Invalid argument type **${option}**`;
      try {
        return argument.run(msg, arg, tag);
      } catch(err) {
        continue;
      }
    }

    throw `**${tag.name}** did not match one of the possible types (${tag.options.join(", ")})`;
  }
}

module.exports = Options;
