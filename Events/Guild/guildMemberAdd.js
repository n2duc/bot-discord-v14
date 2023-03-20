const { EmbedBuilder } = require('@discordjs/builders')
const { GuildMember } = require('discord.js')

module.exports = {
    name: "guildMemeberAdd",
    execute(member) {
        const { user, guild } = member
        const welcomeChannel = member.guild.channels.cache.get('1018527427493904454');
        const welcomeMessage = `Welcome <@${member.id}> to the guild`;
        const memberRole = '956444178508820492'

        const welcomeEmbed = new EmbedBuilder()
            .setTitle("New Member!")
            .setDescription(welcomeMessage)
            .setColor(0x037821)
            .addFields({name: 'Total members', value: `${guild.memberCount}`})
            .setTimestamp();

        welcomeChannel.send({ embeds: [welcomeEmbed] })
        member.roles.add(memberRole)
    }
}