const Piece = require("./Piece.js");

class Inhibitor extends Piece {
  constructor(client, store, file, options = {}) {
    super(client, store, file, options);
  }

  async _run(msg, command) {
    try {
      return await this.run(msg, command);
    } catch(err) {
      return err;
    }
  }

  /* eslint-disable-next-line no-unused-vars */
  async run(msg, command) {
    return false;
  }
}

module.exports = Inhibitor;
