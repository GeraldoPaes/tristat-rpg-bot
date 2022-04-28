module.exports = {
    name: "roll",
    category: "dice",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        console.log("Rolled " + message.content);
    }
}