const Store = require("./Store.js");
const quotes = require("@ayamejs/quotes");

class ArgumentStore extends Store {
  constructor(client) {
    super(client, "arguments");
  }

  /**
   * Run the argument parser on a command message.
   * Fills msg.args with the parsed arguments.
   * Throws a string on errors.
   */
  async run(msg) {
    // This is an initial prototype for the argument parser.
    // It may not be perfect but we have to start from somewhere.

    // The command being ran.
    const command = msg.command;
    
    if(!command.usage) return;

    // Object to fill.
    const args = {};

    const split = command.quotes ? quotes.parse(msg.rawArgs) : msg.rawArgs.split(/ +/g);
    
    for(let i = 0; i < command.usage.parsed.length; i++) {
      const tag = command.usage.parsed[i]; // The current tag we are parsing.
      const arg = this.get(tag.type); // Get the argument parser for this tag.
      if(!arg) throw new Error(`Tag specifies argument "${tag.type}" but is not a registered argument.`);
      const given = split[i]; // The given argument that must match the tag.
      
      // If the tag is required and it is not given, throw an error.
      if(tag.required && !given) {
        // TODO: when we add localization, allow this things to be customizable.
        throw `**${tag.name}** is a required argument.`;
      } else if(!given) {
        continue;
      }

      // Handle rest arguments seperately.
      // These arguments are the final arguments that must catch the rest of the input.
      // These become an array in the command.
      if(tag.rest) {
        // Keep running the argument parser for the rest of the given input.
        // The argument can throw an error to halt.
        args[tag.name] = await Promise.all(split.slice(i).map(input => arg.run(msg, input, tag)));
      } else {
        // Next if it wasn't rest args: is to run the argument parser for the given tag once.
        // The argument can throw an error to halt.
        args[tag.name] = await arg.run(msg, given, tag)
          .catch(err => {
            // TODO:
            // for cases people do optional args before a required one, e.g:
            // [channel:channel] <message:string...>
            // If we do #general text, should parse correctly.
            // If we do some text, then "some" wouldn't parse as a channel
            // but we should instead have a way to unshift it back to be considered a part of the text.
            if(!tag.required && this.client.options.optionalArgumentsFailSilently)
              return;
            throw err;
          });
      }
    }

    // Once the loop is done, throw the arguments to the message and we are good to go.
    msg.args = args;
  }
}

module.exports = ArgumentStore;
