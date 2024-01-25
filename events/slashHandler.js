const ClientFile = require("../functions/client");
const client = ClientFile.GetClient();
const moment = require("moment");
const discord = require("discord.js");
const ConstRep = require("../other/constants")
const timeout = new Map();
var timeoutList = [
    { name: "language", timeout: 15000 },
    { name: "premiumsetup", timeout: 30000 },
    { name: "antiraid", timeout: 30000 },
    { name: "messagelogs", timeout: 30000 },
    { name: "filterlinks", timeout: 15000 },
    { name: "fixmuterole", timeout: 60000 },
    { name: "myPremium", timeout: 60000 },
    { name: "getrole", timeout: 60000 },
    { name: "redeem", timeout: 30000 },
    { name: "setup", timeout: 30000 },
    { name: "new", timeout: 10000 },
    { name: "help", timeout: 30000 },
    { name: "redeem", timeout: 60000 }
];
const { InteractionType, ChannelType } = require("discord-api-types/v10");

client.on('interactionCreate', async interaction => {
    //AUTOCOMPLETE HANDLER
    if (interaction.type == InteractionType.ApplicationCommandAutocomplete) {
        const runTHIScommand = client.commands.get(interaction.commandName + "Slash")
        if (!runTHIScommand) return

        try {
            await runTHIScommand.autoComplete(client, interaction)
        } catch (err) {
            console.log(`SLASHCOMMAND AutoComplete ERROR in ${interaction.commandName}\n` + err)
        }
    }


    if (interaction.type !== InteractionType.ApplicationCommand) return
    if (!interaction.guild) return interaction.reply({ embeds: [new discord.EmbedBuilder().setTitle("I only work in servers.").setDescription(`You can just stop.`)] })

    const runTHIScommand = client.commands.get(interaction.commandName + "Slash")
    if (!runTHIScommand) return

    var TimeoutCmd = timeoutList.find(v => v.name == interaction.commandName.toString())
    if (TimeoutCmd) {
        if (timeout.has(interaction.user.id + interaction.commandName)) {
            var GetMapCollect = timeout.get(interaction.user.id + interaction.commandName)
            var cooldown = Math.round(GetMapCollect.Time / 1000)

            return interaction.reply({ embeds: [new discord.EmbedBuilder().setDescription(`Cooldown voorbij <t:${cooldown}:R>`)], ephemeral: true })
        } else {
            timeout.set(interaction.user.id + interaction.commandName, { CmdName: interaction.commandName, Time: Date.now() + TimeoutCmd.timeout })
            setTimeout(() => {
                timeout.delete(interaction.user.id + interaction.commandName)
            }, TimeoutCmd.timeout)
        }
    }
    var subCommandName = interaction.options.getSubcommand(false)
    var subCommandGroup = interaction.options.getSubcommandGroup(false)
    var GroupNameSub = " "
    if (subCommandGroup) GroupNameSub += `/${subCommandGroup}`
    if (subCommandName) GroupNameSub += `/${subCommandName}`

    console.log(moment().format('H:mm'), 'SLASHCOMMAND', interaction.guild.name + " | /" + interaction.commandName + GroupNameSub)

    try {
        await interaction.deferReply()
        await runTHIScommand.execute(client, interaction)
    } catch (err) {
        console.error(err)

        await interaction.editReply({ embeds: [new discord.EmbedBuilder().setDescription("Sadly, something went wrong.")], ephemeral: true }).catch(err => {
            console.log("RANDOM ERROR\n" + err)
            interaction.reply({ embeds: [new discord.EmbedBuilder().setDescription("Sadly, something went wrong.")], ephemeral: true })
        })
    }
})