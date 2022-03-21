const getMember = require('../../utils/getMember.js')
const getExpiration = require('../../utils/getExpiration.js')
module.exports = {
    name: 'mute',
    async execute(client, message, args) {
        let mod = message.member
        let guild = message.guild
        if (!mod.permissions.has("MODERATE_MEMBERS")) return message.channel.send(":x: | You don't have the required permissions to run this command!")
        const member = await getMember(client, message, args[0], true);
        if (!member) return message.channel.send(':x: | User not found.')
        if (mod.id == member.user.id) return message.channel.send(':x: | You can\'t mute yourself, silly!')
        if (member.user.id === message.guild.ownerId) return message.channel.send(':x: | You can\'t mute the owner of the server');
        if (mod.user.id !== message.guild.ownerId) {
            if (!mod.roles) return message.channel.send(':x: | You can\'t mute the selected user.');
            if (!(mod.roles.highest.position > member.roles.highest.position)) return message.channel.send(':x: | You can\'t mute the selected user.');
            if (member.user.id === message.guild.me.user.id) return message.channel.send('Why are you trying to mute me? :(');
            if (!member.moderatable) return message.channel.send(':x: | You can\'t mute the selected user.')
            }
            let reason = args.slice(2).join(' ');
            let d;
            if (!isNaN(parseInt(args[1]))) {
                d = getExpiration(args[1]);
            }
            if (!d)
            return await message.replyOrSend(':x: | You need to provide an expiration for the mute!');
    d = d + Date.now();
    let days = `Expiration: <t:${Math.round(d / 1000)}:R> (<t:${Math.round(d / 1000)}:F>)`;
    await member.send('You got muted from the ' + guild.name + ' server\nReason: ' + reason + ' \n' + days)
    await member.disableCommunicationUntil(d, `${reason} (Muted by ${message.author.tag})`);
    await message.channel.send(`Successfully muted ${member.toString()}\n${days}`);
    }
}