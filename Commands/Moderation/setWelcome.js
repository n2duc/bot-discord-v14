const {
    Message,
    Client,
    SlashCommandBuilder,
    PermissionFlagsBits,
} = require("discord.js");
const welcomeSchema = require("../../Models/Welcome");
const { model, Schema } = require("mongoose");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("setwelcome")
        .setDescription("Set the welcome channel and message for your server!")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption((option) =>
            option
                .setName("channel")
                .setDescription("The channel to send the welcome message in.")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("message")
                .setDescription("Enter your welcome message")
                .setRequired(true)
        )
        .addRoleOption((option) =>
            option
                .setName("role")
                .setDescription("The role to give to new members.")
                .setRequired(true)
        ),

    async execute(interaction, client) {
        const { channel, options } = interaction;
        const welcomeChannel = options.getChannel("channel");
        const welcomeMessage = options.getString("message");
        const roleId = options.getRole("role");

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) {
            interaction.reply({ content: "You do not have permission to use this command!", ephemeral: true });
        }

        try {
            const data = await welcomeSchema.findOne({ Guild: interaction.guild.id });

            if (!data) {
                welcomeSchema.create({
                    Guild: interaction.guild.id,
                    Channel: welcomeChannel.id,
                    Message: welcomeMessage,
                    Role: roleId.id,
                })
            }
            if (data) {
                console.log(data)
            }
            interaction.reply({ content: `Welcome channel set to ${welcomeChannel} and welcome message set to ${welcomeMessage} and role set to ${roleId}`, ephemeral: true });
        } catch (err) {
            console.log(err)
        };
    }
};
