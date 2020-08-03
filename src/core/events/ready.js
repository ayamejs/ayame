const { Event } = require("ayame");

class ReadyEvent extends Event {
  async run() {
    console.log("Ready!");
  }
}

module.exports = ReadyEvent;
