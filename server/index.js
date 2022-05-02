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
const { createReadStream } = require('fs');

let gameList = {};

const tokensList = [];

let game = new Game([new Player('Jesica'), new Player('Jack')]);

app.use(serve(path.join(__dirname, 'public')));

app.use(koaBody());

router.post('/createSession', async (ctx)=>{
    console.log(ctx.req.url);
});

router.post('/getGame', async (ctx) => {
    console.log('Game state is getted.');
    ctx.body = game;
});

router.post('/hit', async (ctx) => {
    console.log('Player hit');
    game.currentPlayerHit();
    ctx.body = game;
});

router.post('/stand', async (ctx) => {
    console.log('Player stand');
    game.currentPlayerStand();
    ctx.body = game;
});

router.post('/restart', async (ctx) => {
    game = new Game([new Player('Jesica'), new Player('Jack')]);
    ctx.body = game;
});

router.get('(.*)', async (ctx) => {
    ctx.type = 'text/html; charset=UTF-8';
    ctx.body = createReadStream('public/index.html');
});

app.use(router.routes());
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server has been started on http://localhost:${PORT}`));