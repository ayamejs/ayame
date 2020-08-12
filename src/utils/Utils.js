const { promisify } = require("util");

const { promises: { lstat, readdir } } = require("fs");
const path = require("path");

/**
 * Static class with utilities used throughout the bot.
 */
class Utils {
  constructor() {
    throw new Error("Utils is a static class and cannot be instantiated.");
  }
  
  static toProperCase(str) {
    return str.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

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
}

Utils.sleep = promisify(setTimeout);

module.exports = Utils;
