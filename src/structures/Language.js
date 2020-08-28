const Piece = require("./Piece.js");

class Language extends Piece {
  constructor(client, store, file, options = {}) {
    super(client, store, file, options);
    this.strings = options.strings ? options.strings : {};
  }

  set(key, value) {
    this.strings[key] = value;
    return this;
  }

  get(key, ...args) {
    const res = this.strings[key] ||
      (this !== this.client.languages.default && this.client.languages.default.get(key, ...args));

    if(!res) return `The key **${key}** has not been localized to ${this.name} nor is it localized in the default language of ${this.client.languages.default.name}`;

    if(typeof res === "function") return res(...args);
    return res;
  }
}

module.exports = Language;
