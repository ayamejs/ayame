const { Inhibitor } = require("../..");

class CooldownInhibitor extends Inhibitor {
  constructor(...args) {
    super(...args);
    this.ratelimits = new Map();
  }

  async run(ctx, command) {
    // No cooldown provided.
    if(!command.cooldown) return false;
    // Owner is immune to cooldown.
    if(this.client.isOwner(ctx.author)) return false;

    return this.ratelimit(ctx, command);
  }

  ratelimit(ctx, command) {
    // Convert cooldown seconds to milliseconds.
    const cooldown = command.cooldown * 1000;
    // Get the bucket for the user.
    const ratelimits = this.ratelimits.get(ctx.author.id) || {};
    // Make sure the command is available in the bucket.
    if(!ratelimits[command.name]) ratelimits[command.name] = Date.now() - cooldown;
    // Calculate the difference.
    const difference = Date.now() - ratelimits[command.name];

    if (difference < cooldown) { // check the if the duration the command was run, is more than the cooldown
      // Return a human-readable string to the user with the remaining seconds.
      return `You can run this command again after **${Math.round((cooldown - difference) / 1000)}** seconds.`;
    } else {
      ratelimits[command.name] = Date.now(); // set the key to now, to mark the start of the cooldown
      this.ratelimits.set(ctx.author.id, ratelimits); // set it
      return false;
    }
  }
}

module.exports = CooldownInhibitor;
