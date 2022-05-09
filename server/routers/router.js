const { CARD_VALUES, inicializeCard, createCartDeck } = require('../app/helpers');
mongoose = require('mongoose');
require('dotenv').config();
const GameModel = require('../mongoose_model/Game');
mongoose.connect(process.env.DB_CONN, (err, db) => {
    if (!err) {
        console.log('Mongo Database is conected!');
    }
});


const Router = require('koa-router');
const router = new Router();
const jwt = require('jsonwebtoken');
const koaBody = require('koa-body');
const secretJWTKey = 'byQyXlTjAFsQRJEYisJ04';
const { v4: uuidv4 } = require('uuid');
const { createReadStream } = require('fs');
const Card = require('../app/card');

// Our midlewares for routes
const auth = (ctx, next) => {
    const token = ctx.request.header['authorization'].split(' ')[1];

    if (!token) {
        console.log('Auth error by TOKEN is NOT EXIST');
        ctx.status = 401;
        return;
    }

    let gameId = null;

    try {
        gameId = jwt.verify(token, secretJWTKey);
    } catch (error) {
        console.log('TOKEN NOT VALIDATED');
        ctx.status = 401;
        return;
    }

    ctx.state.gameId = gameId;

    return next();
};

const checkGame = async (ctx, next) => {
    const gameId = ctx.state.gameId;

    const game = await GameModel.findOne({ gameId: gameId }).exec();

    if (!game) {
        ctx.status = 401;
        return
    }

    ctx.state.game = game;

    return next();
};

//Our controllers
const login = async (ctx) => {
    const players = ctx.request.body; // array of players names

    if (!Array.isArray(players) || players.every((element) => { typeof element === 'string' }) || players.length < 2) {
        ctx.status = 422;
        return
    }

    const game = new GameModel({
        gameId: uuidv4(),
        deck: createCartDeck(CARD_VALUES, inicializeCard, Card),
        players: players.map((playerName) => ({
            name: playerName,
            cards: [],
            isActive: false,
            standStatus: false,
            scores: 0
        })),
        gameIsEnd: false,
        isDraw: false,
        winners: [],
        resultString: ''
    });
    game.start();
    // console.log(game.currentPlayerHit);
    const token = jwt.sign(game.gameId, secretJWTKey);

    ctx.body = {
        token: token,
        game: game
    }
};
const getState = (ctx) => {
    const game = ctx.state.game;
    ctx.body = game;
};
const hitController = (ctx) => {
    const game = ctx.state.game
    game.currentPlayerHit();
    ctx.body = game;
};
const standController = (ctx) => {
    const game = ctx.state.game;
    game.currentPlayerStand();
    ctx.body = game;
};
const restartController = (ctx) => {
    let game = ctx.state.game;
    let players = ctx.state.game.players.map((player) => { return player.name });
    console.log(players);
    game.deck = createCartDeck(CARD_VALUES, inicializeCard, Card),
        game.players = players.map((playerName) => ({
            name: playerName,
            cards: [],
            isActive: false,
            standStatus: false,
            scores: 0
        }));
    game.gameIsEnd = false;
    game.isDraw = false;
    game.winners = [];
    game.resultString = '';
    game.start();
    ctx.body = game;
};

// Our routes with requset
router.post('/login', koaBody(), login);
router.post('/getGame', auth, checkGame, getState);
router.post('/hit', auth, checkGame, hitController);
router.post('/stand', auth, checkGame, standController);
router.post('/restart', auth, checkGame, restartController);

router.get('(.*)', async (ctx) => {
    ctx.type = 'text/html; charset=UTF-8';
    ctx.body = createReadStream('public/index.html');
});

module.exports = router;