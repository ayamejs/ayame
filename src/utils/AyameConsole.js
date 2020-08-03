const { Console } = require("console");
const { Util: { mergeDefault } } = require("discord.js");

class AyameConsole extends Console {
  constructor(options = {}) {
    options = mergeDefault({ stdout: process.stdout, stderr: process.stderr }, options);
    super(options.stdout, options.stderr);
  }
}

module.exports = AyameConsole;
