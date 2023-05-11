const { Client } = require('discord.js');
const math = require('mathjs');
require('dotenv').config()

const client = new Client({ intents: 3276799 });
const prefix = '!'; // Prefix to activate the bot

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    console.log(`Received message: ${message.content}`); // Log the received message

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'calc') {
        try {
            const expression = args.join(' ');
            console.log(`Evaluating expression: ${expression}`); // Log the evaluated expression
            const result = math.evaluate(expression);

            console.log(`Sending result: ${result}`); // Log the result being sent

            message.channel.send(`Result: ${result}`);
        } catch (error) {
            console.error(`Error evaluating expression: ${error}`); // Log any errors that occur
            message.channel.send('Invalid expression!');
        }
    }
});

client.login(process.env.TOKEN);
