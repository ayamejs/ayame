const Piece = require("./Piece.js");

class Inhibitor extends Piece {
  constructor(client, store, file, options = {}) {
    super(client, store, file, options);
  }

  /* eslint-disable-next-line no-unused-vars */
  async run(ctx, command) {
    return false;
  }
}

module.exports = Inhibitor;
