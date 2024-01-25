const { SlashCommandBuilder } = require('discord.js');
const ConstRep = require("../../other/constants");
const discord = require("discord.js");
const Channeltype = require("discord.js");
const { EmbedBuilder } = require('discord.js');
const moment = require('moment');

const filterLevels = {
   0: 'Off',
   1: 'No Role',
   2: 'Everyone'
};

const verificationLevels = {
   0: 'None',
   1: 'Low',
   2: 'Medium',
   3: '(╯°□°）╯︵ ┻━┻',
   4: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

module.exports = {
   data: new SlashCommandBuilder()
      .setDMPermission(false)
      .setName("serverinfo")
      .setDescription("Get information about this server."),
   async execute(client, interaction) {
      const roles = interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
      const channels = interaction.guild.channels.cache;
      const emojis = interaction.guild.emojis.cache;
      var rollen = roles.join(', ')
      if ((roles.length - 1) > 40) {
         rollen = `There are more then 40 roles in this server. Please use /roles`
      }
      moment.locale('en-sg')

      const embed = new discord.EmbedBuilder()
         .setDescription(`**Server Info**`)
         .setColor(ConstRep.COLORS.Blue)
         .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
         .addFields({
            name: "General Info", value:
               `**Name:** ${interaction.guild.name}
            **Server ID:** ${interaction.guild.id}
            **Owner:** <@${interaction.guild.ownerId}> (${interaction.guild.ownerId})
            **Boost Tier:** ${interaction.guild.premiumTier ? `${interaction.guild.premiumTier}` : 'None'}
            **Explicit Filter:** ${filterLevels[interaction.guild.explicitContentFilter]}
            **Verification Level:** ${verificationLevels[interaction.guild.verificationLevel]}
            **Time Created:** ${moment(interaction.guild.createdTimestamp).format('LT')} ${moment(interaction.guild.createdTimestamp).format('LL')} [${moment(interaction.guild.createdTimestamp).fromNow()}]`
         },
            {
               name: 'Statistics', value:
                  `**👨‍💻 Members:** ${interaction.guild.memberCount}
            **💬 Text Channels:** ${channels.filter(channel => channel.type === Channeltype.GuildText).size}
            **🔊 Voice Channels:** ${channels.filter(channel => channel.type === Channeltype.GuildVoice).size}
            **💥 Server Boosters:** ${interaction.guild.premiumSubscriptionCount || '0'}`
               //**🤖 Active Bots:** ${interaction.guild.members.cache.filter(member => member.user.bot).size}`,
            },
            {
               name: 'Emojis', value:
                  `**Emojis:** ${emojis.size}
            **Normal Emoji:** ${emojis.filter(emoji => !emoji.animated).size}
            **Animated Emoji:** ${emojis.filter(emoji => emoji.animated).size}`
            },
            { name: `Roles[${roles.length}]`, value: rollen })
         .setFooter({ text: `Kube X` }).setTimestamp()

      interaction.editReply({ embeds: [embed] });
   }
}