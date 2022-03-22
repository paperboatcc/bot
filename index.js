const Discord = require('discord.js')
require('dotenv').config();
const fs = require('fs')

const client = new Discord.Client({intents: 4685})

client.commands = new Discord.Collection()
client.prefix = '.'
client.owners = [
        '658586788721590273', //Antogamer#2810
        '723086691266461737', //ParliamoDiPC#0001
        '498434550347726850' //Fleny113#5835
]
const norcommandFolders = fs.readdirSync('./commands');
for (const norfolder of norcommandFolders) {
        const norcommandFiles = fs
                .readdirSync(`./commands/${norfolder}`)
                .filter(norfile => norfile.endsWith('.js'));
        for (const norfile of norcommandFiles) {
                const norcommand = require(`./commands/${norfolder}/${norfile}`);
                client.commands.set(norcommand.name, norcommand);
        }
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        try{
        if (event.once) {
                client.once(event.name, async (...args) => await event.execute(...args, client));
        } else {
                client.on(event.name, async (...args) => await event.execute(...args, client));
        }
} catch(err) {
        console.log(err)
}
}

client.login(process.env.TOKEN)