/* eslint-disable camelcase */
const { MessageEmbed } = require('discord.js')
const { owner, color } = require('../config.json')

module.exports = {
  name: 'cmd',
  description: 'Send linux commands to server.',
  permissions: 'owner-only',
  usage: 'a.cmd <arguments>',
  aliases: ['exec', 'run'],
  async execute (client, message, args) {
    const child_process = require('child_process')

    if (message.author.id !== owner) return

    const code = args.join(' ')

    const output = child_process.execSync(code, { encoding: 'UTF-8' })

    const embed = new MessageEmbed()
      .setColor(color)
      .setDescription('```' + output + '```')
    message.channel.send(embed)
  }
}
