const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Servidor Web para manter o Render e UptimeRobot ativos 24/7
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

client.once('ready', () => {
    console.log(`[YORK] Bot ligado com sucesso como ${client.user.tag}!`);
    
    // Carrega automaticamente todos os arquivos .js que estiverem na pasta "sistemas"
    const pastasistemas = path.join(__dirname, 'sistemas');
    if (fs.existsSync(pastasistemas)) {
        const arquivos = fs.readdirSync(pastasistemas).filter(file => file.endsWith('.js'));
        for (const arquivo of arquivos) {
            const sistema = require(`./sistemas/${arquivo}`);
            sistema(client);
            console.log(`[YORK] Sistema carregado com sucesso: ${arquivo}`);
        }
    }
});

client.login(process.env.TOKEN);
