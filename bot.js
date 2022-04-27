const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });
require("dotenv").config();

const { rollDice, replyBuilder, extractTokens } = require('./dice');

client.login(process.env.TOKEN);

let bot = {
    client,
    prefix: "!",
    owners: ["191338224466001922"]
}

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload);

client.loadEvents(bot, false);

module.exports = bot;

client.on('messageCreate', (message) => {
    const regexDice = /^([1-9]?\d?)d([1-9]\d?)(?: *)?(?:(\+|-)(?: *)?([1-9]\d?))?$/i;

    // Testa se a mensagem está no formato correto para rolagem dos dados.
    if(!regexDice.test(message.content)) return;

    // Extrai os componentes recebidos na mensagem, já tratados.
    const [diceNumber, facesNumber, plusMinus, modifier] = extractTokens(message.content.match(regexDice));

    // Rolagem dos dados e cálculo do valor total.
    const dummyArray = rollDice(diceNumber, facesNumber);
    var [diceValues, diceSum] = dummyArray;
    
    // Montagem da mensagem a ser enviada pelo bot.
    let result = replyBuilder(diceNumber, facesNumber, plusMinus, modifier, diceSum, diceValues);

    // Envio da mensagem.
    message.channel.send(result);

    return
});
  