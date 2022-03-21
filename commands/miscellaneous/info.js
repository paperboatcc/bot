module.exports = {
    name: 'info',
    async execute(client, message, args) {
        let embed = {
            title: 'Info',
            description: 'Are you looking for the source code? You can find it on [our GitHub](https://github.com/fasmga/bot)!',
            fields: [
                {name: 'Uptime', value: 'I am online since <t:' + Math.round(client.readyTimestamp /1000) + '>', inline: true},
                {name: 'Developer', value: '**Antogamer#2810**', inline: true}
            ],
            color: 0x04977c
        }
        message.channel.send({embeds: [embed]})
    }
}