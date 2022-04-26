const CARD_VALUES = ["2 ♣️ 2", "3 ♣️ 3", "4 ♣️ 4", "5 ♣️ 5", "6 ♣️ 6", "7 ♣️ 7", "8 ♣️ 8", "9 ♣️ 9", "10 ♣️ 10", "J ♣️ 10", "Q ♣️ 10", "K ♣️ 10", "A ♣️ 11",
"2 ♠️ 2", "3 ♠️ 3", "4 ♠️ 4", "5 ♠️ 5", "6 ♠️ 6", "7 ♠️ 7", "8 ♠️ 8", "9 ♠️ 9", "10 ♠️ 10", "J ♠️ 10", "Q ♠️ 10", "K ♠️ 10", "A ♠️ 11",
"2 ♥️ 2", "3 ♥️ 3", "4 ♥️ 4", "5 ♥️ 5", "6 ♥️ 6", "7 ♥️ 7", "8 ♥️ 8", "9 ♥️ 9", "10 ♥️ 10", "J ♥️ 10", "Q ♥️ 10", "K ♥️ 10", "A ♥️ 11",
"2 ♦️ 2", "3 ♦️ 3", "4 ♦️ 4", "5 ♦️ 5", "6 ♦️ 6", "7 ♦️ 7", "8 ♦️ 8", "9 ♦️ 9", "10 ♦️ 10", "J ♦️ 10", "Q ♦️ 10", "K ♦️ 10", "A ♦️ 11"];

/**
 * 
 * @param {string} card - a string defining the parameters of the class instance being created;
 * @param {function} cardClass - class constructor function;
 * @returns - return new object by class constructor function;
 */
 function inicializeCard(card, cardClass) {
    const cardParams = card.split(' ');
    return new cardClass(cardParams[0], cardParams[1], Number(cardParams[2]));
}

/**
 * 
 * @param {array} cardParamsPack - an array of strings representing the parameters of the given class;
 * @param {function} initCardFunc - a function that creates an instance of the given class;
 * @param {function} cardClass - class constructor function;
 * @returns 
 */
function createCartDeck(cardParamsPack, initCardFunc, cardClass) {
    const deck = [];
    for (let cardNumber = 0; cardNumber < cardParamsPack.length; cardNumber++) {
        deck.push(initCardFunc(cardParamsPack[cardNumber], cardClass));
    }
    return deck;
}

module.exports = {
    CARD_VALUES,
    inicializeCard,
    createCartDeck
}