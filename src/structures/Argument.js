const Piece = require("./Piece.js");

class Argument extends Piece {
  constructor(client, store, file, options = {}) {
    super(client, store, file, options);
  }

  async run(msg, arg, tag) { // eslint-disable-line no-unused-vars
    throw new Error("Argument not implemented.");
  }
}

module.exports = Argument;
