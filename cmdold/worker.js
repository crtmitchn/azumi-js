const fs = require('fs')
const discord = require('discord.js')
const mongoose = require('mongoose')
require('dotenv').config()
const { prefixDefault, color } = require('./config.json')

// Connecting libraries

const client = new discord.Client()
client.commands = new discord.Collection()

// Client constants

const commandFiles = fs.readdirSync('./cmd').filter((file) => file.endsWith('.js'))

// Reading command directory

for (const file of commandFiles) {
  const command = require(`./cmd/${file}`)
  client.commands.set(command.name, command)
  command.aliases.forEach((elm) => client.commands.set(elm, command))
}

// Reading commands and aliases.

client.once('ready', () => {
  // Event on bot start
  console.log(`Bot ${client.user.tag} logged in successfully`)
  client.user.setPresence({
    status: 'dnd',
    activity: {
      name: 'a.help | @azumi',
      type: 'COMPETING'
    }
  })
})

mongoose
  .connect(process.env.MONGODB_TOKEN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to MONGODB database.')
  })
  .catch((e) => {
    console.log(e)
  })

// mongodb

const prefix = require('./models/prefix')

client.on('message', async (message) => {
  client.prefix = async (message, prefixDefault) => (await prefix.findOne({ GuildID: message.guild.id }))?.Prefix || prefixDefault

  if (message.author.bot) return
  const p = await client.prefix(message, prefixDefault)

  const args = message.content.slice(p.length).trim().split(/\s+/)
  const commandName = args.shift().toLowerCase()
  const command = client.commands.get(commandName)

  if (message.content.includes(client.user.id)) {
    const prefembed = new discord.MessageEmbed()
      .setColor(color)
      .setTitle(`Server prefix is ${p}`)
    message.channel.send(prefembed)
  }

  // lokilife is pro

  if (!command) return

  if (!message.content.startsWith(p)) return

  command.execute(client, message, args)
})

client.login(process.env.DISCORD_TOKEN)
