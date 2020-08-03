const Piece = require("./Piece.js");

module.exports = class Event extends Piece {
  constructor(client, store, file, options = {}) {
    super(client, store, file, options);

    // Wether this event should be registered as a raw event.
    this.raw = options.raw || false;
  }

  async _run(...args) {
    if(this.enabled) {
      try {
        if(!(await this.check(...args))) return false;

        await this.run(...args);
      } catch(err) {
        // Avoid recursion if error handler failed.
        if(this.name !== "eventError") this.client.emit("eventError", this, err);
      }
    }
  }

  /* eslint-disable-next-line no-unused-vars */
  async check(...args) {
    return true;
  }

  /* eslint-disable-next-line no-unused-vars */
  async run(...args) {} 
}

