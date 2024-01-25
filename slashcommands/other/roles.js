const { SlashCommandBuilder } = require('discord.js');
const ConstRep = require("../../other/constants");
const discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setDMPermission(false)
        .setName("roles")
        .setDescription("Gives you a list of all the roles in this server."),
    async execute(client, interaction) {
        var roles = ""
        await interaction.guild.roles.cache.map(Role => {
            if (Role) roles += `<@&${Role.id}>\n`
        });

        var serverEmbed = new discord.EmbedBuilder()
            .setTitle(`🗂 Roles (${interaction.guild.roles.cache.size})`)
            .setColor(ConstRep.COLORS.noColor)
            .setDescription(`${roles}`)
            .setFooter({ text: client.user.username }).setTimestamp()
            
        interaction.editReply({ embeds: [serverEmbed] }).catch(err => {
            interaction.editReply(new discord.EmbedBuilder().setDescription("Er ontstond een error bij het verzenden. Mogelijk te veel characters."))
        })
    }
}
