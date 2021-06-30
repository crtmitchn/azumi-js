const chalk = require('chalk')
// eslint-disable-next-line no-unused-vars
const Client = require('../lib/client')

/**
 * @param {Client} client
 * @returns
*/
function activities (client) {
  return [
    { name: 'for guilds', options: { type: 'WATCHING' } },
    { name: 'a.help', options: { type: 'PLAYING' } },
    { name: `${client.users.cache.size} users`, options: { type: 'COMPETING' } }
  ]
}

module.exports = {
  name: 'ready',
  run: async function (client) {
    console.log(chalk.cyan(
      '[Client] Started\n' +
            `[Client] Name: ${client.user.tag}\n` +
            `[Client] ID: ${client.user.id}\n` +
            `[Client] Servers: ${client.guilds.cache.size}`
    ))

    let i = 0
    setInterval(
      () => {
        if (i >= activities(client).length) i = 0
        client.user.setActivity(activities(client)[i].name, activities(client)[i].options)
        i++
      }, 10000
    )
  }
}
