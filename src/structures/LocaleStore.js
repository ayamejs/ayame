const Store = require("./Store.js");

class LocaleStore extends Store {

	constructor(client) {
		super(client, "locales");
	}

}

module.exports = LocaleStore;