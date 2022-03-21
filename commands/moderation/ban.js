const getMember = require('../../utils/getMember.js')
const getUser = require('../../utils/getUser.js')
module.exports = {
    name: 'ban',
    async execute(client, message, args) {
        let mod = message.member
        let guild = message.guild
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send(":x: | You don't have the required permissions to run this command!")
        let member = await getMember(client, message, args[0], true)
        let userid = member?.user?.id
        let user = await getUser(client, userid ?? args[0])
        if (!user) return message.channel.send(":x: | User not found.")
        try {
            let inguild = await message.guild.members.fetch(user)
        if(inguild) {
            if (mod.id == user.user.id) return message.channel.send(':x: | You can\'t ban yourself, silly!')
            if (user.user.id === message.guild.ownerId) return message.channel.send(':x: | You can\'t ban the owner of the server');
            if (!member.bannable) return message.channel.send(":x: | You can't ban the selected user.")

            if (mod.user.id !== message.guild.ownerId) {
                if (!mod.roles) return message.channel.send(':x: | You can\'t ban the selected user.');
                if (!(mod.roles.highest.position > member.roles.highest.position)) return message.channel.send(':x: | You can\'t ban the selected user.');
            }
            if (user.user.id === message.guild.me.user.id)
            return await message.channel.send('Why are you trying to ban me? :(');
            if (!user.bannable) return message.channel.send(':x: | You can\'t ban the selected user.')
        }
        } catch (error) {}
        let reason = args.slice(1).join(" ");
        if (!reason) {
            reason = "No reason specified (Banned by " + mod.user.tag +')'
          } else if (reason) {
              reason = reason + " (Banned by " + mod.user.tag +')'
          }
          await message.channel.send('Successfully banned ' + user.tag)
          try {
            let inguild = await message.guild.members.fetch(user)

            if (inguild) await user.send('You got banned from the ' + guild.name + ' server\nReason: ' + reason)
          } catch (error) {
              
          }
          guild.members.ban(user, {reason: reason})
    }
}