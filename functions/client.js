const { GatewayIntentBits, Partials } = require("discord.js")
const discord = require("discord.js")
require("dotenv").config()

const client = new discord.Client({
    intents:
        [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildBans,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildVoiceStates
        ],
    partials: [Partials.Message, Partials.Channel , Partials.Reaction, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.User]
})

client.commands = new discord.Collection();
client.events = new discord.Collection()

client.login(process.env.bottoken)

module.exports.GetClient = () => {
    return client
}