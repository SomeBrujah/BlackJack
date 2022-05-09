const { default: mongoose } = require('mongoose');
const cardSchema = require('./Card');


const playerSchema = new mongoose.Schema({
    name: String,
    cards: [cardSchema],
    scores: Number,
    isActive: Boolean,
    standStatus: Boolean,
});

playerSchema.methods.hit = function (deck) {
    if (this.scores > 21 || this.scores === 21) {
        this.stand();
        return;
    }

    this.cards.push(deck.shift());
    this.calculateForAces();
    this.scores = this.totalScore();
    this.isTwentyOne();
    this.isCardBusting();
}

playerSchema.methods.stand = function () {
    this.standStatus = true;
}

playerSchema.methods.isTwentyOne = function () {
    if (this.scores === 21) {
        return this.stand();
    }
}

playerSchema.methods.isCardBusting = function () {
    if (this.scores > 21) {
        console.log(`Player ${this.name} collect over 21!`);
        return this.stand();
    }
}

playerSchema.methods.calculateForAces = function () {
    const ace = this.cards.find((card) => {
        return card.value === 'A'
    });
    if (ace) {
        if (this.totalScore() > 21) {
            ace.scores = 1;
        }
    }
}

playerSchema.methods.totalScore = function () {
    const total = this.cards.reduce((acc, curr) => {
        return acc + curr.scores
    }, 0);
    return total;
}

module.exports = playerSchema;