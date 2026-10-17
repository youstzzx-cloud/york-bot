const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

// ID do cargo configurado
const CARGO_ID = '1561069559371272374';

client.once('ready', () => {
    console.log(`[YORK] Bot online com sucesso como ${client.user.tag}!`);
});

client.on('guildMemberAdd', async (member) => {
    try {
        await member.roles.add(CARGO_ID);
        console.log(`[YORK] Cargo atribuído com sucesso para ${member.user.tag}`);
    } catch (error) {
        console.error('[YORK] Erro ao tentar dar o cargo:', error);
    }
});

client.login(process.env.TOKEN);
