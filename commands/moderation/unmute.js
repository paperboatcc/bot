const getMember = require('../../utils/getMember.js')
module.exports = {
    name: 'unmute',
    async execute(client, message, args) {
        const mod = message.member
        if (!mod.permissions.has("MODERATE_MEMBERS")) return message.channel.send(":x: | You don't have the required permissions to run this command!")
        const member = await getMember(client, message, args[0], true);
        if (!member) return message.channel.send(':x: | User not found.')
        if (message.author.id == member.user.id) return message.channel.send(':x: | You can\'t unmute yourself');
        if (member.user.id == client.user.id) return message.channel.send(':x: | I can\'t unmute myself');
        if (member.user.id == message.guild.ownerId) return message.channel.send(':x: | You can\'t unmute the server owner');
        if (message.author.id != message.guild.ownerId) {
            if (member.roles) {
                if (!(message.member.roles.highest.position > member.roles.highest.position)) return message.channel.send(':x: | You can\'t unmute the selected user');
            }
        }
        if (!member.moderatable) return message.channel.send(':x: | I can\'t unmute the selected user');
        if (!member.isCommunicationDisabled()) return message.channel.send(':x: | The user isn\'t muted');
        let reason = args.slice(1)?.join(' ')
        try {
            await member.disableCommunicationUntil(null, reason + ` (Mute removed by ` + message.author.tag + ')');
        }
        catch (err) {
            console.log(err);
        }
        await message.channel.send(`Successfully unmuted ` + member);
    }
    
}