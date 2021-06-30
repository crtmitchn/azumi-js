const mongoose = require('mongoose')

const warnSchema = new mongoose.Schema({
  GuildID: String,
  UserID: String,
  Punishments: Array
})

module.exports = mongoose.model('Moderaton', warnSchema)
