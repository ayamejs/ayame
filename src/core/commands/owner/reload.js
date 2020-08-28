const { Command } = require("ayame");

class Reload extends Command {
  constructor(...args) {
    super(...args, {
      description: "Reloads a piece.",
      ownerOnly: true,
      usage: "<piece:piece>"
    });
  }

  async run(msg, { piece }) {
    await piece.reload();
    return msg.sendLocale("COMMAND_RELOAD_SUCCESS", [piece]);
  }
}

module.exports = Reload;
