const discord = require('discord.js')
const chalk = require('chalk')
const { join } = require('path')
const fs = require('fs')
// eslint-disable-next-line no-unused-vars
const Command = require('./commands.js')

/**
 * idk
 * @extends {discord.Client}
 * @type {Client}
*/
module.exports = class Client extends discord.Client {
  /**
 *
 * @param {ClientOptions} options
 * @param {*} advancedOptions
 */
  constructor (options = {}, {
    commandsDir = 'cmd',
    listenersDir = 'events'
  }) {
    super(options)

    /**
 * commands massive
 * do not change
 * @type {Array.<Command>}
 */
    this.commands = []

    /**
 * listeners
 * @type {Array.<Listener>}
 */
    this.listenersObjects = []

    /**
 * command dir
 * @type {string}
 */
    this.commandsDir = join(__dirname, '..', commandsDir || 'cmd')
  }

  /**
 * Loading all events and commands in client options
 */
  loadAll () {
    console.log(chalk.cyan('[Event loader] Events initializing.'))
    this.loadListeners()
    console.log(chalk.cyan('[Event loader] Loading finished without errors.'))

    console.log(chalk.cyan('[Command loader] Commands initializing.'))
    this.loadCommands()
    console.log(chalk.cyan('[Command loader] All commands loaded without errors.'))
  }

  /**
 * Loading all events blah blah blah
 * @param {string} path
 */
  loadListeners (path = this.listenersDir) {
    for (const file of fs.readdirSync(path, { withFileTypes: true })) {
      if (file.isFile() && file.name.endsWith('.js')) {
        try {
          const listeners = require(`${path}/${file.name}`)
          if (listeners instanceof Array) {
            for (const listener of listeners) {
              this.on(listener.name, listener.run.bind(null, this))
              this.listenersObjects.push(listener)
            }
          } else {
            this.on(listeners.name, listeners.run.bind(null, this))
            this.listenersObjects.push(listeners)
          }
          console.log(chalk.green(`+ ${file.name}`))
        } catch (e) {
          console.log(chalk.red(`Error loading event ${file.name}\nError: ${e}`))
        }
      }
      if (file.isDirectory()) { this.loadListeners(`${path}/${file.name}`) }
    }
  }

  /**
     * sus
     * @param {string} path
     */
  loadCommands (path = this.commandsDir) {
    for (const file of fs.readdirSync(path, { withFileTypes: true })) {
      if (file.isFile() && file.name.endsWith('.js')) {
        try {
          const command = require(`${path}/${file.name}`)
          this.commands.push(command)
          console.log(chalk.green(`+ ${file.name}`))
        } catch (e) {
          console.log(chalk.red(`Error loading ${file.name}.\nError: ${e}`))
        }
      }
      if (file.isDirectory()) { this.loadCommands(`${path}/${file.name}`) }
    }
  }
}
