const Discord = require("discord.js");
const config = require("../config.json");
const { QuickDB } = require("quick.db");
const db = new QuickDB({ table: "staff" });

module.exports = {
  name: "recruta",
  async execute(interaction) {
  
    if (interaction.isButton() && interaction.customId === "formulario_staff") {
        const modal = new Discord.ModalBuilder()
            .setCustomId("modal_staff")
            .setTitle(`FORMULARIO STAFF`);

          const maturidade = new Discord.TextInputBuilder()
            .setCustomId('maturidade')
            .setLabel('você tem maturidade?')
            .setPlaceholder('Escreva aqui.')
            .setStyle(Discord.TextInputStyle.Short)
            const respeito = new Discord.TextInputBuilder()
            .setCustomId('respeito')
            .setLabel('oque seria respeito para você?')
            .setPlaceholder('Escreva aqui.')
            .setStyle(Discord.TextInputStyle.Short)
            const idade = new Discord.TextInputBuilder()
            .setCustomId('idade')
            .setLabel('Qual é a sua Idade')
            .setPlaceholder('Escreva aqui.')
            .setStyle(Discord.TextInputStyle.Short)
            const motivo = new Discord.TextInputBuilder()
            .setCustomId('motivo')
            .setLabel('Porque você quer se tornar da equipe staff?')
            .setPlaceholder('Escreva aqui.')
            .setStyle(Discord.TextInputStyle.Paragraph)
            const tempo = new Discord.TextInputBuilder()
            .setCustomId('tempo')
            .setLabel('Quanto tempo você está disponivel?')
            .setPlaceholder('dê tarde 12:40 até 22:40 da noite')
            .setStyle(Discord.TextInputStyle.Short)

            modal.addComponents(
                new Discord.ActionRowBuilder().addComponents(maturidade),
                new Discord.ActionRowBuilder().addComponents(respeito),
                new Discord.ActionRowBuilder().addComponents(idade),
                new Discord.ActionRowBuilder().addComponents(tempo),
                new Discord.ActionRowBuilder().addComponents(motivo)
              );
            return interaction.showModal(modal);
    };

    if (interaction.isModalSubmit() && interaction.customId === "modal_staff") {
        const channel = interaction.guild.channels.cache.get(config.canal_formulario)
        const maturidade = interaction.fields.getTextInputValue("maturidade");
        const respeito = interaction.fields.getTextInputValue("respeito");
        const idade = interaction.fields.getTextInputValue("idade");
        const motivo = interaction.fields.getTextInputValue("motivo");
        const tempo = interaction.fields.getTextInputValue("tempo");



        interaction.reply({content:`${interaction.user} \n✅Seu Formulario Foi enviado com sucesso`, ephemeral: true})
        const ave = await interaction.channel.send({
            embeds:[new Discord.EmbedBuilder()
                .setDescription(`\n\nEle tem maturidade? : ${maturidade}\n\nOque seria respeito para ele: ${respeito}\n\nQual seria a idade dele: ${idade}\n\nQual seria o motivo dele querer entrar pra staff?: ${motivo}\n\nQuanto tempo ele fica on?: ${tempo}
                `)
        ],
            components:[
                new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                    .setLabel("Aceitar")
                    .setCustomId("aceitar_button")
                    .setEmoji("✅")
                    .setStyle(Discord.ButtonStyle.Success)
                )
                .addComponents(
                    new Discord.ButtonBuilder()
                    .setLabel("Negar")
                    .setCustomId("negar_button")
                    .setEmoji("❌")
                    .setStyle(Discord.ButtonStyle.Danger)
                )
            ]
        })
        await db.set(ave.id, {
          usuario: interaction.user.id,
      });
        
    }



}}