const { MessageEmbed } = require('discord.js')
const { color } = require('../config.json')

module.exports = {
  name: '8ball',
  description: 'Send random answers on user\'s question',
  permissions: 'everyone',
  usage: 'a.8ball <args>',
  aliases: ['8b', 'rndm'],
  async execute (client, message, args) {
    if (!args[0]) return message.reply('Hey kiddo, provide your question, please.')
    const answers = ['Yes.', 'Of course.', 'Maybe :p', 'I can\'t answer right now.', 'No.', 'Definitely.', 'Ask again.', 'Forget about it.']/*  */

    const result = Math.floor(Math.random() * answers.length)

    const embed = new MessageEmbed()
      .setTitle(`8ball says: ${answers[result]}`)
      .setColor(color)
    message.channel.send(embed)
  }
}
