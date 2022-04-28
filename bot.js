const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });
require("dotenv").config();

client.login(process.env.TOKEN);

let bot = {
    client,
    prefix: "!",
    owners: ["191338224466001922"]
}

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload);
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload);

client.loadEvents(bot, false);
client.loadCommands(bot, false);

module.exports = bot;
