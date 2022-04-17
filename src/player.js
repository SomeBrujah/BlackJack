export class Player {
    constructor(name) {
        this.name = name;
        this.cards = [];
        this.game = null;
        this.scores = 0;
    }

    hit() {
        if(this.game.winners.length > 0) {
            return;
        }
        this.cards.push(this.game.deck.pop());
        this.calculateForAces();
        this.scores = this.totalScore();
        console.log(`Player ${this.name} take a card and his scores is: ${this.scores}`);
        this.isTwentyOne();
        this.isCardBusting();
    }

    stand() {
        if(this.game.players.indexOf(this) !== (this.game.players.length - 1)) {
            this.game.currentPlayer = this.game.players[this.game.players.indexOf(this) + 1];
            if(this.game.currentPlayer.scores === 21) {
                console.log(`Player ${this.game.currentPlayer.name} already have 21! Move is ${this.game.players[this.game.players.indexOf(this.game.currentPlayer) + 1].name}`);
                this.game.currentPlayer.stand();
            }
            console.log(`Player ${this.game.players[this.game.players.indexOf(this.game.currentPlayer) - 1].name} is stand, move is ${this.game.currentPlayer.name}`)
        } else {
            console.log(`All players have taken their turn.`)
            this.game.gameIsEnd = true;
            this.game.checkState();
        }
    }

    isTwentyOne() {
        if(this.scores===21) {
            console.log(`Player ${this.name} collect 21!`);
            return this.stand();
        }
    }

    isCardBusting(){
        if(this.scores > 21) {
            console.log(`Player ${this.name} collect over 21!`);
            return this.stand();
        }
    }

    calculateForAces() {
        const ace = this.cards.find((card) => {
            return card.value === 'A';
        })
        if (ace) {
            if (this.totalScore() > 21) {
                ace.scores = 1;
            }
        }
    }

    totalScore() {
        const total = this.cards.reduce((acc, curr) => {
            return acc + curr.scores;
        }, 0);
        return total;
    }
}