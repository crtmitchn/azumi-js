/* eslint-disable no-unused-vars */
const Client = require('./client.js')
const { Message } = require('discord.js')

class Command {
  /**
     * @param {CommandOptions} options
     */
  constructor (options = {}) {
    /**
         * @param {Client} client
         * @param {Message} message
         * @param {Array.<String>} args
        */
    this.run = options.run

    /**
         * @type {Array<String>}
        */
    this.name = options.name

    /**
         * @type {String}
        */
    this.description = options.description

    /**
         * @type {{bot: Array.<String>, member: Array.<String>}}
        */
    this.permissions = options.permissions

    /**
         * @type {{category: String, arguments: String, examples: String}}
        */
    this.help = options.userperms
  }
}

module.exports = Command
