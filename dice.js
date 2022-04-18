//Funções relacionadas ao comando de rolagem dos dados.

//Faz as modificações necessárias nos componentes da mensagem recebida.
function extractTokens(matches) {
    var [, diceNumber, facesNumber, plusMinus, modifier] = matches;

    diceNumber = parseInt(diceNumber);
    facesNumber = parseInt(facesNumber);
    modifier = parseInt(modifier);

    //Se não especificar quantos dados são, role um dado.
    if (diceNumber === "") {
        diceNumber = 1;
    }

    //Deixa o modificador negativo.
    if (plusMinus === "-") {
        modifier = -modifier;
    }

    //Se o modificador não existir, trate-o como zero.
    if (isNaN(modifier)) {
        modifier = 0;
    }

    return [diceNumber, facesNumber, plusMinus, modifier];
}

function rollDice (diceNumber, facesNumber) {
    const dummyArray = Array(diceNumber).fill();
    const diceValues = dummyArray
        .map(() => randomIntFromInterval(1, facesNumber));

    const diceValuesSum = diceValues.reduce((a, b) => a + b, 0)

    return [diceValues, diceValuesSum];
}

function replyBuilder (diceNumber, facesNumber, plusMinus, modifier, diceSum, diceValues) {
    var result = "` " + (diceSum + modifier) + " ` ⟵ [";

    for (let i = 0; i < diceValues.length; i++) {
        if (i != diceValues.length - 1){
            result += diceValues[i] + ", ";
        } else {
            result += diceValues[i] + "]"
        }
    }

    result += " " + diceNumber + "d" + facesNumber;

    if (modifier != 0){
        result += " " + plusMinus + " " + Math.abs(modifier);
    }

    return result;
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = { extractTokens, rollDice, replyBuilder };