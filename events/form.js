const Discord = require("discord.js");
const config = require("../config.json");
const { QuickDB } = require("quick.db");
const db = new QuickDB({ table: "staff" });

module.exports = {
  name: "recruta",
  async execute(interaction) {

    
    const database = await db.get(interaction.message.id);
    if (!database) return;
  
    const member = interaction.guild.members.cache.get(interaction.user.id);
    if (!member) return;


    if (interaction.isButton() && interaction.customId === "aceitar_button") {
      if (!interaction.member.roles.cache.get(config.cargo_staff))
      return interaction.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor("Default")
            .setDescription(
              `❌ Você não tem permissão para Aprovar este Usuario`
            ),
        ],
        ephemeral: true,
      });
        

      const membro = await interaction.guild.members.cache.get(database.usuario);
            if (!membro) return;

        const role = interaction.guild.roles.cache.find((r) => r.id === config.cargo_aprovado);
   membro.send({
    embeds:[
        new Discord.EmbedBuilder()
        .setDescription(`🎉Parabens ${membro} \n✅Você foi aprovado com Sucesso!`)
    ]
   })
      membro.roles.add(role)
        .then(() => console.log(`adicionado cargo para ${membro}`))
        .catch(console.error);

    interaction.update({
        embeds:[
            new Discord.EmbedBuilder()
            .setDescription(`O Usuario ${membro} foi Aprovado para equipe Staff`)
        ],
        components:[]
        
    })

    }

    if (interaction.isButton() && interaction.customId === "negar_button") {
        const membro = await interaction.guild.members.cache.get(database.usuario);
            if (!membro) return;
        
            membro.send({
                embeds:[
                    new Discord.EmbedBuilder()
                    .setDescription(`${membro} Você foi reprovado💔 \n\n possiveis causas: \n\n Nick Indevido \nPouco tempo \nVagas Acabaram \nMotivo Errado \nMal Comportamento no servidor \nIdade muito baixa \n Alguma Resposta errada e entre outros fatores!`)
                ]
            })

            interaction.update({
                embeds:[
                    new Discord.EmbedBuilder()
                    .setDescription(`${membro} Foi infelizmente reprovado`)
                ],
                components:[]
            })
    }
}}