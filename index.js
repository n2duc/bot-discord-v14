const { Client, GatewayIntentBits, Partials } = require('discord.js')
const { GuildMembers, Guilds, GuildMessages } = GatewayIntentBits
const { User, Message, GuildMember, ThreadMember, Channel } = Partials
require('dotenv').config();
const TOKEN = process.env.TOKEN

const {loadEvents} = require('./Handlers/eventHandler')

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember],
})
client.login(TOKEN).then(() => {
    loadEvents(client)
})