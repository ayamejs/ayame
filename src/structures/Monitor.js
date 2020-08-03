const Piece = require("./Piece.js");

class Monitor extends Piece {
  constructor(client, store, file, options = {}) {
    super(client, store, file, options);
  }

  async _run(msg) {
    try {
      return this.run(msg);
    } catch(err) {
      this.client.emit("monitorError", err);
    }
  }

  /* eslint-disable-next-line no-unused-vars */
  async run(msg) {}
}

module.exports = Monitor;
