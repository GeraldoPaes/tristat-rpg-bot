const { rollDice, replyBuilder, extractTokens } = require('../../util/dice');

module.exports = {
    name: "roll",
    category: "dice",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        const regexDice = /^([1-9]?\d?)d([1-9]\d?)(?: *)?(?:(\+|-)(?: *)?([1-9]\d?))?$/i;

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
    }
}
