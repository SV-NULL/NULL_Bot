const { SlashCommandBuilder } = require('discord.js')
const discord = require("discord.js")
const ConstRep = require("../../other/constants")
const { ChannelType } = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setDMPermission(false)
        .setName("help")
        .setDescription("View my commands."),
    async execute(client, interaction) {
        var HelpCategorysEmbed = new discord.EmbedBuilder()
            .setColor(ConstRep.COLORS.Aqua)
            .setTitle("Choose a button to get help.")
            .addFields(
                { name: "Policies:", value: "[Terms of Services](https://customdiscordbot.nl/tos/) | [Privacy Policy](https://customdiscordbot.nl/tos/)" },
                { name: "Links:", value: `[Support Server](https://discord.gg/EGPZ5vtpXB)` }
            )

        var options = [
            // {
            //     label: "Setup", description: "The setup commands.",
            //     value: "Setup,ThisWillBeFixedLaterInCode", emoji: "<:Settings:1007258419910152294>",
            // },
            // {
            //     label: "Moderation", description: "The moderation commands.",
            //     value: "Moderation,ThisWillBeFixedLaterInCode", emoji: "<:BanHammer:1007258422187667516>",
            // },
            // {
            //     label: "Tickets", description: "The ticket commands.",
            //     value: "Ticket,/ticket [new] [close] [claim] [unclaim] [add] [remove],/ticket panels [create] [delete]", emoji: "<:KubeTicket:907705962234793984>",
            // },
            // {
            //     label: "Levels", description: "The level commands.",
            //     value: "Level,/rank,/leaderboard", emoji: "<:volumelevelindicator:1010476800310247515>",
            // },
            {
                label: "Info", description: "The info commands.",
                value: "Info,/userinfo,/severinfo,/avatar", emoji: "<:aboutus:1007306725562515456>",
            },
            {
                label: "Other", description: "The other commands.",
                value: "Other,/help,/ping,/roles", emoji: "<:ThreeCircles:1006841017149947904>",
            }
        ]

        const row = new discord.ActionRowBuilder()
            .addComponents(
                new discord.SelectMenuBuilder()
                    .setCustomId("ChooseSubject")
                    .setMinValues(1)
                    .setMaxValues(1)
                    .setPlaceholder("Get the commands of a subject by selecting it.")
                    .addOptions(options)
            );

        interaction.editReply({ embeds: [new discord.EmbedBuilder().setAuthor({ name: "Choose a options to get more information." })], components: [row] })

        const filter = (interactionMenu) => {
            if (interactionMenu.member.id === interaction.member.id) return true;
            return interactionMenu.reply({ content: "You can't use this interaction.", ephemeral: true });
        }

        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            time: 30000
        });

        var HandelingHelpReq = false
        collector.on("collect", async (interactionMenu) => {
            if (HandelingHelpReq) return
            HandelingHelpReq = true
            interactionMenu.deferUpdate().catch(err => { return })

            var embed = new discord.EmbedBuilder().setColor(ConstRep.COLORS.SuperDuperMoowjePaarseKleur)

            var values = interactionMenu.values.join(" ").split(",")
            var embedTitle = values.shift()
            embed.setTitle(`${embedTitle} commands`)

            if (embedTitle == "Setup") values = ["/serversettings [moderation] [welcome-and-leave] [tickets]\n                [roblox-verify] [language] [levelsettings]\n                [suggestions-bugs] [private-voicechannels]", "/viewsettings"]
            if (embedTitle == "Moderation") values = ["/clear\n/slowmode\n/timeout\n/kick\n/ban\n/ban-id\n/unban\n\nWarning Commands\n/warn\n/warnings\n/allwarnings\n/warnremove"]

            var DescriptionWithCommands = ""
            await values.forEach(command => {
                DescriptionWithCommands += `${command}\n`
            })
            embed.setDescription("```fix\n" + DescriptionWithCommands + "```")

            await interaction.editReply({ embeds: [embed], ephemeral: true })
            HandelingHelpReq = false
        })

        //Let the message be but disable the actionrow
        collector.on("end", async (collected) => {
            const disabledRow = new discord.ActionRowBuilder()
                .addComponents(
                    new discord.SelectMenuBuilder()
                        .setCustomId("ChooseSubject")
                        .setMinValues(1)
                        .setMaxValues(1)
                        .setPlaceholder("Interaction ended.")
                        .addOptions(options)
                        .setDisabled(true)
                );

            interaction.editReply({ components: [disabledRow], ephemeral: false }).catch(err => { return })
        })
    }
}