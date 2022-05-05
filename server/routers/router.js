const Router = require('koa-router');
const router = new Router();
const jwt = require('jsonwebtoken');
const koaBody = require('koa-body');
const secretJWTKey = 'byQyXlTjAFsQRJEYisJ04';
const { v4: uuidv4 } = require('uuid');
const { createReadStream } = require('fs');
const { Game } = require('../app/game');
const { Player } = require('../app/players');

const gameList = {};

// Our midlewares for routes
const auth = (ctx, next) => {
    const token = ctx.request.header['authorization'].split(' ')[1];

    if (!token) {
        console.log('Auth error by TOKEN is NOT EXIST');
        ctx.status = 401;
        return;
    }

    let session = null;

    try {
        session = jwt.verify(token, secretJWTKey);
    } catch (error) {
        console.log('TOKEN NOT VALIDATED');
        ctx.status = 401;
        return;
    }

    ctx.state.session = session;

    return next();
};
    
const checkGame = (ctx, next) => {
    const session = ctx.state.session;

    if (!gameList[session.id]) {
        ctx.status = 401;

        return
    }

    ctx.state.game = gameList[session.id];

    return next();
};

//Our controllers
const login = (ctx) => {
    const players = ctx.request.body; // array of players names

    if (!Array.isArray(players) || players.every((element) => { typeof element === 'string' }) || players.length < 2) {
        console.log(Array.isArray(players));
        console.log(players.every((element) => { typeof element === 'string' }));
        console.log(players.length < 2);
        ctx.status = 422;
        return
    }

    //create session
    const session = {
        id: uuidv4()
    };
    const token = jwt.sign(session, secretJWTKey);

    const game = new Game(players.map((name) => new Player(name)));
    gameList[session.id] = game;

    ctx.body = {
        token: token,
        game: game
    }
};
const getState = (ctx) => {
    ctx.body = ctx.state.game
};
const hitController = (ctx) => {
    const game = ctx.state.game;
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
    let session = ctx.state.session;
    game = new Game(game.players.map(player => new Player(player.name)));

    gameList[session.id] = game;
    ctx.body = gameList[session.id];
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