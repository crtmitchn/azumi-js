/* eslint-disable new-cap */
/* eslint-disable no-useless-escape */
const prefixModel = require('../models/prefix')

module.exports = {
  name: 'setprefix',
  description: 'Set custom server prefix.',
  permissions: 'administrators',
  usage: 'a.setprefix <prefix>',
  aliases: ['newprefix'],
  async execute (client, message, args) {
    const data = await prefixModel.findOne({
      GuildID: message.guild.id
    })
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You must be a server administrator with \`ADMINISTRATOR\` permission!')
    if (!args[0]) return message.reply('Provide new prefix.')

    if (args[0].length > 5) return message.reply('New prefix must be under \`5\` chars.')

    if (data) {
      await prefixModel.findOneAndRemove({
        GuildID: message.guild.id
      })

      message.channel.send(`<a:drum:857629348782014464> New prefix is \`${args[0]}\``)

      const newData = new prefixModel({
        Prefix: args[0],
        GuildID: message.guild.id
      })
      newData.save()
    } else if (!data) {
      message.channel.send(`<a:drum:857629348782014464> New prefix is \`${args[0]}\``)

      const newData = new prefixModel({
        Prefix: args[0],
        GuildID: message.guild.id
      })
      newData.save()
    }
  }
}
