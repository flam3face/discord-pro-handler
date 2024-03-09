const { Client, CommandInteraction, StringSelectMenuBuilder, ActionRowBuilder, ChannelSelectMenuBuilder, ChannelType, RoleSelectMenuBuilder, UserSelectMenuBuilder } = require("discord.js");

module.exports = {
    name: "selectmenu",
    description: "All things you need to know about select menu.",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */

    run: async (client, interaction, args) => {
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select')
                    .setPlaceholder('Nothing selected')
                    .addOptions(
                        {
                            label: 'Select me',
                            description: 'This is a description',
                            value: 'first_option',
                        },
                        {
                            label: 'You can select me too',
                            description: 'This is also a description',
                            value: 'second_option',
                        }
                    )
            )

        const row2 = new ActionRowBuilder()
            .addComponents(
                new ChannelSelectMenuBuilder()
                    .setCustomId('select-channel')
                    .setPlaceholder('Select Channel'),
            )

        const row3 = new ActionRowBuilder()
            .addComponents(
                new RoleSelectMenuBuilder()
                    .setCustomId('select-role')
                    .setPlaceholder('Select Role'),
            )

        const row4 = new ActionRowBuilder()
            .addComponents(
                new UserSelectMenuBuilder()
                    .setCustomId('select-user')
                    .setPlaceholder('Select User')
            )


        return interaction.reply({ components: [row, row2, row3, row4] })
    }
}