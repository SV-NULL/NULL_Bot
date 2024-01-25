const { SlashCommandBuilder } = require('discord.js');
const ConstRep = require("../../other/constants");
const discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setDMPermission(false)
        .setName("avatar")
        .setDescription("Gives you a avatar from a user.")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("Choose a user to get their rank.")
        ),
    async execute(client, interaction) {
        var avatarUser = interaction.options.get("user")
        if(!avatarUser) avatarUser = interaction

        var avatarAuthor = new discord.EmbedBuilder()
            .setColor(ConstRep.COLORS.noColor)
            .setTitle(`Avatar from ` + avatarUser.user.username)
            .setImage(avatarUser.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: client.user.username }).setTimestamp()
            
        interaction.editReply({ embeds: [avatarAuthor] });
    }
}