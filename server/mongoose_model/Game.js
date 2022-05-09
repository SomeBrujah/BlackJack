const { default: mongoose } = require('mongoose');
const playerSchema = require('./Player');
const cardSchema = require('./Card');

const gameSchema = new mongoose.Schema({
    gameId: String,
    deck: [cardSchema],
    players: [playerSchema],
    gameIsEnd: Boolean,
    isDraw: Boolean,
    winners: [playerSchema],
    resultString: String
});

gameSchema.methods.start = function () {
    this.shuffle();
    let firstMovePlayerName = '';
    for (let i = 0; i < this.players.length; i++) {
        for (let j = 0; j < 2; j++) {
            this.players[i].cards.push(this.deck.pop());
        }

        this.players[i].calculateForAces();
        this.players[i].scores = this.players[i].totalScore();

        if (this.players[i].scores < 21 && this.players.every((player) => { return player.isActive === false })) {
            this.players[i].isActive = true;
            firstMovePlayerName = this.players[i].name;
        }
    }
    if (this.players.every((player) => { return player.scores === 21; })) {
        this.checkState();
    }
    this.players.forEach((player) => {
        console.log(`Player ${player.name} have: ${player.scores} scores.`)
    });
    console.log(`${firstMovePlayerName} goes first.`);
    this.save();
}

gameSchema.methods.shuffle = function () {
    for (let i = this.deck.length - 1; i >= 0; i--) {
        let currentPosition = this.deck[i];
        let randomNumber = Math.floor(Math.random() * (i + 1));
        this.deck[i] = this.deck[randomNumber];
        this.deck[randomNumber] = currentPosition;
    }
}

gameSchema.methods.currentPlayerHit = async function () {
    const activePlayer = this.players.find((player)=>{ return player.isActive === true});
    let newActivePlayer = null;
    activePlayer.hit(this.deck);

    if (activePlayer.standStatus === true && this.players.indexOf(activePlayer) !== (this.players.length - 1)) {
        newActivePlayer = this.players[this.players.indexOf(activePlayer) + 1];
        activePlayer.isActive = false; 
        newActivePlayer.isActive = true;
        console.log(`The move goes to ${newActivePlayer.name}`);
    }

    this.save();
}

gameSchema.methods.currentPlayerStand = async function () {
    const activePlayer = this.players.find((player)=>{ return player.isActive === true});
    activePlayer.stand();

    if (activePlayer.standStatus === true && this.players.indexOf(activePlayer) !== (this.players.length - 1)) {
        let newActivePlayer = this.players[this.players.indexOf(activePlayer) + 1];
        activePlayer.isActive = false; 
        newActivePlayer.isActive = true;
        console.log(`The move goes to ${newActivePlayer.name}`);
    } else {
        this.checkState();
    }

    this.save();
}


gameSchema.methods.checkState = function () {
    const remPlayers = this.players.filter((player) => {
        return player.scores <= 21;
    });
    if (remPlayers.length === 0) {
        console.log('Draw!');
        this.resultString = 'Draw';
        this.isDraw = true;
        return null;
    }
    // If among the players there are those who scored 21
    if (remPlayers.some((player) => { return player.scores === 21 })) {
        this.winners = remPlayers.filter((player) => { return player.scores === 21 });
        if (this.winners.length > 1) {
            this.resultString = 'Draw';
            this.gameIsEnd = true;
            this.isDraw = true;
            console.log(`Draw!`);
            return this.winners;
        }
        console.log(`Player ${this.winners[0].name} win this game, by collect 21 scores!`);
        this.resultString = this.winners[0].name;
        this.gameIsEnd = true;
        return this.winners[0];
    }
    // If among the players there are NOT those who scored 21
    let winner = remPlayers[0];
    for (let i = 0; i < remPlayers.length; i++) {
        if (remPlayers[i].scores > winner.scores) {
            winner = remPlayers[i];
        }
    }
    if (remPlayers.filter((player) => { return player.scores === winner.scores }).length > 1) {
        this.resultString = 'Draw';
        this.gameIsEnd = true;
        this.isDraw = true;
        console.log(`Draw!`);
        return remPlayers.filter((player) => { return player.scores === winner.scores });
    }
    console.log(`Player ${winner.name} win this game, by number of scores`);
    this.resultString = winner.name;
    this.gameIsEnd = true;
    return winner;

}
module.exports = mongoose.model("Game", gameSchema);