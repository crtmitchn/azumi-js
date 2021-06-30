const { owner } = require('../config.json')

const punishments = require('../models/warns')

module.exports = {
  name: 'delwarn',
  description: 'Clear warns.',
  permissions: 'administrators/owner-only',
  usage: 'a.delwarn <server/user> {mention}',
  aliases: ['del-warn'],
  async execute (client, message, args) {
    const toWarn = message.mentions.members.first()
    if (args[0] === 'server') {
      if (message.author.id !== owner) return
      await punishments.deleteMany({ GuildID: message.guild.id })
      message.channel.send('Action done. Deleted all current server DB info.')
      return
    }
    if (args[0] === 'user') {
      if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You must me a server administrator in order to execute this command.')
      if (!args[1]) return message.reply('Provide user id/name/mention.')
      await punishments.deleteMany({ GuildID: message.guild.id, UserID: toWarn.id })
      message.channel.send('Action done. Deleted all user info in DB.')
    }
  }
}
