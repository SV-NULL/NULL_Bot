const { SlashCommandBuilder } = require('discord.js');
const ConstRep = require("../../other/constants");
const discord = require("discord.js");
const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
        .setDMPermission(false)
        .setName("userinfo")
        .setDescription("Information about user.")
        .addUserOption((option) =>
        option
            .setName("user")
            .setDescription("Choose a user to get their roblox information.")
            .setRequired(true)),
    async execute(client, interaction) {
        var user = interaction.options.getMember("user")
        if (!user || !user.guild) return interaction.editReply({ embeds: [new discord.EmbedBuilder().setTitle("De opgegeven gebruiker is niet gevonden.")] })


        var guildMember = user
        // var perms = Object.keys(user.permissions.serialize()).map((p, i) => p + (i % 2 === 0 ? ", " : "\n")).join(" ").toLocaleLowerCase()

        // if (perms.includes('administrator')) {
        //     var perms = "User heeft alle permisisons"
        // }

        var serverrank = 'Member'

        if (guildMember.permissions.has('KickMembers')) {
            var kick = 'Kick Members <:CheckMark:920049588046557264>'
            serverrank = 'Moderator'
        } else {
            var kick = 'Kick Members <:XMark:920049587656478851>'
        }

        if (guildMember.permissions.has('KickMembers')) {
            var ban = 'Ban Members <:CheckMark:920049588046557264>'
            serverrank = 'Administrator'
        } else {
            var ban = 'Ban Members <:XMark:920049587656478851>'
        }

        if (guildMember.permissions.has('Administrator')) {
            var admin = 'Administrator <:CheckMark:920049588046557264>'
            serverrank = 'Manager'
        } else {
            var admin = 'Administrator <:XMark:920049587656478851>'
        }

        if (guildMember.id == interaction.guild.ownerId) {
            serverrank = "Owner"
        }

        if (guildMember.permissions.has('ManageMessages')) {
            var manage = 'Manage Messages <:CheckMark:920049588046557264>'
        } else {
            var manage = 'Manage Messages <:XMark:920049587656478851>'
        }

        if (guildMember.permissions.has('ManageGuild')) {
            var guildmanage = 'Manage Guild <:CheckMark:920049588046557264>'
        } else {
            var guildmanage = 'Manage Guild <:XMark:920049587656478851>'
        }

        if (guildMember.permissions.has('ManageChannels')) {
            var channelmanage = 'Manage Channels <:CheckMark:920049588046557264>'
        } else {
            var channelmanage = 'Manage Channels <:XMark:920049587656478851>'
        }

        if (guildMember.permissions.has('MentionEveryone')) {
            var mentioneveryone = 'Mention Everyone/Here <:CheckMark:920049588046557264>'
        } else {
            var mentioneveryone = 'Mention Everyone/Here <:XMark:920049587656478851>'
        }
        if (guildMember.user.bot) {
            serverrank = 'Discord Bot'
        }
        var longperms = `${admin}\n${ban}\n${kick}\n${manage}\n${guildmanage}\n${channelmanage}\n${mentioneveryone}`


        // var statustest = user.presence.status
        // if (statustest == 'dnd') {
        //     var status = 'Gebruiker Niet Storen'
        // } else if (statustest == 'offline') {
        //     var status = 'Gebruiker is Offline of Onzichtbaar'
        // } else if (statustest == 'idle') {
        //     var status = 'Gebruiker is AFK'
        // } else if (statustest == 'online') {
        //     var status = 'Gebruiker is online'
        // }

        var serverboostvanaf = guildMember.premiumSinceTimestamp
        if (serverboostvanaf == null) {
            serverboostvanaf = "Geen actieve Serverboost"
        } else {
            serverboostvanaf = moment(serverboostvanaf).format("dddd, D MMMM YYYY")
        }
        moment.locale('en-sg')
        try {
            if (guildMember.roles.cache.size < 20) {

                var content = guildMember.roles.cache.map(Role => `<@&${Role.id}>`).map((p, i) => p + (i % 2 === 0 ? " " : "\n")).join(" ")

                var embed = new discord.EmbedBuilder()
                    .setColor(`${guildMember.displayHexColor}`)
                    .setAuthor({ name: `${user.user.tag}`, iconURL: user.user.avatarURL() })
                    .addFields({ name: "Tag", value: guildMember.user.tag, inline: true },
                        { name: "Name:", value: guildMember.displayName, inline: true },
                        { name: "Display Kleur", value: guildMember.displayHexColor, inline: true },
                        { name: "Rollen", value: content, inline: true },
                        { name: "Hoogste Role", value: `${guildMember.roles.highest}`, inline: true },
                        { name: "Server Rank", value: serverrank, inline: true },
                        { name: "Server Booster", value: serverboostvanaf },
                        { name: "Joinde op", value: `${moment(guildMember.joinedAt).format("LT, D MMMM YYYY")} [${moment(guildMember.joinedAt).fromNow()}]`, inline: true },
                        { name: "Account gemaakt op", value: `${moment(guildMember.user.createdAt).format("LT, D MMMM YYYY")} [${moment(guildMember.user.createdAt).fromNow()}]` },
                        { name: "Premissions", value: `${longperms}` })
                    .setThumbnail(user.user.avatarURL())
                    .setFooter({ text: client.user.username }).setTimestamp()

                interaction.editReply({ embeds: [embed] })

            } else if (guildMember.roles.cache.size > 20) {

                var embed = new discord.EmbedBuilder()
                    .setColor(`${user.displayHexColor}`)
                    .setAuthor({ name: `${user.user.tag}`, iconURL: user.user.avatarURL() })
                    .addFields({ name: "Nickname:", value: guildMember.displayName, inline: true },
                        { name: "Tag", value: guildMember.user.tag, inline: true },
                        { name: "Display Kleur", value: guildMember.displayHexColor, inline: true },
                        { name: "Rollen", value: "User has to many roles.", inline: true },
                        { name: "Hoogste Role", value: `${guildMember.roles.highest}`, inline: true },
                        { name: "Server Booster", value: serverboostvanaf },
                        { name: "Joinde op", value: `${moment(guildMember.joinedAt).format("LT, D MMMM YYYY")} [${moment(guildMember.joinedAt).fromNow()}]`, inline: true },
                        { name: "Account gemaakt op", value: `${moment(guildMember.user.createdAt).format("LT, D MMMM YYYY")} [${moment(guildMember.user.createdAt).fromNow()}]` },
                        { name: "Premissions", value: `${longperms}` },
                        { name: "Server Rank", value: serverrank })
                    .setThumbnail(user.user.avatarURL())
                    .setFooter({ text: client.user.username }).setTimestamp()

                interaction.editReply({ embeds: [embed] });

            }
        } catch (err) {
            console.log("Error R193 userinfo.js\n" + err)
            interaction.editReply({ embeds: [new discord.EmbedBuilder().setTitle("Ongemakkelijk, Er ging iets fout.")] })
        }
    }
}