const CONFIG = require('../config.json')
const discord = require('discord.js')

function getCommand (client, name) {
  for (const command of client.commands) { if (command.name.indexOf(name) !== -1) return command }
  return false
}

module.exports = {
  name: 'message',
  run: async function (client, message) {
    if (message.author.bot || !message.content.startsWith(CONFIG.prefixDefault) || message.channel.type === 'dm') return

    const messageArray = message.content.split(/\s+/g)
    const cmd = messageArray[0].slice(CONFIG.prefixDefault.length)
    const args = messageArray.slice(1)

    const command = getCommand(client, cmd.toLowerCase())
    if (!command) return
    if (!message.guild.me.permissions.has('SEND_MESSAGES') || !message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return
    if (!message.guild.me.permissions.has('EMBED_LINKS') || !message.channel.permissionsFor(client.user).has('EMBED_LINKS')) return message.channel.send('I can\'t send embeds on this server, give me that permission!')

    try {
      command.run(client, message, args)
    } catch (e) {
      console.log(e)

      const embed = new discord.MessageEmbed()
        .setColor('ff0000')
        .setTitle('Error!')
        .setFooter(`${message.author.tag}`)

      embed.setDescription('Unexpected error.\n' + 'You can help us with:\n' + 'Providing tech information.\n' + 'Continue?')

      message.channel.send(embed).then(async msg => {
        await msg.react('✅')
        await msg.react('❌')

        const reaction = (await msg.awaitReactions((reaction, user) => (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && user.id === message.author.id, { max: 1 })).first()

        await msg.reactions.removeAll()

        if (reaction.emoji.name === '❌') embed.setDescription('Report will not be sended.')
        else {
          await client.channels.cache.get('859074891176738816').send(
            new discord.MessageEmbed()
              .setTitle('Error')
              .setDescription(`\`\`\`js\n${e}\n\`\`\``)
              .addField('Author', `${message.author} (${message.author.id})`, false)
              .addField('Content', `\`\`\`\n${message.content}\n\`\`\``, false)
              .addField('Server', `${message.guild.name} (${message.guild.id})`, false)
              .addField('Channel', `${message.channel.name} (${message.channel.id})`, false)
              .addField('Error(lim. 1k sym)', `${e.stack.slice(0, 1000)}`, false)
          )
          embed.setDescription('Thank you. Report sent to our developers!')
        }

        await msg.edit(embed)
      })
    }
  }
}
