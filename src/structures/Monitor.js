const Piece = require("./Piece.js");

/**
 * Monitors are ran on every message.
 */
class Monitor extends Piece {
  constructor(client, store, file, options = {}) {
    super(client, store, file, options);
  }

  async _run(msg) {
    try {
      if(!(await this.check(msg))) return false;
      return this.run(msg);
    } catch(err) {
      this.client.emit("monitorError", err);
    }
  }

  async check(msg) {
    return true;
  }

  /**
   * The actual implementation of this monitor.
   * @abstract
   */
  async run(msg) {} // eslint-disable-line no-unused-vars
}

module.exports = Monitor;
