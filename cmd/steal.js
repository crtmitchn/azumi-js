const discord = require('discord.js')

module.exports = {
  name: 'steal',
  description: 'Steal an emoji from other server.',
  permissions: 'everyone, must be server moderator',
  usage: 'a.steal <emoji>',
  aliases: ['stealemoji', 'spizdit'],
  async execute (client, message, args) {
    if (!message.member.hasPermission('MANAGE_EMOJIS')) {
      message.reply('You must be a server moderator with MANAGE_EMOJIS permission in order to use this command.')
      return
    }
    if (!args.length) { return message.reply('Provide any emoji(only one per message.)') }

    for (const emojis of args) {
      const getEmoji = discord.Util.parseEmoji(emojis)

      if (getEmoji.id) {
        const emojiExternal = getEmoji.animated ? '.gif' : '.png'
        const emojiURL = `https://cdn.discordapp.com/emojis/${getEmoji.id + emojiExternal}`
        message.guild.emojis
          .create(emojiURL, getEmoji.name)
          .then((emoji) =>
            message.channel.send(`<:troll:857549353866887189> Successfully added an emoji (\`${emoji.name}\`) to your server.`)
          )
      }
    }
  }
}
