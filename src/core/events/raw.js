const { Event } = require("ayame");

class Raw extends Event {
  run(packet, shard) {
    const event = this.store.filter(event => event.raw && event.event === packet.t);
    if(!event) return;

    return Promise.all(event.map(event => event._run(packet.d, shard)));
  }
}

module.exports = Raw;
