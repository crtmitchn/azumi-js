const config = require('../config.json')
const discord = require('discord.js')

function getCommand(client, name)
	for (const command of client.commands)
		if (command.name.indexOf(name) !== -1) return command
	return false
}

module.exports = {
	name: "message",
	run: async function (client, message) {
		if (message.author.bot || !message
		content.startsWith(config.prefixDefault) || message.channel.type === 'dm') return;
		
		let messageArray = message.content.split(/\s+/g),
			cmd = messageArray[0].slice(config.prefixDefault.length),
			args = messageArray.slice(1)
			
			const command = getCommand(client, cmd.toLowerCase())
			if(!command) return
			
			if (!message.guild.me.permissions.has('SEND_MESSAGES') || !message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return;
			if (command.ownerOnly && !config.owner.includes(message.author.id)) return;
			
			try {
				command.run(client, message, args)
			} catch (e) {
				console.log(e);
			}
	}
}