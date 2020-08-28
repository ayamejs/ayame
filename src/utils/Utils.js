const { promisify } = require("util");

const { promises: { lstat, readdir } } = require("fs");
const path = require("path");

/**
 * Static class with some utilities.
 * @static
 */
class Utils {
  constructor() {
    throw new Error("Utils is a static class and cannot be instantiated.");
  }

  /**
   * Gets a nested object key using dot paths.
   * @param {String} path - The dotted path.
   * @param {Object} obj - The object to fetch from.
   * @static
   */
  static getDot(path, obj) {
    let last = obj;

    for(const dot of path.split(".")) {
      if(!last[dot]) return null;
      last = last[dot];
    }

    return last;
  }
  
  /**
   * Uppercases first letter of every word, e.g hello world -> Hello World
   * @param {String} str - The string to proper case.
   * @returns {String}
   * @static
   */
  static toProperCase(str) {
    return str.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  /**
   * Escapes regular expression sensitive characters.
   * @param {String} str - The string to escape.
   * @returns {String}
   * @static
   */
  static escapeRegex(str) {
    return str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  // This piece of code is taken from fs-nextra by BDISTIN
  // MIT Licensed
  // I just didn't want to add a dependency I wouldn't use more than once.
  static async walk(dir, options = {}, results = new Map(), level = -1) {
    dir = path.resolve(dir);
    const stats = await lstat(dir);
    if(!options.filter || options.filter(stats, dir)) results.set(dir, stats);
    if(stats.isDirectory() && (typeof options.depthLimit === "undefined" || level < options.depthLimit)) {
      await Promise.all((await readdir(dir)).map((part) => Utils.walk(path.join(dir, part), options, results, ++level)));
    }
    return results;
  }

  static isObject(obj) {
    return obj && obj.constructor === Object;
  }

  static mergeObjects(target = {}, obj) {
    for (const key in obj) {
      target[key] = Utils.isObject(obj[key]) ? Utils.mergeObjects(target[key], obj[key]) : obj[key];
    }

    return target;
  }
}

Utils.sleep = promisify(setTimeout);

module.exports = Utils;
