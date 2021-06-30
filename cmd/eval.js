/* eslint-disable no-useless-escape */
/* eslint-disable no-eval */
// eslint-disable-next-line no-unused-vars
const Client = require('../lib/client.js'); const { Message } = require('discord.js')

module.exports = {
  /**
 * @param {Message} message
 * @param {Client} client
 * @param {Array<String>} args
 */
  run: async function (client, message, args) {
    const code = args.join(' ').replace(/(```(\w+)?)/g, '').trim()
    try {
      const result = await eval(code)
      console.log(result)
      message.channel.send(
        '```js\n' +
        `Result: '${result}'\n` +
        '```'
      )
    } catch (e) {
      message.channel.send(`\`\`\`js\n${e}\n\`\`\``)
    }
  },
  name: ['eval'],
  description: "Evaluate user\'s imput.",
  aliases: ['ebal', 'evaluate'],
  permissions: {
    client: [],
    member: []
  },
  help: {
    category: 'Indev',
    argumengs: 'Not granted',
    examples: 'a.eval 1+1'
  }
}
