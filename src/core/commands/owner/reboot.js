const { Command } = require("ayame");

class Reboot extends Command {
  constructor(...args) {
    super(...args, {
      description: "Reboot/Shutdown the bot.",
      ownerOnly: true
    });
  }

  async run(msg) {
    await msg.send("Shutting down...");
    await this.client.providers.shutdown();
    await this.client.destroy();
    process.exit();
  }
}

module.exports = Reboot;
