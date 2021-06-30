const Client = require('../lib/client.js'); const { Message } = require('discord.js')

module.exports = {
  /**
 * @param {Message} message
 * @param {Client} client
 * @param {Array<String>} args
 */
  run: async function (client, message, args) {
    const string = `{"obj":[${args.join(' ').replace(/(```(\w+)?)/g, '')}]}`

    try {
      const a = JSON.parse(string).obj[0]
      message.channel.send({ embed: a, disableMentions: 'all' }).catch((err) => message.reply('Check your embed!'))
    } catch (err) {

    }
  },
  name: ['embed', 'createembed'],
  description: 'Create user requested embed.',
  permissions: {
    client: ['EMBED_LINKS'],
    member: []
  },
  help: {
    category: 'General',
    arguments: 'JSON: ',
    examples: 'none'
  }
}
