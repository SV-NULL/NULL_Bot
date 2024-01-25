const { SlashCommandBuilder } = require('discord.js')
const discord = require("discord.js")
const ConstRep = require("../../other/constants")
const quotes = require("../../messageResponses/quotes.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setDMPermission(false)
        .setName("quote")
        .setDescription("Get a funny NULL quote."),
    async execute(client, interaction) {
        var quote = quotes[Math.floor(Math.random() * quotes.length)]

        var embed = new discord.EmbedBuilder()
        .setColor(ConstRep.COLORS.Aqua)
        .setTitle("QUOTE")
        .setDescription(quote ? quote : "No quote found.")
        .setFooter({ text: client.user.username }).setTimestamp()

        interaction.editReply({ embeds: [embed] })
    }
}