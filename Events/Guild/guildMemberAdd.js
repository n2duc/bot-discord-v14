const { EmbedBuilder } = require("@discordjs/builders");
const { GuildMember } = require("discord.js");
const Schema = require("../../Models/Welcome");

module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {GuildMember} member
     */
    async execute(member) {
        try {
            const data = await Schema.findOne({ Guild: member.guild.id });
            if (!data) return;
            let channel = data.Channel;
            let message = data.Message || " ";
            let role = data.Role;
            const { user, guild } = member;
            const welcomeChannel = member.guild.channels.cache.get(data.Channel);
    
            const welcomeEmbed = new EmbedBuilder()
                .setTitle("**:partying_face: New member :partying_face: **")
                .setColor(0x4ea3f7)
                .setDescription(data.Message)
                .addFields({
                    name: "Total members",
                    value: `${guild.memberCount}`,
                })
                .setTimestamp();
    
            welcomeChannel.send({ embeds: [welcomeEmbed] });
            member.roles.add(data.Role)
        } catch (err) {
            console.log(err)
        };
    }
};
