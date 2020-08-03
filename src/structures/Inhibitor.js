const Piece = require("./Piece.js");

module.exports = class Inhibitor extends Piece {
  constructor(client, store, file, options = {}) {
    super(client, store, file, options);
  }

  /* eslint-disable-next-line no-unused-vars */
  async run(ctx, command) {
    return false;
  }
}


