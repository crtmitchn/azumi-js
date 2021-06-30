module.exports = {
  name: 'assign',
  description: 'Assign some permission role to member.',
  permissions: 'everyone, must be server administrator',
  usage: 'a.assign <member> <emoji/admin>',
  aliases: ['assignrole', 'assign-role'],
  async execute (client, message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) {
      message.reply('You must be a server administrator in order to use this command.')
      return
    }
    const User = message.guild.member(message.mentions.members.first()) || message.guild.members.cache.get(args[0])
    if (args[1] === 'emoji') {
      if (message.guild.roles.cache.find(r => r.name === 'Emoji Permissions')) {
        const epp = message.guild.roles.cache.find(r => r.name === 'Emoji Permissions')
        User.roles.add(epp)
      }
      if (!message.guild.roles.cache.find(r => r.name === 'Emoji Permissions')) {
        message.guild.roles.create({
          data: {
            name: 'Emoji Permissions',
            color: '#00ff00',
            permissions: 'MANAGE_EMOJIS'
          }
        }).then(r => User.roles.add(r))
      }
    }
  }
}
