const dsc = require('discord.js')
const config = require('../config.json')
module.exports = {
  name: 'serverinfo',
  description: 'Sends information about current server',
  permissions: 'everyone',
  usage: 'a.serverinfo',
  aliases: ['serverinfo', 'si', 'server'],
  async execute (client, message) {
    const sEmbed = new dsc.MessageEmbed()
      .setTitle('Guild information')
      .setDescription('About current guild')
      .setColor(config.color)
      .addFields(
        { name: 'Owner:', value: `${message.guild.owner}` },
        { name: 'Guild Name:', value: `${message.guild.name}` },
        { name: 'Guild Identificator:', value: `${message.guild.id}` },
        { name: 'Guild Members Count:', value: `${message.guild.memberCount}` },
        { name: 'Channel Count:', value: `${message.guild.channels.cache.size}` },
        { name: 'Role Count:', value: `${message.guild.roles.cache.size}` },
        { name: 'Emojis:', value: `${message.guild.emojis.cache.size}` },
        { name: 'Server Region:', value: `${message.guild.region}` }
      )
    message.channel.send(sEmbed)
  }
}
