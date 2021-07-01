const Client = require('../lib/client.js'); 
const { Message, MessageEmbed } = require('discord.js'); 
const { color } = require('../config.json')

module.exports = {
  /**
 * @param {Message} message
 * @param {Client} client
 * @param {Array<String>} args
 */
  run: async function (client, message, args) {
	if (!args[0]) return message.reply('Provide your question as first argument.');
	
	const answers = ['Sure.', 'Yes.', 'No.', 'Maybe in the future.', 'Ask later.'];
	
	const result = Math.floor(Math.random() * answers.length)
	
	const embed = new MessageEmbed()
		.setTitle('Eight-ball says...')
		.setColor(color)
		.setDescription(answers[result])
	message.channel.send(embed);
  },
  name: ['8ball', 'random'],
  description: "Random answer on user\'s question.",
  permissions: {
    client: [],
    member: []
  },
  help: {
    category: 'Fun',
    arguments: 'a.8b <question>',
    examples: 'none'
  }
}
