const Piece = require("./Piece");

class Locale extends Piece {
	constructor(client, store, file, options = {}) {
		super(client, store, file, options);
		this.name = options.name;
		this.strings = options.strings ? options.strings : {};
	}
	get(key, ...args) {
		const res = this.strings[key];
		if (!res) return this.strings["KEY_NOT_FOUND"](key);
		if (typeof res === "string") return res;
		return res(...args);
	}
}

module.exports = Locale;