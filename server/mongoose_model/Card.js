const { default: mongoose } = require('mongoose');

const cardSchema = new mongoose.Schema({
    suit: String,
    value: String,
    scores: Number
});

module.exports = cardSchema;