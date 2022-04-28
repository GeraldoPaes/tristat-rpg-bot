module.exports = {
    name: "ready",
    run: async (bot) => {
        console.log(`Ready! Logged in as ${bot.client.user.username}.`);
    }
}
