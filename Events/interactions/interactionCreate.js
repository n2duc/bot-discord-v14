const { CommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {CommandInteraction} interaction
     */
    execute(interaction, client) {
        const { commandName, customId } = interaction;

        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(commandName);
            if (!command) {
                interaction.reply({
                    content: "outdated command",
                    ephemeral: true,
                });
            }
            command.execute(interaction, client);
        }
        if (interaction.isButton()) {
            if (customId == "verify") {

                const role = interaction.guild.roles.cache.get(
                    "1087304182341570560"
                    );
                    return interaction.member.roles.add(role).then((member) =>
                interaction.reply({
                    content: `${role} has been assigned to you.`,
                    ephemeral: true,
                })
                );
            }
        } else {
            return;
        }
    },
};
