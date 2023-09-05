const Discord = require("discord.js")
const config = require("../../config.json")

module.exports = {
  name: "form_staff", // Coloque o nome do comando
  description: "Formulario Staff", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {

        const embed = new Discord.EmbedBuilder()
        .setAuthor({
            name: interaction.guild.name,
            iconURL: interaction.guild.iconURL({ dynamic: true }),
          })
        .setDescription("**Formulário Staff ** \n \n Seja Sincero e escreva com suas Palavras. \n \n Proibido respostas de Internet / Pesquisa \n \nTenha Paciência e não fique nos perguntando sobre após fazer o formulário. ")
        .setColor("Default")
        .setImage(config.imagem)
        .setThumbnail(
            `${interaction.guild.iconURL({
              dynamic: true,
              format: "png",
              size: 4096,
            })}` 
          );

        const button = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("formulario_staff")
            .setLabel("formulario")
            .setStyle(Discord.ButtonStyle.Primary)
        )

          interaction.reply({content:"✅ - Painel Enviado com Sucesso", ephemeral: true})
          interaction.channel.send({embeds:[embed], components:[button]})
    }

  }
}