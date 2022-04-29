class Player {
    constructor(name) {
        this.name = name;
        this.cards = [];
        this.standStatus = false;
        this.scores = 0;
    }

    hit(deck) {
        if (this.scores > 21 || this.scores === 21) {
            this.standStatus = true;
            return;
        }
        this.cards.push(deck.pop());
        this.calculateForAces();
        this.scores = this.totalScore();
        console.log(`Player ${this.name} take a card and his scores is: ${this.scores}`);
        this.isTwentyOne();
        this.isCardBusting();
    }

    stand() {
        this.standStatus = true;
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

module.exports = {
    Player
};