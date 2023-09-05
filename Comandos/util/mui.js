const Discord = require("discord.js")

module.exports = {
  name: "mui", // Coloque o nome do comando
  description: "Veja informação do seu perfil", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "usuario",
        description: "Veja informação do usuario",
        type: Discord.ApplicationCommandOptionType.User,
        required: false,
    },
],
  run: async (client, interaction) => {
    const usuario = interaction.options.getUser("usuario") || interaction.user;

    const member = interaction.guild.members.cache.get(usuario.id);


    function calculateTimeDifference(user) {
        const currentDate = new Date();
        const timeDifference = currentDate - user.createdAt;
        const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return { years, months, days, hours };
      }
  

      function calculateTimeOnServer(member) {
        const currentDate = new Date();
        const timeDifference = currentDate - member.joinedAt;
        const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return { years, months, days, hours };
      }
  

      const entryDate = member ? member.joinedAt : null;
      const timeDifferenceOnServer = entryDate ? calculateTimeOnServer(member) : null;
      const timeOnServer = timeDifferenceOnServer
        ? `${timeDifferenceOnServer.years} anos ${timeDifferenceOnServer.months} meses ${timeDifferenceOnServer.days} dias ${timeDifferenceOnServer.hours} horas`
        : "N/A";
  
        

      const creationDate = usuario.createdAt.toLocaleString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' });
  
    const embed = new Discord.EmbedBuilder()
    .addFields(
        {
            name:`Nome do usuario`,
            value:`\`@${usuario.username}\``,    //     \`\`
            inline: true
        },
        {
            name:`Discord ID`,
            value:`\`${usuario.id}\``,    //     \`\`
            inline: true
        },
        {
            name:`Data de Criação`,
            value: `\`${creationDate} (${calculateTimeDifference(usuario).years} anos ${calculateTimeDifference(usuario).months} meses ${calculateTimeDifference(usuario).days} dias ${calculateTimeDifference(usuario).hours} horas)\``,    //     \`\`
            inline: false
        },

        {
            name:`Tempo no Servidor`,
            value: `\`${timeOnServer}\``,    //     \`\`
            inline: false
        },
    )

    interaction.reply({
        embeds:[embed]
    })

  }
}