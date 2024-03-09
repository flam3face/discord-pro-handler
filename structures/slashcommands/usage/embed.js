const { EmbedBuilder, Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "embeds",
    description: "All things you need to know about embeds.",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */

    run: async (client, interaction, args) => {
        const embed = new EmbedBuilder()
            .setAuthor({ name: `Author`, iconURL: interaction.user.displayAvatarURL() })
            .setURL('https://unburn.tech')
            .setTitle(`Title`)
            .setDescription(`Description`)
            .setColor(`Random`)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setImage(interaction.user.displayAvatarURL())
            .addFields(
                { name: `Field 1`, value: `Value 1` },
                { name: `Field 2`, value: `Value 2` }
            )
            .setFooter({ text: `Footer`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp()

        return interaction.reply({ embeds: [embed] })
    }
}