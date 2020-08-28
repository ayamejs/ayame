const Piece = require("./Piece.js");

/**
 * Monitors are ran on every message.
 */
class Monitor extends Piece {
  constructor(client, store, file, options = {}) {
    super(client, store, file, options);

    this.ignoreEdits = options.ignoreEdits || false;
  }

  async _run(msg) {
    try {
      if(this.ignoreEdits && msg._edits.length) return false;
      if(!(await this.check(msg))) return false;
      return await this.run(msg);
    } catch(err) {
      this.client.emit("monitorError", err);
    }
  }

  /**
   * @abstract
   */
  async check(msg) { // eslint-disable-line no-unused-vars
    return true;
  }

  /**
   * The actual implementation of this monitor.
   * @abstract
   */
  async run(msg) {} // eslint-disable-line no-unused-vars
}

module.exports = Monitor;
