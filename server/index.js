const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const { Game } = require('./app/game');
const { Player } = require('./app/players');
const jwt = require('jsonwebtoken');
const serve = require('koa-static');
const app = new Koa();
const router = new Router();
const koaBody = require('koa-body');
const secretJWTKey = 'byQyXlTjAFsQRJEYisJ04';
const { v4: uuidv4 } = require('uuid');
const { createReadStream } = require('fs');

const gameList = {};

app.use(serve(path.join(__dirname, 'public')));

// Our midlewares for routes
const auth = (ctx, next) => {
    const token = ctx.request.header['authorization'];

    if (!token) {
        console.log('Auth error by TOKEN is NOT EXIST');
        ctx.status = 401;
        return;
    }

    const session = null;

    try {
        session = jwt.verify(token, secretJWTKey);
    } catch (error) {
        console.log('TOKEN NOT VALIDATED');
        console.log(gameList);
        ctx.status = 401;
        ctx.body = ctx.status;

        return;
    }

    ctx.state.session = session;

    return next();
};
const checkGame = (ctx, next) => {
    const session = ctx.state.session;

    if (!gameList[session.id]) {
        ctx.status = 401;
        return;
    }

    ctx.state.game = gameList[session.id];

    return next();
};

//Our controllers
const login = (ctx) => {
    const players = ctx.request.body; // array of players names

    if (!Array.isArray(players) && !players.every((element) => { typeof element === 'string' }) && players.length > 2) {
        ctx.status = 422;
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
    game.hitCurrentPlayer();
    ctx.body = game;
};
const standController = (ctx) => {
    const game = ctx.state.game;
    game.standCurrentPlayer();
    ctx.body = game;
};
const restartController = (ctx) => {
    const playerList = ctx.request.body;
    const game = ctx.state.game;
    game = new Game(playerList.map(name => new Player(name)));
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

app.use(router.routes());
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server has been started on http://localhost:${PORT}`));