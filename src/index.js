
module.exports = {
  // Extensions
  AyameDMChannel: require("./extensions/AyameDMChannel.js"),
  AyameTextChannel: require("./extensions/AyameTextChannel.js"),
  AyameMessage: require("./extensions/AyameMessage.js"),

  Client: require("./Client.js"),
  AyameClient: require("./Client.js"),
  Utils: require("./utils/Utils.js"),
  constants: require("./utils/constants.js"),

  // Structures
  Piece: require("./structures/Piece.js"),
  Store: require("./structures/Store.js"),

  Command: require("./structures/Command.js"),
  CommandStore: require("./structures/CommandStore.js"),

  Event: require("./structures/Event.js"),
  EventStore: require("./structures/EventStore.js"),

  Monitor: require("./structures/Monitor.js"),
  MonitorStore: require("./structures/EventStore.js"),

  Inhibitor: require("./structures/Inhibitor.js"),
  InhibitorStore: require("./structures/InhibitorStore.js"),

  // Package version.
  version: require("../package.json").version
};
