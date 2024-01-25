const moment = require('moment');
const discord = require('discord.js');
const fs = require('fs');

process.on('unhandledRejection', (error, promise) => {
    console.error(moment().format('H:mm'), 'Unhandled promise rejection:', promise);
});

const ClientFile = require("./functions/client");
const client = ClientFile.GetClient();

client.once("ready", async () => {
    console.log(client.user.tag + " is online");
    client.user.setActivity("['null', 'null gif', 'anime', 'anime gif', 'bobr'] to get a response", { type: discord.ActivityType.Watching })

    // Events folder handler
    const eventFiles = fs.readdirSync(`./events/`).filter(file => file.endsWith('.js'));
    var check = false
    for (const fileName of eventFiles) {
        const event = require(`./events/${fileName}`)
        try {
            client.events.set(fileName, event);
            if (check == false) {
                console.log(`[EVENT HANDLER] - File ${fileName} was loaded.`)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // handler folder handler
    const handlerFiles = fs.readdirSync(`./handlers/`).filter(file => file.endsWith('.js'));
    for (const fileName of handlerFiles) {
        const file = require(`./handlers/${fileName}`)
        try {
            file.run(client)
            console.log(`[HANDLER HANDLER] - File ${fileName} was loaded.`)
        } catch (err) {
            console.log(err)
        }
    }
})