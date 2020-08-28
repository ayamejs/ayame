const { Argument } = require("ayame");

class Piece extends Argument {

  async run(msg, arg, tag) {
    for(const store of this.client.stores.values()) {
      const piece = store.get(arg);
      if(piece) return piece;
    }

    throw msg.language.get("ARGUMENT_BAD_PIECE", tag);
  }
}

module.exports = Piece;
