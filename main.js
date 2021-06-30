const discord = require('discord.js')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const Client = require('./lib/client.js')

const client = new Client({
  ws: {
    intents: discord.Intents.ALL
  },
  partials: [
    'MESSAGE',
    'REACTION',
    'CHANNEL'
  ]
}, {
  commandsDir: 'cmd',
  listenersDir: 'events'
})

client.login(process.env.DISCORD_TOKEN)
mongoose.connect(process.env.MONGODB_TOKEN, { useNewUrlParser: true, useUnifiedTopology: true })

client.loadAll()
