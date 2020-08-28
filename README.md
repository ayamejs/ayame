# Ayame
A simple yet powerful discord.js framework.

> **Note:** Ayame is still under heavy development and anything can change. Looking for contributors, join our discord server at [discord.gg/tfwTZWX](https://discord.gg/tfwTZWX) to talk with us.

**Features:**
- Full object oriented programming.
- Reloadable stores and pieces.
- Gateway system for managing settings across discord structures easily.
- Localization support.
- Easy argument parsing supporting flags, quotes and custom types.
- Command Editing support. (Edit your message and the bot's reply will update with new command's results)
- Auto loading pieces. Automatically get piece names from their filename.
- Easy to extend with plugins.

## Install
```sh
$ npm install ayame
```
**or GitHub version:** (**NOTE:** GitHub is the required installation method for now until a stable release is pushed to npm)
```sh
$ npm install ayamejs/ayame
```
To install from GitHub ensure you have `git` installed.

## Usage
For a basic bot all you need is
```js
const { Client } = require("ayame");

new Client({
  prefix: "!"
}).login("token");
```
It will load some builtin pieces to get you started. Documentation website is coming soon.

## License
Ayame is released under the [MIT License](LICENSE)
