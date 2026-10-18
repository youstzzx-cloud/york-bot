const { EmbedBuilder } = require('discord.js');

const CANAL_BOAS_VINDAS_ID = '1561129167351980183';
const CANAL_CARGOS_ID     = '1561365127767265341';
const CANAL_REGRAS_ID     = '1561043341561565206';
const CANAL_HELP_ID       = '1561344446333853746';

module.exports = (client) => {
    
    // ---------------------------------------------------------
    // 1. EVENTO QUANDO ALGUÉM ENTRA NO SERVIDOR (MENSAGEM EM INGLÊS)
    // ---------------------------------------------------------
    client.on('guildMemberAdd', async (member) => {
        if (member.user.bot) return;

        try {
            const canal = member.guild.channels.cache.get(CANAL_BOAS_VINDAS_ID);
            if (!canal) return;

            // Pega a quantidade total atualizada de membros no servidor
            const totalMembros = member.guild.memberCount;

            const embedEntrada = new EmbedBuilder()
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
                .setColor(0x2b2d31)
                .setTitle("SYSTEM ACCESS GRANTED")
                .setDescription(
                    `User ${member} has been registered in **${member.guild.name}**.\n\n` +
                    `I am **York**, the personal assistant of this community, and I am at your disposal.\n\n` +
                    `• **Status:** Member role assigned.\n` +
                    `• **Total Community Members:** ${totalMembros}\n` +
                    `• **Rules:** Read the terms at <#${CANAL_REGRAS_ID}>.\n` +
                    `• **Additional Roles:** Select your roles at <#${CANAL_CARGOS_ID}>.\n` +
                    `• **Support:** Request assistance at <#${CANAL_HELP_ID}>.\n\n` +
                    `Proceed with caution.`
                );

            await canal.send({ embeds: [embedEntrada] });
        } catch (err) {
            console.error('[YORK] Erro ao enviar boas-vindas:', err);
        }
    });

    // ---------------------------------------------------------
    // 2. EVENTO QUANDO ALGUÉM SAI DO SERVIDOR (MENSAGEM PEQUENA)
    // ---------------------------------------------------------
    client.on('guildMemberRemove', async (member) => {
        if (member.user.bot) return;

        try {
            const canal = member.guild.channels.cache.get(CANAL_BOAS_VINDAS_ID);
            if (!canal) return;

            // Pega o número de membros restantes
            const totalMembros = member.guild.memberCount;

            const embedSaida = new EmbedBuilder()
                .setColor(0x808080)
                .setDescription(
                    `User **${member.user.tag}** left the server. Current total members: **${totalMembros}**.`
                );

            await canal.send({ embeds: [embedSaida] });
        } catch (err) {
            console.error('[YORK] Erro ao enviar mensagem de saída:', err);
        }
    });
};
