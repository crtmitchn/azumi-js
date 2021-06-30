/* eslint-disable new-cap */
const punishments = require('../models/warns')

module.exports = {
  name: 'warn',
  description: 'Warns user.',
  permissions: 'moderators',
  usage: 'a.warn <userid/mention/username> <reason>',
  aliases: ['warnuser'],
  async execute (client, message, args) {
    const toWarn = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(u => u.user.username.toLowerCase() === args.slice(0).join(' ') || u.user.username === args[0])

    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.reply('You must be a server moderator with `MANAGE_MESSAGES` permission!')
    }

    if (message.author.id === toWarn.id) return message.channel.send('You cannot warn yourself.')

    const reason = args.slice(1).join(' ')

    if (reason === null) return message.reply('There must be at least one reason!')

    const data = await punishments.findOne({
      GuildID: message.guild.id,
      UserID: toWarn.id
    })

    if (data) {
      data.Punishments.push({
        PunishType: 'Warning',
        Mod: message.author.id,
        Reason: reason
      })
      data.save()

      message.channel.send(`Warned ${toWarn} for \`${reason}\``)
    } else if (!data) {
      const newData = new punishments({
        GuildID: message.guild.id,
        UserID: toWarn.id,
        Punishments: [{
          PunishType: 'Warning',
          Mod: message.author.id,
          Reason: reason
        }]
      })
      newData.save()

      message.channel.send(`Warned ${toWarn} for \`${reason}\``)
    }
  }
}
