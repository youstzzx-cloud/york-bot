const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

// Cria a porta HTTP que o Render EXIGE para aceitar o Web Service gratuito
http.createServer((req, res) => {
    res.write("York Bot esta online!");
    res.end();
}).listen(process.env.PORT || 8080);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

// Configurações do York
const CARGO_ID = '1561069559371272374';
const NOME_IGNORADO = 'youstzzx.dc';

client.once('ready', async () => {
    console.log(`[YORK] Bot online com sucesso como ${client.user.tag}!`);

    // Dá o cargo para quem JÁ ESTÁ no servidor
    try {
        console.log('[YORK] Verificando membros já existentes no servidor...');
        
        for (const guild of client.guilds.cache.values()) {
            const members = await guild.members.fetch();
            
            members.forEach(async (member) => {
                if (member.user.bot) return;
                if (member.user.username.toLowerCase() === NOME_IGNORADO.toLowerCase()) return;

                if (!member.roles.cache.has(CARGO_ID)) {
                    try {
                        await member.roles.add(CARGO_ID);
                        console.log(`[YORK] Cargo antigo atribuído para: ${member.user.tag}`);
                    } catch (err) {
                        console.error(`[YORK] Erro ao dar cargo para ${member.user.tag}:`, err);
                    }
                }
            });
        }
    } catch (error) {
        console.error('[YORK] Erro ao buscar membros antigos:', error);
    }
});

// Dá o cargo para quem ENTRAR NOVO no servidor
client.on('guildMemberAdd', async (member) => {
    try {
        if (member.user.bot) return;
        if (member.user.username.toLowerCase() === NOME_IGNORADO.toLowerCase()) {
            console.log(`[YORK] Ignorando o usuário restrito: ${member.user.tag}`);
            return;
        }

        await member.roles.add(CARGO_ID);
        console.log(`[YORK] Cargo novo atribuído com sucesso para ${member.user.tag}`);
    } catch (error) {
        console.error('[YORK] Erro ao tentar dar o cargo:', error);
    }
});

client.login(process.env.TOKEN);
