
/**
 * GatewayManager is the base manager that manages all registered gateways.
 */
class GatewayManager {
  
  /**
   * Constructs a new GatewayManager.
   * Note: A single manager is available at {@link AyameClient#gateways}
   * There usually is no reason to make another.
   * @param {AyameClient} client - The Client.
   */
  constructor(client) {

    /**
     * The client.
     * @type {AyameClient}
     */
    this.client = client;

    /**
     * The keys of all registered gateways.
     * @type {Set<String>}
     */
    this.keys = new Set();
  }

  /**
   * Registers a gateway.
   * @param {Gateway} gateway - The gateway instance to register.
   * @returns {GatewayManager}
   * @example
   * // Register a per-member settings gateway that uses the redis provider.
   * client.gateways.register(new Gateway(client, "members", "redis"));
   * // Register a per-user settings gateway that uses the default provider.
   * client.gateways.register(new Gateway(client, "users"));
   */
  register(gateway) {
    this[gateway.table] = gateway;
    this.keys.add(gateway.table);
    return this;
  }

  /**
   * Synchronizes all registered gateways.
   * @returns {Promise<void>}
   */
  syncAll() {
    const promises = [];
    for(const key of this.keys) promises.push(this[key].sync());
    return Promise.all(promises);
  }
}

module.exports = GatewayManager;
