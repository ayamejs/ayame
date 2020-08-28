const { Argument } = require("ayame");

class Options extends Argument {
  constructor(...args) {
    super(...args);
  }

  async run(msg, arg, tag) {
    if(tag.literal) {
      const input = arg.toLowerCase();

      if(!tag.options.includes(input))
        throw msg.language.get("ARGUMENT_BAD_OPTIONS", tag);

      return input;
    }

    for(const option of tag.options) {
      const argument = this.store.get(option);
      if(!arg) throw msg.language.get("ARGUMENT_OPTIONS_BAD_TYPE", option);
      try {
        const results = await argument.run(msg, arg, tag);
        return results;
      } catch(err) {
        continue;
      }
    }

    throw msg.language.get("ARGUMENT_OPTIONS_NONE_MATCH", tag);
  }
}

module.exports = Options;
