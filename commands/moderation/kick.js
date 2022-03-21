const getMember = require('../../utils/getMember.js')

module.exports = {
    name: 'kick',
    async execute(client, message, args) {
        let mod = message.member
        let guild = message.guild
        if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send(":x: | You don't have the required permissions to run this command!")
        let member = await getMember(client, message, args[0], false)
        if (!member) return message.channel.send(':x: | User not found.')
        if (mod.id == member.user.id) return message.channel.send(':x: | You can\'t kick yourself, silly!')
            if (member.user.id === message.guild.ownerId)
            return await message.channel.send(':x: | You can\'t kick the owner of the server');
            if (member.permissions.has("KICK_MEMBERS")) return message.reply(":x: | You can't kick the selected user.")

            if (mod.user.id !== message.guild.ownerId) {
                if (!mod.roles)
                    return await message.channel.send(':x: | You can\'t kick the selected user.');
                if (!(mod.roles.highest.position > member.roles.highest.position))
                    return await message.channel.send(':x: | You can\'t kick the selected user.');
        if (member.user.id === message.guild.me.user.id) return await message.channel.send('Why are you trying to kick me? :(');
        if (!member.kickable) return message.channel.send(':x: | You can\'t kick the selected user.')
            }
            let reason = args.slice(1).join(" ");
            if (!reason) {
                reason = "No reason specified (Kicked by " + mod.user.tag +')'
              } else if (reason) {
                  reason = reason + " (Kicked by " + mod.user.tag +')'
              }
              await message.channel.send('Successfully kicked ' + member.user.tag)
              await member.send('You got kicked from the ' + guild.name + ' server\nReason: ' + reason)
              await guild.members.kick(member, {reason: reason})
        }
}