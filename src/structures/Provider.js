const Piece = require("./Piece.js");

const notImpl = (provider, func) => new Error(`Function "${func}" not implemented in provider "${provider}"`);

/**
 * Base provider, must be extended and implemented.
 * @extends Piece
 */
class Provider extends Piece {

  /**
   * Initializes the provider.
   * @abstract
   */
  init() {}

  /**
   * Fetches an multiple entries from the database.
   * @param {String} table - The table to fetch from.
   * @param {Array<String>} id - The IDs of the entries
   * @abstract
   * @returns {Promise<Array<Object>>}
   */
  fetch() {
    throw notImpl(this, "fetch");
  }

  /**
   * Fetches a single entry from the database.
   * @param {String} table - The table to fetch from.
   * @param {String} id - ID of the entry.
   * @abstract
   * @returns {Promise<Object>}
   */
  get() {
    throw notImpl(this, "get");
  }

  /**
   * Sets a key.
   * @param {String} table - The table to set to.
   * @param {String} id - ID of the entry.
   * @param {String} key - The key to set.
   * @param {any} value - The value to set.
   * @abstract
   * @returns {Promise<void>}
   */
  set() {
    throw notImpl(this, "set");
  }

  /**
   * Clears an entry from the database.
   * @param {String} table - The table to delete from.
   * @param {String} id - ID of the entry.
   * @abstract
   * @returns {Promise<void>}
   */
  clear() {
    throw notImpl(this, "clear");
  }

  /**
   * Shuts down the provider.
   * @abstract
   * @returns {Promise<void>}
   */
  destroy() {}
}

module.exports = Provider;
