module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        const prefix = client.prefix
        const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}> |${escapeRegex(prefix)})\\s*`);
        if (!prefixRegex.test(message.content.toLowerCase())) return;
        const [, matchedPrefix] = message.content.toLowerCase().match(prefixRegex)
        message.ment = message.mentions.members?.first()
        if(matchedPrefix != prefix) {
            const ments = message.mentions.members.map(m => m)
            message.ment = ments[1]
        }
        const args = message.content.slice(matchedPrefix.length).split(/ +/);;
        if (!message.content.toLowerCase().startsWith(`${matchedPrefix.toLowerCase()}`) || message.author.bot) return

  const comm = args.shift().toLowerCase();
     const command =
           client.commands.get(comm) ||
           client.commands.find(a => a.aliases && a.aliases.includes(comm));
  if(command) {
  try{
    command.execute(client,message,args);
  }catch(error){
    console.error(error);
    message.channel.send(":x: | There was an error executing this command!")
  }
}
    }
}