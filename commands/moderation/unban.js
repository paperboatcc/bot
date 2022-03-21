const getUser = require('../../utils/getUser.js')

module.exports = {
    name: 'unban',
    async execute(client, message, args) {
        if (!message.member.permissions.has("UNBAN_MEMBERS")) return message.channel.send(":x: | You don't have the required permissions to run this command!")
        let user = await getUser(client, args[0], true)
        if (!user) return message.channel.send(":x: | User not found.")
        await message.guild.bans.fetch()
        if (!message.guild.bans.cache.map(u => u.user.id).includes(user.id)) return message.channel.send(':x: | User not found.')
        message.guild.members.unban(user, 'Unbanned by ' + message.author.tag)
        message.channel.send('Unbanned ' + user.tag)
}
}