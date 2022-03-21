module.exports = {
    name: 'ready',
    once: 'true',
    async execute(client) {
        console.log(client.user.tag + ' is ready!')
        client.user.setActivity('the fasm.ga Discord server!', {type: 'WATCHING'})
    }
}