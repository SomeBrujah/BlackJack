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

function addElement(parent, element) {
    parent.appendChild(element);
}

function inizializePlayersZone(parent, players) {
    for(let i = 0; i < players.length; i++) {
        const player_section = document.createElement('div');
        const player_name = document.createElement('h1');
        const player_score = document.createElement('h1');
        const player_card = document.createElement('div');

        player_section.id = players[i].name;
        player_section.classList.add('player_section');
        player_section.classList.add('section');
        player_name.textContent = players[i].name;
        player_name.id = `${players[i].name}_name`;
        player_name.classList.add('section');
        player_name.classList.add('player_name');
        player_score.textContent = players[i].scores;
        player_score.id = `${players[i].name}_score`;
        player_score.classList.add('score');
        player_score.classList.add('section');
        player_card.id = `${players[i].name}_cards`;
        player_card.classList.add('section');
        player_card.classList.add('card_section');

        player_section.append(player_name, player_score, player_card);
        parent.appendChild(player_section);
    }
}

function addCart(player, card){
    const hand = document.querySelector(`#${player.name}_cards`);

    const player_card = document.createElement('div');
    const card_upper = document.createElement('div');
    const card_bottom = document.createElement('div');

    player_card.classList.add('card');
    card_upper.classList.add('card_upper');
    card_bottom.classList.add('card_bottom');

    card_upper.textContent = `${card.value}${card.suit}`;
    card_bottom.textContent =`${card.value}${card.suit}`;

    player_card.append(card_upper, card_bottom);
    hand.appendChild(player_card);
}

export {
    CARD_VALUES,
    inicializeCard,
    createCartDeck,
    addElement,
    inizializePlayersZone,
    addCart
}