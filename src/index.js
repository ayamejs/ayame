
module.exports = {
  // Extensions
  AyameDMChannel: require("./extensions/AyameDMChannel.js"),
  AyameTextChannel: require("./extensions/AyameTextChannel.js"),

  Client: require("./Client.js"),
  AyameClient: require("./Client.js"),
  Utils: require("./utils/Utils.js"),
  constants: require("./utils/constants.js"),

  // Structures
  Command: require("./structures/Command.js"),
  CommandStore: require("./structures/CommandStore.js"),
  CommandContext: require("./structures/CommandContext.js"),
  Event: require("./structures/Event.js"),
  EventStore: require("./structures/EventStore.js"),
  Monitor: require("./structures/Monitor.js"),
  MonitorStore: require("./structures/EventStore.js"),
  Inhibitor: require("./structures/Inhibitor.js"),

  version: require("../package.json").version
};
