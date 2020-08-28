const Piece = require("./Piece.js");

class Event extends Piece {
  constructor(client, store, file, options = {}) {
    super(client, store, file, options);

    /**
     * Whether this event should be registered as a raw event.
     * @type {Boolean}
     */
    this.raw = options.raw || false;

    /**
     * Whether this event should be triggered once.
     * @type {Boolean}
     */
    this.once = options.once || false;

    /**
     * The event name we are listening for.
     * @type {String}
     */
    this.event = options.event || this.name;
  }

  async _run(...args) {
    if(this.enabled) {
      try {
        if(!(await this.check(...args))) return false;

        return await this.run(...args);
      } catch(err) {
        // Avoid recursion if error handler failed.
        if(this.name !== "eventError") this.client.emit("eventError", this, err);
      }
    }
  }

  /* eslint-disable-next-line no-unused-vars */
  async check(...args) {
    return true;
  }

  /* eslint-disable-next-line no-unused-vars */
  async run(...args) {} 
}

module.exports = Event;
