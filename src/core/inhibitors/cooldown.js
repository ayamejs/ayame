const { Inhibitor } = require("ayame");

class CooldownInhibitor extends Inhibitor {
  constructor(...args) {
    super(...args);
    this.ratelimits = new Map();
  }

  async run(msg, command) {
    // No cooldown provided.
    if(!command.cooldown) return false;
    // Owner is immune to cooldown.
    if(this.client.isOwner(msg.author)) return false;

    return this.ratelimit(msg, command);
  }

  ratelimit(msg, command) {
    // Convert cooldown seconds to milliseconds.
    const cooldown = command.cooldown * 1000;
    // Get the bucket for the user.
    const ratelimits = this.ratelimits.get(msg.author.id) || {};
    // Make sure the command is available in the bucket.
    if(!ratelimits[command.name]) ratelimits[command.name] = Date.now() - cooldown;
    // Calculate the difference.
    const difference = Date.now() - ratelimits[command.name];

    if (difference < cooldown) { // check the if the duration the command was run, is more than the cooldown
      // Return a human-readable string to the user with the remaining seconds.
      return msg.locale.t("INHIBITOR_COOLDOWN_ACTIVE", cooldown, difference);
    } else {
      ratelimits[command.name] = Date.now(); // set the key to now, to mark the start of the cooldown
      this.ratelimits.set(msg.author.id, ratelimits); // set it
      return false;
    }
  }
}

module.exports = CooldownInhibitor;
