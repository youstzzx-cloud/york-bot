const { EmbedBuilder } = require('discord.js');

const CANAL_BOAS_VINDAS_ID = '1561129167351980183';
const CANAL_CARGOS_ID     = '1561365127767265341';
const CANAL_REGRAS_ID     = '1561043341561565206';
const CANAL_HELP_ID       = '1561344446333853746';

module.exports = (client) => {
    client.on('guildMemberAdd', async (member) => {
        if (member.user.bot) return;

        try {
            const canal = member.guild.channels.cache.get(CANAL_BOAS_VINDAS_ID);
            if (!canal) return;

            // Detecta se a conta do usuário no Discord está em Inglês ou Português
            const userLocale = member.user.locale || 'pt';
            const isEnglish = userLocale.startsWith('en');

            const embed = new EmbedBuilder()
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
                .setColor(0x2b2d31);

            if (isEnglish) {
                embed.setTitle("SYSTEM ACCESS GRANTED")
                     .setDescription(
                         `User ${member} has been registered in **${member.guild.name}**.\n\n` +
                         `I am **York**, the personal assistant of this community, and I am at your disposal.\n\n` +
                         `• **Status:** Member role assigned.\n` +
                         `• **Rules:** Read the terms at <#${CANAL_REGRAS_ID}>.\n` +
                         `• **Additional Roles:** Select your roles at <#${CANAL_CARGOS_ID}>.\n` +
                         `• **Support:** Request assistance at <#${CANAL_HELP_ID}>.\n\n` +
                         `Proceed with caution.`
                     );
            } else {
                embed.setTitle("ACESSO AO SISTEMA AUTORIZADO")
                     .setDescription(
                         `O usuário ${member} foi registrado em **${member.guild.name}**.\n\n` +
                         `Eu sou o **York**, o assistente pessoal desta comunidade, e estou ao seu dispor.\n\n` +
                         `• **Estado:** Cargo de membro atribuído com sucesso.\n` +
                         `• **Regras:** Leia as normas em <#${CANAL_REGRAS_ID}>.\n` +
                         `• **Cargos Adicionais:** Resgate novos cargos em <#${CANAL_CARGOS_ID}>.\n` +
                         `• **Suporte:** Solicite ajuda em <#${CANAL_HELP_ID}>.\n\n` +
                         `Siga as diretrizes estabelecidas.`
                     );
            }

            await canal.send({ embeds: [embed] });
        } catch (err) {
            console.error('[YORK] Erro ao enviar boas-vindas:', err);
        }
    });
};
