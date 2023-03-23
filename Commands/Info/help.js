const { ComponentType, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Get a list of all commands or info about a specific command."),
    async execute(interaction) {
        const emojis = {
            info: '📝',
            moderation: '🛠️',
            general: '🌍',
        };
        const directories = [
            ...new Set(interaction.client.commands.map((cmd) => cmd.folder)),
        ];

        const formatString = (string) => `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;

        const categories = directories.map((dir) => {
            const getCommands = interaction.client.commands.filter((cmd) => cmd.folder === dir).map((cmd) => {
                return {
                    name: cmd.data.name,
                    description: cmd.data.description || "There is no description for this command.",
                };
            });

            return {
                directory: formatString(dir),
                commands: getCommands,
            }
        });

        const embed = new EmbedBuilder()
            .setTitle("Help Menu")
            .setDescription("Select a category from the dropdown below to view a list of commands in that category.");
        
        const components = (state) => [
            new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("help_menu")
                    .setPlaceholder("Select a category")
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLowerCase(),
                                description: `View a list of ${cmd.directory} commands.`,
                                emoji: emojis[cmd.directory.toLowerCase() || null],
                            }
                        })
                    )
            ),
        ];

        const initialMessage = await interaction.reply({
            embeds: [embed],
            components: components(false),
        });
        const filter = (interaction) => {
            interaction.user.id === interaction.member.id;
        }
        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            componentType: ComponentType.Button,
        });

        collector.on("collect", (interaction) => {
            const [ directory ] = interaction.values;
            const category = categories.find((x) => x.directory.toLowerCase() === directory);
            const categoryEmbed = new EmbedBuilder()
                .setTitle(`${formatString(directory)} Commands`)
                .setDescription(`A list of all ${directory} commands.`)
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `\`${cmd.name}\``,
                            value: cmd.description,
                            inline: true,
                        }
                    })
                );

                interaction.update({ embeds: [categoryEmbed] });
        });

        collector.on("end", () => {
            initialMessage.edit({
                components: components(true),
            });
        });
    }
};