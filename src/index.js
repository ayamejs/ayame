
module.exports = {
  // Extensions
  AyameDMChannel: require("./extensions/AyameDMChannel.js"),
  AyameTextChannel: require("./extensions/AyameTextChannel.js"),
  AyameMessage: require("./extensions/AyameMessage.js"),
  AyameGuild: require("./extensions/AyameGuild.js"),
  AyameUser: require("./extensions/AyameUser.js"),

  Client: require("./Client.js"),
  AyameClient: require("./Client.js"),
  Utils: require("./utils/Utils.js"),
  constants: require("./utils/constants.js"),

  // Structures
  Piece: require("./structures/Piece.js"),
  Store: require("./structures/Store.js"),

  Argument: require("./structures/Argument.js"),
  ArgumentStore: require("./structures/ArgumentStore.js"),

  Command: require("./structures/Command.js"),
  CommandStore: require("./structures/CommandStore.js"),

  Event: require("./structures/Event.js"),
  EventStore: require("./structures/EventStore.js"),

  Monitor: require("./structures/Monitor.js"),
  MonitorStore: require("./structures/EventStore.js"),

  Inhibitor: require("./structures/Inhibitor.js"),
  InhibitorStore: require("./structures/InhibitorStore.js"),

  Language: require("./structures/Language.js"),
  LanguageStore: require("./structures/LanguageStore.js"),

  // Providers.
  Provider: require("./structures/Provider.js"),
  ProviderStore: require("./structures/ProviderStore.js"),

  // Settings.
  GatewayManager: require("./settings/GatewayManager.js"),
  Gateway: require("./settings/Gateway.js"),
  Settings: require("./settings/Settings.js"),

  // External
  usage: require("@ayamejs/usage"),
  quotes: require("@ayamejs/quotes"),

  // Package version.
  version: require("../package.json").version
};
