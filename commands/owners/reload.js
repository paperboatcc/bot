const fs = require('fs') 

module.exports = {
	name: "reload",
	description: "Reloads a command",
  aliases: ["r"],
	cooldown: 1,
	async execute(client, message, args) {
		 const a = args[0]
          if (!client.owners.includes(message.author.id)) return;
          if (!a) return
          		const commandName = args[0]
		const command = client.commands.get(commandName)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command?.name) return message.channel.send('Command not found')
const norcommandFolders = fs.readdirSync('./commands');
for (let norfolder of norcommandFolders) {
	const norcommandFiles = fs
		.readdirSync(`./commands/${norfolder}`)
		.filter(norfile => norfile.endsWith('.js'));
	for (let norfile of norcommandFiles) {
		let norcommand
  try{
  delete require.cache[require.resolve(`../${norfolder}/${norfile}`)]
  norcommand = require(`../${norfolder}/${norfile}`);
} catch(err) {console.log(err)} 
	
if(norcommand?.name == command.name) {
await client.commands.set(norcommand.name, norcommand);
message.channel.send(`\`${command.name}\` reloaded successfully.`)
}} 
}
	},
};
