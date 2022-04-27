const { CARD_VALUES, inicializeCard, createCartDeck } = require('./helpers');
const Card = require('./card');
const { Player } = require('./players');

class Game {
    constructor(players) {
        this.deck = createCartDeck(CARD_VALUES, inicializeCard, Card);
        this.players = players;
        this.currentPlayer = null;
        this.gameIsEnd = false;
        this.isDraw = false;
        this.winners = [];
        this.resultString = '';
        this.start();
    }

    start() {
        this.shuffle();

        for (let i = 0; i < this.players.length; i++) {
            for (let j = 0; j < 2; j++) {
                this.players[i].cards.push(this.deck.pop());
            }

            this.players[i].calculateForAces();
            this.players[i].scores = this.players[i].totalScore();

            if (this.players[i].scores < 21 && this.currentPlayer === null) {
                this.currentPlayer = this.players[i];
            }
        }
        if (this.players.every((player) => { return player.scores === 21; })) {
            this.checkState();
        }
        console.log('All players have a two card.');
        this.players.forEach((player) => {
            console.log(`Player ${player.name} have: ${player.scores} scores.`)
        });
        console.log(`${this.currentPlayer.name} goes first.`);
    }

    shuffle() {
        for (let i = this.deck.length - 1; i >= 0; i--) {
            let currentPosition = this.deck[i];
            let randomNumber = Math.floor(Math.random() * (i + 1));
            this.deck[i] = this.deck[randomNumber];
            this.deck[randomNumber] = currentPosition;
        }
    }

    currentPlayerHit() {
        this.currentPlayer.hit(this.deck);
        if (this.currentPlayer.standStatus === true && this.players.indexOf(this.currentPlayer) !== (this.players.length - 1)) {
            this.currentPlayer = this.players[this.players.indexOf(this.currentPlayer) + 1];
            console.log(`The move goes to ${this.currentPlayer.name}`);
        } else {
            // this.checkState();
        }

    }

    currentPlayerStand() {
        this.currentPlayer.stand();
        if (this.currentPlayer.standStatus === true && this.players.indexOf(this.currentPlayer) !== (this.players.length - 1)) {
            this.currentPlayer = this.players[this.players.indexOf(this.currentPlayer) + 1];
            console.log(`The move goes to ${this.currentPlayer.name}`);
        } else {
            this.checkState();
        }
    }

    checkState() {
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
}

module.exports = {
    Game,
    CARD_VALUES,
    inicializeCard,
    createCartDeck,
    Card
}

// const game = new Game([new Player('Maria'), new Player('Jack'), new Player('Max')]);
// game.currentPlayerHit();
// game.currentPlayerHit();
// game.currentPlayerHit();
// game.currentPlayerHit();
// game.currentPlayerHit();