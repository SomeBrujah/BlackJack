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
        const playerSectionBlock = document.createElement('div');
        const playerNameBlock = document.createElement('div');
        const playerNameText = document.createElement('p');
        const playerScoreBlock = document.createElement('div');
        const playerScoreText = document.createElement('p');
        const playerCardBlock = document.createElement('div');

        playerSectionBlock.id = players[i].name;
        playerSectionBlock.className = 'player_section_block';
        playerNameBlock.className = 'player_name_block  section';
        playerNameText.className = 'player_name_text';
        playerScoreBlock.className = 'player_score_block  section';
        playerScoreText.className = 'player_score_text';
        playerCardBlock.className = 'player_card_block  section';

        playerSectionBlock.appendChild(playerNameBlock);
        playerSectionBlock.appendChild(playerScoreBlock);
        playerSectionBlock.appendChild(playerCardBlock);

        playerNameBlock.appendChild(playerNameText);
        playerScoreBlock.appendChild(playerScoreText);

        playerNameText.textContent = players[i].name;
        playerScoreText.textContent = players[i].scores;

        parent.appendChild(playerSectionBlock);
    }
}

function addCart(player, card){
    const playerArea = document.getElementById(player.name);
    
    const cardWrapp = document.createElement('div');
    const cardValueUpper = document.createElement('div');
    const cardValueUpperText = document.createElement('p');
    const cardValueBottom = document.createElement('div');
    const cardValueBottomText = document.createElement('p');

    cardWrapp.className = 'card_wrapp';
    cardValueUpper.className = 'card_value_upper';
    cardValueUpperText.className = 'card_value_upper_text';
    cardValueBottom.className = 'card_value_bottom';
    cardValueBottomText.className = 'card_value_bottom_text';

    cardWrapp.appendChild(cardValueUpper);
    cardWrapp.appendChild(cardValueBottom);

    cardValueUpper.appendChild(cardValueUpperText);
    cardValueBottom.appendChild(cardValueBottomText);

    cardValueUpperText.textContent = `${card.value}${card.suit}`;
    cardValueBottomText.textContent = `${card.value}${card.suit}`;

    playerArea.childNodes[1].firstChild.textContent = player.scores;
    playerArea.lastChild.appendChild(cardWrapp);
}

export {
    CARD_VALUES,
    inicializeCard,
    createCartDeck,
    addElement,
    inizializePlayersZone,
    addCart
}