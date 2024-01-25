const { SlashCommandBuilder } = require('discord.js');
const ConstRep = require("../../other/constants");
const discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setDMPermission(false)
        .setName("ping")
        .setDescription("Reaction Time of this shard."),
    async execute(client, interaction) {
        var timer = Date.now()
        await interaction.editReply({
            embeds: [new discord.EmbedBuilder()
                .setTitle("Pinging 🏓")
                .setDescription("Calculating Ping")
                .setFooter({ text: client.user.username }).setTimestamp()
            ]
        });

        const sendPing = (Date.now() - timer)
        interaction.editReply({
            embeds: [new discord.EmbedBuilder()
                .setColor(ConstRep.COLORS.Blue)
                .setTitle("Pong! 🏓")
                .setDescription(`Reaction time: **${Math.round(sendPing / 2)}**ms. Average ping: **${Math.floor(client.ws.ping)}**ms`)
                .setFooter({ text: client.user.username }).setTimestamp()
            ]
        });
    }
}