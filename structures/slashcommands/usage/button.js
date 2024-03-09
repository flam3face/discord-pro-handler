const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    name: "button",
    description: "All things you need to know about buttons.",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */

    run: async (client, interaction, args) => {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel('Primary')
                    .setStyle(ButtonStyle.Primary),

                new ButtonBuilder()
                    .setCustomId('secondary')
                    .setLabel('Secondary')
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('success')
                    .setLabel('Success')
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId('danger')
                    .setLabel('Danger')
                    .setStyle(ButtonStyle.Danger),

                new ButtonBuilder()
                    .setLabel('Link')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://unburn.tech/'),
            )

        return interaction.reply({ components: [row] })
    }
}