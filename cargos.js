const CARGO_ID = '1561069559371272374';
const NOME_IGNORADO = 'youstzzx.dc';

module.exports = (client) => {
    // Dá o cargo para quem já está no servidor
    try {
        client.guilds.cache.forEach(async (guild) => {
            const members = await guild.members.fetch();
            members.forEach(async (member) => {
                if (member.user.bot) return;
                if (member.user.username.toLowerCase() === NOME_IGNORADO.toLowerCase()) return;

                if (!member.roles.cache.has(CARGO_ID)) {
                    await member.roles.add(CARGO_ID).catch(() => {});
                }
            });
        });
    } catch (err) {
        console.error('[YORK] Erro ao carregar cargos antigos:', err);
    }

    // Dá o cargo para quem entrar novo
    client.on('guildMemberAdd', async (member) => {
        if (member.user.bot) return;
        if (member.user.username.toLowerCase() === NOME_IGNORADO.toLowerCase()) return;

        try {
            await member.roles.add(CARGO_ID);
            console.log(`[YORK] Cargo atribuído a ${member.user.tag}`);
        } catch (err) {
            console.error('[YORK] Erro ao dar cargo:', err);
        }
    });
};
