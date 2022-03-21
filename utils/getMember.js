module.exports = async (client, message, id, strict) => {
    try {
        let member;
        let men = message.mentions.members.first();
        let ar = message.guild.members.cache.get(id);
        let d = message.guild.members.cache.find(m => m.user.tag.toLowerCase() === id.toLowerCase());
        let nd = message.guild.members.cache.find(u => u.user.username.toLowerCase() === id.toLowerCase());
        let nicku = message.guild.members.cache.filter(s => s.nickname != null).find(e => e.nickname?.toLowerCase() === id.toLowerCase());
        member = men ?? ar ?? d ?? nd ?? nicku;
        try {
            if (!member)
                member = await message.guild.members.fetch(id);
        }
        catch (err) {
        }
        try {
            if (!member)
                member = await message.guild.members.fetch({ query: id });
            if (!('user' in member))
                member = member.first();
        }
        catch (err) { }
        if (strict && member != message.mentions.members.first() &&
            member && 'user' in member &&
            member?.user?.username?.toLowerCase() != id.toLowerCase())
            member = undefined;
        if (strict && member && member == message.mentions.members.first()) {
            let mentId = message.mentions.members.first().toString().replaceAll(/<|>|@|!| /gm, '');
            let ourId = id.replaceAll(/<|>|@|!| /gm, '');
            if (mentId != ourId)
                return;
        }
        return member;
    }
    catch (err) {
        console.log(err);
        return undefined;
    }
};