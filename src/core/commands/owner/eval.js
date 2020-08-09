const { Command } = require("ayame");
const { inspect } = require("util");
const fetch = require("node-fetch");

class Eval extends Command {
  constructor(...args) {
    super(...args, {
      description: "Evaluates arbitrary JavaScript",
      ownerOnly: true,
      usage: "<code:content>",
      aliases: ["ev"]
    });
  }

  async run(msg, { code }) {
    const { clean, client } = this;
    const token = client.token.split("").join("[^]{0,2}");
    const rev = client.token.split("").reverse().join("[^]{0,2}");
    const filter = new RegExp(`${token}|${rev}`, "g");
    try {
      let output = eval(code);
      if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
      output = inspect(output, { depth: 0, maxArrayLength: null });
      output = output.replace(filter, "[TOKEN]");
      output = clean(output);
      if (output.length < 1950) {
        return msg.send(`\`\`\`js\n${output}\n\`\`\``);
      } else {
        try {
          const { key } = await fetch("https://hastebin.com/documents", {
            method: "POST",
            body: output
          }).then((res) => res.json());
          return msg.send(`Output was to long so it was uploaded to hastebin https://hastebin.com/${key}.js `);
        } catch (error) {
          return msg.send(`I tried to upload the output to hastebin but encountered this error ${error.name}:${error.message}`);
        }
      }
    } catch (error) {
      return msg.send(`The following error occured \`\`\`js\n${error.stack}\`\`\``);
    }
  }

  clean(text)  {
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  }
}

module.exports = Eval;
