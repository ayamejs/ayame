const { Structures, APIMessage } = require("discord.js");

module.exports = Structures.extend("Message", (Message) => {
  /**
   * Ayame's extended message object.
   * @extends Message
   */
  class AyameMessage extends Message {
    constructor(...args) {
      super(...args);

      /**
       * The command that was invoked if this is a command message.
       * @type {?Command}
       */
      this.command = null;

      /**
       * The exact alias used to invoke the command.
       * @type {?String}
       */
      this.alias = null;

      /**
       * The prefix used if this is a command message.
       * @type {?String}
       */
      this.prefix = null;

      /**
       * Last reply to this message if any.
       */
      this.lastResponse = null;

      /**
       * Parsed arguments.
       * @type {Object}
       */
      this.args = {};

      /**
       * The command flags.
       * @type {Object}
       */
      this.commandFlags = {};

      /**
       * The parsed content with the flags removed.
       * @type {?String}
       */
      this.parsedContent = null;
    }

    /**
     * Alias message.guild.settings -> message.settings
     * Null if the message is not from a guild.
     * @type {?SettingsHelper}
     * @readonly
     */
    get settings() {
      return this.guild ? this.guild.settings : null;
    }

    /**
     * Grabs the whole raw arguments.
     * @type {String}
     * @readonly
     */
    get rawArgs() {
      return this.parsedContent.slice(this.prefix.length).trim().slice(this.alias.length).trim();
    }

    /**
     * Sends a message with editing support if enabled.
     */
    async send(content, options) {
      // Condition 1: No editing at all.
      if(!this.client.options.commandEditing) return this.channel.send(content, options);

      const transformedOptions = APIMessage.transformOptions(content, options);

      // Condition 2: Attachments cannot be edited.
      if("files" in transformedOptions) return this.channel.send(transformedOptions);

      // When editing always remove the previous content/embed
      if(!transformedOptions.content) transformedOptions.content = null;
      if(!transformedOptions.embed) transformedOptions.embed = null;

      // Condition 3: An last response is available and we can edit it.
      if(this.lastResponse && !this.lastResponse.deleted && !this.lastResponse.attachments.size) {
        return this.lastResponse.edit(transformedOptions);
      }
      
      // Condition 4: No previous reply to edit. Send a reply and save it.
      const sent = await this.channel.send(transformedOptions);

      // Store the response for editing.
      this.lastResponse = Array.isArray(sent) ? sent.slice(-1)[0] : sent;

      return sent;
    }

    /**
     * Replies to the message with a user mention.
     */
    reply(content, options) {
      return this.send(APIMessage.transformOptions(content, options, { reply: this.member || this.author }));
    }

    get locale() {
      return this.guild ? this.guild.locale : this.client.locales.defaultLocale;
    }

    sendLocale(key, value = [], options) {
      return this.send(this.locale.get(key, value), options);
    }

    replyLocale(key, value = [], options) {
      return this.reply(this.locale.get(key, value), options);
    }
  }

  return AyameMessage;
});
