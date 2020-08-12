const Piece = require("./Piece");

class Locale extends Piece {
	constructor(client, store, file, options = {}) {
		super(client, store, file, options);
		this.name = options.name;
		this.strings = options.strings ? options.strings : {};
	}
	get(key, ...args) {
		let res = this.strings[key];
		if (!res) res = this.client.locales.defaultLocale.get(key, ...args);
		if (!res) return this.strings["KEY_NOT_FOUND"](key);
		if (typeof res === "string") return res;
		return res(...args);
	}
}

module.exports = Locale;