module.exports = {
    name: 'help',
    async execute(client, message, args) {
        let embed = {
            title: 'Help',
            description: 'This is the help command for the fasm.ga bot!',
            fields: [
                {name: 'Moderation', value: '**Ban** bans the selected user\n**Kick** kicks the selected user\n**Mute** mutes the selected user\n**Unban** unbans the selected user\n**Unmute** unmutes the selected user', inline: true},
                {name: 'Miscellaneous', value: '**Help** help command\n**Info** shows bot info', inline: true}
            ],
            color: 0x04977c

        }
        message.channel.send({embeds: [embed]})
    }
}