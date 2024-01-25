const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')
const fs = require("fs")
const SlashCommands = [];

module.exports.run = async (client) => {
    const slashFolders = fs.readdirSync('./slashcommands/')
    for (const folder of slashFolders) {
        const slashFiles = fs.readdirSync(`./slashcommands/${folder}`)
        for (const file of slashFiles) {
            const cmdSlash = require(`../slashcommands/${folder}/${file}`)

            SlashCommands.push(cmdSlash.data.toJSON())
            
            client.commands.set(cmdSlash.data.name + "Slash", cmdSlash);
        }
    }

    const CLIENT_ID = client.user.id

    const rest = new REST({
        version: "10"
    }).setToken(process.env.bottoken);

    console.log(`Loaded ${SlashCommands.length} slash commands.`)

    try {
      console.log("[REST] Started to refresh application (/) commands.");
      await rest.put(Routes.applicationCommands(CLIENT_ID), {
        body: SlashCommands,
      });
      console.log("[REST] Sccessfully reloaded application (/) commands.");
    } catch (error) {
      throw error;
    }
}  