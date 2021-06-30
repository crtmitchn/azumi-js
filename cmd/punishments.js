const discord = require('discord.js')
const { color } = require('../config.json')
const punishments = require('../models/warns')

module.exports = {
  name: 'punishments',
  description: 'View user\'s punishments.',
  permissions: 'moderators/everyone',
  usage: 'a.punishments <user>',
  aliases: ['warns'],
  async execute (client, message, args) {
    const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(u => u.user.username.toLowerCase() === args.slice(0).join(' ') || u.user.username === args[0]) || message.author

    const result = await punishments.findOne({ GuildID: message.guild.id, UserID: User.id }).exec()
    if (!result) return message.channel.send('This user has no warns.')
    let text = ''

    result.Punishments.forEach(elm => {
      text += `Warned by:\n<@!${elm.Mod}>\nReason:\n\`${elm.Reason}\`\n\u0020\n`
    })
    const wlish = new discord.MessageEmbed()
      .setTitle(`${User}\`s warns`)
      .setDescription('Warn-only list.')
      .setColor(color)
      .addField(text, '** **')
      .setFooter('Any questions? Contact server administrator.')
    message.channel.send(wlish)
  }
}
