
/**
 * @typedef {Object} ClientOptions
 * @property {Boolean} [commandEditing=false] - Wether to listen for edits and edit command responses.
 * @property {Boolean} [commandTyping=false] - Wether to start typing when running a command.
 * @property {Boolean} [optionalArgumentsFailSilently=false] - Wether to fail silently when an invalid input is passed to an optional argument.
 * @property {String} [defaultLanguage="en-US"] - The default language for the bot.
 * @property {String} [prefix="!"] - The bot's prefix.
 * @property {GatewayOptions} [gateways] - Options for the settings gateway.
 * @property {Object} [providers] - Options for the providers.
 */

/**
 * @typedef {Object} GatewayOptions
 * @property {Boolean|String} [users=false] - Wether to enable users gateway. If string it's the provider to use.
 * @property {Boolean|String} [client=false] - Wether to enable client storage. If string it's the provider to use.
 */

// Default client options.
module.exports.DefaultOptions = {
  commandEditing: false,
  commandTyping: false,
  optionalArgumentsFailSilently: false,
  defaultLanguage: "en-US",
  prefix: "!",
  gateways: {
    users: false,
    client: false
  },
  providers: {
    default: "memory"
  }
};
