const { MessageEmbed } = require('discord.js')
const { color } = require('../config.json')

module.exports = {
  name: 'help',
  description: 'View command help or view all commands.',
  permissions: 'everyone',
  usage: 'a.help <command name>',
  aliases: ['whatis', 'cmds'],
  async execute (client, message, args) {
    const cname = client.commands.get(args[0])
    const semb = new MessageEmbed()
      .setTitle('Unknown command name')
      .setColor('ff0000')
    if (!cname) return message.channel.send(semb)
    const helpembed = new MessageEmbed()
      .setTitle(`${cname.name} help`)
      .setDescription('Usage depends on your server prefix. To check it, ping the bot.')
      .setColor(color)
      .addFields(
        { name: 'Command name:', value: `${cname.name}` },
        { name: 'Command description:', value: `${cname.description}` },
        { name: 'Permissions:', value: `${cname.permissions}` },
        { name: 'Usage:', value: `${cname.usage}` },
        { name: 'Aliases:', value: `${cname.aliases.join(', ')}` }
      )
    return message.channel.send(helpembed)
  }
}
