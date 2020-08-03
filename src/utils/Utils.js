const { promisify } = require("util");

const { promises: { lstat, readdir } } = require("fs");
const path = require("path");

/**
 * Static class with utilities used throughout the bot.
 */
module.exports = class Utils {
  constructor() {
    throw new Error("Utils is a static class and cannot be instantiated.");
  }

  //I added this because why not
	removeDuplicates(arr) {
		return [...new Set(arr)]
	}

  capitalise(string) {
		return string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ')
	}
  
  static toProperCase(str) {
    return str.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  static escapeRegex(str) {
    return str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  // Convert milliseconds into human readable string.
  static getDuration(time) {
    const seconds = Math.floor(time / 1000) % 60 ;
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor((time / (1000 * 60 * 60 * 24)) % 7);
    return [`${days} Days`, `${hours} Hours`, `${minutes} Minutes`,
      `${seconds} Seconds`].filter((time) => !time.startsWith("0")).join(", ");
  }
 
  static getCodeBlock(txt) {
    const match = /^```(\S*)\n?([^]*)\n?```$/.exec(txt);
    if(!match) return { lang: null, code: txt };
    if(match[1] && !match[2]) return { lang: null, code: match[1] };
    return { lang: match[1], code: match[2] };
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
