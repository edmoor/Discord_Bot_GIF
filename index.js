const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');

const gifs = JSON.parse(fs.readFileSync('gifs.json', 'utf8')).gifs;

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const token = process.env.DISCORD_TOKEN;

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', message => {
    if (message.content === '!futbol') {
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
        const embed = new EmbedBuilder()
            .setTitle('aqui te proporciono lo que buscas hermano')
            .setImage(randomGif);
        message.channel.send({ embeds: [embed] }).then(() => {
            console.log('GIF enviado con éxito.');
        }).catch(error => {
            console.error('Error al enviar el GIF:', error);
        });
    }
});

client.login(token);
