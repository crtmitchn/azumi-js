/* eslint-disable no-eval */
const { owner } = require('../config.json')

module.exports = {
  name: 'eval',
  description: 'Evaluate user\'s input.',
  permissions: 'dev-only',
  usage: 'a.eval <args>',
  aliases: ['evaluate'],
  async execute (client, message, args) {
    if (message.author.id !== owner) return

    const code = args.join(' ').replace(/(```(\w+)?)/g, '').trim()
    try {
      const result = await eval(code)
      console.log(result)
      message.channel.send(
        '```js\n' +
        `Result: "${result}"\n` +
        '```'
      )
    } catch (e) {
      message.channel.send(`\`\`\`js\n${e}\`\`\``)
    }
  }
}
