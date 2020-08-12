const Store = require("./Store.js");

class LocaleStore extends Store {

	constructor(client) {
		super(client, "locales");
	}

	get defaultLocale() {
		return this.get(this.client.options.defaultLocale);
	}

}

module.exports = LocaleStore;