const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    moderatorOnly: true,
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a member from the server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Select a target to kick.')
        )
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('Reason for kicking the target.')
        ),

    async execute(interaction) {
        const { channel, options } = interaction;
        const user = options.getUser('target');
        const reason = options.getString('reason') || "No reason provided";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setColor(0xff0000)
            .setDescription(`You do not have permission to kick ${user}.`)

        if (member.roles.highest.position >= interaction.member.roles.highest.position) 
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });
        
        await member.kick(reason)
        const embed = new EmbedBuilder()
            .setDescription(`Successfully kicked ${user} from the server with reason: ${reason}.`)
        
        await interaction.reply({ embeds: [embed] });
    }
}